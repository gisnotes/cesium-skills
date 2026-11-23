#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Parse Cesium CHANGES.md and extract changes for a version range (e.g., >= 1.100).
 * Zero third-party dependencies. Reusable for future incremental updates (e.g. --from 1.149).
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CESIUM_CHANGES = path.resolve(
  __dirname,
  "..",
  "..",
  "cesium",
  "CHANGES.md"
);

function parseArgs(argv) {
  const args = {
    input: DEFAULT_CESIUM_CHANGES,
    from: "1.100",
    to: null,
    outDir: null,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) args.input = argv[++i];
    else if (a === "--from" && argv[i + 1]) args.from = argv[++i];
    else if (a === "--to" && argv[i + 1]) args.to = argv[++i];
    else if (a === "--out" && argv[i + 1]) args.outDir = argv[++i];
  }
  return args;
}

function cmpSemver(a, b) {
  const pa = a.split(".").map((n) => parseInt(n, 10));
  const pb = b.split(".").map((n) => parseInt(n, 10));
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const va = pa[i] || 0;
    const vb = pb[i] || 0;
    if (va !== vb) return va - vb;
  }
  return 0;
}

function main() {
  const args = parseArgs(process.argv);
  const raw = fs.readFileSync(args.input, "utf8");
  const lines = raw.split(/\r?\n/);

  const versions = [];
  let currentVer = null;
  let currentPkg = "general";
  let currentSec = "general";

  for (const line of lines) {
    const verMatch = line.match(/^## (\d+\.\d+(?:\.\d+)?)\s*-\s*(.+)$/);
    if (verMatch) {
      currentVer = {
        version: verMatch[1],
        date: verMatch[2].trim(),
        entries: [],
      };
      versions.push(currentVer);
      currentPkg = "general";
      currentSec = "general";
      continue;
    }

    if (!currentVer) continue;

    // Some older versions use ### Breaking Changes directly under ## version,
    // newer versions use ### @cesium/engine then #### Breaking Changes
    const h3Match = line.match(/^### (.+)$/);
    if (h3Match) {
      const title = h3Match[1].trim();
      if (
        title.startsWith("@cesium/") ||
        title === "cesium"
      ) {
        currentPkg = title;
        currentSec = "general";
      } else {
        currentSec = title;
      }
      continue;
    }

    const h4Match = line.match(/^#### (.+)$/);
    if (h4Match) {
      currentSec = h4Match[1].trim();
      continue;
    }

    currentVer.entries.push({
      pkg: currentPkg,
      sec: currentSec,
      line,
    });
  }

  const selected = versions.filter((v) => {
    if (args.from && cmpSemver(v.version, args.from) < 0) return false;
    if (args.to && cmpSemver(v.version, args.to) > 0) return false;
    return true;
  });

  const buckets = {
    announcements: [],
    breaking: [],
    deprecated: [],
    additions: [],
    fixes: [],
  };

  for (const v of selected) {
    // Group by (pkg, sec)
    const grouped = new Map();
    for (const item of v.entries) {
      const key = `${item.pkg}|||${item.sec}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(item.line);
    }

    for (const [key, secLines] of grouped.entries()) {
      const [pkg, sec] = key.split("|||");
      const content = secLines.join("\n").trim();
      if (!content) continue;

      const block = `### ${v.version} (${v.date}) [${pkg}] — ${sec}\n\n${content}\n`;
      const lower = sec.toLowerCase();
      if (lower.includes("announcement") || lower.includes("highlight")) {
        buckets.announcements.push(block);
      } else if (lower.includes("breaking")) {
        buckets.breaking.push(block);
      } else if (lower.includes("deprecated")) {
        buckets.deprecated.push(block);
      } else if (lower.includes("addition")) {
        buckets.additions.push(block);
      } else if (lower.includes("fix")) {
        buckets.fixes.push(block);
      }
    }
  }

  if (args.outDir) {
    fs.mkdirSync(args.outDir, { recursive: true });
    for (const [name, items] of Object.entries(buckets)) {
      fs.writeFileSync(
        path.join(args.outDir, `${name}.md`),
        `# ${name.toUpperCase()} (${args.from} - ${args.to || "latest"})\n\n` +
          items.join("\n---\n\n"),
        "utf8"
      );
    }
    console.log(
      `Extracted ${selected.length} versions (${selected.at(-1)?.version} -> ${selected[0]?.version}) to ${args.outDir}`
    );
    for (const [name, items] of Object.entries(buckets)) {
      console.log(`  - ${name}.md: ${items.length} sections`);
    }
  } else {
    console.log(`Matched ${selected.length} versions.`);
  }
}

main();

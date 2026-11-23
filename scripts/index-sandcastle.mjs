#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Scan Cesium Apps/Sandcastle2/gallery/<id>/sandcastle.yaml & main.js,
 * group by development categories, and output compact inspection bundles.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const galleryDir =
  process.argv[3] ||
  path.resolve(repoRoot, "..", "cesium", "Apps", "Sandcastle2", "gallery");
const outDir = process.argv[2] || path.resolve(repoRoot, "tmp-sandcastle");

const CATEGORY_MAP = [
  {
    file: "getting-started-performance",
    labels: ["Getting Started", "Performance", "Showcases"],
  },
  {
    file: "terrain-imagery",
    labels: ["Terrain", "Imagery", "Imagery, Showcases"],
  },
  {
    file: "3dtiles-models",
    labels: ["3D Tiles", "3D Models", "Photogrammetry", "ion Assets", "iTwin"],
  },
  {
    file: "entities-vector-geometries",
    labels: ["Entities", "Geometries", "DataSources", "Vector Tiles", "Labels"],
  },
  {
    file: "styling-materials-shaders",
    labels: ["Styling", "Graphics"],
  },
  {
    file: "animation-czml",
    labels: ["Animation", "CZML"],
  },
  {
    file: "camera-picking-snapping",
    labels: ["Camera", "Picking", "Snapping", "Transformations"],
  },
  {
    file: "clipping-clamping-classification",
    labels: ["Clipping", "Clamping", "Classification"],
  },
  {
    file: "postprocessing-atmosphere",
    labels: ["Post Processing", "Atmosphere", "2D View", "Underground", "Widgets", "VR"],
  },
  {
    file: "pointcloud-voxel-splats",
    labels: ["Point Clouds", "Voxels", "Gaussian Splats"],
  },
];

function parseYaml(text) {
  const res = { title: "", description: "", labels: [] };
  let inLabels = false;
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (/^title:\s*/.test(line)) {
      res.title = line.replace(/^title:\s*/, "").trim();
      inLabels = false;
    } else if (/^description:\s*/.test(line)) {
      res.description = line.replace(/^description:\s*/, "").trim();
      inLabels = false;
    } else if (/^labels:\s*$/.test(line)) {
      inLabels = true;
    } else if (inLabels && /^\s*-\s+/.test(line)) {
      res.labels.push(line.replace(/^\s*-\s+/, "").trim());
    } else if (/^[a-zA-Z0-9_]+:/.test(line)) {
      inLabels = false;
    }
  }
  return res;
}

function stripSandcastleBoilerplate(code) {
  return code
    .split(/\r?\n/)
    .filter(
      (l) =>
        !/^\s*Sandcastle\.(finishedLoading|reset|declare|highlight)/.test(l)
    )
    .join("\n")
    .trim();
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const dirs = fs.readdirSync(galleryDir, { withFileTypes: true });
  const items = [];

  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    if (d.name.endsWith("-dev")) continue; // skip internal test demos
    const yamlPath = path.join(galleryDir, d.name, "sandcastle.yaml");
    const mainPath = path.join(galleryDir, d.name, "main.js");
    if (!fs.existsSync(yamlPath) || !fs.existsSync(mainPath)) continue;

    const meta = parseYaml(fs.readFileSync(yamlPath, "utf8"));
    const code = stripSandcastleBoilerplate(fs.readFileSync(mainPath, "utf8"));
    items.push({ id: d.name, ...meta, code });
  }

  const labelCounts = new Map();
  for (const it of items) {
    for (const l of it.labels) {
      labelCounts.set(l, (labelCounts.get(l) || 0) + 1);
    }
  }

  for (const cat of CATEGORY_MAP) {
    const matched = items.filter((it) =>
      it.labels.some((l) => cat.labels.includes(l))
    );
    const md = matched
      .map(
        (m) =>
          `## ${m.title} (\`${m.id}\`)\n- Labels: ${m.labels.join(", ")}\n- Desc: ${m.description}\n\n\`\`\`js\n${m.code.slice(0, 2200)}\n\`\`\`\n`
      )
      .join("\n---\n\n");
    fs.writeFileSync(path.join(outDir, `${cat.file}.md`), md, "utf8");
    console.log(`${cat.file}.md: ${matched.length} examples`);
  }

  console.log(`\nTotal non-dev gallery items: ${items.length}`);
}

main();

# CesiumJS AI 开发 Skills 仓库 (`cesium-skills`)

这是一个专为 **AI 辅助开发 CesiumJS** 打造的知识库与代码规范仓库，帮助 AI（以及开发者自己）在编写 CesiumJS 代码时**不写过时/废弃 API、不踩新版行为坑，并直接复用官方最佳实践模板**。

- **当前同步基线**：`CesiumJS 1.148`（覆盖 `1.100`～`1.148` 变更规范 + `Apps/Sandcastle2/gallery` 234 个官方示例场景模板）

---

## 两个并行互补的 Skill 有什么区别？

本仓库包含两个**并行且互相补充**的 Skill，建议**同时挂载使用**：

| Skill | 定位（打个比方） | 解决什么问题 | 核心文件 |
| :--- | :--- | :--- | :--- |
| **`cesium-modern-dev`** | **“安全护栏 / 交规”**<br>（来自 `CHANGES.md`） | 防止 AI 用旧教程里的废弃写法（如 `readyPromise`、`defaultValue`、旧 `@cesium/engine` 导入），规避默认行为变更与内存泄漏坑 | [skills/cesium-modern-dev/SKILL.md](skills/cesium-modern-dev/SKILL.md) |
| **`cesium-recipes`** | **“代码菜谱 / 积木库”**<br>（来自 `Sandcastle2`） | 按地形、3D Tiles、材质/Shader、插值动画、裁剪、拾取等场景，提供**去掉演示 UI 壳子、可直接跑的最小代码模板** | [skills/cesium-recipes/SKILL.md](skills/cesium-recipes/SKILL.md) |

> **配合效果**：当你让 AI 写一个功能（比如“加载 World Terrain 并叠加 3D Tiles 裁剪多边形”）时，`cesium-recipes` 会告诉它标准写法怎么搭，`cesium-modern-dev` 会约束它用最新 API（如 `Terrain.fromWorldTerrain()` + `ClippingPolygon` 不可变规则），两者配合大幅减少报错和返工。

---

## 具体如何使用这份 Skills（小白友好版）

### 方式一：全局挂载（最推荐，一次配置，所有项目通用）

1. 先把本仓库克隆到本地固定目录（例如 `d:\Users\Downloads\cesium-skills`）：
   ```powershell
   git clone <你的GitHub仓库地址> d:\Users\Downloads\cesium-skills
   ```
2. 将 `skills/` 下的两个目录**软链接**（或直接复制）到 Antigravity 的全局 Skills 目录 `C:\Users\<你的用户名>\.gemini\antigravity\skills\`（macOS/Linux 为 `~/.gemini/antigravity/skills/`）：
   ```powershell
   # Windows PowerShell（无需管理员权限也可用 Junction 目录联接）
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\antigravity\skills"
   cmd /c mklink /J "$env:USERPROFILE\.gemini\antigravity\skills\cesium-modern-dev" "d:\Users\Downloads\cesium-skills\skills\cesium-modern-dev"
   cmd /c mklink /J "$env:USERPROFILE\.gemini\antigravity\skills\cesium-recipes" "d:\Users\Downloads\cesium-skills\skills\cesium-recipes"
   ```
   > 用软链接（`mklink /J`）的好处：以后你 `git pull` 更新仓库，所有项目的 AI 都会自动用到最新版 Skills，不需要重新复制。

### 方式二：单个项目挂载（适合团队共享）

如果你只想在某一个 Cesium 项目里使用，把 `skills/cesium-modern-dev` 和 `skills/cesium-recipes` 复制（或软链接）到**那个业务项目根目录的 `.gemini/skills/`** 下即可：

```text
你的业务项目/
├── .gemini/
│   └── skills/
│       ├── cesium-modern-dev/
│       └── cesium-recipes/
├── src/
└── package.json
```

### 日常怎么向 AI 提问？

挂载成功后，正常让 AI 写 Cesium 代码即可；如果希望它更精准地调用，可以在提示词里带上一句：
- **写新功能**：“请参考 `cesium-recipes` 和 `cesium-modern-dev`，帮我写一个加载 Cesium World Terrain 并实现路径插值飞行的最小示例。”
- **排查/升级旧代码**：“请对照 `cesium-modern-dev`，检查我这段 Cesium 代码里有没有已废弃的 API 或过时导入。”

---

## 目录结构

```text
cesium-skills/
├── README.md
├── CHANGELOG.md
├── scripts/
│   ├── extract-changes.mjs          # 零依赖 Node.js 增量提取 CHANGES.md 脚本
│   └── index-sandcastle.mjs         # 零依赖 Node.js 扫描 Sandcastle2/gallery 脚本
└── skills/
    ├── cesium-modern-dev/           # API 规范、废弃替换与避坑
    │   ├── SKILL.md
    │   └── references/
    │       ├── package-migration.md
    │       ├── deprecated-apis.md
    │       ├── tiles-models-vector.md
    │       └── performance-pitfalls.md
    └── cesium-recipes/              # 场景化固定写法与最小代码模板
        ├── SKILL.md
        └── references/
            ├── getting-started-performance.md
            ├── terrain-imagery.md
            ├── 3dtiles-models.md
            ├── entities-vector-geometries.md
            ├── styling-materials-shaders.md
            ├── animation-czml.md
            ├── camera-picking-snapping.md
            ├── clipping-clamping-classification.md
            ├── postprocessing-atmosphere.md
            └── pointcloud-voxel-splats.md
```

---

## 后续随 Cesium 新版本增量更新

当 Cesium 发布新版本（例如 `1.149`、`1.150`）时，先更新本地 Cesium 源码仓库，再运行内置脚本只提取新增版本：

```powershell
# 1. 提取新版本的 CHANGES.md 变更
node scripts/extract-changes.mjs --input "d:/Users/Downloads/cesium/CHANGES.md" --from 1.149 --out "./tmp-extract"

# 2. 如有需要，重新扫描 Sandcastle2 示例
node scripts/index-sandcastle.mjs "./tmp-sandcastle"
```

根据提取结果增量更新 `SKILL.md` 与 `references/`，更新版本号记录后提交 Git 并推送至 GitHub（用完可删除临时目录）。

# CesiumJS AI 开发 Skills 仓库 (`cesium-skills`)

这是一个专为 **AI 辅助开发 CesiumJS** 打造的知识库与代码规范仓库，帮助 AI（以及开发者自己）在编写 CesiumJS 代码时**不写过时/废弃 API、不踩新版行为坑，并直接复用官方最佳实践模板**。

- **当前同步基线**：`CesiumJS 1.148`（覆盖 `1.92`～`1.148` 变更规范 + `Apps/Sandcastle2/gallery` 234 个官方示例场景模板）

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

### 日常怎么向 AI 提问？（提示词模板）

挂载成功后，你在和 AI 对话时用**中文**正常提问即可（Skill 内部规则文件为英文编写以保证 AI 对 API 术语的识别精度，但 AI 会按你的提问语言用中文回复你并输出代码）。

下面这些提示词可以直接复制修改使用：

1. **从零写新功能（推荐同时带上两个 Skill）**
   > 请先参考 `cesium-modern-dev` 和 `cesium-recipes`，帮我写一段 Cesium 代码：加载 Cesium World Terrain 地形和 3D Tiles 建筑白膜，要求使用现代异步 API，不要使用已废弃的接口。

2. **按特定场景写模板（地形 / 轨迹插值 / 裁剪 / 材质等）**
   > 请参考 `cesium-recipes` 中的动画与插值模板，帮我用 `SampledPositionProperty` 实现一条平滑飞行的飞机轨迹（使用 Lagrange 插值），并确保符合 `cesium-modern-dev` 的规范。

   > 请参考 `cesium-recipes` 的裁剪模板，用 `ClippingPolygonCollection` 对 3D Tiles 做区域挖洞裁剪，并注意 `cesium-modern-dev` 中的不可变坐标约束。

3. **升级/审查老旧代码（防废弃 API 踩坑）**
   > 请对照 `cesium-modern-dev` 的规范，检查我下面这段 Cesium 代码，指出里面所有已废弃的 API（如 `readyPromise`、旧的 `@cesium/engine` 导入、`defaultValue` 等），并帮我改写成适配 Cesium 1.148 的现代写法：
   > ```js
   > // 粘贴你的旧代码
   > ```

4. **排查性能或渲染异常**
   > 我的 Cesium 场景在开启贴地或 3D Tiles 裁剪后出现阴影异常 / 内存增长 / 卡顿，请对照 `cesium-modern-dev` 的 `performance-pitfalls.md` 帮我排查原因并给出优化建议。

---

## 目录结构

```text
cesium-skills/
├── README.md                                  # 仓库说明、挂载教程与 AI 提问提示词指南
├── CHANGELOG.md                               # 版本更新日志（记录同步的 Cesium 基线与改动）
├── scripts/
│   ├── extract-changes.mjs                    # 零依赖 Node.js 增量提取 CHANGES.md 脚本
│   └── index-sandcastle.mjs                   # 零依赖 Node.js 扫描 Sandcastle2/gallery 脚本
└── skills/
    ├── cesium-modern-dev/                     # API 规范、废弃替换与避坑 Skill
    │   ├── SKILL.md                           # 主规范文件（核心红线、反模式与索引）
    │   └── references/
    │       ├── package-migration.md           # @cesium/core 分包、ESM/TS 与 ES2022 基线
    │       ├── deprecated-apis.md             # 1.92~1.148 废弃与已移除 API 替换对照表
    │       ├── tiles-models-vector.md         # 3D Tiles/glTF/Shader/矢量/裁剪现代规范
    │       └── performance-pitfalls.md        # 行为变更、WebGL2/Shader 与内存泄漏排查
    └── cesium-recipes/                        # 场景化固定写法与最小代码模板 Skill
        ├── SKILL.md                           # 场景速查路由总表
        └── references/
            ├── getting-started-performance.md # 轻量 CesiumWidget、离线模式、HTML 悬浮层与按需渲染
            ├── terrain-imagery.md             # World Terrain/ArcGIS/自定义地形与影像图层叠加
            ├── 3dtiles-models.md              # ion/URL 3D Tiles、高度偏移、glTF 与 BIM 元数据
            ├── entities-vector-geometries.md  # GeoJSON/MVT/BufferPrimitive 与基础几何体
            ├── styling-materials-shaders.md   # 3D Tiles 样式、CustomShader 与自定义 GLSL 材质
            ├── animation-czml.md              # SampledPositionProperty 路径插值、Clock 与 CZML
            ├── camera-picking-snapping.md     # 相机控制、要素拾取高亮、pickAsync 与几何吸附
            ├── clipping-clamping-classification.md # ClippingPolygon 裁剪、贴地与单体化分类
            ├── postprocessing-atmosphere.md   # 自定义后处理、轮廓高亮、大气雾效与地下/2D 模式
            └── pointcloud-voxel-splats.md     # 点云（Point Clouds）、体素（Voxels）与高斯泼溅（Gaussian Splats）
```

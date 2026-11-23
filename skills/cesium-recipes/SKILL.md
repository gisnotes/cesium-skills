---
name: cesium-recipes
description: Scenario-based CesiumJS code recipes distilled from Apps/Sandcastle2/gallery (234 examples across 30+ labels). Provides UI-free, minimal runnable snippets and fixed patterns for Terrain, Imagery, 3D Tiles, Models, Vector/GeoJSON, Materials/Shaders, Interpolation/Animation, Camera/Picking, Clipping, Post-Processing, and Point Clouds/Voxels/Gaussian Splats.
---

# CesiumJS Scenario Recipes (`Sandcastle2` Distilled)

> **Source**: `Apps/Sandcastle2/gallery` (234 non-dev official examples)  
> **Rule**: All snippets here strip away `Sandcastle.*` UI/toolbar boilerplate and follow modern `CesiumJS >= 1.107` / `1.148` APIs (pair with `cesium-modern-dev` for migration & pitfall checks).

## Quick Scenario Router

Load the matching reference file for copy-pasteable minimal snippets, parameter comparison tables, and official `gallery/<id>` pointers:

| Development Scenario | Covered Sandcastle Labels | Reference File |
| :--- | :--- | :--- |
| **Terrain & Imagery** (World Terrain, ArcGIS, Custom Heightmap, WMS/WMTS, Layers, Split) | `Terrain`, `Imagery`, `Imagery, Showcases` | [references/terrain-imagery.md](references/terrain-imagery.md) |
| **3D Tiles & glTF Models** (ion/URL loading, height offset, BIM/iTwin, PBR, EdgeDisplayMode) | `3D Tiles`, `3D Models`, `Photogrammetry`, `ion Assets`, `iTwin` | [references/3dtiles-models.md](references/3dtiles-models.md) |
| **Entities, Vector & Geometries** (GeoJSON, MVT, `BufferPrimitiveCollection`, Labels, Shapes) | `Entities`, `Geometries`, `DataSources`, `Vector Tiles`, `Labels` | [references/entities-vector-geometries.md](references/entities-vector-geometries.md) |
| **Styling, Materials & Shaders** (`Cesium3DTileStyle`, `CustomShader`, Custom GLSL `Material`, Particles) | `Styling`, `Graphics` | [references/styling-materials-shaders.md](references/styling-materials-shaders.md) |
| **Animation, Interpolation & CZML** (`SampledPositionProperty`, Linear/Lagrange/Hermite, Clock, CZML) | `Animation`, `CZML` | [references/animation-czml.md](references/animation-czml.md) |
| **Camera, Picking & Snapping** (`setView`/`flyTo`/`lookAt`, modular `Controller`, `pick`/`drillPick`/`pickAsync`, `Scene.snap`) | `Camera`, `Picking`, `Snapping`, `Transformations` | [references/camera-picking-snapping.md](references/camera-picking-snapping.md) |
| **Clipping, Clamping & Classification** (`ClippingPolygonCollection`, `ClippingPlaneCollection`, `HeightReference`, `ClassificationType`) | `Clipping`, `Clamping`, `Classification` | [references/clipping-clamping-classification.md](references/clipping-clamping-classification.md) |
| **Post-Processing, Atmosphere & Views** (`PostProcessStage`, Silhouettes, Bloom/AO/DOF, Fog, Underground, 2D) | `Post Processing`, `Atmosphere`, `2D View`, `Underground`, `Widgets`, `VR` | [references/postprocessing-atmosphere.md](references/postprocessing-atmosphere.md) |
| **Point Clouds, Voxels & Gaussian Splats** (Point cloud shading, `VoxelPrimitive`, Gaussian Splat LODs & comparison) | `Point Clouds`, `Voxels`, `Gaussian Splats` | [references/pointcloud-voxel-splats.md](references/pointcloud-voxel-splats.md) |

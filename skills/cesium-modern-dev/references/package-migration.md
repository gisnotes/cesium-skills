# Package Structure, ESM & TypeScript Baseline (1.100 – 1.148)

## 1. Package Architecture Timeline

| Version | Change | Action Required |
| :--- | :--- | :--- |
| `1.92` | `Cesium.when` removed in favor of native `Promise`. | Use native `Promise` / `async` / `await`. |
| `1.96` | Built `Cesium.js` dropped AMD format; `Build/Cesium/index.js` for ESM. | Use ESM imports; do not rely on AMD globals. |
| `1.99` | `requestAnimationFrame` / `cancelAnimationFrame` polyfills removed. | Use native browser APIs. |
| `1.100` | Monorepo split into `@cesium/engine` and `@cesium/widgets` alongside `cesium`. Published as ESM with `.d.ts`. Deep file imports removed. | Always import from `"cesium"`, `"@cesium/engine"`, or `"@cesium/widgets"`. Never import internal paths. |
| `1.109` | `TaskProcessor` loads workers as ESM instead of AMD. Minimum Firefox 114. | Ensure bundler/server serves worker scripts as ES modules. |
| `1.114` | `Resource` no longer depends on Node built-ins (`http`, `https`, `url`, `zlib`). | Remove legacy Node polyfill/external workarounds from Vite/Webpack configs. `RequestErrorEvent.response` in Node is now a standard `Response` object. |
| `1.141` | Minimum Node.js version bumped to **`22.0.0`**. | Use Node >= 22 for build/test pipelines. |
| `1.146` | New **`@cesium/core`** package extracted from `@cesium/engine` (math, geometry, time, utilities). | Projects using `@cesium/engine` must add `@cesium/core` to `package.json` and update imports (old exports removed in **`1.150`**). Projects using `"cesium"` need no change. |
| `1.147` | Private `GltfPipeline` utilities moved from `@cesium/engine/Source/Scene/GltfPipeline/` to internal `@cesium/gltf`. | Remove any unsupported internal imports from `GltfPipeline`. |
| `1.148` | `cesium` builds target **ES2022** instead of ES2020 (native class fields). | Ensure target browsers support ES2022 syntax (or transpile if supporting older browsers). |

## 2. Migrating from `@cesium/engine` to `@cesium/core` (`>= 1.146`, Removed in `1.150`)

```js
// Before (deprecated in 1.146, removed in 1.150)
import { Cartesian3, Color, JulianDate } from "@cesium/engine";

// After
import { Cartesian3, Color, JulianDate } from "@cesium/core";
```

### Complete List of Symbols Moved to `@cesium/core`
- **Math & Vectors / Matrices**: `Cartesian2`, `Cartesian3`, `Cartesian4`, `Cartographic`, `Matrix2`, `Matrix3`, `Matrix4`, `Quaternion`, `Plane`, `Ray`, `Spherical`, `HeadingPitchRange`, `HeadingPitchRoll`, `TranslationRotationScale`, `Math`, `CubicRealPolynomial`, `QuadraticRealPolynomial`, `QuarticRealPolynomial`, `TridiagonalSystemSolver`, `barycentricCoordinates`, `pointInsideTriangle`, `srgbToLinear`
- **Bounding & Culling / Intersections**: `AxisAlignedBoundingBox`, `BoundingRectangle`, `BoundingSphere`, `CullingVolume`, `EllipsoidalOccluder`, `Intersect`, `IntersectionTests`, `Intersections2D`, `Occluder`, `OrientedBoundingBox`, `OrthographicFrustum`, `OrthographicOffCenterFrustum`, `PerspectiveFrustum`, `PerspectiveOffCenterFrustum`, `Rectangle`, `Visibility`
- **Ellipsoid & Projections**: `Ellipsoid`, `EllipsoidGeodesic`, `EllipsoidRhumbLine`, `EllipsoidTangentPlane`, `GeographicProjection`, `MapProjection`, `Stereographic`, `WebMercatorProjection`
- **Geometry & Pipelines**: `ArcType`, `AttributeCompression`, `AttributeType`, `BoxGeometry`, `BoxOutlineGeometry`, `CircleGeometry`, `CircleOutlineGeometry`, `ComponentDatatype`, `CoplanarPolygonGeometry`, `CoplanarPolygonOutlineGeometry`, `CornerType`, `CorridorGeometry`, `CorridorOutlineGeometry`, `CylinderGeometry`, `CylinderOutlineGeometry`, `EllipseGeometry`, `EllipseOutlineGeometry`, `Geometry`, `GeometryAttribute`, `GeometryAttributes`, `GeometryFactory`, `GeometryInstance`, `GeometryInstanceAttribute`, `GeometryOffsetAttribute`, `GeometryPipeline`, `ColorGeometryInstanceAttribute`, `DistanceDisplayConditionGeometryInstanceAttribute`, `ShowGeometryInstanceAttribute`, `IndexDatatype`, `PlaneGeometry`, `PlaneOutlineGeometry`, `PolygonGeometry`, `PolygonHierarchy`, `PolygonOutlineGeometry`, `PolygonPipeline`, `PolylineGeometry`, `PolylinePipeline`, `PolylineVolumeGeometry`, `PolylineVolumeOutlineGeometry`, `PrimitiveType`, `SimplePolylineGeometry`, `SphereGeometry`, `SphereOutlineGeometry`, `VertexFormat`, `WallGeometry`, `WallOutlineGeometry`, `WindingOrder`
- **Splines & Interpolation**: `CatmullRomSpline`, `ConstantSpline`, `ExtrapolationType`, `HermitePolynomialApproximation`, `HermiteSpline`, `InterpolationType`, `LagrangePolynomialApproximation`, `LinearApproximation`, `LinearSpline`, `MorphWeightSpline`, `Packable`, `PackableForInterpolation`, `QuaternionSpline`, `Spline`, `SteppedSpline`
- **Time**: `Clock`, `ClockRange`, `ClockStep`, `GregorianDate`, `Interval`, `Iso8601`, `JulianDate`, `LeapSecond`, `ReferenceFrame`, `TimeConstants`, `TimeInterval`, `TimeIntervalCollection`, `TimeStandard`, `TrackingReferenceFrame`
- **Utilities & Rendering Constants**: `AssociativeArray`, `Check`, `DeveloperError`, `DistanceDisplayCondition`, `Event`, `EventHelper`, `Frozen`, `NearFarScalar`, `PixelDatatype`, `PixelFormat`, `Queue`, `RuntimeError`, `VerticalExaggeration`, `WebGLConstants`, `binarySearch`, `clone`, `combine`, `createGuid`, `defined`, `destroyObject`, `formatError`, `getAbsoluteUri`, `getBaseUri`, `getExtensionFromUri`, `getFilenameFromUri`, `getTimestamp`, `isLeapYear`, `mergeSort`, `objectToQuery`, `queryToObject`, `subdivideArray`

## 3. TypeScript & Language Gotchas

- **`PrimitiveCollection.add` return type (`1.146`)**: Now returns the specific added primitive type instead of `any`.
- **Importing `knockout` from `cesium` (`1.146`)**: TypeScript error fixed.
- **No `new` on static factories (`1.139`)**: `Cartesian2`, `Cartesian3`, `Cartesian4` are ES6 classes. Calling `new Cartesian3.fromArray(...)` throws `TypeError`. Always call static factories without `new`.

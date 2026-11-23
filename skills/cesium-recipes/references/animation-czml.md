# Animation, Interpolation & CZML Recipes

## 1. Position Interpolation (`interpolation`)

Use `SampledPositionProperty` with `LinearApproximation`, `LagrangePolynomialApproximation`, or `HermitePolynomialApproximation` to interpolate smooth trajectories from discrete timestamped samples:

```js
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());

viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
viewer.clock.multiplier = 10;
viewer.clock.shouldAnimate = true;

// Build sampled positions
const position = new Cesium.SampledPositionProperty();
for (let i = 0; i <= 360; i += 45) {
  const time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
  const pos = Cesium.Cartesian3.fromDegrees(-112.11 + i * 0.0001, 36.1, 2000);
  position.addSample(time, pos);
}

// Switch interpolation algorithm
position.setInterpolationOptions({
  interpolationDegree: 5,
  interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
  // Or: Cesium.LinearApproximation (degree 1)
  // Or: Cesium.HermitePolynomialApproximation (degree 2)
});

const entity = viewer.entities.add({
  availability: new Cesium.TimeIntervalCollection([
    new Cesium.TimeInterval({ start, stop }),
  ]),
  position,
  orientation: new Cesium.VelocityOrientationProperty(position),
  trackingReferenceFrame: Cesium.TrackingReferenceFrame.ENU, // prevents abrupt camera flips
  model: { uri: "/models/Cesium_Air.glb", minimumPixelSize: 64 },
  path: {
    resolution: 1,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.1,
      color: Cesium.Color.YELLOW,
    }),
    width: 10,
  },
});
```

## 2. Other Animation & CZML Scenarios (`gallery/<id>`)
- **Clock control**: `clock`
- **CZML loading**: `czml`, `czml-3d-tiles`, `czml-path`, `czml-point-time-dynamic`, `czml-model-articulations`
- **Segmented path material (`>= 1.143`)**: `PathGraphics.materialMode = "PORTIONS"`
- **Time-dynamic point cloud**: `time-dynamic-point-cloud`
- **Manual glTF node animation**: `manually-controlled-animation`, `time-dynamic-wheels`

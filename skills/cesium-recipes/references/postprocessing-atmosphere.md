# Post-Processing, Atmosphere & View Recipes

## 1. Custom Post-Process Shader (`custom-post-process`)

> Must use **GLSL 300** (`in` / `out_FragColor` / `texture(...)`) since WebGL2 is the default (`>= 1.102`).

```js
const fragmentShaderSource = `
  uniform sampler2D colorTexture;
  in vec2 v_textureCoordinates;
  void main(void) {
    vec4 color = texture(colorTexture, v_textureCoordinates);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    out_FragColor = vec4(vec3(gray), color.a);
  }
`;

viewer.scene.postProcessStages.add(
  new Cesium.PostProcessStage({
    fragmentShader: fragmentShaderSource,
  }),
);
```

## 2. Built-in Silhouettes (`3d-tiles-feature-picking`)

```js
if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
  const silhouette = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
  silhouette.uniforms.color = Cesium.Color.LIME;
  silhouette.uniforms.length = 0.01;
  silhouette.selected = []; // push picked features here

  viewer.scene.postProcessStages.add(
    Cesium.PostProcessStageLibrary.createSilhouetteStage([silhouette]),
  );
}
```

## 3. Other Post-Processing, Atmosphere & View Scenarios (`gallery/<id>`)
- **Built-in stages**: `bloom`, `ambient-occlusion`, `depth-of-field`, `fxaa`, `msaa`, `high-dynamic-range`
- **Per-feature post process**: `per-feature-post-processing`, `custom-per-feature-post-process`
- **Atmosphere, Fog, Shadows & Lighting**: `atmosphere`, `fog`, `fog-post-process`, `shadows`, `lighting`
- **Underground & Translucency**: `underground-color`, `globe-translucency`, `globe-interior`
- **2D & Synced Views**: `rotatable-2d-map`, `multiple-synced-views`
- **Custom Geocoder / Inspector**: `custom-geocoder`, `3d-tiles-inspector`

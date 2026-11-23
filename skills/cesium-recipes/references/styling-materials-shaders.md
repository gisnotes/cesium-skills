# Styling, Materials & Custom Shader Recipes

## 1. `Cesium3DTileStyle` Conditional Styling (`3d-tiles-feature-styling`, `3d-tiles-point-cloud-classification`)

```js
tileset.style = new Cesium.Cesium3DTileStyle({
  color: {
    conditions: [
      ["${Height} >= 100", "color('purple', 0.8)"],
      ["${Height} >= 50", "color('red')"],
      ["true", "color('white')"],
    ],
  },
  show: "${Height} > 0",
});
```

## 2. `CustomShader` on 3D Tiles / Models / Gaussian Splats (`custom-shaders-3d-tiles`, `custom-shaders-models`)

> Remember: CesiumJS defaults to **WebGL2 (GLSL 300)**. In `>= 1.139`, `uint` metadata from `EXT_structural_metadata` is no longer cast to `int`.

```js
const customShader = new Cesium.CustomShader({
  lightingModel: Cesium.LightingModel.UNLIT,
  uniforms: {
    u_stripes: {
      type: Cesium.UniformType.SAMPLER_2D,
      value: new Cesium.TextureUniform({ url: "/textures/stripes.png" }),
    },
  },
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
      vec2 texCoord = vec2(fsInput.attributes.positionMC.y / 100.0, 0.0)
                    + 0.01 * vec2(czm_frameNumber, 0.0);
      material.diffuse = texture(u_stripes, texCoord).rgb;
    }
  `,
});

const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343, {
  customShader,
});
viewer.scene.primitives.add(tileset);
```

## 3. Custom GLSL `Material` & `MaterialAppearance` (`material-with-custom-glsl`)

```js
const customMaterial = new Cesium.Material({
  translucent: false,
  fabric: {
    type: "CustomAnimatedMaterial",
    uniforms: {
      time: 0.0,
    },
    source: `
      uniform float time;
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        material.diffuse = vec3(0.2, 0.6, 1.0);
        material.alpha = 0.5 + 0.5 * sin(time);
        return material;
      }
    `,
  },
});
```

## 4. Other Styling & Graphics Scenarios (`gallery/<id>`)
- **Model coloring & tinting**: `3d-models-coloring` (`model.color`, `ColorBlendMode.MIX / HIGHLIGHT / REPLACE`)
- **Property textures in shaders**: `custom-shaders-property-textures`
- **Metadata-driven styling**: `aec-metadata-styling`, `3d-tiles-1.1-cdb-yemen`
- **Particle systems**: `particle-system`, `particle-system-fireworks`, `particle-system-tails`, `particle-system-weather`
- **Volumetric clouds**: `volumecloud` (`Texture3D`), `clouds`, `cloud-parameters`

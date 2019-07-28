import { BABYLON } from 'vue-babylonjs'
import { WaterMaterial } from '@babylonjs/materials'

class WaterObject {
    constructor(scene, options) {
        var waterMesh = BABYLON.Mesh.CreateGround('waterMesh', 1024, 1024, 0, scene, false);
        waterMesh.position.y = -0.1;
        var waterMaterial = new WaterMaterial('waterMaterial', scene, new BABYLON.Vector2(1024, 1024));
        waterMaterial.backFaceCulling = true;
        waterMaterial.bumpTexture = new BABYLON.Texture('/3d/textures/waterbump.png', scene);
        waterMaterial.windForce = -2;
        waterMaterial.waveHeight = 0.1;
        waterMaterial.bumpHeight = 0.1;
        waterMaterial.waveLength = 0.05;
        waterMaterial.colorBlendFactor = 0.1;
        this.WaterRender = function (skybox, meshs = null) {
            waterMaterial.addToRenderList(skybox);
            //
            if (meshs) {
                meshs.forEach(function (value) {
                    console.log('value', value);
                    waterMaterial.addToRenderList(value);
                });
            }
            waterMesh.material = waterMaterial;
        };
    }
}

export { WaterObject }
import { BABYLON } from 'vue-babylonjs'
import { WaterMaterial } from '@babylonjs/materials'

function CreateWater(scene, options) {
    var waterMesh = BABYLON.Mesh.CreateGround(
        'waterMesh',
        1024,
        1024,
        0,
        scene,
        false
    )
    waterMesh.position.y = -0.1
    var waterMaterial = new WaterMaterial(
        'waterMaterial',
        scene,
        new BABYLON.Vector2(1024, 1024)
    )
    waterMaterial.backFaceCulling = true
    waterMaterial.bumpTexture = new BABYLON.Texture(
        '3d/textures/waterbump.png',
        scene
    )
    waterMaterial.windForce = -2
    waterMaterial.waveHeight = 0.1
    waterMaterial.bumpHeight = 0.1
    waterMaterial.waveLength = 0.05
    waterMaterial.colorBlendFactor = 0.1

    return {
        waterMesh, waterMaterial
    }
}
function WaterRender(materials, waterObject) {
    materials.forEach(function (value) {
        console.log(value)
        waterObject.waterMaterial.addToRenderList(value)
    })
    waterObject.waterMesh.material = waterObject.waterMaterial
}

export { CreateWater, WaterRender }

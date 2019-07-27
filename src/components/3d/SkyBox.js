import { BABYLON } from 'vue-babylonjs'
//
function CreateSkyBox(scene, options) {
    var skybox = BABYLON.Mesh.CreateBox('skyBox', 1000.0, scene)
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        '3d/textures/TropicalSunnyDay',
        scene
    )
    skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.disableLighting = true
    skybox.material = skyboxMaterial

    return skybox
}

export { CreateSkyBox }

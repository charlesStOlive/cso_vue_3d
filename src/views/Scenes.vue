<template>
  <Scene v-model="myScene" @scene="onScene" @complete="onComplete">
    <Entity>
      <Camera
        :position="[0, 0, 0]"
        v-model="camera"
        type="arcRotate"
        :radius="90"
        @complete="onCompleteCamera"
      />
      <DirectionalLight specular="#FFF" diffuse="FFF" :direction="[1, -1,0.3]" />
      <HemisphericLight
        diffuse="#FFF"
        v-model="hemispheric_light"
        @complete="onCompleteHemisphericLight"
      />

      <!-- <Asset
        src="/3d/Low-poly scene.gltf"
        v-model="myAssetRoot"
        :scaling="[0.1, 0.1, 0.1]"
        :position="[0, 0, 0]"
      >
      </Asset>-->
      <!-- <Sphere v-model="mySphere" :position="[0, 0, 0]" :scaling="[20,20,20]"></Sphere> -->
      <!-- <Asset
        v-model="mySkull"
        src="https://www.babylonjs-playground.com/scenes/skull.babylon"
        :scaling="[0.02, 0.02, 0.02]"
        :position="[-1, 0, -1]"
      >
        <Material diffuse="#F00" :metallic="0" :roughness="1">

        </Material>
      </Asset>
      <Sphere v-model="mySphere" :position="[-1.5, 0, 0]"></Sphere>-->
    </Entity>
  </Scene>
</template>
<script>
import { BABYLON } from 'vue-babylonjs'
import { WaterMaterial } from '@babylonjs/materials'

export default {
  data () {
    return {
      farm_texture: '3d/textures/base_texture.jpg',
      myAssetRoot: null,
      mySphere: null,
      camera: null,
      mySkull: null,
      myScene: null,
      myMaterial: null,
      hemispheric_light: null
    }
  },
  mounted () {
    this.$store.dispatch('user/getSettings')
  },

  methods: {
    onScene (scene) {
      // Création du loader
      BABYLON.SceneLoader.ImportMesh('', '3d/', 'lpi2.babylon', scene, function (
        newMeshes
      ) {
        console.log(newMeshes)

        var myMaterial = new BABYLON.StandardMaterial('myMaterial', scene)
        myMaterial.diffuseTexture = new BABYLON.Texture(
          '3d/textures/base_texture.jpg',
          scene
        )
        // myMaterial.backFaceCulling = true
        myMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
        newMeshes[0].material = myMaterial
        // do something with the meshes and skeletons
        // particleSystems are always null for glTF assets
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

        // Ground
        var groundTexture = new BABYLON.Texture('3d/textures/sand.jpg', scene)
        groundTexture.vScale = groundTexture.uScale = 4.0

        var groundMaterial = new BABYLON.StandardMaterial(
          'groundMaterial',
          scene
        )
        groundMaterial.diffuseTexture = groundTexture

        // var ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 32, scene, false);
        // ground.position.y = -2;
        // ground.material = groundMaterial;

        // Water
        var waterMesh = BABYLON.Mesh.CreateGround(
          'waterMesh',
          1024,
          1024,
          0,
          scene,
          false
        )
        waterMesh.position.y = -0.1
        var water = new WaterMaterial(
          'water',
          scene,
          new BABYLON.Vector2(1024, 1024)
        )
        water.backFaceCulling = true
        water.bumpTexture = new BABYLON.Texture(
          '3d/textures/waterbump.png',
          scene
        )
        water.windForce = -2
        water.waveHeight = 0.1
        water.bumpHeight = 0.1
        water.waveLength = 0.05
        water.colorBlendFactor = 0.1
        //
        var sphereMaterial = new BABYLON.StandardMaterial(
          'sphereMaterial',
          scene
        )
        sphereMaterial.diffuseTexture = new BABYLON.Texture(
          '3d/textures/wood.jpg',
          scene
        )

        var sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 10, scene)
        sphere.position.x = -20
        sphere.material = sphereMaterial

        // water.addToRenderList(this.myAssetRoot);
        water.addToRenderList(skybox)
        water.addToRenderList(sphere)
        water.addToRenderList(newMeshes[0])

        waterMesh.material = water
      })

      //
    },
    onComplete (scene) {
      console.log('onComplete')
    },
    onCompleteCamera (scene) {
      console.log('onCompleteCamera myAssetRoot')
      // this.camera.lowerRadiusLimit = 40;
      // this.camera.upperRadiusLimit = 180;
      // this.camera.upperBetaLimit = 1.5;
      this.camera.useBouncingBehavior = true
    },
    onCompleteHemisphericLight (obj) {
      this.hemispheric_light.intensity = 0.2
    }
  },
  watch: {
    myScene () {
      // myScene is now available from the component
      // do something with it here or call a method to use it from here
    },

    myAssetRoot () {
      console.log('Watch myAssetRoot')
      console.log(this.myAssetRoot)
      // var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.myScene);
      // myMaterial.diffuseTexture = new BABYLON.Texture("3d/textures/wood.jpg", this.myScene);
      // this.myAssetRoot.material = myMaterial
    },
    camera () {
      console.log('Watch camera')
      console.log(this.camera)
      // var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.myScene);
      // myMaterial.emissiveTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png", this.myScene);
      // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
      // this.mySphere.material = myMaterial
      // myEntity is now available from the component
      // do something with it here or call a method to use it from here
    },
    mySkull () {
      // console.log("Watch mySkull");
      // console.log(this.mySkull);
      // var myMaterial = new BABYLON.StandardMaterial("myMaterial", this.myScene);
      // myMaterial.emissiveTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png", this.myScene);
      // myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
      // this.mySkull.material = myMaterial
      // myEntity is now available from the component
      // do something with it here or call a method to use it from here
    }
  }
}
</script>

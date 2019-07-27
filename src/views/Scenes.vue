<template>
  <Scene v-if="sceneReady" v-model="myScene" @scene="onScene" @complete="onComplete">
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
    </Entity>
  </Scene>
</template>
<script>
import { BABYLON } from 'vue-babylonjs'

import { CreateSkyBox } from '@/components/3d/SkyBox.js'
import { CreateWater, WaterRender } from '@/components/3d/Water.js'

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
      hemispheric_light: null,
      sceneReady: false
    }
  },
  mounted () {
    this.getApiData()
  },

  methods: {
    async getApiData () {
      await this.$store.dispatch('user/getSettings')
      console.log('OK getAPIData')
      this.sceneReady = true
    },
    onScene (scene) {
      console.log('ON SCENE')
      this.launchAssets(scene)
      //
    },
    launchAssets (scene) {
      BABYLON.SceneLoader.ImportMesh('', '3d/', 'lpi2.babylon', scene, function (
        newMeshes
      ) {
        
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

        // Création du skyBox
        var skybox = CreateSkyBox(scene, null)
        // Water
        var waterObj = CreateWater(scene, null)
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
        //
        var mesh1 = newMeshes[0]
        // Mettre le render de l'eau après la création des objets
        WaterRender([skybox, sphere, mesh1], waterObj)
      })
    },
    onComplete (scene) {
      console.log('onComplete')
    },
    onCompleteCamera (scene) {
      this.camera.lowerRadiusLimit = 40
      this.camera.upperRadiusLimit = 180
      this.camera.upperBetaLimit = 1.5
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
    }
  }
}
</script>

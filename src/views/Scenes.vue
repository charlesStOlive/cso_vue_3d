<template>
  <Scene v-if="scene_ready" v-model="myScene" @scene="onScene" @complete="onComplete">
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
import { mapGetters } from 'vuex'
//
import { BABYLON } from 'vue-babylonjs'
//
import { CreateSkyBox } from '@/components/3d/SkyBox.js'
import { CreateWater, WaterRender } from '@/components/3d/Water.js'
//
import { WaterObject } from '@/components/3d/WaterObject'

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
      tasks: null,
      assets: [],
      assetsManager: null,
      rootScene: null
    }
  },
  computed: {
      ...mapGetters({
        scene_ready : 'troisd/scene_ready',
        scene : 'troisd/scene',
      })
    },
  mounted () {
    this.getApiData()
  },

  methods: {
    async getApiData () {
      this.$store.dispatch('troisd/getScene', this.$route.params.slug)
    },
    onScene (scene) {
      console.log('ON SCENE')
      this.rootScene = scene
      this.launchAssets(scene)
      //
    },
    async launchAssets (scene) {
      this.assetsManager = new BABYLON.AssetsManager(scene)
      this.assets['ilandTask'] = this.assetsManager.addMeshTask('ilandTask', '', '/3d/', 'lpi2.babylon')
      // var tasks = this.assetsManager.addMeshTask('ilandTask', '', '3d/', 'lpi2.babylon')
      // Load assets
      this.assetsManager.load()

      // fonction à la fin
      this.assetsManager.onFinish = function (tasks) {
        console.log('stasks on finish...:', this.assets['ilandTask'])
        this.assets['ilandTask'].loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 0)
        this.finishScene(this.rootScene)
      }.bind(this)
    },
    finishScene (scene) {
      // var myMaterial = new BABYLON.StandardMaterial('myMaterial', scene)
      // myMaterial.diffuseTexture = new BABYLON.Texture(
      //   '3d/textures/base_texture.jpg',
      //   scene
      // )
      // myMaterial.backFaceCulling = true
      // myMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
      // this.task['ilandTask'].material = myMaterial
      // do something with the meshes and skeletons
      // particleSystems are always null for glTF assets

      // Création du skyBox
      var skybox = CreateSkyBox(scene, null)
      // Water
      //var waterObj = CreateWater(scene, null)
      var waterObj = new WaterObject(scene)
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
      //var mesh1 = this.assets['ilandTask']
      // Mettre le render de l'eau après la création des objets
      waterObj.WaterRender(skybox, [this.assets['ilandTask'].loadedMeshes[0], sphere])
      //WaterRender([skybox], waterObj)
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
    // 'assetsManager.onFinish': function () {
    //   console.log('assetsManager.onFinish')
    //   console.log(this.tasks['ilandTask']['loadedMeshes'])
    //   this.assets['ilandTask'] = this.tasks['ilandTask'].loadedMeshes[0]
    //   this.assets['ilandTask'].position = BABYLON.Vector3(1, 12, 1)
    //   this.finishScene(this.rootScene)
    //   // console.log(this.assets['ilandTask'])
    // },
    // 'assetsManager.onTaskSuccessObservable': function (task) {
    //   console.log('task successful', task)
    //   task.loadedMeshes[0].position = BABYLON.Vector3(1, 12, 1)
    // }
  }
}
</script>

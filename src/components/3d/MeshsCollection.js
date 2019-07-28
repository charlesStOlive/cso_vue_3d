import store from '@/store/index'

export class MeshsCollection {
  meshsApi
  meshs
  constructor(scene_id = null, datas = null) {
    this.meshsApi = datas
  }
  fillMeshs() {
    this.meshsApi = store.getters['troisD/getMeshs']
  }
  getAllMeshs() {
    console.log('getAllMeshs')
    return this.meshsApi
  }
  findMeshs($id) {
    console.log('findMeshs')
    return this.meshsApi.find(obj => obj.id === id);
  }
  addMesh() {
    console.log('fonction 1')
  }
  removeMesh() {
    console.log('fonction 1')
  }
}

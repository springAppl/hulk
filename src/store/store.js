import { observable, computed, action, decorate } from "mobx"

export default class Store {
  @observable components = []
  @observable edit = 10000
  @observable selectKey = '1'

  @action
   load(){
    fetch('/api/index')
    .then(response =>  response.json())
    .then(data => {
      return this.components = data
    });
  }



  loadShopDetail(){
    fetch('/api/shop-detail/detail')
    .then(response =>  response.json())
    .then(data => {
      return this.components = data
    });
  }

  @action
   template(){
    fetch('/api/index/use/default', {method: 'PUT'})
    .then(response =>  response.json())
    .then(data => {
      return this.components = data
      // return data
    });
  }

  @action
  refreshData(data){
    this.components = data
  }
  @action
  changeIndex(data){
    fetch('/api/index', {
        body: JSON.stringify(data),
        method: 'PUT'
    })
  }

  changeShopDetail(data) {
    fetch('/api/shop-detail', {
      body: JSON.stringify(data),
      method: 'PUT'
    })
  }


  @action
  setEdit(data){
    this.edit = data
  }
  @computed get getEdit() {
    return this.edit;
  }

  @action
  updateSelectKey(key){
    this.selectKey = key;
  }
}

// decorate(Store, {
//   load: action,
//   refreshData: action,
//   putChange: action,
//   setEdit: action,
//   getEdit: computed
// })

// export default new Store()
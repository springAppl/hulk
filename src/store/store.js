import { observable, computed, action, decorate } from "mobx"

class Store {
  @observable components = []
  @observable edit = 10000
  @observable selectKey = '1'

  @action
   load(){
    fetch('/api/index')
    .then(response =>  response.json())
    .then(data => {
      return this.components = data
      console.log(this.components)
      // return data
    });
  }
  @action
   template(){
    fetch('/api/index/template', {method: 'PUT'})
    .then(response =>  response.json())
    .then(data => {
      return this.components = data
      console.log(this.components)
      // return data
    });
  }

  @action
  refreshData(data){
    this.components = data
  }
  @action
  putChange(data){
    fetch('/api/index', {
        body: JSON.stringify(data),
        method: 'PUT'
    })
  }
  @action
  setEdit(data){
    this.edit = data
  }
  get getEdit() {
    return this.edit;
  }

  @action
  updateSelectKey(key){
    this.selectKey = key;
  }
}

decorate(Store, {
//  components: observable,
//  edit: observable,
  load: action,
  refreshData: action,
  putChange: action,
  setEdit: action,
  getEdit: computed
})

export default new Store()
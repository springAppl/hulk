import { observable, computed, action, decorate } from "mobx"

class Store {
  @observable components = []
  @observable edit = null

   load(){
    fetch('/api/index')
    .then(response =>  response.json())
    .then(data => {
      return this.components = data
      console.log(this.components)
      // return data
    });
  }
  refreshData(data){
    this.components = data
  }

  putChange(data){
    fetch('/api/index', {
        body: JSON.stringify(data),
        method: 'PUT'
    })
  }

  setEdit(data){
    this.edit = data
  }
  get getEdit() {
    return this.edit;
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

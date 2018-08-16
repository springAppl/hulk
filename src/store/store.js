import { observable, computed, action, decorate } from "mobx"

class Store {
   components = []
   edit = {}

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
}

decorate(Store, {
  components: observable,
  edit: observable,
  load: action,
  refreshData: action,
  putChange: action,
  setEdit: action
})

export default new Store()

export const dictionaryService = ({
  getAll () {
    return JSON.parse(window.localStorage.getItem('dictionaries')) || []
  },
  getById(id) {
    return this.getAll().find(dictionary => dictionary.id === +id)
  },
  add(dictionary){
    let dictionaries = this.getAll()
    let dictionaryObj = JSON.parse(dictionary)
    dictionaryObj.id = dictionaries.length === 0 ? 0 : dictionaries[dictionaries.length-1].id + 1
    dictionaries.push(dictionaryObj)

    window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries))
  },
  update(dictionary){
    let dictionaries = this.getAll()
    let dictionaryObj = JSON.parse(dictionary)

    const dictionaryIdx = dictionaries.findIndex(dict => dict.id === +dictionaryObj.id)
    if(dictionaryIdx === -1){
      return;
    }
    
    dictionaries[dictionaryIdx] = dictionaryObj

    window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries))
  },
  removeById(id) {
    let dictionaries = this.getAll()

    const dictionaryIdx = dictionaries.findIndex(dict => dict.id === +id)
    if(dictionaryIdx === -1){
      return;
    }

    dictionaries.splice(dictionaryIdx, 1) 
    window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries))
  }


})

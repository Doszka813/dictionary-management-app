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
    dictionaryObj.id = dictionaries.length
    dictionaries.push(dictionaryObj)
    window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries))
  },
  update(dictionary){
    let dictionaries = this.getAll()
    let dictionaryObj = JSON.parse(dictionary)

    const dictionaryIdx = dictionaries.findIndex(dict => dict.id === +dictionaryObj.id)
    dictionaries[dictionaryIdx] = dictionaryObj

    window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries))
  },
  removeById(id) {
    let dictionaries = this.getAll()

    const dictionaryIdx = dictionaries.findIndex(dict => dict.id === id)
    dictionaries.splice(dictionaryIdx, 1) 
    window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries))
  }


})

/* eslint-disable no-unused-vars */
export var DictionaryService = {
  methods: {
    findDuplicates (data) {
      let duplicates = []
      data.forEach((element, index) => {
        // Find if there is a duplicate or not
        if (data.indexOf(element, index + 1) > -1) {
          // Find if the element is already in the result array or not
          if (duplicates.indexOf(element) === -1) {
            duplicates.push(element)
          }
        }
      })
      return duplicates
    }
  }
}

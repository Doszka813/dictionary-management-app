export const dictionaryService = ({
  findDuplicates: function (data) {
    let duplicates = []
    let domains = data.map(el => el.domain)
    data.forEach((element, index) => {
      let duplicateIdx = domains.indexOf(element.domain, index + 1)
      if (duplicateIdx > -1) {
        if (element.range === data[duplicateIdx].range &&
          duplicates.indexOf(duplicateIdx) === -1) {
          if (duplicates.indexOf(index) === -1) {
            duplicates.push(index)
          }
          duplicates.push(duplicateIdx)
        }
      }
    })
    console.log(duplicates)
  }
})

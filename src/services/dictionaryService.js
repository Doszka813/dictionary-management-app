export const dictionaryService = ({
  findDuplicates (data) {
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
    return duplicates
  },
  findForks (data) {
    let forks = []
    let domains = data.map(el => el.domain)
    data.forEach((element, index) => {
      let forkIdx = domains.indexOf(element.domain, index + 1)
      if (forkIdx > -1) {
        if (element.range !== data[forkIdx].range &&
          forks.indexOf(forkIdx) === -1) {
          if (forks.indexOf(index) === -1) {
            forks.push(index)
          }
          forks.push(forkIdx)
        }
      }
    })
    console.log(forks)
    return forks
  },
  findChains (data) {
    let chains = []
    let domains = data.map(el => el.domain)
    data.forEach((element, index) => {
      let chainIdx = domains.indexOf(element.range)
      if (chainIdx > -1) {
        if (chains.indexOf(chainIdx) === -1) {
          if (chains.indexOf(index) === -1) {
            chains.push(index)
          }
          chains.push(chainIdx)
        }
      }
    })
    console.log(chains)
    return chains
  }
})

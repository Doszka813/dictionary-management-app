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
    return forks
  },
  findChains (data) {
    let chains = []
    let domains = data.map(el => el.domain)
    data.forEach((element, index) => {
      let chainIdx = domains.indexOf(element.range)
      if (chainIdx > -1) {
        if (element.domain !== data[chainIdx].range && chains.indexOf(chainIdx) === -1) {
          if (chains.indexOf(index) === -1) {
            chains.push(index)
          }
          chains.push(chainIdx)
        }
      }
    })
    return chains
  },
  findCycles (data) {
    let cycles = []
    let domains = data.map(el => el.domain)
    data.forEach((element, index) => {
      let cycleIdx = domains.indexOf(element.range)
      if (cycleIdx > -1) {
        if (element.domain === data[cycleIdx].range && cycles.indexOf(cycleIdx) === -1) {
          if (cycles.indexOf(index) === -1) {
            cycles.push(index)
          }
          cycles.push(cycleIdx)
        }
      }
    })
    return cycles
  }
})

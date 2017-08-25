(function () {
  function mapNodeListToArray(nodeList) {
    return Array.prototype.slice.apply(nodeList)
  }
  const tabCard = document.querySelector('.ui-tab-card')
  const tabListItems = mapNodeListToArray(tabCard.querySelectorAll('.ui-tab-list-item'))
  const tabCotentItems = mapNodeListToArray(tabCard.querySelectorAll('.ui-tab-content-item'))
  let looping = true
  // 点击事件处理
  const clickHandler = function (event) {
    const target = event.target
    const index = target.dataset.index
    if (target.tagName.toLowerCase() === 'li') {
      const isActive = target.classList.contains('active')
      !isActive && showContent(index)
      looping = false
    }
  }
  // 根据 index 值显示对应的某一项
  const showContent = function (index) {
    tabCotentItems.forEach(function (item) {
      item.classList.remove('active')
    })
    tabListItems.forEach(function (item) {
      item.classList.remove('active')
    })
    tabCotentItems[index].classList.add('active')
    tabListItems[index].classList.add('active')
  }
  // TODO interval display
  const loogDisplay = function (delay) {
    const length = tabListItems.length
    let activeIndex = tabListItems.findIndex(function (item) {
      return item.classList.contains('active')
    })
    showContent(activeIndex)
    if (looping) {
      const timeout = setInterval(function () {
        activeIndex += 1
        if (activeIndex < length) {
          showContent(activeIndex)
        } else {
          activeIndex = 0
          showContent(activeIndex)
        }
      }, delay)
    } else {
      clearInterval(timeout)
    }
  }
  // loogDisplay(1500)
  // TODO default display
  // showContent(1)
  tabCard.addEventListener('click', clickHandler, false)
})()











(function () {
  function mapNodeListToArray (nodeList) {
    return Array.prototype.slice.apply(nodeList)
  }
  const tabCard = document.querySelector('.ui-tab-card')
  // 点击事件处理
  const clickHandler = function (event) {
    const target = event.target
    const index = target.dataset.index
    if (target.tagName.toLowerCase() === 'li') {
      const isActive = target.classList.contains('active')
      !isActive && showContent(index)
    }
  }
  // 根据 index 值显示对应的某一项
  const showContent = function (index) {
    const tabCotentItems = mapNodeListToArray(tabCard.querySelectorAll('.ui-tab-content-item'))
    const tabListItems = mapNodeListToArray(tabCard.querySelectorAll('.ui-tab-list-item'))
    tabCotentItems.forEach(function(item) {
      item.classList.remove('active')
    })
    tabListItems.forEach(function(item) {
      item.classList.remove('active')
    })
    tabCotentItems[index].classList.add('active')
    tabListItems[index].classList.add('active')
  }
  tabCard.addEventListener('click', clickHandler, false)
})()
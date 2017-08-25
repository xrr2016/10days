(function () {
  const Tab = function (selector, config) {
    const _config = {
      items: 3,
      width: 400,
      height: 40,
      color: '#007bbb',
      contentHeight: 200
    }
    this.config = config || {}
    this.container = document.querySelector(selector)
    Object.assign(_config, this.config)
    if (!(this instanceof Tab)) {
      return new Tab(config)
    }
    this.init(_config)
  }
  Tab.prototype.init = function (config) {
    
  }
})()











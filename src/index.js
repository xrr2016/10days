class LazyLoad {
  _config = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  }

  constructor(selector = '.lazy-load', config = {}) {
    this.selector = selector
    this.config = Object.assign(_config, { ...config })

    let observer =
      new window.IntersectionObserver(
        this.onIntersection(this.load),
        this.config
      ) || null
  }

  load(ele) {
    !!ele.dataset.src && (ele.src = ele.getAttribute('data-src'))
    !!ele.dataset.srcset && (ele.srcset = ele.dataset.srcset)
    !!ele.dataset.bgImg &&
      (ele.style.backgroundImage = `url(${ele.dataset.bgImg})`)
  }

  isLoaded = ele => ele.dataset.isLoaded === 'true'
  markItLoaded = ele => (ele.dataset.isLoaded = 'true')

  onIntersection = load => (entries = [], observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return
      observer.unobserve(entry.target)

      if (!this.isLoaded(entry.target)) {
        this.load(entry.target)
        this.markItLoaded(entry.target)
      }
    })
  }

  observe = () => {
    const elements = document.querySelectorAll(this.selector)
    for (let i = 0; i < elements.length; i++) {
      if (this.isLoaded(elements[i])) {
        continue
      }
      if (observer) {
        observer.observe(elements[i])
        continue
      }
      this.load(elements[i])
      this.markItLoaded(elements[i])
    }
  }

  triggerLoad = ele => {
    if (this.isLoaded(ele)) return
    this.load(ele)
    this.markItLoaded(ele)
  }
}

export default LazyLoad

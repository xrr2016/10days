function markItLoaded(ele) {
  ele.dataset.isLoaded = 'true'
}

const _config = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
  load(ele) {
    !!ele.dataset.src && (ele.src = ele.getAttribute('data-src'))
    !!ele.dataset.srcset && (ele.srcset = ele.dataset.srcset)
    !!ele.dataset.bgImg &&
      (ele.style.backgroundImage = `url(${ele.dataset.bgImg})`)
  }
}

const isLoaded = ele => ele.dataset.isLoaded === 'true'

const onIntersection = load => (entries = [], observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio <= 0) return
    observer.unobserve(entry.target)

    if (!isLoaded(entry.target)) {
      load(entry.target)
      markItLoaded(entry.target)
    }
  })
}

export default (selector = '.lazy-load', config = {}) => {
  const { rootMargin, threshold, load } = { ..._config, ...config }
  let observer =
    new window.IntersectionObserver(onIntersection(load), {
      rootMargin,
      threshold
    }) || null

  return {
    observe() {
      const elements = document.querySelectorAll(selector)
      for (let i = 0; i < elements.length; i++) {
        if (isLoaded(elements[i])) {
          continue
        }
        if (observer) {
          observer.observe(elements[i])
          continue
        }
        load(elements[i])
        markItLoaded(elements[i])
      }
    },
    triggerLoad(ele) {
      if (isLoaded(ele)) return
      load(ele)
      markItLoaded(ele)
    }
  }
}

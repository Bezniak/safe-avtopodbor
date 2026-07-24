import { useEffect, useRef } from 'react'

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null)
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('animate-in')
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          element.classList.remove('animate-in')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return elementRef
}

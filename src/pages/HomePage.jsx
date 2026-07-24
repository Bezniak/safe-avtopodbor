import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Services from '../components/Services'
import Guarantees from '../components/Guarantees'
import Advantages from '../components/Advantages'
import CarsCases from '../components/CarsCases'
import Pricing from '../components/Pricing'

const HomePage = () => {
  const location = useLocation()

  // Обработка скролла к секции при загрузке или изменении хэша
  useEffect(() => {
    // Если есть хэш в URL, скроллим к нужной секции
    if (location.hash) {
      const id = location.hash.replace('#', '')
      // Небольшая задержка, чтобы дать странице время отрендериться
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          const headerOffset = 100; // Высота header + отступ
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100)
    } else {
      // Если хэша нет, скроллим к началу
      window.scrollTo(0, 0)
    }
  }, [location])


  return (
    <main>
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Guarantees />
      <Advantages />
      <CarsCases />
      <Pricing />
    </main>
  )
}

export default HomePage

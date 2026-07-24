import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy loading для страниц - загружаются только при переходе на них
const HomePage = lazy(() => import('./pages/HomePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const CookieBanner = lazy(() => import('./components/CookieBanner'))

// Компонент загрузки для Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-sm">Загрузка...</p>
    </div>
  </div>
)

// Компонент для прокрутки к началу при смене маршрута
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Мгновенная прокрутка при смене страницы
    })

    // Отправка хита в Яндекс.Метрику при смене страницы (для SPA)
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(105138555, 'hit', window.location.href);
      console.log('[Яндекс.Метрика] Отправлен хит:', window.location.href);
    }

    // Отправка pageview в Google Analytics при смене страницы
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-YZCJNB5SQ5', {
        page_path: pathname
      });
      console.log('[GA4] Отправлен pageview:', pathname);
    }
  }, [pathname])

  return null
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Симулируем загрузку контента
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        {loading && <Preloader />}
        <div className="min-h-screen bg-black">
          <Header />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/form" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <Suspense fallback={null}>
            <CookieBanner />
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App

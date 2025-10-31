import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Проверяем, принял ли пользователь cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Показываем баннер с небольшой задержкой для лучшего UX
      setTimeout(() => {
        setIsVisible(true)
      }, 1000)
    }
  }, [])

  const handleAccept = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'accepted')
      setIsVisible(false)
    }, 300)
  }

  const handleDecline = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem('cookieConsent', 'declined')
      setIsVisible(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleAccept}></div>
      
      {/* Баннер */}
      <div className="relative container mx-auto px-4 pb-4">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 rounded-xl p-4 md:p-5 shadow-2xl max-w-6xl mx-auto" style={{ borderColor: 'rgba(var(--primary-rgb), 0.5)', boxShadow: '0 25px 50px -12px rgba(var(--primary-rgb), 0.2)' }}>
          {/* Декоративные элементы */}
          <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}></div>
          <div className="absolute -bottom-2 -left-2 w-24 h-24 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.1)', animationDelay: '0.5s' }}></div>

          <div className="relative flex flex-col md:flex-row items-center gap-4">
            {/* Иконка */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))', boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)' }}>
                <span className="text-2xl">🍪</span>
              </div>
            </div>

            {/* Текст */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-300 text-sm leading-snug">
                Мы используем файлы cookie для улучшения работы сайта.
                Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                <Link
                  to="/privacy"
                  className="underline transition-colors"
                  style={{ color: 'var(--primary-light)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-light)'}
                  onClick={() => handleAccept()}
                >
                  политикой конфиденциальности
                </Link>.
              </p>
            </div>

            {/* Кнопки */}
            <div className="flex flex-row gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-2 text-white rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
                style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-dark))', boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundImage = 'linear-gradient(to right, var(--primary-dark), var(--primary-darker))'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'linear-gradient(to right, var(--primary), var(--primary-dark))'}
                aria-label="Принять использование cookies"
              >
                Принять
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-2 bg-transparent border-2 border-gray-700 text-gray-300 hover:text-white rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(55, 65, 81)'}
                aria-label="Отклонить использование cookies"
              >
                Отклонить
              </button>
            </div>
          </div>

          {/* Кнопка закрытия */}
          <button
            onClick={handleAccept}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Закрыть уведомление"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner

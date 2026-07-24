import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const NotFoundPage = () => {
  useEffect(() => {
    // Устанавливаем мета-тег для роботов, чтобы они знали что это 404
    const metaTag = document.createElement('meta')
    metaTag.name = 'prerender-status-code'
    metaTag.content = '404'
    document.head.appendChild(metaTag)

    // Обновляем title
    document.title = '404 - Страница не найдена | Безопасный АвтоПодбор'

    return () => {
      document.head.removeChild(metaTag)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Большая 404 */}
        <div className="mb-8">
          <h1
            className="text-[150px] sm:text-[200px] font-bold leading-none mb-0"
            style={{
              background: 'linear-gradient(to bottom, var(--primary), var(--primary-dark))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            404
          </h1>
        </div>

        {/* Иконка */}
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto opacity-50"
            style={{ color: 'var(--primary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Текст */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Страница не найдена
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            style={{
              backgroundColor: 'var(--primary)',
              boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
          >
            Вернуться на главную
          </Link>

          <Link
            to="/form"
            className="bg-transparent border-2 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            style={{ borderColor: 'var(--primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Оставить заявку
          </Link>
        </div>

        {/* Полезные ссылки */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 mb-4">Возможно, вас заинтересует:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/#services" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              Услуги
            </Link>
            <Link to="/#pricing" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              Тарифы
            </Link>
            <Link to="/#reviews" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              Отзывы
            </Link>
            <Link to="/#about" className="text-gray-400 hover:text-[var(--primary)] transition-colors">
              О нас
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage

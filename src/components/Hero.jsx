import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Динамический расчет количества лет работы (с 2016 года)
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - startYear;

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen md:min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24">
      {/* Фоновое изображение с элегантным параллаксом */}
      <div className="absolute inset-0">
        {/* На мобильных - плавающая анимация */}
        <div
          className="md:hidden absolute inset-0 bg-center"
          style={{
            backgroundImage: 'url(/000-144.jpg)',
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            animation: 'slideBackground 30s ease-in-out infinite',
          }}
        ></div>

        {/* На десктопе - параллакс эффект */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/000-144.jpg)',
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.05)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        ></div>

        {/* Легкое затемнение на мобильных, более темное на десктопе */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 md:from-black/75 md:via-black/45 md:to-black/85"></div>

        {/* Тонкий светящийся акцент */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 opacity-50" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }}></div>
      </div>

      {/* Элегантные плавающие частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: 'rgba(var(--primary-rgb), 0.2)',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `gentleFloat ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-2 sm:px-4 relative z-10 h-full flex flex-col justify-between md:block md:h-auto">
        {/* Заголовок вверху */}
        <div className="max-w-6xl mx-auto">
          {/* Логотип с утонченным эффектом - скрыт на мобильных */}
          <div className={`hidden md:flex justify-center mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div
              className="relative"
              style={{
                transform: `translateY(${mousePosition.y * 0.2}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.3)', animationDuration: '4s' }}></div>
              <img
                src="/лого 1 без фона.svg"
                alt="Безопасный АвтоПодбор"
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
                style={{
                  filter: `drop-shadow(0 0 30px rgba(var(--primary-rgb), 0.6))`,
                }}
              />
            </div>
          </div>


          {/* Стильный заголовок */}
          <div className={`text-center mb-0 md:mb-8 sm:md:mb-12 pt-8 md:pt-0 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
              <span className="block mb-1 sm:mb-2">Безопасный</span>
              <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-light), var(--primary))' }}>
                АвтоПодбор
              </span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 font-light tracking-wide mt-4 sm:mt-6 px-2">
              Подбор автомобилей под ключ
            </p>
            <div className="w-12 sm:w-16 h-0.5 bg-[var(--primary)] mx-auto mt-4 sm:mt-6"></div>
          </div>

          {/* Минималистичные карточки преимуществ - скрыты на мобильных */}
          <div className={`hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { number: `${yearsInBusiness}+`, text: 'Лет опыта', subtext: 'На рынке' },
              { number: '3', text: 'Вида гарантии', subtext: 'На услуги' },
              { number: '500+', text: 'Клиентов', subtext: 'Довольны выбором' },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-black/30 backdrop-blur-[2px] md:backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 sm:p-6 transition-all duration-500"
                style={{
                  transform: `translateY(${mousePosition.y * 0.05}px)`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)'}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary)] mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.number}
                  </div>
                  <div className="text-base sm:text-lg text-white font-medium mb-0.5 sm:mb-1">{item.text}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{item.subtext}</div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{ background: 'linear-gradient(to top, rgba(var(--primary-rgb), 0.05), transparent)' }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки внизу */}
        <div className="max-w-6xl mx-auto w-full">
          {/* Элегантные кнопки */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pb-8 md:pb-0 md:mb-6 sm:md:mb-8 px-2 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/form"
              className="group relative px-6 py-3 sm:px-10 sm:py-4 bg-[var(--primary)] text-white text-sm sm:text-base font-semibold rounded-md overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(var(--primary-rgb), 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)';
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Заказать подбор
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>

            <button
              onClick={() => scrollToSection('pricing')}
              className="group px-6 py-3 sm:px-10 sm:py-4 bg-transparent border-2 border-white text-white text-sm sm:text-base font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Узнать стоимость
              </span>
            </button>
          </div>

          {/* Тонкий бейдж внизу - скрыт на мобильных */}
          <div className={`hidden md:block text-center transition-all duration-1000 delay-800 px-2 mb-16 sm:mb-20 md:mb-24 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 md:text-gray-400 flex-wrap justify-center">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Быстро
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Надежно
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Профессионально
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Элегантная стрелка вниз - скрыта на мобильных */}
      <button
        onClick={() => scrollToSection('about')}
        className="hidden md:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 group cursor-pointer z-20 pointer-events-auto"
        aria-label="Прокрутить к следующей секции"
      >
        <div className="relative">
          {/* Пульсирующий круг-подсветка */}
          <div className="absolute inset-0 rounded-full blur-xl animate-pulse transition-all duration-500" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)', animationDuration: '3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.4)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.2)'}></div>

          {/* Внешний круг с градиентом */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/20 transition-all duration-500 flex items-center justify-center group-hover:scale-110" style={{ boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.8)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(var(--primary-rgb), 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.boxShadow = '0 0 0 0 rgba(var(--primary-rgb), 0.3)'; }}>
            {/* Внутренний светящийся круг */}
            <div className="absolute inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.1), transparent)' }}></div>

            {/* Стрелка с улучшенной анимацией */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                animation: 'smoothBounce 2.5s ease-in-out infinite',
                filter: `drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.3))`
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-light)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Декоративные частицы вокруг */}
          <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 animate-ping" style={{ backgroundColor: 'var(--primary-light)' }}></div>
          </div>
        </div>
      </button>

      <style>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(20px, -20px);
            opacity: 0.6;
          }
        }

        @keyframes smoothBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes slideBackground {
          0% {
            background-position: right center;
          }
          50% {
            background-position: left center;
          }
          100% {
            background-position: right center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

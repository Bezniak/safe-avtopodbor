import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useYandexMetrika } from '../hooks/useYandexMetrika';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { trackButtonClick } = useYandexMetrika();

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
    <section className="relative min-h-screen md:h-screen flex items-center justify-center bg-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-8 md:pb-0">
      {/* Фоновое изображение с элегантным параллаксом */}
      <div className="absolute inset-0">
        {/* На мобильных - плавающая анимация */}
        <div
          className="md:hidden absolute inset-0 bg-center"
          style={{
            backgroundImage: 'url(/000-144.jpg)',
            backgroundSize: 'cover',
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

        {/* Черный фон как на сайте */}
        <div className="absolute inset-0 bg-black"></div>

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
          {/* Логотип с утонченным эффектом - показываем на всех экранах */}
          <div className={`flex justify-center mb-3 sm:mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div
              className="relative"
              style={{
                transform: `translateY(${mousePosition.y * 0.2}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="car-with-effects">
                <img
                  src="/лого 1 без фона.svg"
                  alt="Безопасный АвтоПодбор"
                  className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-96 md:h-96 object-contain car-image"
                />

                {/* След от фар */}
                <div className="headlight-trail"></div>

                {/* Дым/пыль */}
                <div className="smoke-container">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="smoke-particle"
                      style={{
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Текст под логотипом */}
          <div className={`text-center mb-6 sm:mb-8 md:mb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Автоподбор в Москве и МО
            </h1>
          </div>

          {/* Стильный заголовок - убран */}

          {/* Минималистичные карточки преимуществ - показываем на всех экранах */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6 mb-4 sm:mb-8 md:mb-12">
              {[
                { number: '3', text: 'Вида гарантии', subtext: 'На услуги' },
                { number: `${yearsInBusiness}+`, text: 'Лет опыта', subtext: 'На рынке' },
                { number: '100+', text: 'Параметров проверки', subtext: 'Комплексная диагностика' },
                { number: '500+', text: 'Клиентов', subtext: 'Довольны выбором' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`group relative bg-black/30 backdrop-blur-[2px] md:backdrop-blur-sm border border-gray-800/50 rounded-lg transition-all duration-500 flex items-center justify-center ${i >= 2 ? 'col-span-2 md:col-span-1' : ''} ${i >= 2 ? 'max-w-md mx-auto w-full md:max-w-none' : ''}`}
                  style={{
                    transform: `translateY(${mousePosition.y * 0.05}px)`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: 'clamp(8px, 2vw, 24px)',
                    minHeight: 'clamp(90px, 15vh, 140px)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)'}
                >
                  <div className="text-center w-full">
                    <div
                      className="font-bold text-[var(--primary)] group-hover:scale-110 transition-transform duration-300"
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        marginBottom: 'clamp(4px, 1vh, 8px)',
                      }}
                    >
                      {item.number}
                    </div>
                    <div
                      className="text-white font-medium"
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                        marginBottom: 'clamp(2px, 0.5vh, 4px)',
                      }}
                    >{item.text}</div>
                    <div
                      className="text-gray-400"
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      }}
                    >{item.subtext}</div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{ background: 'linear-gradient(to top, rgba(var(--primary-rgb), 0.05), transparent)' }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Кнопки внизу */}
        <div className="max-w-6xl mx-auto w-full">
          {/* Элегантные кнопки */}
          <div className={`flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-stretch sm:items-center pb-6 sm:pb-8 md:pb-0 md:mb-6 sm:md:mb-8 px-2 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/form"
              onClick={() => trackButtonClick('Заказать подбор', 'hero')}
              className="group relative px-5 py-2.5 sm:px-6 sm:py-3 md:px-10 md:py-4 bg-[var(--primary)] text-white text-sm sm:text-base font-semibold rounded-md overflow-hidden transition-all duration-300 cursor-pointer"
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
              onClick={() => {
                scrollToSection('pricing');
                trackButtonClick('Узнать стоимость', 'hero');
              }}
              className="group px-5 py-2.5 sm:px-6 sm:py-3 md:px-10 md:py-4 bg-transparent border-2 border-white text-white text-sm sm:text-base font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
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

        /* Контейнер машины с эффектами */
        .car-with-effects {
          position: relative;
          animation: carDrive 8s ease-in-out infinite;
        }

        /* Машина внутри */
        .car-image {
          position: relative;
          z-index: 10;
        }

        @keyframes carDrive {
          0% {
            transform: translateX(-100vw) translateY(0) scale(0.8);
          }
          15% {
            transform: translateX(-20vw) translateY(-5px) scale(1);
          }
          50% {
            transform: translateX(0) translateY(0) scale(1);
          }
          85% {
            transform: translateX(20vw) translateY(-5px) scale(1);
          }
          100% {
            transform: translateX(100vw) translateY(0) scale(0.8);
          }
        }

        /* СЛЕД ОТ ФАР - желто-белый, спереди машины */
        .headlight-trail {
          position: absolute;
          right: -50px;
          top: 50%;
          transform: translateY(-50%);
          width: 200px;
          height: 80px;
          background: linear-gradient(90deg,
            transparent,
            rgba(255, 230, 150, 0.2),
            rgba(255, 255, 255, 0.3),
            rgba(255, 230, 150, 0.4));
          filter: blur(20px);
          animation: trailPulse 2s ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes trailPulse {
          0%, 100% {
            opacity: 0.7;
            filter: blur(25px);
          }
          50% {
            opacity: 0.4;
            filter: blur(20px);
          }
        }

        /* ДЫМ/ПЫЛЬ - серый, позади машины */
        .smoke-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: visible;
        }

        .smoke-particle {
          position: absolute;
          left: 20%;
          top: 55%;
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(150, 150, 150, 0.4), rgba(180, 180, 180, 0.2), transparent);
          border-radius: 50%;
          animation: smokeDrift 2s ease-out infinite;
        }

        @keyframes smokeDrift {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0.7;
          }
          100% {
            transform: translate(-400px, 60px) scale(2.5);
            opacity: 0;
          }
        }

      `}</style>
    </section>
  );
};

export default Hero;

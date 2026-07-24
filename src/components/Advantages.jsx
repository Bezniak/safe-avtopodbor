import { useState } from 'react';
import { Link } from 'react-router-dom';

const Advantages = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const advantages = [
    {
      number: "01",
      title: "Экспертный подбор по всем параметрам",
      description: "Подбираем автомобиль, основываясь на ваших пожеланиях и бюджете, проводим торги и добиваемся выгодных условий.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Тщательная техническая диагностика",
      description: "Проверяем автомобиль от кузова до двигателя, используя современное оборудование для выявления любых дефектов.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Юридическая безопасность",
      description: "Проверяем историю и юридическую чистоту авто по всем базам и сопровождаем сделку, помогая составить договор.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Удаленная работа",
      description: "Если вы находитесь в другом городе, мы организуем подбор и доставку авто, чтобы вы могли получить идеальный вариант, не выезжая из дома.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "05",
      title: "Окупаемость услуг",
      description: "Наши специалисты ведут переговоры с продавцом, что позволяет снизить цену авто и компенсировать стоимость подбора.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "06",
      title: "3 вида гарантии",
      description: "Предоставляем 3 вида гарантии. Вы платите за подбор 1 раз, а сэкономленные время, средства и защита от ошибок окупятся многократно.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section id="advantages" className="pt-10 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Анимированная сетка на фоне */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Летающие частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float${(i % 3) + 1} ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          ></div>
        ))}
      </div>

      {/* Вращающиеся кольца */}
      <div className="absolute top-1/4 left-10 w-64 h-64 opacity-20 pointer-events-none">
        <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-8 border-2 border-red-500 rounded-full" style={{ animation: 'spin-reverse 15s linear infinite' }}></div>
      </div>
      <div className="absolute bottom-1/4 right-10 w-48 h-48 opacity-20 pointer-events-none">
        <div className="absolute inset-0 border-2 border-red-500 rounded-full" style={{ animation: 'spin-reverse 12s linear infinite' }}></div>
        <div className="absolute inset-6 border-2 border-blue-500 rounded-full animate-spin-slow"></div>
      </div>

      {/* Волны энергии */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          animation: 'pulse-wave 4s ease-in-out infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Элегантный заголовок */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-red-600 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">Преимущества</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-2">
            Почему выбирают <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-light))' }}>нас</span>
          </h2>
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
            <div className="w-8 sm:w-12 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--primary))' }}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full"></div>
            <div className="w-16 sm:w-24 h-px bg-red-600"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full"></div>
            <div className="w-8 sm:w-12 h-px" style={{ background: 'linear-gradient(to left, transparent, var(--primary))' }}></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-4 sm:mt-6 md:mt-8 leading-relaxed px-4">
            6 причин доверить подбор автомобиля профессионалам
          </p>
        </div>

        {/* Стильная сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Свечение при hover */}
              <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-dark))' }}></div>

              {/* Карточка */}
              <div className="relative bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full transition-all duration-500 overflow-hidden" onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.5)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)'}>
                {/* Декоративная линия сверху */}
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }}></div>

                {/* Иконка и номер */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="text-red-600 transform group-hover:scale-110 transition-transform duration-500 [&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10 md:[&>svg]:w-12 md:[&>svg]:h-12">
                    {advantage.icon}
                  </div>
                  <span className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent transition-all duration-500" style={{ backgroundImage: hoveredIndex === index ? 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.4), transparent)' : 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.2), transparent)' }}>
                    {advantage.number}
                  </span>
                </div>

                {/* Заголовок */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4 transition-colors duration-300" style={{ color: hoveredIndex === index ? 'var(--primary)' : 'white' }}>
                  {advantage.title}
                </h3>

                {/* Описание */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {advantage.description}
                </p>

                {/* Декоративный элемент */}
                <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top left, rgba(var(--primary-rgb), 0.05), transparent)' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Элегантный CTA блок */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-light), var(--primary))' }}></div>
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-800/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Готовы начать поиск <span className="text-red-600">автомобиля?</span>
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
                  Оставьте заявку и получите бесплатную консультацию от наших экспертов
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link
                  to="/form"
                  className="group/btn relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-red-600 hover:bg-red-700 text-white rounded-lg md:rounded-xl text-sm sm:text-base md:text-lg font-semibold transition-all transform hover:scale-105 overflow-hidden cursor-pointer inline-flex w-full md:w-auto justify-center"
                  style={{ boxShadow: '0 25px 50px -12px rgba(var(--primary-rgb), 0.5)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Получить консультацию
                    <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -50px) scale(1.2);
            opacity: 0.7;
          }
          50% {
            transform: translate(-20px, -100px) scale(0.8);
            opacity: 0.5;
          }
          75% {
            transform: translate(40px, -70px) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          33% {
            transform: translate(-40px, -60px) scale(1.3);
            opacity: 0.8;
          }
          66% {
            transform: translate(35px, -90px) scale(0.9);
            opacity: 0.5;
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.35;
          }
          40% {
            transform: translate(50px, -80px) scale(1.4);
            opacity: 0.75;
          }
          80% {
            transform: translate(-30px, -110px) scale(0.85);
            opacity: 0.55;
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-wave {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.1;
          }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Advantages;

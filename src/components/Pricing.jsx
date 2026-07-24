import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Диагностика авто",
      price: "от 3 999",
      popular: false,
      description: "Проверка конкретного автомобиля перед покупкой",
      features: [
        "Выезд к автомобилю",
        "Компьютерная диагностика",
        "Проверка кузова толщиномером",
        "Детальный осмотр двигателя",
        "Проверка автомобиля в сервисе по договоренности",
        "Тест-драйв",
        "Проверка пробега",
        "Полный отчет с рекомендациями"
      ]
    },
    {
      name: "Подбор под ключ",
      price: "от 14 900",
      popular: true,
      description: "Полный цикл подбора автомобиля",
      features: [
        "Подбор по вашим критериям",
        "Проверка неограниченного количества авто",
        "Все виды диагностики",
        "Полная юридическая проверка",
        "Проверка по всем базам",
        "Письменный отчет с фото",
        "Торг с продавцом",
        "Сопровождение сделки",
        "Гарантия на услуги"
      ]
    },
    {
      name: "Помощь в оформлении",
      price: "от 1 999",
      popular: false,
      description: "Юридическое сопровождение сделки",
      features: [
        "Составление договора купли-продажи",
        "Проверка документов",
        "Консультация юриста",
        "Помощь в постановке на учет",
        "Оформление страховки",
        "Сопровождение в ГИБДД"
      ]
    }
  ];

  const handleOrderClick = (plan) => {
    navigate(`/form?service=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price + ' ₽')}`);
  };

  return (
    <section id="pricing" className="pt-12 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-black relative overflow-hidden">
      {/* Плавный градиентный фон с движением */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-red-950 opacity-50"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
            animation: 'gradient-shift 20s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Стильные светящиеся орбиты */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              border: '1px solid rgba(59, 130, 246, 0.3)',
              animation: 'orbit-rotate 30s linear infinite'
            }}
          ></div>
          <div
            className="absolute inset-12 rounded-full opacity-20"
            style={{
              border: '1px solid rgba(239, 68, 68, 0.3)',
              animation: 'orbit-rotate-reverse 25s linear infinite'
            }}
          ></div>
          <div
            className="absolute inset-24 rounded-full opacity-20"
            style={{
              border: '1px solid rgba(168, 85, 247, 0.3)',
              animation: 'orbit-rotate 35s linear infinite'
            }}
          ></div>
        </div>
      </div>

      {/* Элегантные частицы света */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + i * 7}%`,
              top: `${20 + (i % 4) * 20}%`,
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#ef4444' : '#a855f7'} 0%, transparent 70%)`,
              boxShadow: `0 0 10px ${i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#ef4444' : '#a855f7'}`,
              animation: `particle-float ${8 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          ></div>
        ))}
      </div>

      {/* Волны света снизу */}
      <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
            animation: 'wave-pulse 8s ease-in-out infinite'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Наши <span style={{ color: 'var(--primary)' }}>тарифы</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: 'var(--primary)' }}></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Выберите подходящий вариант для подбора вашего автомобиля
          </p>
        </div>

        {/* Карточки тарифов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              style={plan.popular ? {
                border: '2px solid var(--primary)',
                boxShadow: '0 20px 25px -5px rgba(var(--primary-rgb), 0.2)'
              } : {
                border: '1px solid rgba(31, 41, 55, 1)'
              }}
              onMouseEnter={(e) => {
                if (!plan.popular) e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                if (!plan.popular) e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 1)';
              }}
            >
              {/* Бейдж популярного тарифа */}
              {plan.popular && (
                <div className="absolute top-0 right-0 text-white px-3 py-1 sm:px-4 text-xs sm:text-sm font-semibold rounded-bl-lg" style={{ backgroundColor: 'var(--primary)' }}>
                  Популярный
                </div>
              )}

              <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1">
                {/* Название тарифа */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>

                {/* Описание */}
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                  {plan.description}
                </p>

                {/* Цена */}
                <div className="mb-6 sm:mb-8">
                  <span className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--primary)' }}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-1 sm:ml-2 text-sm sm:text-base">₽</span>
                </div>

                {/* Список возможностей */}
                <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8 flex-1 text-sm sm:text-base">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--primary)' }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Кнопка */}
                <button
                  onClick={() => handleOrderClick(plan)}
                  className="w-full py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer text-white"
                  style={plan.popular ? {
                    backgroundColor: 'var(--primary)'
                  } : {
                    backgroundColor: 'rgb(31, 41, 55)',
                    border: '1px solid rgb(55, 65, 81)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = plan.popular ? 'var(--primary-dark)' : 'rgb(55, 65, 81)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = plan.popular ? 'var(--primary)' : 'rgb(31, 41, 55)';
                  }}
                >
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация - креативный дизайн */}
        <div className="mt-10 sm:mt-12 md:mt-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Почему <span style={{ color: 'var(--primary-light)' }}>выбирают нас?</span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Если вам нужны дополнительные услуги или особые условия — свяжитесь с нами
            </p>
          </div>

          {/* Главный акцент - без предоплаты */}
          <div className="relative mb-12 sm:mb-16">
            <div className="absolute inset-0 blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}></div>
            <div className="relative text-center py-8 sm:py-12">
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, var(--primary-light), var(--primary))`, boxShadow: '0 10px 40px rgba(var(--primary-rgb), 0.4)' }}>
                  <svg className="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
                РАБОТАЕМ <span style={{ color: 'var(--primary-light)', textShadow: '0 0 30px rgba(var(--primary-rgb), 0.5)' }}>БЕЗ ПРЕДОПЛАТЫ</span>
              </h4>
              <p className="text-xl sm:text-2xl font-medium" style={{ color: 'var(--primary-light)' }}>
                Оплата производится после оказания услуг
              </p>
            </div>
          </div>

          {/* Преимущества - в линию с разделителями */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
            <div className="flex items-center gap-3 group">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)' }}></div>
              <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-[var(--primary-light)] transition-colors">
                Ничем не рискуете
              </span>
            </div>

            <div className="hidden md:block w-px h-8" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.3)' }}></div>

            <div className="flex items-center gap-3 group">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)', animationDelay: '0.3s' }}></div>
              <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-[var(--primary-light)] transition-colors">
                Можно начать прямо сейчас
              </span>
            </div>

            <div className="hidden md:block w-px h-8" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.3)' }}></div>

            <div className="flex items-center gap-3 group">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)', animationDelay: '0.6s' }}></div>
              <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-[var(--primary-light)] transition-colors">
                Скидки постоянным клиентам
              </span>
            </div>
          </div>

          {/* Дополнительные условия - простой список */}
          <div className="mt-10 sm:mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-base sm:text-lg text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                Гибкая система оплаты
              </span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Специальные предложения
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.5;
          }
        }

        @keyframes orbit-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit-rotate-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) scale(1.5);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50px) scale(1);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes wave-pulse {
          0%, 100% {
            transform: scaleY(1);
            opacity: 0.2;
          }
          50% {
            transform: scaleY(1.5);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
};

export default Pricing;

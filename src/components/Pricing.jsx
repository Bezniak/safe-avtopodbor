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
    <section id="pricing" className="pt-12 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-black">
      <div className="container mx-auto px-2 sm:px-4">
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

        {/* Дополнительная информация */}
        <div className="mt-10 sm:mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-5 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
              Индивидуальные условия
            </h3>
            <p className="text-sm sm:text-base text-gray-400 text-center mb-6 sm:mb-8 px-2 leading-relaxed">
              Если вам нужны дополнительные услуги или особые условия работы - свяжитесь с нами. Мы разработаем индивидуальное предложение специально для вас.
            </p>

            {/* Работаем без предоплаты - выделено */}
            <div className="mb-6 sm:mb-8 p-4 rounded-lg" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.1)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(var(--primary-rgb), 0.3)' }}>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-base sm:text-lg md:text-xl font-bold text-white">
                  Работаем <span style={{ color: 'var(--primary-light)' }}>без предоплаты</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 text-center mt-2">
                Оплата производится после оказания услуг
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Скидки при повторном обращении</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Гибкая система оплаты</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Специальные предложения</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

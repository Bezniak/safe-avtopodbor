const Guarantees = () => {
  const guarantees = [
    {
      title: "Юридическая гарантия",
      description: "Гарантируем юридическую чистоту автомобиля. Проверяем историю, залоги, ограничения и все юридические аспекты сделки.",
      points: [
        "Проверка на залог и кредит",
        "Проверка истории владения",
        "Проверка на ограничения",
        "Проверка на угон"
      ]
    },
    {
      title: "Техническая гарантия",
      description: "Предоставляем полный технический отчет с детальным описанием состояния всех систем автомобиля.",
      points: [
        "Диагностика всех систем",
        "Толщинометрия кузова",
        "Проверка двигателя и КПП",
        "Тест-драйв"
      ]
    },
    {
      title: "Гарантия достоверности",
      description: "Гарантируем достоверность всей предоставленной информации. Несем ответственность за качество проверки.",
      points: [
        "Письменное заключение",
        "Фото и видео отчет",
        "Детальный отчет",
        "Консультация после покупки"
      ]
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Наши <span style={{ color: 'var(--primary)' }}>гарантии</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--primary)' }}></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Мы несем полную ответственность за качество наших услуг
          </p>
        </div>

        {/* Карточки гарантий */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-black border-2 border-gray-800 rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 1)'}
            >
              {/* Номер */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6" style={{ backgroundColor: 'var(--primary)' }}>
                {index + 1}
              </div>

              {/* Заголовок */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {guarantee.title}
              </h3>

              {/* Описание */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {guarantee.description}
              </p>

              {/* Список пунктов */}
              <ul className="space-y-3">
                {guarantee.points.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="rounded-xl p-8 md:p-12 text-center" style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-dark))' }}>
          <h3 className="text-3xl font-bold text-white mb-4">
            Договор с гарантией
          </h3>
          <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
            Все наши гарантии закреплены в договоре. Мы несем полную ответственность за качество предоставляемых услуг и достоверность информации.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-semibold">
              Юридическая защита
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-semibold">
              Страхование рисков
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-semibold">
              Возврат средств
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantees;

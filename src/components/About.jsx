const About = () => {
  // Динамический расчет количества лет работы (с 2016 года)
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - startYear;

  return (
    <section id="about" className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}></div>

      <div className="container mx-auto px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок секции */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fadeIn px-2">
              О компании <span style={{ color: 'var(--primary)' }}>Безопасный АвтоПодбор</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 mx-auto mb-6 sm:mb-8" style={{ backgroundColor: 'var(--primary)' }}></div>
          </div>

          {/* Контент с изображениями */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12">
            <div className="space-y-4 sm:space-y-6 text-left px-2">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Уже {yearsInBusiness} {yearsInBusiness === 1 ? 'год' : yearsInBusiness < 5 ? 'года' : 'лет'} мы профессионально помогаем клиентам с выбором автомобилей.
                За годы работы мы заслужили доверие сотен клиентов.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                Мы обеспечиваем вам безопасность и уверенность на всех этапах покупки автомобиля.
                Подбираем автомобиль, основываясь на ваших пожеланиях и бюджете, проводим торги и добиваемся
                выгодных условий. Проводим тщательную техническую диагностику от кузова до двигателя,
                используя современное оборудование.
              </p>
            </div>

            {/* Изображение с 3D эффектом */}
            <div className="relative group px-2">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" style={{ backgroundColor: 'var(--primary)' }}></div>
              <img
                src="/000-128.jpg"
                alt="Проверка автомобиля"
                className="relative rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                loading="lazy"
              />
            </div>
          </div>

          {/* Список преимуществ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 text-left">
            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-black/50 rounded-lg border border-gray-800">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                  Экспертный подбор
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Подбираем автомобиль по всем параметрам, основываясь на ваших пожеланиях и бюджете
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-black/50 rounded-lg border border-gray-800">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                  Юридическая чистота
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Проверка истории автомобиля, залогов, ограничений и юридической чистоты сделки
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-black/50 rounded-lg border border-gray-800">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                  3 вида гарантии
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Предоставляем 3 вида гарантии для полной уверенности в приобретаемом автомобиле
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-black/50 rounded-lg border border-gray-800">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
                  Окупаемость услуг
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Наши специалисты ведут переговоры с продавцом, что позволяет снизить цену авто и компенсировать стоимость подбора
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

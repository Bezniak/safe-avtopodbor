import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      ),
      title: "Диагностика авто перед покупкой",
      price: "от 4 289 ₽",
      shortDescription: "Полная проверка автомобиля перед покупкой",
      fullDescription: "Проводим полную проверку автомобиля с использованием специального оборудования на наличие дефектов (кузова, двигателя, салона)",
      includes: [
        "Выезд к автомобилю в любую точку Москвы и МО",
        "Детальный осмотр кузова, двигателя и всех систем",
        "Проверка кузова толщиномером на предмет ремонта",
        "Тест-драйв для проверки работы авто",
        "Проверка оригинальности пробега и истории эксплуатации",
        "Полная юридическая проверка по всем базам",
        "Полная компьютерная диагностика автомобиля",
        "Проверка ошибок и неисправностей",
        "Детальный отчет с предоставлением полного описания",
        "Гарантия на все оказанные услуги"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Подбор автомобиля под ключ",
      price: "от 14 899 ₽",
      shortDescription: "Полный цикл подбора и проверки автомобиля",
      fullDescription: "Исходя из ваших предпочтений, бюджета и требований - самостоятельно подберем автомобиль и проведем торги с продавцом",
      includes: [
        "Подбор по вашим критериям и бюджету",
        "Самостоятельный поиск объявлений",
        "Проверка неограниченного количества авто",
        "Детальный осмотр кузова, двигателя и всех систем",
        "Тест-драйв для проверки работы авто",
        "Проверка оригинальности пробега и истории эксплуатации",
        "Полная юридическая проверка по всем базам",
        "Полная компьютерная диагностика и проверка ошибок",
        "Профессиональный торг с продавцом",
        "Окупаемость наших услуг при торге",
        "Полное сопровождение на всех этапах сделки",
        "Помощь в составлении юридического договора купли-продажи",
        "Гарантия на все оказанные услуги"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z" clipRule="evenodd" />
        </svg>
      ),
      title: "Помощь в оформлении сделки",
      price: "от 1 950 ₽",
      shortDescription: "Юридическое сопровождение покупки",
      fullDescription: "Полностью сопровождаем на всех этапах сделки и помогаем составить юридический договор купли-продажи",
      includes: [
        "Составление юридического договора купли-продажи",
        "Проверка всех документов продавца",
        "Полная юридическая проверка по всем базам",
        "Проверка на наличие ограничений",
        "Консультация по юридическим вопросам",
        "Помощь в постановке на учет в ГИБДД",
        "Сопровождение при оформлении",
        "Гарантия юридической чистоты сделки"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Изготовление дубликатов госномеров",
      price: "от 1 099 ₽",
      shortDescription: "Быстрое изготовление номеров",
      fullDescription: "Изготовление дубликатов государственных регистрационных номеров",
      includes: [
        "Изготовление дубликатов госномеров",
        "Соответствие всем ГОСТам",
        "Быстрое изготовление в день обращения",
        "Качественные материалы",
        "Гарантия на изделие"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      ),
      title: "Эндоскопия двигателя",
      price: "входит в диагностику",
      shortDescription: "Осмотр внутренних частей двигателя",
      fullDescription: "Проверка внутреннего состояния двигателя с помощью эндоскопа",
      includes: [
        "Осмотр цилиндров двигателя",
        "Проверка состояния поршней",
        "Осмотр клапанов",
        "Выявление задиров и износа",
        "Проверка на утечки масла",
        "Фото и видео фиксация",
        "Заключение о состоянии"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Юридическая проверка",
      price: "входит в подбор",
      shortDescription: "Полная проверка истории и документов",
      fullDescription: "Комплексная юридическая проверка автомобиля по всем базам",
      includes: [
        "Проверка по базам ГИБДД",
        "Проверка на залоги в реестре залогов",
        "Проверка на ограничения и аресты",
        "История регистрационных действий",
        "Количество владельцев",
        "Проверка на ДТП",
        "Проверка штрафов",
        "История пробегов по базам",
        "Проверка VIN номера",
        "Детальный отчет"
      ]
    }
  ];

  return (
    <section id="services" className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <p className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-4">Услуги</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Что мы <span className="text-red-600">проверяем</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Комплексная проверка автомобиля по всем важным параметрам
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl hover:border-red-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/20 cursor-pointer"
            >
              {/* Иконка */}
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Название */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>

              {/* Цена */}
              <p className="text-2xl font-bold text-red-600 mb-4">
                {service.price}
              </p>

              {/* Краткое описание */}
              <p className="text-gray-400 leading-relaxed mb-4">
                {service.shortDescription}
              </p>

              {/* Кнопка подробнее */}
              <div className="flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all">
                Подробнее
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-20 relative">
          {/* Декоративный фон */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Быстро */}
              <div className="group flex items-center gap-4 bg-gradient-to-br from-red-600/10 via-black to-black border border-red-600/30 hover:border-red-600 rounded-2xl px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20">
                <div className="flex-shrink-0 w-14 h-14 bg-red-600/20 group-hover:bg-red-600/30 rounded-full flex items-center justify-center transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">⚡</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">Быстро</p>
                  <p className="text-gray-400 text-sm">Услуги в день обращения</p>
                </div>
              </div>

              {/* Отчет */}
              <div className="group flex items-center gap-4 bg-gradient-to-br from-red-600/10 via-black to-black border border-red-600/30 hover:border-red-600 rounded-2xl px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20">
                <div className="flex-shrink-0 w-14 h-14 bg-red-600/20 group-hover:bg-red-600/30 rounded-full flex items-center justify-center transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">📋</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">Отчет</p>
                  <p className="text-gray-400 text-sm">Полный детальный осмотр</p>
                </div>
              </div>

              {/* Гарантия */}
              <div className="group flex items-center gap-4 bg-gradient-to-br from-red-600/10 via-black to-black border border-red-600/30 hover:border-red-600 rounded-2xl px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20">
                <div className="flex-shrink-0 w-14 h-14 bg-red-600/20 group-hover:bg-red-600/30 rounded-full flex items-center justify-center transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">🛡️</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">Гарантия</p>
                  <p className="text-gray-400 text-sm">На все услуги</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с подробной информацией */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-2 md:p-4 overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600/50 rounded-xl md:rounded-2xl max-w-3xl w-full my-4 md:my-8 relative animate-scaleIn max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-2 md:top-4 right-2 md:right-4 text-white hover:text-red-600 transition-colors cursor-pointer z-10 bg-black/50 md:bg-transparent rounded-full p-1"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Контент */}
            <div className="p-4 md:p-8 lg:p-12">
              {/* Иконка и заголовок */}
              <div className="flex items-start gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {selectedService.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 pr-8 md:pr-0">
                    {selectedService.title}
                  </h3>
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600">
                    {selectedService.price}
                  </p>
                </div>
              </div>

              {/* Описание */}
              <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8">
                {selectedService.fullDescription}
              </p>

              {/* Что входит */}
              <div className="mb-6 md:mb-8">
                <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 md:mb-6">Что входит в услугу:</h4>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {selectedService.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 md:gap-3">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm md:text-base lg:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Кнопка заказа */}
              <button
                onClick={() => {
                  navigate(`/form?service=${encodeURIComponent(selectedService.title)}&price=${encodeURIComponent(selectedService.price)}`);
                  setSelectedService(null);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-red-600/50 cursor-pointer"
              >
                Заказать услугу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Анимация для модального окна */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Services;

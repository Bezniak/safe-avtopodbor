import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { carsData } from '../data/carsData';
import { useYandexMetrika } from '../hooks/useYandexMetrika';

const CarsCases = () => {
  const { trackPhoneClick } = useYandexMetrika();

  return (
    <section id="cases" className="pt-10 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Наша <span className="text-red-600">работа</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-red-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Реальные автомобили, подобранные нашими специалистами
          </p>
        </div>

        {/* Swiper слайдер */}
        <div className="relative max-w-6xl mx-auto swiper-cases-container">
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={0}
            slidesPerView={1}
            speed={400}
            keyboard={{ enabled: true }}
            navigation={{
              prevEl: '.swiper-button-prev-cases',
              nextEl: '.swiper-button-next-cases',
            }}
            pagination={{
              el: '.swiper-pagination-cases',
              clickable: true,
            }}
            className="caseSwiper"
          >
            {carsData.map((car, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Левая часть - Фото */}
                    <div
                      className="relative min-h-[250px] max-h-[400px] md:min-h-full md:max-h-none md:flex-1 overflow-hidden bg-black bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${car.image})`
                      }}
                    >
                      {/* Градиент оверлей */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                      {/* Бейдж сервиса */}
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm z-10">
                        {car.service}
                      </div>
                    </div>

                    {/* Правая часть - Информация */}
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between md:flex-1">
                      {/* Заголовок */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                          {car.title}
                        </h3>
                        {car.year && (
                          <p className="text-lg sm:text-xl text-gray-400 mb-6">{car.year} год</p>
                        )}

                        {/* Характеристики */}
                        <div className="space-y-4 mb-6">
                          {car.color && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <span className="text-xl">🎨</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Цвет</p>
                                <p className="text-base sm:text-lg text-white font-medium">{car.color}</p>
                              </div>
                            </div>
                          )}

                          {car.mileage && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <span className="text-xl">⏱️</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Пробег</p>
                                <p className="text-base sm:text-lg text-white font-medium">{car.mileage}</p>
                              </div>
                            </div>
                          )}

                          {car.paintJobs && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <span className="text-xl">🫟</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Окрас</p>
                                <p className="text-base sm:text-lg text-white font-medium">
                                  {typeof car.paintJobs === 'number' ? `${car.paintJobs} элемента` : car.paintJobs}
                                </p>
                              </div>
                            </div>
                          )}

                          {car.owners && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <span className="text-xl">👤</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Владельцев</p>
                                <p className="text-base sm:text-lg text-white font-medium">{car.owners}</p>
                              </div>
                            </div>
                          )}

                          {car.price && (
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                                <span className="text-xl">💴</span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Цена</p>
                                <p className="text-xl sm:text-2xl text-red-600 font-bold">{car.price}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Описание */}
                        {car.description && (
                          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                {car.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кнопки навигации - только на десктопе */}
          <button className="swiper-button-prev-cases nav-button-cases hidden md:flex group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 z-10 cursor-pointer w-16 h-16 bg-black/50 border-2 border-red-600 items-center justify-center transition-all hover:bg-red-600">
            <svg className="nav-arrow-cases w-6 h-6 transition-all" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-cases nav-button-cases hidden md:flex group absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 z-10 cursor-pointer w-16 h-16 bg-black/50 border-2 border-red-600 items-center justify-center transition-all hover:bg-red-600">
            <svg className="nav-arrow-cases w-6 h-6 transition-all" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Пагинация */}
          <div className="swiper-pagination-cases mt-8 flex justify-center"></div>
        </div>

        {/* Призыв к действию */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <p className="text-base sm:text-lg text-gray-400 mb-6 px-4">
            Если вам нужна помощь с подбором автомобиля, обращайтесь в команду профессионалов «Безопасного АвтоПодбора»
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+79932882809"
              onClick={() => trackPhoneClick('+79932882809')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +7 (993) 288-28-09
            </a>
            <div className="bg-red-600/10 border-2 border-red-600 text-red-600 font-bold text-lg sm:text-xl px-6 py-3 rounded-full animate-pulse">
              ✨ Консультация бесплатно!
            </div>
          </div>
        </div>
      </div>

      {/* CSS стили */}
      <style>{`
        /* Hover эффект для стрелок Cases */
        .nav-button-cases .nav-arrow-cases {
          stroke: #3b82f6 !important;
        }

        .nav-button-cases:hover .nav-arrow-cases {
          stroke: white !important;
        }

        .nav-arrow-cases path {
          stroke: inherit;
        }

        /* Swiper пагинация Cases */
        .swiper-pagination-cases .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #4b5563;
          opacity: 1;
          transition: all 0.3s;
        }

        .swiper-pagination-cases .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
          background: var(--primary);
        }

        .swiper-pagination-cases .swiper-pagination-bullet:hover {
          background: #6b7280;
        }
      `}</style>
    </section>
  );
};

export default CarsCases;

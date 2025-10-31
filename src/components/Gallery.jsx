import { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, EffectCards, EffectCreative, Navigation, Pagination, Autoplay } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const originalImages = [
    { src: '/000-112.jpg', alt: 'Специалист проводит осмотр автомобиля при подборе' },
    { src: '/000-115.jpg', alt: 'Детальная проверка технического состояния машины' },
    { src: '/000-127.jpg', alt: 'Диагностика автомобиля перед покупкой в Минске' },
    { src: '/000-128.jpg', alt: 'Эксперт автоподбора проверяет документы на авто' },
    { src: '/000-144.jpg', alt: 'Проверка кузова и лакокрасочного покрытия автомобиля' },
    { src: '/000-15.jpg', alt: 'Услуги профессионального автоподбора в Беларуси' },
    { src: '/000-156.jpg', alt: 'Команда автоэкспертов во время работы с клиентом' },
    { src: '/000-157.jpg', alt: 'Компьютерная диагностика автомобиля при подборе' },
    { src: '/000-2.jpg', alt: 'Осмотр подкапотного пространства при автоподборе' },
    { src: '/000-27.jpg', alt: 'Тест-драйв автомобиля с экспертом по подбору' },
    { src: '/000-33.jpg', alt: 'Проверка ходовой части и подвески автомобиля' },
    { src: '/000-4.jpg', alt: 'Измерение толщины лакокрасочного покрытия толщиномером' }
  ];

  // Рандомизируем порядок фотографий при каждой загрузке
  const images = useMemo(() => {
    return [...originalImages].sort(() => Math.random() - 0.5);
  }, []);

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIdx = images.findIndex(img => img.src === selectedImage.src);
    const nextIdx = currentIdx === images.length - 1 ? 0 : currentIdx + 1;
    setSelectedImage(images[nextIdx]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIdx = images.findIndex(img => img.src === selectedImage.src);
    const prevIdx = currentIdx === 0 ? images.length - 1 : currentIdx - 1;
    setSelectedImage(images[prevIdx]);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--primary)' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--primary)', animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Наша <span className="text-red-600">работа</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-red-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Фотографии нашей команды и процесса работы
          </p>
        </div>

        {/* Карусель Cards эффект на мобильных (как стопка карт) */}
        <div className="md:hidden mb-8">
          <Swiper
            effect="cards"
            grabCursor={true}
            loop={true}
            modules={[EffectCards, Pagination]}
            className="mySwiper"
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[450px] rounded-2xl overflow-hidden group"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Coverflow эффект 3D на десктопе */}
        <div className="hidden md:block">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="coverflowSwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Иконка увеличения */}
                  <div className="absolute top-6 right-6 bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                  {/* Светящаяся рамка */}
                  <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-light), var(--primary))' }}></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Модальное окно */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white transition-colors z-50 bg-black/50 backdrop-blur-sm rounded-full p-2"
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all transform hover:scale-110 z-50"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all transform hover:scale-110 z-50"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div onClick={(e) => e.stopPropagation()} className="relative max-w-full max-h-[90vh] animate-zoomIn">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full text-white font-medium">
            {images.findIndex(img => img.src === selectedImage.src) + 1} / {images.length}
          </div>
        </div>
      )}

      <style>{`
        /* Стили для Cards эффекта */
        .mySwiper {
          width: 100%;
          max-width: 340px;
          height: 500px;
          margin: 0 auto;
          padding-bottom: 30px;
        }

        .mySwiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 22px;
          font-weight: bold;
          color: #fff;
        }

        /* Стили для Coverflow эффекта */
        .coverflowSwiper {
          width: 100%;
          padding: 50px 0 80px 0;
        }

        .coverflowSwiper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 500px;
          max-width: 90%;
        }

        .coverflowSwiper .swiper-slide img {
          display: block;
          width: 100%;
        }

        /* Кастомизация пагинации */
        .swiper-pagination-bullet {
          background: #666;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: var(--primary);
          opacity: 1;
        }

        /* Кастомизация навигации */
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--primary);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: var(--primary);
          color: white;
          transform: scale(1.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        /* Анимации для модального окна */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Gallery;

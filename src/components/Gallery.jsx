import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, EffectCards } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
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
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Реалистичный туман на чёрном фоне */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Большое облако тумана слева */}
        <div
          className="absolute w-[600px] h-[600px]"
          style={{
            top: '10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(60, 75, 95, 0.6) 0%, rgba(50, 65, 85, 0.4) 35%, rgba(40, 55, 75, 0.2) 60%, transparent 80%)',
            filter: 'blur(60px)',
            animation: 'fogFloat1 15s ease-in-out infinite'
          }}
        ></div>

        {/* Большое облако тумана справа */}
        <div
          className="absolute w-[700px] h-[700px]"
          style={{
            top: '40%',
            right: '-15%',
            background: 'radial-gradient(circle, rgba(55, 70, 90, 0.65) 0%, rgba(45, 60, 80, 0.45) 35%, rgba(35, 50, 70, 0.25) 60%, transparent 80%)',
            filter: 'blur(70px)',
            animation: 'fogFloat2 18s ease-in-out infinite'
          }}
        ></div>

        {/* Центральное облако тумана */}
        <div
          className="absolute w-[800px] h-[600px]"
          style={{
            top: '25%',
            left: '30%',
            background: 'radial-gradient(ellipse, rgba(65, 80, 100, 0.55) 0%, rgba(55, 70, 90, 0.35) 40%, rgba(45, 60, 80, 0.15) 65%, transparent 85%)',
            filter: 'blur(80px)',
            animation: 'fogFloat3 20s ease-in-out infinite'
          }}
        ></div>

        {/* Нижнее облако тумана */}
        <div
          className="absolute w-[650px] h-[650px]"
          style={{
            bottom: '-10%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(50, 65, 85, 0.6) 0%, rgba(40, 55, 75, 0.4) 35%, rgba(30, 45, 65, 0.2) 60%, transparent 80%)',
            filter: 'blur(75px)',
            animation: 'fogFloat1 22s ease-in-out infinite reverse'
          }}
        ></div>

        {/* Верхнее облако тумана */}
        <div
          className="absolute w-[550px] h-[550px]"
          style={{
            top: '-5%',
            right: '25%',
            background: 'radial-gradient(circle, rgba(60, 75, 95, 0.5) 0%, rgba(50, 65, 85, 0.3) 40%, rgba(40, 55, 75, 0.15) 65%, transparent 80%)',
            filter: 'blur(65px)',
            animation: 'fogFloat2 16s ease-in-out infinite reverse'
          }}
        ></div>
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

        {/* Cards эффект на мобильных - оптимизированный */}
        <div className="md:hidden mb-8">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: false,
            }}
            speed={400}
            touchRatio={1.5}
            threshold={10}
            resistance={true}
            resistanceRatio={0.5}
            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[450px] rounded-xl overflow-hidden bg-gray-900">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
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
            speed={400}
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
            modules={[EffectCoverflow, Pagination]}
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
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: var(--primary);
          opacity: 1;
          width: 12px;
          height: 12px;
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

        /* Анимации тумана - очень заметные */
        @keyframes fogFloat1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          25% {
            transform: translate(150px, -120px) scale(1.4);
            opacity: 0.7;
          }
          50% {
            transform: translate(80px, 100px) scale(0.75);
            opacity: 1;
          }
          75% {
            transform: translate(-140px, 60px) scale(1.3);
            opacity: 0.65;
          }
        }

        @keyframes fogFloat2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translate(-180px, 130px) scale(1.5);
            opacity: 0.8;
          }
          60% {
            transform: translate(120px, -150px) scale(0.7);
            opacity: 0.75;
          }
          85% {
            transform: translate(-80px, -70px) scale(1.35);
            opacity: 0.9;
          }
        }

        @keyframes fogFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          33% {
            transform: translate(160px, -170px) scale(1.6) rotate(15deg);
            opacity: 0.65;
          }
          66% {
            transform: translate(-150px, 140px) scale(0.8) rotate(-15deg);
            opacity: 0.85;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;

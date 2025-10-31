import { useState, useEffect } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Функции для мобильного слайдера
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Функция для переключения на следующее фото
  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.src === selectedImage.src);
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(images[nextIndex]);
  };

  // Функция для переключения на предыдущее фото
  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.src === selectedImage.src);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[prevIndex]);
  };

  // Обработка нажатия клавиш клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Обработка свайпов для модального окна
  const handleModalTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleModalTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleModalTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Обработка свайпов для мобильной галереи
  const handleGalleryTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleGalleryTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleGalleryTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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

        {/* Мобильный слайдер */}
        <div className="md:hidden relative">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleGalleryTouchStart}
            onTouchMove={handleGalleryTouchMove}
            onTouchEnd={handleGalleryTouchEnd}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl cursor-pointer" onClick={() => setSelectedImage(images[currentSlide])}>
              <img
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Иконка увеличения */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <div className="bg-red-600 rounded-full p-1.5 sm:p-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-red-600 w-6 sm:w-8' : 'bg-gray-600 w-1.5 sm:w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Сетка изображений для десктопа */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(image)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Изображение */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Иконка увеличения */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 3D граница */}
              <div className="absolute inset-0 border-2 border-red-600/0 group-hover:border-red-600/50 rounded-xl transition-all duration-300"></div>

              {/* Свечение */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
          onTouchStart={handleModalTouchStart}
          onTouchMove={handleModalTouchMove}
          onTouchEnd={handleModalTouchEnd}
        >
          {/* Кнопка закрытия */}
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-red-600 transition-colors z-50 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Кнопка "Назад" */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full transition-all transform hover:scale-110 z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Кнопка "Вперед" */}
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full transition-all transform hover:scale-110 z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Изображение */}
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-full max-h-[90vh]">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scaleIn"
            />
          </div>

          {/* Счетчик фотографий */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-sm">
            {images.findIndex(img => img.src === selectedImage.src) + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Кастомные анимации */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

export default Gallery;

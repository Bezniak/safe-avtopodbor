import { useState } from 'react';
import { reviewsData } from '../data/reviewsData';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Динамический расчет количества лет работы (с 2016 года)
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - startYear;

  const reviews = reviewsData;
  const MAX_LENGTH = 200; // Максимальное количество символов

  const nextSlide = () => {
    if (isAnimating) return;
    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
      setSlideDirection('');
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setSlideDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      setSlideDirection('');
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setExpandedReviews({}); // Сбрасываем развернутые отзывы при смене
  };

  const toggleExpand = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Обработка свайпов
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // минимальная дистанция для свайпа

    if (distance > minSwipeDistance) {
      // Свайп влево - следующий отзыв
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Свайп вправо - предыдущий отзыв
      prevSlide();
    }

    // Сброс значений
    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentReview = reviews[currentIndex];
  const isExpanded = expandedReviews[currentIndex];
  const needsTruncation = currentReview.text.length > MAX_LENGTH;

  return (
    <section id="reviews" className="pt-10 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Заголовок секции */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Отзывы наших <span style={{ color: 'var(--primary)' }}>клиентов</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: 'var(--primary)' }}></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            За {yearsInBusiness} {yearsInBusiness === 1 ? 'год' : yearsInBusiness < 5 ? 'года' : 'лет'} работы мы заслужили доверие сотен довольных клиентов
          </p>
        </div>

        {/* Слайдер */}
        <div className="relative max-w-4xl mx-auto">
          {/* Карточка отзыва */}
          <div
            className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5 sm:p-6 md:p-8 lg:p-12 h-[400px] sm:h-[420px] md:h-[450px] flex flex-col transition-all duration-300 ${
              slideDirection === 'left' ? 'animate-slideOutLeft' :
              slideDirection === 'right' ? 'animate-slideOutRight' :
              'animate-slideIn'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Звезды */}
            <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  style={{ color: 'var(--primary)' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Текст отзыва */}
            <div className="mb-6 sm:mb-8 flex-grow overflow-y-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                "{isExpanded ? currentReview.text : truncateText(currentReview.text, MAX_LENGTH)}"
              </p>
              {needsTruncation && (
                <button
                  onClick={() => toggleExpand(currentIndex)}
                  className="mt-2 sm:mt-3 text-sm sm:text-base font-medium transition-colors inline-flex items-center gap-1"
                  style={{ color: 'var(--primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}
                >
                  {isExpanded ? (
                    <>
                      Скрыть
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Читать далее
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Информация о клиенте */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-gray-800 pt-4 sm:pt-6 gap-2 sm:gap-0">
              <div>
                <p className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1">
                  {currentReview.name}
                </p>
                <p className="text-sm sm:text-base font-medium" style={{ color: 'var(--primary)' }}>
                  {currentReview.car}
                </p>
              </div>
              <div className="text-gray-500 text-xs sm:text-sm">
                {currentReview.date}
              </div>
            </div>
          </div>

          {/* Кнопки навигации - только на десктопе */}
          <button
            onClick={prevSlide}
            className="hidden md:flex group absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 z-10 cursor-pointer w-16 h-16 bg-black/50 border-2 items-center justify-center transition-all"
            style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.querySelector('svg').style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              e.currentTarget.querySelector('svg').style.color = 'var(--primary)';
            }}
          >
            <svg className="w-6 h-6 transition-colors" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex group absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 z-10 cursor-pointer w-16 h-16 bg-black/50 border-2 items-center justify-center transition-all"
            style={{ borderColor: 'var(--primary)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.querySelector('svg').style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              e.currentTarget.querySelector('svg').style.color = 'var(--primary)';
            }}
          >
            <svg className="w-6 h-6 transition-colors" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* На мобилке показываем только текущий индекс */}
            <div className="md:hidden text-gray-400 text-sm">
              {currentIndex + 1} / {reviews.length}
            </div>

            {/* На десктопе показываем все точки */}
            <div className="hidden md:flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  style={index === currentIndex ? { backgroundColor: 'var(--primary)' } : {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Дополнительный блок */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 px-4">
            Присоединяйтесь к тысячам довольных клиентов
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-2">
            <div className="bg-black/50 border border-gray-800 rounded-lg px-4 py-2 sm:px-6 sm:py-3">
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>5</span>
              <span className="text-gray-400 text-xs sm:text-base ml-1 sm:ml-2">из 5</span>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-lg px-4 py-2 sm:px-6 sm:py-3">
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>98%</span>
              <span className="text-gray-400 text-xs sm:text-base ml-1 sm:ml-2">рекомендуют</span>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-lg px-4 py-2 sm:px-6 sm:py-3">
              <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>500+</span>
              <span className="text-gray-400 text-xs sm:text-base ml-1 sm:ml-2">клиентов</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS анимации для слайдов */}
      <style>{`
        @keyframes slideOutLeft {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50px);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(50px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideOutLeft {
          animation: slideOutLeft 0.3s ease-out forwards;
        }

        .animate-slideOutRight {
          animation: slideOutRight 0.3s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Reviews;

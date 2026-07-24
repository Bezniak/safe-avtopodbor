import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightBeams, setLightBeams] = useState([]);
  const navigate = useNavigate();

  // Отслеживание позиции мыши и наличия курсора
  const [mouseEnterTime, setMouseEnterTime] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = document.getElementById('services');
      if (section) {
        const rect = section.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        if (mouseEnterTime === null) {
          setMouseEnterTime(Date.now());
        }
      }
    };

    const handleMouseLeave = () => {
      setMouseEnterTime(null);
    };

    const section = document.getElementById('services');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [mouseEnterTime]);

  // Инициализация и анимация плавающих сгустков
  useEffect(() => {
    const beams = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      baseX: Math.random() * 100,
      baseY: Math.random() * 100,
      size: 15 + Math.random() * 25
    }));
    setLightBeams(beams);
  }, []);

  // Перерисовка для плавной активации сгустков по очереди
  useEffect(() => {
    if (mouseEnterTime !== null) {
      const interval = setInterval(() => {
        // Принудительный ре-рендер для обновления isActivated
        setMousePosition(prev => ({ ...prev }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [mouseEnterTime]);

  // Минимальное расстояние свайпа для закрытия (в пикселях) - уменьшено для лучшей отзывчивости
  const minSwipeDistance = 30;

  const onTouchStart = (e) => {
    setTouchEnd(0); // Сбрасываем при новом касании
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isDownSwipe) {
      setSelectedService(null);
    }
  };

  // Блокировка скролла страницы когда открыт попап
  useEffect(() => {
    if (selectedService) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;
      setSavedScrollPosition(scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // Сохраняем место для скроллбара
    } else if (savedScrollPosition !== null) {
      // Восстанавливаем скролл при закрытии
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, savedScrollPosition);
    }

    // Cleanup при размонтировании компонента
    return () => {
      if (!selectedService) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
      }
    };
  }, [selectedService]);

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
    <section id="services" className="pt-2 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Плавающие светящиеся сгустки */}
      <div className="absolute inset-0 pointer-events-none">
        {lightBeams.map((beam, index) => {
          let targetX, targetY;

          // Проверяем, прошла ли задержка для этого сгустка
          const delayForThisBeam = index * 400; // 400мс между каждым сгустком
          const timeSinceMouseEntered = mouseEnterTime ? Date.now() - mouseEnterTime : 0;
          const isActivated = mouseEnterTime !== null && timeSinceMouseEntered >= delayForThisBeam;

          if (isActivated) {
            // Притягиваются к курсору, но на разное расстояние
            const section = document.getElementById('services');
            const rect = section?.getBoundingClientRect();
            if (rect) {
              const baseXPx = (beam.baseX / 100) * rect.width;
              const baseYPx = (beam.baseY / 100) * rect.height;

              // Вычисляем направление к курсору
              const dx = mousePosition.x - baseXPx;
              const dy = mousePosition.y - baseYPx;

              // Каждый сгусток приближается на разное расстояние (50-85% пути к курсору)
              const attractionStrength = 0.5 + (index / lightBeams.length) * 0.35;

              targetX = baseXPx + dx * attractionStrength;
              targetY = baseYPx + dy * attractionStrength;
            } else {
              targetX = (beam.baseX / 100) * window.innerWidth;
              targetY = (beam.baseY / 100) * window.innerHeight;
            }
          } else {
            // Свободно плавают
            targetX = beam.baseX;
            targetY = beam.baseY;
          }

          return (
            <div
              key={beam.id}
              className="floating-orb"
              style={{
                position: 'absolute',
                left: isActivated ? `${targetX}px` : `${beam.baseX}%`,
                top: isActivated ? `${targetY}px` : `${beam.baseY}%`,
                width: `${beam.size}px`,
                height: `${beam.size}px`,
                transition: isActivated
                  ? `all 2s cubic-bezier(0.16, 1, 0.3, 1)`
                  : `all 1s ease-out`,
                animation: isActivated ? 'none' : `float-orb-${index % 3} ${8 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              {/* Белый центр */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(200, 220, 255, 0.3) 60%, transparent 100%)',
                  filter: 'blur(3px)'
                }}
              ></div>

              {/* Синее свечение вокруг */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(100, 150, 255, 0.4) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)',
                  boxShadow: '0 0 40px 15px rgba(59, 130, 246, 0.4), 0 0 60px 25px rgba(59, 130, 246, 0.2)',
                  filter: 'blur(8px)',
                  transform: 'scale(1.5)'
                }}
              ></div>

              {/* Дополнительный внешний ореол */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)',
                  filter: 'blur(15px)',
                  transform: 'scale(2.5)'
                }}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-4">Что мы предлагаем</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Наши <span className="text-[var(--primary)]">услуги</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Полный спектр услуг по подбору и проверке автомобилей
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl hover:border-[var(--primary)] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)] cursor-pointer flex flex-col h-full"
            >
              {/* Иконка */}
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Название */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>

              {/* Цена */}
              <p className="text-2xl font-bold text-[var(--primary)] mb-4">
                {service.price}
              </p>

              {/* Краткое описание */}
              <p className="text-gray-400 leading-relaxed mb-4 flex-grow">
                {service.shortDescription}
              </p>

              {/* Кнопка подробнее */}
              <div className="flex items-center text-[var(--primary)] font-semibold group-hover:gap-2 transition-all mt-auto">
                Подробнее
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Две нижние карточки по центру */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          {services.slice(3, 5).map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl hover:border-[var(--primary)] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)] cursor-pointer flex flex-col h-full"
            >
              {/* Иконка */}
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Название */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>

              {/* Цена */}
              <p className="text-2xl font-bold text-[var(--primary)] mb-4">
                {service.price}
              </p>

              {/* Краткое описание */}
              <p className="text-gray-400 leading-relaxed mb-4 flex-grow">
                {service.shortDescription}
              </p>

              {/* Кнопка подробнее */}
              <div className="flex items-center text-[var(--primary)] font-semibold group-hover:gap-2 transition-all mt-auto">
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
            <div className="w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Быстро */}
              <div className="group flex items-center gap-4 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.1)] via-black to-black border border-[rgba(var(--primary-rgb),0.3)] hover:border-[var(--primary)] rounded-2xl px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
                <div className="flex-shrink-0 w-14 h-14 bg-[var(--primary)]/20 group-hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">⚡</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 group-hover:text-[var(--primary-light)] transition-colors">Быстро</p>
                  <p className="text-gray-400 text-sm">Услуги в день обращения</p>
                </div>
              </div>

              {/* Отчет */}
              <div className="group flex items-center gap-4 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.1)] via-black to-black border border-[rgba(var(--primary-rgb),0.3)] hover:border-[var(--primary)] rounded-2xl px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
                <div className="flex-shrink-0 w-14 h-14 bg-[var(--primary)]/20 group-hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">📋</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 group-hover:text-[var(--primary-light)] transition-colors">Отчет</p>
                  <p className="text-gray-400 text-sm">Полный детальный осмотр</p>
                </div>
              </div>

              {/* Гарантия */}
              <div className="group flex items-center gap-4 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.1)] via-black to-black border border-[rgba(var(--primary-rgb),0.3)] hover:border-[var(--primary)] rounded-2xl px-6 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
                <div className="flex-shrink-0 w-14 h-14 bg-[var(--primary)]/20 group-hover:bg-[var(--primary)]/30 rounded-full flex items-center justify-center transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">🛡️</span>
                </div>
                <div>
                  <p className="text-white font-bold text-lg mb-1 group-hover:text-[var(--primary-light)] transition-colors">Гарантия</p>
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
          className="fixed inset-0 bg-black/95 z-[100] flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-gradient-to-br from-gray-900 to-black border-t-2 md:border-2 border-[rgba(var(--primary-rgb),0.5)] rounded-t-3xl md:rounded-2xl max-w-3xl w-full md:my-8 relative animate-slideUp md:animate-scaleIn flex flex-col max-h-[85vh] md:max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Ручка для свайпа на мобильных */}
            <div className="md:hidden flex justify-center py-3 bg-gray-900/50 backdrop-blur-sm relative">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
              {/* Крестик на мобильных - встроен в ручку */}
              <button
                className="md:hidden absolute top-1 right-5 w-8 h-8 flex items-center justify-center text-white active:text-gray-400 transition-colors"
                onClick={() => setSelectedService(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Кнопка закрытия - крестик на десктопе */}
            <button
              className="hidden md:block absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
              onClick={() => setSelectedService(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Контент с прокруткой */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 lg:p-12 pt-4 md:pt-8">
              {/* Иконка и заголовок */}
              <div className="flex items-start gap-3 md:gap-6 mb-4 md:mb-6 mt-2">
                <div className="w-10 h-10 md:w-20 md:h-20 bg-[var(--primary)] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {selectedService.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-3 leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-base md:text-2xl lg:text-3xl font-bold text-[var(--primary)]">
                    {selectedService.price}
                  </p>
                </div>
              </div>

              {/* Описание */}
              <p className="text-xs md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-8 leading-relaxed">
                {selectedService.fullDescription}
              </p>

              {/* Что входит */}
              <div className="mb-4 md:mb-8">
                <h4 className="text-sm md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-6">Что входит в услугу:</h4>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {selectedService.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 md:gap-3">
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-xs md:text-base lg:text-lg leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Кнопка заказа - зафиксирована внизу */}
            <div className="flex-shrink-0 p-5 md:p-8 lg:p-12 pt-0 md:pt-0 bg-gradient-to-t from-gray-900 to-transparent">
              <button
                onClick={() => {
                  navigate(`/form?service=${encodeURIComponent(selectedService.title)}&price=${encodeURIComponent(selectedService.price)}`);
                  setSelectedService(null);
                }}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] active:bg-[var(--primary-darker)] text-white py-3 md:py-4 rounded-xl md:rounded-xl text-sm md:text-lg font-semibold transition-all transform active:scale-95 md:hover:scale-105 shadow-lg shadow-[rgba(var(--primary-rgb),0.5)] cursor-pointer"
              >
                Заказать услугу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Анимации */}
      <style>{`
        /* Анимация для модального окна */
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

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Анимации плавания сгустков */
        @keyframes float-orb-0 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -40px);
          }
          50% {
            transform: translate(-20px, -70px);
          }
          75% {
            transform: translate(40px, -30px);
          }
        }

        @keyframes float-orb-1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-40px, 30px);
          }
          50% {
            transform: translate(25px, 60px);
          }
          75% {
            transform: translate(-30px, 20px);
          }
        }

        @keyframes float-orb-2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(20px, 50px);
          }
          50% {
            transform: translate(-35px, -20px);
          }
          75% {
            transform: translate(45px, 10px);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;

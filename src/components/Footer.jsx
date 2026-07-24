import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Send, ShoppingBag, MessageCircle } from 'lucide-react'
import { useYandexMetrika } from '../hooks/useYandexMetrika'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { trackPhoneClick, trackButtonClick, trackSocialClick } = useYandexMetrika();

  // Динамический расчет количества лет работы (с 2016 года)
  const startYear = 2016;
  const yearsInBusiness = currentYear - startYear;

  const scrollToSection = (id) => {
    // Если мы не на главной странице, сначала перейдем на главную
    if (location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Высота header + отступ
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Проверяем, находимся ли мы на странице контактов
  const isContactPage = location.pathname === '/form';

  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      {/* Призыв к действию - показываем только если НЕ на странице контактов */}
      {!isContactPage && (
        <div className="container mx-auto px-2 sm:px-4 py-12 sm:py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 text-center overflow-hidden border-2" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.1), black, black)', borderColor: 'rgba(var(--primary-rgb), 0.3)' }}>
              {/* Декоративные элементы */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.1)' }}></div>

              {/* Контент */}
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Готовы найти свой <span style={{ color: 'var(--primary)' }}>идеальный автомобиль?</span>
                </h2>
                <div className="w-16 sm:w-20 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: 'var(--primary)' }}></div>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                  Оставьте заявку и получите бесплатную консультацию от профессионального автоподборщика
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 sm:mb-8">
                  <Link
                    to="/form"
                    onClick={() => trackButtonClick('Оставить заявку', 'footer_cta')}
                    className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg cursor-pointer"
                    style={{ backgroundColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                  >
                    Оставить заявку
                  </Link>
                  <a
                    href="tel:+79932882809"
                    onClick={() => trackPhoneClick('+79932882809')}
                    className="bg-transparent border-2 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
                    style={{ borderColor: 'var(--primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Позвонить сейчас
                  </a>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base text-gray-300">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Работаем 24/7</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Ответ за 15 минут</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Бесплатная консультация</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Основная информация футера */}
      <div className={!isContactPage ? "border-t border-gray-800" : ""}>
        <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* О компании */}
            <div>
              <Link to="/" className="inline-block mb-3 sm:mb-4" aria-label="Перейти на главную страницу">
                <img
                  src="/лого 1 без фона.svg"
                  alt="Безопасный АвтоПодбор - профессиональный подбор автомобилей"
                  className="w-auto object-contain"
                  style={{ height: '140px' }}
                />
              </Link>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                Профессиональный подбор автомобилей в Москве и МО. {yearsInBusiness} {yearsInBusiness === 1 ? 'год' : yearsInBusiness < 5 ? 'года' : 'лет'} опыта работы.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://vk.com/carchoiespro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick('vk')}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-[var(--primary)] rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Наша группа ВКонтакте"
                >
                  <span className="text-white text-xs sm:text-sm font-bold" aria-hidden="true">VK</span>
                </a>
                <a
                  href="https://t.me/avtomobill444"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick('telegram')}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-[var(--primary)] rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Написать нам в Telegram"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                </a>
                <a
                  href="https://www.avito.ru/user/49ba00a75f83ff17979a4b51674d2928/profile/all/predlozheniya_uslug"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick('avito')}
                  className="px-2.5 sm:px-3 h-9 sm:h-10 bg-gray-800 hover:bg-[var(--primary)] rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Наши услуги на Avito"
                >
                  <span className="text-white text-xs font-bold" aria-hidden="true">Avito</span>
                </a>
              </div>
            </div>

            {/* Навигация */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Навигация</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer"
                  >
                    О нас
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer"
                  >
                    Услуги
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('advantages')}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer"
                  >
                    Преимущества
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reviews')}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer"
                  >
                    Отзывы
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer"
                  >
                    Тарифы
                  </button>
                </li>
              </ul>
            </div>

            {/* Услуги */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Услуги</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-400">
                <li>Подбор автомобиля под ключ</li>
                <li>Выездная диагностика</li>
                <li>Проверка документов</li>
                <li>Сопровождение сделки</li>
                <li>Помощь в оформлении</li>
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Контакты</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li>
                  <a
                    href="tel:+79932882809"
                    onClick={() => trackPhoneClick('+79932882809')}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors flex items-center cursor-pointer"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +7 (993) 288-28-09
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@safe-avtopodbor.ru"
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors flex items-center cursor-pointer break-all"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-xs sm:text-sm md:text-base">info@safe-avtopodbor.ru</span>
                  </a>
                </li>
                <li className="text-gray-400 flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Москва, ул. Севанская, д. 15, корп. 1, офис 11
                </li>
                <li className="text-gray-400 text-xs sm:text-sm ml-5 sm:ml-7">
                  Работаем круглосуточно 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Разработчик сайта */}
      <div className="border-t border-gray-800 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-lg" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))', boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.3)' }}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-xs sm:text-sm mb-0.5 sm:mb-1">Разработка и дизайн сайта</p>
                <a
                  href="https://akramedia.by/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-bold uppercase text-white hover:text-[var(--primary)] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group"
                >
                  Akra Media
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Копирайт */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} Все права защищены.
            </p>
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-[var(--primary)] transition-colors cursor-pointer">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

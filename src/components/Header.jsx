import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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
      setIsMenuOpen(false);
    }
  };

  // Отслеживание активной секции при скролле
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['about', 'services', 'advantages', 'reviews', 'pricing'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }

      // Если прокрутили в самый верх
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем сразу для установки начального состояния

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center h-16 sm:h-20 md:h-24">
          {/* Логотип */}
          <Link to="/" className="flex items-center" aria-label="Перейти на главную страницу">
            <img
              src="/лого 1 без фона.svg"
              alt="Безопасный АвтоПодбор - логотип компании по подбору автомобилей в Москве"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Навигация Desktop */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            <button
              onClick={() => scrollToSection('about')}
              className={`relative text-gray-300 hover:text-white transition-colors cursor-pointer ${activeSection === 'about' ? 'text-white font-semibold' : ''}`}
            >
              О нас
              {activeSection === 'about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`relative text-gray-300 hover:text-white transition-colors cursor-pointer ${activeSection === 'services' ? 'text-white font-semibold' : ''}`}
            >
              Услуги
              {activeSection === 'services' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection('advantages')}
              className={`relative text-gray-300 hover:text-white transition-colors cursor-pointer ${activeSection === 'advantages' ? 'text-white font-semibold' : ''}`}
            >
              Преимущества
              {activeSection === 'advantages' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className={`relative text-gray-300 hover:text-white transition-colors cursor-pointer ${activeSection === 'reviews' ? 'text-white font-semibold' : ''}`}
            >
              Отзывы
              {activeSection === 'reviews' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`relative text-gray-300 hover:text-white transition-colors cursor-pointer ${activeSection === 'pricing' ? 'text-white font-semibold' : ''}`}
            >
              Тарифы
              {activeSection === 'pricing' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 animate-pulse"></span>
              )}
            </button>
          </nav>

          {/* Контакты и кнопка */}
          <div className="hidden md:flex items-center space-x-4 ml-8">
            <a
              href="tel:+79932882809"
              className="text-white font-semibold hover:text-red-600 transition-colors whitespace-nowrap"
            >
              +7 (993) 288-28-09
            </a>
            <Link
              to="/form"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer"
            >
              Оставить заявку
            </Link>
          </div>

          {/* Мобильное меню - кнопка */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer ml-auto"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-red-600 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Мобильное меню - выпадающее */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-3 px-1 sm:py-4 sm:px-2 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base text-left transition-all cursor-pointer ${activeSection === 'about' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base text-left transition-all cursor-pointer ${activeSection === 'services' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('advantages')}
                className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base text-left transition-all cursor-pointer ${activeSection === 'advantages' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base text-left transition-all cursor-pointer ${activeSection === 'reviews' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base text-left transition-all cursor-pointer ${activeSection === 'pricing' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
              >
                Тарифы
              </button>

              <div className="h-px bg-gray-800 my-2"></div>

              <a
                href="tel:+79932882809"
                className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base text-white font-semibold hover:bg-gray-800 transition-all"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +7 (993) 288-28-09
              </a>

              <Link
                to="/form"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all text-center cursor-pointer"
              >
                Оставить заявку
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

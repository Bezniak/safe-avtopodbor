import { useEffect, useState } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  // Вычисляем угол для кругового прогресса
  const circumference = 2 * Math.PI * 80; // радиус = 80
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Круговой прогресс с логотипом */}
        <div className="relative mb-12">
          {/* SVG круговой прогресс */}
          <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
            {/* Фоновый круг */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="rgba(55, 65, 81, 0.3)"
              strokeWidth="4"
              fill="none"
            />
            {/* Прогресс круг */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-300 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))'
              }}
            />
            {/* Градиент для линии прогресса */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>

          {/* Логотип в центре */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <img
                src="/лого 1 без фона.svg"
                alt="SAFE-АВТОПОДБОР"
                className="w-24 h-24 object-contain animate-pulse"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.5))',
                  animationDuration: '2s'
                }}
              />
            </div>
          </div>

          {/* Процент в центре снизу */}
          <div className="absolute inset-0 flex items-center justify-center mt-20">
            <span className="text-3xl font-bold text-white">
              {progress}<span className="text-xl text-red-600">%</span>
            </span>
          </div>
        </div>

        {/* Загрузка */}
        <div className="text-center">
          <p className="text-gray-400 text-lg tracking-wide">
            Загрузка...
          </p>
        </div>

        {/* Анимированные точки */}
        <div className="mt-6 flex space-x-2">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

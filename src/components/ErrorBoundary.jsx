import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибку в сервис отчетов об ошибках
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Перезагружаем страницу для полного сброса состояния
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 sm:p-8 md:p-12 text-center">
              {/* Иконка ошибки */}
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-red-600/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Заголовок */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Что-то пошло не так
              </h1>

              {/* Описание */}
              <p className="text-base sm:text-lg text-gray-400 mb-8">
                Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
              </p>

              {/* Детали ошибки (только в режиме разработки) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 text-left">
                  <summary className="cursor-pointer text-red-500 hover:text-red-400 mb-2 text-sm">
                    Показать технические детали
                  </summary>
                  <div className="bg-black/50 rounded-lg p-4 overflow-auto max-h-60">
                    <pre className="text-xs text-gray-300">
                      {this.state.error.toString()}
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="px-6 sm:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Перезагрузить страницу
                </button>
                <a
                  href="/"
                  className="px-6 sm:px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full transition-all duration-300 border border-gray-700"
                >
                  Вернуться на главную
                </a>
              </div>

              {/* Контактная информация */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-500">
                  Если проблема повторяется, свяжитесь с нами:
                </p>
                <a
                  href="tel:+79932882809"
                  className="text-red-600 hover:text-red-500 font-semibold mt-2 inline-block"
                >
                  +7 (993) 288-28-09
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { useYandexMetrika } from '../hooks/useYandexMetrika'

const ContactPage = () => {
  const [searchParams] = useSearchParams()
  const selectedService = searchParams.get('service')
  const selectedPrice = searchParams.get('price')
  const { trackFormSubmit, trackPhoneClick, trackSocialClick } = useYandexMetrika()

  // Данные услуг и тарифов
  const services = [
    {
      title: 'Диагностика авто перед покупкой',
      description: 'Полная проверка автомобиля перед покупкой',
      price: 'от 4 289 ₽',
      features: ['Выезд к автомобилю', 'Детальный осмотр', 'Проверка толщиномером', 'Тест-драйв', 'Компьютерная диагностика', 'Детальный отчет']
    },
    {
      title: 'Подбор автомобиля под ключ',
      description: 'Полный цикл подбора и проверки',
      price: 'от 14 899 ₽',
      features: ['Подбор по критериям', 'Неограниченное количество авто', 'Диагностика', 'Юридическая проверка', 'Торг с продавцом', 'Сопровождение сделки']
    },
    {
      title: 'Помощь в оформлении сделки',
      description: 'Юридическое сопровождение',
      price: 'от 1 950 ₽',
      features: ['Договор купли-продажи', 'Проверка документов', 'Юридическая проверка', 'Помощь в ГИБДД']
    },
    {
      title: 'Изготовление дубликатов госномеров',
      description: 'Быстрое изготовление номеров',
      price: 'от 1 099 ₽',
      features: ['Соответствие ГОСТам', 'Быстрое изготовление', 'Качественные материалы']
    },
    {
      title: 'Юридическая проверка',
      description: 'Проверка истории и документов',
      price: 'входит в подбор',
      features: ['Проверка по базам ГИБДД', 'Проверка на залоги', 'История ДТП', 'Проверка VIN']
    }
  ]

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])

  // Прокрутка к началу и анимация появления
  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  // SEO meta tags
  useEffect(() => {
    document.title = 'Оставить заявку - Безопасный АвтоПодбор | Форма обратной связи'

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'Оставьте заявку на подбор автомобиля в Москве. Бесплатная консультация. Ответим в течение 15 минут. Телефон: +7 (993) 288-28-09. Работаем 24/7.'

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = 'https://safe-avtopodbor.ru/form'

    return () => {
      document.title = 'Безопасный АвтоПодбор - Профессиональный подбор автомобилей в Москве'
      if (metaDescription) {
        metaDescription.content = 'Профессиональный подбор автомобилей с пробегом в Москве и МО. Полная проверка истории, диагностика, юридическая чистота. 9 лет опыта. Гарантия безопасности сделки.'
      }
      if (canonical) {
        canonical.href = 'https://safe-avtopodbor.ru/'
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Валидация выбора услуги (только если пришли не с главной)
    if (!selectedService && !selectedPrice && selectedServices.length === 0) {
      newErrors.service = 'Пожалуйста, выберите хотя бы одну услугу'
    }

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    // Валидация российского номера телефона
    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона'
    } else {
      // Удаляем все символы кроме цифр и +
      const cleanPhone = formData.phone.replace(/[^\d+]/g, '')

      // Проверяем российский формат:
      // +7XXXXXXXXXX (12 символов) или 8XXXXXXXXXX (11 символов) или 7XXXXXXXXXX (11 символов)
      const russianPhoneRegex = /^(\+7|7|8)\d{10}$/

      if (!russianPhoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Введите корректный российский номер телефона (например, +7 900 123-45-67)'
      }

      // Дополнительная проверка: номер не должен состоять из одинаковых цифр
      const digitsOnly = cleanPhone.replace(/^(\+7|7|8)/, '')
      if (/^(\d)\1{9}$/.test(digitsOnly)) {
        newErrors.phone = 'Введите действительный номер телефона'
      }
    }

    // Валидация email (опционально, но если заполнен - проверяем)
    if (formData.email.trim()) {
      // Более строгая проверка email
      const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/

      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email адрес'
      }

      // Проверка длины
      if (formData.email.length > 254) {
        newErrors.email = 'Email адрес слишком длинный'
      }

      // Проверка локальной части (до @)
      const localPart = formData.email.split('@')[0]
      if (localPart && localPart.length > 64) {
        newErrors.email = 'Некорректный email адрес'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const fireConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
      colors: ['#DC2626', '#991B1B', '#7F1D1D', '#FFFFFF', '#1F2937']
    }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Валидация
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Формируем красивое сообщение для Telegram
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

      // Форматируем дату и время
      const now = new Date()
      const date = now.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
      const time = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      })

      let message = `🚗 <b>НОВАЯ ЗАЯВКА С САЙТА</b> 🚗\n\n`

      message += `⏰ <b>${date} в ${time}</b>\n\n`

      message += `<b>━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n`

      message += `<b>👤 Контактные данные:</b>\n\n`
      message += `<b>Имя:</b> ${formData.name}\n`
      message += `<b>Телефон:</b> <code>${formData.phone}</code>\n`

      if (formData.email) {
        message += `<b>Email:</b> ${formData.email}\n`
      }

      // Обработка выбранных услуг
      if (selectedService && selectedPrice) {
        message += `\n<b>━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n`
        message += `<b>🔧 Услуга:</b>\n\n`
        message += `${selectedService}\n`
        message += `<b>💰 Стоимость:</b> ${selectedPrice}\n`
      } else if (selectedServices.length > 0) {
        message += `\n<b>━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n`
        message += `<b>🔧 Выбранные услуги (${selectedServices.length}):</b>\n\n`
        selectedServices.forEach((service, index) => {
          message += `${index + 1}. <b>${service.title}</b>\n`
          message += `   <i>${service.description}</i>\n`
          message += `   💰 ${service.price}\n\n`
        })
      }

      if (formData.message) {
        message += `\n<b>━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n\n`
        message += `<b>💬 Сообщение клиента:</b>\n\n`
        message += `<i>${formData.message}</i>\n`
      }

      message += `\n<b>━━━━━━━━━━━━━━━━━━━━━━━━━</b>\n`
      message += `\n✅ <i>Заявка получена с сайта safe-avtopodbor.ru</i>`

      // Отправка в Telegram
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      })

      if (!response.ok) {
        throw new Error('Ошибка отправки в Telegram')
      }

      setIsSubmitting(false)
      setSubmitSuccess(true)
      setShowModal(true)

      // Запуск конфетти
      fireConfetti()

      // Отслеживание отправки формы в Яндекс.Метрике
      trackFormSubmit('contact_page_form')
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      setIsSubmitting(false)
      alert('Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам по телефону +7 (993) 288-28-09')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Анимированный фон с парящими элементами */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(var(--primary-rgb),0.05)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[rgba(var(--primary-rgb),0.05)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[var(--primary)]/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      {/* Хлебные крошки */}
      <div className={`container mx-auto px-4 py-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <nav className="flex items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1 group">
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-semibold">Оставить заявку</span>
        </nav>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className={`text-center mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
              Оставьте <span className="text-[var(--primary)] inline-block hover:scale-110 transition-transform cursor-default">заявку</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mx-auto mb-6 animate-pulse"></div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Получите <span className="text-white font-semibold">бесплатную консультацию</span> и расчет стоимости
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-gray-300">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-[rgba(var(--primary-rgb),0.1)] rounded-full flex items-center justify-center group-hover:bg-[rgba(var(--primary-rgb),0.2)] transition-all group-hover:scale-110">
                  <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="group-hover:text-white transition-colors">Ответим за <span className="text-[var(--primary)] font-bold">15 минут</span></span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-[rgba(var(--primary-rgb),0.1)] rounded-full flex items-center justify-center group-hover:bg-[rgba(var(--primary-rgb),0.2)] transition-all group-hover:scale-110">
                  <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="group-hover:text-white transition-colors">Работаем <span className="text-[var(--primary)] font-bold">24/7</span></span>
              </div>
            </div>
          </div>

          {/* Выбранная услуга/тариф */}
          {selectedService && selectedPrice && (
            <div className={`mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/5 to-[var(--primary)]/10 border-2 border-[rgba(var(--primary-rgb),0.5)] rounded-2xl p-6 overflow-hidden">
                {/* Декоративный элемент */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(var(--primary-rgb),0.1)] rounded-full blur-2xl"></div>

                <div className="relative flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Вы выбрали:</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedService}</h3>
                    <p className="text-lg font-semibold text-[var(--primary-light)]">{selectedPrice}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                      title="Очистить выбор"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Форма */}
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Декоративные элементы */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[rgba(var(--primary-rgb),0.1)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[rgba(var(--primary-rgb),0.1)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>

            <div className="relative bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50 backdrop-blur-sm border-2 border-gray-800 hover:border-[rgba(var(--primary-rgb),0.5)] rounded-3xl p-8 md:p-12 transition-all duration-500 shadow-2xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
              {submitSuccess && !showModal ? (
                // Сообщение об успешной отправке
                <div className="text-center py-12 animate-fadeIn">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[rgba(var(--primary-rgb),0.5)]">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Спасибо, <span className="text-[var(--primary)]">{formData.name}</span>! 🎉
                  </h2>
                  <p className="text-xl text-gray-300 mb-2">
                    Ваша заявка успешно отправлена!
                  </p>
                  <p className="text-lg text-gray-400 mb-6">
                    Мы свяжемся с вами в течение <span className="text-[var(--primary-light)] font-bold">15 минут</span>
                  </p>
                  <div className="flex justify-center gap-4 mb-8">
                    <a
                      href="tel:+79932882809"
                      onClick={() => trackPhoneClick('+79932882809')}
                      className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Позвонить сейчас
                    </a>
                    <a
                      href="https://t.me/avtomobill444"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSocialClick('telegram')}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.26-5.58 3.7-.53.37-.1.56-.34.59-.37.04-.82-.09-1.2-.23-.48-.18-.86-.28-.83-.59.02-.17.19-.34.52-.52 2.03-.88 3.38-1.46 4.04-1.74 1.92-.79 2.31-.93 2.58-.93.06 0 .18.01.26.07.07.05.09.12.1.17-.01.06-.01.24-.01.24z"/>
                      </svg>
                      Написать в Telegram
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false)
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        message: ''
                      })
                    }}
                    className="text-gray-400 hover:text-white transition-colors underline"
                  >
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <>
                  {/* Иконка формы */}
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center shadow-lg shadow-[rgba(var(--primary-rgb),0.5)] animate-pulse">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                {/* Выбор услуг внутри формы, если не выбрана через параметры */}
                {!selectedService && !selectedPrice && (
                  <div className="pb-6 border-b border-gray-700/50">
                    <label className="block text-gray-300 font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-[var(--primary)] text-white">1</span>
                      Выберите услуги <span className="text-[var(--primary)]">*</span>
                    </label>
                    <p className="text-gray-400 text-sm mb-4 ml-8">
                      Можно выбрать несколько услуг. {selectedServices.length > 0 && (
                        <span className="text-[var(--primary-light)] font-semibold">Выбрано: {selectedServices.length}</span>
                      )}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {services.map((service, index) => {
                        const isSelected = selectedServices.some(s => s.title === service.title)
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                // Убираем услугу из выбранных
                                setSelectedServices(selectedServices.filter(s => s.title !== service.title))
                              } else {
                                // Добавляем услугу к выбранным
                                setSelectedServices([...selectedServices, service])
                              }
                              if (errors.service) {
                                setErrors({ ...errors, service: '' })
                              }
                            }}
                            className={`relative text-left bg-black/50 border-2 ${
                              isSelected ? 'border-[var(--primary)] shadow-lg shadow-[rgba(var(--primary-rgb),0.2)]' : 'border-gray-700'
                            } rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-[rgba(var(--primary-rgb),0.5)] group`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}

                            <h4 className="text-base font-bold text-white mb-1 pr-8 group-hover:text-[var(--primary-light)] transition-colors">{service.title}</h4>
                            <p className="text-sm text-gray-400 mb-2">{service.description}</p>
                            <div className="text-lg font-bold text-[var(--primary)]">{service.price}</div>
                          </button>
                        )
                      })}
                    </div>

                    {errors.service && (
                      <p className="mt-3 text-sm text-[var(--primary-light)] flex items-center gap-1 animate-shake ml-8">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.service}
                      </p>
                    )}
                  </div>
                )}

                {/* Поля формы */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-gray-300 font-semibold mb-3 flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${focusedField === 'name' ? 'bg-[var(--primary)] text-white' : 'bg-gray-800 text-gray-400'} transition-all`}>{!selectedService && !selectedPrice ? '2' : '1'}</span>
                      Ваше имя <span className="text-[var(--primary)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Иван"
                      className={`w-full px-5 py-4 bg-black/50 border-2 ${errors.name ? 'border-[var(--primary-light)]' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none ${errors.name ? 'focus:border-[var(--primary-light)]' : 'focus:border-[var(--primary)]'} focus:ring-4 focus:ring-[rgba(var(--primary-rgb),0.2)] transition-all hover:border-gray-600`}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-[var(--primary-light)] flex items-center gap-1 animate-shake">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="group">
                    <label htmlFor="phone" className="block text-gray-300 font-semibold mb-3 flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${focusedField === 'phone' ? 'bg-[var(--primary)] text-white' : 'bg-gray-800 text-gray-400'} transition-all`}>{!selectedService && !selectedPrice ? '3' : '2'}</span>
                      Телефон <span className="text-[var(--primary)]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+7 (900) 000-00-00"
                      className={`w-full px-5 py-4 bg-black/50 border-2 ${errors.phone ? 'border-[var(--primary-light)]' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none ${errors.phone ? 'focus:border-[var(--primary-light)]' : 'focus:border-[var(--primary)]'} focus:ring-4 focus:ring-[rgba(var(--primary-rgb),0.2)] transition-all hover:border-gray-600`}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-[var(--primary-light)] flex items-center gap-1 animate-shake">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-gray-300 font-semibold mb-3 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${focusedField === 'email' ? 'bg-[var(--primary)] text-white' : 'bg-gray-800 text-gray-400'} transition-all`}>{!selectedService && !selectedPrice ? '4' : '3'}</span>
                    Email <span className="text-gray-500 font-normal text-sm">(необязательно)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="example@mail.com"
                    className={`w-full px-5 py-4 bg-black/50 border-2 ${errors.email ? 'border-[var(--primary-light)]' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none ${errors.email ? 'focus:border-[var(--primary-light)]' : 'focus:border-[var(--primary)]'} focus:ring-4 focus:ring-[rgba(var(--primary-rgb),0.2)] transition-all hover:border-gray-600`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-[var(--primary-light)] flex items-center gap-1 animate-shake">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-gray-300 font-semibold mb-3 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${focusedField === 'message' ? 'bg-[var(--primary)] text-white' : 'bg-gray-800 text-gray-400'} transition-all`}>{!selectedService && !selectedPrice ? '5' : '4'}</span>
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows="5"
                    placeholder="Расскажите о желаемом автомобиле, бюджете и ваших пожеланиях..."
                    className="w-full px-5 py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgba(var(--primary-rgb),0.2)] transition-all resize-none hover:border-gray-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`relative w-full py-5 rounded-full text-lg font-bold transition-all transform overflow-hidden group ${
                    submitSuccess
                      ? 'bg-green-600 cursor-default'
                      : isSubmitting
                      ? 'bg-gray-600 cursor-wait'
                      : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary-darker)] hover:scale-105 hover:shadow-2xl hover:shadow-[rgba(var(--primary-rgb),0.5)] cursor-pointer'
                  } text-white`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {submitSuccess ? (
                      <>
                        <svg className="w-6 h-6 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Заявка отправлена!
                      </>
                    ) : isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  {!submitSuccess && !isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-darker)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <Link to="/privacy" className="text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors underline">
                    политикой конфиденциальности
                  </Link>
                </p>
              </form>
                </>
              )}
            </div>
          </div>

          {/* Преимущества заявки */}
          <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="group bg-gradient-to-br from-gray-900/80 to-black border-2 border-gray-800 hover:border-[rgba(var(--primary-rgb),0.5)] rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary-dark)]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-[rgba(var(--primary-rgb),0.5)]">
                <span className="text-4xl animate-bounce" style={{ animationDuration: '2s' }}>🚀</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[var(--primary-light)] transition-colors">Быстрый ответ</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Ответим в течение 15 минут</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-900/80 to-black border-2 border-gray-800 hover:border-[rgba(var(--primary-rgb),0.5)] rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary-dark)]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-[rgba(var(--primary-rgb),0.5)]">
                <span className="text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.2s' }}>💬</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[var(--primary-light)] transition-colors">Бесплатная консультация</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Ответим на все ваши вопросы</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-900/80 to-black border-2 border-gray-800 hover:border-[rgba(var(--primary-rgb),0.5)] rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)]">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary-dark)]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-[rgba(var(--primary-rgb),0.5)]">
                <span className="text-4xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.4s' }}>📊</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[var(--primary-light)] transition-colors">Расчет стоимости</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Подберем оптимальный вариант</p>
            </div>
          </div>

          {/* Альтернативные способы связи */}
          <div className={`mt-20 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Или свяжитесь с нами <span className="text-[var(--primary)]">удобным способом</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent mx-auto mb-12"></div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="tel:+79932882809"
                onClick={() => trackPhoneClick('+79932882809')}
                className="group flex items-center gap-4 bg-gradient-to-r from-gray-900/80 to-black border-2 border-gray-800 hover:border-[var(--primary)] rounded-2xl px-8 py-5 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)]"
              >
                <div className="w-12 h-12 bg-[rgba(var(--primary-rgb),0.1)] rounded-full flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-xs uppercase tracking-wide group-hover:text-gray-300 transition-colors">Позвонить</p>
                  <p className="text-white text-lg font-bold group-hover:text-[var(--primary-light)] transition-colors">+7 (993) 288-28-09</p>
                </div>
              </a>

              <a
                href="https://t.me/avtomobill444"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('telegram')}
                className="group flex items-center gap-4 bg-gradient-to-r from-gray-900/80 to-black border-2 border-gray-800 hover:border-[var(--primary)] rounded-2xl px-8 py-5 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)]"
              >
                <div className="w-12 h-12 bg-[rgba(var(--primary-rgb),0.1)] rounded-full flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.26-5.58 3.7-.53.37-.1.56-.34.59-.37.04-.82-.09-1.2-.23-.48-.18-.86-.28-.83-.59.02-.17.19-.34.52-.52 2.03-.88 3.38-1.46 4.04-1.74 1.92-.79 2.31-.93 2.58-.93.06 0 .18.01.26.07.07.05.09.12.1.17-.01.06-.01.24-.01.24z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-xs uppercase tracking-wide group-hover:text-gray-300 transition-colors">Telegram</p>
                  <p className="text-white text-lg font-bold group-hover:text-[var(--primary-light)] transition-colors">@avtomobill444</p>
                </div>
              </a>

              <a
                href="https://vk.com/carchoiespro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('vk')}
                className="group flex items-center gap-4 bg-gradient-to-r from-gray-900/80 to-black border-2 border-gray-800 hover:border-[var(--primary)] rounded-2xl px-8 py-5 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[rgba(var(--primary-rgb),0.2)]"
              >
                <div className="w-12 h-12 bg-[rgba(var(--primary-rgb),0.1)] rounded-full flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all">
                  <svg className="w-6 h-6 text-[var(--primary)] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.94c-.37.8-1.38 1.51-2.25 1.32-.54-.12-1.05-.48-1.53-.88-.88-.74-1.69-1.57-2.67-2.14-.34-.2-.76-.31-1.14-.2-.45.13-.67.54-.76.99-.17.9.15 1.95-.49 2.69-.43.5-1.26.54-1.88.27-.99-.43-1.79-1.2-2.5-2-.96-1.08-1.76-2.29-2.44-3.56-.64-1.2-1.22-2.48-1.31-3.86-.06-.93.32-1.96 1.15-2.43.58-.33 1.33-.31 1.91-.02.49.24.85.66 1.15 1.1.58.85 1.08 1.76 1.6 2.65.17.29.34.62.65.76.35.16.76.02 1.02-.25.28-.28.39-.68.44-1.06.11-.85.12-1.71.09-2.57-.02-.63-.07-1.29-.41-1.83-.3-.48-.85-.76-1.38-.91.18-.27.37-.52.62-.7.64-.46 1.47-.53 2.23-.48 1.37.09 2.9.47 3.57 1.69.37.68.44 1.48.46 2.25.04 1.19.03 2.39-.13 3.57-.07.51-.19 1.06-.53 1.45-.3.35-.82.49-1.27.35-.43-.13-.76-.45-1.02-.81-.54-.75-1-1.56-1.48-2.36-.14-.23-.28-.47-.49-.65-.22-.19-.54-.26-.81-.15-.27.11-.44.37-.55.63-.24.58-.31 1.22-.31 1.85 0 .94.13 1.89.44 2.78.14.41.34.82.66 1.13.35.34.84.51 1.32.51.86 0 1.67-.45 2.37-.95 1.17-.84 2.17-1.92 3.05-3.06.18-.23.35-.48.43-.76.09-.32.02-.67-.19-.93z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-400 text-xs uppercase tracking-wide group-hover:text-gray-300 transition-colors">ВКонтакте</p>
                  <p className="text-white text-lg font-bold group-hover:text-[var(--primary-light)] transition-colors">carchoiespro</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-[rgba(var(--primary-rgb),0.5)] rounded-3xl p-12 max-w-lg mx-4 text-center shadow-2xl shadow-[rgba(var(--primary-rgb),0.5)] animate-scaleIn">
            {/* Декоративные элементы */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[rgba(var(--primary-rgb),0.2)] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[rgba(var(--primary-rgb),0.2)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

            {/* Иконка успеха */}
            <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[rgba(var(--primary-rgb),0.5)]">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Текст */}
            <h2 className="text-4xl font-bold text-white mb-4 animate-fadeIn">
              Отлично! 🎉
            </h2>
            <p className="text-xl text-gray-300 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Ваша заявка успешно отправлена!
            </p>
            <p className="text-gray-400 mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              Мы свяжемся с вами в течение <span className="text-[var(--primary-light)] font-bold">15 минут</span>
            </p>

            {/* Кнопка закрытия */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Дополнительные контакты */}
            <div className="flex justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <a
                href="tel:+79932882809"
                onClick={() => trackPhoneClick('+79932882809')}
                className="flex items-center gap-2 text-gray-400 hover:text-[var(--primary-light)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Позвонить
              </a>
              <a
                href="https://t.me/avtomobill444"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('telegram')}
                className="flex items-center gap-2 text-gray-400 hover:text-[var(--primary-light)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.26-5.58 3.7-.53.37-.1.56-.34.59-.37.04-.82-.09-1.2-.23-.48-.18-.86-.28-.83-.59.02-.17.19-.34.52-.52 2.03-.88 3.38-1.46 4.04-1.74 1.92-.79 2.31-.93 2.58-.93.06 0 .18.01.26.07.07.05.09.12.1.17-.01.06-.01.24-.01.24z"/>
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactPage

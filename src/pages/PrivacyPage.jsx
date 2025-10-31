import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // SEO meta tags
  useEffect(() => {
    document.title = 'Политика конфиденциальности - Безопасный АвтоПодбор'

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'Политика конфиденциальности Безопасный АвтоПодбор. Правила обработки персональных данных в соответствии с ФЗ-152 "О персональных данных".'

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = 'https://safe-avtopodbor.ru/privacy'

    // Add noindex for privacy page (optional - обычно политику не индексируют активно)
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    const originalRobots = robots.content
    robots.content = 'index, follow'

    return () => {
      document.title = 'Безопасный АвтоПодбор - Профессиональный подбор автомобилей в Москве'
      if (metaDescription) {
        metaDescription.content = 'Профессиональный подбор автомобилей с пробегом в Москве и МО. Полная проверка истории, диагностика, юридическая чистота. 9 лет опыта. Гарантия безопасности сделки.'
      }
      if (canonical) {
        canonical.href = 'https://safe-avtopodbor.ru/'
      }
      if (robots) {
        robots.content = originalRobots || 'index, follow'
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center text-sm text-gray-400">
          <Link to="/" className="transition-colors flex items-center gap-1 group" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-semibold">Политика конфиденциальности</span>
        </nav>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Политика <span style={{ color: 'var(--primary)' }}>конфиденциальности</span>
            </h1>
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--primary), transparent)' }}></div>
            <p className="text-gray-400 text-lg">
              Дата последнего обновления: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Контент */}
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 md:p-12 space-y-8">
            {/* Введение */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                1. Общие положения
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) действует в отношении всей информации, которую сервис по подбору автомобилей <span className="text-white font-semibold">"Безопасный АвтоПодбор"</span> (далее – Компания) может получить о Пользователе во время использования данного сайта, программ и продуктов Компании.
                </p>
                <p>
                  Использование сервиса означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации. В случае несогласия с этими условиями Пользователь должен воздержаться от использования сервисов.
                </p>
              </div>
            </section>

            {/* Персональная информация */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                2. Персональная информация пользователей
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  В рамках настоящей Политики под <span className="text-white font-semibold">"персональной информацией Пользователя"</span> понимаются:
                </p>
                <div className="bg-black/50 border border-gray-700 rounded-xl p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Персональная информация, которую Пользователь предоставляет о себе самостоятельно при заполнении форм обратной связи, включая персональные данные Пользователя: ФИО, номер телефона, адрес электронной почты.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Данные, которые автоматически передаются сервису в процессе его использования с помощью установленного на устройстве Пользователя программного обеспечения, в том числе IP-адрес, информация из cookie, информация о браузере пользователя (или иной программе, с помощью которой осуществляется доступ к сервису).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Информация о критериях подбора автомобиля, бюджете и предпочтениях, указанных в сообщениях и заявках.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 italic">
                  Компания не проверяет достоверность персональной информации, предоставляемой Пользователем, и не имеет возможности оценивать его дееспособность.
                </p>
              </div>
            </section>

            {/* Цели обработки */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                3. Цели обработки персональной информации
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Компания собирает и хранит только те персональные данные, которые необходимы для предоставления сервиса и оказания услуг:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl p-5" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.05), transparent)', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}>
                        <span className="text-xl">📞</span>
                      </div>
                      <h3 className="text-white font-semibold">Связь с клиентом</h3>
                    </div>
                    <p className="text-sm text-gray-400">Установление обратной связи, включая направление уведомлений, запросов касательно использования сервиса, оказания услуг, обработка запросов и заявок от Пользователя</p>
                  </div>
                  <div className="rounded-xl p-5" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.05), transparent)', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}>
                        <span className="text-xl">🚗</span>
                      </div>
                      <h3 className="text-white font-semibold">Подбор автомобиля</h3>
                    </div>
                    <p className="text-sm text-gray-400">Определение потребностей Пользователя для оказания услуг по подбору автомобиля</p>
                  </div>
                  <div className="rounded-xl p-5" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.05), transparent)', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}>
                        <span className="text-xl">🔒</span>
                      </div>
                      <h3 className="text-white font-semibold">Безопасность</h3>
                    </div>
                    <p className="text-sm text-gray-400">Подтверждение достоверности и полноты персональных данных, предоставленных Пользователем</p>
                  </div>
                  <div className="rounded-xl p-5" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(var(--primary-rgb), 0.05), transparent)', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}>
                        <span className="text-xl">📊</span>
                      </div>
                      <h3 className="text-white font-semibold">Улучшение сервиса</h3>
                    </div>
                    <p className="text-sm text-gray-400">Повышение качества услуг и разработка новых сервисов</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Условия обработки */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                4. Условия обработки персональной информации
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Обработка персональных данных Пользователя осуществляется:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-black/30 border border-gray-700 rounded-lg">
                    <span className="font-bold text-xl" style={{ color: 'var(--primary)' }}>•</span>
                    <p>С согласия субъекта персональных данных на обработку его персональных данных</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-black/30 border border-gray-700 rounded-lg">
                    <span className="font-bold text-xl" style={{ color: 'var(--primary)' }}>•</span>
                    <p>В случаях, когда обработка персональных данных необходима для осуществления и выполнения возложенных законодательством РФ функций, полномочий и обязанностей</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-black/30 border border-gray-700 rounded-lg">
                    <span className="font-bold text-xl" style={{ color: 'var(--primary)' }}>•</span>
                    <p>Без ограничения срока, любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 italic mt-4">
                  Пользователь принимает решение о предоставлении его персональных данных и дает согласие на их обработку свободно, своей волей и в своем интересе. Согласие на обработку персональных данных может быть отозвано Пользователем путем направления письменного заявления Компании.
                </p>
              </div>
            </section>

            {/* Защита информации */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                5. Защита персональной информации
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Компания принимает необходимые и достаточные организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий с ней третьих лиц.</p>
                <div className="p-6 rounded-r-xl border-l-4" style={{ backgroundImage: 'linear-gradient(to right, rgba(var(--primary-rgb), 0.1), transparent)', borderLeftColor: 'var(--primary)' }}>
                  <p className="text-white font-semibold mb-2">Меры защиты включают:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)' }}>▸</span>
                      <span>Использование защищенных протоколов передачи данных (HTTPS/SSL)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)' }}>▸</span>
                      <span>Ограничение доступа к персональным данным только для сотрудников, которым эта информация необходима для выполнения служебных обязанностей</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)' }}>▸</span>
                      <span>Регулярное резервное копирование данных</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: 'var(--primary)' }}>▸</span>
                      <span>Контроль за действиями персонала с персональными данными</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Передача третьим лицам */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                6. Передача персональных данных третьим лицам
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Персональные данные Пользователей <span className="text-white font-semibold">не передаются третьим лицам</span>, за исключением следующих случаев:</p>
                <div className="space-y-3">
                  <div className="p-4 bg-black/30 border border-gray-700 rounded-lg">
                    <p className="text-white font-semibold mb-2">1. С согласия Пользователя</p>
                    <p className="text-sm text-gray-400">Пользователь явным образом выразил свое согласие на такие действия</p>
                  </div>
                  <div className="p-4 bg-black/30 border border-gray-700 rounded-lg">
                    <p className="text-white font-semibold mb-2">2. По требованию закона</p>
                    <p className="text-sm text-gray-400">Передача предусмотрена российским или иным применимым законодательством в рамках установленной законодательством процедуры</p>
                  </div>
                  <div className="p-4 bg-black/30 border border-gray-700 rounded-lg">
                    <p className="text-white font-semibold mb-2">3. Партнеры для оказания услуг</p>
                    <p className="text-sm text-gray-400">Только при необходимости и в объеме, необходимом для оказания услуг (например, транспортные компании при доставке автомобиля)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Права пользователя */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                7. Права субъекта персональных данных
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Пользователь имеет право:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "👤", title: "Получать информацию", text: "О наличии персональных данных, относящихся к соответствующему субъекту персональных данных" },
                    { icon: "👁️", title: "Ознакомиться", text: "Со своими персональными данными и с порядком их обработки" },
                    { icon: "✏️", title: "Требовать уточнения", text: "Блокирования или уничтожения недостоверных или незаконно полученных персональных данных" },
                    { icon: "🚫", title: "Отозвать согласие", text: "На обработку персональных данных путем направления письменного заявления" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gradient-to-br from-gray-800/50 to-black border border-gray-700 rounded-xl transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.5)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(55, 65, 81)'}
                    >
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cookie */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                8. Использование файлов Cookie
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Сайт использует файлы cookie для:</p>
                <div className="bg-black/50 border border-gray-700 rounded-xl p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl" style={{ color: 'var(--primary)' }}>▸</span>
                    <p>Улучшения работы сайта и удобства его использования</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl" style={{ color: 'var(--primary)' }}>▸</span>
                    <p>Сохранения предпочтений и настроек пользователя</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl" style={{ color: 'var(--primary)' }}>▸</span>
                    <p>Анализа посещаемости сайта и взаимодействия пользователей с контентом</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Пользователь может в любой момент изменить настройки своего браузера для отключения файлов cookie. При этом некоторые функции сайта могут работать некорректно.
                </p>
              </div>
            </section>

            {/* Изменения политики */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                9. Изменение Политики конфиденциальности
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Компания имеет право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений в актуальной редакции указывается дата последнего обновления. Новая редакция Политики вступает в силу с момента ее размещения, если иное не предусмотрено новой редакцией Политики.</p>
                <div className="p-6 rounded-r-xl border-l-4" style={{ backgroundImage: 'linear-gradient(to right, rgba(var(--primary-rgb), 0.1), transparent)', borderLeftColor: 'var(--primary)' }}>
                  <p className="text-white">Действующая редакция постоянно доступна на <Link to="/privacy" className="underline transition-colors" style={{ color: 'var(--primary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-light)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}>этой странице</Link></p>
                </div>
              </div>
            </section>

            {/* Контакты */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded" style={{ backgroundColor: 'var(--primary)' }}></span>
                10. Контактная информация
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>По всем вопросам, связанным с обработкой персональных данных, Пользователь может обратиться к Компании:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <a
                    href="tel:+79932882809"
                    className="group flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/50 to-black border border-gray-700 rounded-xl transition-all hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(55, 65, 81)'}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors"
                      style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.2)'}
                    >
                      <svg className="w-7 h-7 transition-colors" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Телефон</p>
                    <p className="text-white font-bold text-center">+7 (993) 288-28-09</p>
                  </a>

                  <a
                    href="https://t.me/avtomobill444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/50 to-black border border-gray-700 rounded-xl transition-all hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(55, 65, 81)'}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors"
                      style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.2)'}
                    >
                      <svg className="w-7 h-7 transition-colors" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.26-5.58 3.7-.53.37-.1.56-.34.59-.37.04-.82-.09-1.2-.23-.48-.18-.86-.28-.83-.59.02-.17.19-.34.52-.52 2.03-.88 3.38-1.46 4.04-1.74 1.92-.79 2.31-.93 2.58-.93.06 0 .18.01.26.07.07.05.09.12.1.17-.01.06-.01.24-.01.24z"/>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs uppercase mb-2">Telegram</p>
                    <p className="text-white font-bold text-center">@avtomobill444</p>
                  </a>

                  <a
                    href="https://vk.com/carchoiespro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-6 bg-gradient-to-br from-gray-800/50 to-black border border-gray-700 rounded-xl transition-all hover:scale-105"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(55, 65, 81)'}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors"
                      style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.2)'}
                    >
                      <svg className="w-7 h-7 transition-colors" style={{ color: 'var(--primary)' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.94c-.37.8-1.38 1.51-2.25 1.32-.54-.12-1.05-.48-1.53-.88-.88-.74-1.69-1.57-2.67-2.14-.34-.2-.76-.31-1.14-.2-.45.13-.67.54-.76.99-.17.9.15 1.95-.49 2.69-.43.5-1.26.54-1.88.27-.99-.43-1.79-1.2-2.5-2-.96-1.08-1.76-2.29-2.44-3.56-.64-1.2-1.22-2.48-1.31-3.86-.06-.93.32-1.96 1.15-2.43.58-.33 1.33-.31 1.91-.02.49.24.85.66 1.15 1.1.58.85 1.08 1.76 1.6 2.65.17.29.34.62.65.76.35.16.76.02 1.02-.25.28-.28.39-.68.44-1.06.11-.85.12-1.71.09-2.57-.02-.63-.07-1.29-.41-1.83-.3-.48-.85-.76-1.38-.91.18-.27.37-.52.62-.7.64-.46 1.47-.53 2.23-.48 1.37.09 2.9.47 3.57 1.69.37.68.44 1.48.46 2.25.04 1.19.03 2.39-.13 3.57-.07.51-.19 1.06-.53 1.45-.3.35-.82.49-1.27.35-.43-.13-.76-.45-1.02-.81-.54-.75-1-1.56-1.48-2.36-.14-.23-.28-.47-.49-.65-.22-.19-.54-.26-.81-.15-.27.11-.44.37-.55.63-.24.58-.31 1.22-.31 1.85 0 .94.13 1.89.44 2.78.14.41.34.82.66 1.13.35.34.84.51 1.32.51.86 0 1.67-.45 2.37-.95 1.17-.84 2.17-1.92 3.05-3.06.18-.23.35-.48.43-.76.09-.32.02-.67-.19-.93z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs uppercase mb-2">ВКонтакте</p>
                    <p className="text-white font-bold text-center">carchoiespro</p>
                  </a>
                </div>
                <div className="bg-gradient-to-r from-red-600/10 to-transparent border-l-4 border-red-600 p-6 rounded-r-xl mt-6">
                  <p className="text-white font-semibold mb-2">Режим работы:</p>
                  <p className="text-gray-300">Ежедневно, круглосуточно (24/7)</p>
                </div>
              </div>
            </section>

            {/* Заключение */}
            <section className="border-t border-gray-700 pt-8 mt-8">
              <div className="text-center text-gray-400 text-sm space-y-2">
                <p>Настоящая Политика конфиденциальности является неотъемлемой частью Пользовательского соглашения</p>
                <p className="text-xs">© {new Date().getFullYear()} Безопасный АвтоПодбор. Все права защищены.</p>
              </div>
            </section>
          </div>

          {/* Кнопка назад */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'var(--primary)', boxShadow: '0 10px 15px -3px rgba(var(--primary-rgb), 0.5)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage

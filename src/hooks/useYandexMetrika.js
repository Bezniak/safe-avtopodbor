import { useCallback } from 'react';

/**
 * Хук для работы с Яндекс.Метрикой и Google Tag Manager
 * Отслеживает события: клики, конверсии, цели
 */
export const useYandexMetrika = () => {
  const METRIKA_ID = 105138555;

  /**
   * Отправка события в GTM dataLayer
   * @param {string} event - Название события
   * @param {object} params - Параметры события
   */
  const pushToDataLayer = useCallback((event, params = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      try {
        window.dataLayer.push({
          event: event,
          ...params
        });
        console.log(`[GTM] Событие отправлено: ${event}`, params);
      } catch (error) {
        console.error('[GTM] Ошибка отправки события:', error);
      }
    }
  }, []);

  /**
   * Отправка события в Google Analytics 4
   * @param {string} eventName - Название события
   * @param {object} params - Параметры события
   */
  const sendGAEvent = useCallback((eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', eventName, params);
        console.log(`[GA4] Событие отправлено: ${eventName}`, params);
      } catch (error) {
        console.error('[GA4] Ошибка отправки события:', error);
      }
    }
  }, []);

  /**
   * Отправка цели в Яндекс.Метрику, GTM и GA4
   * @param {string} target - Название цели (например, 'phone_click', 'form_submit')
   * @param {object} params - Дополнительные параметры события
   */
  const reachGoal = useCallback((target, params = {}) => {
    // Отправка в Яндекс.Метрику
    if (typeof window !== 'undefined' && window.ym) {
      try {
        window.ym(METRIKA_ID, 'reachGoal', target, params);
        console.log(`[Яндекс.Метрика] Цель достигнута: ${target}`, params);
      } catch (error) {
        console.error('[Яндекс.Метрика] Ошибка отправки цели:', error);
      }
    }

    // Отправка в GTM dataLayer
    pushToDataLayer(target, params);

    // Отправка в Google Analytics 4
    sendGAEvent(target, params);
  }, [pushToDataLayer, sendGAEvent]);

  /**
   * Отслеживание клика по телефону
   * @param {string} phoneNumber - Номер телефона
   */
  const trackPhoneClick = useCallback((phoneNumber) => {
    reachGoal('phone_click', {
      phone: phoneNumber,
      timestamp: new Date().toISOString()
    });
  }, [reachGoal]);

  /**
   * Отслеживание отправки формы
   * @param {string} formName - Название формы
   */
  const trackFormSubmit = useCallback((formName = 'contact_form') => {
    reachGoal('form_submit', {
      form_name: formName,
      timestamp: new Date().toISOString()
    });
  }, [reachGoal]);

  /**
   * Отслеживание клика по кнопке
   * @param {string} buttonName - Название кнопки
   * @param {string} location - Местоположение кнопки на странице
   */
  const trackButtonClick = useCallback((buttonName, location = '') => {
    reachGoal('button_click', {
      button: buttonName,
      location: location,
      timestamp: new Date().toISOString()
    });
  }, [reachGoal]);

  /**
   * Отслеживание клика по соцсетям
   * @param {string} network - Название соцсети (vk, telegram, avito)
   */
  const trackSocialClick = useCallback((network) => {
    reachGoal('social_click', {
      network: network,
      timestamp: new Date().toISOString()
    });
  }, [reachGoal]);

  /**
   * Отслеживание просмотра тарифа
   * @param {string} tariffName - Название тарифа
   * @param {number} price - Цена тарифа
   */
  const trackTariffView = useCallback((tariffName, price) => {
    reachGoal('tariff_view', {
      tariff: tariffName,
      price: price,
      timestamp: new Date().toISOString()
    });
  }, [reachGoal]);

  /**
   * Отслеживание скролла до секции
   * @param {string} sectionName - Название секции
   */
  const trackSectionView = useCallback((sectionName) => {
    reachGoal('section_view', {
      section: sectionName,
      timestamp: new Date().toISOString()
    });
  }, [reachGoal]);

  return {
    reachGoal,
    trackPhoneClick,
    trackFormSubmit,
    trackButtonClick,
    trackSocialClick,
    trackTariffView,
    trackSectionView
  };
};

import '@mantine/core/styles.css';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router';
import { App } from './App';

export const I18nApp = () => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  if (lang !== 'en' && lang !== 'nl') {
    return <Navigate to="/en/" replace />;
  }

  return <App />;
};

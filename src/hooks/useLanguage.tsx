import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Language = "ru" | "uk" | "en";

interface Translations {
  title: string;
  subtitle: string;
  downed: string;
  kills: string;
  dmgDealt: string;
  dmgTaken: string;
  hours: string;
  placeholderExample: string;
  dmgRatio: string;
  dmgPerKill: string;
  estimatedDeaths: string;
  kd: string;
  statsPerHour: string;
  statsPerRaid: string;
  metric: string;
  value: string;
  min20: string;
  min25: string;
  min30: string;
  deathsEstimate: string;
  shareResults: string;
  shareLink: string;
  downloadImage: string;
  copyText: string;
  copyImage: string;
  copied: string;
  enterData: string;
  enterStats: string;
  footer: string;
  language: string;
}

const translations: Record<Language, Translations> = {
  ru: {
    title: "ARC Raiders Stats Calculator",
    subtitle: "Расчёт статистики: урон, K/D, показатели на час и рейд",
    downed: "Выведено из строя",
    kills: "Нокауты (Kills)",
    dmgDealt: "Урон нанесён",
    dmgTaken: "Урон получен",
    hours: "Время на поверхности (часы)",
    placeholderExample: "например",
    dmgRatio: "Соотношение урона",
    dmgPerKill: "Урон на нокаут",
    estimatedDeaths: "Оценка смертей",
    kd: "K/D",
    statsPerHour: "Статистика на час",
    statsPerRaid: "Показатели на рейд",
    metric: "Показатель",
    value: "Значение",
    min20: "20 мин",
    min25: "25 мин",
    min30: "30 мин",
    deathsEstimate: "Смерти (оценка)",
    shareResults: "Поделиться результатами",
    shareLink: "Поделиться",
    downloadImage: "Скачать PNG",
    copyText: "Копировать",
    copyImage: "Копировать картинку",
    copied: "Скопировано!",
    enterData: "Введите киллы и время для расчёта статистики",
    enterStats: "Введите данные",
    footer: "Автоматический расчёт • Поддержка k/m нотации",
    language: "Язык",
  },
  uk: {
    title: "ARC Raiders Stats Calculator",
    subtitle: "Розрахунок статистики: урон, K/D, показники на годину та рейд",
    downed: "Виведено з ладу",
    kills: "Нокаути (Kills)",
    dmgDealt: "Урон завдано",
    dmgTaken: "Урон отримано",
    hours: "Час на поверхні (години)",
    placeholderExample: "наприклад",
    dmgRatio: "Співвідношення урону",
    dmgPerKill: "Урон на нокаут",
    estimatedDeaths: "Оцінка смертей",
    kd: "K/D",
    statsPerHour: "Статистика на годину",
    statsPerRaid: "Показники на рейд",
    metric: "Показник",
    value: "Значення",
    min20: "20 хв",
    min25: "25 хв",
    min30: "30 хв",
    deathsEstimate: "Смерті (оцінка)",
    shareResults: "Поділитися результатами",
    shareLink: "Поділитися",
    downloadImage: "Завантажити PNG",
    copyText: "Копіювати",
    copyImage: "Копіювати зображення",
    copied: "Скопійовано!",
    enterData: "Введіть кіли та час для розрахунку статистики",
    enterStats: "Введіть дані",
    footer: "Автоматичний розрахунок • Підтримка k/m нотації",
    language: "Мова",
  },
  en: {
    title: "ARC Raiders Stats Calculator",
    subtitle: "Calculate stats: damage, K/D, per hour & per raid metrics",
    downed: "Downed",
    kills: "Kills",
    dmgDealt: "Damage Dealt",
    dmgTaken: "Damage Taken",
    hours: "Surface Time (hours)",
    placeholderExample: "e.g.",
    dmgRatio: "Damage Ratio",
    dmgPerKill: "Damage per Kill",
    estimatedDeaths: "Est. Deaths",
    kd: "K/D",
    statsPerHour: "Stats per Hour",
    statsPerRaid: "Stats per Raid",
    metric: "Metric",
    value: "Value",
    min20: "20 min",
    min25: "25 min",
    min30: "30 min",
    deathsEstimate: "Deaths (est.)",
    shareResults: "Share Results",
    shareLink: "Share",
    downloadImage: "Download PNG",
    copyText: "Copy",
    copyImage: "Copy Image",
    copied: "Copied!",
    enterData: "Enter kills and hours to calculate stats",
    enterStats: "Enter Your Stats",
    footer: "Auto-calculation • Supports k/m notation",
    language: "Language",
  },
};

const pathToLang: Record<string, Language> = {
  "/en": "en",
  "/ru": "ru",
  "/ua": "uk",
};

const langToPath: Record<Language, string> = {
  en: "/en",
  ru: "/ru",
  uk: "/ua",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [language, setLanguageState] = useState<Language>(() => {
    return pathToLang[location.pathname] || "en";
  });

  useEffect(() => {
    const langFromPath = pathToLang[location.pathname];
    if (langFromPath && langFromPath !== language) {
      setLanguageState(langFromPath);
    }
  }, [location.pathname, language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    navigate(langToPath[lang]);
  }, [navigate]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

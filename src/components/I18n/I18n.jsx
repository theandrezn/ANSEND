import { useTranslation } from "react-i18next";
import Flag from "./Flag";

const languages = [
  { language: "pt-BR", country: "BR", label: "Portugues do Brasil" },
  { language: "en-US", country: "US", label: "English United States" },
];

export default function I18n() {
  const { i18n } = useTranslation();

  function handleChangeLanguage(language) {
    i18n.changeLanguage(language);
  }

  return (
    <div className="ansend-i18n-switcher" aria-label="Selecionar idioma">
      {languages.map((item) => (
        <Flag
          key={item.language}
          country={item.country}
          label={item.label}
          active={i18n.resolvedLanguage === item.language || i18n.language === item.language}
          onClick={() => handleChangeLanguage(item.language)}
        />
      ))}
    </div>
  );
}

import { FC } from "react";
import { useLanguage, Language } from "@/hooks/useLanguage";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uk", label: "UA" },
];

export const LanguageSelector: FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-2 text-xs font-medium transition-all duration-300 rounded-md border ${
            language === lang.code
              ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
              : "bg-card/50 border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

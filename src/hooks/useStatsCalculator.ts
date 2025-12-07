import { useState, useEffect, useCallback } from "react";
import {
  StatsInput,
  StatsResult,
  parseNum,
  calculateStats,
  parseUrlParams,
  generateShareUrl,
} from "@/lib/statsCalculator";
import { Language } from "@/hooks/useLanguage";

interface FormValues {
  downed: string;
  kills: string;
  dmgDealt: string;
  dmgTaken: string;
  hours: string;
}

const getCopyText = (lang: Language, result: StatsResult, shareUrl: string): string => {
  const texts: Record<Language, string> = {
    ru: `Мои статы в ARC Raiders: K/D ${result.kd.toFixed(2)}, соотношение урона ${result.dmgRatio.toFixed(1)}x — ${shareUrl}`,
    uk: `Мої стати в ARC Raiders: K/D ${result.kd.toFixed(2)}, співвідношення урону ${result.dmgRatio.toFixed(1)}x — ${shareUrl}`,
    en: `My ARC Raiders stats: K/D ${result.kd.toFixed(2)}, damage ratio ${result.dmgRatio.toFixed(1)}x — ${shareUrl}`,
  };
  return texts[lang];
};

export function useStatsCalculator(language: Language) {
  const [formValues, setFormValues] = useState<FormValues>({
    downed: "",
    kills: "",
    dmgDealt: "",
    dmgTaken: "",
    hours: "",
  });
  
  const [result, setResult] = useState<StatsResult | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const urlParams = parseUrlParams();
    const newValues: FormValues = {
      downed: urlParams.downed?.toString() || "",
      kills: urlParams.kills?.toString() || "",
      dmgDealt: urlParams.dmgDealt?.toString() || "",
      dmgTaken: urlParams.dmgTaken?.toString() || "",
      hours: urlParams.hours?.toString() || "",
    };
    
    if (Object.values(urlParams).some(v => v !== undefined)) {
      setFormValues(newValues);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const input: StatsInput = {
        downed: parseNum(formValues.downed),
        kills: parseNum(formValues.kills),
        dmgDealt: parseNum(formValues.dmgDealt),
        dmgTaken: parseNum(formValues.dmgTaken),
        hours: parseNum(formValues.hours),
      };
      
      const stats = calculateStats(input);
      setResult(stats);
      
      if (stats) {
        setShareUrl(generateShareUrl(input));
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [formValues]);

  const updateField = useCallback((field: keyof FormValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const fallbackCopy = (text: string): boolean => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  };

  const copyShareUrl = useCallback(async () => {
    if (!result || !shareUrl) return false;
    
    const text = getCopyText(language, result, shareUrl);
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        return fallbackCopy(text);
      }
    } catch {
      return fallbackCopy(text);
    }
  }, [result, shareUrl, language]);

  const copyUrl = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        return true;
      } else {
        return fallbackCopy(shareUrl);
      }
    } catch {
      return fallbackCopy(shareUrl);
    }
  }, [shareUrl]);

  return {
    formValues,
    updateField,
    result,
    shareUrl,
    copyShareUrl,
    copyUrl,
  };
}

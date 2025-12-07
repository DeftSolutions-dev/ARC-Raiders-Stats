import { FC, useState } from "react";
import { StatsResult, formatNum, formatDecimal } from "@/lib/statsCalculator";
import { Share2, Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useLanguage, Language } from "@/hooks/useLanguage";

interface InputValues {
  downed: string;
  kills: string;
  dmgDealt: string;
  dmgTaken: string;
  hours: string;
}

interface ShareSectionProps {
  result: StatsResult;
  shareUrl: string;
  inputValues: InputValues;
  onCopyUrl: () => Promise<boolean>;
  onCopyText: () => Promise<boolean>;
}

interface ImageLabels {
  title: string;
  perHour: string;
  perRaid: string;
  kills: string;
  dmgDealt: string;
  dmgTaken: string;
  deathsEst: string;
  footer: string;
  dmgRatio: string;
  dmgPerKill: string;
  estDeaths: string;
  kd: string;
  inputData: string;
  downed: string;
  hours: string;
}

const getImageLabels = (lang: Language): ImageLabels => {
  const labels: Record<Language, ImageLabels> = {
    ru: {
      title: "ARC RAIDERS СТАТИСТИКА",
      perHour: "НА ЧАС",
      perRaid: "НА РЕЙД (25 МИН)",
      kills: "Убийства",
      dmgDealt: "Урон нанесён",
      dmgTaken: "Урон получен",
      deathsEst: "Смерти (оценка)",
      footer: "Создано с ARC Raiders Stats Calculator",
      dmgRatio: "УРОН СООТН.",
      dmgPerKill: "УРОН/УБИЙСТВО",
      estDeaths: "ОЦЕНКА СМЕРТЕЙ",
      kd: "K/D",
      inputData: "ВВЕДЁННЫЕ ДАННЫЕ",
      downed: "Нокауты",
      hours: "Часы",
    },
    uk: {
      title: "ARC RAIDERS СТАТИСТИКА",
      perHour: "НА ГОДИНУ",
      perRaid: "НА РЕЙД (25 ХВ)",
      kills: "Вбивства",
      dmgDealt: "Урон завдано",
      dmgTaken: "Урон отримано",
      deathsEst: "Смерті (оцінка)",
      footer: "Створено з ARC Raiders Stats Calculator",
      dmgRatio: "УРОН СПІВВІДН.",
      dmgPerKill: "УРОН/ВБИВСТВО",
      estDeaths: "ОЦІНКА СМЕРТЕЙ",
      kd: "K/D",
      inputData: "ВВЕДЕНІ ДАНІ",
      downed: "Нокаути",
      hours: "Години",
    },
    en: {
      title: "ARC RAIDERS STATS",
      perHour: "PER HOUR",
      perRaid: "PER RAID (25 MIN)",
      kills: "Kills",
      dmgDealt: "Damage Dealt",
      dmgTaken: "Damage Taken",
      deathsEst: "Deaths (est.)",
      footer: "Generated with ARC Raiders Stats Calculator",
      dmgRatio: "DMG RATIO",
      dmgPerKill: "DMG/KILL",
      estDeaths: "EST. DEATHS",
      kd: "K/D",
      inputData: "INPUT DATA",
      downed: "Downed",
      hours: "Hours",
    },
  };
  return labels[lang];
};

const generateStatsImage = (result: StatsResult, lang: Language, inputValues: InputValues): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const labels = getImageLabels(lang);
    
    canvas.width = 1200;
    canvas.height = 620;
    
    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(0, 0, 1200, 620);
    
    ctx.strokeStyle = "rgba(0, 255, 65, 0.02)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 1200; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 620);
      ctx.stroke();
    }
    for (let i = 0; i < 620; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1200, i);
      ctx.stroke();
    }
    
    const titleText = labels.title;
    ctx.font = "bold 44px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    for (let i = 6; i > 0; i--) {
      ctx.fillStyle = `rgba(0, 40, 15, ${0.3 - i * 0.04})`;
      ctx.fillText(titleText, 600 + i * 1.5, 42 + i * 1.5);
    }
    
    ctx.shadowColor = "#00ff41";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#00ff41";
    ctx.fillText(titleText, 600, 42);
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(150, 255, 180, 0.15)";
    ctx.fillText(titleText, 600 - 1, 42 - 1);
    
    ctx.strokeStyle = "#00ff41";
    ctx.lineWidth = 0.5;
    ctx.strokeText(titleText, 600, 42);
    
    ctx.textBaseline = "alphabetic";
    
    const inputDataText = `${labels.downed}: ${inputValues.downed || "0"}  •  ${labels.kills}: ${inputValues.kills || "0"}  •  ${labels.dmgDealt}: ${inputValues.dmgDealt || "0"}  •  ${labels.dmgTaken}: ${inputValues.dmgTaken || "0"}  •  ${labels.hours}: ${inputValues.hours || "0"}`;
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#555555";
    ctx.textAlign = "center";
    ctx.fillText(inputDataText, 600, 78);
    
    const drawIcon = (ctx: CanvasRenderingContext2D, type: string, x: number, y: number, color: string, size: number = 16) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      const s = size / 24;
      ctx.translate(x - size/2, y - size/2);
      ctx.scale(s, s);
      
      switch (type) {
        case "trending-up":
          ctx.beginPath();
          ctx.moveTo(22, 7);
          ctx.lineTo(13.5, 15.5);
          ctx.lineTo(8.5, 10.5);
          ctx.lineTo(2, 17);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(16, 7);
          ctx.lineTo(22, 7);
          ctx.lineTo(22, 13);
          ctx.stroke();
          break;
        case "target":
          ctx.beginPath();
          ctx.arc(12, 12, 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(12, 12, 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(12, 12, 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case "skull":
          ctx.beginPath();
          ctx.arc(12, 10, 7, Math.PI, 0);
          ctx.quadraticCurveTo(19, 17, 17, 19);
          ctx.lineTo(15, 22);
          ctx.lineTo(12, 19);
          ctx.lineTo(9, 22);
          ctx.lineTo(7, 19);
          ctx.quadraticCurveTo(5, 17, 5, 10);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(9, 10, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(15, 10, 1.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "swords":
          ctx.beginPath();
          ctx.moveTo(14.5, 17.5);
          ctx.lineTo(3, 6);
          ctx.lineTo(3, 2);
          ctx.lineTo(7, 2);
          ctx.lineTo(18.5, 13.5);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(13, 19);
          ctx.lineTo(19, 13);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(16, 16);
          ctx.lineTo(20, 20);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(14.5, 6.5);
          ctx.lineTo(18, 3);
          ctx.lineTo(22, 3);
          ctx.lineTo(22, 7);
          ctx.lineTo(18.5, 10.5);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(5, 14);
          ctx.lineTo(9, 18);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(7, 17);
          ctx.lineTo(4, 20);
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    const cardWidth = 270;
    const cardHeight = 85;
    const cardY = 90;
    const cardGap = 16;
    const startX = (1200 - (cardWidth * 4 + cardGap * 3)) / 2;

    const metrics = [
      { label: labels.dmgRatio, value: formatDecimal(result.dmgRatio, 1), suffix: "x", color: "#00ff41", icon: "trending-up" },
      { label: labels.dmgPerKill, value: formatNum(result.avgDmgPerKill), suffix: "", color: "#9d4edd", icon: "target" },
      { label: labels.estDeaths, value: result.estimatedDeaths.toString(), suffix: "", color: "#9d4edd", icon: "skull" },
      { label: labels.kd, value: formatDecimal(result.kd, 2), suffix: "", color: "#00ff41", icon: "swords" },
    ];
    
    metrics.forEach((metric, i) => {
      const x = startX + i * (cardWidth + cardGap);
      
      ctx.fillStyle = "#161616";
      ctx.beginPath();
      ctx.roundRect(x, cardY, cardWidth, cardHeight, 4);
      ctx.fill();
      
      ctx.strokeStyle = "#252525";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, cardY, cardWidth, cardHeight, 4);
      ctx.stroke();
      
      const iconX = x + cardWidth - 30;
      const iconY = cardY + 28;
      ctx.fillStyle = metric.color === "#00ff41" ? "rgba(0, 255, 65, 0.1)" : "rgba(157, 78, 221, 0.1)";
      ctx.beginPath();
      ctx.roundRect(iconX - 14, iconY - 14, 28, 28, 4);
      ctx.fill();
      
      drawIcon(ctx, metric.icon, iconX, iconY, metric.color, 16);
      
      ctx.font = "11px 'Inter', sans-serif";
      ctx.fillStyle = "#666666";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(metric.label, x + 16, cardY + 24);
      
      ctx.font = "bold 32px 'JetBrains Mono', monospace";
      ctx.fillStyle = metric.color;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(metric.value + metric.suffix, x + 16, cardY + 58);
      ctx.textBaseline = "alphabetic";
    });
    
    const tableY = 195;
    const leftTableX = 60;
    const rightTableX = 620;
    const tableWidth = 520;
    const rowHeight = 32;
    
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillStyle = "#666666";
    ctx.textAlign = "left";
    ctx.fillText(labels.perHour.toUpperCase(), leftTableX + 20, tableY);
    
    const perHourTableHeight = 5 * rowHeight + 35;
    ctx.fillStyle = "#161616";
    ctx.beginPath();
    ctx.roundRect(leftTableX, tableY + 10, tableWidth, perHourTableHeight, 4);
    ctx.fill();
    ctx.strokeStyle = "#252525";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(leftTableX, tableY + 10, tableWidth, perHourTableHeight, 4);
    ctx.stroke();
    
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.roundRect(leftTableX, tableY + 10, tableWidth, 30, [4, 4, 0, 0]);
    ctx.fill();
    
    ctx.font = "11px 'Inter', sans-serif";
    ctx.fillStyle = "#555555";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("METRIC", leftTableX + 16, tableY + 25);
    ctx.textAlign = "right";
    ctx.fillText("VALUE", leftTableX + tableWidth - 16, tableY + 25);
    ctx.textBaseline = "alphabetic";
    
    const perHourData = [
      { label: labels.downed, value: formatDecimal(result.perHour.downed, 1), color: "#00ff41" },
      { label: labels.kills, value: formatDecimal(result.perHour.kills, 1), color: "#00ff41" },
      { label: labels.dmgDealt, value: formatNum(result.perHour.dmgDealt), color: "#00ff41" },
      { label: labels.dmgTaken, value: formatNum(result.perHour.dmgTaken), color: "#9d4edd" },
      { label: labels.deathsEst, value: formatDecimal(result.perHour.estimatedDeaths, 2), color: "#9d4edd" },
    ];
    
    perHourData.forEach((row, i) => {
      const y = tableY + 56 + i * rowHeight;
      
      if (i > 0) {
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftTableX + 10, y - rowHeight/2 - 4);
        ctx.lineTo(leftTableX + tableWidth - 10, y - rowHeight/2 - 4);
        ctx.stroke();
      }
      
      ctx.textBaseline = "middle";
      ctx.font = "13px 'Inter', sans-serif";
      ctx.fillStyle = "#777777";
      ctx.textAlign = "left";
      ctx.fillText(row.label, leftTableX + 16, y);
      
      ctx.font = "bold 14px 'JetBrains Mono', monospace";
      ctx.fillStyle = row.color;
      ctx.textAlign = "right";
      ctx.fillText(row.value, leftTableX + tableWidth - 16, y);
      ctx.textBaseline = "alphabetic";
    });
    
    ctx.font = "bold 12px 'Inter', sans-serif";
    ctx.fillStyle = "#666666";
    ctx.textAlign = "left";
    ctx.fillText(labels.perRaid.toUpperCase(), rightTableX + 20, tableY);
    
    const perRaidTableHeight = 4 * rowHeight + 35;
    ctx.fillStyle = "#161616";
    ctx.beginPath();
    ctx.roundRect(rightTableX, tableY + 10, tableWidth, perRaidTableHeight, 4);
    ctx.fill();
    ctx.strokeStyle = "#252525";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rightTableX, tableY + 10, tableWidth, perRaidTableHeight, 4);
    ctx.stroke();
    
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.roundRect(rightTableX, tableY + 10, tableWidth, 30, [4, 4, 0, 0]);
    ctx.fill();
    
    ctx.font = "11px 'Inter', sans-serif";
    ctx.fillStyle = "#555555";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText("METRIC", rightTableX + 16, tableY + 25);
    ctx.textAlign = "right";
    ctx.fillText("20m", rightTableX + 300, tableY + 25);
    ctx.fillText("25m", rightTableX + 400, tableY + 25);
    ctx.fillText("30m", rightTableX + tableWidth - 16, tableY + 25);
    ctx.textBaseline = "alphabetic";
    
    const perRaidData = [
      { label: labels.downed, values: [result.perRaid["20"].downed, result.perRaid["25"].downed, result.perRaid["30"].downed], color: "#00ff41" },
      { label: labels.kills, values: [result.perRaid["20"].kills, result.perRaid["25"].kills, result.perRaid["30"].kills], color: "#00ff41" },
      { label: labels.dmgDealt, values: [result.perRaid["20"].dmgDealt, result.perRaid["25"].dmgDealt, result.perRaid["30"].dmgDealt], color: "#00ff41", isLarge: true },
      { label: labels.dmgTaken, values: [result.perRaid["20"].dmgTaken, result.perRaid["25"].dmgTaken, result.perRaid["30"].dmgTaken], color: "#9d4edd", isLarge: true },
    ];
    
    perRaidData.forEach((row, i) => {
      const y = tableY + 56 + i * rowHeight;
      
      if (i > 0) {
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rightTableX + 10, y - rowHeight/2 - 4);
        ctx.lineTo(rightTableX + tableWidth - 10, y - rowHeight/2 - 4);
        ctx.stroke();
      }
      
      ctx.textBaseline = "middle";
      ctx.font = "13px 'Inter', sans-serif";
      ctx.fillStyle = "#777777";
      ctx.textAlign = "left";
      ctx.fillText(row.label, rightTableX + 16, y);
      
      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      ctx.fillStyle = row.color;
      ctx.textAlign = "right";
      
      if (row.isLarge) {
        ctx.fillText(formatNum(row.values[0]), rightTableX + 300, y);
        ctx.fillText(formatNum(row.values[1]), rightTableX + 400, y);
        ctx.fillText(formatNum(row.values[2]), rightTableX + tableWidth - 16, y);
      } else {
        ctx.fillText(formatDecimal(row.values[0], 1), rightTableX + 300, y);
        ctx.fillText(formatDecimal(row.values[1], 1), rightTableX + 400, y);
        ctx.fillText(formatDecimal(row.values[2], 1), rightTableX + tableWidth - 16, y);
      }
      ctx.textBaseline = "alphabetic";
    });
    
    const footerY = 580;
    
    const lineGradient = ctx.createLinearGradient(400, footerY, 800, footerY);
    lineGradient.addColorStop(0, "transparent");
    lineGradient.addColorStop(0.2, "#00ff41");
    lineGradient.addColorStop(0.8, "#00ff41");
    lineGradient.addColorStop(1, "transparent");
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(400, footerY - 15);
    ctx.lineTo(800, footerY - 15);
    ctx.stroke();
    
    ctx.shadowColor = "#00ff41";
    ctx.shadowBlur = 15;
    ctx.font = "bold 18px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00ff41";
    ctx.textAlign = "center";
    ctx.fillText("raiders-stats.com", 600, footerY + 5);
    ctx.shadowBlur = 0;
    
    resolve(canvas.toDataURL("image/png"));
  });
};

const t = { value: "VALUE" };

export const ShareSection: FC<ShareSectionProps> = ({ result, shareUrl, inputValues, onCopyUrl, onCopyText }) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState<"url" | "text" | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleCopyImage = async () => {
    setActiveBtn("url");
    try {
      const dataUrl = await generateStatsImage(result, language, inputValues);
      const blob = dataURLtoBlob(dataUrl);
      
      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          setCopied("url");
          toast.success(t.copied);
          setTimeout(() => setCopied(null), 2000);
          setTimeout(() => setActiveBtn(null), 150);
          return;
        } catch (clipErr) {
          console.log("Clipboard API failed, trying fallback", clipErr);
        }
      }
      
      const img = document.createElement("img");
      img.src = dataUrl;
      
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.appendChild(img);
      document.body.appendChild(container);
      
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNode(img);
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      const success = document.execCommand("copy");
      selection?.removeAllRanges();
      document.body.removeChild(container);
      
      if (success) {
        setCopied("url");
        toast.success(t.copied);
        setTimeout(() => setCopied(null), 2000);
      } else {
        const link = document.createElement("a");
        link.download = "arc-raiders-stats.png";
        link.href = dataUrl;
        link.click();
        toast.success("Image downloaded (copy not supported)");
      }
    } catch (err) {
      console.error("Failed to copy image:", err);
      toast.error("Error copying image");
    }
    setTimeout(() => setActiveBtn(null), 150);
  };

  const handleCopyText = async () => {
    setActiveBtn("text");
    const success = await onCopyText();
    if (success) {
      setCopied("text");
      toast.success(t.copied);
      setTimeout(() => setCopied(null), 2000);
    }
    setTimeout(() => setActiveBtn(null), 150);
  };

  const handleDownloadImage = async () => {
    setActiveBtn("download");
    setDownloading(true);
    try {
      const dataUrl = await generateStatsImage(result, language, inputValues);
      const link = document.createElement("a");
      link.download = "arc-raiders-stats.png";
      link.href = dataUrl;
      link.click();
      toast.success("PNG saved!");
    } catch (error) {
      console.error("Failed to generate image:", error);
      toast.error("Error generating image");
    } finally {
      setDownloading(false);
      setTimeout(() => setActiveBtn(null), 150);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <button 
          onClick={handleDownloadImage} 
          className={`cyber-btn cyber-btn-sm cyber-btn-secondary w-full sm:w-auto ${activeBtn === "download" ? "cyber-btn-active" : ""}`}
          disabled={downloading}
        >
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>{downloading ? "..." : t.downloadImage}</span>
        </button>
        <button 
          onClick={handleCopyImage} 
          className={`cyber-btn cyber-btn-sm cyber-btn-outline w-full sm:w-auto ${activeBtn === "url" ? "cyber-btn-active" : ""} ${copied === "url" ? "cyber-btn-success" : ""}`}
        >
          {copied === "url" ? <Check className="w-4 h-4 flex-shrink-0" /> : <Copy className="w-4 h-4 flex-shrink-0" />}
          <span>{copied === "url" ? t.copied : t.copyImage}</span>
        </button>
        <button 
          onClick={handleCopyText} 
          className={`cyber-btn cyber-btn-sm cyber-btn-outline w-full sm:w-auto ${activeBtn === "text" ? "cyber-btn-active" : ""} ${copied === "text" ? "cyber-btn-success" : ""}`}
        >
          {copied === "text" ? <Check className="w-4 h-4 flex-shrink-0" /> : <Copy className="w-4 h-4 flex-shrink-0" />}
          <span>{copied === "text" ? t.copied : t.copyText}</span>
        </button>
      </div>

      <div className="text-xs text-muted-foreground break-all p-3 bg-muted/30 border border-border font-mono overflow-x-auto">
        {shareUrl}
      </div>
    </div>
  );
};

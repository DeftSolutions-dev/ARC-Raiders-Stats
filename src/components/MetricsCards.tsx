import { FC } from "react";
import { StatsResult, formatNum, formatDecimal } from "@/lib/statsCalculator";
import { useLanguage } from "@/hooks/useLanguage";
import { TrendingUp, Target, Skull, Swords } from "lucide-react";

interface MetricsCardsProps {
  result: StatsResult;
}

interface MetricCardProps {
  label: string;
  value: string;
  suffix?: string;
  variant?: "primary" | "secondary";
  delay?: number;
  icon: React.ReactNode;
}

const MetricCard: FC<MetricCardProps> = ({ label, value, suffix = "", variant = "primary", delay = 0, icon }) => (
  <div 
    className="stat-card animate-fade-in group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between mb-3">
      <p className="metric-label">{label}</p>
      <div className={`p-2 rounded-sm ${variant === "secondary" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"} transition-colors group-hover:bg-opacity-20`}>
        {icon}
      </div>
    </div>
    <p className={`metric-value ${variant === "secondary" ? "text-secondary" : ""}`}>
      {value}
      {suffix && <span className="text-xl ml-0.5 opacity-70">{suffix}</span>}
    </p>
  </div>
);

export const MetricsCards: FC<MetricsCardsProps> = ({ result }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label={t.dmgRatio}
        value={formatDecimal(result.dmgRatio, 1)}
        suffix="x"
        delay={0}
        icon={<TrendingUp className="w-4 h-4" />}
      />
      <MetricCard
        label={t.dmgPerKill}
        value={formatNum(result.avgDmgPerKill)}
        variant="secondary"
        delay={50}
        icon={<Target className="w-4 h-4" />}
      />
      <MetricCard
        label={t.estimatedDeaths}
        value={result.estimatedDeaths.toString()}
        variant="secondary"
        delay={100}
        icon={<Skull className="w-4 h-4" />}
      />
      <MetricCard
        label={t.kd}
        value={formatDecimal(result.kd, 2)}
        delay={150}
        icon={<Swords className="w-4 h-4" />}
      />
    </div>
  );
};

import { FC } from "react";
import { StatsResult, formatNum, formatDecimal } from "@/lib/statsCalculator";
import { useLanguage } from "@/hooks/useLanguage";
import { Clock, Target } from "lucide-react";

interface StatsTablesProps {
  result: StatsResult;
}

export const StatsTables: FC<StatsTablesProps> = ({ result }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t.statsPerHour}
          </h3>
        </div>
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.metric}</th>
                <th className="text-right">{t.value}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted-foreground">{t.downed}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perHour.downed, 1)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.kills}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perHour.kills, 1)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.dmgDealt}</td>
                <td className="text-right text-primary font-mono font-medium">{formatNum(result.perHour.dmgDealt)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.dmgTaken}</td>
                <td className="text-right text-secondary font-mono font-medium">{formatNum(result.perHour.dmgTaken)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.deathsEstimate}</td>
                <td className="text-right text-secondary font-mono font-medium">{formatDecimal(result.perHour.estimatedDeaths, 2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-secondary" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {t.statsPerRaid}
          </h3>
        </div>
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.metric}</th>
                <th className="text-right">{t.min20}</th>
                <th className="text-right">{t.min25}</th>
                <th className="text-right">{t.min30}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted-foreground">{t.downed}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perRaid["20"].downed, 1)}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perRaid["25"].downed, 1)}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perRaid["30"].downed, 1)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.kills}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perRaid["20"].kills, 1)}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perRaid["25"].kills, 1)}</td>
                <td className="text-right text-primary font-mono font-medium">{formatDecimal(result.perRaid["30"].kills, 1)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.dmgDealt}</td>
                <td className="text-right text-primary font-mono font-medium">{formatNum(result.perRaid["20"].dmgDealt)}</td>
                <td className="text-right text-primary font-mono font-medium">{formatNum(result.perRaid["25"].dmgDealt)}</td>
                <td className="text-right text-primary font-mono font-medium">{formatNum(result.perRaid["30"].dmgDealt)}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground">{t.dmgTaken}</td>
                <td className="text-right text-secondary font-mono font-medium">{formatNum(result.perRaid["20"].dmgTaken)}</td>
                <td className="text-right text-secondary font-mono font-medium">{formatNum(result.perRaid["25"].dmgTaken)}</td>
                <td className="text-right text-secondary font-mono font-medium">{formatNum(result.perRaid["30"].dmgTaken)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

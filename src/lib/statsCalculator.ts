export interface StatsInput {
  downed: number;
  kills: number;
  dmgDealt: number;
  dmgTaken: number;
  hours: number;
}

export interface StatsResult {
  dmgRatio: number;
  avgDmgPerKill: number;
  estimatedDeaths: number;
  kd: number;
  perHour: {
    downed: number;
    kills: number;
    dmgDealt: number;
    dmgTaken: number;
    estimatedDeaths: number;
  };
  perRaid: {
    "20": { downed: number; kills: number; dmgDealt: number; dmgTaken: number };
    "25": { downed: number; kills: number; dmgDealt: number; dmgTaken: number };
    "30": { downed: number; kills: number; dmgDealt: number; dmgTaken: number };
  };
}

export function parseNum(value: string): number {
  if (!value || value.trim() === "") return 0;
  
  const cleaned = value.toLowerCase().trim().replace(/,/g, "");
  
  const multipliers: Record<string, number> = {
    k: 1000,
    m: 1000000,
  };
  
  const match = cleaned.match(/^([\d.]+)([km])?$/);
  if (!match) return parseFloat(cleaned) || 0;
  
  const num = parseFloat(match[1]);
  const suffix = match[2];
  
  if (isNaN(num)) return 0;
  
  return suffix ? num * multipliers[suffix] : num;
}

export function formatNum(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return Math.round(num).toString();
}

export function formatDecimal(num: number, decimals: number = 2): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  return num.toFixed(decimals);
}

export function calculateStats(input: StatsInput): StatsResult | null {
  const { downed, kills, dmgDealt, dmgTaken, hours } = input;
  
  if (kills <= 0 || hours <= 0) return null;
  
  const dmgRatio = dmgTaken > 0 ? dmgDealt / dmgTaken : 0;
  const avgDmgPerKill = kills > 0 ? dmgDealt / kills : 0;
  const estimatedDeaths = avgDmgPerKill > 0 ? Math.round(dmgTaken / avgDmgPerKill) : 0;
  const kd = estimatedDeaths > 0 ? kills / estimatedDeaths : kills;
  
  const perHour = {
    downed: downed / hours,
    kills: kills / hours,
    dmgDealt: dmgDealt / hours,
    dmgTaken: dmgTaken / hours,
    estimatedDeaths: estimatedDeaths / hours,
  };
  
  const totalMinutes = hours * 60;
  
  const calculatePerRaid = (duration: number) => {
    const raids = totalMinutes / duration;
    return {
      downed: downed / raids,
      kills: kills / raids,
      dmgDealt: dmgDealt / raids,
      dmgTaken: dmgTaken / raids,
    };
  };
  
  return {
    dmgRatio,
    avgDmgPerKill,
    estimatedDeaths,
    kd,
    perHour,
    perRaid: {
      "20": calculatePerRaid(20),
      "25": calculatePerRaid(25),
      "30": calculatePerRaid(30),
    },
  };
}

export function generateShareUrl(input: StatsInput): string {
  const params = new URLSearchParams();
  if (input.downed) params.set("downed", input.downed.toString());
  if (input.kills) params.set("kills", input.kills.toString());
  if (input.dmgDealt) params.set("dmgDealt", input.dmgDealt.toString());
  if (input.dmgTaken) params.set("dmgTaken", input.dmgTaken.toString());
  if (input.hours) params.set("hours", input.hours.toString());
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseUrlParams(): Partial<StatsInput> {
  const params = new URLSearchParams(window.location.search);
  return {
    downed: parseFloat(params.get("downed") || "") || undefined,
    kills: parseFloat(params.get("kills") || "") || undefined,
    dmgDealt: parseFloat(params.get("dmgDealt") || "") || undefined,
    dmgTaken: parseFloat(params.get("dmgTaken") || "") || undefined,
    hours: parseFloat(params.get("hours") || "") || undefined,
  };
}

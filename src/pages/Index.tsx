import { StatsForm } from "@/components/StatsForm";
import { MetricsCards } from "@/components/MetricsCards";
import { StatsTables } from "@/components/StatsTables";
import { ShareSection } from "@/components/ShareSection";
import { FAQSection } from "@/components/FAQSection";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useStatsCalculator } from "@/hooks/useStatsCalculator";
import { useLanguage } from "@/hooks/useLanguage";
import { Crosshair, Calculator } from "lucide-react";

const Index = () => {
  const { t, language } = useLanguage();
  const { formValues, updateField, result, shareUrl, copyShareUrl, copyUrl } = useStatsCalculator(language);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="rain-bg" aria-hidden="true" />
      
      <div className="relative z-10 overflow-x-hidden">
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container max-w-5xl flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-primary" />
              <span className="hero-title-sm font-bold text-sm tracking-wide hidden sm:block">
                <span className="hero-title-text-sm">ARC RAIDERS</span>
              </span>
            </div>
            <LanguageSelector />
          </div>
        </header>

        <main className="container max-w-5xl py-8 px-4 space-y-8">
          <section className="text-center space-y-6 py-8">
            <div className="space-y-4 animate-fade-in">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="hero-title-text">ARC RAIDERS</span>
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <Crosshair className="w-4 h-4 text-primary" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "200ms" }}>
              {t.subtitle}
            </p>
          </section>

          <section className="stat-card animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-primary rounded-full" />
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {t.enterStats}
              </h2>
            </div>
            <StatsForm values={formValues} onChange={updateField} />
          </section>

          {result ? (
            <div className="space-y-6">
              <div className="section-divider" />

              <section>
                <MetricsCards result={result} />
              </section>

              <section className="stat-card animate-fade-in" style={{ animationDelay: "200ms" }}>
                <StatsTables result={result} />
              </section>

              <section className="stat-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-secondary rounded-full" />
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {t.shareResults}
                  </h3>
                </div>
                <ShareSection
                  result={result}
                  shareUrl={shareUrl}
                  inputValues={formValues}
                  onCopyUrl={copyUrl}
                  onCopyText={copyShareUrl}
                />
              </section>
            </div>
          ) : (
            <div className="stat-card text-center py-16 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-muted/50 rounded-full mb-4">
                <Calculator className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {t.enterData}
              </p>
            </div>
          )}

          <div className="section-divider" />

          <FAQSection />

          <footer className="text-center py-6 space-y-4">
            <p className="text-xs text-muted-foreground">{t.footer}</p>
            <div className="flex justify-center">
              <a 
                href="https://www.buymeacoffee.com/alioshin20g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cyber-btn"
                style={{ 
                  '--hover-btn-color': '#000000',
                  '--btn-default-bg': '#FFDD00',
                  '--btn-hover-bg': '#FFDD00',
                  '--default-btn-color': '#000000'
                } as React.CSSProperties}
              >
                <span>☕ Buy me a coffee</span>
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;

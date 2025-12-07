import { FC, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage, Language } from "@/hooks/useLanguage";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<Language, FAQItem[]> = {
  ru: [
    {
      question: "Где найти статистику в ARC Raiders?",
      answer: "Зайдите в главное меню игры → слева вверху выберите 3-й пункт 'Рейдер' → справа внизу нажмите на иконку книжки 'Кодекс' → слева вверху выберите 'Статистика Игрока' → в фильтре (по умолчанию 'Все') выберите 'Бой' → пролистайте вниз до конца, там снизу вверх расположены все нужные показатели."
    },
    {
      question: "Что означает 'Выведено из строя' (Downed)?",
      answer: "Это количество раз, когда вы сбили противника с ног (но не добили). Отличается от финальных нокаутов (kills), которые засчитываются только при полном устранении."
    },
    {
      question: "Как рассчитывается K/D?",
      answer: "K/D = Нокауты ÷ Оценка смертей. Оценка смертей вычисляется как: Урон получен ÷ Средний урон на нокаут. Это приблизительное значение, так как игра не показывает точное число смертей."
    },
    {
      question: "Что такое соотношение урона?",
      answer: "Соотношение урона = Урон нанесён ÷ Урон получен. Значение 5x означает, что вы наносите в 5 раз больше урона, чем получаете. Хороший показатель — от 2x и выше."
    },
    {
      question: "Как вводить большие числа?",
      answer: "Используйте сокращения: 500k = 500,000, 1.5m = 1,500,000. Калькулятор автоматически распознает эти форматы."
    },
    {
      question: "Что показывает 'Статистика на рейд'?",
      answer: "Это ваши средние показатели за один рейд. Рассчитывается для рейдов длительностью 20, 25 и 30 минут на основе общего времени игры."
    }
  ],
  uk: [
    {
      question: "Де знайти статистику в ARC Raiders?",
      answer: "Зайдіть в головне меню гри → зліва вгорі виберіть 3-й пункт 'Рейдер' → справа внизу натисніть на іконку книжки 'Кодекс' → зліва вгорі виберіть 'Статистика Гравця' → у фільтрі (за замовчуванням 'Все') виберіть 'Бій' → прогорніть вниз до кінця, там знизу вгору розташовані всі потрібні показники."
    },
    {
      question: "Що означає 'Виведено з ладу' (Downed)?",
      answer: "Це кількість разів, коли ви збили противника з ніг (але не добили). Відрізняється від фінальних нокаутів (kills), які зараховуються лише при повному усуненні."
    },
    {
      question: "Як розраховується K/D?",
      answer: "K/D = Нокаути ÷ Оцінка смертей. Оцінка смертей обчислюється як: Урон отримано ÷ Середній урон на нокаут. Це приблизне значення, оскільки гра не показує точне число смертей."
    },
    {
      question: "Що таке співвідношення урону?",
      answer: "Співвідношення урону = Урон завдано ÷ Урон отримано. Значення 5x означає, що ви завдаєте в 5 разів більше урону, ніж отримуєте. Гарний показник — від 2x і вище."
    },
    {
      question: "Як вводити великі числа?",
      answer: "Використовуйте скорочення: 500k = 500,000, 1.5m = 1,500,000. Калькулятор автоматично розпізнає ці формати."
    },
    {
      question: "Що показує 'Статистика на рейд'?",
      answer: "Це ваші середні показники за один рейд. Розраховується для рейдів тривалістю 20, 25 і 30 хвилин на основі загального часу гри."
    }
  ],
  en: [
    {
      question: "Where to find stats in ARC Raiders?",
      answer: "Go to the main game menu → top left select the 3rd option 'Raider' → bottom right click the book icon 'Codex' → top left select 'Player Statistics' → in the filter (default 'All') select 'Combat' → scroll down to the bottom, all needed stats are listed from bottom to top."
    },
    {
      question: "What does 'Downed' mean?",
      answer: "This is the number of times you knocked down an opponent (but didn't finish them). It differs from final kills, which are only counted when fully eliminating a player."
    },
    {
      question: "How is K/D calculated?",
      answer: "K/D = Kills ÷ Estimated Deaths. Estimated deaths are calculated as: Damage Taken ÷ Average Damage per Kill. This is an approximation since the game doesn't show exact death count."
    },
    {
      question: "What is damage ratio?",
      answer: "Damage Ratio = Damage Dealt ÷ Damage Taken. A value of 5x means you deal 5 times more damage than you receive. A good ratio is 2x or higher."
    },
    {
      question: "How to enter large numbers?",
      answer: "Use shortcuts: 500k = 500,000, 1.5m = 1,500,000. The calculator automatically recognizes these formats."
    },
    {
      question: "What does 'Stats per Raid' show?",
      answer: "These are your average stats per single raid. Calculated for raids lasting 20, 25, and 30 minutes based on your total playtime."
    }
  ]
};

const faqTitles: Record<Language, string> = {
  ru: "Часто задаваемые вопросы",
  uk: "Часті запитання",
  en: "Frequently Asked Questions"
};

interface FAQItemComponentProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItemComponent: FC<FAQItemComponentProps> = ({ item, isOpen, onToggle, index }) => (
  <div 
    className="border border-border bg-card/50 transition-all duration-300 hover:border-primary/30"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors"
    >
      <span className="text-sm font-medium text-foreground pr-4">{item.question}</span>
      <ChevronDown 
        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
          isOpen ? "rotate-180 text-primary" : ""
        }`} 
      />
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
        {item.answer}
      </p>
    </div>
  </div>
);

export const FAQSection: FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const items = faqData[language];
  const title = faqTitles[language];

  return (
    <section className="stat-card animate-fade-in" style={{ animationDelay: "500ms" }}>
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <FAQItemComponent
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};

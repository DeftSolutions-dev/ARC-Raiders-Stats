import { FC } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface FormValues {
  downed: string;
  kills: string;
  dmgDealt: string;
  dmgTaken: string;
  hours: string;
}

interface StatsFormProps {
  values: FormValues;
  onChange: (field: keyof FormValues, value: string) => void;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  allowKNotation?: boolean;
}

const sanitizeInput = (value: string, allowKNotation: boolean): string => {
  if (!allowKNotation) {
    return value.replace(/[^0-9.]/g, "");
  }
  return value.replace(/[^0-9kKмМmM.]/g, "");
};

const InputField: FC<InputFieldProps> = ({ label, value, onChange, placeholder, allowKNotation = true }) => {
  const handleChange = (inputValue: string) => {
    const sanitized = sanitizeInput(inputValue, allowKNotation);
    onChange(sanitized);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-muted-foreground uppercase tracking-wider block">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export const StatsForm: FC<StatsFormProps> = ({ values, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <InputField
        label={t.downed}
        value={values.downed}
        onChange={(v) => onChange("downed", v)}
        placeholder={`${t.placeholderExample}, 4000`}
      />
      <InputField
        label={t.kills}
        value={values.kills}
        onChange={(v) => onChange("kills", v)}
        placeholder={`${t.placeholderExample}, 3000`}
      />
      <InputField
        label={t.dmgDealt}
        value={values.dmgDealt}
        onChange={(v) => onChange("dmgDealt", v)}
        placeholder={`${t.placeholderExample}, 500k`}
      />
      <InputField
        label={t.dmgTaken}
        value={values.dmgTaken}
        onChange={(v) => onChange("dmgTaken", v)}
        placeholder={`${t.placeholderExample}, 100k`}
      />
      <InputField
        label={t.hours}
        value={values.hours}
        onChange={(v) => onChange("hours", v)}
        placeholder={`${t.placeholderExample}, 200`}
        allowKNotation={false}
      />
    </div>
  );
};

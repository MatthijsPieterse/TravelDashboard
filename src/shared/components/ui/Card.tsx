import type { LucideIcon } from "lucide-react";

interface CardProps {
  color: string;
  darkTheme?: boolean;
  icon?: LucideIcon;
  title?: string;
  value: string | number;
  unit?: string;
  subText?: string;
}

const Card = ({
  color,
  darkTheme = false,
  icon: Icon,
  title,
  value,
  unit,
  subText,
}: CardProps) => {
  const bgColor = darkTheme ? `bg-${color}-800` : `bg-${color}-50`;
  const borderColor = darkTheme ? `border-${color}-700` : `border-${color}-200`;
  const titleColor = darkTheme ? `text-${color}-50` : `text-${color}-900`;
  const textColor = darkTheme ? `text-${color}-400` : `text-${color}-600`;

  return (
    <div
      className={`p-4 border ${borderColor} ${bgColor} rounded-sm shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className={`w-5 h-5 ${textColor}`} />}
        <span className={`text-sm font-serif ${titleColor}`}>{title}</span>
      </div>
      <div className={`text-xl font-serif ${titleColor}`}>
        {value}{" "}
        {unit && <span className={`text-xs ${titleColor}`}>{unit}</span>}
      </div>
      {subText && <div className={`text-xs ${textColor} mt-1`}>{subText}</div>}
    </div>
  );
};

export default Card;

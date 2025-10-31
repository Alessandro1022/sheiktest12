import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
}

export function ServiceCard({ icon: Icon, title, items }: ServiceCardProps) {
  return (
    <div className="glass p-8 rounded-2xl hover:glass-strong transition-all">
      <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-background" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

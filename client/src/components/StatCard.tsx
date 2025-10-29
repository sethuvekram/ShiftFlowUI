import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export default function StatCard({ title, value, icon: Icon, subtitle, variant = "default", className }: StatCardProps) {
  const iconColors = {
    default: "text-primary",
    success: "text-green-600",
    warning: "text-amber-600",
    danger: "text-red-600",
  };

  return (
    <Card data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, "-")}`} className={className}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${iconColors[variant]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Type,
  FileText,
  ChevronDown,
  CheckSquare,
  Circle,
  Hash,
  Mail,
} from "lucide-react";

const iconMap = {
  text: Type,
  textarea: FileText,
  email: Mail,
  number: Hash,
  select: ChevronDown,
  radio: Circle,
  checkbox: CheckSquare,
};

interface ComponentItemProps {
  type: string;
  label: string;
  description?: string;
}

export function ComponentItem({
  type,
  label,
  description,
}: ComponentItemProps) {
  const Icon = iconMap[type as keyof typeof iconMap] || Type;

  return (
    <div className="p-3 bg-background border rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium">{label}</h4>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

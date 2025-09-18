// ComponentItem: Renders a visual preview of a form component (input, select, etc).
// Purpose: Used in drag overlays and previews to show what a component looks like before adding to the form.
// Why used: Provides a consistent UI for displaying component type, label, and description with an icon.
// What it does: Maps type to icon, displays label and description, and styles the preview card.

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

// Maps component type to corresponding icon
const iconMap = {
  text: Type,
  textarea: FileText,
  email: Mail,
  number: Hash,
  select: ChevronDown,
  radio: Circle,
  checkbox: CheckSquare,
};

// Props for ComponentItem: type, label, description
interface ComponentItemProps {
  type: string;
  label: string;
  description?: string;
}

// ComponentItem: Renders a card with icon, label, and description for a form component
export function ComponentItem({
  type,
  label,
  description,
}: ComponentItemProps) {
  // Select icon based on type, fallback to Type icon
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

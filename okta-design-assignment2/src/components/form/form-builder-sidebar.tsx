// FormBuilderSidebar: Sidebar panel for the form builder UI.
// Purpose: Lets users drag-and-drop form components onto the canvas and select a color theme for the form.
// Why used: Centralizes all available form components and design options in one place for easy access.
// What it does: Renders draggable components (inputs, selects, media), allows theme selection, and provides UI hints for building forms.

"use client";

import { useDraggable } from "@dnd-kit/core";
import {
  Type,
  FileText,
  ChevronDown,
  CheckSquare,
  Circle,
  Hash,
  Mail,
  MousePointer,
  Image,
  ImageIcon,
  Palette,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useFormStore } from "@/lib/store";

// List of available form component categories and their metadata (type, label, icon, description)
const componentCategories = [
  {
    title: "Input Fields",
    icon: Type,
    components: [
      {
        type: "text",
        label: "Text Input",
        icon: Type,
        description: "Single line text input",
      },
      {
        type: "textarea",
        label: "Text Area",
        icon: FileText,
        description: "Multi-line text input",
      },
      {
        type: "email",
        label: "Email",
        icon: Mail,
        description: "Email address input",
      },
      {
        type: "number",
        label: "Number",
        icon: Hash,
        description: "Numeric input field",
      },
    ],
  },
  {
    title: "Selection",
    icon: ChevronDown,
    components: [
      {
        type: "select",
        label: "Select",
        icon: ChevronDown,
        description: "Dropdown selection",
      },
      {
        type: "radio",
        label: "Radio Group",
        icon: Circle,
        description: "Single choice from options",
      },
      {
        type: "checkbox",
        label: "Checkbox",
        icon: CheckSquare,
        description: "Multiple selections",
      },
    ],
  },
  {
    title: "Media & Design",
    icon: Image,
    components: [
      {
        type: "logo",
        label: "Logo Upload",
        icon: ImageIcon,
        description: "Upload your company logo",
      },
      {
        type: "cover",
        label: "Cover Image",
        icon: Image,
        description: "Upload a cover/banner image",
      },
    ],
  },
];

// Props for a draggable component card in the sidebar
interface DraggableComponentProps {
  type: string;
  label: string;
  icon: any;
  description: string;
}

// DraggableComponent: Renders a draggable card for a form component in the sidebar.
// Uses dnd-kit to enable drag-and-drop, displays icon, label, and description.
function DraggableComponent({
  type,
  label,
  icon: Icon,
  description,
}: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `component-${type}`,
      data: { type, label, description },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md hover:bg-formkit-component-hover group ${
        isDragging ? "opacity-50 rotate-2" : ""
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {label}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        </div>
        <MousePointer className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Card>
  );
}

// FormBuilderSidebar: Renders the sidebar for the form builder.
// - Shows all available form components grouped by category
// - Allows users to drag components to the canvas
// - Lets users select a color theme for the form
export function FormBuilderSidebar() {
  const { formTheme, setFormTheme } = useFormStore();

  // Preset color themes for the form
  const colorPresets = [
    {
      name: "Blue",
      primary: "hsl(221.2, 83.2%, 53.3%)",
      background: "hsl(0, 0%, 100%)",
      text: "hsl(222.2, 84%, 4.9%)",
    },
    {
      name: "Green",
      primary: "hsl(142.1, 76.2%, 36.3%)",
      background: "hsl(0, 0%, 100%)",
      text: "hsl(222.2, 84%, 4.9%)",
    },
    {
      name: "Purple",
      primary: "hsl(262.1, 83.3%, 57.8%)",
      background: "hsl(0, 0%, 100%)",
      text: "hsl(222.2, 84%, 4.9%)",
    },
    {
      name: "Orange",
      primary: "hsl(24.6, 95%, 53.1%)",
      background: "hsl(0, 0%, 100%)",
      text: "hsl(222.2, 84%, 4.9%)",
    },
  ];

  return (
    // Sidebar layout with components, theme selector, and drag instructions
    <aside className="w-80 bg-formkit-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Components
          </h2>
          <p className="text-sm text-muted-foreground">
            Drag components to your form canvas
          </p>
        </div>

        {/* Color Theme Selector */}
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center space-x-2 mb-3">
            <Palette className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Form Theme</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() =>
                  setFormTheme({
                    primaryColor: preset.primary,
                    backgroundColor: preset.background,
                    textColor: preset.text,
                  })
                }
                className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  formTheme.primaryColor === preset.primary
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                style={{
                  backgroundColor: preset.background,
                  borderColor: preset.primary,
                }}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: preset.text }}
                  >
                    {preset.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Render all component categories and their draggable components */}
        <div className="space-y-6">
          {componentCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <div className="flex items-center space-x-2">
                <category.icon className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-2">
                {category.components.map((component) => (
                  <DraggableComponent
                    key={component.type}
                    type={component.type}
                    label={component.label}
                    icon={component.icon}
                    description={component.description}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Drag instructions for users */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-dashed">
          <div className="text-center">
            <MousePointer className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              Drag components from above to start building your form
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

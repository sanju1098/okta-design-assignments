"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormField, useFormStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2, Settings, Upload, Image } from "lucide-react";

interface SortableFormFieldProps {
  field: FormField;
}

export function SortableFormField({ field }: SortableFormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const { selectField, removeField, selectedFieldId } = useFormStore();
  const isSelected = selectedFieldId === field.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderFormField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            disabled
            className="pointer-events-none"
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            disabled
            className="pointer-events-none resize-none"
            rows={3}
          />
        );

      case "select":
        return (
          <Select>
            <SelectTrigger className="pointer-events-none">
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup className="pointer-events-none">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2 pointer-events-none">
            <Checkbox disabled />
            <Label>{field.placeholder || "Checkbox option"}</Label>
          </div>
        );

      case "logo":
      case "cover":
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center pointer-events-none">
            <div className="flex flex-col items-center space-y-2">
              {field.type === "logo" ? (
                <Image className="h-8 w-8 text-muted-foreground" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
              <div className="text-sm text-muted-foreground">
                {field.type === "logo"
                  ? "Upload your logo"
                  : "Upload cover image"}
              </div>
              <Button variant="outline" size="sm" disabled>
                Choose File
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-background border rounded-lg p-4 transition-all duration-200 ${
        isDragging ? "opacity-50 shadow-xl scale-105" : ""
      } ${
        isSelected
          ? "border-primary shadow-md ring-2 ring-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
      onClick={() => selectField(field.id)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Field Controls */}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            selectField(field.id);
          }}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <Settings className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            removeField(field.id);
          }}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Field Content */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
        {renderFormField()}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -inset-1 bg-primary/5 rounded-lg border-2 border-primary pointer-events-none" />
      )}
    </div>
  );
}

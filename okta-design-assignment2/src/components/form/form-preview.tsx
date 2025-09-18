// FormPreview: Renders a live preview of the form as it will appear to end users.
// Purpose: Allows users to see how their form will look and behave before publishing or sharing.
// Why used: Provides instant feedback and validation for the form builder, improving user experience and confidence.
// What it does: Displays all form fields, handles field rendering by type, applies theme, and includes a submit button.

"use client";

import { useFormStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";

export function FormPreview() {
  // Get form fields, metadata, theme, and preview toggle from store
  const { fields, formTitle, formDescription, togglePreviewMode, formTheme } =
    useFormStore();

  // Renders a single field based on its type
  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            required={field.required}
            rows={3}
          />
        );

      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup>
            {field.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                <Label htmlFor={`${field.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox required={field.required} />
            <Label>{field.placeholder || "Checkbox option"}</Label>
          </div>
        );

      case "logo":
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Logo Preview</div>
            </div>
          </div>
        );

      case "cover":
        return (
          <div className="w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
            <div className="text-sm text-muted-foreground">
              Cover Image Preview
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    // Main preview layout with theme and form rendering
    <div
      className="min-h-screen"
      style={{ backgroundColor: formTheme.backgroundColor }}
    >
      {/* Header: back button and preview label */}
      <div className="bg-background border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={togglePreviewMode}
              className="hover:bg-muted"
              style={{
                borderColor: formTheme.primaryColor,
                color: formTheme.primaryColor,
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <div className="text-sm text-muted-foreground">Form Preview</div>
          </div>
        </div>
      </div>

      {/* Form: shows all fields and submit button */}
      <div className="max-w-2xl mx-auto p-8">
        <Card
          className="shadow-lg"
          style={{ backgroundColor: formTheme.backgroundColor }}
        >
          <CardHeader className="text-center pb-6">
            <CardTitle
              className="text-2xl font-bold"
              style={{ color: formTheme.textColor }}
            >
              {formTitle}
            </CardTitle>
            {formDescription && (
              <p
                className="mt-2"
                style={{ color: formTheme.textColor, opacity: 0.7 }}
              >
                {formDescription}
              </p>
            )}
          </CardHeader>

          <CardContent>
            {fields.length === 0 ? (
              // Empty state: prompt user to add fields
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No fields added yet. Go back to the editor to add some fields.
                </p>
              </div>
            ) : (
              <form className="space-y-6">
                {fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    {field.type !== "logo" && field.type !== "cover" && (
                      <Label
                        className="text-sm font-medium"
                        style={{ color: formTheme.textColor }}
                      >
                        {field.label}
                        {field.required && (
                          <span className="ml-1" style={{ color: "#ef4444" }}>
                            *
                          </span>
                        )}
                      </Label>
                    )}
                    {renderField(field)}
                  </div>
                ))}

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full hover:shadow-lg transition-all duration-200"
                    style={{
                      backgroundColor: formTheme.primaryColor,
                      color: formTheme.backgroundColor,
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Form
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

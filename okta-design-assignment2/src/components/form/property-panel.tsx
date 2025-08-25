"use client";

import { useFormStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Settings } from "lucide-react";
import { useState } from "react";

export function PropertyPanel() {
  const { fields, selectedFieldId, updateField } = useFormStore();
  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const [newOption, setNewOption] = useState("");

  if (!selectedField) {
    return (
      <aside className="w-80 bg-background border-l border-border p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No field selected
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a field from the canvas to edit its properties
          </p>
        </div>
      </aside>
    );
  }

  const handleAddOption = () => {
    if (!newOption.trim()) return;

    const currentOptions = selectedField.options || [];
    updateField(selectedField.id, {
      options: [...currentOptions, newOption.trim()],
    });
    setNewOption("");
  };

  const handleRemoveOption = (index: number) => {
    const currentOptions = selectedField.options || [];
    updateField(selectedField.id, {
      options: currentOptions.filter((_, i) => i !== index),
    });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const currentOptions = selectedField.options || [];
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    updateField(selectedField.id, { options: newOptions });
  };

  return (
    <aside className="w-80 border-l border-border overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Field Properties
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize the selected field
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Properties */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Basic Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="field-label" className="text-xs font-medium">
                  Field Label
                </Label>
                <Input
                  id="field-label"
                  value={selectedField.label}
                  onChange={(e) =>
                    updateField(selectedField.id, { label: e.target.value })
                  }
                  placeholder="Enter field label"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="field-placeholder"
                  className="text-xs font-medium"
                >
                  Placeholder Text
                </Label>
                <Input
                  id="field-placeholder"
                  value={selectedField.placeholder || ""}
                  onChange={(e) =>
                    updateField(selectedField.id, {
                      placeholder: e.target.value,
                    })
                  }
                  placeholder="Enter placeholder text"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="field-required" className="text-xs font-medium">
                  Required Field
                </Label>
                <Switch
                  id="field-required"
                  checked={selectedField.required}
                  onCheckedChange={(checked: any) =>
                    updateField(selectedField.id, { required: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Options for select/radio fields */}
          {(selectedField.type === "select" ||
            selectedField.type === "radio") && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedField.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleUpdateOption(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(index)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                <div className="flex items-center space-x-2">
                  <Input
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add new option"
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddOption}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validation Rules */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(selectedField.type === "text" ||
                selectedField.type === "textarea") && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Minimum Length
                    </Label>
                    <Input
                      type="number"
                      value={selectedField.validation?.minLength || ""}
                      onChange={(e) =>
                        updateField(selectedField.id, {
                          validation: {
                            ...selectedField.validation,
                            minLength: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          },
                        })
                      }
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Maximum Length
                    </Label>
                    <Input
                      type="number"
                      value={selectedField.validation?.maxLength || ""}
                      onChange={(e) =>
                        updateField(selectedField.id, {
                          validation: {
                            ...selectedField.validation,
                            maxLength: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          },
                        })
                      }
                      placeholder="No limit"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  );
}

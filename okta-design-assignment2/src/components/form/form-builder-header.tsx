// FormBuilderHeader: Sticky header bar for the form builder page.
// Purpose: Provides quick access to form actions (edit title, undo/redo, settings, preview, save).
// Why used: Centralizes all essential form controls for a smooth form-building experience.
// What it does: Interacts with the form state (via Zustand), allows editing form title/description, undo/redo, clearing the form, toggling preview mode, and saving.
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Save, Undo, Redo, Settings } from "lucide-react";
import { useFormStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Main header component for the form builder UI.
// - Left: Branding and editable form title
// - Center: Undo/redo, settings dialog (edit title/description, clear form)
// - Right: Preview and Save buttons
export function FormBuilderHeader() {
  // Hooks from Zustand store for form state and actions
  const {
    formTitle,
    setFormTitle,
    togglePreviewMode,
    clearForm,
    undo,
    redo,
    history,
    historyIndex,
    formDescription,
    setFormDescription,
  } = useFormStore();

  // Local state for settings dialog visibility
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Enable/disable undo/redo buttons based on history
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <header className="h-16 border-b border-[#e3e8ef] bg-[#ffffff]/95 backdrop-blur supports-[backdrop-filter]:bg-[#ffffff]/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Branding and editable form title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-[#2970ff] to-[#5c8dff] bg-clip-text text-transparent">
              FormKit
            </h1>
            <div className="w-px h-6 bg-[#e3e8ef]" />
          </div>
          {/* Editable form title input */}
          <Input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="border-none bg-transparent text-lg font-medium focus:bg-[#f5f7fa]/50 transition-colors"
            placeholder="Form title..."
          />
        </div>

        {/* Center: Undo/redo, settings dialog (edit title/description, clear form) */}
        <div className="flex items-center space-x-2">
          {/* Undo button */}
          <Button
            variant="ghost"
            size="sm"
            disabled={!canUndo}
            onClick={undo}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          {/* Redo button */}
          <Button
            variant="ghost"
            size="sm"
            disabled={!canRedo}
            onClick={redo}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-[#e3e8ef]" />
          {/* Settings dialog: edit title, description, clear form */}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" title="Form Settings">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Form Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter form title..."
                  />
                </div>
                <div>
                  <Label htmlFor="form-description">Form Description</Label>
                  <Input
                    id="form-description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter form description..."
                  />
                </div>
                {/* Clear form button */}
                <Button
                  variant="destructive"
                  onClick={() => {
                    clearForm();
                    setIsSettingsOpen(false);
                  }}
                  className="w-full bg-[#ef4444] text-[#f9fafb] hover:bg-red-600"
                >
                  Clear Form
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Right: Preview and Save buttons */}
        <div className="flex items-center space-x-3">
          {/* Preview mode toggle button */}
          <Button
            variant="outline"
            onClick={togglePreviewMode}
            className="hover:bg-[#f3f8ff] transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          {/* Save form button (no action implemented) */}
          <Button className="bg-gradient-to-r from-[#2970ff] to-[#5c8dff] hover:shadow-lg transition-all duration-200 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </Button>
        </div>
      </div>
    </header>
  );
}

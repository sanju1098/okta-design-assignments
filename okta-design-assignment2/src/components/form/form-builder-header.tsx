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

export function FormBuilderHeader() {
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

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <header className="h-16 border-b border-[#e3e8ef] bg-[#ffffff]/95 backdrop-blur supports-[backdrop-filter]:bg-[#ffffff]/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Form Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-[#2970ff] to-[#5c8dff] bg-clip-text text-transparent">
              FormKit
            </h1>
            <div className="w-px h-6 bg-[#e3e8ef]" />
          </div>
          <Input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="border-none bg-transparent text-lg font-medium focus:bg-[#f5f7fa]/50 transition-colors"
            placeholder="Form title..."
          />
        </div>

        {/* Center: Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={!canUndo}
            onClick={undo}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
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

        {/* Right: Preview & Save */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={togglePreviewMode}
            className="hover:bg-[#f3f8ff] transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button className="bg-gradient-to-r from-[#2970ff] to-[#5c8dff] hover:shadow-lg transition-all duration-200 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </Button>
        </div>
      </div>
    </header>
  );
}

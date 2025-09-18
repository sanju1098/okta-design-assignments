// FormBuilderCanvas: Main canvas area for building forms via drag-and-drop.
// Purpose: Provides a droppable zone for form fields, displays a live preview, and supports reordering fields.
// Why used: Central workspace for users to visually construct and arrange their form fields interactively.
// What it does: Renders form preview, handles drop events, shows empty state and drop indicators, and lists sortable fields.

"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { useFormStore } from "@/lib/store";
import { Plus, MousePointer2 } from "lucide-react";
import { SortableFormField } from "./sortable-form-field";

// Props for FormBuilderCanvas: receives drag end handler from parent
interface FormBuilderCanvasProps {
  onDragEnd: (event: DragEndEvent) => void;
}

// FormBuilderCanvas: Renders the main form building area
// - Shows a preview of the form as fields are added
// - Allows users to drop new components and reorder fields
// - Displays empty state and drop zone indicators
export function FormBuilderCanvas({ onDragEnd }: FormBuilderCanvasProps) {
  const { fields } = useFormStore();

  // useDroppable: enables drop zone for drag-and-drop
  const { setNodeRef, isOver } = useDroppable({
    id: "form-canvas",
  });

  return (
    <div className="flex-1 bg-formkit-canvas p-8 overflow-y-auto">
      <div
        ref={setNodeRef}
        className={`max-w-2xl mx-auto transition-all duration-200 ${
          isOver ? "scale-105" : ""
        }`}
      >
        {/* Form Header */}
        <div className="mb-8">
          <div className="bg-background rounded-lg border shadow-sm p-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Form Preview
            </h1>
            <p className="text-muted-foreground">
              Your form will appear here as you build it
            </p>
          </div>
        </div>

        {/* Form Fields: sortable and droppable */}
        {fields.length > 0 ? (
          <SortableContext
            items={fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {fields.map((field) => (
                <SortableFormField key={field.id} field={field} />
              ))}
            </div>
          </SortableContext>
        ) : (
          // Empty state: prompt user to drag components
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
              isOver
                ? "border-primary bg-formkit-drop-zone scale-105"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
          >
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Start building your form
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag components from the sidebar to create your form fields
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Plus className="h-4 w-4" />
                <span>Drag & drop to add fields</span>
              </div>
            </div>
          </div>
        )}

        {/* Drop Zone Indicator: shows when dragging over canvas with fields */}
        {isOver && fields.length > 0 && (
          <div className="mt-4 p-4 border-2 border-dashed border-primary bg-formkit-drop-zone rounded-lg">
            <div className="text-center text-primary font-medium">
              Drop here to add new field
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// BuilderPage: Main form builder interface for drag-and-drop form creation.
// This component provides a UI for users to build forms by dragging components from a sidebar
// and dropping them onto a canvas. It manages form fields, supports reordering, and toggles preview mode.
// Uses @dnd-kit/core for drag-and-drop functionality and Zustand for state management.
"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { FormBuilderSidebar } from "@/components/form/form-builder-sidebar";
import { FormBuilderCanvas } from "@/components/form/form-builder-canvas";
import { FormBuilderHeader } from "@/components/form/form-builder-header";
import { PropertyPanel } from "@/components/form/property-panel";
import { FormPreview } from "@/components/form/form-preview";
import { useFormStore } from "@/lib/store";
import { ComponentItem } from "@/components/form/component-item";

// BuilderPage is the main page for building forms interactively.
// It handles drag-and-drop events, manages form fields, and renders the builder UI.
export default function BuilderPage() {
  // draggedComponent: Stores the component currently being dragged from the sidebar.
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  // useFormStore: Zustand store for form builder state (fields, preview mode, add/reorder actions).
  const { isPreviewMode, fields, addField, reorderFields } = useFormStore();

  // handleDragStart: Called when a drag starts. Sets the dragged component from sidebar.
  const handleDragStart = (event: DragStartEvent) => {
    console.log("Drag started:", event.active.id, event.active.data.current);
    setDraggedComponent(event.active.data.current);
  };

  // handleDragEnd: Called when a drag ends.
  // - If a new component is dropped from the sidebar, adds it to the form.
  // - If an existing field is reordered, updates its position in the form.
  const handleDragEnd = (event: DragEndEvent) => {
    console.log("Drag ended:", event);
    const { active, over } = event;

    setDraggedComponent(null);

    if (!over) {
      console.log("No drop target");
      return;
    }

    // Add new component from sidebar to form
    if (active.id.toString().startsWith("component-")) {
      const componentType = active.data.current?.type;
      const componentLabel = active.data.current?.label;

      console.log("Adding new component:", componentType, componentLabel);

      if (componentType && componentLabel) {
        addField({
          type: componentType,
          label: componentLabel,
          placeholder: `Enter ${componentLabel.toLowerCase()}...`,
          required: false,
          options:
            componentType === "select" || componentType === "radio"
              ? ["Option 1", "Option 2", "Option 3"]
              : undefined,
        });
      }
      return;
    }

    // Reorder existing fields in the form
    if (over.id === "form-canvas" || over.id.toString().startsWith("field_")) {
      const activeIndex = fields.findIndex((field) => field.id === active.id);
      const overIndex = fields.findIndex((field) => field.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        console.log("Reordering fields:", activeIndex, "->", overIndex);
        reorderFields(activeIndex, overIndex);
      }
    }
  };

  // If preview mode is enabled, show the form preview instead of the builder UI.
  if (isPreviewMode) {
    return <FormPreview />;
  }

  // Main builder UI layout:
  // - FormBuilderHeader: Top bar with builder controls.
  // - FormBuilderSidebar: Sidebar with draggable form components.
  // - FormBuilderCanvas: Main area to drop and arrange form fields.
  // - PropertyPanel: Panel to edit properties of selected field.
  // - DragOverlay: Shows a preview of the dragged component.
  return (
    <div className="min-h-screen bg-background">
      <FormBuilderHeader />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Component Library Sidebar: Drag components from here */}
          <FormBuilderSidebar />

          {/* Main Canvas Area: Drop and arrange form fields here */}
          <div className="flex-1 flex">
            <FormBuilderCanvas onDragEnd={handleDragEnd} />

            {/* Property Panel: Edit field properties */}
            <PropertyPanel />
          </div>
        </div>

        {/* Drag Overlay: Renders a floating preview of the component being dragged. */}
        {/* Purpose: Shows users a visual representation of the component as they drag it from the sidebar to the canvas. */}
        {/* Why used: Improves UX by providing feedback during drag-and-drop operations. */}
        {/* What it does: If a component is being dragged, displays its preview using ComponentItem with a styled overlay. */}
        <DragOverlay>
          {draggedComponent ? (
            <div className="opacity-80 rotate-3 transform">
              <ComponentItem {...draggedComponent} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

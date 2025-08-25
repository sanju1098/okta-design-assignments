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

export default function BuilderPage() {
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const { isPreviewMode, fields, addField, reorderFields } = useFormStore();

  const handleDragStart = (event: DragStartEvent) => {
    console.log("Drag started:", event.active.id, event.active.data.current);
    setDraggedComponent(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("Drag ended:", event);
    const { active, over } = event;

    setDraggedComponent(null);

    if (!over) {
      console.log("No drop target");
      return;
    }

    // Handle dropping a new component from sidebar
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

    // Handle reordering existing fields
    if (over.id === "form-canvas" || over.id.toString().startsWith("field_")) {
      const activeIndex = fields.findIndex((field) => field.id === active.id);
      const overIndex = fields.findIndex((field) => field.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        console.log("Reordering fields:", activeIndex, "->", overIndex);
        reorderFields(activeIndex, overIndex);
      }
    }
  };

  if (isPreviewMode) {
    return <FormPreview />;
  }

  return (
    <div className="min-h-screen bg-background">
      <FormBuilderHeader />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Component Library Sidebar */}
          <FormBuilderSidebar />

          {/* Main Canvas Area */}
          <div className="flex-1 flex">
            <FormBuilderCanvas onDragEnd={handleDragEnd} />

            {/* Property Panel */}
            <PropertyPanel />
          </div>
        </div>

        {/* Drag Overlay */}
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

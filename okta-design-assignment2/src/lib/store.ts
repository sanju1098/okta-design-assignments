// Zustand store for the Form Builder app.
// Purpose: Centralizes all form builder state and actions for managing fields, UI state, history, and undo/redo.
// Why used: Allows components to access and update form state in a predictable, reactive way.
// What it does: Defines the schema for form fields and builder state, and provides all actions needed for interactive form building.

// FormField: Describes a single field in the form (input, select, radio, etc).
// Used to render and manage each field's properties and validation.
export interface FormField {
  id: string;
  type:
    | "text"
    | "textarea"
    | "email"
    | "number"
    | "select"
    | "radio"
    | "checkbox"
    | "logo"
    | "cover";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select/radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  file?: File; // for logo/cover uploads
}

// FormBuilderState: Main state object for the form builder.
// Contains all fields, selected field, preview mode, form metadata, theme, and history for undo/redo.
export interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
  isPreviewMode: boolean;
  formTitle: string;
  formDescription: string;
  formTheme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  history: FormField[][];
  historyIndex: number;
}

// FormBuilderActions: All actions that can update the form builder state.
// Includes adding, updating, removing, reordering fields, selecting, preview toggling, metadata, theme, clearing, and undo/redo.
export interface FormBuilderActions {
  addField: (field: Omit<FormField, "id">) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  selectField: (id: string | null) => void;
  togglePreviewMode: () => void;
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  setFormTheme: (theme: Partial<FormBuilderState["formTheme"]>) => void;
  clearForm: () => void;
  undo: () => void;
  redo: () => void;
}

// initialState: Default values for a new form builder session.
// Used to reset the form and initialize the store.
const initialState: FormBuilderState = {
  fields: [],
  selectedFieldId: null,
  isPreviewMode: false,
  formTitle: "Untitled Form",
  formDescription: "",
  formTheme: {
    primaryColor: "hsl(221.2, 83.2%, 53.3%)",
    backgroundColor: "hsl(0, 0%, 100%)",
    textColor: "hsl(222.2, 84%, 4.9%)",
  },
  history: [[]],
  historyIndex: 0,
};

import { create } from "zustand";

// useFormStore: Main Zustand store hook for the form builder.
// Provides state and all actions for managing the form interactively.
export const useFormStore = create<FormBuilderState & FormBuilderActions>(
  (set, get) => ({
    ...initialState,

    // Add a new field to the form, generate unique id, update history for undo/redo
    addField: (field) => {
      const id = `field_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newField: FormField = { ...field, id };
      set((state) => {
        const newFields = [...state.fields, newField];
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(newFields);
        return {
          fields: newFields,
          selectedFieldId: id,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    },

    // Update properties of a field by id
    updateField: (id, updates) => {
      set((state) => ({
        fields: state.fields.map((field) =>
          field.id === id ? { ...field, ...updates } : field
        ),
      }));
    },

    // Remove a field by id, update history for undo/redo
    removeField: (id) => {
      set((state) => {
        const newFields = state.fields.filter((field) => field.id !== id);
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(newFields);
        return {
          fields: newFields,
          selectedFieldId:
            state.selectedFieldId === id ? null : state.selectedFieldId,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    },

    // Move a field from one index to another
    reorderFields: (fromIndex, toIndex) => {
      set((state) => {
        const newFields = [...state.fields];
        const [movedField] = newFields.splice(fromIndex, 1);
        newFields.splice(toIndex, 0, movedField);
        return { fields: newFields };
      });
    },

    // Select a field for editing
    selectField: (id) => {
      set({ selectedFieldId: id });
    },

    // Toggle preview mode for the form
    togglePreviewMode: () => {
      set((state) => ({ isPreviewMode: !state.isPreviewMode }));
    },

    // Set the form title
    setFormTitle: (title) => {
      set({ formTitle: title });
    },

    // Set the form description
    setFormDescription: (description) => {
      set({ formDescription: description });
    },

    // Update the form theme (colors)
    setFormTheme: (theme) => {
      set((state) => ({
        formTheme: { ...state.formTheme, ...theme },
      }));
    },

    // Reset the form to its initial state
    clearForm: () => {
      set(initialState);
    },

    // Undo last change (history)
    undo: () => {
      set((state) => {
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          return {
            fields: state.history[newIndex],
            historyIndex: newIndex,
            selectedFieldId: null,
          };
        }
        return state;
      });
    },

    // Redo last undone change (history)
    redo: () => {
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          return {
            fields: state.history[newIndex],
            historyIndex: newIndex,
            selectedFieldId: null,
          };
        }
        return state;
      });
    },
  })
);

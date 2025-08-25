import { create } from "zustand";

export interface FormField {
  id: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "email"
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

export const useFormStore = create<FormBuilderState & FormBuilderActions>(
  (set, get) => ({
    ...initialState,

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

    updateField: (id, updates) => {
      set((state) => ({
        fields: state.fields.map((field) =>
          field.id === id ? { ...field, ...updates } : field
        ),
      }));
    },

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

    reorderFields: (fromIndex, toIndex) => {
      set((state) => {
        const newFields = [...state.fields];
        const [movedField] = newFields.splice(fromIndex, 1);
        newFields.splice(toIndex, 0, movedField);
        return { fields: newFields };
      });
    },

    selectField: (id) => {
      set({ selectedFieldId: id });
    },

    togglePreviewMode: () => {
      set((state) => ({ isPreviewMode: !state.isPreviewMode }));
    },

    setFormTitle: (title) => {
      set({ formTitle: title });
    },

    setFormDescription: (description) => {
      set({ formDescription: description });
    },

    setFormTheme: (theme) => {
      set((state) => ({
        formTheme: { ...state.formTheme, ...theme },
      }));
    },

    clearForm: () => {
      set(initialState);
    },

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

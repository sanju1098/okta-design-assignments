"use client";

import { Header } from "@/components/header";
import { useFormStore } from "@/lib/store";

const FormBuilderCanvas = () => {
  const { fields } = useFormStore();

  return (
    <div className="space-y-4">
      <Header />
      {fields.map((field, i) => (
        <div key={i} className="border rounded p-4">
          <label className="block font-medium mb-1">{field.label}</label>
          {/* Render input based on field.type */}
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Field preview"
          />
        </div>
      ))}
    </div>
  );
};

export { FormBuilderCanvas };

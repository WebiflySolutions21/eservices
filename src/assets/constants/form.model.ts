// form.model.ts
export interface FormFieldConfig {
  id: string;
  type:
    | 'text'
    | 'number'
    | 'checkbox'
    | 'radio'
    | 'multi-checkbox'
    | 'select'
    | 'date'
    | 'datetime-local'
    | 'textarea';
  label: string;
  defaultValue?: any;
  required: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
  span?: number;

  // Number specific
  min: number;
  max: number;
  step?: number | string;

  // Date specific
  minDate?: string; // YYYY-MM-DD format
  maxDate?: string; // YYYY-MM-DD format
}

export interface FormSection {
  id: string;
  title?: string;
  columns: number;
  fields: FormFieldConfig[];
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  sections: FormSection[];
}

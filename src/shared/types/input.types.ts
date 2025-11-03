export interface FieldInputProps<T extends HTMLElement = HTMLElement> {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<T>) => void;
  fieldClassName?: string;
  formControlClassName?: string;
}

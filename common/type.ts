export interface FieldProps {
  // register: { onChange?: any; onBlur?: any; ref?: any; name?: any };
  // control: any;
  formControl: {
    name: string;
    control: any;
    defaultValue?: any;
    rules: { [key: string]: any };
  };
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  dataSelector?: string;
}

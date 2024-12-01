export interface InputProps {
  label?: string;
  fieldName: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}
export const Input = ({
  label,
  fieldName,
  placeholder,
  onChange,
  value,
  required,
  error,
}: InputProps) => {
  const defaultInput = "w-full p-3 rounded-lg ";
  const color = error
    ? "border border-red-300"
    : "border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500";

  return (
    <div>
      {label && <label htmlFor={fieldName}>{label}:&nbsp;</label>}
      <input
        className={defaultInput + color}
        type={fieldName}
        id={fieldName}
        name={label}
        value={value ?? ""}
        onChange={(value) => onChange(value.target.value)}
        placeholder={placeholder}
        required={required}
      />
      {error && (
        <div className="px-2 py-1 flex justify-left text-red-500">{error}</div>
      )}
    </div>
  );
};

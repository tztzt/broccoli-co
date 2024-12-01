export interface InputProps {
  fieldName: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

/**
 * A simple customizable Input component for handling user input in forms.
 * Supports displaying placeholders and error messages.
 *
 * @param {Object} param - The props object for the Input component.
 * @param {string} param.label - The label text displayed above the input field.
 * @param {string} param.fieldName - The `name` attribute for the input field, used in form handling.
 * @param {string} [param.placeholder] - Placeholder text displayed inside the input field when it's empty.
 * @param {(value: string) => void} param.onChange - Callback function invoked when the input value changes.
 * Receives the new value as a parameter.
 * @param {string} param.value - The current value of the input field, making it a controlled component.
 * @param {string} [param.error] - An optional error message to display below the input field for validation feedback.
 *
 * @returns {JSX.Element} A JSX element representing the input field with optional label and error message.
 */
export const Input = ({
  fieldName,
  placeholder,
  onChange,
  value,
  error,
}: InputProps) => {
  const defaultInput = 'w-full p-3 rounded-lg ';
  const color = error
    ? 'border border-red-300 border-2'
    : 'border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500';

  return (
    <div>
      <input
        className={defaultInput + color}
        type={fieldName}
        id={fieldName}
        name={fieldName}
        value={value ?? ''}
        onChange={(value) => onChange(value.target.value)}
        placeholder={placeholder}
      />
      {error && (
        <div className="px-2 py-1 flex justify-left text-red-500">{error}</div>
      )}
    </div>
  );
};

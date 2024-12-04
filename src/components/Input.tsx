export interface InputProps<T> {
  fieldName: string;
  placeholder?: string;
  onChange: (value: string, name: T) => void;
  error?: string;
}

/**
 * A simple customizable Input component for handling user input in forms.
 * Supports displaying placeholders and error messages.
 *
 * @param {Object} param - The props object for the Input component.
 * @param {string} param.fieldName - The `name` attribute for the input field, used in form handling.
 * @param {string} [param.placeholder] - Placeholder text displayed inside the input field when it's empty.
 * @param {(value: string) => void} param.onChange - Callback function invoked when the input value changes.
 * Receives the new value as a parameter.
 * @param {string} [param.error] - An optional error message to display below the input field for validation feedback.
 *
 * @returns {JSX.Element} A JSX element representing the input field with optional label and error message.
 */
export const Input = <T extends string>({
  fieldName,
  placeholder,
  onChange,
  error,
}: InputProps<T>): JSX.Element => {
  const defaultInput = "w-full p-3 rounded-lg ";
  const color = error
    ? "border border-red-300 border-2"
    : "border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500";

  return (
    <div>
      <input
        className={defaultInput + color}
        id={fieldName}
        name={fieldName}
        onChange={(event) =>
          onChange(event.target.value, event.target.name as T)
        }
        placeholder={placeholder}
      />
      {error && (
        <div className="px-2 py-1 flex justify-left text-red-500">{error}</div>
      )}
    </div>
  );
};

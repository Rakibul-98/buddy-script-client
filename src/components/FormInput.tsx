import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<T>;
  error?: string;
  required?: boolean;
  validation?: object;
  placeholder?: string;
}

export default function FormInput<T extends FieldValues>({
  id,
  label,
  type,
  register,
  error,
  required,
  validation = {},
  placeholder,
}: FormInputProps<T>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 text-center lg:text-left"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id as Path<T>, {
          required: required ? `${label} is required` : false,
          ...validation,
        })}
        placeholder={placeholder}
        className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF] text-lg"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
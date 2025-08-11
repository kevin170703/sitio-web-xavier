export default function Input({
  label,
  placeholder,
  type = "text",
  id,
  onChange,
  value,
  name,
  disabled = false,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`min-w-[200px] w-full max-h-max flex flex-col bg-transparent transition-all focus-within:border-primary border rounded-full px-6 py-2 border-primary/30 ${
        disabled ? "text-[#999] cursor-not-allowed" : "text-black/50"
      }`}
    >
      <label className="text-primary/70 text-sm font-medium text-start">
        {label}
      </label>

      <input
        required={required}
        id={id}
        type={type}
        placeholder={placeholder}
        className="text-base outline-none font-medium bg-transparent text-black"
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
      />
    </label>
  );
}

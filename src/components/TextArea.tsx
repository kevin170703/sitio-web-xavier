export default function TextArea({
  label,
  placeholder,
  id,
  onChange,
  value,
  name,
  required = false,
  maxLength = 200,
}: {
  label: string;
  placeholder: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  name: string;
  required?: boolean;
  maxLength?: number;
}) {
  const messageCharCount = value.length;

  // Función para limitar los caracteres en tiempo real
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Si el texto excede el límite, cortar el texto
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    // Llamar al onChange original
    onChange(e);
  };

  return (
    <div className="min-w-max w-full h-max">
      <div className="min-w-max w-full h-max flex flex-col bg-transparent text-black py-4 px-6 border border-primary/30  focus-within:border-primary rounded-4xl ">
        <label
          htmlFor={id}
          className="text-primary/70 font-medium text-sm text-start"
        >
          {label}
        </label>

        <textarea
          required={required}
          id={id}
          placeholder={placeholder}
          className="text-base font-medium outline-none resize-none h-[60px] w-full  custom-scrollbar text-black "
          onChange={handleInput}
          value={value}
          name={name}
          maxLength={maxLength}
        />
      </div>

      <div className="flex justify-between w-full mt-2">
        {/* {error && <span className="text-xs text-red-500">{error}</span>} */}
        <div
          className={`text-right text-xs ${
            messageCharCount >= maxLength
              ? "text-red-500"
              : "text-text-secondary"
          }`}
        >
          {messageCharCount}/{maxLength}
        </div>
      </div>
    </div>
  );
}

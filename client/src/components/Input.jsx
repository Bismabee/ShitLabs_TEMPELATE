// src/components/Input.jsx
const Input = ({ label, value, onChange, placeholder, required = false, type = "text" }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="font-bold text-xs uppercase tracking-widest mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-white border-2 border-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 placeholder:text-neutral-400 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-y-[1px] focus:translate-x-[1px] focus:shadow-none"
    />
  </div>
);

export default Input;

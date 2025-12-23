const Button = ({ children, onClick, className = '', variant = 'primary', disabled = false, type = 'button' }) => {
  const baseStyle = 'font-bold text-sm px-6 py-3 border-2 border-black transition-all active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    secondary: 'bg-white text-black hover:bg-neutral-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    ghost: 'bg-transparent border-transparent hover:bg-neutral-100 shadow-none border-0 px-4',
    outline: 'bg-transparent text-black hover:bg-neutral-50 shadow-none',
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export default Button

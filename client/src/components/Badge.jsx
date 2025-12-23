// src/components/Badge.jsx
const Badge = ({ children }) => (
  <span className="bg-neutral-200 text-xs font-bold px-2 py-1 border border-black inline-block uppercase">
    {children}
  </span>
);

export default Badge;

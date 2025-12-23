// src/components/Loader.jsx
const Loader = ({ text = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center font-mono animate-pulse">
    {text}
  </div>
);

export default Loader;

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${className}`}>
    {children}
  </div>
)

export default Card

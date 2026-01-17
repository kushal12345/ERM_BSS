export function Select({ children }) {
  return <div>{children}</div>;
}
export function SelectTrigger({ children }) {
  return <div className="border rounded-md p-2">{children}</div>;
}
export function SelectContent({ children }) {
  return <div className="border rounded-md mt-1">{children}</div>;
}
export function SelectItem({ children, onClick }) {
  return (
    <div onClick={onClick} className="p-2 cursor-pointer hover:bg-gray-100">
      {children}
    </div>
  );
}
export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

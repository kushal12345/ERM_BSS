export function Switch({ checked, onCheckedChange }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-10 h-5 rounded-full relative ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition ${
          checked && "translate-x-5"
        }`}
      />
    </button>
  );
}

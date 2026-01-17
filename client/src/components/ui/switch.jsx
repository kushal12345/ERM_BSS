export function Switch({ checked, onCheckedChange }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`size-10 rounded-full relative ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 size-3 bg-white rounded-full transition ${
          checked && "translate-x-5"
        }`}
      />
    </button>
  );
}

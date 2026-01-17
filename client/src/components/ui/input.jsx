import { cn } from "../../components/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full h-10 rounded-md border px-3 text-sm focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

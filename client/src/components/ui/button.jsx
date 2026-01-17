import { cn } from "../../components/lib/utils";

export function Button({ className, variant = "default", ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition",
        variant === "default" && "bg-blue-600 text-white",
        variant === "secondary" && "bg-gray-200",
        variant === "outline" && "border",
        className
      )}
      {...props}
    />
  );
}

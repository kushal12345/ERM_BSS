import { cn } from "../../components/lib/utils";

export function Badge({ className, variant, ...props }) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 text-xs rounded-full font-semibold",
        variant === "success" && "bg-green-100 text-green-700",
        variant === "destructive" && "bg-red-100 text-red-700",
        className
      )}
      {...props}
    />
  );
}

import { cn } from "../../components/lib/utils";

export function Card({ className, ...props }) {
  return (
    <div className={cn("rounded-xl border bg-white shadow-sm", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-2", className)} {...props} />;
}

export function CardDash({ className, ...props }) {
  return <div className={cn("p-2", className)} {...props} />;
}


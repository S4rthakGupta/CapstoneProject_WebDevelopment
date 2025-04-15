import * as React from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "destructive";

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "w-full max-w-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-4 border transition-all",
          variant === "destructive"
            ? "border-red-500 bg-red-50 dark:bg-red-900"
            : "border-gray-200 dark:border-gray-700",
          className
        )}
      >
        {title && <div className="font-semibold mb-1">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast };

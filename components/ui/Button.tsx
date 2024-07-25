import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-darkbrown  text-primary hover:bg-lightgreen text-base font-medium cursor-pointer flex items-center justify-center",
        primary:
          "bg-lightgreen text-primary hover:bg-darkbrown text-sm leading-6  font-semibold cursor-pointer ",
        secondary:
          "bg-darkbrown text-primary flex overflow-hidden text-base hover:bg-lightgreen",
        tertiory: "",
      },
      size: {
        default: "h-9 w-24 py-6 rounded-3xl",
        sm: "rounded-3xl h-14 py-4 mt-12 w-full",
        lg: "h-14 rounded-3xl w-full px-8 mt-11",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

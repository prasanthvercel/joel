import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
    "delay-50",
    "cursor-pointer",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-blue-400", "text-white", "hover:enabled:bg-blue-700"],
        secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400", "hover:enabled:text-white"],
        'outline-purple': ["bg-white", "text-rebeccapurple", "border-rebeccapurple", "hover:enabled:bg-rebeccapurple", "hover:enabled:text-white"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
      underline: { true: ["underline"] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  // Make href optional, especially when type is submit
  href?: string; // Made href optional
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  const isSubmit = props.type === 'submit';

  if (isSubmit) {
    return (
       <button className={twMerge(button({ intent, size, className, underline }))} {...props}>
        {props.children}
      </button>
    )
  } else {
    // Ensure href is provided when rendering as an anchor
    if (!props.href) {
      // You might want to handle this case with an error or default href
      console.error("Button component requires 'href' prop when not used as a submit button.");
      return null; // Or render a fallback
    }
    return (
      <a className={twMerge(button({ intent, size, className, underline }))} {...props}>
        {props.children}
      </a>
    )
  }
}

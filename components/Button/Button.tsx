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

// Define separate props for button and anchor
type ButtonOrAnchorProps<T extends React.ElementType> = T extends 'button'
  ? React.ButtonHTMLAttributes<HTMLButtonElement>
  : React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Use a conditional type for ButtonProps
export type ButtonProps<T extends React.ElementType = 'button'> = {
  underline?: boolean;
  href?: string;
  as?: T; // Optional prop to specify the element type
} & VariantProps<typeof button> & ButtonOrAnchorProps<T>;


export function Button<T extends React.ElementType = 'button'>({ className, intent, size, underline, as, ...props }: ButtonProps<T>) {
  const Component = as || (props.href ? 'a' : 'button'); // Determine the component to render

  // Ensure href is provided when rendering as an anchor
  if (Component === 'a' && !props.href) {
    console.error("Button component requires 'href' prop when rendering as an anchor.");
    return null; // Or render a fallback
  }


  return (
    <Component className={twMerge(button({ intent, size, className, underline }))} {...props as any}> {/* Use 'as any' as a temporary workaround for complex typing issues */}
      {props.children}
    </Component>
  )
}

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

// Define a base type for shared props
type BaseButtonProps = {
  underline?: boolean;
} & VariantProps<typeof button>;

// Define props for anchor element
interface AnchorButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, BaseButtonProps {
  href: string; // href is required for anchors
}

// Define props for button element
interface HtmlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'; // type is relevant for buttons
}

// Use a discriminated union for ButtonProps
export type ButtonProps = AnchorButtonProps | HtmlButtonProps;


export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  const baseClasses = twMerge(button({ intent, size, className, underline }));

  if ('href' in props && props.href) {
    // Render as an anchor
    const { href, ...anchorProps } = props; // Destructure href
    return (
      <a href={href} className={baseClasses} {...anchorProps}>
        {props.children}
      </a>
    );
  } else {
    // Render as a button
    const { type, ...buttonProps } = props as HtmlButtonProps; // Cast to HtmlButtonProps to access button-specific props
     return (
       <button type={type || 'button'} className={baseClasses} {...buttonProps}>
        {props.children}
      </button>
    );
  }
}

import { ButtonProps, Sizes, Variants } from "@/types/button_props";
import { IconLoading } from "../../icons";

const sizes: Record<Sizes, string> = {
sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0", // Para botones que solo contenga iconos.
}

const variants: Record<Variants, string> = {
  primary: "bg-primary text-primary-foreground border-border border-primary duration-200 hover:brightness-125 active:bg-primary active:border-primary active:brightness-150",
  secondary: "bg-secondary text-secondary-foreground border-border hover:brightness-95 active:brightness-90",
  outline: "bg-transparent rounded-lg text-surface border-border hover:bg-surface hover:text-primary active:rounded-t-lg",
  ghost: "bg-transparent text-muted border-transparent hover:bg-surface/60",
  link: "bg-transparent border-transparent text-primary hover:underline p-0 h-auto",
  unstyled: ""
};

const base =
  "inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg font-medium transition " +
  "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "disabled:opacity-50";

export function Button({
	variant = "primary",
	size = "md",
	fullWidth = false,
	isLoading = false,
	startIcon,
	endIcon,
	type = "button",
	className,
	children,
	...props
}: ButtonProps) {

	const classes = [
  	base,
  	variants[variant],
  	sizes[size],
  	fullWidth ? "w-full" : "",
  	className, // Para poder sobrescribir
  ].join(" ");

	return (
		<button
			type={type}
			className={classes}
			aria-busy={isLoading || undefined}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading && (
				<IconLoading className="size-4 animate-spin" aria-hidden="true"/>
			)}
			{startIcon}
			{children}
			{endIcon}
		</button>
	);
}
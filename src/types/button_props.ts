export type Sizes = "sm" | "md" | "lg" | "icon";
export type Variants = "primary" | "secondary" | "outline" | "ghost" | "link" | "unstyled";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variants
	size?: Sizes
	fullWidth?: boolean
	isLoading?: boolean
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
}


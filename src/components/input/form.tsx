import React, {
	FormHTMLAttributes,
	PropsWithChildren,
	forwardRef,
} from "react";

interface FormProps
	extends PropsWithChildren,
		FormHTMLAttributes<HTMLFormElement> {}

export const Form = forwardRef<HTMLFormElement, FormProps>(
	({ children, ...props }, ref) => {
		return (
			<form ref={ref} className="w-full space-y-6" {...props}>
				{children}
			</form>
		);
	}
);

Form.displayName = "Form";

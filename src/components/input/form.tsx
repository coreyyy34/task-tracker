import { FormHTMLAttributes, PropsWithChildren } from "react";

interface FormProps
    extends PropsWithChildren,
        FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
    return (
        <form className="w-full space-y-6" {...props}>
            {children}
        </form>
    );
};

import { PropsWithChildren } from "react";

export const InputGroup: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className="w-full">{children}</div>;
};

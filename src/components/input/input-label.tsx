interface InputLabel {
	text: string;
	required?: boolean;
}

export const InputLabel: React.FC<InputLabel> = ({
	text,
	required = false,
}) => {
	return (
		<p className="text-sm text-gray-900">
			{text}
			{required && <span className="ml-1 text-red-500">*</span>}
		</p>
	);
};

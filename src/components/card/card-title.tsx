import { LucideIcon } from "lucide-react";

interface CardTitleProps {
	title: string;
	description?: string;
	icon?: LucideIcon;
}

export const CardTitle: React.FC<CardTitleProps> = ({
	title,
	description,
	icon: Icon,
}) => {
	return (
		<div>
			{Icon ? (
				<div className="flex gap-2 items-center text-blue-500">
					{Icon && <Icon size={18} />}
					<span className="text-lg font-bold">{title}</span>
				</div>
			) : (
				<span className="text-lg font-bold text-blue-500">{title}</span>
			)}

			{description && (
				<p className="text-sm text-neutral-500">{description}</p>
			)}
		</div>
	);
};

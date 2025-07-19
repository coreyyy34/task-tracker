import type { ReactNode } from "react";

interface CardLayoutProps {
	title?: string;
	subtitle?: string | ReactNode;
	description: string;
	children?: ReactNode;
	errorCode?: string;
}

const CardLayout = ({
	title = "Task Tracker",
	subtitle,
	description,
	children,
	errorCode,
}: CardLayoutProps) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
			<div className="flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							{title}
						</h1>
						{subtitle && (
							<div className="mb-4">
								{typeof subtitle === "string" ? (
									<h2 className="text-xl font-semibold text-gray-900">
										{subtitle}
									</h2>
								) : (
									subtitle
								)}
							</div>
						)}
						<p className="text-center text-gray-500">
							{description}
						</p>
					</div>

					{children && <div className="space-y-3">{children}</div>}

					{errorCode && (
						<p className="text-sm text-gray-500 text-center">
							Error Code: {errorCode}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CardLayout;

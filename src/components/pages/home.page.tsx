"use client";

import CurrentTaskCard from "@/components/home/current-task-card";
import { TimeEntriesProvider } from "@/contexts/tasks-context";
import { User } from "next-auth";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../common/navbar";
import TimeEntriesCard from "../home/time-entries/time-entries-card";

interface HomePageContentProps {
	user: User;
}

const HomePageContent: FC<HomePageContentProps> = ({ user }) => {
	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					style: {
						marginTop: "4rem",
					},
				}}
			/>
			<Navbar user={user} />
			<TimeEntriesProvider user={user}>
				<div className="container mx-auto flex gap-4 w-full flex-col xl:flex-row p-8">
					<div className="w-full xl:w-1/3">
						<CurrentTaskCard />
					</div>
					<div className="w-full xl:w-2/3">
						<TimeEntriesCard />
					</div>
				</div>
			</TimeEntriesProvider>
		</>
	);
};

export default HomePageContent;

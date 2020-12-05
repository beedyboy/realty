import React from "react";
import Head from "next/head";
import Landing from "../views/landing";
import ClientLayout from "../templates/client/ClientLayout";

function HomePage() {
	return (
		<>
			<Head>
				<title>Realty Trumpet | Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ClientLayout>
				<Landing />
			</ClientLayout>
		</>
	);
}

export default HomePage;

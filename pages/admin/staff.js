import React from "react";
import Head from "next/head";
import Staff from "../../views/staff";
import AdminLayout from "../../templates/admin/AdminLayout";

function StaffPage() {
	return (
		<>
			<Head>
				<title>Realty Trumpet | Staff Management</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminLayout>
				<Staff />
			</AdminLayout>
			
		</>
	);
}

export default StaffPage;

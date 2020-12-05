import React from "react";
import Head from "next/head";
import Product from "../../views/product";
import AdminLayout from "../../templates/admin/AdminLayout";

function ProductPage() {
	return (
		<>
			<Head>
				<title>Realty Trumpet | Product Management</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminLayout>
				<Product />
			</AdminLayout>
			
		</>
	);
}

export default ProductPage;

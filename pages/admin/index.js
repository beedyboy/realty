import React from 'react'
import AdminLayout from '../../templates/admin/AdminLayout'
import Dashboard from '../../views/dashboard'
const index = () => {
    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    )
}

export default index

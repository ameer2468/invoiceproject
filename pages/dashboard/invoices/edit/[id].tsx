import React from 'react';
import DashboardLayout from "../../../../layouts/DashboardLayout";

const EditInvoice = () => {
    return (
        <div>

        </div>
    );
};

export default EditInvoice;
EditInvoice.layout = DashboardLayout;
export async function getStaticProps(context: any) {
    return {
        props: {
            protected: true,
        },
    }
}

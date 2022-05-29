import React from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";

const Settings = () => {
    return (
        <div>

        </div>
    );
};

export default Settings ;
Settings.Layout = DashboardLayout;

export async function getStaticProps(context: any) {
    return {
        props: {
            protected: true,
        },
    }
}

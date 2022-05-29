import React from 'react';
import DashboardLayout from "../../../../layouts/DashboardLayout";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {getInvoice} from "../../../../src/services/invoices/services";


const EditInvoice = () => {

    const pageId = useRouter().query.id;
    const {data, status} = useQuery(['invoice', pageId], async() => {
        return await getInvoice(pageId as string);
    }, {
        refetchOnWindowFocus: false,
    });

    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
};


export default EditInvoice;
EditInvoice.Layout = DashboardLayout;

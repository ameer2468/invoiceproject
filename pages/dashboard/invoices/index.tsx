import React, {useState} from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";
import Invoice from "../../../src/components/page-specific/dashboard/Invoices/invoice";
import Link from "next/link";
import { motion } from 'framer-motion';
import {anim} from "../../../src/framer";
import {getAllInvoices} from "../../../src/services/invoices/services";
import {useQuery} from "react-query";
import Loading from "../../../src/components/global/loading";
import {Invoice as InvoiceType} from '../../../types/invoice';
import Page from "../../../src/components/global/Page";

const Index = () => {

    const [invoicesData, setInvoicesData] = useState<any[]>([]);
    const {isLoading, isFetching, error} = useQuery('invoices',() => {
        getAllInvoices().then(res => {
            setInvoicesData(res.invoices);
        });
    }, {
        refetchOnWindowFocus: false
    });
    const deleteInvoice = (id: string) => {
       setInvoicesData(invoicesData.filter((invoice: {id: string}) => invoice.id !== id))
    }
    const mutateInvoice = (id: string) => {
        setInvoicesData(invoicesData.map((value) => {
          return value.id === id ? {...value, status: value.status === 'paid' ? 'unpaid' : 'paid'} : value;
        }))
    }

    return (
        <Page pageName={'invoices'}>
                <div className="main-header">
                    <h1>Invoices</h1>
                    <Link href="/dashboard/invoices/new">
                        <button className="button">
                            + New Invoice
                        </button>
                    </Link>
                </div>
                {isLoading || isFetching ?
                    <div style={{
                        position: "absolute",
                        top: "40%",
                        left: "55%",
                    }}>
                    <Loading style={"PulseLoader"} color={"black"}/>
                    </div>
                    :
                    <motion.div
                        initial={anim.initial}
                        animate={anim.animate}
                        transition={anim.transition}
                        className="cards">
                        {invoicesData.map((item: InvoiceType, index: number) => (
                            <motion.div className={"cardWrap"} key={index}>
                                <Invoice
                                    data={item}
                                    editInvoice={(id) => {
                                        mutateInvoice(id)
                                    }}
                                    deleteInvoice={(id) => {
                                        deleteInvoice(id)
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                }
        </Page>
    );
};

export default Index;
Index.Layout = DashboardLayout;


export async function getStaticProps(context: any) {
    return {
        props: {
            protected: true,
        },
    }
}

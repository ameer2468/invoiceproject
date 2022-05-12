import React from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";
import Invoice from "../../../src/components/page-specific/dashboard/Invoices/invoice";
import Link from "next/link";
import { motion } from 'framer-motion';
import {anim} from "../../../src/framer";

const Index = () => {

    return (
        <div className="invoices">
            <div className="invoicesContainer">
                <div className="main-header">
                    <h1>Invoices</h1>
                    <Link href="/dashboard/invoices/new">
                        <button className="button">
                            + New Invoice
                        </button>
                    </Link>
                </div>
                <motion.div
                    initial={anim.initial}
                    animate={anim.animate}
                    transition={anim.transition}
                    className="cards">
                    {Array.from(Array(6).keys()).map((item, index) => (
                        <motion.div className={"cardWrap"} key={index}>
                            <Invoice/>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Index;
Index.Layout = DashboardLayout;

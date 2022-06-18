import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Invoice from "../../../src/components/page-specific/dashboard/Invoices/invoice";
import Link from "next/link";
import { motion } from "framer-motion";
import Loading from "../../../src/components/global/loading";
import { Invoice as InvoiceType } from "../../../types/invoice";
import Page from "../../../src/components/global/Page";
import { useFetchInvoices, useInvoice } from "../../../src/hooks/useInvoice";

const Index = () => {
  useFetchInvoices();
  const { isLoading, isFetching, invoicesData } = useFetchInvoices();
  const { editInvoiceRequest, deleteInvoiceRequest } = useInvoice();

  return (
    <Page pageName={"invoices"}>
      <div className="main-header">
        <h1>Invoices</h1>
        <Link passHref={true} href="/dashboard/invoices/new">
          <button className="button">+ New Invoice</button>
        </Link>
      </div>
      {isLoading || isFetching ? (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "55%",
          }}
        >
          <Loading style={"PulseLoader"} color={"white"} />
        </div>
      ) : (
        <motion.div className="cards">
          {invoicesData.map((item: InvoiceType, index: number) => (
            <div className={"cardWrap"} key={index}>
              <Invoice
                data={item}
                editInvoice={() =>
                  editInvoiceRequest({
                    id: item.id,
                    field: "status",
                    value: item.status === "paid" ? "unpaid" : "paid",
                  })
                }
                deleteInvoice={() => deleteInvoiceRequest(item.id)}
              />
            </div>
          ))}
        </motion.div>
      )}
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
  };
}

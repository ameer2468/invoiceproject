import React from "react";
import { numberFormat } from "../../../../helpers";
import moment from "moment";
import Link from "next/link";

interface props {
  data: any;
}

const Record = ({ data }: props) => {
  return (
    <Link passHref={true} href={`/dashboard/invoices/${data.id}`}>
      <div className="record">
        <p>${numberFormat(data.amount, 2)}</p>
        <p className="pink">{data.id}</p>
        <p>{moment(data.date).format("LL")}</p>
        <p className={`${data.status === "paid" ? "paid" : "unpaid"}`}>
          {data.status}
        </p>
      </div>
    </Link>
  );
};

export default Record;

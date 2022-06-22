import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSackDollar,
  faClock,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Invoice } from "../../../../../types/invoice";
import moment from "moment";
import { numberFormat } from "../../../../helpers";
import { motion } from "framer-motion";
import { staggerChildren } from "../../../../framer";
import Link from "next/link";
import { useUser } from "../../../../UserContext";

interface props {
  data: Invoice;
}

const Invoice = ({ data }: props) => {
  const { user } = useUser();
  const userInfo = user[0];
  return (
    <motion.li {...staggerChildren} className="invoiceCard">
      <h2>{data.to}</h2>
      <p className="desc">
        {data.description.length > 120
          ? data.description.substring(0, 120) + "..."
          : data.description}
      </p>
      <div className={`statusBox ${data.status === "paid" ? "paid" : "unpaid"}`}>
        <FontAwesomeIcon className={"icon"} icon={faCircleCheck} />
        <p>{data.status === "paid" ? "Paid" : "Unpaid"}</p>
      </div>
      <div className="details">
        <p className="amount">
          <FontAwesomeIcon className={"icon"} icon={faSackDollar} />
          {`$${numberFormat(Number(data.amount), 2)}`}
        </p>
        <p className="date">
          <FontAwesomeIcon icon={faClock} className={"icon"} />
          {moment(data.date).format("MMM Do YYYY")}
        </p>
        <p className="customer">
          <FontAwesomeIcon icon={faUser} className={"icon"} />
          {data.from}
        </p>
      </div>
      <Link passHref={true} href={`/dashboard/invoices/invoice?q=${data.id}`}>
        <button style={{ maxWidth: "100%" }}>View details</button>
      </Link>
    </motion.li>
  );
};

export default Invoice;

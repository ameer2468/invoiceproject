import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSackDollar, faClock, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Invoice = () => {
    return (
        <div
            className="invoiceCard">
            <h2>Project Linkin</h2>
            <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ab debitis dolorem quidem saepe soluta, vel! Architecto asperiores,
                assumenda dolorum libero magnam minima optio quisquam rem
                tempora tempore! Accusamus, expedita, explicabo!
            </p>
            <div className="statusBox">
                <FontAwesomeIcon className={"icon"} icon={faCircleCheck}/>
                    <p>
                        Paid
                    </p>
            </div>
            <div className="details">
                <p className="amount">
                    <FontAwesomeIcon
                    className={"icon"}
                    icon={faSackDollar}/>
                    $500.00
                </p>
                <p className="date">
                    <FontAwesomeIcon icon={faClock}
                    className={"icon"}
                    />
                    20/12/21
                </p>
                <p className="customer">
                    <FontAwesomeIcon icon={faUser}
                    className={"icon"}
                    />
                    Coco PLC.
                </p>
            </div>
        </div>
    );
};

export default Invoice;

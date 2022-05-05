import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSackDollar} from "@fortawesome/free-solid-svg-icons";

const ClientCard = () => {
    return (
        <div className="clientCard">
            <h2>Client name</h2>
           <div className="details">
               <p><FontAwesomeIcon icon={faSackDollar}/> $200.00</p>
           </div>
        </div>
    );
};

export default ClientCard;

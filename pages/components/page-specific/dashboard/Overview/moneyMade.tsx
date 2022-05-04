import React from 'react';
import ClientCard from '../../dashboard/MoneyMade/ClientCard';
import {Scrollbars} from "react-custom-scrollbars-2";

const MoneyMade = () => {
    return (
       <div className="MoneyMade">
           <div className="moneyMadeContainer">
               <Scrollbars className="moneyScroll" style={{ width: "100%", height: 550 }}>
                   <div className="moneyMadeContainer">
               {Array.from(Array(10).keys()).map((i, index) => (
                  <ClientCard key={index}/>
               ))}
                   </div>
               </Scrollbars>
           </div>
       </div>
    );
};

export default MoneyMade;

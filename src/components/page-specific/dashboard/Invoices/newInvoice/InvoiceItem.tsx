import React, {ChangeEvent} from 'react';
import Input from "../../../../global/Input";
import {item} from "../../../../../../types/invoice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


interface props {
    item: item;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    removeItem: () => void;
    index: number;
}

const InvoiceItem = ({item, onChange, removeItem, index}: props) => {

    return (
        <div className={"inputs-wrap"}>
            <div className="info-item">
                <Input placeholder="Description of service or product..."
                       value={item.description}
                       name={"description"}
                       onChange={onChange}
                />
                <Input placeholder="Amount"
                       type="number"
                       value={item.amount}
                       name={"amount"}
                       onChange={onChange}
                />
            </div>
            {index > 0 && <div onClick={removeItem} className="delete">
                <FontAwesomeIcon icon={faTrash}/>
            </div>}
        </div>
    );
};

export default InvoiceItem;

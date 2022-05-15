import React, {ChangeEvent} from 'react';
import Input from "../../../../global/Input";
import {item} from "../../../../../../types/invoice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import {anim} from "../../../../../framer";
import CurrencyInput from "react-currency-input-field";


interface props {
    item: item;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    removeItem: () => void;
    index: number;
    handleCurrencyChange: (value: string | undefined, name: string | undefined, index: number) => void;
}

const InvoiceItem = ({item, onChange, removeItem, index, handleCurrencyChange}: props) => {

    return (
        <motion.div
            initial={index !== 0 && anim.initial}
            animate={index !== 0 && anim.animate}
            className={"inputs-wrap"}>
            <div className="info-item">
                <Input placeholder="Description of service or product..."
                       value={item.description}
                       name={"description"}
                       onChange={onChange}
                />
                <CurrencyInput
                    id="input-example"
                    name="amount"
                    prefix="$"
                    decimalScale={2}
                    placeholder="Price"
                    decimalsLimit={2}
                    onValueChange={(value, name) => {
                        handleCurrencyChange(value, name, index)
                    }}
                />
            </div>
            {index > 0 && <div onClick={removeItem} className="delete">
                <FontAwesomeIcon icon={faTrash}/>
            </div>}
        </motion.div>
    );
};

export default InvoiceItem;

import Link from 'next/link';
import React from 'react';
import {useUser} from "../../../hooks/useUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGauge, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {

    const {user} = useUser();

    return (
        <div className="hero">
            <h1>Worry less about invoices and <span className="pink">get paid faster</span>.</h1>
            {user ?
                <Link href={"/dashboard/overview"}>
                    <button className="dbButton">
                        <FontAwesomeIcon
                            style={{ marginRight: "0.8rem" }}
                            icon={faGauge}
                        />
                        Dashboard
                    </button>
                </Link>
                :
                <Link href="/register">
                    <button>
                        <FontAwesomeIcon
                            style={{ marginRight: "0.8rem" }}
                            icon={faAngleDoubleRight}
                        />
                        Sign up
                    </button>
                </Link>
            }
        </div>
    );
};

export default Hero;

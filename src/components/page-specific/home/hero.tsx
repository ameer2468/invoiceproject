import Link from 'next/link';
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGauge, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../UserContext";

const Hero = () => {

    const {user} = useUser();

    return (
        <div className="hero">
            <h1>Worry less about invoices and <span className="pink">get paid faster</span>.</h1>
            {user[0].type !== 'unauthenticated' ?
                <Link  passHref={true} href={"/dashboard/overview"}>
                    <button className="dbButton">
                        <FontAwesomeIcon
                            style={{ marginRight: "0.8rem" }}
                            icon={faGauge}
                        />
                        Dashboard
                    </button>
                </Link>
                :
                <Link passHref={true} href="/register">
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
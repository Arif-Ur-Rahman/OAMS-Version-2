import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function AdminToggle(props) {
    const [toggleState, setToggleState] = useState("on");
    const [t, i18n] = useTranslation('common');

    function toggle() {
        setToggleState(toggleState === "off" ? "on" : "off");
        // localStorage.setItem('lang', 'en')


        if (toggleState === "on") {
            console.log("AdminLevel: 0")
            localStorage.setItem('isAdmin', '0')
            window.location.reload();
        } else {
            console.log("AdminLevel: 2")
            localStorage.setItem('isAdmin', '2')
            window.location.reload();
        }

    }

    useEffect(() => {
        var adminLevel = localStorage.getItem("isAdmin")
        console.log("AdminLevel: " + adminLevel)


        if (adminLevel == 0) {
            console.log("AdminLevel: 0")
            setToggleState("off")
        } else {
            console.log("AdminLevel: 2")
            setToggleState("on")
        }

    }, [toggleState]);

    return <div className={`switchAdmin ${toggleState}`} onClick={toggle} />;
}

export default AdminToggle;

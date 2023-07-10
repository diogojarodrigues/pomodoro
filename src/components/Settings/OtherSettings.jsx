import React, { useContext } from "react";
import { NewSettingsContext } from "../../context/NewSettingsContext";

import style from "../../assets/styles/settings.module.css"

import CheckboxInput from "../Inputs/CheckboxInput"

export default function OtherSettings() {
    const { getHidePlansBar, changeSettings } = useContext(NewSettingsContext);

    return (
        <div className={style.section}>
            <CheckboxInput 
                text="Hide plans bar" name="hidePlansBar" checked={getHidePlansBar()}
                onChange={changeSettings}
            />
        </div>
    )
}

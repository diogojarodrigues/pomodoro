import { useContext, useState } from "react";


import style from "../../assets/styles/settings.module.css"

import NumberInput from "../Inputs/NumberInput";
import CheckboxInput from "../Inputs/CheckboxInput";

import { NewSettingsContext } from "../../context/NewSettingsContext";

export default function SessionSettings() {
    const { getAutoRunPomodoros, getAutoRunBreaks, changeSettings, getMainPlan, getSelectedPlan, setRefreshTrue } = useContext(NewSettingsContext);
    const plan = getSelectedPlan()

    const changeMax = (event) => {
        const { value } = event.target;
        if (!value || value > 0) {
            changeSettings("mainPlan", plan.setMax(value))
            setRefreshTrue()
        }
    }

    return (
        <div className={style.section}>
            <NumberInput text="Number of pomodoros per session" value={getMainPlan().getMaxSessions} handleChange={changeMax} />
            <CheckboxInput text="Auto start Pomodoros" name="autoRunPomodoros" checked={getAutoRunPomodoros()} onChange={changeSettings}/>
            <CheckboxInput text="Auto start Breaks" name="autoRunBreaks" checked={getAutoRunBreaks()} onChange={changeSettings} />
        </div>
    )
}
import React, { useContext, useState } from "react";
import style from "../../assets/styles/settings.module.css";
import { NewSettingsContext } from "../../context/NewSettingsContext";

function TimerValue({ title, name, value, handleChange }) {
    return (
        <div className={style.durationTimer}>
            <p>{title}</p>
            <input name={name} onChange={(event) => handleChange(event)} value={value}></input>
        </div>
    );
}

export default function TimerSettings({ changePlan }) {
    const { getSelectedPlan, setRefreshTrue } = useContext(NewSettingsContext)
    const plan = getSelectedPlan()

    const changeTimers = (event) => {
        const { name, value } = event.target;
        changePlan(plan.setDuration(name, value));
        setRefreshTrue();
    }

    return (
        <div className={style.durationContainer}>
            <TimerValue title="Work" name="work" value={plan.work} handleChange={changeTimers} />
            <TimerValue title="Short Break" name="short" value={plan.short} handleChange={changeTimers} />
            <TimerValue title="Long Break" name="long" value={plan.long} handleChange={changeTimers} />
        </div>
    );
}

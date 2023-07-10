import style from "../../assets/styles/home.module.css"

import { useContext, useState } from "react"
import { SettingsContext } from "../../context/SettingsContext"
import { PomodoroContext } from "../../context/PomodoroContext";

export default function PlanBarHome() {
    const { getSelectedPlans } = useContext(SettingsContext);
    const {  activePlan, setActivePlan } = useContext(PomodoroContext)

    const selectedPlans = getSelectedPlans();

    const handleClick = (name) => {
        setActivePlan(name)
    }

    const plansNames = selectedPlans.map(plan => {
        return (
            <li key={plan.name} className={`${activePlan===plan.name ? style.active : ""} ${style.plan}`} onClick={() => handleClick(plan.name)}>
                <button>{plan.name}</button>
            </li>
        )
    })

    return (
        <ul className={style.planBar}>{plansNames}</ul>	
    )
}
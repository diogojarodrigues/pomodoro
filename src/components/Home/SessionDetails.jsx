import { useContext } from 'react'

import { PomodoroContext } from '../../context/PomodoroContext'

import style from "../../assets/styles/home.module.css"


export default function State() {
    const { pomodoro } = useContext(PomodoroContext)

    const title = () => {
        if (pomodoro.active === "work") return "Work"
        else if (pomodoro.active === "short") return "Short Break"
        else if (pomodoro.active === "long") return "Long Break"
    }

    return (
        <div className={style.state} >
            <h4>{title()}</h4>
            <p>{Math.ceil(pomodoro.count/2)}/{pomodoro.plan.max}</p>
        </div>	
    )
}
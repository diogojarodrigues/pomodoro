import react, { useState, useContext, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSquareXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

import { NewSettingsContext } from "../../context/NewSettingsContext"
import style from "../../assets/styles/settings.module.css"

import TimerSettings from "../../components/Settings/TimerSettings"
import NumberInput from "../../components/Inputs/NumberInput"

export default function AlternativePlan() {
    const { changeSettings, getSelectedPlan, getAllPlans  } = useContext(NewSettingsContext);
    const plan = getSelectedPlan()

    const [name, setName] = useState("")
    const [saved, setSaved] = useState(true)

    useEffect(() => {
        setName("")
        setSaved(true)
    }, [plan])

    const changeAllPlans = (newPlan) => {
        const plans_updated = getAllPlans().map((plan) => {
            if (plan.name === newPlan.name)
                return newPlan
            return plan
        })

        changeSettings("plans", plans_updated)
    }

    const changeMax = (value) => {
        if (!value || value > 0) {
            const plans_updated = getAllPlans().map((aux) => {
                if (aux.name === plan.name)
                    return plan.setMax(value)
                return aux
            })

            changeSettings("plans", plans_updated)
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setName(value)
        setSaved(false)
        if (value === "") {
            setSaved(true)
        }
    }

    const changeName = () => {
        if (name === "") {
            window.alert("Please fill in the plan's name")
            return
        }

        if (getAllPlans().find((aux) => aux.name === name.toLowerCase())) {
            window.alert("There is already a plan with that name")
            return
        }

        changeAllPlans(plan.setName(name.toLowerCase()))
        setName("")
        setSaved(true)
    }

    const cancelChange = () => {
        setName("")
        setSaved(true)
    }

    return (
        <div className={style.planContainer}>
            <TimerSettings changePlan={changeAllPlans}/>

            <div className={`${style.section} ${style.maxSession}`}>
                <NumberInput id="inputName" text="Number of pomodoros per session" value={plan.getMaxSessions} handleChange={event => changeMax(event.target.value)} />
            </div>

            <div className={`${style.section} ${style.change_name}`}>
                <input id="nameInput" type="text" placeholder={plan.getName} value={name} onChange={handleChange} />
                {saved ? 
                    <label htmlFor="nameInput"><FontAwesomeIcon className={`${style.icon} ${style.editIcon}`} icon={faPenToSquare}/></label> 
                : 
                    <>
                        <FontAwesomeIcon onClick={changeName}className={`${style.icon} ${style.changeIcon}`} icon={faSquareCheck}/>
                        <FontAwesomeIcon onClick={cancelChange}className={`${style.icon} ${style.cancelIcon}`} icon={faSquareXmark}/>
                    </> 
                }
            </div>    
        </div>
    )
}
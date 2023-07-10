import React, { useContext } from "react"
import { NewSettingsContext } from "../../context/NewSettingsContext";

import style from "../../assets/styles/settings.module.css"

export default function Save(props) {
	const { getMainPlan, saveSettings, validateValues } = useContext(NewSettingsContext)
	const plan = getMainPlan()

    function handleSave(event) {
		if (validateValues(event))
			saveSettings()
	}

    return (
        <a href="/pomodoro" ><button onClick={handleSave} className={style.saveButton}>Save</button></a>
    )
}
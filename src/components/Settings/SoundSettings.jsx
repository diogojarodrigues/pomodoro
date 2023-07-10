import { useContext } from "react"

import style from "../../assets/styles/settings.module.css"

import CheckboxInput from "../Inputs/CheckboxInput"
import { NewSettingsContext } from "../../context/NewSettingsContext"

export default function SessionSettings() {
    const { getNotificationSound, getBackgroundMusic, changeSettings } = useContext(NewSettingsContext);

    return (
        <div className={style.section}>
            <CheckboxInput 
                text="Notification Sound" name="notificationSound" 
                checked={getNotificationSound()} onChange={changeSettings}
            />
            <CheckboxInput 
                text="Background music" name="backgroundMusic"
                checked={getBackgroundMusic()} onChange={changeSettings}
            />
        </div>
    )
}
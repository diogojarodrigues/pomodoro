import OtherSettings from "../../components/Settings/OtherSettings"
import AdvancedSettings from "../../components/Settings/AdvancedSettings"
import SessionSettings from "../../components/Settings/SessionSettings"
import SoundSettings from "../../components/Settings/SoundSettings"
import TimerSettings from "../../components/Settings/TimerSettings"


import { useContext } from "react"
import { NewSettingsContext } from "../../context/NewSettingsContext"

export default function MainPlan() {
    const { getAdvancedSettings, getMainPlan, changeSettings } = useContext(NewSettingsContext);

    const changeMainPlan = (newPlan) => {
        changeSettings("mainPlan", newPlan)
    }

    return (
        <>
            <TimerSettings plan={getMainPlan()} changePlan={changeMainPlan} />

            <SessionSettings />
            <SoundSettings />
            { getAdvancedSettings() && <OtherSettings /> }

            <AdvancedSettings />
        </>
    )
}
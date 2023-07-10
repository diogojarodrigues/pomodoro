import { useContext, useState, useEffect, useRef } from "react"

import { PomodoroContext } from "../../context/PomodoroContext"
import { SettingsContext } from "../../context/SettingsContext"

import SettingsButton from "../../components/Buttons/SettingsButton"
import Session from "./Session"
import Play from "./Play"
import PlanBarHome from "../../components/Home/PlanBarHome"
import State from "../../components/Home/State"

import backgroundSound from "../../assets/sounds/BackgroundSound/Daytime Forrest Bonfire.mp3"

export default function Home() {
	const { isInSession } = useContext(PomodoroContext)
	const { settings } = useContext(SettingsContext)

	const soundref = useRef(new Audio(backgroundSound))

	function playSound() {
		const sound = soundref.current
		if (!settings.backgroundMusic) {
			sound.pause() // stop the current sound if it exists
		} else {
			sound.currentTime = 0
			sound.loop = true
			sound.play()
		}
	}

	playSound()

	return (
		<div>
			{isInSession ? <Session /> : <Play />}
			{isInSession && <State /> }
			<SettingsButton />
			{!settings.hidePlansBar && !isInSession && <PlanBarHome />}
		</div>
	)
}
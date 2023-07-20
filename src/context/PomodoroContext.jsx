import React, { createContext, useContext, useEffect, useState } from "react"
import { SettingsContext } from "./SettingsContext"
import notificationSound from "../assets/sounds/NotificationSound/Ship Bell.mp3"

export const PomodoroContext = createContext()

const PomodoroContextProvider = (props) => {
	const { settings, getPlanByName } = useContext(SettingsContext) 

	const [activePlan, setActivePlan] = useState(settings.activePlan);
	const [isInSession, setIsInSession] = useState(false)
	const [isPlaying, setIsPlaying] = useState(true)
	const [pomodoro, setPomodoro] = useState(inicialPomodoroValues)	

	if (!isInSession) {
		document.title = `Pomodoro`
	}

	useEffect(() => {
		setPomodoro(inicialPomodoroValues)
		console.log("A")
	}, [activePlan])

	console.log("PomodoroContextProvider: ", pomodoro)
	console.log(activePlan, isInSession, isPlaying)

	useEffect(() => {
		if (settings.refresh) {
			setIsPlaying(true)
			setIsInSession(false)
			setActivePlan(settings.activePlan)
			setPomodoro(inicialPomodoroValues)
			console.log("B")
		}

		console.log("C")
	}, [settings])

	function inicialPomodoroValues() {
		const active_plan = getPlanByName(activePlan)

		const pomodoro = {
			count: 1,
			active: "work",
			duration: active_plan.work,
			plan: active_plan,
			colors: [...settings.colors.work],
		}

		console.log("inicialPomodoroValues", pomodoro)

		return pomodoro
	}

	//Load state of session from local storage
	useEffect(() => {
		const storedPomodoro = JSON.parse(localStorage.getItem("MY_POMODORO_APP_STATE"))
		if (storedPomodoro) { 
			setIsInSession(storedPomodoro.isInSession)
			setIsPlaying(storedPomodoro.isPlaying)
			setPomodoro(storedPomodoro.pomodoro) 
		}
	}, [])

	//Save state of session in local storage
	useEffect(() => {
		localStorage.setItem("MY_POMODORO_APP_STATE", JSON.stringify({
			isInSession: isInSession,
			isPlaying: isPlaying,
			pomodoro: pomodoro
		}))
	}, [pomodoro, isPlaying, isInSession])

	function startSession() { setIsInSession(true) }
	function finishSession() { setIsInSession(false) }
	function playPausePomodoro() { setIsPlaying(!isPlaying) }

	function playSound() {
		if (!settings.notificationSound)
			return
		
		const sound = new Audio(notificationSound)
		sound.currentTime = 0
		sound.play()

		setTimeout(() => {
			sound.pause()
		}, 4000)
	}

	const sendNotification = () => {
		//const { Notify } = Window;

		/**
		if (!Notify) {
			console.error('Desktop notifications not available in your browser.');
			return;
		}
		 */

		let body;

		if ( pomodoro.count === 2 * settings.max - 1) {		//Fim da sessão
			body = "Great job, You're now one step closer to achieve your goals!"
		} else if ( pomodoro.count % 2 === 1 ) {			//Fim do trabalho
			body = "Well done! You deserve a break after all that hard work!"
		} else {											//Fim da pausa
			body = "It's time to focus on your goals and push forward!"
		}
		/*
		const notification = new Notify("Pomodoro Session Over", {
			body: body,
			//icon: "path/to/icon.png" // optional
		});
		*/
		
		//notification.show();
		playSound();
	}

	const nextPomodoro = (back=false) => {
		let count
		if (back) {
			count = pomodoro.count - 1
		} else {
			count = pomodoro.count + 1
		}
		let auxActive = ""
		let auxTime = 0
		let auxColors = []

		if ( count === 2 * pomodoro.plan.max) {						//Long break
			auxActive = "long"
			auxTime = pomodoro.plan.long
			auxColors = [...settings.colors.long]
			//auxColors = settings.colors.long
		} else if (count <= 0 || count > 2 * pomodoro.plan.max) {    //End of session
			count = 1
			auxActive = "work"
			auxTime = pomodoro.plan.work
			auxColors = [...settings.colors.work]
			finishSession()
		} else if ( count % 2 === 1 ) {				//Work
			auxActive = "work"
			auxTime = pomodoro.plan.work
			auxColors = [...settings.colors.work]
			//auxColors = settings.colors.work
		} else {									//Short break
			auxActive = "short"
			auxTime = pomodoro.plan.short
			auxColors = [...settings.colors.short]
			//auxColors = settings.colors.short
		}

		if (count % 2 === 1) {              		//Work
			setIsPlaying(isPlaying && settings.autoRunPomodoros)
		} else {									//Pause
			setIsPlaying(isPlaying && settings.autoRunBreaks)
		}

		setPomodoro({
			count: count,
			active: auxActive,
			duration: auxTime,
			plan: pomodoro.plan,
			colors: auxColors,
		})
	}
	
	const next = () => {
		nextPomodoro()
	}

	const previus = () => {
		nextPomodoro(true)
	}

	const home = () => {
		setPomodoro(inicialPomodoroValues)
		setIsPlaying(true)
		setIsInSession(false)
	}

	const providerValue = {
		pomodoro, isPlaying, isInSession, activePlan, setActivePlan,
		playPausePomodoro, nextPomodoro, sendNotification,
		startSession, finishSession,
		home, next, previus,
	}

	return (
		<PomodoroContext.Provider value={providerValue}>
			{props.children}
		</PomodoroContext.Provider>
	)
}

export default PomodoroContextProvider

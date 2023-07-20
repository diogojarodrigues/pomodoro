import React, { createContext, useEffect, useState } from "react";
import mainPlan, { Plan, standardPlan, recommendedPlan } from "../assets/constants/Plan"
import color from "../assets/constants/Color"

export const SettingsContext = createContext()

const defaultSettings = {
	activePlan: "default",
	mainPlan: mainPlan,
	plans: [standardPlan, recommendedPlan],

	colors: color,
	
	autoRunPomodoros: false,
	autoRunBreaks: true,

	notificationSound: true,
	backgroundMusic: true,

	hidePlansBar: true,
	advancedSettings: false,
	refresh: false
}

const SettingsContextProvider = (props) => {
	const [settings, setSettings] = useState(loadSettings())

	console.log(settings)

	function loadSettings() {
		const storedSettings = JSON.parse(localStorage.getItem("MY_POMODORO_APP_SETTINGS"))
		
		let aux_settings;
		if (storedSettings) { 
			console.log("Settings loaded from local storage")
			aux_settings = {
				...storedSettings,
				mainPlan: Plan.parseObject(storedSettings.mainPlan),
				plans: storedSettings.plans.map(plan => Plan.parseObject(plan)),
			}
		} else {
			console.log("Settings loaded from default settings")
			aux_settings = {...defaultSettings}
		}

		return aux_settings;
	}
	

	//Save settings in local storage
	useEffect(() => {
		console.log("Settings saved in local storage")
		console.log(settings)
		localStorage.setItem("MY_POMODORO_APP_SETTINGS", JSON.stringify(settings))
	}, [settings])
	

	const updateSettings = (updatedSettings) => {
		setSettings(updatedSettings)
	}
	

	const sortFunction = (a, b) => {
		if (a.name === settings.activePlan) return -1
		if (b.name === settings.activePlan) return 1
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	}

	const getSelectedPlans = () => {
		let plans = settings.plans.filter(plan => plan.isSelected)

		if (settings.mainPlan.isSelected)
			plans = [settings.mainPlan, ...plans]

		return plans.sort(sortFunction)
	}

	const getPlanByName = (name) => {
		if (name === "default")
			return settings.mainPlan
		else
			return settings.plans.find(plan => plan.name === name)
	}

	const providerValue = {
		settings, updateSettings, getPlanByName, getSelectedPlans
	}

	return (
		<SettingsContext.Provider value={providerValue}>
			{props.children}
		</SettingsContext.Provider>
	)
}

export default SettingsContextProvider;
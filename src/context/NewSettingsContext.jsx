import React, { createContext, useContext, useState, useEffect } from 'react'
import { SettingsContext } from './SettingsContext'

import { Plan, standardPlan } from "../assets/constants/Plan"

export const NewSettingsContext = createContext(null)

const NewSettingsContextProvider = ({children}) => {
	const { settings, updateSettings } = useContext(SettingsContext)

    const [newSettings, setNewSettings] = useState(loadSettings());
    const [selectedPage, setSelectedPage] = useState("default");
    const [selectedPlan, setSelectedPlan] = useState(getMainPlan());

    function loadSettings() {
        if (settings.plans.length === 0) {
            return {...settings, advancedSettings: false, refresh: false}
        } else {
            return {...settings, refresh: false}
        }	
    }

    const saveSettings = () => { 
        const num_plans = newSettings.plans.length

        if (num_plans <= 1)
            newSettings.hidePlansBar = true

        updateSettings(newSettings) 
    }

    //Selected Page
    function getSelectedPage() { return selectedPage.toLowerCase() }
    function changeSelectedPage(pageName) { pageName ? setSelectedPage(pageName) : null}


    //Selected Plan
    function getSelectedPlan() { return selectedPlan }
    function changeSelectedPlan(planName) { 
        if (planName === "default")
            setSelectedPlan(getMainPlan())
        else{
            const aux = getPlanByName(planName)
            if (aux)
                setSelectedPlan(aux) 
            else
                console.log("Plan not found")
        }
    }

    //Getter Settings
    function getMainPlan() { return newSettings.mainPlan }
    function getAllPlans() { return newSettings.plans }
    function getActivePlan() { return newSettings.activePlan }
    function getPlanByName(name) { return newSettings.plans.find(plan => plan.name === name) }
    function getColors() { return newSettings.colors }
    function getAutoRunPomodoros() { return newSettings.autoRunPomodoros }
    function getAutoRunBreaks() { return newSettings.autoRunBreaks }
    function getNotificationSound() { return newSettings.notificationSound }
    function getBackgroundMusic() { return newSettings.backgroundMusic }
    function getAdvancedSettings() { return newSettings.advancedSettings }
    function getHidePlansBar() { return newSettings.hidePlansBar }

    //Functions
    const changeSettings = (name, value=null) => {
        let aux = { ...newSettings };

        if (name === 'mainPlan' || name === 'plans' || name === 'colors' || name === 'activePlan') {
            aux[name] = value;
        } else {
            aux[name] = !aux[name];
        }

        setNewSettings(aux);
    };
      
    const changeAllPlans = (newPlan) => {
        if (!(newPlan instanceof Plan)) {
            console.log("Invalid plan")
            return;
        }

        const plans_updated = getAllPlans().map((plan) => {
            if (plan.name === newPlan.name)
                return newPlan
            return plan
        })

        changeSettings("plans", plans_updated)
    }

    const deletePlan = (planName) => {
        const plans_updated = getAllPlans().filter((plan) => plan.name !== planName)
        changeSettings("plans", plans_updated)
    }

    const addPlan = (e) => {

        if (validateValues(e) === false) return;

		if (newSettings.plans.length >= 5){
			window.alert("Sorry, you can't have more than 5 plans")
			return
		}

        let count = 1
        let name = `plan ${newSettings.plans.length + count}`
        while (getPlanByName(name) !== undefined) {
            count++
            name = `plan ${newSettings.plans.length + count}`
        }

        const newPlan = new Plan (
            name,
            standardPlan.work,
            standardPlan.short,
            standardPlan.long,
            standardPlan.max,
            true
        )

		setNewSettings({
			...newSettings,
			plans: [...newSettings.plans, newPlan]
		})

        setSelectedPage(newPlan.name)
        setSelectedPlan(newPlan)
	}

    const validateValues = (event) => {
        const plan = getSelectedPlan()   
        
        if (
            plan.work <= 0 ||
            plan.short <= 0 ||
            plan.long <= 0 ||
            plan.max <= 0
        ) {
            event.preventDefault()
            window.alert("Something went wrong. Check if all fields are correct")
            return false
        }

        if (plan.work > 60 * 3 && plan.isSure === false) {
            if (!window.confirm("You must be a real hardworker. Are you sure you want to work for more than 3 hours straight?")) {
                event.preventDefault()
                return false
            }
        } else if (plan.short > 60 * 2 && plan.isSure === false) {
            if (!window.confirm("You must have been working hard. Do you need all that rest to be fully recover?")) {
                event.preventDefault()
                return false
            }
        }

        setSelectedPlan(plan.setSure())
        changeAllPlans(plan.setSure())        
        return true
    }
    
    const showPlansBar = () => {
        setNewSettings({
            ...newSettings,
            hidePlansBar: false
        })
    }

    const setRefreshTrue = () => {
        setNewSettings(prevSettings => ({...prevSettings, refresh: true}))
    }

    const providerValue = {
        //Others
        saveSettings, getSelectedPage, changeSelectedPage, getSelectedPlan, changeSelectedPlan,
        //Getters
        getMainPlan, getAllPlans, getPlanByName, getColors, getAutoRunPomodoros, getAutoRunBreaks, 
        getNotificationSound, getBackgroundMusic, getAdvancedSettings, getHidePlansBar, getActivePlan,
        //Functions
        changeSettings, addPlan, deletePlan, validateValues, changeAllPlans, showPlansBar, 
        newSettings, setNewSettings, setRefreshTrue
    }
    
    return (
        <NewSettingsContext.Provider value={providerValue}>
            {children}
        </NewSettingsContext.Provider>
    )
}

export default NewSettingsContextProvider;

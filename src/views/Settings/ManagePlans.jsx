import React, { useState, useContext, useEffect } from "react";
import { NewSettingsContext } from "../../context/NewSettingsContext";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash, faEyeSlash, faEye, faSquareCheck, faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import style from "../../assets/styles/settings.module.css";

const sortFunction = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
};

const sortPlans = (plans, activePlanName) => {
    const activePlan = plans.find((plan) => plan.name === activePlanName);
    const selectedPlans = plans.filter((plan) => plan.isSelected && plan.name !== activePlanName).sort(sortFunction);
    const unselectedPlans = plans.filter((plan) => !plan.isSelected && plan.name !== activePlanName).sort(sortFunction);

    return {
        "activePlan": activePlan,
        "selectedPlans": selectedPlans,
        "unselectedPlans": unselectedPlans
    }
};

export default function ManagePlans() {
    const { getAllPlans, getMainPlan, getActivePlan, changeAllPlans, changeSettings, deletePlan, setRefreshTrue } = useContext(NewSettingsContext)

    useEffect(() => {}, [getAllPlans()])

    const [isHover, setIsHover] = useState("");
    function handleMouseEnter(name) { setIsHover(name); }
    function handleMouseLeave() { setIsHover(""); }
    
    const allPlans = getAllPlans().concat(getMainPlan());
    const sortedPlans = sortPlans(allPlans, getActivePlan());

    const mainPlan = htmlPlan(sortedPlans.activePlan);
    const selectedPlans = sortedPlans.selectedPlans.map((plan) => htmlPlan(plan));
    const unselectedPlans = sortedPlans.unselectedPlans.map((plan) => htmlPlan(plan));

    function htmlPlan(plan) {
    
        const handleSelectPlan = () => { changeAllPlans(plan.toggleSelected()); }
        const handleDeletePlan = () => { deletePlan(plan.name); }
        const makeActivePlan = () => {
            changeAllPlans(plan.turnSelectedOn());
            changeSettings("activePlan", plan.name);
            setRefreshTrue();
        }
    
        if (plan.name === getActivePlan()) {
            return (
                <div className={style.managePlan} key={plan.name}>
                    <div className={`${style.overlay} ${style.activePlan}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <FontAwesomeIcon className={style.arrowIcon} icon={faCaretRight} />
                        <p>{plan.name}</p>
                        <FontAwesomeIcon className={style.arrowIcon} icon={faCaretLeft} />
                    </div>
                </div>
            );
        }
    
        return (
            <div className={style.managePlan} key={plan.name}>
                <div className={style.overlay} onMouseEnter={() => handleMouseEnter(plan.name)} onMouseLeave={handleMouseLeave}>
                    <p>{plan.name}</p>
                    {isHover===plan.name && plan.name !== "default" && <FontAwesomeIcon onClick={handleDeletePlan} className={`${style.manageIcon} ${style.deleteIcon}`} icon={faTrash} />}
                </div>
                
                {plan.isSelected ? 
                    <FontAwesomeIcon className={`${style.manageIcon} ${style.selectIcon}`} onClick={handleSelectPlan} icon={faEye}/> 
                : 
                    <FontAwesomeIcon className={`${style.manageIcon} ${style.selectIcon}`} onClick={handleSelectPlan} icon={faEyeSlash}/> 
                }
                <FontAwesomeIcon onClick={makeActivePlan} className={`${style.manageIcon} ${style.activeIcon}`} icon={faSquareCheck} />
            </div>
        );
    };

    return (
        <div className={style.managePlansContainer}>
            <div> {mainPlan} </div>
            <div className={style.managePlansSection}> {selectedPlans} </div>
            <div className={style.managePlansSection}> {unselectedPlans} </div>
        </div>
    )
}
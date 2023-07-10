import style from "../../assets/styles/settings.module.css";

import { useContext } from "react";
import { NewSettingsContext } from "../../context/NewSettingsContext";

export default function SideBar() {
    const { getAllPlans, changeSelectedPage, changeSelectedPlan, getSelectedPage, validateValues, addPlan, getAdvancedSettings } = useContext(NewSettingsContext);

    const handleClick = (e) => {
        const pageName = e.target.innerText.toLowerCase();
        if (validateValues(e)) {
            changeSelectedPage(pageName);
            changeSelectedPlan(pageName);
        } else {
            console.log("SOMETHING WENT WRONG")
        }
    };

    const PageTittle = ({title, className}) => {
        return (
            <p 
                onClick={handleClick}
                className={`${style.sideBarPage} ${className} ${getSelectedPage() === title.toLowerCase() ? style.sideBarPageSelected : ""}`}
            >
                {title}
            </p>
        )
    }

    const allPages = [
        <PageTittle className={style.sideBarMainPlan} key="default" title="default" />,
        <PageTittle className={style.sideBarAllPlans} key="allPlans" title="manage plans" />,

        ...(getAllPlans() ? getAllPlans().map((plan) => (
            <PageTittle key={plan.name} title={plan.name} />
          )) : []),

        <p className={`${style.sideBarPage} ${style.sideBarCreatePlan}`} onClick={addPlan} key="createPlan">create plan</p>
    ];

    if (getAdvancedSettings()) {
        return (
            <div className={style.sideBar}>
                <h2 className={style.sideBarTitle}>Menu</h2>
                {allPages}
            </div>
        )
    }

    else return
}

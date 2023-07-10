import style from "../../assets/styles/settings.module.css";

import { useContext } from "react";
import { NewSettingsContext } from "../../context/NewSettingsContext";

import MainPlan from "./MainPlan";
import AlternativePlan from "./AlternativePlan";
import ManagePlans from "./ManagePlans.jsx"

export default function Main() {
    const { getAdvancedSettings, getSelectedPage } = useContext(NewSettingsContext);
    
    let selectedComponent;
    switch(getSelectedPage()) {
        case "default":
            selectedComponent = <MainPlan />;
            break;
        case "manage plans":
            selectedComponent = <ManagePlans />;
            break;
        default:
            selectedComponent = <AlternativePlan />;
    }
    
    return (
        <div className={`${style.mainContent} ${getAdvancedSettings ? style.wideMainContent : style.wideNarrowContent }`}>
            {selectedComponent}
        </div>
    )
}

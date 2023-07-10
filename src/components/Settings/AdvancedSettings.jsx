import style from "../../assets/styles/settings.module.css"
import { useContext } from "react";
import { NewSettingsContext } from "../../context/NewSettingsContext";

import { standardPlan, recommendedPlan } from "../../assets/constants/Plan";

export default function AdvancedSettings() {
	const { getAdvancedSettings, changeSelectedPage, newSettings, changeSelectedPlan, changeSettings, showPlansBar, getAllPlans, setNewSettings } = useContext(NewSettingsContext);

  	const turnAdvancePlansOn = () => {
		if (window.confirm("Are you sure, that you want to activate the advanced plan customization?\nYou can always revert this option later")) {
			
			if (getAllPlans().length === 0) {
				setNewSettings({
					...newSettings,
					"plans": [standardPlan, recommendedPlan],
					"advancedSettings": true,
					"hidePlansBar": false,
				})
			} else {
				setNewSettings({
					...newSettings,
					"advancedSettings": true,
					"hidePlansBar": false,
				})
			}
		}

  	};

  	const turnAdvancePlansOff = () => {
		window.alert(
			"Plans advanced options were disabled!\nDon't worry, your plans are safe\nYou can access them again by clicking on \"Advance plans customization?\""
		);

		changeSettings("advancedSettings");
		changeSelectedPage("default");
		changeSelectedPlan("mainPlan");
 	};

  	return (
		<div className={style.advancedContainer}>
			{ getAdvancedSettings() ?
				<p onClick={turnAdvancePlansOff}>Disable multiple plans?</p>
			: 
				<p onClick={turnAdvancePlansOn}>Add multiple plans?</p>
			}
		</div>
	);
}

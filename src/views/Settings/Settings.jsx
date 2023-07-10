import React, { useState, useEffect, useContext } from "react";
import style from "../../assets/styles/settings.module.css";

import NewSettingsContextProvider from "../../context/NewSettingsContext";

import SaveButton from "../../components/Buttons/SaveButton";
import QuitButton from "../../components/Buttons/QuitButton";
import Page from "./Main"
import SideBar from "./SideBar"

export default function Settings() {
	useEffect(() => {
		document.body.classList.add(style.blurBackground);
		return () => {
		  document.body.classList.remove(style.blurBackground);
		};
	}, []);

	return (

			<NewSettingsContextProvider >
				{<div className={style.outerContainer}>
					<QuitButton />

					<div className={style.innerContainer}>
						<SideBar />
						<Page />	
					</div>
					
					<SaveButton />
				</div>}
			</NewSettingsContextProvider>
	)
}
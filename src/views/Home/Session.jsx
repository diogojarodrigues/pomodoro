import React, { useContext, useState } from "react"
import style from "../../assets/styles/home.module.css"


import { PomodoroContext } from '../../context/PomodoroContext'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

import PomodoroTimer from "../../components/Home/PomodoroTimer"

export default function Session() {
	const { next, home, previus } = useContext(PomodoroContext)

	function handleOnClickHome() { home() }
	function handleOnClickNext() { next() }
	function handleOnClickPrevious() { previus() }

	return (
		<div className={style.timerContainer}>
				<PomodoroTimer />

				<div className={style.timerMenu}>
					<FontAwesomeIcon icon={faArrowLeft} className={style.timerIcon} onClick={handleOnClickPrevious}/>
					<FontAwesomeIcon icon={faHome} className={style.timerIcon} onClick={handleOnClickHome}/>
					<FontAwesomeIcon icon={faArrowRight} className={style.timerIcon} onClick={handleOnClickNext}/>
				</div>			
		</div>
	)
}
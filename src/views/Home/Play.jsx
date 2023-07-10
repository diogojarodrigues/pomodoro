import React, { useContext } from "react"
import { PomodoroContext } from '../../context/PomodoroContext'
import style from "../../assets/styles/home.module.css"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'


export default function Play() {
	const { startSession } = useContext(PomodoroContext)

	return (
		<div>
			<FontAwesomeIcon icon={faPlayCircle} className={style.playButton} onClick={startSession}/>
		</div>
	)
}
import React, { useContext, useState, useEffect } from "react";
import style from "../../assets/styles/home.module.css"

import { PomodoroContext } from '../../context/PomodoroContext'

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'

const PomodoroTimer = () => {
	const { isPlaying, pomodoro, nextPomodoro, playPausePomodoro, sendNotification } = useContext(PomodoroContext)
	
	const [isHovering, setIsHovering] = useState(false)
	const [colors, setColors] = useState(pomodoro.colors)
	const [duration, setDuration] = useState(pomodoro.duration * 60)
	const [key, setKey] = useState(pomodoro.count)
	  
	useEffect( () => {
		setKey(pomodoro.count)
		setDuration(pomodoro.duration * 60)
		setColors(pomodoro.colors)
	}, [pomodoro])

	function handleMouseEnter() { setIsHovering(true) }
	function handleMouseLeave() { setIsHovering(false) }
	function handleMouseOnClick() { playPausePomodoro() }

	const handleOnComplete = () => {
		sendNotification() 
		nextPomodoro() 
	}	

	const children = ({ remainingTime }) => {
		if (isHovering) {
			if (isPlaying) {
				return <FontAwesomeIcon icon={faPause} className={style.timerClockIcon}/>
			} else {
				return <FontAwesomeIcon icon={faPlay} className={style.timerClockIcon}/>
			}
		}

		
		const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0')
		const minutes = Math.floor(remainingTime / 60 % 60).toString().padStart(2, '0')
		const seconds = (remainingTime % 60).toString().padStart(2, '0')

		return <p className={hours>0 ? style.timerClockSmallText : style.timerClockBigText }>{`${hours > 0 ? hours + ':' : ''}${minutes}:${seconds}`}</p>;
	}

	return (
		<div className={style.timerClock}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleMouseOnClick}
		>

			<CountdownCircleTimer
				key={key}
				isPlaying={isPlaying}
				duration={duration}
				colors={colors}
				//colors={"url(#your-unique-id"}
    			colorsTime={[duration, duration/2, 0]}
				strokeWidth={9}
				size={350}
				trailColor="#FFFFFF"
				onComplete={handleOnComplete}
			>
				{children}
			</CountdownCircleTimer>

		</div>
	)
}

export default PomodoroTimer;
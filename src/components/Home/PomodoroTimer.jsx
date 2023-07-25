import React, { useContext, useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';

import style from "../../assets/styles/home.module.css"

import { PomodoroContext } from '../../context/PomodoroContext'

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'

const PomodoroTimer = () => {
	const { isPlaying, pomodoro, nextPomodoro, playPausePomodoro, sendNotification } = useContext(PomodoroContext)
	const isMobile = useMediaQuery({maxWidth: 767})

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
	function handleMobileClick() { 
		playPausePomodoro() 
		
		setIsHovering(true)

		setTimeout(() => {
			setIsHovering(false);
			}, 1000);

	}


	const handleOnComplete = () => {
		sendNotification() 
		nextPomodoro() 
	}	

	const children = ({ remainingTime }) => {

		const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0')
		const minutes = Math.floor(remainingTime / 60 % 60).toString().padStart(2, '0')
		const seconds = (remainingTime % 60).toString().padStart(2, '0')

		const updateTitle = () => {
			document.title = `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds} - Pomodoro`;
		}
		window.requestAnimationFrame(updateTitle);

		//document.title = `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds} - Pomodoro`;
		// console.log("");

		if (isHovering) {

			if (isMobile)
				return <FontAwesomeIcon icon={!isPlaying ? faPause : faPlay} className={style.timerClockIcon}/>

			return <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className={style.timerClockIcon}/>
			
		}
		
		

		return <p className={hours>0 ? style.timerClockSmallText : style.timerClockBigText }>{`${hours > 0 ? hours + ':' : ''}${minutes}:${seconds}`}</p>;
	}

	const Timer = () => {
		return (
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
		)
	}


	return (
		<>
			{ isMobile ? (
				<div 
					onClick={handleMobileClick}
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
				>
				{Timer()}
			  </div>
			  
			) : (
				<div className={style.timerClock}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={handleMouseOnClick}
				>
					{Timer()}
				</div>
			)
			}
		</>
	)
}

export default PomodoroTimer;
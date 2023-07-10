const red = () => {
	return (
		<svg>
			<defs>
			<linearGradient id="red" x1="1" y1="0" x2="0" y2="0">
				<stop offset="5%" stopColor="gold" />
				<stop offset="95%" stopColor="red" />
			</linearGradient>
			</defs>
		</svg>
	)
}
const blue = () => {
	return (
		<svg>
			<defs>
			<linearGradient id="ble" x1="1" y1="0" x2="0" y2="0">
				<stop offset="5%" stopColor="blue" />
				<stop offset="95%" stopColor="green" />
			</linearGradient>
			</defs>
		</svg>
	)
}
const green = () => {
	return (
		<svg>
			<defs>
			<linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
				<stop offset="5%" stopColor="pink" />
				<stop offset="95%" stopColor="yellow" />
			</linearGradient>
			</defs>
		</svg>	
	)
}
	
const changingColors = {
	work:  ["#ff0000", "#ff6800", "#fff000",],		//RED
	short:  ["#8f00ff", "#0061ff", "#00f7ff",],		//BLUE
	long:  ["#00ffbd", "#00ff0f", "#ecff00",],		//GREEN
}

const fadeColors = {
	work:  red(),
	short:  blue(),						//RED
	long:  green(),			//RED
}


export default changingColors
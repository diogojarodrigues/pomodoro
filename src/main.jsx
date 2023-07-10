import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import SettingsContextProvider from './context/SettingsContext'
import PomodoroContextProvider from './context/PomodoroContext'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<SettingsContextProvider>
			<PomodoroContextProvider>
				<App />
			</PomodoroContextProvider>
		</SettingsContextProvider>
	</BrowserRouter>
)

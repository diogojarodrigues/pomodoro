import { Routes, Route } from 'react-router-dom';

import Home from "./views/Home/Home"
import Settings from './views/Settings/Settings'
import "./assets/styles/app.css"


function App() {

	return (
		<Routes>
			<Route path="/pomodoro" element={<Home />} />
			<Route path="/pomodoro/settings" element={<Settings />} />		
		</Routes>
	);
	
}

export default App;

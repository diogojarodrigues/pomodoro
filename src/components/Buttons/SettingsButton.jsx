import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGear} from '@fortawesome/free-solid-svg-icons'

import style from "../../assets/styles/home.module.css"

export default function Options() {
    return (
        <a href="/settings" className={style.settingsButton}><FontAwesomeIcon icon={faGear} /></a>
    )
}


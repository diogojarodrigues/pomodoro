import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import style from "../../assets/styles/settings.module.css"

export default function Quit() {
    return (
        <a href="/" className={style.quitButton}><FontAwesomeIcon icon={faXmark}/></a>
    )
}
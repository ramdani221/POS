import AlertDropdown from "./AlertDropdown";
import { useState } from "react";

export default function Alert() {
    const [dropped, setDropped] = useState(false);
    return (
        <li className="nav-item dropdown no-arrow mx-1">
        <button className="nav-link dropdown-toggle" id="alertsDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setDropped(!dropped)}>
            <i className="fas fa-bell fa-fw"></i>
            <span className="badge badge-danger badge-counter">3+</span>
        </button>
        <AlertDropdown dropped={dropped}/>
    </li>
    )
}
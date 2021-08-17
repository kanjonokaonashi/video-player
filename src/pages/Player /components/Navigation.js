import React from "react";
import nav, {Link} from "react-router-dom";

const Navigation = () => {

    return (
        <nav className="navMenu">
            <h3>VideoPlayers</h3>
            <ul className="nav-links">

                <Link to="/" >
                    <li>
                        Homepage
                    </li>
                </Link>
                <Link to="/video_player" >
                    <li>
                        Video Player
                    </li>
                </Link>
                <Link to="/player" >
                    <li>
                        Video PLayer with service
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navigation;


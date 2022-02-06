import { SearchMini } from "../svgs/SearchMini"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlane } from '@fortawesome/free-solid-svg-icons';
import { HeartSvg } from "../../assets/img/stay-details/HeartSvg";
export function MobileNavBar({ onChanegPage, user, handleUserLogin }) {

    return <nav className="mobile-main-nav main-container">
        <section className="nav-bar wide high flex align-center space-between">
            <div onClick={() => onChanegPage('home')} className="home flex align-center column fh26">
                <FontAwesomeIcon className="home clr3" icon={faHome} />
                <h1>Home</h1>
            </div>
            <div onClick={() => onChanegPage('explore')} className="explore flex align-center column fh26">
                <SearchMini className="icon" />
                <h1>Explore</h1>
            </div>
            <div onClick={() => onChanegPage('host')} className="host flex align-center column fh26 relative">
                {(user && user.notifications.orders !== 0) && <div div className="menu-notification fs13 flex justify-center align-center host">{user.notifications.orders}</div>}
                <HeartSvg className="icon heart" />
                <h1>Become A Host</h1>
            </div>
            <div onClick={() => onChanegPage('trip')} className="my-trips flex align-center column fh26 relative">
                {(user && user.notifications.trips !== 0) && <div div className="menu-notification fs13 flex justify-center align-center trip ">{user.notifications.trips}</div>}
                <FontAwesomeIcon className="icon user clr3" icon={faPlane} />
                <h1>My trips</h1>
            </div>

            <div onClick={handleUserLogin} className="user-menu flex align-center column fh26">
                <FontAwesomeIcon className="icon user clr3" icon={faUser} />
                <h1>{user ? 'logout' : 'login'}</h1>
            </div>

        </section>
    </nav >

}
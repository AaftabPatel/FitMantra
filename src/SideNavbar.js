import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const SideNavbar = ({ isOpen, toggleSideNavbar }) => {
  return (
    <div className={`sideNavbar ${isOpen ? 'open' : ''}`}>
    	<div className="SideNavbar" onClick={toggleSideNavbar}>
        <img src={logo} alt="logo" height="60em" width="60em" />
        <button className="closeBtn" onClick={toggleSideNavbar}>X</button>
				<Link to="/" className="sideNavLink" onClick={toggleSideNavbar}>
				<i className="fa fa-home"></i>Home</Link>

				<Link to="/ChatBot" className="sideNavLink">
				<i class="fa fa-comment"></i>Chat Bot</Link>

				<Link to="/Chat" className="sideNavLink">
				<i class="fa fa-comments"></i>Forum Chat</Link>

				<Link to="/Yoga" className="sideNavLink">
				<i class="fa fa-heartbeat"></i>Yoga</Link>

				<Link to="/Membership" className="sideNavLink">
				<i className="fa fa-users"></i>Membership</Link>

				<Link to="/TrainerBooking" className="sideNavLink">
				<i className="fa fa-address-book"></i>TrainerBooking</Link>

				<Link to="/#about" className="sideNavLink">
				<i className="fa fa-info-circle"></i>AboutUs</Link>

				<Link to="/#ContactUs" className="sideNavLink">
				<i className="fa fa-phone-square"></i>ContactUs</Link>

				<hr /><button><i className="fa fa-sign-out"></i>LogOut</button>
			</div>
		</div>
	);
}

export default SideNavbar;
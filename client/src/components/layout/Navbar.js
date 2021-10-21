import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { socket } from "../../sockets";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout, notification: { notifications } }) => {
  useEffect(() => {
    socket.on("likeNotif", (data) => {
      if (user && user._id === data.to) {
        console.log(data);
        console.log(data.message);
      }
    });
  }, [user]);

  const Show = () => {
    document.querySelector(".box_notif").classList.toggle("showing");
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <a className='notBtn_notif' onClick={() => Show()}>
          <i className='fas fa-bell'></i>
        </a>
        <div className='box_notif '>
          <div className='display_notif'>
            <div className='cont_notif'>
              <div className='sec_notif'>
                <a href='#'>
                  <div className='txt_notif'>James liked your post: "Pure css notification box"</div>
                  <div className='txt_notif sub_notif'>11/7 - 2:30 pm</div>
                </a>
              </div>
              <div className='sec_notif'>
                <a href='#'>
                  <div className='txt_notif'>James liked your post: "Pure css notification box"</div>
                  <div className='txt_notif sub_notif'>11/7 - 2:30 pm</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});

export default connect(mapStateToProps, { logout })(Navbar);

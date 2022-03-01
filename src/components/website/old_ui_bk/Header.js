
import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';


import $ from 'jquery';
import jQuery from 'jquery';

import "./../../assets/website/css/styles.css"

import logoImg from './../../assets/website/img/logo-01.png';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {

  }

  render() {

    const { isLoggedIn, message } = this.props;

    
    return (
      <React.Fragment>
      
      <div class="header header-light dark-text">
        <div class="container">
          <nav id="navigation" class="navigation navigation-landscape">
            <div class="nav-header">
              <NavLink to={"/web"} class="nav-brand" >
               <img src={logoImg} class="logo" alt="" />
              </NavLink>
              <div class="nav-toggle"></div>
        
            </div>
            <div class="nav-menus-wrapper" style={{"transition-property": "none"}}>
              <ul class="nav-menu">
              
                <li> <NavLink to={"/web"} ><i class="fas fa-home"></i> Home</NavLink>
                </li> 
               <li> <NavLink to={"/web/live_auction"} ><i class="fas fa-video"></i> Live Auction</NavLink>
                </li> 
                 <li> <NavLink to={"/web/normal_auction"} ><i class="fas fa-ad"></i>Normal Ads</NavLink>
                </li>         
               
                
              </ul>
              
              <ul class="nav-menu nav-menu-social align-to-right">
                
                <li>
                  <a href="#" data-toggle="modal" data-target="#login"><i class="fa fa-user" aria-hidden="true"></i>Login</a>
                </li>
                
              </ul>
            </div>
          </nav>
        </div>
      </div>
      
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {

  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Header);
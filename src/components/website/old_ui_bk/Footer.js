import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';


import $ from 'jquery';
import jQuery from 'jquery';

import "./../../assets/website/css/styles.css"

import logoImg from './../../assets/website/img/logo-01.png';

class Footer extends Component {

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
          <footer class="dark-footer skin-dark-footer">
        <div class="footer-middle">
          <div class="container">
            <div class="row">
              
          
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div class="footer_widget">
                  <ul class="footer-menu">
                    <li><a href="#">About Us</a></li>
                  
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div class="footer_widget">
                  <ul class="footer-menu">
                    <li><a href="#">Services</a></li>
                  
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div class="footer_widget">
                  <ul class="footer-menu">
                    <li><a href="#">FAQs</a></li>
                    
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div class="footer_widget">
                  <ul class="footer-menu">
                    <li><NavLink to={"/web/live_auction"} >Live Auction</NavLink></li>
                    
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div class="footer_widget">
                  <ul class="footer-menu">
                    <li><NavLink to={"/web/live_auction"} >Normal Auction</NavLink></li>
                  
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12">
                <div class="footer_widget">
                  <ul class="footer-menu">
                    <li><a href="#">Contact Us</a></li>
                    
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        
      </footer>
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

export default connect(mapStateToProps)(Footer);
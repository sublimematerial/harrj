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
			 <div class="container">
		<div class="row">
			<div class="col-md-3">
				<div class="footer-1">
					<h1 class="footer-heading">CONTACT US</h1>
					<ul>
						<li><a href="tel: +44 345 678 903 ">+44 345 678 903 </a></li>
						<li><a href="mailto:Harrj@mail.com">Harrj@mail.com </a></li>
						<li><a href="#">Find a Store</a></li>
					</ul>
				</div>
			</div>
			
			<div class="col-md-3">
				<div class="footer-1">
					<h1 class="footer-heading">CUSTOMER RERVICE</h1>
					<ul>
						
						<li><a href="#">My Orders </a></li>
						{/* <li><a href="#">Shipping</a></li>
						<li><a href="#">Returns </a></li>
						<li><a href="#">FAQ</a></li> */}
						<li><a href="#">Home</a></li>
						<li><a href="#">Live Auction</a></li>
						<li><a href="#">Normal Ads</a></li>
						


					</ul>
				</div>
			</div>			

			<div class="col-md-3">
				<div class="footer-1">
					<h1 class="footer-heading">INFORMATION</h1>
					<ul>
						<li><a href="#">About US  </a></li>
						{/* <li><a href="#">Work With US  </a></li> */}
						<li><a href="#">Privacy Policy  </a></li>
						<li><a href="#">Contact Us</a></li>
						{/* <li><a href="#">Terms  Conditions  </a></li> */}
						{/* <li><a href="#">Press Enquiries </a></li> */}
					</ul>
				</div>
			</div>	

			<div class="col-md-3">
				<div class="footer-1">
					<h1 class="footer-heading">Subscribe to Harrj via Email</h1>
					<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
					<form>
					<input type="email" name="your-email" placeholder="Email Address "/>
					<input type="submit" value="SUBSCRIBE"/>
					</form>
				</div>
			</div>				
			
			
			
		</div>
	</div>
			
			</footer>
			{/*  ============================ Footer End ==================================  */}
			
			
		  {/* Log In Modal  */}
			<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginmodal" aria-hidden="true">
				<div class="modal-dialog modal-xl login-pop-form" role="document">
					<div class="modal-content" id="loginmodal">
						<div class="modal-headers">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							  <span class="ti-close"></span>
							</button>
						  </div>
					
						<div class="modal-body p-5">
							<div class="text-center mb-4">
								<h2 class="m-0 ft-regular">Login</h2>
							</div>
							
							<form>				
								<div class="form-group">
									<label>User Name</label>
									<input type="text" class="form-control" placeholder="Username*"/>
								</div>
								
								<div class="form-group">
									<label>Password</label>
									<input type="password" class="form-control" placeholder="Password*"/>
								</div>
								
								<div class="form-group">
									<div class="d-flex align-items-center justify-content-between">
										<div class="flex-1">
											<input id="dd" class="checkbox-custom" name="dd" type="checkbox"/>
											<label for="dd" class="checkbox-custom-label">Remember Me</label>
										</div>	
										<div class="eltio_k2">
											<a href="#">Lost Your Password?</a>
										</div>	
									</div>
								</div>
								
								<div class="form-group">
									<button type="submit" class="btn btn-md full-width bg-dark text-light fs-md ft-medium">Login</button>
								</div>
								
								<div class="form-group text-center mb-0">
									<p class="extra">Not a member?<a href="#et-register-wrap" class="text-dark"> Register</a></p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		
			<a id="back2Top" class="top-scroll" title="Back to top" href="#"><i class="ti-arrow-up"></i></a>
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

import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';


import $ from 'jquery';
import jQuery from 'jquery';

import "./../../assets/website/css/styles.css"

import logoImg from './../../assets/website/img/logo-01.png';
import "./../../assets/website/css/styles.css"
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Popup from "../website/Popup"

import logo from  './../../assets/website/img/livebid/logo.png';
import home_icon from './../../assets/website/img/livebid/home_icon.svg';
import video_icon from './../../assets/website/img/livebid/video_icon.svg';
import Rectangle from './../../assets/website/img/livebid/Rectangle-294.svg';
import user_icon from './../../assets/website/img/livebid/user_icon.svg';


import { AdminLogin,register } from "./../../actions/auth";
import {toast} from 'react-toastify';
class Header extends Component {

  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.onChangeEmailID = this.onChangeEmailID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMobile=this.onChangeMobile.bind(this);
    this.onChangeName=this.onChangeName.bind(this);
    this.onChangeRegiserMobile=this.onChangeRegiserMobile.bind(this);
   this.onChangeRegisterEmailID=this.onChangeRegisterEmailID.bind(this);
   this.onChangeRegisterPassword=this.onChangeRegisterPassword.bind(this);
    this.state = { showPopup: false ,email_id:"",
    password:"", mobile_no:"",name:"",register_email_id:"",register_mobile_no:"",register_password:""};

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
   
    var lang
    lang = localStorage.getItem("userId");
    console.log("value of lang is")
    console.log(lang)
    if(lang!=null){
      console.log(lang)
      this.setState({
        showPopup: true
      });
    }

  }

  onChangeEmailID(e) {
    console.log("email id is i")
    console.log(e.target.value)
    this.setState({
      email_id: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeRegiserMobile(e) {
    this.setState({
      register_mobile_no: e.target.value,
    });
  }
  onChangeRegisterEmailID(e) {
    this.setState({
      register_email_id: e.target.value,
    });
  }
  onChangeRegisterPassword(e) {
    this.setState({
      register_password: e.target.value,
    });
  }
  onChangeMobile(e) {
    this.setState({
      mobile_no: e.target.value,
    });
  }
  handleLoginSubmit(e) {
    e.preventDefault();
console.log("submit btuon")
  

  // this.Addmodalform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(AdminLogin(this.state.email_id, this.state.password))
        .then((response) => {
         
          if(response.success || response.success ==="true" || response.success ===true){
            toast.success('successful..!', {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
              showPopup: true
            });
            $('#popuplogin').modal('hide')
        }else{
          toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
        })
        .catch(() => {
         
          toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        });
    } else {
      
      toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }
  }
  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();
	$('#createad').modal('hide');

   
  }
  handleRegisterSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });
    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(register(this.state.name, this.state.register_mobile_no,this.state.register_email_id   ,this.state.register_password   ))
        .then((response) => {
         
          if(response.success || response.success ==="true" || response.success ===true){
            toast.success('successful..!', {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
              showPopup: true
            });
            $('#popuplogin').modal('hide')
        }else{
          toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
        })
        .catch(() => {
         
          toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        });
    } else {
      
      toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }

   
	$('#popupregister').modal('hide');

   
  }

  showRegister=(e) =>{
    $('#popupregister').modal('show')
  }
showLogin =(e) =>{
  // localStorage.removeItem("userId")
  $('#popuplogin').modal('show')
}
showLogout=(e) =>{
  localStorage.removeItem("userId")
  this.setState({
    showPopup: false,
  });

 // $('#popuplogin').modal('show')
}
  render() {

    const { isLoggedIn, message } = this.props;

    
    return (
      <React.Fragment>
      <header>
	
	<div className="bottom-header">
	<div className="container">
		<div className="row">
			<div className="col-md-2">
		
				<div className="logo">
					<a href="index.html"><img src={logo}/></a>
				</div>
			</div>
				<div className="menulist-item" id="mySidenav">	
								<div className="col-md-10">
									<nav id='cssmenu'>
										<div id="head-mobile"></div>
										<div className="button"></div>
										<ul >
										<li className='active'><a href='/web'><img src={home_icon}/> HOME</a></li>
										{/* <li><a href="#"><img src={video_icon}/> LIVE AUTION</a></li> */}
										<li><a href="/web/live_auction"><img src={video_icon}/> LIVE AUTION</a></li>
										<li><a href="/web/normal_auction"><img src={Rectangle}/> NORMAL ADS </a></li>
										{this.state.showPopup ===true? (
                     <>
                     <li><a href="/web/myads"><img src={Rectangle}/> MY ADS </a></li>
										<li><a href="/web/mybids"><img src={Rectangle}/>MY BIDS </a></li>
                    </>
                    ):(null
                    
                    )}
                    <li><a href="#"><img src={user_icon}/> CONTACT </a></li>
                                       </ul>
									</nav>
                  {this.state.showPopup ===false? (
                     <>
									 <div className="signup-btn">
										<a href="javascript:void(0)" onClick={this.showLogin	} >E-SERVICES LOGIN</a>
										<a href="javascript:void(0)" onClick={this.showRegister	} >SIGN UP</a> 
									</div> 
                  </>
                    ):(
                      <div className="signup-btn">
                    	<a href="javascript:void(0)" onClick={this.showLogout	} >LOGOUT</a>
                    </div>
                    )}
   
								</div>
								
					</div>	
			</div>
		</div>
	</div>
	
	<div className="modal fade" id="createad" data-keyboard="false" data-backdrop="static">
    <div className="modal-dialog modal-dialog-centered modal-sm">
      <div className="modal-content">
      <div className="modal-header border-0 pb-0">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>

	  <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
        <div className="modal-header border-0 pb-0">
			 <input type="text" className="form-control" placeholder="Mobile Number" required />
			 <button className="btn btn-primary " type="submit">Submit</button>
          {/* <button type="button" className="close" data-dismiss="modal">&times;</button> */}
        </div>
        <div className="modal-body text-center pb-5 pt-0">
		</div>
		</Form>
		</div>
		</div>
		</div>
    <div className="modal fade" id="popuplogin" data-keyboard="false" data-backdrop="static">
    <div className="modal-dialog modal-dialog-centered modal-sm">
      <div className="modal-content">
      <div className="modal-header border-0 pb-0">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>

      <Form onSubmit={this.handleLoginSubmit} >
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" onChange={this.onChangeEmailID}/>
                      </div>

                      <div className="form-group">
                        <label>Mobile</label>
                        <input className="form-control" type="number" onChange={this.onChangeMobile} />
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label>Password</label>
                          </div>
                          {/*<div className="col-auto">
                            <a className="text-muted" href="forgot-password.html">
                              Forgot password?
                            </a>
                          </div>*/}
                        </div>
                        <input className="form-control" type="password" onChange={this.onChangePassword}/>
                      </div>
                      <div className="form-group text-center">
                        <button className="btn btn-primary account-btn" type="submit">Login</button>
                       {/* <NavLink to={"/admin/dashboard"} className="btn btn-primary account-btn" type="submit">Login</NavLink>*/}
                      </div>
                      <div className="account-footer">
                        <p><a href="register.html">Forgot password?</a></p>
                      </div>
                      <CheckButton
                          style={{ display: "none" }}
                          ref={(c) => {
                            this.checkBtn = c;
                          }}
                        />
                      {/*<div className="account-footer">
                        <p>Don't have an account yet? <a href="register.html">Register</a></p>
                      </div>*/}
                    </Form>
		</div>
		</div>
		</div>
    <div className="modal fade" id="popupregister" data-keyboard="false" data-backdrop="static">
    <div className="modal-dialog modal-dialog-centered modal-sm">
      <div className="modal-content">
      <div className="modal-header border-0 pb-0">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
      <Form onSubmit={this.handleRegisterSubmit}  >
                      <div className="form-group">
                        <label>Full Name</label>
                        <input className="form-control" type="text" value={this.state.name} onChange={this.onChangeName} required/>
                      </div>

                      <div className="form-group">
                        <label>Mobile</label>
                        <input className="form-control" type="number" value={this.state.register_mobile_no} onChange={this.onChangeRegiserMobile} required />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" value={this.state.register_email_id} onChange={this.onChangeRegisterEmailID} required/>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label>Password</label>
                          </div>
                          {/*<div className="col-auto">
                            <a className="text-muted" href="forgot-password.html">
                              Forgot password?
                            </a>
                          </div>*/}
                        </div>
                        <input className="form-control" type="password" value={this.state.register_password} onChange={this.onChangeRegisterPassword} required/>
                      </div>
                      <div className="form-group text-center">
                        <button className="btn btn-primary account-btn" type="submit">Register</button>
                       {/* <NavLink to={"/admin/dashboard"} className="btn btn-primary account-btn" type="submit">Login</NavLink>*/}
                      </div>
                   
                      <CheckButton
                          style={{ display: "none" }}
                          ref={(c) => {
                            this.checkBtn = c;
                          }}
                        />
                      {/*<div className="account-footer">
                        <p>Don't have an account yet? <a href="register.html">Register</a></p>
                      </div>*/}
                    </Form>
		</div>
		</div>
		</div>
</header>
      
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
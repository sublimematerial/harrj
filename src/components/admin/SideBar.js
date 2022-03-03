import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import jQuery from 'jquery';
import Popper from 'popper.js';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
import "./../../App.css";
// import translationEN from "../../local-json/ar/translation.json"
// import translationHE from "../../local-json/en/translation.json";

var lang="";

class SideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      datanew:''
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    lang = localStorage.getItem("lang");
    console.log("local")
    console.log(lang)
    this.setState({ datanew: 'new'});

    // var data
    // data=translationEN.sidemenu
    // console.log("json is")
    // console.log(data.D)
  }

  render() {


// const data=(lang==="English"? translationEN.sidemenu: translationHE.sidemenu);

    const { isLoggedIn, message } = this.props;

    return (
      <React.Fragment>

        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
          {/* {data.map((s) => {
            return( */}
            <div id="sidebar-menu" className="sidebar-menu">
           
              
              <ul>
                <li class="menu-title"> 
                  <span>{this.state.datanew}</span>
                </li>
                <li> 
                  <NavLink to={"/admin/dashboard"}><i class="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span></NavLink>
                </li>

                 <li> 
                  <NavLink to={"/admin/country/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Country</span></NavLink>
                </li>

               {/* <li> 
                  <NavLink to={"/admin/state/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>State</span></NavLink>
                </li>*/}

                <li> 
                  <NavLink to={"/admin/city/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>City</span></NavLink>
                </li> 
                <li> 
                  <NavLink to={"/admin/category/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Category</span></NavLink>
                </li>
                <li> 
                  <NavLink to={"/admin/subcategory/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Sub Category</span></NavLink>
                </li>
                <li> 
                  <NavLink to={"/admin/banner/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Banner</span></NavLink>
                </li>
                <li> 
                  <NavLink to={"/admin/brand/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Brand</span></NavLink>
                </li>
                
                <li> 
                  <NavLink to={"/admin/model/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Model</span></NavLink>
                </li>
                
                <li> 
                  <NavLink to={"/admin/subcategory/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Sub-Category</span></NavLink>
                </li>

                <li> 
                  <NavLink to={"/admin/product/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Product</span></NavLink>
                </li>

                 <li> 
                  <NavLink to={"/admin/client/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Customer List</span></NavLink>
                </li>

                 <li> 
                  <NavLink to={"/admin/user/list"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Bidder List</span></NavLink>
                </li>
                <li> 
                  <NavLink to={"/admin/year"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Year</span></NavLink>
                </li>
                
              </ul>
              
            </div>
            {/* );
              }) */}
            {/* } */}
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

export default connect(mapStateToProps)(SideBar);
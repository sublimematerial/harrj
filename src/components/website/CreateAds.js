import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Carousel from 'react-bootstrap/Carousel';

import $ from 'jquery';
import jQuery from 'jquery';
import Popper from 'popper.js';

import './../../assets/css/bootstrap.min.css'

import "./../../assets/css/font-awesome.min.css";
import "./../../assets/website/css/styles.css"

//import "./../../assets/css/style.css"
//import "./../../assets/css/custom.css"
//import "./../../App.css";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminLogin } from "./../../actions/auth";

import { CategoryList, ProductList, BannerList } from "./../../actions/website/Home";


import Header from './Header';
import Footer from './Footer';

// import "react-multi-carousel/lib/styles.css";
import   './../../assets/website/css/sliderstyle.css'
import Slider from "react-slick";
// const Slider = require('react-slick');
// import Slider from "react-slick";

toast.configure();

  


class Createads extends Component {

    

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
    
    export default connect(mapStateToProps)(Createads);
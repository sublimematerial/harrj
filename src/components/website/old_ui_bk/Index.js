import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

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
import "./../../assets/website/css/styles.css"
//import "./../../assets/css/style.css"
//import "./../../assets/css/custom.css"
//import "./../../App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminLogin } from "./../../actions/auth";

import { CategoryList, ProductList, BannerList } from "./../../actions/website/Home";


import Header from './Header';
import Footer from './Footer';

import logoImg from './../../assets/website/img/logo-01.png';
// import auctionImg from './../../assets/website/img/product/Why-Dealers-Buy-Cars-Auction-optimized.jpg';
// import c1 from './../../assets/website/img/c-1.png';
// import c22 from './../../assets/website/img/c-22.png';
// import vehiclesImg from './../../assets/website/img/vehicles.png';
// import jwelleryImg from './../../assets/website/img/jwellery.png';
// import watchesImg from './../../assets/website/img/watches.png';
// import cameraImg from './../../assets/website/img/camera.png';
// import footballImg from './../../assets/website/img/football.png';
// import fiveImg from './../../assets/website/img/5-512.png';


// const Slider = require('react-slick');
import Slider from "react-slick";

toast.configure();
var LiveAuction='online';
var NormalAuction='offline';



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        listCategoryData: [],
        listLiveAuctionData:[],
        listNormalAuctionData:[],
        listBannerData:[],

    }


    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
	this.ListCategoryFun();
	this.ListLiveAuctionFun()
	this.ListNormalAuctionFun();
	this.ListBannerFun();


  }

    ListCategoryFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listCategoryData: []
        });
      });
  }

  ListBannerFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(BannerList())
      .then((response) => {
        this.setState({
          listBannerData: response.data
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listBannerData: []
        });
      });
  }


   ListLiveAuctionFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ProductList(LiveAuction))
      .then((response) => {
        this.setState({
          listLiveAuctionData: response.data
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listLiveAuctionData: []
        });
      });
  }

  ListNormalAuctionFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ProductList(NormalAuction))
      .then((response) => {
        this.setState({
          listNormalAuctionData: response.data
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listNormalAuctionData: []
        });
      });
  }

	

  render() {

    const { isLoggedIn, message } = this.props;
    var bannersettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

 //    $(document).ready(function(){
	//   $('.customer-logos').slick({
	//   slidesToShow: 4,
	//   slidesToScroll: 1,
	//   autoplay: false,
	//   autoplaySpeed: 1500,
	//   arrows: true,
	//   dots: false,
	//   pauseOnHover: false,
	//   prevArrow: '<i class="slick-prev fas fa-angle-left"></i>',
	//   nextArrow: '<i class="slick-next fas fa-angle-right"></i>',
	//   responsive: [{
	// 	breakpoint: 768,
	// 	settings: {
	// 	  slidesToShow: 3
	// 	}
	//   }, {
	// 	breakpoint: 520,
	// 	settings: {
	// 	  slidesToShow: 2
	// 	}
	//   }]
	//   });
	// });
    

    return (
      <React.Fragment>
        <div id="main-wrapper">
		
      		 <Header />
			
            
			
               <NavLink class="harrj navbar navbar-expand-lg navbar-light bg-infoh">
                <a class="navbar-brand" href="#"><img src="images/logo.jpg"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
               
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                   
                   
                    <li className="nav-item active "><img
                      src="file:///C:/Users/Admin/Desktop/Harrj/images/Path%201696.svg"/>HOME
                    </li>
                    
                    <li className="nav-item mr-10 "><img
                      src="file:///C:/Users/Admin/Desktop/Harrj/images/Path%201695.svg"/>LIVE
                  AUTION</li>
                   
                    <li className="nav-item mr-10 "><img
                      src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%20294.svg"/>NORMAL
                  ADS</li>
                   
                    <li className="nav-item mr-10 "><img
                      src="file:///C:/Users/Admin/Desktop/Harrj/images/Path%201697.svg"/>CONTACT
              </li>
                  </ul>
                  <button type="button" className="btn btn-outline-primary btn-default btn-space navbar-btn ">ESERVICES LOGIN</button>
                  <button type="button" className="btn  btn-outline-primary btn-default btn-space navbar-btn">SIGNUP</button>
                
                </div>
                </NavLink>		

                 <div class="header container-fluid "><img src="images/abf0bf4553b286a70b3ca939801a7952.jpg" class=" img w-100"/>
    </div>

  
    <div class="container-fluid">
        <h1 class="heading text-center col-md-12">Catogries</h1>
        <div class="container">
            <div class="row">
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%20339.svg"/>
                    <div class="divcatogry"><span class="spantxt">Vehical</span></div>
                </div>
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%20342.svg"/>
                    <div class="divcatogry"><span class="spantxt ">Jwellery & Watches</span></div>
                </div>
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%20343.svg"/>
                    <div class="divcatogry"><span class="spantxt ">Real Estate</span></div>
                </div>


                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%20338.svg"/>
                    <div class="divcatogry"><span class="spantxt">Electronics</span></div>
                </div>


                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%20341.svg"/>
                    <div class="divcatogry"><span class="spantxt ">Sports</span></div>
                </div>


                <div class="col-sm-10 col-md-4 text-center my-5">
                    <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%20345.svg"/>
                    <div class="divcatogry"><span class="spantxt ">Other</span></div>
                </div>

            </div>
        </div>

    </div>

   
    <div class="container-fluid">
        <h1 class="heading text-center col-md-12">Live Bid</h1>
        <div class="container">
            <div class="row">

                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2055.svg"/>
                    </div>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>



                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2055.svg"/>
                    </div>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>
                </div>


                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2055.svg"/>
                    </div>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>


                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2055.svg"/>
                    </div>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2055.svg"/>
                    </div>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2055.svg"/>
                    </div>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>
            </div>
        </div>

    </div>
    




   
    <div class="container-fluid">
        <h1 class="heading text-center col-md-12">Last Ads</h1>
        <div class="container">
            <div class="row">
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Live auction.png" class="sectionimage"/>

                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>
                </div>






                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Live auction.png" class="sectionimage"/>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>






                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Live auction.png" class="sectionimage"/>

                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>





                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Live auction.png " class="sectionimage"/>

                   
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>



                <div class=" col-sm-10 col-md-4 text-center my-5"/>
                    <img src="images/Live auction.png" class="sectionimage"/>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>




                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Live auction.png" class="sectionimage"/>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img src="file:///C:/Users/Admin/Desktop/Harrj/images/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>




                </div>
            </div>
        </div>

    </div>
    
    <div class="container-fluid">
        <h1 class="heading text-center col-md-12">Hot Bid</h1>
        <div class="container">
            <div class="row">
                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>

                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img
                            src="C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img
                            src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img
                            src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>



                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>
                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img
                            src="C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img
                            src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img
                            src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>

                </div>


                <div class=" col-sm-10 col-md-4 text-center my-5">
                    <img src="images/Setting.png"/>

                    <div class="text-right"> <button class="sectionbtn btn ">
                            <img src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2058.svg"
                                style="width: 40%;" alt=""/>130</button></div>
                    <span class="section_text">Bose Quiet Comfort Noise Canceling Earbuds</span>
                    <div><img
                            src="C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2052.svg"/><span
                            class="spantxt">20/05/21-20/05/22</span>
                        <img
                            src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2049.svg"/><b>Mumbai,INDIA</b>
                    </div>
                    <div><img
                            src="file:///C:/Users/Admin/Desktop/Harrj/website%20icons/website%20icons/Rectangle%2051.svg"/><span
                            class="spantxt">01:00AM-02:30PM</span></div>
                </div>

            </div>
        </div>

    </div>
   
    <div class=" footercontaint container-fluid  ">
        <div class="row footer text-center">

            <div class="text-white col-sm-10 col-md-2 my-5 ">CONTACT US
                <ul  class="text-center">
                    <li class="d-block">+44 345 678 903</li>
                    <li class="d-block">Harrj@mail.com</li>
                    <li class="d-block">Find a Stors</li>
                </ul>
            </div>

            <div class=" text-white col-sm-10  col-md-2 my-5 ">CUSTOMER PERVICE
                <ul class="text-left " >
                    <li class="d-block ">CONTACT US</li>
                    <li class="d-block">Ordering & Payment</li>
                    <li class="d-block">Shipping</li>
                    <li class="d-block">Returns</li>
                    <li class="d-block">FAQ</li>
                </ul>
            </div>


            <div class=" text-white col-sm-10 col-md-2 my-5 ">INFORMATION

                <ul  class="text-left">
                    <li class="d-block">About US</li>
                    <li class="d-block">Work with US</li>
                    <li class="d-block">Privacy Policy</li>
                    <li class="d-block">Term & condition</li>
                    <li class="d-block">Press Enquiries</li>
                </ul>
            </div>

            <div class=" text-white col-sm-10  col-md-3  my-5 ">Subscribe to Harrj Via Email
                <ul >

                    <li class="text-white ">Excepteur sint occational cupidata non proident, sunt in cuipa qui offocial
                    </li>
                </ul>
                <div><input type="text" placeholder="Email Address" class=" Email text-danger border-non"/>
                    <button class="btn bg-white text-danger">SUBSCRIBE</button>
                </div>

            </div>
        </div>
    </div>
  

    
		<Footer />
	
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

export default connect(mapStateToProps)(Home);
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

import liveIcon from './../../assets/website/icons/live_icon.png';
import bidIcon from './../../assets/website/icons/bid_icon.png';
import calenderIcon from './../../assets/website/icons/calender_icon.svg';
import timerIcon from './../../assets/website/icons/timer__icon.png';
import locationIcon from './../../assets/website/icons/location__icon.svg';




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
			
            
			<div class="clearfix"></div>
			
				<div class="home-slider margin-bottom-0">
				
 				<Slider {...bannersettings}>
                {this.state.listBannerData && typeof this.state.listBannerData !=="undefined" & this.state.listBannerData.length > 0 && this.state.listBannerData.map((itemBannerList,l) => (
                <div>
                    <img src={itemBannerList.banner_img} width="100%" style={{"width":"100%","margin-top":"70px"}} alt="" className="" />
                  </div>
                ))}

              </Slider>
              </div>


       <section class="middle ">
				<div class="container">
					<div class="row">
						<h1 class="ft-bold pt-3 br-bt-cr1">Categories</h1>
					</div>
					<div class="row cat-row justify-content-center">
						<div class="col-sm-10 col-md-10 col-lg-10 col-xs-12">
            <div class="row justify-content-center">
            {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemCategoryList,l) => (
              	<div class="cat-div col-sm-4 col-md-4 col-lg-4 col-xs-4 textalign-center">
                <img class="img-div-resp" src={itemCategoryList.category_img}/>
                <h1 class="font-div-resp txt-bcolor txt-b">{itemCategoryList.category_name}</h1>
              </div>
            ))}
            </div>
            </div>
            </div>
				</div>
			</section>

      <section class="middle ">
				<div class="container">
					<div class="row">
						<h1 class="ft-bold pt-3 br-bt-cr1">Live Bid</h1>
					</div>
					<div class="row cat-row justify-content-center">
          {this.state.listLiveAuctionData && typeof this.state.listLiveAuctionData !=="undefined" & this.state.listLiveAuctionData.length > 0 && this.state.listLiveAuctionData.map((itemLiveAuctionList,l) => (
									
											<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
												<div class="product_grid card b-0">
													<div class="badge bg-transparent text-white position-absolute ft-regular ab-left text-upper pb-2"><img src={liveIcon}/></div>
													<div class="badge bg-white  text-dark position-absolute ft-regular ab-right text-upper pb-2 mini-bidicon"><img class="fill-width50" src={bidIcon}/>130</div>
													<div class="card-body p-0">
														<div class="shop_thumb position-relative">
                            <NavLink to={"/web/product/info/"+itemLiveAuctionList.product_id} class="card-img-top d-block overflow-hidden" ><img class="card-img-top" src="{itemLiveAuctionList.product_img}" alt="..."/></NavLink>
														</div>
													</div>
													<div class="card-footer b-0 p-0 pt-2   d-flex align-items-start justify-content-between">
														<div class="text-left">
															<div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
															</div>
															<h5 class="fs-md mb-0 lh-1 mb-1 ft-bold fs-ltrspacing pt-3"><NavLink to={"/web/product/info/"+itemLiveAuctionList.product_id}>{itemLiveAuctionList.title} <br/> ({itemLiveAuctionList.name})</NavLink></h5>
															<div class="row pb-4">
																<div class="col-9">
																	<div class="elis_rty"><img class="mini-icons" src={calenderIcon}/><span class="ft-medium text-dark fs-sm">{itemLiveAuctionList.start_date_time} - {itemLiveAuctionList.end_date_time}</span></div>
														      <img class="mini-icons" src={timerIcon}/><span class="ft-medium text-dark fs-sm">{itemLiveAuctionList.start_time} To {itemLiveAuctionList.end_time}</span>
																</div>
																<div class="col-3 col-no-leftpadding">
																	<div class="elis_rty "><img class="mini-icons" src={locationIcon}/><span class="ft-medium text-dark fs-md">Mumbai</span></div>
																</div>	
															</div>
																
														</div>
													</div>
												</div>
											</div>
                      ))}
											</div>
				
					<div class=" centeralign-divitem">
						<h4 class="ft-bold pt-3 br-bt-cr1">see more</h4>
					</div>
				</div>
			</section>

      <section class="middle ">
				<div class="container">
					<div class="row">
						<h1 class="ft-bold pt-3 br-bt-cr1">Normal Ads</h1>
					</div>
					<div class="row cat-row justify-content-center">
          {this.state.listNormalAuctionData && typeof this.state.listNormalAuctionData !=="undefined" & this.state.listNormalAuctionData.length > 0 && this.state.listNormalAuctionData.map((itemNormalAuctionList,l) => (
									
											<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
												<div class="product_grid card b-0">
													<div class="badge bg-transparent text-white position-absolute ft-regular ab-left text-upper pb-2"><img src={liveIcon}/></div>
													<div class="badge bg-white  text-dark position-absolute ft-regular ab-right text-upper pb-2 mini-bidicon"><img class="fill-width50" src={bidIcon}/>130</div>
													<div class="card-body p-0">
														<div class="shop_thumb position-relative">
                            <NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id} class="card-img-top d-block overflow-hidden" ><img class="card-img-top" src="{itemNormalAuctionList.product_img}" alt="..."/></NavLink>
														</div>
													</div>
													<div class="card-footer b-0 p-0 pt-2   d-flex align-items-start justify-content-between">
														<div class="text-left">
															<div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
															</div>
															<h5 class="fs-md mb-0 lh-1 mb-1 ft-bold fs-ltrspacing pt-3"><NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id}>{itemNormalAuctionList.title} <br/> ({itemNormalAuctionList.name})</NavLink></h5>
															<div class="row pb-4">
																<div class="col-9">
																	<div class="elis_rty"><img class="mini-icons" src={calenderIcon}/><span class="ft-medium text-dark fs-sm">{itemNormalAuctionList.start_date_time} - {itemNormalAuctionList.end_date_time}</span></div>
														      <img class="mini-icons" src={timerIcon}/><span class="ft-medium text-dark fs-sm">{itemNormalAuctionList.start_time} To {itemNormalAuctionList.end_time}</span>
																</div>
																<div class="col-3 col-no-leftpadding">
																	<div class="elis_rty "><img class="mini-icons" src={locationIcon}/><span class="ft-medium text-dark fs-md">Mumbai</span></div>
																</div>	
															</div>
																
														</div>
													</div>
												</div>
											</div>
                      ))}
											</div>
				
					<div class=" centeralign-divitem">
						<h4 class="ft-bold pt-3 br-bt-cr1">see more</h4>
					</div>
				</div>
			</section>


      <section class="middle ">
				<div class="container">
					<div class="row">
						<h1 class="ft-bold pt-3 br-bt-cr1">Last Ads</h1>
					</div>
					<div class="row cat-row justify-content-center">
          {this.state.listNormalAuctionData && typeof this.state.listNormalAuctionData !=="undefined" & this.state.listNormalAuctionData.length > 0 && this.state.listNormalAuctionData.map((itemNormalAuctionList,l) => (
									
											<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
												<div class="product_grid card b-0">
													<div class="badge bg-transparent text-white position-absolute ft-regular ab-left text-upper pb-2"><img src={liveIcon}/></div>
													<div class="badge bg-white  text-dark position-absolute ft-regular ab-right text-upper pb-2 mini-bidicon"><img class="fill-width50" src={bidIcon}/>130</div>
													<div class="card-body p-0">
														<div class="shop_thumb position-relative">
                            <NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id} class="card-img-top d-block overflow-hidden" ><img class="card-img-top" src="{itemNormalAuctionList.product_img}" alt="..."/></NavLink>
														</div>
													</div>
													<div class="card-footer b-0 p-0 pt-2   d-flex align-items-start justify-content-between">
														<div class="text-left">
															<div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
															</div>
															<h5 class="fs-md mb-0 lh-1 mb-1 ft-bold fs-ltrspacing pt-3"><NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id}>{itemNormalAuctionList.title} <br/> ({itemNormalAuctionList.name})</NavLink></h5>
															<div class="row pb-4">
																<div class="col-9">
																	<div class="elis_rty"><img class="mini-icons" src={calenderIcon}/><span class="ft-medium text-dark fs-sm">{itemNormalAuctionList.start_date_time} - {itemNormalAuctionList.end_date_time}</span></div>
														      <img class="mini-icons" src={timerIcon}/><span class="ft-medium text-dark fs-sm">{itemNormalAuctionList.start_time} To {itemNormalAuctionList.end_time}</span>
																</div>
																<div class="col-3 col-no-leftpadding">
																	<div class="elis_rty "><img class="mini-icons" src={locationIcon}/><span class="ft-medium text-dark fs-md">Mumbai</span></div>
																</div>	
															</div>
																
														</div>
													</div>
												</div>
											</div>
                      ))}
											</div>
				
					<div class=" centeralign-divitem">
						<h4 class="ft-bold pt-3 br-bt-cr1">see more</h4>
					</div>
				</div>
			</section>


      <section class="middle ">
				<div class="container">
					<div class="row">
						<h1 class="ft-bold pt-3 br-bt-cr1">Hot Bid</h1>
					</div>
					<div class="row cat-row justify-content-center">
          {this.state.listNormalAuctionData && typeof this.state.listNormalAuctionData !=="undefined" & this.state.listNormalAuctionData.length > 0 && this.state.listNormalAuctionData.map((itemNormalAuctionList,l) => (
									
											<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
												<div class="product_grid card b-0">
													<div class="badge bg-transparent text-white position-absolute ft-regular ab-left text-upper pb-2"><img src={liveIcon}/></div>
													<div class="badge bg-white  text-dark position-absolute ft-regular ab-right text-upper pb-2 mini-bidicon"><img class="fill-width50" src={bidIcon}/>130</div>
													<div class="card-body p-0">
														<div class="shop_thumb position-relative">
                            <NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id} class="card-img-top d-block overflow-hidden" ><img class="card-img-top" src="{itemNormalAuctionList.product_img}" alt="..."/></NavLink>
														</div>
													</div>
													<div class="card-footer b-0 p-0 pt-2   d-flex align-items-start justify-content-between">
														<div class="text-left">
															<div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
															</div>
															<h5 class="fs-md mb-0 lh-1 mb-1 ft-bold fs-ltrspacing pt-3"><NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id}>{itemNormalAuctionList.title} <br/> ({itemNormalAuctionList.name})</NavLink></h5>
															<div class="row pb-4">
																<div class="col-9">
																	<div class="elis_rty"><img class="mini-icons" src={calenderIcon}/><span class="ft-medium text-dark fs-sm">{itemNormalAuctionList.start_date_time} - {itemNormalAuctionList.end_date_time}</span></div>
														      <img class="mini-icons" src={timerIcon}/><span class="ft-medium text-dark fs-sm">{itemNormalAuctionList.start_time} To {itemNormalAuctionList.end_time}</span>
																</div>
																<div class="col-3 col-no-leftpadding">
																	<div class="elis_rty "><img class="mini-icons" src={locationIcon}/><span class="ft-medium text-dark fs-md">Mumbai</span></div>
																</div>	
															</div>
																
														</div>
													</div>
												</div>
											</div>
                      ))}
											</div>
				
					<div class=" centeralign-divitem">
						<h4 class="ft-bold pt-3 br-bt-cr1">see more</h4>
					</div>
				</div>
			</section>


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
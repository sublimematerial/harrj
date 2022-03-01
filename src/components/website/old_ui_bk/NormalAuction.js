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

import { CategoryList,SubCategoryList,ProductList, BannerList, BrandList} from "./../../actions/website/Home";
import { LiveListFilter} from "./../../actions/website/LiveAuction";


import Header from './Header';
import Footer from './Footer';

import coverImg from './../../assets/website/img/co.jpg';
import logoImg from './../../assets/website/img/logo-01.png';
import footballImg from './../../assets/website/img/football.png';

// const Slider = require('react-slick');
import Slider from "react-slick";

toast.configure();

class NormalAuction extends Component {

  constructor(props) {
    super(props);
    this.state = {
        listCategoryData: [],
        listSubCategoryData:[],
        listNormalAuctionData:[],
        listBannerData:[],
        category_id:[],
        sub_category_id:[],
        listBrandData:[],
        listYearData:[],
        year:[],
        normal_auction:'offline',
        sort_by:''

    }


    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    this.ListCategoryFun();
    this.ListNormalAuctionFun();
    this.ListBannerFun();
    this.ListBrandFun();

  }

   onChangeBrand=(e)=>{
    this.setState({
      brand_id: e.target.value,
    });
    this.ListNormalAuctionFun();
  }
  onChangeYear=(e)=>{
    this.setState({
      year: e.target.value,
    });
    this.ListNormalAuctionFun();
  }
   onChangeCategory=(e)=>{
    this.setState({
      category_id: e.target.value,
    });
    this.ListSubCategoryFun(e.target.value);
    this.ListNormalAuctionFun();
  }
  onChangeSubCategory=(e)=>{
    this.setState({
      sub_category_id: e.target.value,
    });
    this.ListNormalAuctionFun();
  }

  onChangeSortBy=(e)=>{
    this.setState({
      sort_by: e.target.value,
    });
    this.ListNormalAuctionFun();
  }

   ListSubCategoryFun=(category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(SubCategoryList(category_id))
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: []
        });
      });
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

  ListBrandFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(BrandList())
      .then((response) => {
        this.setState({
          listBrandData: response.data
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listBrandData: []
        });
      });
  }


   ListNormalAuctionFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(LiveListFilter(this.state.normal_auction,this.state.category_id,this.state.sub_category_id,this.state.year,this.state.sort_by))
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
    

    return (
      <React.Fragment>
        <div id="main-wrapper">
        
             <Header />
			<div class="clearfix" style={{"paddingBottom":"90px"}}></div>
    <section class="bg-cover" style={{backgroundImage: "url(" + coverImg + ")",padding:"180px 0px 180px"}}>
     <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="text-center py-5 mt-3 mb-3">
                        <h1 class="ft-medium mb-3">Normal Ads</h1>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="py-2 br-bottom br-top gray">
            <div class="container">
                <div class="row align-items-center justify-content-between">
                    <div class="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                       
                    </div>
                    
                    <div class="col-xl-9 col-lg-8 col-md-7 col-sm-12">
                        <div class="filter_wraps elspo_wrap d-flex align-items-center justify-content-end">
                            <div class="single_fitres elspo_filter mr-2 br-right">
                                <a href="#filterBox" class="simple-button px-2" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="filterBox"><i class="lni lni-text-align-right mr-2"></i><span class="hide_mob">Filters</span></a>
                            </div>
                            <div class="single_fitres mr-2 br-right">
                                <select class="custom-select simple" name="sort_by" id="sort_by" value={this.state.sort_by} onChange={this.onChangeSortBy} >
                                  <option value="" selected="">Default Sorting</option>
                                  <option value="low_to_high">Sort by price: Low price</option>
                                  <option value="high_to_low">Sort by price: Hight price</option>
                                  <option value="high_rate">Sort by rating</option>
                                  {/*<option value="5">Sort by trending</option> */}
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div class="row align-items-center justify-content-center">
                    <div class="col-xl-12 col-lg-12 col-md-12">
                        <div class="collapse" id="filterBox">
                            <div class="card py-3 b-0">
                                <div class="row">
                                    
                                   <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                        <div class="single_filter_card mb-2">
                                            <h5><a href="#mens" data-toggle="collapse" class="collapsed" aria-expanded="false" role="button">Category<i class="accordion-indicator ti-angle-down"></i></a></h5>
                                            <div class="card-body">
                                                <div class="inner_widget_link">
                                                    <ul class="m-0 p-0">
                                                    <select className="form-control" placeholder="Category" id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required >
                                            <option value="">Select Category</option>
                                            {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                              <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                            ))}
                                          </select>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                        <div class="single_filter_card">
                                            <h5><a href="#womens" data-toggle="collapse" class="collapsed" aria-expanded="false" role="button">Sub Category<i class="accordion-indicator ti-angle-down"></i></a></h5>
                                            <div class="card-body">
                                                    <div class="inner_widget_link">
                                                        <ul class="p-0 m-0">
                                                           <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeSubCategory}  >
                                                <option value="">Select Sub Category</option>
                                                {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                                  <option value={itemTaskList.sub_category_id}>{itemTaskList.sub_category_name}</option>
                                                ))}
                                            </select>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                        <div class="single_filter_card mb-2">
                                            <h5><a href="#year" data-toggle="collapse" class="collapsed" aria-expanded="false" role="button">Years<i class="accordion-indicator ti-angle-down"></i></a></h5>
                                            <div id="year" >
                                                <div class="card-body">
                                                    <div class="inner_widget_link">
                                                    <select className="form-control" placeholder="Year" id="year" name="year" value={this.state.year} onChange={this.onChangeYear}  >
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                          </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
      
      

      <section class="middle gray">
				<div class="container">
				
					<div class="row justify-content-center" style={{"border": "1px solid"}}>
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
							<div class="sec_title position-relative text-center">
								<h2 class="off_title">Adds</h2>
								<h3 class="ft-bold pt-3">Normal Ads</h3>
							</div>
						</div>
					</div>
					<br/>
					<div class="row align-items-center">
					
						{this.state.listNormalAuctionData && typeof this.state.listNormalAuctionData !=="undefined" & this.state.listNormalAuctionData.length > 0 && this.state.listNormalAuctionData.map((itemNormalAuctionList,l) => (
                    
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 colum-level">
              <div class="product_grid card b-0">
                <div class="badge bg-danger text-white position-absolute ft-regular ab-right text-upper"><i class="fa fa-gavel" aria-hidden="true"></i></div>

                <div class="card-body p-0">
                  <div class="shop_thumb position-relative">
                    <NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id} className="card-img-top d-block overflow-hidden"><img class="card-img-top" src={itemNormalAuctionList.product_img} alt="..."/></NavLink>

                  </div>
                </div>
                <div class="card-footer b-0 p-0 pt-2">
              
                  <div class="text-left">
                    <h5 class="fw-bolder fs-md mb-0 lh-1 mb-1"><NavLink to={"/web/product/info/"+itemNormalAuctionList.product_id} className="card-img-top d-block overflow-hidden">{itemNormalAuctionList.title} ({itemNormalAuctionList.Name})</NavLink></h5><hr/>
                    <div class="elis_rty"><span class="ft-bold text-dark fs-sm">20 Bids</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

						
						
							
					</div>
					
				</div>
			</section>
			
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

export default connect(mapStateToProps)(NormalAuction);	
		
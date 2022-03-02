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
import live from './../../assets/website/img/livebid/live.png';
import order from './../../assets/website/img/livebid/order.png';
import dateImg from  './../../assets/website/img/livebid/date.png';
import loc from './../../assets/website/img/livebid/loc.png';
import offlinebid from  './../../assets/website/img/homebanner.jpg'
import clock from './../../assets/website/img/livebid/clock.png'
import banner3 from  './../../assets/website/img/livebid/banner-3.png';


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
        activeCollapse :'',
        sort_by:'',
        showPopup:false,


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
  handleExpandCollaps = (name) => {
   
    if (this.state.activeCollapse === name) {
      this.setState({ activeCollapse: '' })
  } else {
      this.setState({ activeCollapse: name })
  }
   
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

  togglePopup() {
		var lang
		lang = localStorage.getItem("userId");
		console.log("value of lang is")
		console.log(lang)
		if(lang!=null){
			let path = `/web/createads`; 
			history.push(path);
		}else{
			$('#popuplogin').modal('show');
		}
	
		
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
             <div id="main-wrapper">

				
					<div className="main-banner" id="top">
					<img  
                 src={offlinebid}  />
            
    <a className="btn" onClick={this.togglePopup.bind(this)}>Create Ad</a>
</div>
</div>

             {/* <div class="home_slider bid-slider">
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
   


      <div class="item">
	  <img class="bg-banner" src={banner3}/>
			<div class="carousel-caption">
			<div class="banner-innner">
				<div class="col-md-6">
				<h3 class="wow fadeInDown">lorem lipsum</h3>
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
				<a class="wow fadeIn" href="#">Lorem Ipsum</a>
				</div>
				<div class="col-md-6"><img src={banner3}/>
				</div>				
			</div>
			</div>
      </div> 
    </div>
</div> */}

<section class="live-bid live-bid-page normal-ads">
	<div class="container">
		<div class="row">
			
						<div class="col-md-12">
				<div class="heading">
					<h2>Normal Ads</h2>
					<div class="bar"></div>
				</div>		
			</div>	
			
			<div className="col-md-3">
							<div className="sidebar-navigation">
               
				  <ul>
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("categories")}>Categories <i className="fa fa-chevron-down"></i></a>
            <div id='categories' style={{ display: this.state.activeCollapse ==='categories' ? 'block' : 'none'  }}>
              <ul>
							  <li><a href="#">Mobile <em className="mdi mdi-chevron-down"></em></a>
							
							  </li>
							  <li><a href="#">Technology</a></li>
							  <li><a href="#">Game</a></li>
							  <li><a href="#">Software</a></li>
							  <li><a href="#">Internet</a></li>
						  </ul>
              </div>
					  </li>
					  
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("price")}>Price Range <i className="fa fa-chevron-down"></i></a>
            <div id='price' style={{ display: this.state.activeCollapse ==='price' ? 'block' : 'none'  }}>
						  <ul>
							  <li><a href="#">Mobile <em className="mdi mdi-chevron-down"></em></a>
							 
							  </li>
							  <li><a href="#">Technologys</a></li>
							  <li><a href="#">Game</a></li>
							  <li><a href="#">Software</a></li>
							  <li><a href="#">Internet</a></li>
						  </ul>
              </div>
					  </li>					  
            <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("location")}>Location <i className="fa fa-chevron-down"></i></a>
            <div id='location' style={{ display: this.state.activeCollapse ==='location' ? 'block' : 'none'  }}>
						  <ul>
							  <li><a href="javascript:void(0)">Mobile <em className="mdi mdi-chevron-down"></em></a>
							 
							  </li>
							  <li><a href="#">Technologys</a></li>
							  <li><a href="#">Game</a></li>
							  <li><a href="#">Software</a></li>
							  <li><a href="#">Internet</a></li>
						  </ul>
              </div>
					  </li>			
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("brands")}>ALL BRANDS <i className="fa fa-chevron-down"></i></a>
            <div id='brands' style={{ display: this.state.activeCollapse ==='brands' ? 'block' : 'none'  }}>
              <ul>
							  <li><a href="#">Mobile <em className="mdi mdi-chevron-down"></em></a>
							
							  </li>
							  <li><a href="#">Technology</a></li>
							  <li><a href="#">Game</a></li>
							  <li><a href="#">Software</a></li>
							  <li><a href="#">Internet</a></li>
						  </ul>
              </div>
					  </li>

					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("models")}>ALL MODELS <i className="fa fa-chevron-down"></i></a>
            <div id='models' style={{ display: this.state.activeCollapse ==='models' ? 'block' : 'none'  }}>
						  <ul>
							  <li><a href="#">Mobile <em className="mdi mdi-chevron-down"></em></a>
							
							  </li>
							  <li><a href="#">Technology</a></li>
							  <li><a href="#">Game</a></li>
							  <li><a href="#">Software</a></li>
							  <li><a href="#">Internet</a></li>
						  </ul>
              </div>
					  </li>					  

				  </ul>
				</div>
			</div>
			
			<div class="col-md-9">
			<div class="row">
     { this.state.listNormalAuctionData && typeof this.state.listNormalAuctionData !=="undefined" & this.state.listNormalAuctionData.length > 0 && this.state.listNormalAuctionData.map((itemNormalAuctionList,l) => (
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
				<div class="live-bid-content bid-new">
					<a href="#">
						<img src={itemNormalAuctionList.product_img}/>
					</a>
					<div class="live">
						
						<a href="#"><img src={live}/> 130</a>
					</div>
					<div class="bid-heading">
						<h2>{itemNormalAuctionList.title} ({itemNormalAuctionList.Name}) </h2>
					</div>
					<div class="date-time">
						<ul>
							<li><img src={dateImg}/> 20/05/21-20/05/22</li>
							<li class="loc"><img src={loc}/> Mumbai, INDIA</li>
							<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
						</ul>
					</div>					
					
				</div>
			</div>
			
			))}
			
			

	

	
			
			
		
			
					
	
			
			
						<div class="col-md-12">
				<div class="see-more">
					<a href="#">See More</a>
					<div class="bar2">
				</div>
			</div>	
			
		</div>
		</div>
		</div>
	</div>
  </div>
</section>
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
		
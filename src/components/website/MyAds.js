import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";

import { clearMessage } from "../../actions/message";

import { history } from '../../helpers/history';

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

import { AdminLogin } from "../../actions/auth";

import { CategoryList, ProductList, BannerList } from "../../actions/website/Home";


import Header from './Header';
import Footer from './Footer';

import liveIcon from './../../assets/website/icons/live_icon.png';
import bidIcon from './../../assets/website/icons/bid_icon.png';
import calenderIcon from './../../assets/website/icons/calender_icon.svg';
import timerIcon from './../../assets/website/icons/timer__icon.png';
import locationIcon from './../../assets/website/icons/location__icon.svg';
import banner1 from  './../../assets/website/img/livebid/banner-1.png';
import homebanner from './../../assets/website/img/homebanner.jpg'
import bannerbg from './../../assets/website/img/livebid/banner-bg.png';
import live from './../../assets/website/img/livebid/live.png';
import order from './../../assets/website/img/livebid/order.png';
import dateImg from  './../../assets/website/img/livebid/date.png';
import loc from './../../assets/website/img/livebid/loc.png';
import clock from './../../assets/website/img/livebid/clock.png'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import   './../../assets/website/css/sliderstyle.css'
import Slider from "react-slick";
// const Slider = require('react-slick');
// import Slider from "react-slick";

toast.configure();
var LiveAuction = 'online';
var NormalAuction = 'offline';

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "red" }}
		onClick={onClick}
	  />
	);
  }
  
  function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "green" }}
		onClick={onClick}
	  />
	);
  }
  const data = [
	{
	 image: require('./../../assets/website/img/livebid//banner-1.png'), 
	 caption:"Caption",
	 description:"Description Here"
	},
	{
	  image:require('./../../assets/website/img/livebid//banner-1.png'), 
	  caption:"Caption",
	  description:"Description Here"
	 },
	 {
	  image:require('./../../assets/website/img/livebid//banner-1.png'), 
	  caption:"Caption",
	  description:"Description Here"
	 } 
  ]
  const responsive = {
	superLargeDesktop: {
	  breakpoint: { max: 4000, min: 3000 },
	  items: 3
	},
	desktop: {
	  breakpoint: { max: 3000, min: 1024 },
	  items: 3
	},
	tablet: {
	  breakpoint: { max: 1024, min: 464 },
	  items: 2
	},
	mobile: {
	  breakpoint: { max: 464, min: 0 },
	  items: 1
	}
  };
class MyAds extends Component {

	constructor(props) {
		super(props);
		this.state = {
			listCategoryData: [],
			listLiveAuctionData: [],
			listNormalAuctionData: [],
			listBannerData: [],
			data: [],
			itemsToShow: 4,
			expanded: false,
			normalToShow:4,
			normalexpanded:false,
			showPopup:false,

		}
		this.showMore = this.showMore.bind(this);
		this.showMoreLive=this.showMoreLive.bind(this);
		history.listen((location) => {
			props.dispatch(clearMessage()); // clear message when changing location
		});
	}

	componentDidMount() {
		// this.setState({ loading: true });
    console.log("app mounted");
    // fetch(
    //   "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8ee8c21b20d24b37856fc3ab1e22a1e5"
    // )
    //   .then(data => data.json())
    //   .then(data =>
    //     this.setState({ data: data.articles, loading: false }, () =>
    //       console.log(data.articles)
    //     )
    //   );
		this.ListCategoryFun();
		this.ListLiveAuctionFun()
		this.ListNormalAuctionFun();
		this.ListBannerFun();
	}

	ListCategoryFun = () => {

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

	ListBannerFun = () => {

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


	ListLiveAuctionFun = () => {

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
	showMoreLive= () => {
		this.state.itemsToShow === 4 ? (
			this.setState({ itemsToShow: this.state.listLiveAuctionData.length, expanded: true })
		  ) : (
			this.setState({ itemsToShow: 4, expanded: false })
		  )

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
			$('#createad').modal('show');
		}
	
		
	  }
	showMore= () => {
		this.state.normalToShow === 4 ? (
			this.setState({ itemsToShow: this.state.listNormalAuctionData.length, normalexpanded: true })
		  ) : (
			this.setState({ itemsToShow:4 , normalexpanded: false })
		  )

	}
	
	ListNormalAuctionFun = () => {

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


		var campsettings = {
			infinite: true,
			dots: false,
			speed: 4000,
			autoplay: true,
			autoplaySpeed: 0,
			cssEase: 'linear',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			responsive: [{
			  breakpoint: 1024,
			  settings: {
				  slidesToShow: 2,
				  slidesToScroll: 1,
				  infinite: true,
			  }
		  },
		  {
			  breakpoint: 600,
			  settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1
			  }
		  },
		  {
			  breakpoint: 480,
			  settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  arrows: false,
			  }
		  }
	  ]
	  }; 



	  var campsettingsbanner = {
		infinite: true,
		dots: false,
		speed: 4000,
		autoplay: true,
		autoplaySpeed: 0,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		variableWidth: true,
		responsive: [{
		  breakpoint: 1024,
		  settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  infinite: true,
		  }
	  },
	  {
		  breakpoint: 600,
		  settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
		  }
	  },
	  {
		  breakpoint: 480,
		  settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: false,
		  }
	  }
  ]
  }; 


		const { isLoggedIn, message } = this.props;
		
		var bannersettings = {
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		  };
		return (
			<React.Fragment>
				<div id="main-wrapper">

					<Header />
					<div className="main-banner" id="top">
					<img  
                 src={homebanner}  />

		    
    {/* <a className="btn" onClick={this.togglePopup.bind(this)}>Create Ad</a> */}
	
	
    
        </div>
		





<section class="live-bid">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="heading">
					<h2>Live Bid</h2>
					<div class="bar"></div>
				</div>		
			</div>	
		
			{this.state.listLiveAuctionData && typeof this.state.listLiveAuctionData !== "undefined" & this.state.listLiveAuctionData.length > 0 && this.state.listLiveAuctionData.slice(0,this.state.itemsToShow).map((itemLiveAuctionList, l) => (
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
			
				<div class="live-bid-content">
					<a href="#">
						<img  src={itemLiveAuctionList.product_img}/>
					</a>
					<div class="live">
						<img src={live}/>
						<a href="#"><img src={order}/> 130</a>
					</div>
					<div class="bid-heading">
						<h2>{itemLiveAuctionList.title} <br /> ({itemLiveAuctionList.name}) </h2>
					</div>
					<div class="date-time">
						<ul>
							<li><img src={dateImg}/> {itemLiveAuctionList.start_date_time} - {itemLiveAuctionList.end_date_time}</li>
							<li class="loc"><img src="images/loc.png"/> Mumbai, INDIA</li>
							<li class="tim"><img src="images/clock.png"/> {itemLiveAuctionList.start_time} To {itemLiveAuctionList.end_time}</li>
						</ul>
					</div>					
					
				</div>
			
			</div>
				))}
			
			
				

			<div class="col-md-12">
				<div class="see-more">
					<a className="btn btn-primary" onClick={this.showMoreLive}>{this.state.expanded ? (
    <span>Show less</span>
  ) : (
    <span>Show more</span>
  )}</a>
					<div class="bar2">
				</div>
			</div>			
			
			
		</div>
	</div>
	</div>
</section>



<section class="live-bid">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="heading">
					<h2>Normal Ads</h2>
					<div class="bar"></div>
				</div>		
			</div>	
			{this.state.listNormalAuctionData && typeof this.state.listNormalAuctionData !== "undefined" & this.state.listNormalAuctionData.length > 0 && this.state.listNormalAuctionData.slice(0,this.state.normalToShow).map((itemNormalAuctionList, l) => (
			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
				<div class="live-bid-content">
					<a href="#">
						<img src={itemNormalAuctionList.product_img}/>
					</a>
					<div class="live">
						<a href="#"><img src={order}/> 130</a>
					</div>
					<div class="bid-heading">
						<h2>{itemNormalAuctionList.title} <br /> ({itemNormalAuctionList.name}) </h2>
					</div>
					<div class="date-time">
						<ul>
							<li><img src={dateImg}/> {itemNormalAuctionList.start_date_time} - {itemNormalAuctionList.end_date_time}</li>
							<li class="loc"><img src={loc}/> Mumbai, INDIA</li>
							<li class="tim"><img src={clock}/> {itemNormalAuctionList.start_time} To {itemNormalAuctionList.end_time}</li>
						</ul>
					</div>					
					
				</div>
			</div>
			
			))}
				
			

			
		

				

			<div class="col-md-12">
				<div class="see-more">
					<a className="btn btn-primary"  onClick={this.showMore}>{this.state.normalexpanded ? (
    <span>Show less</span>
  ) : (
    <span>Show more</span>
  )}</a>
					<div class="bar2">
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

export default connect(mapStateToProps)(MyAds);
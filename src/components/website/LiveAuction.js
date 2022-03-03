import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";



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
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminLogin } from "./../../actions/auth";

import { CategoryList,SubCategoryList,CountryList,CountryCityList,ProductList, BannerList, BrandList,BrandModelLst} from "./../../actions/website/Home";
import { LiveListFilter} from "./../../actions/website/LiveAuction";

import Sidefilter from "./SideFilter"


import Header from './Header';
import Footer from './Footer';


import banner3 from  './../../assets/website/img/livebid/banner-3.png';
import bannerbg from './../../assets/website/img/livebid/banner-bg.png';
import boss from './../../assets/website/img/livebid/boss.png';
import live from './../../assets/website/img/livebid/live.png';
import order from './../../assets/website/img/livebid/order.png';
import dateImg from  './../../assets/website/img/livebid/date.png';
import homebanner from  './../../assets/website/img/homebanner.jpg'
import loc from './../../assets/website/img/livebid/loc.png';
import clock from './../../assets/website/img/livebid/clock.png'
import banner1 from  './../../assets/website/img/livebid//banner-1.png';



import coverImg from './../../assets/website/img/co.jpg';

import footballImg from './../../assets/website/img/football.png';


// const Slider = require('react-slick');
import Slider from "react-slick";
import { FrownOpenIcon } from "react-line-awesome";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
  

toast.configure();



class LiveAuction extends Component {

  constructor(props) {
    super(props);
    this.state = {
		
        live_auction:'online',
       

    }


    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    // this.ListCategoryFun();
	// this.ListCountryFun();
    // this.ListLiveAuctionFun();
    // this.ListBannerFun();
    

  }
//   handleChange = event => {
	  
//     this.setState({selected: event.target.id})
	

// if(event.target.checked){
// 		this.setState({
// 		category_id: [...this.state.category_id, event.target.id]
// 	}, () => {
		
// 		this.ListBrandFun();
// 		this.ListLiveAuctionFun();
// 	});

// }else{
// 	var array = [...this.state.category_id]; // make a separate copy of the array
// 	var index = array.indexOf(event.target.value)
// 	if (index !== -1) {
// 	  array.splice(index, 1);
// 	  this.setState({category_id: array}, () => {
		
// 		this.ListBrandFun();
// 		this.ListLiveAuctionFun();
// 	}
		
		
// 		);

// 	}
// }
	
// }

// handlePriceChange = event => {
// 	this.setState({pricevalue: event.target.value});
// 	//console.log( event.target.id)
 
// }
//    onChangeBrand=(event)=>{
// 	this.setState({selected: event.target.id})
	

// 	if(event.target.checked){
// 			this.setState({
// 			brand_id: [...this.state.brand_id, event.target.id]
// 		}, () => {
			
// 			this.ListModelFun();
// 			this.ListLiveAuctionFun();
// 		});
	
// 	}else{
// 		var array = [...this.state.brand_id]; // make a separate copy of the array
// 		var index = array.indexOf(event.target.value)
// 		if (index !== -1) {
// 		  array.splice(index, 1);
// 		  this.setState({brand_id: array}, () => {
// 			console.log("category id after remove set")
// 			console.log( this.state.brand_id)
// 			this.ListModelFun();
// 			this.ListLiveAuctionFun();
// 		}
			
			
// 			);
	
// 		}
//   }
// }


  
//    onChangeCategory=(e)=>{
//     this.setState({
//       category_id: e.target.value,
//     });
//     this.ListSubCategoryFun(e.target.value);
//     this.ListLiveAuctionFun();
//   }
//   onChangeSubCategory=(event)=>{
// 	this.setState({selected: event.target.id})
	

// 	if(event.target.checked){
// 			this.setState({
// 			sub_category_id: [...this.state.sub_category_id, event.target.id]
// 		}, () => {
			
			
// 			this.ListLiveAuctionFun();
// 		});
	
// 	}else{
// 		var array = [...this.state.sub_category_id]; // make a separate copy of the array
// 		var index = array.indexOf(event.target.value)
// 		if (index !== -1) {
// 		  array.splice(index, 1);
// 		  this.setState({sub_category_id: array}, () => {
			
			
// 			this.ListLiveAuctionFun();
// 		}
			
			
// 			);
	
// 		}
//   }

// }
//   onChangeModel=(event)=>{
// 	this.setState({selected: event.target.id})
	

// 	if(event.target.checked){
// 			this.setState({
// 			model_id: [...this.state.model_id, event.target.id]
// 		}, () => {
			
			
// 			this.ListLiveAuctionFun();
// 		});
	
// 	}else{
// 		var array = [...this.state.model_id]; // make a separate copy of the array
// 		var index = array.indexOf(event.target.value)
// 		if (index !== -1) {
// 		  array.splice(index, 1);
// 		  this.setState({model_id: array}, () => {
			
// 			this.ListLiveAuctionFun();
// 		}
			
			
// 			);
	
// 		}
//   }
// }
//   onChangeCountry=(event)=>{
//     this.setState({selected: event.target.id})
	

// if(event.target.checked){
// 		this.setState({
// 		country_id: [...this.state.country_id, event.target.id]
// 	}, () => {
		
// 		this.ListCityFun()
// 		this.ListLiveAuctionFun();
// 	})

// }else{
// 	var array = [...this.state.category_id]; // make a separate copy of the array
// 	var index = array.indexOf(event.target.value)
// 	if (index !== -1) {
// 	  array.splice(index, 1);
// 	  this.setState({category_id: array}, () => {
		
// 		this.ListCityFun();
// 		this.ListLiveAuctionFun();
// 	}
		
		
// 		);

// 	}
//   }
// }
//   onChangeCity=(event)=>{
//     this.setState({selected: event.target.id})
	

// if(event.target.checked){
// 		this.setState({
// 		city_id: [...this.state.city_id, event.target.id]
// 	}, () => {
		
	
// 		this.ListLiveAuctionFun();
// 	})

// }else{
// 	var array = [...this.state.city_id]; // make a separate copy of the array
// 	var index = array.indexOf(event.target.value)
// 	if (index !== -1) {
// 	  array.splice(index, 1);
// 	  this.setState({city_id: array}, () => {
		
		
// 		this.ListLiveAuctionFun();
// 	}
		
		
// 		);

// 	}
//   }
//   }
//   onChangeSortBy=(e)=>{
//     this.setState({
//       sort_by: e.target.value,
//     });
//     this.ListLiveAuctionFun();
//   }
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

ListLiveAuctionFilter=(data)=>{
	this.setState({
		listLiveAuctionData: data
	  });
}

  
  render() {

    const { isLoggedIn, message } = this.props;
    var bannersettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 3
    };
    

    return (
      <React.Fragment>
      
<Header></Header>
<div className="main-banner" id="top">
					<img  id="bg-video"
                 src={homebanner}  />
<a className="btn" onClick={this.togglePopup.bind(this)}>Create Ad</a>
				 </div>










<section className="live-bid live-bid-page normal-ads">
	<div className="container">
		<div className="row">
			<br></br><br></br>
						<div className="col-md-12">
				<div className="heading">
					<h2>Live Bid</h2>
					<div className="bar"></div>
				</div>		
			</div>	
			
			<div className="col-md-3">
							<div className="sidebar-navigation">
               <Sidefilter auctiontype={"online"}
            liveads={this.ListLiveAuctionFilter}/>
				 
				</div>
			</div>
			
			<div className="col-md-9">
			<div className="row">
      {this.state.listLiveAuctionData && typeof this.state.listLiveAuctionData !=="undefined" & this.state.listLiveAuctionData.length > 0 && this.state.listLiveAuctionData.map((itemLiveAuctionList,l) => (
			<div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
				<div className="live-bid-content bid-new">
					<a href={"/web/product/info/" + itemLiveAuctionList.product_id}>
						<img className="card-img-top" src={itemLiveAuctionList.product_img}/>
					</a>
					<div className="live">
						<img src={live}/>
						<a href="#"><img src={order}/> 130</a>
					</div>
					<div className="bid-heading">
						<h2>{itemLiveAuctionList.title} ({itemLiveAuctionList.name} </h2>
					</div>
					<div className="date-time">
						<ul>
							<li><img src={dateImg}/>{itemLiveAuctionList.start_date_time} {itemLiveAuctionList.start_time}</li>
							<li className="loc"><img src={loc}/> Mumbai, INDIA</li>
							<li className="tim"><img src={clock}/>{itemLiveAuctionList.start_date_time} {itemLiveAuctionList.end_time}</li>
						</ul>
					</div>					
					
				</div>
			</div>
				))}
			
			
			
						<div className="col-md-12">
				<div className="see-more">
					<a href="#">See More</a>
					<div className="bar2">
				</div>
			</div>	
			
		</div>
		</div>
		</div>
	</div>
  </div>
</section>



<Footer></Footer>

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

export default connect(mapStateToProps)(LiveAuction); 
    
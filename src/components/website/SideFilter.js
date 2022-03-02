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



class SideFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
		listBannerData:[],
        listCategoryData: [],
        listSubCategoryData:[],
		listBrandData:[],
		listModelData:[],
         
		listCountryData:[],
		listcityData:[],
		listLiveAuctionData:[],
		
       
        category_id:[],
        sub_category_id:[],
        brand_id:[],
		model_id:[],
		country_id:[],
		city_id:[],
        year:[],
        live_auction:'online',
        sort_by:'',
        activeCollapse :'',
		subcatactiveCollapse:false,
		selected:false,
		pricevalue:2,
		showPopup:false

    }


   
  }

  componentDidMount() {
	  console.log("side filer is cming")
    this.ListCategoryFun();
	this.ListCountryFun();
    this.ListLiveAuctionFun();
    this.ListBannerFun();
    

  }
  handleChange = event => {
	  
    this.setState({selected: event.target.id})
	

if(event.target.checked){
		this.setState({
		category_id: [...this.state.category_id, event.target.id]
	}, () => {
		this.ListSubCategoryFun()
		this.ListBrandFun();
		this.ListLiveAuctionFun();
	});

}else{
	var array = [...this.state.category_id]; // make a separate copy of the array
	var index = array.indexOf(event.target.value)
	if (index !== -1) {
	  array.splice(index, 1);
	  this.setState({category_id: array}, () => {
		
		this.ListBrandFun();
		this.ListLiveAuctionFun();
	}
		
		
		);

	}
}
	
}

handlePriceChange = event => {
	this.setState({pricevalue: event.target.value});
	//console.log( event.target.id)
 
}
   onChangeBrand=(event)=>{
	this.setState({selected: event.target.id})
	

	if(event.target.checked){
			this.setState({
			brand_id: [...this.state.brand_id, event.target.id]
		}, () => {
			
			this.ListModelFun();
			this.ListLiveAuctionFun();
		});
	
	}else{
		var array = [...this.state.brand_id]; // make a separate copy of the array
		var index = array.indexOf(event.target.value)
		if (index !== -1) {
		  array.splice(index, 1);
		  this.setState({brand_id: array}, () => {
			console.log("category id after remove set")
			console.log( this.state.brand_id)
			this.ListModelFun();
			this.ListLiveAuctionFun();
		}
			
			
			);
	
		}
  }
}


  
//    onChangeCategory=(e)=>{
//     this.setState({
//       category_id: e.target.value,
//     });
//     this.ListSubCategoryFun(e.target.value);
//     this.ListLiveAuctionFun();
//   }
  onChangeSubCategory=(event)=>{
	this.setState({selected: event.target.id})
	

	if(event.target.checked){
			this.setState({
			sub_category_id: [...this.state.sub_category_id, event.target.id]
		}, () => {
			
			
			this.ListLiveAuctionFun();
		});
	
	}else{
		var array = [...this.state.sub_category_id]; // make a separate copy of the array
		var index = array.indexOf(event.target.value)
		if (index !== -1) {
		  array.splice(index, 1);
		  this.setState({sub_category_id: array}, () => {
			
			
			this.ListLiveAuctionFun();
		}
			
			
			);
	
		}
  }

}
  onChangeModel=(event)=>{
	this.setState({selected: event.target.id})
	

	if(event.target.checked){
			this.setState({
			model_id: [...this.state.model_id, event.target.id]
		}, () => {
			
			
			this.ListLiveAuctionFun();
		});
	
	}else{
		var array = [...this.state.model_id]; // make a separate copy of the array
		var index = array.indexOf(event.target.value)
		if (index !== -1) {
		  array.splice(index, 1);
		  this.setState({model_id: array}, () => {
			
			this.ListLiveAuctionFun();
		}
			
			
			);
	
		}
  }
}
  onChangeCountry=(event)=>{
    this.setState({selected: event.target.id})
	

if(event.target.checked){
		this.setState({
		country_id: [...this.state.country_id, event.target.id]
	}, () => {
		
		this.ListCityFun()
		this.ListLiveAuctionFun();
	})

}else{
	var array = [...this.state.category_id]; // make a separate copy of the array
	var index = array.indexOf(event.target.value)
	if (index !== -1) {
	  array.splice(index, 1);
	  this.setState({category_id: array}, () => {
		
		this.ListCityFun();
		this.ListLiveAuctionFun();
	}
		
		
		);

	}
  }
}
  onChangeCity=(event)=>{
    this.setState({selected: event.target.id})
	

if(event.target.checked){
		this.setState({
		city_id: [...this.state.city_id, event.target.id]
	}, () => {
		
		this.ListLiveAuctionFun();
		
	})

}else{
	var array = [...this.state.city_id]; // make a separate copy of the array
	var index = array.indexOf(event.target.value)
	if (index !== -1) {
	  array.splice(index, 1);
	  this.setState({city_id: array}, () => {
		
		
		this.ListLiveAuctionFun();
	}
		
		
		);

	}
  }
  }
  onChangeSortBy=(e)=>{
    this.setState({
      sort_by: e.target.value,
    });
    this.ListLiveAuctionFun();
  }
  togglePopup() {
	this.setState({
	  showPopup: !this.state.showPopup
	});
  }
  handleExpandCollaps = (name) => {
	  console.log("colla clicked")
	  console.log(name)
   
    if (this.state.activeCollapse === name) {
		console.log("value same")
      this.setState({ activeCollapse: '' })
	  if(name==="categories"){
		this.setState({ subcatactiveCollapse: false })
	  }
  } else {
      this.setState({ activeCollapse: name })
  }
   
  }

  ListCountryFun=()=>{
	 


    const { dispatch, history } = this.props;
    dispatch(CountryList())
      .then((response) => {
		
        this.setState({
          listCountryData: response.data
        });
      })
      .catch(() => {
		  
        this.setState({
			listCountryData: []
        });
      });
  }
  ListCityFun=()=>{
	


  const { dispatch, history } = this.props;
  dispatch(CountryCityList(this.state.country_id))
	.then((response) => {
	
	  this.setState({
		listcityData: response.data
	  });
	})
	.catch(() => {
		
	  this.setState({
		listcityData: []
	  });
	});
}
   ListSubCategoryFun=(category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(SubCategoryList(this.state.category_id))
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

ListBrandFun =() =>{
	const { dispatch, history } = this.props;
    dispatch(BrandList(this.state.category_id))
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
ListModelFun =() =>{
	const { dispatch, history } = this.props;
    dispatch(BrandModelLst(this.state.brand_id))
	.then((response) => {
        this.setState({
			listModelData: response.data
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
			listModelData: []
        });
      });

}
    ListCategoryFun=()=>{
console.log("list cat")
    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
		  console.log(response.data)
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
    dispatch(LiveListFilter(this.props.auctiontype,this.state.category_id,this.state.sub_category_id,this.state.year,this.state.sort_by))
      .then((response) => {
        
        this.setState({
          listLiveAuctionData: response.data
        }, () => {
		
			this.props.liveads(response.data);
			
		})
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listLiveAuctionData: []
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
      slidesToScroll: 3
    };
    

    return (
      <React.Fragment>
      

{/* <div className="main-banner" id="top">
					<img  id="bg-video"
                 src={homebanner}  />
<a className="btn" onClick={this.togglePopup.bind(this)}>Create Ad</a>
				 </div> */}








{/* <section className="live-bid live-bid-page normal-ads"> */}
	{/* <div className="container">
		<div className="row"> */}
{/* 		
									<div className="col-md-12">
				<div className="heading">
					<h2>Live Bid</h2>
					<div className="bar"></div>
				</div>		
			</div>	
			 */}
			{/* <div className="col-md-3">
							<div className="sidebar-navigation"> */}
               <div>
				  <ul>
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("categories")}>Categories <i className="fa fa-chevron-down"></i></a>
            <div id='categories' style={{ display: this.state.activeCollapse ==='categories' ? 'block' : 'none'  }}>
              <ul>
			  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
							  <li>
								  
								  <Checkbox
							  id={itemTaskList.category_id}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
			  selectedId={this.state.selected}
              
			  onChange = {this.handleChange}
            />{itemTaskList.category_name}
							
							  </li>
							   ))}
							    <li><a href="javascript:void(0)" onClick={() => this.setState({subcatactiveCollapse: !this.state.subcatactiveCollapse})}>Sub Categories <i className="fa fa-chevron-down"></i></a>
            <div id='categories' style={{ display: this.state.activeCollapse ==='categories' && this.state.subcatactiveCollapse===true  ? 'block' : 'none'  }}>
              <ul>
			  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
							  <li>
								  
								  <Checkbox
							  id={itemTaskList.sub_category_id}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
			  selectedId={this.state.selected}
              
			  onChange = {this.onChangeSubCategory}
            />{itemTaskList.sub_category_name}
							
							  </li>
							   ))}
				  </ul>
				  </div>
				  </li>
							   
							  {/* <li><a href="#">Technology</a></li>
							  <li><a href="#">Game</a></li>
							  <li><a href="#">Software</a></li>
							  <li><a href="#">Internet</a></li> */}
						  </ul>
              </div>
					  </li>
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("brands")}>ALL BRANDS <i className="fa fa-chevron-down"></i></a>
            <div id='brands' style={{ display: this.state.activeCollapse ==='brands' ? 'block' : 'none'  }}>
              <ul>
			  {this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList,m) => (
			  
			  <li>
								  
			  <Checkbox
		  id={itemTaskList.brand_id}
icon={icon}
checkedIcon={checkedIcon}
style={{ marginRight: 8 }}
selectedId={this.state.selected}

onChange = {this.onChangeBrand}
/>{itemTaskList.brand_name}
		
		  </li>
		   ))}
						  </ul>
              </div>
					  </li>

					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("models")}>ALL MODELS <i className="fa fa-chevron-down"></i></a>
            <div id='models' style={{ display: this.state.activeCollapse ==='models' ? 'block' : 'none'  }}>
						  <ul>
						  {this.state.listModelData && typeof this.state.listModelData !=="undefined" & this.state.listModelData.length > 0 && this.state.listModelData.map((itemTaskList,m) => (
							   <li>
								  
							   <Checkbox
						   id={itemTaskList.model_id}
				 icon={icon}
				 checkedIcon={checkedIcon}
				 style={{ marginRight: 8 }}
				 selectedId={this.state.selected}
				 
				 onChange = {this.handleChange}
				 />{itemTaskList.model_name}
						 
						   </li>
							//   <li><a href="#">Technology</a></li>
							//   <li><a href="#">Game</a></li>
							//   <li><a href="#">Software</a></li>
							//   <li><a href="#">Internet</a></li>
							  ))}
						  </ul>
              </div>
					  </li>	
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("price")}>Price Range <i className="fa fa-chevron-down"></i></a>
            <div id='price' style={{ display: this.state.activeCollapse ==='price' ? 'block' : 'none'  }}>
						  <ul>
							  <li>  <input
      type="range"
     
      min={0}
      max={100}
      step={0.5}
      // value={state} // don't set value from state
      defaultValue={0} // but instead pass state value as default value
      onChange={e => this.setState({pricevalue: e.target.value})} // don't set state on all change as react will re-render
    //   onMouseUp={this.handlePriceChange} // only set state when handle is released
    />

		<div>{this.state.pricevalue}</div>					 
							  </li>
							
						  </ul>
              </div>
					  </li>					  
           		
					
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("location")}>Country <i className="fa fa-chevron-down"></i></a>
            <div id='location' style={{ display: this.state.activeCollapse ==='location' ? 'block' : 'none'  }}>
						  <ul>
						  {this.state.listCountryData && typeof this.state.listCountryData !=="undefined" & this.state.listCountryData.length > 0 && this.state.listCountryData.map((itemTaskList,m) => (
							   <li>
								  
							   <Checkbox
						   id={itemTaskList.country_id}
				 icon={icon}
				 checkedIcon={checkedIcon}
				 style={{ marginRight: 8 }}
				 selectedId={this.state.selected}
				 
				 onChange = {this.onChangeCountry}
				 />{itemTaskList.country_name}
						 
						   </li>
						  ))}
						  </ul>
              </div>
					  </li>	
					  <li><a href="javascript:void(0)" onClick={() => this.handleExpandCollaps("city")}>city <i className="fa fa-chevron-down"></i></a>
            <div id='city' style={{ display: this.state.activeCollapse ==='city' ? 'block' : 'none'  }}>
						  <ul>
						  {this.state.listcityData && typeof this.state.listcityData !=="undefined" & this.state.listcityData.length > 0 && this.state.listcityData.map((itemTaskList,m) => (
							   <li>
								  
							   <Checkbox
						   id={itemTaskList.city_id}
				 icon={icon}
				 checkedIcon={checkedIcon}
				 style={{ marginRight: 8 }}
				 selectedId={this.state.selected}
				 
				 onChange = {this.onChangeCity}
				 />{itemTaskList.city_name}
						 
						   </li>
						  ))}
						  </ul>
              </div>
					  </li>		  

				  </ul>
				{/* </div> */}
			</div>
			
{/* 		
	 </div>
  </div> */}






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

export default connect(mapStateToProps)(SideFilter); 
    
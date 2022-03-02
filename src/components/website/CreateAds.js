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


import { CategoryList, ProductList, BannerList,CountryList,CountryCityList,SubCategoryListByCategory,SubCatBrandList,BrandModelLst,ProductAdd } from "./../../actions/website/Home";


import Header from './Header';
import Footer from './Footer';
import homebanner from './../../assets/website/img/homebanner.jpg'
import product1 from './../../assets/website/img/product2.png'
// import "react-multi-carousel/lib/styles.css";
import   './../../assets/website/css/sliderstyle.css'
import Slider from "react-slick";
// const Slider = require('react-slick');
// import Slider from "react-slick";

toast.configure();

  


class Createads extends Component {
    constructor(props) {
        super(props);
        this.ListCategoryFun = this.ListCategoryFun.bind(this);
        this.ListCountryFun = this.ListCountryFun.bind(this);
        this.ListCityFun = this.ListCityFun.bind(this);
        this.ListSubCategoryFun=this.ListSubCategoryFun.bind(this)
        this.ListBrandFun = this.ListBrandFun.bind(this);
        this.ListModelFun = this.ListModelFun.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChangeBrand=this.onChangeBrand.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     
        this.state = {
            listCategoryData: [],
            listSubCategoryData:[],
            listBrandData:[],
            listModelData:[],
            listCountryData:[],
            listCityData:[],
            listProductData: [],
    
            addProductList : [],
    
            productMoreAddData: [],
            productMoreAddDataEdit: [],
            title:'',
            name:'',
            description:'',
            keywords:'',
            category_id:0,
            brand_id:0,
            model_id:0,
            country_id:0,
            city_id:0,
            sub_category_id:0,
            start_date_time:'',
            end_date_time:'',
            start_time:'',
            end_time:'',
    
            auction_type:'',
            starting_price:0,
            high_price:0,
            final_price:0,
            refund:'no',
            refund_days:0,
            youtube_link:'',
            video:'',
            product_img:[],
    
            delete_id:0,
    
            product_id:0,
            edit_title:'',
            edit_name:'',
            edit_description:'',
            edit_keywords:'',
            edit_category_id:0,
            edit_brand_id:0,
            edit_country_id:0,
            edit_city_id:0,
            edit_model_id:0,
            edit_sub_category_id:0,
            edit_start_date_time:'',
            edit_end_date_time:'',
            edit_start_time:'00:00',
            edit_end_time:'00:00',
            edit_auction_type:'',
            edit_starting_price:0,
            edit_high_price:0,
            edit_final_price:0,
            edit_refund:'no',
            edit_refund_days:0,
            edit_youtube_link:'',
            edit_video:'',
            edit_product_img:[],
            edit_product_view_img:[],
            edit_video_view:'',
    
            other_show:false,
            other_edit_show:false,
    
    
        };
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
        //     let path = `/web`; 
		// 	history.push(path);
        //   history.push()
        }
        this.ListCategoryFun();
        this.ListCountryFun();
      }
      handleSubmit=(e)=>{
        e.preventDefault();
    
        this.setState({
          loading: true,
        });
    
        this.Addform.validateAll();
    
        const { dispatch, history } = this.props;
    
         var add_product_img = [];
        $('.add_product_img').each(function(index, element){
          console.log("element: ")
          console.log(element.files[0])
          add_product_img.push(element.files[0]);
        });
        
         var add_video = [];
        $('.add_video').each(function(index, element){
          console.log("element: ")
          console.log(element.files[0])
          add_video.push(element.files[0]);
        });
    
        if (this.checkBtn.context._errors.length === 0) {
          dispatch(ProductAdd(this.state.title,this.state.name,this.state.description,this.state.keywords,this.state.category_id,this.state.sub_category_id,this.state.brand_id,this.state.model_id,this.state.country_id,this.state.city_id,this.state.start_date_time,this.state.end_date_time,this.state.auction_type,this.state.starting_price,this.state.high_price,this.state.final_price,this.state.refund,this.state.refund_days,this.state.youtube_link,add_product_img,add_video,this.state.start_time,this.state.end_time))
            .then((response) => {
                if(response.success || response.success ==="true" || response.success ===true){
                  toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                  this.ListProductFun();
                  this.setState({ category_id: '',sub_category_id: '',  product_name: '' });
                  $("#add_form").modal("hide");
                }else{
                  toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                }
            })
            .catch((error) => {
              this.setState({
                loading: false
              });
              toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            });
        } else {
          this.setState({
            loading: false,
          });
          toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      }
      ListCategoryFun=()=>{

        const { dispatch, history } = this.props;
        dispatch(CategoryList())
          .then((response) => {
            this.setState({
              listCategoryData: response.data
            });
          })
          .catch(() => {
            this.setState({
              listCategoryData: []
            });
          });
      }
     
      ListSubCategoryFun=()=>{
        console.log("now categorylist ")
    
        const { dispatch, history } = this.props;
        dispatch(SubCategoryListByCategory(this.state.category_id))
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
      ListBrandFun=(subcategory_id)=>{

        const { dispatch, history } = this.props;
        dispatch(SubCatBrandList(subcategory_id))
          .then((response) => {
            this.setState({
              listBrandData: response.data
            });
          })
          .catch(() => {
            this.setState({
              listBrandData: []
            });
          });
      }
      ListModelFun=(brand_id)=>{

        const { dispatch, history } = this.props;
        dispatch(BrandModelLst(brand_id))
          .then((response) => {
            this.setState({
              listModelData: response.data
            });
          })
          .catch(() => {
            this.setState({
              listModelData: []
            });
          });
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

      ListCityFun =(country_id)=>{
        console.log("city list called")
            const { dispatch, history } = this.props;
            dispatch(CountryCityList(country_id))
              .then((response) => {
                this.setState({
                  listCityData: response.data
                });
              })
              .catch(() => {
                this.setState({
                  listCityData: []
                });
              });
          }
          onChangeCountry=(e)=>{
            var country_id=e.target.value
            this.setState({
              country_id: e.target.value,
            }, () => {
              this.ListCityFun(country_id);
          });
           
          }
          onChangeCity=(e)=>{
            this.setState({
              city_id: e.target.value,
            });
           
          }
          onChangeCategory=(e)=>{
            var catid=e.target.value
            this.setState({
              category_id: e.target.value,
            }, () => {
              this.ListSubCategoryFun(catid)
             
          });
          }
          onChangeSubCategory=(e)=>{
            var subcatid=e.target.value
            this.setState({
              sub_category_id: e.target.value,
            }
            , () => {
              
              this.ListBrandFun(subcatid);
          });
          }
          onChangeBrand=(e)=>{
            var brandid=e.target.value
            this.setState({
              brand_id: e.target.value,
            }, () => {
              this.ListModelFun(brandid);
          });
            //this.ListBrandFun(e.target.value);
          }
          onChangeModel=(e)=>{
            this.setState({
              model_id: e.target.value,
            });
            //this.ListBrandFun(e.target.value);
          }
          onChangeAuctionType=(e)=>{
            if(e.target.value==="online"){
              this.setState({
                other_show: true,
                auction_type: e.target.value,
              });
            }else{
              this.setState({
                other_show: false,
                auction_type: e.target.value,
              });
            }
          }
      render() {

        const { isLoggedIn, message } = this.props;
    
        
        return (
          <React.Fragment>
              <div id="main-wrapper">

<Header />
<div className="main-banner" id="top">
<img  
src={homebanner}  />
</div>
              	<div class="bottom-header">
	<div class="container">
		<div class="row">
		
				
			</div>
		</div>
	</div>
    <section class="breadcrumb-products my-bid">
	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<nav aria-label="breadcrumb">
				  <ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Home</a></li>
					<li class="breadcrumb-item"><a href="#">Add Products</a></li>
				  </ol>
				</nav>
            </div>
		</div>
	</div>
</section>
<section class="our-products-details">
	<div class="container">
		<div class="row">
			<div class="col-md-6">
			<div class="product-slider">

				<div id='carousel-custom' class='carousel slide' data-ride='carousel'>
					<div class='carousel-outer'>
						
						<div class='carousel-inner '>
							<div class='item active'>
								<img src={product1} alt=''id="zoom_05"  data-zoom-image="images/product2.png"/>
							</div>
							


						</div>
							
						
						<a class='left carousel-control' href='#carousel-custom' data-slide='prev'>
							<span class='glyphicon glyphicon-chevron-left'></span>
						</a>
						<a class='right carousel-control' href='#carousel-custom' data-slide='next'>
							<span class='glyphicon glyphicon-chevron-right'></span>
						</a>
					</div>
					
					
					<ol class='carousel-indicators mCustomScrollbar meartlab'>
						<li data-target='#carousel-custom' data-slide-to='0' class='active'><img src='images/product2.png' alt='' /></li>
						<li data-target='#carousel-custom' data-slide-to='1'><img src='images/product2.png' alt='' /></li>
						<li data-target='#carousel-custom' data-slide-to='2'><img src='images/product2.png' alt='' /></li>
						<li data-target='#carousel-custom' data-slide-to='3'><img src='images/product2.png' alt='' /></li>
						<li data-target='#carousel-custom' data-slide-to='4'><img src='images/product2.png' alt='' /></li>

					</ol>
				</div>
				</div>
			</div>
			
			<div class="col-md-6">
				<div class="add-my-product">	
					<h1>Add Products</h1>
					<div class="products-form">
          <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
							<div class="col-md-12">
								<div class="form-group">
									<input type="text" name="title" placeholder="Tilte" required/>
								</div>
							</div>
							
							<div class="col-md-12">
								<div class="form-group">
									<input type="text" name="name" placeholder="Name" required/>
								</div>
							</div>							
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<select class="select-countr" placeholder="Select Country"  id="country_id" name="country_id" value={this.state.country_id} onChange={this.onChangeCountry} required>
										<option value="">Select Country</option>
										
										{this.state.listCountryData && typeof this.state.listCountryData !=="undefined" & this.state.listCountryData.length > 0 && this.state.listCountryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.country_id}>{itemTaskList.country_name}</option>
                                  ))}
									</select>
								</div>
							</div>							
							
							<div class="col-md-6 disp_in_block">
              <div className="form-group">
                             
                              <select className="select-city" placeholder="City" id="city_id" name="city_id" value={this.state.city_id} onChange={this.onChangeCity} required >
                                  <option value="">Select City</option>
                                  {this.state.listCityData && typeof this.state.listCityData !=="undefined" & this.state.listCityData.length > 0 && this.state.listCityData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.city_id}>{itemTaskList.city_name}</option>
                                  ))}
                              </select>
                            </div>
                
								{/* <div class="form-group">
									<select class="select-city" id="city_id" name="city_id" value={this.state.city_id} onChange={this.onChangeCity} required>
										<option>Select City</option>
										{this.state.listCityData && typeof this.state.listCityData !=="undefined" & this.state.listCityData.length > 0 && this.state.listCityData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.city_id}>{itemTaskList.city_name}</option>
                                  ))}
									</select>
								</div> */}
							</div>								
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<select class="select-Category" placeholder="Category" id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required>
										<option value="">Select Category </option>
										{this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
									</select>
								</div>
							</div>		
                            <div class="col-md-6 disp_in_block">
								<div class="form-group">
									<select class="select-Brand" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeSubCategory} required>
										<option value=""> Select Sub Category </option>
										{this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>{itemTaskList.sub_category_name}</option>
                                  ))}
									</select>
								</div>
							</div>								
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<select class="select-Brand" id="brand_id" name="brand_id" value={this.state.brand_id} onChange={this.onChangeBrand} required>
										<option>Select Brand </option>
										{this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.brand_id}>{itemTaskList.brand_name}</option>
                                  ))}
									</select>
								</div>
							</div>								
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<select class="select-Model" id="model_id" name="model_id" value={this.state.model_id} onChange={this.onChangeModel} required>
										<option>Select Model </option>
                    {this.state.listModelData && typeof this.state.listModelData !=="undefined" & this.state.listModelData.length > 0 && this.state.listModelData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.model_id}>{itemTaskList.model_name}</option>
                                  ))}
									</select>
								</div>
							</div>	
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<select class="select-Auction" id="auction_type" name="auction_type" value={this.state.auction_type} onChange={this.onChangeAuctionType} required>
										<option>Select Auction type</option>
									
                    <option value="online">Online</option>
                   <option value="offline">Offline</option>
									</select>
								</div>
							</div>								
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<input type="number" name="price" placeholder="Price" required/>
								</div>
							</div>								
							
							
							<div class="col-md-6 disp_in_block">
								<div class="form-group">
									<input type="text" name="Keywords" placeholder="Keywords"/>
								</div>
							</div>								
                            <div class="col-sm-3 disp_in_block">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" placeholder="Start Date Time" id="start_date_time" name="start_date_time"  />
                            </div>
                          </div>
                          
                          <div class="col-sm-3 disp_in_block">
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" className="form-control" placeholder="End Date Time" id="end_date_time" name="edit_end_date_time"  required />
                            </div>
                          </div>						
							{/* <div class="col-md-6">
								<div class="form-group">
									<select class="select-Refund ">
										<option>Refund </option>
										<option selected>Refund </option>
										<option>Refund </option>
										<option>Refund </option>
									</select>
								</div>
							</div>	 */}
														
							
							{/* <div class="col-md-6">
								<div class="form-group">
									<input type="text" name="Refund" placeholder="Refund Days"/>
								</div>
							</div>							 */}
							
								
							<div class="col-md-12">
								<div class="form-group">
									<textarea name="your-message"  placeholder="Description"></textarea>
								</div>
							</div>		

							<div class="col-md-12">
								<div class="post-btn form-group">
									<input type="submit" value="Post" class="post-submit"/>
								</div>
							</div>								
							
						
							
						</Form>
					</div>
				</div>
            </div>	


			
			
		</div>
	</div>
</section>
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
    
    export default connect(mapStateToProps)(Createads);
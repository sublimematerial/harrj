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
import {GlassMagnifier} from "react-image-magnifiers";


import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminLogin } from "./../../actions/auth";

import { ProductInfo } from "./../../actions/website/ProductInfo";



import Header from './Header';
import Footer from './Footer';


import logoImg from './../../assets/website/img/logo-01.png';
import productImg from './../../assets/website/img/product/product1.png';
import coverImg from './../../assets/website/img/co.jpg';
import reviewImg from './../../assets/website/img/team-2.jpg';






toast.configure();
var LiveAuction='online';
var NormalAuction='offline';
var product_id = 0;




class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
        ProductData:[],
        product_id:0,
        product_first_img:''
    }

      product_id = props.match.params.product_id;
      
      this.setState({ product_id: product_id });
      console.log("Shree"+product_id);

      history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
  });
  }

  componentDidMount() {
    this.ProductInfoFun();
  }


  ProductInfoFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ProductInfo(product_id))
      .then((response) => {
        this.setState({
          ProductData: response.data[0],
          product_first_img: response.data[0].product_img_list[0].product_img,


        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          ProductData: []
        });
      });
  }

   zoomImg=(e)=>{
    console.log("Shree");
    console.log(this.src);

   $("#zoom_img").attr("imageSrc",e.target.src)
  }



  render() {

    const { isLoggedIn, message } = this.props;
    
    return (
      <React.Fragment>
    
<div id="main-wrapper">
<Header />
	<div class="clearfix" style={{"paddingBottom":"90px"}}></div>
    <section class="bg-cover" style={{backgroundImage: "url(" + coverImg + ")"}}>
     <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="text-center py-5 mt-3 mb-3">
                        <h1 class="ft-medium mb-3"></h1>
                      
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="middle">
        <div class="container">
            <div class="row">
            
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                   {/* <div class="sp-loading"><img src={this.state.product_first_img} width="100%" alt=""/><br/>LOADING IMAGES</div>
                    
                    <div class="sp-wrap">
                    {this.state.ProductData.product_img_list && typeof this.state.ProductData.product_img_list !=="undefined" && this.state.ProductData.product_img_list.map((img_arr,k) => (
                    
                        <a href={img_arr.product_img}><img src={img_arr.product_img} alt=""/></a>
                   
                    ))}
                    </div>
                    */}

                    <GlassMagnifier id="zoom_img"
                          imageSrc={productImg}
                          imageAlt="Example"
                          largeImageSrc={productImg}
                    />
                     <div>
                    {this.state.ProductData.product_img_list && typeof this.state.ProductData.product_img_list !=="undefined" && this.state.ProductData.product_img_list.map((img_arr,k) => (
                    
                        <img src={img_arr.product_img} alt="" height="50px" width="50px" onClick={this.zoomImg}/>
                   
                    ))}
                    </div>
                </div>
                
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div class="prd_details">
                        
                        <div class="prt_02 mb-3">
                            <h2 class="ft-bold mb-1">{this.state.ProductData.title} ({this.state.ProductData.name})</h2>
                            <div class="text-left">
                                
                                <div class="elis_rty"><span class="ft-bold theme-cl fs-lg">Current Price:{this.state.ProductData.starting_price}</span></div>
                            </div>
                        </div>
                        
                        <div class="prt_03 mb-4">
                            <p>{this.state.ProductData.description}</p>
                        </div>
                        
                        <div class="prt_04 mb-4">
                            <p class="d-flex align-items-center mb-1">Category:<strong class="fs-sm text-dark ft-medium ml-1">{this.state.ProductData.category_name}</strong></p>
                             </div>
                        
                        <div class="prt_05 mb-4">
                            <div class="form-row mb-7">
                               
                                <div class="col-12 col-lg">
                                   <input type="number" class="custom-height form-control" data-toggle="button" placeholder="Enter Your Bid Amount"/>
                                    
                                </div>
                                <div class="col-12 col-lg-auto">
                                    <button class="btn custom-height btn-default btn-block mb-2 bg-dark" data-toggle="button">
                                       Submit
                                    </button>
                                </div>
                          </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
   

    <section class="middle">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xl-11 col-lg-12 col-md-12 col-sm-12">
                    <ul class="nav nav-tabs b-0 d-flex align-items-center justify-content-center simple_tab_links mb-4" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="description-tab" href="#description" data-toggle="tab" role="tab" aria-controls="description" aria-selected="true">Description</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" href="#information" id="information-tab" data-toggle="tab" role="tab" aria-controls="information" aria-selected="false">Additional information</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" href="#reviews" id="reviews-tab" data-toggle="tab" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                        </li>
                    </ul>
                    
                    <div class="tab-content" id="myTabContent">
                        
                        <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                            <div class="description_info">
                                <p class="p-0 mb-2">{this.state.ProductData.description}</p>
                                <p class="p-0">{this.state.ProductData.description}</p>
                            </div>
                        </div>
                        
                        <div class="tab-pane fade" id="information" role="tabpanel" aria-labelledby="information-tab">
                            <div class="additionals">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                          <th class="ft-medium text-dark">ID</th>
                                          <td>{this.state.ProductData.product_id}</td>
                                        </tr>
                                        <tr>
                                          <th class="ft-medium text-dark">SKU</th>
                                          <td>{this.state.ProductData.product_id}</td>
                                        </tr>
                                        <tr>
                                          <th class="ft-medium text-dark">Color</th>
                                          <td>Sky Blue</td>
                                        </tr>
                                        <tr>
                                          <th class="ft-medium text-dark">Size</th>
                                          <td>Xl, 42</td>
                                        </tr>
                                        <tr>
                                          <th class="ft-medium text-dark">Weight</th>
                                          <td>450 Gr</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                       <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                            <div class="reviews_info">
                                <div class="single_rev d-flex align-items-start br-bottom py-3">
                                    <div class="single_rev_thumb"><img src={reviewImg} class="img-fluid circle" width="90" alt="profile picture" /></div>
                                    <div class="single_rev_caption d-flex align-items-start pl-3">
                                        <div class="single_capt_left">
                                            <h5 class="mb-0 fs-md ft-medium lh-1">Daniel Rajdesh</h5>
                                            <span class="small">30 jul 2021</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum</p>
                                        </div>
                                        <div class="single_capt_right">
                                            <div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="single_rev d-flex align-items-start br-bottom py-3">
                                    <div class="single_rev_thumb"><img src={reviewImg} class="img-fluid circle" width="90" alt="profile picture" /></div>
                                    <div class="single_rev_caption d-flex align-items-start pl-3">
                                        <div class="single_capt_left">
                                            <h5 class="mb-0 fs-md ft-medium lh-1">Seema Gupta</h5>
                                            <span class="small">30 Aug 2021</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum</p>
                                        </div>
                                        <div class="single_capt_right">
                                            <div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="single_rev d-flex align-items-start br-bottom py-3">
                                    <div class="single_rev_thumb"><img src={reviewImg} class="img-fluid circle" width="90" alt="profile picture" /></div>
                                    <div class="single_rev_caption d-flex align-items-start pl-3">
                                        <div class="single_capt_left">
                                            <h5 class="mb-0 fs-md ft-medium lh-1">Mark Jugermi</h5>
                                            <span class="small">10 Oct 2021</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum</p>
                                        </div>
                                        <div class="single_capt_right">
                                            <div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="single_rev d-flex align-items-start py-3">
                                    <div class="single_rev_thumb"><img src={reviewImg} class="img-fluid circle" width="90" alt="profile picture" /></div>
                                    <div class="single_rev_caption d-flex align-items-start pl-3">
                                        <div class="single_capt_left">
                                            <h5 class="mb-0 fs-md ft-medium lh-1">Meena Rajpoot</h5>
                                            <span class="small">17 Dec 2021</span>
                                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum</p>
                                        </div>
                                        <div class="single_capt_right">
                                            <div class="star-rating align-items-center d-flex justify-content-left mb-1 p-0">
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                                <i class="fas fa-star filled"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div class="reviews_rate">
                                <form class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <h4>Submit Rating</h4>
                                    </div>
                                    
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div class="revie_stars d-flex align-items-center justify-content-between px-2 py-2 gray rounded mb-2 mt-1">
                                            <div class="srt_013">
                                                <div class="submit-rating">
                                                  <input id="star-5" type="radio" name="rating" value="star-5" />
                                                  <label for="star-5" title="5 stars">
                                                    <i class="active fa fa-star" aria-hidden="true"></i>
                                                  </label>
                                                  <input id="star-4" type="radio" name="rating" value="star-4" />
                                                  <label for="star-4" title="4 stars">
                                                    <i class="active fa fa-star" aria-hidden="true"></i>
                                                  </label>
                                                  <input id="star-3" type="radio" name="rating" value="star-3" />
                                                  <label for="star-3" title="3 stars">
                                                    <i class="active fa fa-star" aria-hidden="true"></i>
                                                  </label>
                                                  <input id="star-2" type="radio" name="rating" value="star-2" />
                                                  <label for="star-2" title="2 stars">
                                                    <i class="active fa fa-star" aria-hidden="true"></i>
                                                  </label>
                                                  <input id="star-1" type="radio" name="rating" value="star-1" />
                                                  <label for="star-1" title="1 star">
                                                    <i class="active fa fa-star" aria-hidden="true"></i>
                                                  </label>
                                                </div>
                                            </div>
                                            
                                            <div class="srt_014">
                                                <h6 class="mb-0">4 Star</h6>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="medium text-dark ft-medium">Full Name</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <label class="medium text-dark ft-medium">Email Address</label>
                                            <input type="email" class="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <label class="medium text-dark ft-medium">Description</label>
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div class="form-group m-0">
                                           <button class="btn custom-height stretched-link hover-black bg-dark" data-toggle="button">
                                                Submit Review
                                             </button>
                                        </div>
                                    </div>
                                    
                                </form>
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

export default connect(mapStateToProps)(ProductDetails);
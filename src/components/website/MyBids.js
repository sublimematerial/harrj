
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
import Header from './Header';
import Footer from './Footer';
import homebanner from './../../assets/website/img/homebanner.jpg'
import boss from './../../assets/website/img/livebid/boss.png';
import liveIcon from './../../assets/website/icons/live_icon.png';
import bidIcon from './../../assets/website/icons/bid_icon.png';
import calenderIcon from './../../assets/website/icons/calender_icon.svg';
import timerIcon from './../../assets/website/icons/timer__icon.png';
import locationIcon from './../../assets/website/icons/location__icon.svg';
import banner1 from  './../../assets/website/img/livebid/banner-1.png';

import bannerbg from './../../assets/website/img/livebid/banner-bg.png';
import live from './../../assets/website/img/livebid/live.png';
import order from './../../assets/website/img/livebid/order.png';
import dateImg from  './../../assets/website/img/livebid/date.png';
import loc from './../../assets/website/img/livebid/loc.png';
import clock from './../../assets/website/img/livebid/clock.png'
class MyBids extends Component {

    constructor(props) {
		super(props);
		this.state = {listBidData: [],itemsToShow: 4,expanded: false,}
        this.showMore = this.showMore.bind(this);
    }
    showMore= () => {
		this.state.normalToShow === 4 ? (
			this.setState({ itemsToShow: this.state.listNormalAuctionData.length, normalexpanded: true })
		  ) : (
			this.setState({ itemsToShow:4 , normalexpanded: false })
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
    render() {
        return (
			<React.Fragment>

<div id="main-wrapper">

					<Header />
					<div className="main-banner" id="top">
					<img  
                 src={homebanner}  />

		    
    {/* <a className="btn" onClick={this.togglePopup.bind(this)}>Create Ad</a> */}
	
	</div>
    <section class="breadcrumb-products">
	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<nav aria-label="breadcrumb">
				  <ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">HOME</a></li>
					<li class="breadcrumb-item"><a href="#">MY BIDS</a></li>
				  </ol>
				</nav>
            </div>
		</div>
	</div>
</section>
<section class="bose-quiet">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="col-md-6 col-sm-6 col-xs-12">
				<div class="bose-heading">
					<h1>My Bids</h1>
				</div>
				</div>
				<div class="col-md-6 col-sm-6 col-xs-12">
				<form class="search-product" action="/action_page.php">
				  <input type="text" placeholder="Search.." name="search"/>
				  <button type="submit"><i class="fa fa-search"></i></button>
				</form>
				</div>
			</div>
			</div>
			
			<div class="row">			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
			<div class="col-md-4 col-sm-6 col-xs-12">			
				<div class="bose-comfrt">
					<img src={boss}/>
					<div class="bids-btn">
						<a href="#">20 Bids</a>
					</div>
					<div class="icr">
						<div class="icr-left">
							<h2>Bose Quiet Comfort</h2>
							<h1>ICR</h1>
							<p>Status: Not Delivered</p>
							<strong>Bid Amount: 75L</strong>
						</div>
						<div class="icr-right">
							<h2>Online Bid</h2>
							<div class="date-time">
								<ul>
									<li><img src={dateImg}/> 20/05/21-20/05/22</li>
									<li class="tim"><img src={clock}/> 01:00AM-02:30PM</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</div>			
			
<div class="col-md-12">
				<div class="see-more my-bid-see">
					<a href="#">See More</a>
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
export default connect(mapStateToProps)(MyBids);
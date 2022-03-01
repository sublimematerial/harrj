import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

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
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";
import { DashboardCount } from "./../../actions/adminDashboard";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

const data = {
  labels: ['Aug-21', 'Sep=21', 'Oct-21', 'Sep-21'],
  datasets: [
    {
      label: '# of Offline',
      data: [12, 19, 3, 5],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Online',
      data: [2, 3, 20, 5],
      backgroundColor: 'rgb(54, 162, 235)',
    }
  ],
};

const options = {
  scales: {
    y: {
      stacked: true,
      ticks: {
        beginAtZero: true
      }
    },
    x: {
      stacked: true
    }
  }
};

const dataDoughnut = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const dataPolarArea = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};


const dataLine = {
  labels: ['Jun-21', 'Jul-21', 'Aug-21', 'Sep-21', 'Oct-21', 'Nov-21'],
  datasets: [
    {
      label: '# Online',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: '# Offline',
      data: [10, 11, 6, 2, 1, 7],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const optionsLine = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        listDashboardCountData:[],
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.DashboardCountFun();
  }
    
   DashboardCountFun=()=>{
console.log("DashboardCountFun");
    
    const { dispatch, history } = this.props;
    dispatch(DashboardCount())
      .then((response) => {
        this.setState({
          listDashboardCountData: response.data
        });
        // this.TableDataUpdate();
        console.log("Shree");
        console.log(response.data);
      })
      .catch(() => {
        this.setState({
          listDashboardCountData: []
        });
      });
  }
  render() {

    const { isLoggedIn, message } = this.props;

    return (
    <React.Fragment>
        <div class="main-wrapper">
            <Header />
            <SideBar />
            <div class="page-wrapper">
            
                <div class="content container-fluid">
                
                    <div class="page-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="page-title">Welcome Admin!</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                
                    <div class="row">
                        
                    

                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-user" aria-hidden="true"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>{this.state.listDashboardCountData['client_count']}</h3>
                                        <span>Client</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-user-circle" aria-hidden="true"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>{this.state.listDashboardCountData['user_count']}</h3>
                                        <span>User</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-user-circle" aria-hidden="true"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>{this.state.listDashboardCountData['product_count']}</h3>
                                        <span>Product</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-ticket" aria-hidden="true"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>{this.state.listDashboardCountData['online_auction_count']}</h3>
                                        <span>Live Auction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-ticket" aria-hidden="true"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>{this.state.listDashboardCountData['offline_auction_count']}</h3>
                                        <span>Regular Auction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-4">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-user" aria-hidden="true"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>{this.state.listDashboardCountData['category_count']}</h3>
                                        <span>Category</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    
                    <div class="row">
                    <div class="col-md-6">
                      <Line data={dataLine} options={optionsLine} />
      
                    </div>
                        <div class="col-md-6">
                        <PolarArea data={dataPolarArea} />     
                    </div>

                   </div>

                   {/*  <div class="row">
                        <Doughnut data={dataDoughnut} />
                    </div>

                    <div class="row">
                        <PolarArea data={dataPolarArea} />
                    </div>

                    <div class="row">
                        <Line data={dataLine} options={optionsLine} />
                    </div>*/}

                    {/*<div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6 text-center">
                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">Total Revenue</h3>
                                            <div id="bar-charts"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 text-center">
                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">Sales Overview</h3>
                                            <div id="line-charts"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                    {/*<div class="row">
                        <div class="col-md-12">
                            <div class="card-group m-b-30">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-3">
                                            <div>
                                                <span class="d-block">New Employees</span>
                                            </div>
                                            <div>
                                                <span class="text-success">+10%</span>
                                            </div>
                                        </div>
                                        <h3 class="mb-3">10</h3>
                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: 70%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p class="mb-0">Overall Employees 218</p>
                                    </div>
                                </div>
                            
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-3">
                                            <div>
                                                <span class="d-block">Earnings</span>
                                            </div>
                                            <div>
                                                <span class="text-success">+12.5%</span>
                                            </div>
                                        </div>
                                        <h3 class="mb-3">$1,42,300</h3>
                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: 70%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p class="mb-0">Previous Month <span class="text-muted">$1,15,852</span></p>
                                    </div>
                                </div>
                            
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-3">
                                            <div>
                                                <span class="d-block">Expenses</span>
                                            </div>
                                            <div>
                                                <span class="text-danger">-2.8%</span>
                                            </div>
                                        </div>
                                        <h3 class="mb-3">$8,500</h3>
                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: 70%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p class="mb-0">Previous Month <span class="text-muted">$7,500</span></p>
                                    </div>
                                </div>
                            
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-3">
                                            <div>
                                                <span class="d-block">Profit</span>
                                            </div>
                                            <div>
                                                <span class="text-danger">-75%</span>
                                            </div>
                                        </div>
                                        <h3 class="mb-3">$1,12,000</h3>
                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: 70%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p class="mb-0">Previous Month <span class="text-muted">$1,42,000</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>*/}
                    
                    {/*<div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-4 d-flex">
                            <div class="card flex-fill dash-statistics">
                                <div class="card-body">
                                    <h5 class="card-title">Statistics</h5>
                                    <div class="stats-list">
                                        <div class="stats-info">
                                            <p>Today Leave <strong>4 <small>/ 65</small></strong></p>
                                            <div class="progress">
                                                <div class="progress-bar bg-primary" role="progressbar" style="width: 31%" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="stats-info">
                                            <p>Pending Invoice <strong>15 <small>/ 92</small></strong></p>
                                            <div class="progress">
                                                <div class="progress-bar bg-warning" role="progressbar" style="width: 31%" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="stats-info">
                                            <p>Completed Projects <strong>85 <small>/ 112</small></strong></p>
                                            <div class="progress">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: 62%" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="stats-info">
                                            <p>Open Tickets <strong>190 <small>/ 212</small></strong></p>
                                            <div class="progress">
                                                <div class="progress-bar bg-danger" role="progressbar" style="width: 62%" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div class="stats-info">
                                            <p>Closed Tickets <strong>22 <small>/ 212</small></strong></p>
                                            <div class="progress">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 22%" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-12 col-lg-6 col-xl-4 d-flex">
                            <div class="card flex-fill">
                                <div class="card-body">
                                    <h4 class="card-title">Task Statistics</h4>
                                    <div class="statistics">
                                        <div class="row">
                                            <div class="col-md-6 col-6 text-center">
                                                <div class="stats-box mb-4">
                                                    <p>Total Tasks</p>
                                                    <h3>385</h3>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-6 text-center">
                                                <div class="stats-box mb-4">
                                                    <p>Overdue Tasks</p>
                                                    <h3>19</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-purple" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30%</div>
                                        <div class="progress-bar bg-warning" role="progressbar" style="width: 22%" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100">22%</div>
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 24%" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100">24%</div>
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 26%" aria-valuenow="14" aria-valuemin="0" aria-valuemax="100">21%</div>
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 10%" aria-valuenow="14" aria-valuemin="0" aria-valuemax="100">10%</div>
                                    </div>
                                    <div>
                                        <p><i class="fa fa-dot-circle-o text-purple mr-2"></i>Completed Tasks <span class="float-right">166</span></p>
                                        <p><i class="fa fa-dot-circle-o text-warning mr-2"></i>Inprogress Tasks <span class="float-right">115</span></p>
                                        <p><i class="fa fa-dot-circle-o text-success mr-2"></i>On Hold Tasks <span class="float-right">31</span></p>
                                        <p><i class="fa fa-dot-circle-o text-danger mr-2"></i>Pending Tasks <span class="float-right">47</span></p>
                                        <p class="mb-0"><i class="fa fa-dot-circle-o text-info mr-2"></i>Review Tasks <span class="float-right">5</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-12 col-lg-6 col-xl-4 d-flex">
                            <div class="card flex-fill">
                                <div class="card-body">
                                    <h4 class="card-title">Today Absent <span class="badge bg-inverse-danger ml-2">5</span></h4>
                                    <div class="leave-info-box">
                                        <div class="media align-items-center">
                                            <a href="profile.html" class="avatar"><img alt="" src="assets/img/user.jpg" /></a>
                                            <div class="media-body">
                                                <div class="text-sm my-0">Martin Lewis</div>
                                            </div>
                                        </div>
                                        <div class="row align-items-center mt-3">
                                            <div class="col-6">
                                                <h6 class="mb-0">4 Sep 2019</h6>
                                                <span class="text-sm text-muted">Leave Date</span>
                                            </div>
                                            <div class="col-6 text-right">
                                                <span class="badge bg-inverse-danger">Pending</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="leave-info-box">
                                        <div class="media align-items-center">
                                            <a href="profile.html" class="avatar"><img alt="" src="assets/img/user.jpg" /></a>
                                            <div class="media-body">
                                                <div class="text-sm my-0">Martin Lewis</div>
                                            </div>
                                        </div>
                                        <div class="row align-items-center mt-3">
                                            <div class="col-6">
                                                <h6 class="mb-0">4 Sep 2019</h6>
                                                <span class="text-sm text-muted">Leave Date</span>
                                            </div>
                                            <div class="col-6 text-right">
                                                <span class="badge bg-inverse-success">Approved</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="load-more text-center">
                                        <a class="text-dark" href="javascript:void(0);">Load More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    
                    {/*<div class="row">
                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">Invoices</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-nowrap custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Invoice ID</th>
                                                    <th>Client</th>
                                                    <th>Due Date</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><a href="invoice-view.html">#INV-0001</a></td>
                                                    <td>
                                                        <h2><a href="#">Global Technologies</a></h2>
                                                    </td>
                                                    <td>11 Mar 2019</td>
                                                    <td>$380</td>
                                                    <td>
                                                        <span class="badge bg-inverse-warning">Partially Paid</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="invoice-view.html">#INV-0002</a></td>
                                                    <td>
                                                        <h2><a href="#">Delta Infotech</a></h2>
                                                    </td>
                                                    <td>8 Feb 2019</td>
                                                    <td>$500</td>
                                                    <td>
                                                        <span class="badge bg-inverse-success">Paid</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><a href="invoice-view.html">#INV-0003</a></td>
                                                    <td>
                                                        <h2><a href="#">Cream Inc</a></h2>
                                                    </td>
                                                    <td>23 Jan 2019</td>
                                                    <td>$60</td>
                                                    <td>
                                                        <span class="badge bg-inverse-danger">Unpaid</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <a href="invoices.html">View all invoices</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">Payments</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">  
                                        <table class="table custom-table table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Invoice ID</th>
                                                    <th>Client</th>
                                                    <th>Payment Type</th>
                                                    <th>Paid Date</th>
                                                    <th>Paid Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><a href="invoice-view.html">#INV-0001</a></td>
                                                    <td>
                                                        <h2><a href="#">Global Technologies</a></h2>
                                                    </td>
                                                    <td>Paypal</td>
                                                    <td>11 Mar 2019</td>
                                                    <td>$380</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="invoice-view.html">#INV-0002</a></td>
                                                    <td>
                                                        <h2><a href="#">Delta Infotech</a></h2>
                                                    </td>
                                                    <td>Paypal</td>
                                                    <td>8 Feb 2019</td>
                                                    <td>$500</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="invoice-view.html">#INV-0003</a></td>
                                                    <td>
                                                        <h2><a href="#">Cream Inc</a></h2>
                                                    </td>
                                                    <td>Paypal</td>
                                                    <td>23 Jan 2019</td>
                                                    <td>$60</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <a href="payments.html">View all payments</a>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    
                    {/*<div class="row">
                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">Clients</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Status</th>
                                                    <th class="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href="#" class="avatar"><img alt="" src="assets/img/profiles/avatar-19.jpg" /></a>
                                                            <a href="client-profile.html">Barry Cuda <span>CEO</span></a>
                                                        </h2>
                                                    </td>
                                                    <td>barrycuda@example.com</td>
                                                    <td>
                                                        <div class="dropdown action-label">
                                                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-dot-circle-o text-success"></i> Active
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-success"></i> Active</a>
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-danger"></i> Inactive</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href="#" class="avatar"><img alt="" src="assets/img/profiles/avatar-19.jpg" /></a>
                                                            <a href="client-profile.html">Tressa Wexler <span>Manager</span></a>
                                                        </h2>
                                                    </td>
                                                    <td>tressawexler@example.com</td>
                                                    <td>
                                                        <div class="dropdown action-label">
                                                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-dot-circle-o text-danger"></i> Inactive
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-success"></i> Active</a>
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-danger"></i> Inactive</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href="client-profile.html" class="avatar"><img alt="" src="assets/img/profiles/avatar-07.jpg" /></a>
                                                            <a href="client-profile.html">Ruby Bartlett <span>CEO</span></a>
                                                        </h2>
                                                    </td>
                                                    <td>rubybartlett@example.com</td>
                                                    <td>
                                                        <div class="dropdown action-label">
                                                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-dot-circle-o text-danger"></i> Inactive
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-success"></i> Active</a>
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-danger"></i> Inactive</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href="client-profile.html" class="avatar"><img alt="" src="assets/img/profiles/avatar-06.jpg" /></a>
                                                            <a href="client-profile.html"> Misty Tison <span>CEO</span></a>
                                                        </h2>
                                                    </td>
                                                    <td>mistytison@example.com</td>
                                                    <td>
                                                        <div class="dropdown action-label">
                                                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-dot-circle-o text-success"></i> Active
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-success"></i> Active</a>
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-danger"></i> Inactive</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2 class="table-avatar">
                                                            <a href="client-profile.html" class="avatar"><img alt="" src="assets/img/profiles/avatar-14.jpg" /></a>
                                                            <a href="client-profile.html"> Daniel Deacon <span>CEO</span></a>
                                                        </h2>
                                                    </td>
                                                    <td>danieldeacon@example.com</td>
                                                    <td>
                                                        <div class="dropdown action-label">
                                                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-dot-circle-o text-danger"></i> Inactive
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-success"></i> Active</a>
                                                                <a class="dropdown-item" href="#"><i class="fa fa-dot-circle-o text-danger"></i> Inactive</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <a href="clients.html">View all clients</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">Recent Projects</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Project Name </th>
                                                    <th>Progress</th>
                                                    <th class="text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h2><a href="project-view.html">Office Management</a></h2>
                                                        <small class="block text-ellipsis">
                                                            <span>1</span> <span class="text-muted">open tasks, </span>
                                                            <span>9</span> <span class="text-muted">tasks completed</span>
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <div class="progress progress-xs progress-striped">
                                                            <div class="progress-bar" role="progressbar" data-toggle="tooltip" title="65%" style="width: 65%"></div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2><a href="project-view.html">Project Management</a></h2>
                                                        <small class="block text-ellipsis">
                                                            <span>2</span> <span class="text-muted">open tasks, </span>
                                                            <span>5</span> <span class="text-muted">tasks completed</span>
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <div class="progress progress-xs progress-striped">
                                                            <div class="progress-bar" role="progressbar" data-toggle="tooltip" title="15%" style="width: 15%"></div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2><a href="project-view.html">Video Calling App</a></h2>
                                                        <small class="block text-ellipsis">
                                                            <span>3</span> <span class="text-muted">open tasks, </span>
                                                            <span>3</span> <span class="text-muted">tasks completed</span>
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <div class="progress progress-xs progress-striped">
                                                            <div class="progress-bar" role="progressbar" data-toggle="tooltip" title="49%" style="width: 49%"></div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2><a href="project-view.html">Hospital Administration</a></h2>
                                                        <small class="block text-ellipsis">
                                                            <span>12</span> <span class="text-muted">open tasks, </span>
                                                            <span>4</span> <span class="text-muted">tasks completed</span>
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <div class="progress progress-xs progress-striped">
                                                            <div class="progress-bar" role="progressbar" data-toggle="tooltip" title="88%" style="width: 88%"></div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h2><a href="project-view.html">Digital Marketplace</a></h2>
                                                        <small class="block text-ellipsis">
                                                            <span>7</span> <span class="text-muted">open tasks, </span>
                                                            <span>14</span> <span class="text-muted">tasks completed</span>
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <div class="progress progress-xs progress-striped">
                                                            <div class="progress-bar" role="progressbar" data-toggle="tooltip" title="100%" style="width: 100%"></div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right">
                                                        <div class="dropdown dropdown-action">
                                                            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                                            <div class="dropdown-menu dropdown-menu-right">
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-pencil m-r-5"></i> Edit</a>
                                                                <a class="dropdown-item" href="javascript:void(0)"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <a href="projects.html">View all projects</a>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                
                </div>

            </div>



            {/*<Footer />*/}
        </div>
    </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Dashboard);
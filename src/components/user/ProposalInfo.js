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

import DataTable from 'datatables.net';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import avatarImg2 from './../../assets/img/profiles/avatar-02.jpg';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    $(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
      } );
  }

  render() {

    const { isLoggedIn, message } = this.props;

    return (
    <React.Fragment>
        <div className="main-wrapper">
            <Header />
            <SideBar />
            
            

            <div className="page-wrapper">
      
                <div className="content container-fluid">
        
                  <div className="page-header">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="page-title">Proposal</h3>
                        <ul className="breadcrumb">
                          <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                          <li className="breadcrumb-item active">Proposal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-view">
                            <div className="profile-img-wrap">
                              <div className="profile-img">
                                <a href="#"><img alt="" src={avatarImg2} /></a>
                              </div>
                            </div>
                            <div className="profile-basic">
                              <div className="row">
                                <div className="col-md-5">
                                  <div className="profile-info-left">
                                    <h3 className="user-name m-t-0 mb-0">Sai Trader Pvt Ltd</h3>
                                    <h6 className="text-muted">+91 9876543210, sai@sai.com</h6>
                                    <small className="text-muted">Satish Vender</small>
                                    <div className="staff-id">Proposal ID : #PRO-0001</div>
                                    <div className="small doj text-muted">Date of Proposal : 5-08-2021</div>
                                    <div className="staff-id">Status : Order Confirmation</div>
                                    <div>
                                      <div className="dropdown action-label">
                                        <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                          <i className="fa fa-dot-circle-o text-success"></i> Order Confirmation
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Proposal</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning"></i> Order Confirmation</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Internal Order</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Installation</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Site Inspection</a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="staff-msg"><a className="btn btn-custom" href="chat.html">Delete</a></div>
                                  </div>
                                </div>
                                <div className="col-md-7">
                                  <ul className="personal-info">
                                    <li>
                                      <div className="title">Lift Cost:</div>
                                      <div className="text"><a href="">Rs. 50,000</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Transport Cost:</div>
                                      <div className="text"><a href="">Rs. 75,000</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Installation:</div>
                                      <div className="text"><a href="">Rs. 1,50,000</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Taxes & Dues:</div>
                                      <div className="text"><a href="">Rs. 30,000</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Sales Value:</div>
                                      <div className="text"><a href="">Rs. 70,000</a></div>
                                    </li>
                                    {/*<li>
                                      <div className="title">Reports to:</div>
                                      <div className="text">
                                         <div className="avatar-box">
                                          <div className="avatar avatar-xs">
                                           <img src="assets/img/profiles/avatar-16.jpg" alt="" />
                                          </div>
                                         </div>
                                         <a href="profile.html">
                                          Jeffery Lalor
                                        </a>
                                      </div>
                                    </li>*/}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="pro-edit"><a href="#" className="edit-icon"> <i className="fa fa-ban"></i></a><a data-target="#proposal_info" data-toggle="modal" className="edit-icon" href="#"> <i className="fa fa-pencil"></i></a></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card tab-box">
                    <div className="row user-tabs">
                      <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                        <ul className="nav nav-tabs nav-tabs-bottom">
                          <li className="nav-item"><a href="#tab_proposal" data-toggle="tab" className="nav-link active">Proposal<small className="text-danger"> (Lift specifications)</small></a></li>
                          <li className="nav-item"><a href="#tab_order_confirmation" data-toggle="tab" className="nav-link">Order Confirmation</a></li>
                          <li className="nav-item"><a href="#tab_internal_order" data-toggle="tab" className="nav-link">Internal Order</a></li>
                          <li className="nav-item"><a href="#tab_installation" data-toggle="tab" className="nav-link">Installation</a></li>
                          <li className="nav-item"><a href="#tab_site_inspection" data-toggle="tab" className="nav-link">Site Inspection</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tab-content">
                  
                    <div id="tab_proposal" className="pro-overview tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Lift specifications <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_lift_info"><i className="fa fa-pencil"></i></a></h3>
                              <table className="table table-striped custom-table">
                                <thead>
                                  <tr>
                                    <th className="text-center"></th>
                                    <th>Lift specifications</th>
                                    <th className="text-center">Input</th>
                                    <th className="text-center">Unit</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Rated Speed in m/sec</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Carrying Capacity in Kg</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Number of Stops</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Pit Size in mm</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Shaft Size in WX D</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Guiderail Position</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Travel in mm</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Headroom in mm</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Cabin Size W X D</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>CAR Finish SS Hairline</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Door Size and Opening</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Door Type </td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Door finish</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Gold brass finish</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Car wall Left Side</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Car wall Back Side</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Car wall Right Side</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Ceiling Standard</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Piston Dia in mm</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Car Push Button Finish </td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Landing Pushbutton Finish</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">
                                      <input type="checkbox" />
                                    </td>
                                    <td>Hose Pipe. in mtr</td>
                                    <td><div className="text"></div></td>
                                    <td><div className="text"></div></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 d-flex"></div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Order Confirmation <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_order_confirmation"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Lift</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Installation</div>
                                  <div className="text">Rs. 1,50,000</div>
                                </li>
                                <li>
                                  <div className="title">Taxes and Dues</div>
                                  <div className="text">Rs. 30,000</div>
                                </li>
                                <li>
                                  <div className="title">Drawing confirmation</div>
                                  <div className="text">Rs. 70,000</div>
                                </li>
                                <li>
                                  <div className="title">Order value</div>
                                  <div className="text">Rs. 80,000</div>
                                </li>
                                <li>
                                  <div className="title">Project start date</div>
                                  <div className="text">10-08-2021</div>
                                </li>
                                <li>
                                  <div className="title">Project end date</div>
                                  <div className="text">15-10-2021</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Internal Order <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_internal_order"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Lift Componenet</div>
                                  <div className="text">Rs. 1,00,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Taxes and Dues</div>
                                  <div className="text">Rs. 30,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Procurement</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Installation <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_installation"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Stay</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                                <li>
                                  <div className="title">Incidental expense</div>
                                  <div className="text">Rs. 35,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Installation expense</div>
                                  <div className="text">Rs. 45,000</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Site Inspection <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_site_inspection"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Stay</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                                <li>
                                  <div className="title">Incidental expense</div>
                                  <div className="text">Rs. 35,000</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>






                    <div id="tab_order_confirmation" className="pro-overview tab-pane fade show">
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Order Confirmation <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_order_confirmation"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Lift</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Installation</div>
                                  <div className="text">Rs. 1,50,000</div>
                                </li>
                                <li>
                                  <div className="title">Taxes and Dues</div>
                                  <div className="text">Rs. 30,000</div>
                                </li>
                                <li>
                                  <div className="title">Drawing confirmation</div>
                                  <div className="text">Rs. 70,000</div>
                                </li>
                                <li>
                                  <div className="title">Order value</div>
                                  <div className="text">Rs. 80,000</div>
                                </li>
                                <li>
                                  <div className="title">Project start date</div>
                                  <div className="text">10-08-2021</div>
                                </li>
                                <li>
                                  <div className="title">Project end date</div>
                                  <div className="text">15-10-2021</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>




                    <div id="tab_internal_order" className="pro-overview tab-pane fade show">
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Internal Order <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_internal_order"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Lift Componenet</div>
                                  <div className="text">Rs. 1,00,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Taxes and Dues</div>
                                  <div className="text">Rs. 30,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Procurement</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>




                    <div id="tab_installation" className="pro-overview tab-pane fade show">
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Installation <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_installation"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Stay</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                                <li>
                                  <div className="title">Incidental expense</div>
                                  <div className="text">Rs. 35,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Installation expense</div>
                                  <div className="text">Rs. 45,000</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div id="tab_site_inspection" className="pro-overview tab-pane fade show">
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <div className="card profile-box flex-fill">
                            <div className="card-body">
                              <h3 className="card-title">Site Inspection <a href="#" className="edit-icon" data-toggle="modal" data-target="#proposal_site_inspection"><i className="fa fa-pencil"></i></a></h3>
                              <ul className="personal-info">
                                <li>
                                  <div className="title">Cost of Transport</div>
                                  <div className="text">Rs. 75,000</div>
                                </li>
                                <li>
                                  <div className="title">Cost of Stay</div>
                                  <div className="text">Rs. 50,000</div>
                                </li>
                                <li>
                                  <div className="title">Incidental expense</div>
                                  <div className="text">Rs. 35,000</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>


                <div id="proposal_info" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Proposal</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Client <span className="text-danger">*</span></label>
                                    <select className="form-control select" >
                                      <option value="">Select Client</option>
                                      <option value="">ABC Info</option>
                                      <option value="" selected>Sai pvt ltd</option>
                                      <option value="">Om trader pvt ltd</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Vender <span className="text-danger">*</span></label>
                                    <select className="form-control select" >
                                      <option value="">Select Vender</option>
                                      <option value="" selected>Satish Vender</option>
                                      <option value="">Sameer tranders</option>
                                      <option value="">Shah Trande</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Lift <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Installation <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="150000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Taxes and Dues <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="30000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">  
                                  <div className="form-group">
                                    <label className="col-form-label">Sales Value <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value="70000"/>
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>


                <div id="proposal_lift_info" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Lift specifications</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="table-responsive m-t-15">
                                <table className="table table-striped custom-table">
                                  <thead>
                                    <tr>
                                      <th className="text-center">Selection</th>
                                      <th>Lift specifications</th>
                                      <th className="text-center">Input</th>
                                      <th className="text-center">Unit</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Rated Speed in m/sec</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Carrying Capacity in Kg</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Number of Stops</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Pit Size in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Shaft Size in WX D</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Guiderail Position</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Travel in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Headroom in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Cabin Size W X D</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>CAR Finish SS Hairline</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Door Size and Opening</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Door Type </td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Door finish</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Gold brass finish</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car wall Left Side</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car wall Back Side</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car wall Right Side</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Ceiling Standard</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Piston Dia in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car Push Button Finish </td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Landing Pushbutton Finish</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Hose Pipe. in mtr</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>

                <div id="proposal_order_confirmation" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Order Confirmation</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Lift <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Installation <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="150000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Taxes and Dues <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="30000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">  
                                  <div className="form-group">
                                    <label className="col-form-label">Drawing confirmation <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value="70000"/>
                                  </div>
                                </div>
                                <div className="col-sm-6">  
                                  <div className="form-group">
                                    <label className="col-form-label">Order value <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value="80000"/>
                                  </div>
                                </div>
                                <div className="col-sm-6">  
                                  <div className="form-group">
                                    <label className="col-form-label">Project start date <span className="text-danger">*</span></label>
                                    <input type="date" className="form-control" value="2021-08-10"/>
                                  </div>
                                </div>
                                <div className="col-sm-6">  
                                  <div className="form-group">
                                    <label className="col-form-label">Project end date <span className="text-danger">*</span></label>
                                    <input type="date" className="form-control" value="2021-08-15"/>
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>



                <div id="proposal_internal_order" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Internal Order</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Lift Componenet <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="100000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Taxes and Dues <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="30000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Procurement <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>



                <div id="proposal_installation" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Installation</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Stay <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Incidental expense <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="35000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Installation expense <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="45000" />
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>


                <div id="proposal_site_inspection" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Site Inspection</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Stay <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Incidental expense <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="35000" />
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
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
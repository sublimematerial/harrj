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
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Proposal</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Proposal</li>
                      </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                      <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_proposal_board"><i className="fa fa-plus"></i> Add Proposal</a>
                      <div className="view-icons">
                        <a href="#" className="grid-view btn btn-link"><i className="fa fa-th"></i></a>
                        <NavLink to={"/proposal/list"} className="list-view btn btn-link active"><i className="fa fa-bars"></i></NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" />
                      <label className="focus-label">Client Name</label>
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
                    <div className="form-group form-focus select-focus">
                      <select className="form-control"> 
                        <option> -- -- </option>
                        <option> Proposal </option>
                        <option> Order Confirmation </option>
                        <option> Internal Order </option>
                        <option> Installation </option>
                        <option> Site Inspection </option>
                      </select>
                      <label className="focus-label">Status</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"></div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"></div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"></div>
                  {/*<div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
                    <div className="form-group form-focus select-focus">
                      <select className="form-control"> 
                        <option> -- -- </option>
                        <option> High </option>
                        <option> Low </option>
                        <option> Medium </option>
                      </select>
                      <label className="focus-label">Priority</label>
                    </div>
                  </div>*/}
                  {/*<div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <input className="form-control floating datetimepicker" type="date" />
                      <label className="focus-label">From</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <input className="form-control floating datetimepicker" type="date" />
                      <label className="focus-label">To</label>
                    </div>
                  </div>*/}
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block"> Search </a>  
                  </div>     
                </div>
                



                <div className="row staff-grid-row">
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-02.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6><NavLink to={"/proposal/info"}>#PRO-0001</NavLink></h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Sai Trader Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-09.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0002</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-10.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0003</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Sai Trader Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-05.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0004</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-11.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0005</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-12.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0006</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-13.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0007</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-01.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0008</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-16.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0009</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Sai Trader Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-04.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0010</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-03.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0011</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Sai Trader Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a href="profile.html" className="avatar"><img src="assets/img/profiles/avatar-08.jpg" alt="" /></a>
                      </div>
                      <div className="dropdown profile-action">
                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                        </div>
                      </div>
                      <h6>#PRO-0012</h6>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">Amit Pvt Ltd</a></h4>
                      <div className="small text-muted">Satish Vendor</div>
                    </div>
                  </div>
                </div>


              </div>
              
              
          </div>



          <div id="add_proposal_board" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Proposal</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Client <span class="text-danger">*</span></label>
                              <select className="form-control select" >
                                <option value="">Select Client</option>
                                <option value="">ABC Info</option>
                                <option value="">Sai pvt ltd</option>
                                <option value="">Om trader pvt ltd</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Vendor <span class="text-danger">*</span></label>
                              <select className="form-control select" >
                                <option value="">Select Vendor</option>
                                <option value="">Satish Vendor</option>
                                <option value="">Sameer tranders</option>
                                <option value="">Shah Trande</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Cost of Lift <span class="text-danger">*</span></label>
                              <input class="form-control" type="text" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Cost of Transport <span class="text-danger">*</span></label>
                              <input class="form-control" type="text" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Cost of Installation</label>
                              <input class="form-control" type="text" />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Taxes and Dues</label>
                              <input class="form-control" type="text" />
                            </div>
                          </div>
                          <div class="col-sm-6">  
                            <div class="form-group">
                              <label class="col-form-label">Sales Value <span class="text-danger">*</span></label>
                              <input type="text" class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="table-responsive m-t-15">
                          <table class="table table-striped custom-table">
                            <thead>
                              <tr>
                                <th class="text-center">Selection</th>
                                <th>Lift specifications</th>
                                <th class="text-center">Input</th>
                                <th class="text-center">Unit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Rated Speed in m/sec</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Carrying Capacity in Kg</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Number of Stops</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Pit Size in mm</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Shaft Size in WX D</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Guiderail Position</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Travel in mm</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Headroom in mm</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Cabin Size W X D</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>CAR Finish SS Hairline</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Door Size and Opening</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Door Type </td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Door finish</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Gold brass finish</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Car wall Left Side</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Car wall Back Side</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Car wall Right Side</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Ceiling Standard</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Piston Dia in mm</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Car Push Button Finish </td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Landing Pushbutton Finish</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <input type="checkbox" />
                                </td>
                                <td>Hose Pipe. in mtr</td>
                                <td><input type="text" className="form-control" /></td>
                                <td><input type="text" className="form-control" /></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="submit-section">
                          <button class="btn btn-primary submit-btn">Submit</button>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
          </div>



          <div className="modal custom-modal fade" id="delete_proposal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Proposal</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a href="javascript:void(0);" className="btn btn-primary continue-btn">Delete</a>
                      </div>
                      <div className="col-6">
                        <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                      </div>
                    </div>
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
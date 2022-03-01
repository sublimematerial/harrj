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
              
                <div class="page-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h3 class="page-title">Proposal</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Proposal</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      <a href="#" class="btn add-btn" data-toggle="modal" data-target="#add_proposal_board"><i class="fa fa-plus"></i> Add Proposal</a>
                      <div class="view-icons">
                        <NavLink to={"/proposal/dashboard"} href="employees.html" class="grid-view btn btn-link"><i class="fa fa-th"></i></NavLink>
                        <a href="#" class="list-view btn btn-link active"><i class="fa fa-bars"></i></a>
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
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table  id="example" className="table table-striped custom-table mb-0 datatable">
                        <thead>
                          <tr>
                            <th>Proposal Id</th>
                            <th>Client</th>
                            <th>Vender</th>
                            <th>Proposal Date</th>
                            <th className="text-center">Status</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><NavLink to={"/proposal/info"}>#PRO-0001</NavLink></td>
                            <td>Sai Trader Pvt Ltd</td>
                            <td>Satish Vender</td>
                            <td>5 Aug 2021 10:21 AM</td>
                            <td className="text-center">
                              <div className="dropdown action-label">
                                <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                  <i className="fa fa-dot-circle-o text-danger"></i> Proposal 
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Proposal</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning"></i> Order Confirmation</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Internal Order</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Installation</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Site Inspection</a>
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_ticket"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td><a href="ticket-view.html">#PRO-0002</a></td>
                            <td>Amit Pvt Ltd</td>
                            <td>Satish Vender</td>
                            <td>12 Aug 2021 11:21 AM</td>
                            <td className="text-center">
                              <div className="dropdown action-label">
                                <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                  <i className="fa fa-dot-circle-o text-success"></i> Internal Order 
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Proposal</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning"></i> Order Confirmation</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Internal Order</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Installation</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Site Inspection</a>
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_ticket"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_proposal"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
                              <label class="col-form-label">Vender <span class="text-danger">*</span></label>
                              <select className="form-control select" >
                                <option value="">Select Vender</option>
                                <option value="">Satish Vender</option>
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
                      <h3>Delete Ticket</h3>
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
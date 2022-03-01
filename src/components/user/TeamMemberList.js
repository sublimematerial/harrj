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
                      <h3 class="page-title">Team</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Team</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      <a href="#" class="btn add-btn" data-toggle="modal" data-target="#add_form"><i class="fa fa-plus"></i> Add</a>
                      <div class="view-icons">
                        {/*<NavLink to={"/proposal/dashboard"} href="employees.html" class="grid-view btn btn-link"><i class="fa fa-th"></i></NavLink>
                        <a href="#" class="list-view btn btn-link active"><i class="fa fa-bars"></i></a>*/}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/*<div className="row filter-row">
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
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block"> Search </a>  
                  </div>     
                </div>*/}
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table  id="example" className="table table-striped custom-table mb-0 datatable">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><NavLink to={""}>#1</NavLink></td>
                            <td>Maintenance Team</td>
                            <td>Maintenance Team Description</td>
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
                            <td><NavLink to={""}>#2</NavLink></td>
                            <td>Support Team</td>
                            <td>Support Team Description</td>
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
                            <td><NavLink to={""}>#3</NavLink></td>
                            <td>Sales Team</td>
                            <td>Sales Team Description</td>
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
                            <td><NavLink to={""}>#4</NavLink></td>
                            <td>Procurement Team</td>
                            <td>Procurement Team Description</td>
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
                            <td><NavLink to={""}>#5</NavLink></td>
                            <td>Operations Team</td>
                            <td>Operations Team Description</td>
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
                            <td><NavLink to={""}>#6</NavLink></td>
                            <td>Installation Team</td>
                            <td>Installation Team Description</td>
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



          <div id="add_form" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Team</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div className="form-group">
                            <label>Team:</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Team Description:</label>
                            <textarea className="form-control" ></textarea>
                        </div>
                        <div className="m-t-20 text-center">
                            <button className="btn btn-primary btn-lg" type="button">Submit</button>
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
                      <h3>Delete Team</h3>
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
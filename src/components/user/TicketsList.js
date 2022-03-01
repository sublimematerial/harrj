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

import DataTable from 'datatables.net';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import { TicketAdd , TicketList , TicketInfo , TicketUpdate , TicketDelete, TicketDashboard } from "./../../actions/adminTicket";
import { ClientList } from "./../../actions/adminClient";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      expanded: [],
      listTicketData: [],
      listClientData:[],
      client_id:'',
      ticket_status:'',
      from_date:"",
      to_date:"",
      priority:"",

      pending_per:0,
      assigned_per:0,
      inprogress_per:0,
      completed_per:0,
      total_per:0,
      pending_count:0,
      assigned_count:0,
      inprogress_count:0,
      completed_count:0,
      total_count:0,

    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });

    this.TableDataUpdate = this.TableDataUpdate.bind(this);
    this.ListTicketFun = this.ListTicketFun.bind(this);
    this.ListClientFun = this.ListClientFun.bind(this);
    this.TicketDashboardFun = this.TicketDashboardFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeTicketStatus = this.onChangeTicketStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);

  }

  componentDidMount() {
    /*$(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
      } );*/
    this.TicketDashboardFun();
    this.ListTicketFun();
    this.ListClientFun();
  }

  TableDataUpdate=()=>{

    $('#example').DataTable( {
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      retrieve: true,
    });
  }

  TicketDashboardFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(TicketDashboard())
      .then((response) => {
        this.setState({
          pending_per:response.data.pending_per,
          assigned_per:response.data.assigned_per,
          inprogress_per:response.data.inprogress_per,
          completed_per:response.data.completed_per,
          total_per:response.data.total_per,
          pending_count:response.data.pending_count,
          assigned_count:response.data.assigned_count,
          inprogress_count:response.data.inprogress_count,
          completed_count:response.data.completed_count,
          total_count:response.data.total_count,
        });
      })
      .catch(() => {

      });
  }

  ListTicketFun=()=>{
    console.log("ListTicketFun:");

    console.log("client_id");
    console.log(this.state.client_id);

    console.log("ticket_status");
    console.log(this.state.ticket_status);

    console.log("priority");
    console.log(this.state.priority);

    console.log("from_date");
    console.log(this.state.from_date);

    console.log("to_date");
    console.log(this.state.to_date);

    const { dispatch, history } = this.props;
    dispatch(TicketList(this.state.client_id,this.state.ticket_status,this.state.priority,this.state.from_date,this.state.to_date))
      .then((response) => {
        console.log("Shree");
        console.log(response.data);
        this.setState({
          listTicketData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listTicketData: []
        });
      });
  }

  ListTicketResetFun=()=>{
    console.log("ListTicketResetFun:");

    const { dispatch, history } = this.props;
    dispatch(TicketList("","","","",""))
      .then((response) => {
        console.log("Shree");
        console.log(response.data);
        this.setState({
          listTicketData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listTicketData: []
        });
      });
  }


   ListClientFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ClientList())
      .then((response) => {
        this.setState({
          listClientData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listClientData: []
        });
      });
  }

  handleDeleteConfirm =(unique_id)=>{
    this.setState({
        delete_id: unique_id,
      });
    $("#delete_modal").modal("show");
  }

  handleDelete =()=>{
    const { dispatch, history } = this.props;
    dispatch(TicketDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListTicketFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeClient(e) {
    this.setState({
      client_id: e.target.value,
    });
    //this.ListTicketFun();
  }
  onChangeTicketStatus(e) {
    this.setState({
      ticket_status: e.target.value,
    });
    //this.ListTicketFun();
  }
  onChangePriority(e) {
    this.setState({
      priority: e.target.value,
    });
    //this.ListTicketFun();
  }
  onChangeFromDate(e) {
    this.setState({
      from_date: e.target.value,
    });
    //this.ListTicketFun();
  }
  onChangeToDate(e) {
    this.setState({
      to_date: e.target.value,
    });
    //this.ListTicketFun();
  }

  render() {

    const { isLoggedIn, message } = this.props;

    const { checked, expanded } = this.state;
    
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
                      <h3 className="page-title">Tickets</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Tickets</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      <Link to={"/tickets/add"} class="btn add-btn"><i class="fa fa-plus"></i> Add Ticket</Link>
                      <div class="view-icons">
                        {/*<NavLink to={"/tickets/dashboard"} class="grid-view btn btn-link"><i class="fa fa-th"></i></NavLink>
                        <a href="#" class="list-view btn btn-link active"><i class="fa fa-bars"></i></a>*/}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-group m-b-30">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <div>
                              <span className="d-block">Total</span>
                            </div>
                            <div>
                              <span className="text-success">{this.state.total_per}%</span>
                            </div>
                          </div>
                          <h3 className="mb-3">{this.state.total_count}</h3>
                          <div className="progress mb-2" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: this.state.total_per+"%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>


                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <div>
                              <span className="d-block">Pending</span>
                            </div>
                            <div>
                              <span className="text-success">{this.state.pending_per}%</span>
                            </div>
                          </div>
                          <h3 className="mb-3">{this.state.pending_count}</h3>
                          <div className="progress mb-2" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: this.state.pending_per+"%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <div>
                              <span className="d-block">Assign</span>
                            </div>
                            <div>
                              <span className="text-success">{this.state.assigned_per}%</span>
                            </div>
                          </div>
                          <h3 className="mb-3">{this.state.assigned_count}</h3>
                          <div className="progress mb-2" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: this.state.assigned_per+"%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <div>
                              <span className="d-block">Inprogress</span>
                            </div>
                            <div>
                              <span className="text-success">{this.state.inprogress_per}%</span>
                            </div>
                          </div>
                          <h3 className="mb-3">{this.state.inprogress_count}</h3>
                          <div className="progress mb-2" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: this.state.inprogress_per+"%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <div>
                              <span className="d-block">Completed</span>
                            </div>
                            <div>
                              <span className="text-success">{this.state.completed_per}%</span>
                            </div>
                          </div>
                          <h3 className="mb-3">{this.state.completed_count}</h3>
                          <div className="progress mb-2" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: this.state.completed_per+"%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    
                      {/*<div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-3">
                            <div>
                              <span className="d-block">Pending Tickets</span>
                            </div>
                            <div>
                              <span className="text-danger">-75%</span>
                            </div>
                          </div>
                          <h3 className="mb-3">125</h3>
                          <div className="progress mb-2" style={{height: "5px"}}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{width: "70%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>*/}
                    </div>
                  </div>  
                </div>
              
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-4 col-12">  
                    <div className="form-group form-focus select-focus">
                       <select className="form-control" name="client_id" value={this.state.client_id} onChange={this.onChangeClient}> 
                            <option value="">Select Client</option>
                        {this.state.listClientData.length > 0 && this.state.listClientData &&
                          this.state.listClientData.map((itemclientlist,k) => (
                            <option value={itemclientlist.client_id}>{itemclientlist.name}</option>
                        ))}
                        </select>
                      {/*<label className="focus-label">Client</label>*/}
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-4 col-12"> 
                    <div className="form-group form-focus select-focus">
                      <select className="form-control" name="ticket_status" value={this.state.ticket_status} onChange={this.onChangeTicketStatus}> 
                        <option value=""> Select Status</option>
                        <option value="pending"> Pending</option>
                        <option value="assigned"> Assign </option>
                        <option value="inprogress"> Inprogress </option>
                        <option value="completed"> Completed </option>
                      </select>
                      {/*<label className="focus-label">Status</label>*/}
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-4 col-12"> 
                    <div className="form-group form-focus select-focus">
                      <select className="form-control" name="prority" value={this.state.prority} onChange={this.onChangePriority}> 
                        <option> Select </option>
                        <option value="high"> High </option>
                        <option value="medium"> Medium </option>
                        <option value="low"> Low </option>
                      </select>
                      {/*<label className="focus-label">Priority</label>*/}
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-4 col-12">  
                    <div className="form-group form-focus">
                      {/*<div className="cal-icon">
                        <input className="form-control floating datetimepicker" type="date" />
                      </div>*/}
                      <input className="form-control floating datetimepicker" type="date" name="from_date" value={this.state.from_date} onChange={this.onChangeFromDate} />
                      
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-4 col-12">  
                    <div className="form-group form-focus">
                      {/*<div className="cal-icon">
                        <input className="form-control floating datetimepicker" type="date" />
                      </div>*/}
                      <input className="form-control floating datetimepicker" type="date" name="to_date" value={this.state.to_date} onChange={this.onChangeToDate} />
                      {/*<label className="focus-label">To</label>*/}
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <button type="button" className="btn btn-success btn-block" onClick={() => this.ListTicketFun()} > Search </button>  
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">                    
                    <button type="button" className="btn btn-success btn-block" onClick={() => this.ListTicketResetFun()} > Reset </button>  
                  </div>     
                </div>
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table  id="example" className="table table-striped custom-table mb-0 datatable">
                        <thead>
                          <tr>
                            <th>Ticket Id</th>
                            <th>Ticket Subject</th>
                            <th>Client</th>
                            <th>Raise Date</th>
                            <th>Estimated Date</th>
                            <th>Priority</th>
                            <th className="text-center">Status</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listTicketData && typeof this.state.listTicketData !=="undefined" && this.state.listTicketData.map((itemTicketList,l) => (
                         
                          <tr>
                            {/*<td>{itemTicketList.ticket_id}</td>*/}
                            {/*<td>{l+1}</td>*/}
                            <td><NavLink to={"/tickets/info/"+itemTicketList.ticket_id}>{"TID#"+itemTicketList.ticket_id}</NavLink></td>
                            <td>{itemTicketList.ticket_desc}</td>
                            <td>{itemTicketList.client_name}</td>
                            <td>{itemTicketList.ticket_datetime}</td>
                            <td>{itemTicketList.estimated_date}</td>
                            <td>
                              <div className="dropdown action-label">
                                <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                  {(() => {
                                    if(itemTicketList.priority==="high") {
                                    return(
                                      <span><i className="fa fa-dot-circle-o text-danger"></i> High</span>
                                    )
                                    }else{
                                      if(itemTicketList.priority==="medium"){
                                        return(
                                          <span><i className="fa fa-dot-circle-o text-warning"></i> Medium</span>
                                        )
                                      }else{
                                        if(itemTicketList.priority==="low"){
                                          return(
                                            <span><i className="fa fa-dot-circle-o text-success"></i> Low</span>
                                          )
                                        }
                                      }
                                    }
                                  })()}
                                </a>
                                {/*<div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> High</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning"></i> Medium</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Low</a>
                                </div>*/}
                              </div>
                            </td>


                            <td className="text-center">
                              <div className="dropdown action-label">
                                <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                  {(() => {
                                    if(itemTicketList.ticket_status==="pending") {
                                    return(
                                      <span><i className="fa fa-dot-circle-o text-danger"></i> Pending</span>
                                    )
                                    }else{
                                      if(itemTicketList.ticket_status==="assigned"){
                                        return(
                                          <span><i className="fa fa-dot-circle-o text-danger"></i> Assign</span>
                                        )
                                      }else{
                                        if(itemTicketList.ticket_status==="inprogress"){
                                          return(
                                            <span><i className="fa fa-dot-circle-o text-warning"></i> Inprogress</span>
                                          )
                                        }else{
                                          if(itemTicketList.ticket_status==="completed"){
                                            return(
                                              <span><i className="fa fa-dot-circle-o text-success"></i> Completed</span>
                                            )
                                          } 
                                        }
                                      }
                                    }
                                  })()}
                                </a>
                                {/*<div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Pending</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Assign</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning"></i> Inprogress</a>
                                  <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Completed</a>
                                </div>*/}
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <NavLink to={"/tickets/info/"+itemTicketList.ticket_id} className="dropdown-item"><i className="fa fa-pencil m-r-5"></i> Edit</NavLink>
                                  <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemTicketList.ticket_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          ))}
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              
          </div>



          <div className="modal custom-modal fade" id="delete_modal" role="dialog">
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
                        <a type="button" className="btn btn-primary continue-btn" data-dismiss="modal" onClick={() => this.handleDelete()} >Delete</a>
                      </div>
                      <div className="col-6">
                        <a type="button" className="btn btn-primary cancel-btn" data-dismiss="modal">Cancel</a>
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
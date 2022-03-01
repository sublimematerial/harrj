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

import { TeamList } from "./../../actions/adminTeam";
import { ProfileList } from "./../../actions/adminProfile";
import { DesignationList } from "./../../actions/adminDesignation";
import { UserAdd, UserList, UserInfo, UserUpdate, UserDelete } from "./../../actions/adminUser";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListTeamFun = this.ListTeamFun.bind(this);
    this.ListProfileFun = this.ListProfileFun.bind(this);
    this.ListDesignationFun = this.ListDesignationFun.bind(this);
    this.ListUserFun = this.ListUserFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePincode = this.onChangePincode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoUserFun = this.InfoUserFun.bind(this);

    this.onChangeEditTeam = this.onChangeEditTeam.bind(this);
    this.onChangeEditProfile = this.onChangeEditProfile.bind(this);
    this.onChangeEditDesignation = this.onChangeEditDesignation.bind(this);
    this.onChangeEditName = this.onChangeEditName.bind(this);
    this.onChangeEditMobile = this.onChangeEditMobile.bind(this);
    this.onChangeEditEmail = this.onChangeEditEmail.bind(this);
    this.onChangeEditAddress = this.onChangeEditAddress.bind(this);
    this.onChangeEditLocation = this.onChangeEditLocation.bind(this);
    this.onChangeEditPincode = this.onChangeEditPincode.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listTeamData: [],
        listProfileData: [],
        listDesignationData: [],
        listUserData: [],
        delete_id:0,
        team_id:0,
        reporting_to_id:0,
        profile_id:'',
        designation_id:'',
        user_name:'',
        mobile_no:'',
        email_id:'',
        address:'',
        location:'',
        pincode:'',
        user_id:0,
        edit_team_id:'',
        edit_reporting_to_id:0,
        edit_profile_id:'',
        edit_designation_id:'',
        edit_user_name:'',
        edit_mobile_no:'',
        edit_email_id:'',
        edit_address:'',
        edit_location:'',
        edit_pincode:'',
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount=()=>{
    /*$(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
    });*/
    this.ListUserFun();
    //this.ListTeamFun();
    this.ListProfileFun();
    this.ListDesignationFun();
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

  ListTeamFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(TeamList())
      .then((response) => {
        this.setState({
          listTeamData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listTeamData: []
        });
      });
  }

  ListProfileFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ProfileList())
      .then((response) => {
        this.setState({
          listProfileData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listProfileData: []
        });
      });
  }

  ListDesignationFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(DesignationList())
      .then((response) => {
        this.setState({
          listDesignationData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listDesignationData: []
        });
      });
  }

  ListUserFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(UserList())
      .then((response) => {
        this.setState({
          listUserData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listUserData: []
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
    dispatch(UserDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListUserFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeTeam=(e)=>{
    this.setState({
      team_id: e.target.value,
    });
  }

  onChangeReportingTo=(e)=>{
    this.setState({
      reporting_to_id: e.target.value,
    });
  }

  

  onChangeProfile=(e)=>{
    this.setState({
      profile_id: e.target.value,
    });
  }

  onChangeDesignation=(e)=>{
    this.setState({
      designation_id: e.target.value,
    });
  }

  onChangeName=(e)=>{
    this.setState({
      user_name: e.target.value,
    });
  }

  onChangeMobile=(e)=>{
    this.setState({
      mobile_no: e.target.value,
    });
  }

  onChangeEmail=(e)=>{
    this.setState({
      email_id: e.target.value,
    });
  }

  onChangeAddress=(e)=>{
    this.setState({
      address: e.target.value,
    });
  }

  onChangeLocation=(e)=>{
    this.setState({
      location: e.target.value,
    });
  }

  onChangePincode=(e)=>{
    this.setState({
      pincode: e.target.value,
    });
  }

  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(UserAdd(this.state.team_id, this.state.reporting_to_id, this.state.profile_id, this.state.designation_id, this.state.user_name, this.state.mobile_no, this.state.email_id, this.state.address, this.state.location, this.state.pincode))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListUserFun();
              this.setState({ user_name: '', mobile_no: '', email_id: '', address: '', location: '', pincode: '' });
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

  InfoUserFun=(user_id)=>{

    const { dispatch, history } = this.props;
    dispatch(UserInfo(user_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              user_id: user_id,
              edit_team_id: response.data[0].team_id,
              edit_reporting_to_id: response.data[0].reporting_to,
              
              edit_profile_id: response.data[0].profile_id,
              edit_designation_id: response.data[0].designation_id,
              edit_user_name: response.data[0].user_name,
              edit_contact_person: response.data[0].contact_person,
              edit_mobile_no: response.data[0].mobile_no,
              edit_email_id: response.data[0].email_id,
              edit_address: response.data[0].address,
              edit_location: response.data[0].location,
              edit_pincode: response.data[0].pincode,
            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditTeam=(e)=>{
    this.setState({
      edit_team_id: e.target.value,
    });
  }

  onChangeEditReportingTo=(e)=>{
    this.setState({
      edit_reporting_to_id: e.target.value,
    });
  }

  onChangeEditProfile=(e)=>{
    this.setState({
      edit_profile_id: e.target.value,
    });
  }

  onChangeEditDesignation=(e)=>{
    this.setState({
      edit_designation_id: e.target.value,
    });
  }

  onChangeEditName=(e)=>{
    this.setState({
      edit_user_name: e.target.value,
    });
  }

  onChangeEditMobile=(e)=>{
    this.setState({
      edit_mobile_no: e.target.value,
    });
  }

  onChangeEditEmail=(e)=>{
    this.setState({
      edit_email_id: e.target.value,
    });
  }

  onChangeEditAddress=(e)=>{
    this.setState({
      edit_address: e.target.value,
    });
  }

  onChangeEditLocation=(e)=>{
    this.setState({
      edit_location: e.target.value,
    });
  }

  onChangeEditPincode=(e)=>{
    this.setState({
      edit_pincode: e.target.value,
    });
  }

  handleUpdateSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(UserUpdate(this.state.user_id, this.state.edit_team_id, this.state.edit_reporting_to_id, this.state.edit_profile_id, this.state.edit_designation_id, this.state.edit_user_name, this.state.edit_mobile_no, this.state.edit_email_id, this.state.edit_address, this.state.edit_location, this.state.edit_pincode))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListUserFun();
              this.setState({ user_id: 0, edit_team_id: 0, edit_profile_id: 0, edit_designation_id: 0, edit_user_name: '', edit_mobile_no: '', edit_email_id: '', edit_address: '', edit_location: '', edit_pincode: '' });
              $("#edit_form").modal("hide");
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
                      <h3 class="page-title">Site Engineer</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Site Engineer</li>
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
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table  id="example" className="table table-striped custom-table mb-0 datatable">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            {/*<th>Team</th>*/}
                            <th>Designation</th>
                            <th>Profile</th>
                            <th>Reporting To</th>
                            <th>Mail</th>
                            <th>Mobile</th>
                            <th>Joining Date</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listUserData && typeof this.state.listUserData !=="undefined" & this.state.listUserData.length > 0 && this.state.listUserData.map((itemUserList,l) => (
                            <tr>
                              <td>{l+1}</td>
                              <td>{itemUserList.user_name}</td>
                              {/*<td>{itemUserList.team_name}</td>*/}
                              <td>{itemUserList.designation}</td>
                              <td>{itemUserList.profile}</td>
                              <td>{itemUserList.reporting_to_name}</td>
                              <td>{itemUserList.email_id}</td>
                              <td>{itemUserList.mobile_no}</td>
                              <td>{itemUserList.joining_date}</td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.InfoUserFun(itemUserList.user_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemUserList.user_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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



          <div id="add_form" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Site Engineer</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Name <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="user_name" name="user_name" value={this.state.user_name} onChange={this.onChangeName} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Designation <span class="text-danger">*</span></label>
                              <select className="form-control select" id="designation_id" name="designation_id" value={this.state.designation_id} onChange={this.onChangeDesignation} required >
                                <option value="">Select Designation</option>
                                {this.state.listDesignationData && typeof this.state.listDesignationData !=="undefined" & this.state.listDesignationData.length > 0 && this.state.listDesignationData.map((itemDesignationList,c) => (
                                  <option value={itemDesignationList.designation_id}>{itemDesignationList.designation}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Reporting To</label>
                              <select className="form-control select" id="reporting_to_id" name="reporting_to_id" value={this.state.reporting_to_id} onChange={this.onChangeReportingTo} >
                                <option value="">Select User</option>
                                {this.state.listUserData && typeof this.state.listUserData !=="undefined" & this.state.listUserData.length > 0 && this.state.listUserData.map((itemUserList,b) => (
                                  <option value={itemUserList.user_id}>{itemUserList.user_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Profile<span class="text-danger">*</span></label>
                              <select className="form-control select" id="profile_id" name="profile_id" value={this.state.profile_id} onChange={this.onChangeProfile} required >
                                <option value="">Select Profile</option>
                                {this.state.listProfileData && typeof this.state.listProfileData !=="undefined" & this.state.listProfileData.length > 0 && this.state.listProfileData.map((itemProfileList,d) => (
                                  <option value={itemProfileList.profile_id}>{itemProfileList.profile}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Location <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocation} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Address <span class="text-danger">*</span></label>
                              <textarea className="form-control" id="address" name="address" value={this.state.address} onChange={this.onChangeAddress} required ></textarea>
                            </div>
                          </div>

                          

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Pincode <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" id="pincode" name="pincode" value={this.state.pincode} onChange={this.onChangePincode} required />
                            </div>
                          </div>

                          

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mail <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="email_id" name="email_id" value={this.state.email_id} onChange={this.onChangeEmail} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mobile <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" id="mobile_no" name="mobile_no" value={this.state.mobile_no} onChange={this.onChangeMobile} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Joining Date<span class="text-danger">*</span></label>
                              <input type="date" className="form-control" id="joining_date" name="joining_date" required />
                            </div>
                          </div>

                          {/*<div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Team <span class="text-danger">*</span></label>
                              <select className="form-control select" id="team_id" name="team_id" value={this.state.team_id} onChange={this.onChangeTeam} required >
                                <option value="">Select Team</option>
                                {this.state.listTeamData && typeof this.state.listTeamData !=="undefined" & this.state.listTeamData.length > 0 && this.state.listTeamData.map((itemTeamList,a) => (
                                  <option value={itemTeamList.team_id}>{itemTeamList.team_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>*/}

                          {/*<div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Photo <span class="text-danger">*</span></label>
                              <input type="file" className="form-control" id="name" name="name" value={this.state.name} onChange={this.onChangeName} required />
                            </div>
                          </div>*/}
                        </div>
                        <div class="submit-section">
                          <button class="btn btn-primary submit-btn" type="submit">Submit</button>
                        </div>
                        <CheckButton
                          style={{ display: "none" }}
                          ref={(c) => {
                            this.checkBtn = c;
                          }}
                        />
                      </Form>
                    </div>
                </div>
            </div>
          </div>


          <div id="edit_form" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Info Site Engineer</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Name <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="edit_user_name" name="edit_user_name" value={this.state.edit_user_name} onChange={this.onChangeEditName} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Designation <span class="text-danger">*</span></label>
                              <select className="form-control select" id="edit_designation_id" name="edit_designation_id" value={this.state.edit_designation_id} onChange={this.onChangeEditDesignation} required >
                                <option value="">Select Designation</option>
                                {this.state.listDesignationData && typeof this.state.listDesignationData !=="undefined" & this.state.listDesignationData.length > 0 && this.state.listDesignationData.map((itemDesignationList,c) => (
                                  <option value={itemDesignationList.designation_id}>{itemDesignationList.designation}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Reporting To</label>
                              <select className="form-control select" id="edit_reporting_to_id" name="edit_reporting_to_id" value={this.state.edit_reporting_to_id} onChange={this.onChangeEditReportingTo} required>
                                <option value="">Select User</option>
                                {this.state.listUserData && typeof this.state.listUserData !=="undefined" & this.state.listUserData.length > 0 && this.state.listUserData.map((itemUserList,b) => (
                                  <option value={itemUserList.user_id}>{itemUserList.user_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Profile<span class="text-danger">*</span></label>
                              <select className="form-control select" id="edit_profile_id" name="edit_profile_id" value={this.state.edit_profile_id} onChange={this.onChangeEditProfile} required >
                                <option value="">Select Profile</option>
                                {this.state.listProfileData && typeof this.state.listProfileData !=="undefined" & this.state.listProfileData.length > 0 && this.state.listProfileData.map((itemProfileList,d) => (
                                  <option value={itemProfileList.profile_id}>{itemProfileList.profile}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Location <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="edit_location" name="edit_location" value={this.state.edit_location} onChange={this.onChangeEditLocation} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Address <span class="text-danger">*</span></label>
                              <textarea className="form-control" id="edit_address" name="edit_address" value={this.state.edit_address} onChange={this.onChangeEditAddress} required ></textarea>
                            </div>
                          </div>

                          

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Pincode <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" id="edit_pincode" name="edit_pincode" value={this.state.edit_pincode} onChange={this.onChangeEditPincode} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mail <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="edit_email_id" name="edit_email_id" value={this.state.edit_email_id} onChange={this.onChangeEditEmail} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mobile <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" id="edit_mobile_no" name="edit_mobile_no" value={this.state.edit_mobile_no} onChange={this.onChangeEditMobile} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Joining Date<span class="text-danger">*</span></label>
                              <input type="date" className="form-control" id="edit_joining_date" name="edit_joining_date" required />
                            </div>
                          </div>

                          
                          {/*<div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Team <span class="text-danger">*</span></label>
                              <select className="form-control select" id="edit_team_id" name="edit_team_id" value={this.state.edit_team_id} onChange={this.onChangeEditTeam} required >
                                <option value="">Select Team</option>
                                {this.state.listTeamData && typeof this.state.listTeamData !=="undefined" & this.state.listTeamData.length > 0 && this.state.listTeamData.map((itemTeamList,a) => (
                                  <option value={itemTeamList.team_id}>{itemTeamList.team_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>*/}
                          

                          {/*<div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Photo <span class="text-danger">*</span></label>
                              <input type="file" className="form-control" id="name" name="name" value={this.state.name} onChange={this.onChangeName} required />
                            </div>
                          </div>*/}
                        </div>
                        <div class="submit-section">
                          <button class="btn btn-primary submit-btn" type="submit">Submit</button>
                        </div>
                        <CheckButton
                          style={{ display: "none" }}
                          ref={(c) => {
                            this.checkUpdateBtn = c;
                          }}
                        />
                      </Form>
                    </div>
                </div>
            </div>
          </div>


          <div className="modal custom-modal fade" id="delete_modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete User</h3>
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
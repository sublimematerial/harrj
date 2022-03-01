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

import { ClientAdd, ClientList, ClientInfo, ClientUpdate, ClientDelete } from "./../../actions/adminClient";

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

    this.ListClientFun = this.ListClientFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePincode = this.onChangePincode.bind(this);
    this.onChangeWarranty = this.onChangeWarranty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoClientFun = this.InfoClientFun.bind(this);

    this.onChangeEditName = this.onChangeEditName.bind(this);
    this.onChangeEditContactName = this.onChangeEditContactName.bind(this);
    this.onChangeEditMobile = this.onChangeEditMobile.bind(this);
    this.onChangeEditEmail = this.onChangeEditEmail.bind(this);
    this.onChangeEditAddress = this.onChangeEditAddress.bind(this);
    this.onChangeEditLocation = this.onChangeEditLocation.bind(this);
    this.onChangeEditPincode = this.onChangeEditPincode.bind(this);
    this.onChangeEditWarranty = this.onChangeEditWarranty.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listClientData: [],
        delete_id:0,
        name:'',
        contact_person:'',
        mobile_no:'',
        email_id:'',
        address:'',
        location:'',
        pincode:'',
        warranty:'',
        
        client_id:0,
        edit_name:'',
        edit_contact_person:'',
        edit_mobile_no:'',
        edit_email_id:'',
        edit_address:'',
        edit_location:'',
        edit_pincode:'',
        edit_warranty:'',

        siteLocationMoreAddData:[],
        maintenanceMoreAddData:[],
        maintenanceMoreAddDataEdit:[],
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

  handleAddMaintenance=()=>{
    var array = this.state.maintenanceMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ maintenanceMoreAddData: array });
  }


  handleRemoveMaintenance=(midx)=>{
    var array = this.state.maintenanceMoreAddData;
    array.splice(midx, 1);
    this.setState({ maintenanceMoreAddData: array });
  }


  handleMaintenanceRequirementsChange=(e, midx)=>{
    var array = this.state.maintenanceMoreAddData.slice();
    array[midx].maintenance_requirement = e.target.value;
    this.setState({ maintenanceMoreAddData: array });
  }

  handleMaintenanceDescriptionChange=(e, midx)=>{
    var array = this.state.maintenanceMoreAddData.slice();
    array[midx].maintenance_desc = e.target.value;
    this.setState({ maintenanceMoreAddData: array });
  }

  handleAddMaintenanceEdit=()=>{
    var array = this.state.maintenanceMoreAddDataEdit;
    array.push({ midx: array.length + 1 });
    this.setState({ maintenanceMoreAddDataEdit: array });
  }


  handleRemoveMaintenanceEdit=(midx)=>{
    var array = this.state.maintenanceMoreAddDataEdit;
    array.splice(midx, 1);
    this.setState({ maintenanceMoreAddDataEdit: array });
  }


  handleMaintenanceRequirementsChangeEdit=(e, midx)=>{
    var array = this.state.maintenanceMoreAddDataEdit.slice();
    array[midx].maintenance_requirement = e.target.value;
    this.setState({ maintenanceMoreAddDataEdit: array });
  }

  handleMaintenanceDescriptionChangeEdit=(e, midx)=>{
    var array = this.state.maintenanceMoreAddDataEdit.slice();
    array[midx].maintenance_desc = e.target.value;
    this.setState({ maintenanceMoreAddDataEdit: array });
  }

  ListClientFun=()=>{

    console.log("ListClientFunc111")
    const { dispatch, history } = this.props;
    dispatch(ClientList())
      .then((response) => {
        this.setState({
          listClientData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listClientData: []
        });
      });
  }


  handleDeleteConfirm =(unique_id)=>{
    console.log("Delete Confir")
    console.log(unique_id)
    this.setState({
        delete_id: unique_id,
      });
    $("#delete_modal").modal("show");
  }

  handleDelete =()=>{

    const { dispatch, history } = this.props;
    dispatch(ClientDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListClientFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeName=(e)=>{
    this.setState({
      name: e.target.value,
    });
  }

  onChangeContactName=(e)=>{
    this.setState({
      contact_person: e.target.value,
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

  onChangeWarranty=(e)=>{
    this.setState({
      warranty: e.target.value,
    });
  }

  handleSitesChange=(e, midx)=>{
    var array = this.state.siteLocationMoreAddData.slice();
    array[midx].sites = e.target.value;
    this.setState({ siteLocationMoreAddData: array });
  }

  handleLocationsChange=(e, midx)=>{
    var array = this.state.siteLocationMoreAddData.slice();
    array[midx].maintenance_requirement = e.target.value;
    this.setState({ siteLocationMoreAddData: array });
  }

  handleAddSiteLocation=()=>{
    var array = this.state.siteLocationMoreAddData;
    array.push({ midx: array.length + 1, sites_id: "" });
    this.setState({ siteLocationMoreAddData: array });
  }

  handleRemoveSiteLocation=(midx)=>{
    var array = this.state.siteLocationMoreAddData;
    array.splice(midx, 1);
    this.setState({ siteLocationMoreAddData: array });
  }

  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });


    this.Addform.validateAll();

    var site_name = $(".site_name").map(function(){return $(this).val();}).get();
    var site_location = $(".site_location").map(function(){return $(this).val();}).get();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(ClientAdd(this.state.name, this.state.contact_person, this.state.mobile_no, this.state.email_id, this.state.address, this.state.location, this.state.pincode, this.state.warranty, site_name, site_location))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListClientFun();
              this.setState({ name: '', contact_person: '', mobile_no: '', email_id: '', address: '', location: '', pincode: '', warranty: '' });
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

  InfoClientFun=(client_id)=>{

    const { dispatch, history } = this.props;
    dispatch(ClientInfo(client_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              client_id: client_id,
              edit_name: response.data[0].name,
              edit_contact_person: response.data[0].contact_person,
              edit_mobile_no: response.data[0].mobile_no,
              edit_email_id: response.data[0].email_id,
              edit_address: response.data[0].address,
              edit_location: response.data[0].location,
              edit_pincode: response.data[0].pincode,
              edit_warranty: response.data[0].warranty,
            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditName=(e)=>{
    this.setState({
      edit_name: e.target.value,
    });
  }

  onChangeEditContactName=(e)=>{
    this.setState({
      edit_contact_person: e.target.value,
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

  onChangeEditWarranty=(e)=>{
    this.setState({
      edit_warranty: e.target.value,
    });
  }

  handleUpdateSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;

    var site_name = $(".edit_site_name").map(function(){return $(this).val();}).get();
    var site_location = $(".edit_site_location").map(function(){return $(this).val();}).get();

    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(ClientUpdate(this.state.client_id, this.state.edit_name, this.state.edit_contact_person, this.state.edit_mobile_no, this.state.edit_email_id, this.state.edit_address, this.state.edit_location, this.state.edit_pincode, this.state.edit_warranty,site_name, site_location))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListClientFun();
              this.setState({ client_id: 0, edit_name: '', edit_contact_person: '', edit_mobile_no: '', edit_email_id: '', edit_address: '', edit_location: '', edit_pincode: '', edit_warranty:'' });
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
                      <h3 class="page-title">Client</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Client</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      {/*<a href="#" class="btn add-btn" data-toggle="modal" data-target="#add_form"><i class="fa fa-plus"></i> Add</a>
                      */}<div class="view-icons">
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
                            <th>Client Name</th>
                            <th>Mail</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Profile111 </th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listClientData && typeof this.state.listClientData !=="undefined" & this.state.listClientData.length > 0 && this.state.listClientData.map((itemClientList,l) => (
                            <tr>
                               <td>{itemClientList.id}</td>
                              <td>{itemClientList.name}</td>
                             
                              <td>{itemClientList.email_id}</td>
                              <td>{itemClientList.mobile_no}</td>
                              <td>{itemClientList.address}</td>
                              <td>{itemClientList.profile_photo}</td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    {/*<a className="dropdown-item" onClick={() => this.InfoClientFun(itemClientList.client_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a> */}
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemClientList.id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
                        <h4 className="modal-title">Add Client</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Name <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Name" id="name" name="name" value={this.state.name} onChange={this.onChangeName} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Contact Person <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Contact Person" id="contact_person" name="contact_person" value={this.state.contact_person} onChange={this.onChangeContactName} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mail <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Mail" id="email_id" name="email_id" value={this.state.email_id} onChange={this.onChangeEmail} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mobile <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" placeholder="Mobile" id="mobile_no" name="mobile_no" value={this.state.mobile_no} onChange={this.onChangeMobile} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Address <span class="text-danger">*</span></label>
                              <textarea className="form-control" placeholder="Address" id="address" name="address" value={this.state.address} onChange={this.onChangeAddress} required ></textarea>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Location <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Location" id="location" name="location" value={this.state.location} onChange={this.onChangeLocation} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Pincode <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" placeholder="Pincode" id="pincode" name="pincode" value={this.state.pincode} onChange={this.onChangePincode} required />
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div className="form-group">
                            <label class="col-form-label">Maintenance Type <span class="text-danger">*</span></label>
                            <select className="form-control" id="warranty" name="warranty" value={this.state.warranty} onChange={this.onChangeWarranty} required>
                            <option value="">Select Maintenance Type</option>
                            <option value="1">Warranty</option>
                            <option value="2"> No AMC</option>
                            <option value="3">AMC Full</option>
                            <option value="4">AMC Semi</option>
                            <option value="5">Others</option>

                            </select>
                            </div>
                            </div>

                          <div class="col-md-12">
                          <div className="modal-content">
                          <div className="modal-header">
                          <h4 className="modal-title">Sites Location</h4>
                          </div>
                          <div className="modal-body">


                          <div className="row" >  
                          <div class="table-responsive">
                          <table class="table table-hover table-white">
                          <thead>
                          <tr>
                          <th>Site Name</th>
                          <th>Site Location </th>
                          <th></th>

                          </tr>
                          </thead>
                          <tbody formArrayName="items">

                          <tr>
                          <td className="assign-left">
                          <input className="form-control site_name" name="site_name" value={this.state.maintenance_requirement} onChange={this.onChangeMaintenanceRequirement} required/>
                          </td>

                          <td className="">
                          <input className="form-control site_location" name="site_location" value={this.state.maintenance_desc} onChange={this.onChangeMaintenanceDesc} required/>
                          </td>


                          <td><a class="text-success font-18" title="Add"><i
                          class="fa fa-plus" onClick={this.handleAddMaintenance} ></i></a>
                          </td>

                          </tr>

                          {this.state.maintenanceMoreAddData.map((itemmaintenanceMoreAddData, midx) => (
                          <tr>
                          <td className="assign-left">
                          <input className="form-control site_name" name="site_name" value={itemmaintenanceMoreAddData.maintenance_requirement} onChange={e => this.handleMaintenanceRequirementsChange(e, midx)} required/>
                          </td>

                          <td className="">
                          <input className="form-control site_location" name="site_location" value={itemmaintenanceMoreAddData.maintenance_desc} onChange={e => this.handleMaintenanceDescriptionChange(e, midx)} required/>
                          </td>

                          <td>
                          <a class="text-danger font-18" title="Remove">
                          <i class="fa fa-trash-o" onClick={() => this.handleRemoveMaintenance(midx)} ></i>
                          </a>
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

                          {/*<div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Photo <span class="text-danger">*</span></label>
                              <input type="file" className="form-control" />
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
                        <h4 className="modal-title">Info Client</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Name <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Name" id="edit_name" name="edit_name" value={this.state.edit_name} onChange={this.onChangeEditName} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Contact Person <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Contact Person" id="edit_contact_person" name="edit_contact_person" value={this.state.edit_contact_person} onChange={this.onChangeEditContactName} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mail <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Mail" id="edit_email_id" name="edit_email_id" value={this.state.edit_email_id} onChange={this.onChangeEditEmail} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Mobile <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" placeholder="Mobile" id="edit_mobile_no" name="edit_mobile_no" value={this.state.edit_mobile_no} onChange={this.onChangeEditMobile} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Address <span class="text-danger">*</span></label>
                              <textarea className="form-control" placeholder="Address" id="edit_address" name="edit_address" value={this.state.edit_address} onChange={this.onChangeEditAddress} required ></textarea>
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Location <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Location" id="edit_location" name="edit_location" value={this.state.edit_location} onChange={this.onChangeEditLocation} required />
                            </div>
                          </div>

                          <div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Pincode <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" placeholder="Pincode" id="edit_pincode" name="edit_pincode" value={this.state.edit_pincode} onChange={this.onChangeEditPincode} required />
                            </div>
                          </div>

                          <div class="col-md-4">
        <div className="form-group">
        <label class="col-form-label">Maintenance Type <span class="text-danger">*</span></label>
        <select className="form-control" id="edit_warranty" name="edit_warranty" value={this.state.edit_warranty} onChange={this.onChangeEditWarranty} >
        <option value="">Select Maintenance Type</option>
        <option value="1">Warranty</option>
        <option value="2"> No AMC</option>
        <option value="3">AMC Full</option>
        <option value="4">AMC Semi</option>
        <option value="5">Others</option>

        </select>
        </div>
        </div>

                          {/*<div class="col-sm-4">
                            <div class="form-group">
                              <label class="col-form-label">Photo <span class="text-danger">*</span></label>
                              <input type="file" className="form-control" />
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
                    <h3>Delete Client</h3>
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
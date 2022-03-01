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

import { VendorList } from "./../../actions/adminVendor";
import { MaterialCategoryList } from "./../../actions/adminMaterialCategory";
import { VendorItemAdd, VendorItemList, VendorItemInfo, VendorItemUpdate, VendorItemDelete, ListMaterialInputTypeFun } from "./../../actions/adminVendorItem";

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

    this.ListVendorFun = this.ListVendorFun.bind(this);
    this.ListMaterialCategoryFun = this.ListMaterialCategoryFun.bind(this);
    this.ListVendorItemFun = this.ListVendorItemFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeVendor = this.onChangeVendor.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeItemRate = this.onChangeItemRate.bind(this);
    this.onChangeUpdateDate = this.onChangeUpdateDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoVendorFun = this.InfoVendorFun.bind(this);

    this.onChangeEditVendor = this.onChangeEditVendor.bind(this);
    this.onChangeEditItemName = this.onChangeEditItemName.bind(this);
    this.onChangeEditItemRate = this.onChangeEditItemRate.bind(this);
    this.onChangeEditUpdateDate = this.onChangeEditUpdateDate.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listVendorData: [],
        listMaterialCategoryData: [],
        listMaterialInputTypeData: [],
        listVendorItemData: [],
        delete_id:0,
        vendor_id:0,
        material_category_id:0,
        material_input_type_id:0,
        item_name:'',
        item_qty:0,
        item_rate:0,
        update_date:'',
        vendor_item_id:0,
        edit_vendor_id:0,
        edit_material_category_id:0,
        edit_material_input_type_id:0,
        edit_item_name:'',
        edit_item_qty:0,
        edit_item_rate:0,
        update_date:'',

        maintenanceMoreAddData:[],
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
    this.ListVendorFun();
    this.ListMaterialCategoryFun();
    this.ListVendorItemFun();
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

  ListVendorFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(VendorList())
      .then((response) => {
        this.setState({
          listVendorData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listVendorData: []
        });
      });
  }

  ListMaterialCategoryFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(MaterialCategoryList())
      .then((response) => {
        this.setState({
          listMaterialCategoryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listMaterialCategoryData: []
        });
      });
  }

  ListMaterialInputTypeDefFun=(material_category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(ListMaterialInputTypeFun(material_category_id))
      .then((response) => {
        this.setState({
          listMaterialInputTypeData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listMaterialInputTypeData: []
        });
      });
  }

  ListMaterialInputTypeFun=(material_category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(ListMaterialInputTypeFun(material_category_id))
      .then((response) => {
        this.setState({
          listMaterialInputTypeData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listMaterialInputTypeData: []
        });
      });
  }

  ListVendorItemFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(VendorItemList())
      .then((response) => {
        this.setState({
          listVendorItemData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listVendorItemData: []
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
    dispatch(VendorItemDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListVendorItemFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeVendor=(e)=>{
    this.setState({
      vendor_id: e.target.value,
    });
  }

  onChangeDefMaterialCategory=(e)=>{
    this.setState({
      material_category_id: e.target.value,
    });
    this.ListMaterialInputTypeFun(e.target.value);
  }

  onChangeMaterialCategory=(e)=>{
    this.setState({
      material_category_id: e.target.value,
    });
    this.ListMaterialInputTypeFun(e.target.value);
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

  handleMaterialCategoryChange=(e, midx)=>{

    const { dispatch, history } = this.props;
      dispatch( ListMaterialInputTypeFun(e.target.value))
      .then((response) => {

        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
          console.log("if response.data");
          console.log(response.data);

          var str  = '<option value="">Select material Input Type</option>';
          var dataResult = response.data;

          for (var i = 0; i < dataResult.length; i++) {
            str = str + '<option value="'+dataResult[i].material_input_type_id+'" >'+dataResult[i].material_input_type_name+'</option>';
          }

          console.log(str);
          console.log('#material_input_type_id_'+midx);

          $('#material_input_type_id_'+midx).empty().append(str);

        }else{
          console.log("else");
          $('#material_input_type_id_'+midx).empty();
        }
      })
      .catch((error) => {
        console.log("catch");
        $('#material_input_type_id_'+midx).empty();
      });
      
  }

  /*handleMaterialInputTypeChange=(e)=>{
    this.setState({
      material_input_type_id: e.target.value,
    });
  }*/

  onChangeMaterialInputType=(e)=>{
    this.setState({
      material_input_type_id: e.target.value,
    });
  }

  onChangeItemName=(e)=>{
    this.setState({
      item_name: e.target.value,
    });
  }

  onChangeItemRate=(e)=>{
    this.setState({
      item_rate: e.target.value,
    });
  }

  onChangeUpdateDate=(e)=>{
    this.setState({
      update_date: e.target.value,
    });
  }

  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    var material_category_id = $(".material_category_id").map(function(){return $(this).val();}).get();
    var material_input_type_id = $(".material_input_type_id").map(function(){return $(this).val();}).get();
    var item_name = $(".item_name").map(function(){return $(this).val();}).get();
    var item_qty = $(".item_qty").map(function(){return $(this).val();}).get();
    var item_rate = $(".item_rate").map(function(){return $(this).val();}).get();
    var update_date = $(".update_date").map(function(){return $(this).val();}).get();

    if (this.checkBtn.context._errors.length === 0) {
      //dispatch(VendorItemAdd(this.state.vendor_id, this.state.material_category_id, this.state.material_input_type_id, this.state.item_name, this.state.item_qty, this.state.item_rate, this.state.update_date))
      dispatch(VendorItemAdd(this.state.vendor_id, material_category_id, material_input_type_id, item_name, item_qty, item_rate, update_date))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListVendorItemFun();
              this.setState({ vendor_id: 0, material_category_id: 0, material_input_type_id: 0, item_name: '', item_qty: 0, item_rate: 0, update_date: '', maintenanceMoreAddData:[] });
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

  InfoVendorFun=(vendor_item_id)=>{

    const { dispatch, history } = this.props;
    dispatch(VendorItemInfo(vendor_item_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              vendor_item_id: vendor_item_id,
              edit_vendor_id: response.data[0].vendor_id,
              edit_material_category_id: response.data[0].material_category_id,
              edit_material_input_type_id: response.data[0].material_input_type_id,
              edit_item_name: response.data[0].item_name,
              edit_item_rate: response.data[0].item_rate,
              edit_update_date: response.data[0].update_date
            });

            this.ListMaterialInputTypeFun(response.data[0].material_category_id);
            
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditVendor=(e)=>{
    this.setState({
      edit_vendor_id: e.target.value,
    });
  }

  onChangeEditMaterialCategory=(e)=>{
    this.setState({
      edit_material_category_id: e.target.value,
    });
    this.ListMaterialInputTypeFun(e.target.value);
  }

  onChangeEditMaterialInputType=(e)=>{
    this.setState({
      edit_material_input_type_id: e.target.value,
    });
  }

  onChangeEditItemName=(e)=>{
    this.setState({
      edit_item_name: e.target.value,
    });
  }

  onChangeEditItemRate=(e)=>{
    this.setState({
      edit_item_rate: e.target.value,
    });
  }

  onChangeEditUpdateDate=(e)=>{
    this.setState({
      edit_update_date: e.target.value,
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
      dispatch(VendorItemUpdate(this.state.vendor_item_id, this.state.edit_vendor_id, this.state.edit_material_category_id, this.state.edit_material_input_type_id, this.state.edit_item_name, this.state.edit_item_qty, this.state.edit_item_rate, this.state.edit_update_date))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListVendorItemFun();
              this.setState({ vendor_item_id: 0, edit_vendor_id: 0, edit_material_category_id: 0, edit_material_input_type_id: 0, edit_item_name: '', edit_item_qty: 0, edit_item_rate: 0, edit_update_date: '' });
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
                      <h3 class="page-title">Vendor Items</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Vendor Items</li>
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
                            <th>Vendor</th>
                            <th>Material Category</th>
                            <th>Material Input Type</th>
                            <th>Items Name</th>
                            {/*<th>Quantity</th>*/}
                            <th>Rate</th>
                            <th>Updation Date</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listVendorItemData && typeof this.state.listVendorItemData !=="undefined" & this.state.listVendorItemData.length > 0 && this.state.listVendorItemData.map((itemVendorItemList,n) => (
                            <tr>
                              <td>{n+1}</td>
                              <td>{itemVendorItemList.vendor_name}</td>
                              <td>{itemVendorItemList.material_category_name}</td>
                              <td>{itemVendorItemList.material_input_type_name}</td>
                              <td>{itemVendorItemList.item_name}</td>
                              {/*<td>200</td>*/}
                              <td>{itemVendorItemList.item_rate}</td>
                              <td>{itemVendorItemList.update_date}</td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.InfoVendorFun(itemVendorItemList.vendor_item_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemVendorItemList.vendor_item_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
                        <h4 className="modal-title">Add Vendor Items</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label class="col-form-label">Vendor <span class="text-danger">*</span></label>
                              <select className="form-control select" id="vendor_id" name="vendor_id" value={this.state.vendor_id} onChange={this.onChangeVendor} required >
                                <option value="">Select Vendor</option>
                                {this.state.listVendorData && typeof this.state.listVendorData !=="undefined" & this.state.listVendorData.length > 0 && this.state.listVendorData.map((itemVendorList,b) => (
                                  <option value={itemVendorList.vendor_id}>{itemVendorList.name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-md-12">
                             <div className="modal-content">
                                <div className="modal-header">
                                   <h4 className="modal-title">Vendor Items:</h4>
                                </div>
                                <div className="modal-body">
                                   <div className="row" >
                                      <div class="table-responsive">
                                         <table class="table table-hover table-white">
                                            <thead>
                                               <tr>
                                                  <th>Material Category</th>
                                                  <th>Material Input Type</th>
                                                  <th>Material Name</th>
                                                  <th>Item Rate</th>
                                                  <th>Updation Date</th>
                                                  <th></th>
                                               </tr>
                                            </thead>
                                            <tbody formArrayName="items">
                                               <tr>
                                                  <td className="assign-left">
                                                     <select className="form-control select material_category_id" id="material_category_id" name="material_category_id" value={this.state.material_category_id} onChange={this.onChangeMaterialCategory} required >
                                                        <option value="">Select Material Category</option>
                                                        {this.state.listMaterialCategoryData && typeof this.state.listMaterialCategoryData !=="undefined" & this.state.listMaterialCategoryData.length > 0 && this.state.listMaterialCategoryData.map((itemMaterialCategoryList,b) => (
                                                          <option value={itemMaterialCategoryList.material_category_id}>{itemMaterialCategoryList.material_category_name}</option>
                                                        ))}
                                                    </select>
                                                  </td>
                                                  <td className="assign-left">
                                                     <select className="form-control select material_input_type_id" id="material_input_type_id" name="material_input_type_id" value={this.state.material_input_type_id} onChange={this.onChangeMaterialInputType} required >
                                                      <option value="">Select Material Input Type</option>
                                                      {this.state.listMaterialInputTypeData && typeof this.state.listMaterialInputTypeData !=="undefined" & this.state.listMaterialInputTypeData.length > 0 && this.state.listMaterialInputTypeData.map((itemMaterialInputTypeList,b) => (
                                                        <option value={itemMaterialInputTypeList.material_input_type_id}>{itemMaterialInputTypeList.material_input_type_name}</option>
                                                      ))}
                                                  </select>
                                                  </td>
                                                  <td className="">
                                                     <input type="text" className="form-control item_name" name="item_name" value={this.state.item_name} onChange={this.onChangeItemName} required />
                                                  </td>
                                                  <td className="">
                                                     <input type="number" className="form-control item_rate" name="item_rate" value={this.state.item_rate} onChange={this.onChangeItemRate} required />
                                                  </td>
                                                  <td className="">
                                                     <input type="date" className="form-control update_date" name="update_date" value={this.state.update_date} onChange={this.onChangeUpdateDate} required/>
                                                     <input type="hidden" className="form-control item_qty" name="item_qty" value="0" />
                                                  </td>
                                                  <td><a class="text-success font-18" title="Add"><i
                                                     class="fa fa-plus" onClick={this.handleAddMaintenance} ></i></a>
                                                  </td>
                                               </tr>

                                               
                                               {this.state.maintenanceMoreAddData.map((itemmaintenanceMoreAddData, midx) => (
                                                <tr>
                                                   <td className="assign-left">
                                                      <select className="form-control select material_category_id" onChange={e =>
                                                         this.handleMaterialCategoryChange(e, midx)} required>
                                                         <option value="">Select Material Category</option>
                                                        {this.state.listMaterialCategoryData && typeof this.state.listMaterialCategoryData !=="undefined" & this.state.listMaterialCategoryData.length > 0 && this.state.listMaterialCategoryData.map((itemMaterialCategoryList,b) => (
                                                          <option value={itemMaterialCategoryList.material_category_id}>{itemMaterialCategoryList.material_category_name}</option>
                                                        ))}
                                                      </select>
                                                   </td>
                                                   <td className="assign-left">
                                                     <select className="form-control select material_input_type_id" id={'material_input_type_id_'+midx} name="material_input_type_id"  required >
                                                      <option value="">Select Material Input Type</option>
                                                    </select>
                                                    </td>
                                                    <td className="">
                                                       <input type="text" className="form-control item_name" name="item_name" required />
                                                    </td>
                                                    <td className="">
                                                       <input type="number" className="form-control item_rate" name="item_rate" required />
                                                    </td>
                                                    <td className="">
                                                       <input type="date" className="form-control update_date" name="update_date" required/>
                                                       <input type="hidden" className="form-control item_qty" name="item_qty" value="0" />
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
                              <label class="col-form-label">Items Name <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="item_name" name="item_name" value={this.state.item_name} onChange={this.onChangeItemName} required />
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Material Category <span class="text-danger">*</span></label>
                              <select className="form-control select" id="material_category_id" name="material_category_id" value={this.state.material_category_id} onChange={this.onChangeMaterialCategory} required >
                                <option value="">Select Material Category</option>
                                {this.state.listMaterialCategoryData && typeof this.state.listMaterialCategoryData !=="undefined" & this.state.listMaterialCategoryData.length > 0 && this.state.listMaterialCategoryData.map((itemMaterialCategoryList,b) => (
                                  <option value={itemMaterialCategoryList.material_category_id}>{itemMaterialCategoryList.material_category_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Material Input Type <span class="text-danger">*</span></label>
                              <select className="form-control select" id="material_input_type_id" name="material_input_type_id" value={this.state.material_input_type_id} onChange={this.onChangeMaterialInputType} required >
                                <option value="">Select Material Input Type</option>
                                {this.state.listMaterialInputTypeData && typeof this.state.listMaterialInputTypeData !=="undefined" & this.state.listMaterialInputTypeData.length > 0 && this.state.listMaterialInputTypeData.map((itemMaterialInputTypeList,b) => (
                                  <option value={itemMaterialInputTypeList.material_input_type_id}>{itemMaterialInputTypeList.material_input_type_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>*/}

                          {/*<div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Quantity <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" />
                            </div>
                          </div>*/}


                          {/*<div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Rate<span class="text-danger">*</span></label>
                              <input type="number" className="form-control" id="item_rate" name="item_rate" value={this.state.item_rate} onChange={this.onChangeItemRate} required />
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Updation Date <span class="text-danger">*</span></label>
                              <input type="date" className="form-control" id="update_date" name="update_date" value={this.state.update_date} onChange={this.onChangeUpdateDate} required />
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
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Info Vendor Items</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Vendor <span class="text-danger">*</span></label>
                              <select className="form-control select" id="edit_vendor_id" name="edit_vendor_id" value={this.state.edit_vendor_id} onChange={this.onChangeEditVendor} required >
                                <option value="">Select Vendor</option>
                                {this.state.listVendorData && typeof this.state.listVendorData !=="undefined" & this.state.listVendorData.length > 0 && this.state.listVendorData.map((itemVendorList,b) => (
                                  <option value={itemVendorList.vendor_id}>{itemVendorList.name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Name <span class="text-danger">*</span></label>
                              <input type="text" className="form-control" id="edit_item_name" name="edit_item_name" value={this.state.edit_item_name} onChange={this.onChangeEditItemName} required />
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Material Category <span class="text-danger">*</span></label>
                              <select className="form-control select" id="edit_material_category_id" name="edit_material_category_id" value={this.state.edit_material_category_id} onChange={this.onChangeEditMaterialCategory} required >
                                <option value="">Select Material Category</option>
                                {this.state.listMaterialCategoryData && typeof this.state.listMaterialCategoryData !=="undefined" & this.state.listMaterialCategoryData.length > 0 && this.state.listMaterialCategoryData.map((itemMaterialCategoryList,b) => (
                                  <option value={itemMaterialCategoryList.material_category_id}>{itemMaterialCategoryList.material_category_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Material Input Type <span class="text-danger">*</span></label>
                              <select className="form-control select" id="edit_material_input_type_id" name="edit_material_input_type_id" value={this.state.edit_material_input_type_id} onChange={this.onChangeEditMaterialInputType} required >
                                <option value="">Select Material Input Type</option>
                                {this.state.listMaterialInputTypeData && typeof this.state.listMaterialInputTypeData !=="undefined" & this.state.listMaterialInputTypeData.length > 0 && this.state.listMaterialInputTypeData.map((itemMaterialInputTypeList,b) => (
                                  <option value={itemMaterialInputTypeList.material_input_type_id}>{itemMaterialInputTypeList.material_input_type_name}</option>
                                ))}
                            </select>
                            </div>
                          </div>

                          {/*<div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Quantity <span class="text-danger">*</span></label>
                              <input type="number" className="form-control" />
                            </div>
                          </div>*/}

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Rate<span class="text-danger">*</span></label>
                              <input type="number" className="form-control" id="edit_item_rate" name="edit_item_rate" value={this.state.edit_item_rate} onChange={this.onChangeEditItemRate} required />
                            </div>
                          </div>

                          <div class="col-sm-6">
                            <div class="form-group">
                              <label class="col-form-label">Items Updation Date <span class="text-danger">*</span></label>
                              <input type="date" className="form-control" id="edit_update_date" name="edit_update_date" value={this.state.edit_update_date} onChange={this.onChangeEditUpdateDate} required />
                            </div>
                          </div>

                        </div>
                        <div class="submit-section">
                          <button class="btn btn-primary submit-btn" type="submit">Update</button>
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
                    <h3>Delete Vendor Item</h3>
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
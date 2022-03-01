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

import { MaterialCategoryList } from "./../../actions/adminMaterialCategory";
import { MaterialInputTypeAdd, MaterialInputTypeList, MaterialInputTypeInfo, MaterialInputTypeUpdate, MaterialInputTypeDelete } from "./../../actions/adminMaterialInputType";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class MaterialInputTypeListClass extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListMaterialCategoryFun = this.ListMaterialCategoryFun.bind(this);
    this.ListMaterialInputTypeFun = this.ListMaterialInputTypeFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeMaterialCategory = this.onChangeMaterialCategory.bind(this);
    this.onChangeMaterialInputType = this.onChangeMaterialInputType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoMaterialInputTypeFun = this.InfoMaterialInputTypeFun.bind(this);

    this.onChangeEditMaterialCategory = this.onChangeEditMaterialCategory.bind(this);
    this.onChangeEditMaterialInputType = this.onChangeEditMaterialInputType.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listMaterialCategoryData: [],
        listMaterialInputTypeData: [],
        delete_id:0,
        material_category_id:0,
        material_input_type_name:'',
        material_input_type_id:0,
        edit_material_category_id:0,
        edit_material_input_type_name:'',
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
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
    this.ListMaterialCategoryFun();
    this.ListMaterialInputTypeFun();
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

  ListMaterialInputTypeFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(MaterialInputTypeList())
      .then((response) => {
        this.setState({
          listMaterialInputTypeData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listMaterialInputTypeData: []
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
    dispatch(MaterialInputTypeDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListMaterialInputTypeFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeMaterialCategory=(e)=>{
    this.setState({
      material_category_id: e.target.value,
    });
  }

  onChangeMaterialInputType=(e)=>{
    this.setState({
      material_input_type_name: e.target.value,
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
      dispatch(MaterialInputTypeAdd(this.state.material_category_id, this.state.material_input_type_name))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListMaterialInputTypeFun();
              this.setState({ material_category_id: '', material_input_type_name: '' });
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

  InfoMaterialInputTypeFun=(material_input_type_id)=>{

    const { dispatch, history } = this.props;
    dispatch(MaterialInputTypeInfo(material_input_type_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              material_input_type_id: material_input_type_id,
              edit_material_category_id: response.data[0].material_category_id,
              edit_material_input_type_name: response.data[0].material_input_type_name,
            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditMaterialCategory=(e)=>{
    this.setState({
      edit_material_category_id: e.target.value,
    });
  }

  onChangeEditMaterialInputType=(e)=>{
    this.setState({
      edit_material_input_type_name: e.target.value,
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
      dispatch(MaterialInputTypeUpdate(this.state.material_input_type_id, this.state.edit_material_category_id, this.state.edit_material_input_type_name))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListMaterialInputTypeFun();
              this.setState({ material_input_type_id: 0, edit_material_category_id: 0, edit_material_input_type_name: '' });
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
                      <h3 class="page-title">Material Input Type</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Material Input Type</li>
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
                            <th>Material Category</th>
                            <th>Material Input Type</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listMaterialInputTypeData && typeof this.state.listMaterialInputTypeData !=="undefined" & this.state.listMaterialInputTypeData.length > 0 && this.state.listMaterialInputTypeData.map((itemMaterialInputTypeList,l) => (
                          <tr>
                            <td>{l+1}</td>
                            <td>{itemMaterialInputTypeList.material_category_name}</td>
                            <td>{itemMaterialInputTypeList.material_input_type_name}</td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" onClick={() => this.InfoMaterialInputTypeFun(itemMaterialInputTypeList.material_input_type_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemMaterialInputTypeList.material_input_type_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Material Input Type</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>MaterialCategory:</label>
                              <select className="form-control" placeholder="Material Category" id="material_category_id" name="material_category_id" value={this.state.material_category_id} onChange={this.onChangeMaterialCategory} required >
                                  <option value="">Select MaterialCategory</option>
                                  {this.state.listMaterialCategoryData && typeof this.state.listMaterialCategoryData !=="undefined" & this.state.listMaterialCategoryData.length > 0 && this.state.listMaterialCategoryData.map((itemMaterialCategoryList,m) => (
                                    <option value={itemMaterialCategoryList.material_category_id}>{itemMaterialCategoryList.material_category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Material Input Type:</label>
                                <input type="text" className="form-control" placeholder="Material Input Type" id="material_input_type_name" name="material_input_type_name" value={this.state.material_input_type_name} onChange={this.onChangeMaterialInputType} required />
                            </div>
                          </div>
                        </div>
                        <div className="m-t-20 text-center">
                            <button className="btn btn-primary btn-lg" type="submit">Submit</button>
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
                        <h4 className="modal-title">Info Material Input Type</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>MaterialCategory:</label>
                              <select className="form-control" placeholder="Material Category" id="edit_material_category_id" name="edit_material_category_id" value={this.state.edit_material_category_id} onChange={this.onChangeEditMaterialCategory} required >
                                  <option value="">Select MaterialCategory</option>
                                  {this.state.listMaterialCategoryData && typeof this.state.listMaterialCategoryData !=="undefined" & this.state.listMaterialCategoryData.length > 0 && this.state.listMaterialCategoryData.map((itemMaterialCategoryList,m) => (
                                    <option value={itemMaterialCategoryList.material_category_id}>{itemMaterialCategoryList.material_category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>Material Input Type:</label>
                                <input type="text" className="form-control" placeholder="Material Input Type" id="edit_material_input_type_name" name="edit_material_input_type_name" value={this.state.edit_material_input_type_name} onChange={this.onChangeEditMaterialInputType} required />
                            </div>
                          </div>
                        </div>
                        <div className="m-t-20 text-center">
                            <button className="btn btn-primary btn-lg" type="submit">Update</button>
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
                      <h3>Delete Material Input Type</h3>
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

export default connect(mapStateToProps)(MaterialInputTypeListClass);
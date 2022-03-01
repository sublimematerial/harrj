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

import { CategoryList } from "./../../actions/adminCategory";
import { SubCategoryAdd, SubCategoryList, SubCategoryInfo, SubCategoryUpdate, SubCategoryDelete } from "./../../actions/adminSubcategory";

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

    this.ListCategoryFun = this.ListCategoryFun.bind(this);
    this.ListSubCategoryFun = this.ListSubCategoryFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoSubCategoryFun = this.InfoSubCategoryFun.bind(this);

    this.onChangeEditCategory = this.onChangeEditCategory.bind(this);
    this.onChangeEditSubCategory = this.onChangeEditSubCategory.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listCategoryData: [],
        listSubCategoryData: [],
        delete_id:0,
        category_id:0,
        sub_category_name:'',
        sub_category_img:'',

        sub_category_id:0,
        edit_category_id:0,
        edit_sub_category_name:'',
        edit_sub_category_img:'',
        edit_sub_category_view_img:'',

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
    this.ListCategoryFun();
    this.ListSubCategoryFun();
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

  ListCategoryFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listCategoryData: []
        });
      });
  }

  ListSubCategoryFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(SubCategoryList())
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: []
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
    dispatch(SubCategoryDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListSubCategoryFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeCategory=(e)=>{
    this.setState({
      category_id: e.target.value,
    });
  }

  onChangeSubCategory=(e)=>{
    this.setState({
      sub_category_name: e.target.value,
    });
  }

  onChangeSubCategoryImg=(e)=>{
    this.setState({
      sub_category_img: e.target.files,
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
      dispatch(SubCategoryAdd(this.state.category_id, this.state.sub_category_name,this.state.sub_category_img))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListSubCategoryFun();
              this.setState({ category_id: '', sub_category_name: '' });
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

  InfoSubCategoryFun=(sub_category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(SubCategoryInfo(sub_category_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              sub_category_id: sub_category_id,
              edit_category_id: response.data[0].category_id,
              edit_sub_category_name: response.data[0].sub_category_name,
              edit_sub_category_view_img: response.data[0].sub_category_img,


            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditCategory=(e)=>{
    this.setState({
      edit_category_id: e.target.value,
    });
  }

  onChangeEditSubCategory=(e)=>{
    this.setState({
      edit_sub_category_name: e.target.value,
    });
  }

  onChangeEditSubCategoryImg=(e)=>{
    this.setState({
      edit_sub_category_img: e.target.files,
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
      dispatch(SubCategoryUpdate(this.state.sub_category_id, this.state.edit_category_id, this.state.edit_sub_category_name,this.state.edit_sub_category_img))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListSubCategoryFun();
              this.setState({ sub_category_id: 0, edit_category_id: 0, edit_sub_category_name: '' });
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
                      <h3 class="page-title">Sub Category</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Sub Category</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      <a href="#" class="btn add-btn" data-toggle="modal" title="Add Subcategory" data-target="#add_form"><i class="fa fa-plus"></i></a>
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
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Image</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemSubCategoryList,l) => (
                          <tr>
                            <td>{l+1}</td>
                            <td>{itemSubCategoryList.category_name}</td>
                            <td>{itemSubCategoryList.sub_category_name}</td>
                            <td><img src={itemSubCategoryList.sub_category_img} width='50px' height="40px"/></td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" onClick={() => this.InfoSubCategoryFun(itemSubCategoryList.sub_category_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemSubCategoryList.sub_category_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Sub Category</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Category:</label>
                              <select className="form-control" placeholder="Category" id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required >
                                  <option value="">Select Category</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Sub Category:</label>
                                <input type="text" className="form-control" placeholder="Sub Category" id="sub_category_name" name="sub_category_name" value={this.state.sub_category_name} onChange={this.onChangeSubCategory} required />
                            </div>
                          </div>
                        </div>
                         <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Sub Category Image:</label>
                               <input type="file" className="form-control" id="sub_category_img" name="sub_category_img" onChange={this.onChangeSubCategoryImg} required />
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
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Info Sub Category</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Category:</label>
                              <select className="form-control" placeholder="Category" id="edit_category_id" name="edit_category_id" value={this.state.edit_category_id} onChange={this.onChangeEditCategory} required >
                                  <option value="">Select Category</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Sub Category:</label>
                                <input type="text" className="form-control" placeholder="Sub Category" id="edit_sub_category_name" name="edit_sub_category_name" value={this.state.edit_sub_category_name} onChange={this.onChangeEditSubCategory} required />
                            </div>
                          </div>
                        </div>
                         <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <img src={this.state.edit_sub_category_view_img} alt="Sub Category Image" width="250" height="250" />  
                            </div>
                          </div>
                          </div>
                         <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Category Image:</label>
                               <input type="file" className="form-control" id="edit_sub_category_img" name="edit_sub_category_img" onChange={this.onChangeEditSubCategoryImg}  />
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
                      <h3>Delete Sub Category</h3>
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
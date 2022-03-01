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
import { SubCategoryListByCategory } from "../../actions/adminSubcategory";
import {  BrandOfCatList } from "./../../actions/adminBrand";
import { ModelAdd, ModelList, ModelInfo, ModelUpdate, ModelDelete } from "./../../actions/adminModel";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Model extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListModelFun = this.ListModelFun.bind(this);
    this.ListBrandFun = this.ListBrandFun.bind(this);
    this.ListCategoryFun = this.ListCategoryFun.bind(this);
    this.ListSubCategoryFun = this.ListSubCategoryFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoModelFun = this.InfoModelFun.bind(this);

    this.onChangeEditModel = this.onChangeEditModel.bind(this);
    this.onChangeEditCategory = this.onChangeEditCategory.bind(this);
    this.onChangeEditSubCategory = this.onChangeEditSubCategory.bind(this);
    this.onChangeEditBrand = this.onChangeEditBrand.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listModelData: [],
        listBrandData: [],
        listCategoryData: [],
        listSubCategoryData:[],
        category_id:0,
        edit_category_id:0,
        sub_category_id:0,
        edit_sub_category_id:0,
        delete_id:0,
        model_name:'',
        model_desc:"",
        model_id:0,
        edit_model_name:'',
        edit_model_desc:'',
        edit_model_desc_view:''


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
    this.ListCategoryFun();
    // this.ListBrandFun();
    this.ListModelFun();
  }
  onChangeEditCategory=(e)=>{
    var catid=e.target.value
    this.setState({
      edit_category_id: e.target.value,
    }, () => {
      this.listSubCategoryData(catid)
     
  });
  }

  onChangeEditSubCategory=(e)=>{
    var subcatid=e.target.value
    this.setState({
      edit_sub_category_id: e.target.value,
    }, () => {
     
      this.ListBrandFun(subcatid);
  });
  }

  onChangeEditBrand=(e)=>{
    this.setState({
      edit_brand_id: e.target.value,
    });
  }

  ListSubCategoryFun=()=>{
    console.log("now categorylist ")

    const { dispatch, history } = this.props;
    dispatch(SubCategoryListByCategory(this.state.category_id))
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: []
        });
      });
  }
  ListCategoryFun=()=>{
    console.log("now categorylist ")

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
  ListBrandFun=(cat_id)=>{
console.log("now brandlist ")
    const { dispatch, history } = this.props;
    dispatch(BrandOfCatList(cat_id))
      .then((response) => {
        console.log("brand list now ")
        console.log(response.data)
        this.setState({
          listBrandData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
            listBrandData: []
        });
      });
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

  ListModelFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ModelList())
      .then((response) => {
        this.setState({
            listModelData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
            listModelData: []
        });
      });
  }
  onChangeCategory=(e)=>{
    var catid=e.target.value
    this.setState({
      category_id: e.target.value,
    }, () => {
      this.ListSubCategoryFun(catid)
     
  });
  }

  onChangeSubCategory=(e)=>{
    var subcatid=e.target.value
    this.setState({
      sub_category_id: e.target.value,
    }
    , () => {
      
      this.ListBrandFun(subcatid);
  });
  }
  onChangeBrand=(e)=>{
    console.log("brand sel")
    console.log(e.target.value)
    this.setState({
      brand_id: e.target.value,
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
    dispatch(ModelDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListModelFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeModel=(e)=>{
    this.setState({
      model_name: e.target.value,
    });
  }
    onChangModelDesc=(e)=>{
    this.setState({
      category_img: e.target.files,
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
      dispatch(ModelAdd(this.state.category_id,this.state.brand_id,this.state.model_name,this.state.model_desc))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListModelFun();
              this.setState({ category_name: '' });
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

  InfoModelFun=(model_id)=>{

    const { dispatch, history } = this.props;
    dispatch(ModelInfo(model_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              model_id: model_id,
              edit_category_id:response.data[0].category_id,
              edit_sub_category_id:response.data[0].sub_category_id,
              edit_brand_id:response.data[0].brand_id,
              edit_model_name: response.data[0].model_name,
              edit_model_desc_view: response.data[0].model_desc

            }, () => {
              this.ListSubCategoryFun(response.data[0].category_id)
              this.ListBrandFun(response.data[0].sub_category_id)
             
          });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditModel=(e)=>{
    this.setState({
      edit_model_name: e.target.value,
    });
  }
  onChangeEditBrandImg=(e)=>{
    this.setState({
        edit_model_desc: e.target.value,
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
      dispatch(ModelUpdate(this.state.model_id, this.state.edit_category_id,this.state.brand_id, this.state.edit_model_name, this.state.edit_model_desc))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListModelFun();
              this.setState({ category_id: 0, edit_category_name: '',edit_category_img: '' });
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
                      <h3 class="page-title">Model</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Model</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      <a href="#" class="btn add-btn" title="Add Brand" data-toggle="modal" data-target="#add_form"><i class="fa fa-plus"></i></a>
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
                            <th>Brand</th>
                            <th>Model Name</th>
                            <th>Model Description</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>

                          {this.state.listModelData && typeof this.state.listModelData !=="undefined" & this.state.listModelData.length > 0 && this.state.listModelData.map((itemModelList,l) => (
                            <tr>
                              <td>{l+1}</td>
                              <td>{itemModelList.category_name}</td>
                              <td>{itemModelList.sub_category_name}</td>
                              <td>{itemModelList.brand_name}</td>
                              <td>{itemModelList.model_name}</td>
                              
                              <td><img src={itemModelList.model_desc} width='50px' height="40px"/></td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.InfoModelFun(itemModelList.model_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemModelList.model_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
                        <h4 className="modal-title">Add Model</h4>
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
                              <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeSubCategory} required >
                                  <option value="">Select Sub Category</option>
                                  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>{itemTaskList.sub_category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Brand:</label>
                              <select className="form-control" placeholder="brand" id="brand_id" name="brand_id" value={this.state.brand_id} onChange={this.onChangeBrand} required >
                                  <option value="">Select Brand</option>
                                  {this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.brand_id}>{itemTaskList.brand_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Model Name:</label>
                                <input type="text" className="form-control" placeholder="Model Name" id="model_name" name="category_name" value={this.state.model_name} onChange={this.onChangeModel} required />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Model Description:</label>
                               <input type="text" className="form-control" id="category_img" name="model_desc" onChange={this.onChangModelDesc} required />
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
                        <h4 className="modal-title">Info Brand</h4>
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
                              <select className="form-control" placeholder="Sub Category" id="edit_sub_category_id" name="edit_sub_category_id" value={this.state.edit_sub_category_id} onChange={this.onChangeEditSubCategory} required >
                                  <option value="">Select Sub Category</option>
                                  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>{itemTaskList.sub_category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Brand:</label>
                              <select className="form-control" placeholder="Brand" id="edit_brand_id" name="edit_brand_id" value={this.state.edit_brand_id} onChange={this.onChangeEditBrand} required >
                                  <option value="">Select Brand</option>
                                  {this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.brand_id}>{itemTaskList.brand_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Model Name:</label>
                                <input type="text" className="form-control" placeholder="Model Name" id="edit_model_name" name="model_name" value={this.state.edit_model_name} onChange={this.onChangeEditModel} required />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <img src={this.state.edit_model_desc_view} alt="Category Image" width="250" height="250" />  
                            </div>
                          </div>
                          </div>
                         <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>Model Des:</label>
                               <input type="text" className="form-control" id="edit_model_desc" name="edit_brand_img" onChange={this.onChangeEditBrandImg}  />
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
                      <h3>Delete Model</h3>
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

export default connect(mapStateToProps)(Model);
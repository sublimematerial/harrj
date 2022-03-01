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
import { SubCategoryListByCategory } from "./../../actions/adminSubcategory";

import { ProductAdd, ProductList, ProductInfo, ProductUpdate, ProductDelete } from "./../../actions/adminProduct";

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
    this.ListProductFun = this.ListProductFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoProductFun = this.InfoProductFun.bind(this);

    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listCategoryData: [],
        listProductData: [],
        title:'',
        name:'',
        description:'',
        keywords:'',
        category_id:0,
        sub_category_id:0,
        start_date_time:'',
        end_date_time:'',
        auction_type:'',
        starting_price:0,
        high_price:0,
        final_price:0,
        refund:'no',
        refund_days:0,
        youtube_link:'',
        video:'',
        product_img:[],

        delete_id:0,

        product_id:0,
        edit_title:'',
        edit_name:'',
        edit_description:'',
        edit_keywords:'',
        edit_category_id:0,
        edit_sub_category_id:0,
        edit_start_date_time:'',
        edit_end_date_time:'',
        edit_auction_type:'',
        edit_starting_price:0,
        edit_high_price:0,
        edit_final_price:0,
        edit_refund:'no',
        edit_refund_days:0,
        edit_youtube_link:'',
        edit_video:'',
        edit_product_img:[],
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
    this.ListProductFun();
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
   ListSubCategoryFun=(category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(SubCategoryListByCategory(category_id))
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

  ListProductFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(ProductList())
      .then((response) => {
        this.setState({
          listProductData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listProductData: []
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
    dispatch(ProductDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListProductFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }


  onChangeTitle=(e)=>{
    this.setState({
      title: e.target.value,
    });
  }
  onChangeName=(e)=>{
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDescription=(e)=>{
    this.setState({
      description: e.target.value,
    });
  } 
  onChangeKeywords=(e)=>{
    this.setState({
      keywords: e.target.value,
    });
  } 
  onChangeCategory=(e)=>{
    this.setState({
      category_id: e.target.value,
    });
    this.ListSubCategoryFun(e.target.value);
  }
  onChangeSubCategory=(e)=>{
    this.setState({
      sub_category_id: e.target.value,
    });
  }
  onChangeStartDateTime=(e)=>{
    this.setState({
      start_date_time: e.target.value,
    });
  }
 onChangeEndDateTime=(e)=>{
    this.setState({
      end_date_time: e.target.value,
    });
  }
 onChangeAuctionType=(e)=>{
    this.setState({
      auction_type: e.target.value,
    });
  }
 onChangeStartingPrice=(e)=>{
    this.setState({
      starting_price: e.target.value,
    });
  }
 onChangeHighPrice=(e)=>{
    this.setState({
      high_price: e.target.value,
    });
  }
 onChangeFinalPrice=(e)=>{
    this.setState({
      final_price: e.target.value,
    });
  }
onChangeRefund=(e)=>{
    this.setState({
      refund: e.target.value,
    });
  }
onChangeRefundDays=(e)=>{
    this.setState({
      refund_days: e.target.value,
    });
  }
onChangeYoutubeLink=(e)=>{
    this.setState({
      youtube_link: e.target.value,
    });
  }
onChangeVideo=(e)=>{
    this.setState({
      video: e.target.files,
    });
  }
onChangeProductImage=(e)=>{
    this.setState({
      product_img: e.target.files,
    });
  }


  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

     var add_product_img = [];
    $('.add_product_img').each(function(index, element){
      console.log("element: ")
      console.log(element.files[0])
      add_product_img.push(element.files[0]);
    });
     var add_video = [];
    $('.add_video').each(function(index, element){
      console.log("element: ")
      console.log(element.files[0])
      add_video.push(element.files[0]);
    });

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(ProductAdd(this.state.title,this.state.name,this.state.description,this.state.keywords,this.state.category_id,this.state.sub_category_id,this.state.start_date_time,this.state.end_date_time,this.state.auction_type,this.state.starting_price,this.state.high_price,this.state.final_price,this.state.refund,this.state.refund_days,this.state.youtube_link,add_product_img,add_video))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListProductFun();
              this.setState({ category_id: '',sub_category_id: '',  product_name: '' });
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

  InfoProductFun=(product_id)=>{

    const { dispatch, history } = this.props;
    dispatch(ProductInfo(product_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){

            this.setState({
              product_id: product_id,
              edit_category_id: response.data[0].category_id,
              edit_sub_category_id: response.data[0].sub_category_id,
              edit_product_name: response.data[0].product_name
            });
             this.ListSubCategoryFun(response.data[0].category_id);
           
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditTitle=(e)=>{
    this.setState({
      edit_title: e.target.value,
    });
  }
  onChangeEditName=(e)=>{
    this.setState({
      edit_name: e.target.value,
    });
  }
  onChangeEditDescription=(e)=>{
    this.setState({
      edit_description: e.target.value,
    });
  } 
  onChangeEditKeywords=(e)=>{
    this.setState({
      edit_keywords: e.target.value,
    });
  } 
  onChangeEditCategory=(e)=>{
    this.setState({
      edit_category_id: e.target.value,
    });
    this.ListSubCategoryFun(e.target.value);
  }
  onChangeEditSubCategory=(e)=>{
    this.setState({
      edit_sub_category_id: e.target.value,
    });
  }
  onChangeEditStartDateTime=(e)=>{
    this.setState({
      edit_start_date_time: e.target.value,
    });
  }
 onChangeEditEndDateTime=(e)=>{
    this.setState({
      edit_end_date_time: e.target.value,
    });
  }
 onChangeEditAuctionType=(e)=>{
    this.setState({
      edit_auction_type: e.target.value,
    });
  }
 onChangeEditStartingPrice=(e)=>{
    this.setState({
      edit_starting_price: e.target.value,
    });
  }
 onChangeEditHighPrice=(e)=>{
    this.setState({
      edit_high_price: e.target.value,
    });
  }
 onChangeEditFinalPrice=(e)=>{
    this.setState({
      edit_final_price: e.target.value,
    });
  }
onChangeEditRefund=(e)=>{
    this.setState({
      edit_refund: e.target.value,
    });
  }
onChangeEditRefundDays=(e)=>{
    this.setState({
      edit_refund_days: e.target.value,
    });
  }
onChangeEditYoutubeLink=(e)=>{
    this.setState({
      edit_youtube_link: e.target.value,
    });
  }
onChangeEditVideo=(e)=>{
    this.setState({
      edit_video: e.target.files,
    });
  }
onChangeEditProductImage=(e)=>{
    this.setState({
      edit_product_img: e.target.files,
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
      dispatch(ProductUpdate(this.state.product_id,this.state.edit_title,this.state.edit_name,this.state.edit_description,this.state.edit_keywords,this.state.edit_category_id,this.state.edit_sub_category_id,this.state.edit_start_date_time,this.state.edit_end_date_time,this.state.edit_auction_type,this.state.edit_starting_price,this.state.edit_high_price,this.state.edit_final_price,this.state.edit_refund,this.state.edit_refund_days,this.state.edit_youtube_link,this.state.edit_product_img,this.state.edit_video))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListProductFun();
              this.setState({ product_id: 0, edit_category_id: 0, edit_product_name: '' });
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
                      <h3 class="page-title">Product</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Product</li>
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
                            <th>Title</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Final Price</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listProductData && typeof this.state.listProductData !=="undefined" & this.state.listProductData.length > 0 && this.state.listProductData.map((itemProductList,l) => (
                          <tr>
                            <td>{l+1}</td>
                            <td>{itemProductList.title}</td>
                            <td>{itemProductList.name}</td>
                            <td><img src={itemProductList.product_img} width='50px' height="40px"/></td>
                            <td>{itemProductList.final_price}</td>


                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" onClick={() => this.InfoProductFun(itemProductList.product_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemProductList.product_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
                        <h4 className="modal-title">Add Product</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" placeholder="Title" id="title" name="title" value={this.state.title} onChange={this.onChangeTitle} required />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" placeholder="Name" id="name" name="name" value={this.state.name} onChange={this.onChangeName} required />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Description:</label>
                                <input type="text" className="form-control" placeholder="Description" id="description" name="description" value={this.state.description} onChange={this.onChangeDescription} required />
                            </div>
                          </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Keywords:</label>
                                <input type="text" className="form-control" placeholder="Keywords" id="keywords" name="keywords" value={this.state.keywords} onChange={this.onChangeKeywords} required />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-3">
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
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Sub Category:</label>
                              <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeSubCategory}  >
                                  <option value="">Select Sub Category</option>
                                  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>{itemTaskList.sub_category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" placeholder="Start Date Time" id="start_date_time" name="start_date_time" value={this.state.start_date_time} onChange={this.onChangeStartDateTime} required />
                            </div>
                          </div>
                          //  <div class="col-sm-3">
                          //   <div className="form-group">
                          //       <label>End Date:</label>
                          //       <input type="date" className="form-control" placeholder="End Date Time" id="end_date_time" name="end_date_time" value={this.state.end_date_time} onChange={this.onChangeEndDateTime} required />
                          //   </div>
                          // </div>
                       </div>

                        <div class="row">
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Auction Type:</label>
                                 <select className="form-control" placeholder="Auction Type" id="auction_type" name="auction_type" value={this.state.auction_type} onChange={this.onChangeAuctionType} required >
                                  <option value="">Select Auction Type:</option>
                                   <option value="online">Online</option>
                                   <option value="offline">Offline</option>
                              </select>
                               </div>
                          </div>
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Starting Price:</label>
                                <input type="number" className="form-control" placeholder="Starting Price" id="starting_price" name="starting_price" value={this.state.starting_price} onChange={this.onChangeStartingPrice} required />
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>High Price:</label>
                                <input type="number" className="form-control" placeholder="High Price" id="high_price" name="high_price" value={this.state.high_price} onChange={this.onChangeHighPrice} required />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Final Price:</label>
                                <input type="number" className="form-control" placeholder="Final Price" id="final_price" name="final_price" value={this.state.final_price} onChange={this.onChangeFinalPrice} required />
                            </div>
                            </div>
                        </div>

                         <div class="row">
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Refund:</label>
                                 <select className="form-control" placeholder="Refund" id="refund" name="refund" value={this.state.refund} onChange={this.onChangeRefund} required >
                                   <option value="no">No</option>
                                   <option value="yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Refund Days:</label>
                                <input type="number" className="form-control" placeholder="Refund Days" id="refund_days" name="refund_days" value={this.state.refund_days} onChange={this.onChangeRefundDays} required />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Meeting Link</label>
                                <input type="text" className="form-control " placeholder="Youtube Link" id="youtube_link" name="youtube_link" value={this.state.youtube_link} onChange={this.onChangeYoutubeLink}  />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Video:</label>
                                <input type="file" className="form-control add_video" id="video" name="video" onChange={this.onChangeVideo} required />
                            </div>
                            </div>
                            
                        </div>

                        <div class="row">\
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Product Images:</label>
                                <input type="file" className="form-control add_product_img" id="product_img" name="product_img" onChange={this.onChangeProductImage} multiple required />
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
                        <h4 className="modal-title">Info Product</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" placeholder="Title" id="title" name="edit_title" value={this.state.title} onChange={this.onChangeEditTitle} required />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" placeholder="Name" id="name" name="edit_name" value={this.state.name} onChange={this.onChangeEditName} required />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Description:</label>
                                <input type="text" className="form-control" placeholder="Description" id="description" name="edit_description" value={this.state.description} onChange={this.onChangeEditDescription} required />
                            </div>
                          </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Keywords:</label>
                                <input type="text" className="form-control" placeholder="Keywords" id="keywords" name="edit_keywords" value={this.state.keywords} onChange={this.onChangeEditKeywords} required />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Category:</label>
                              <select className="form-control" placeholder="Category" id="category_id" name="edit_category_id" value={this.state.category_id} onChange={this.onChangeEditCategory} required >
                                  <option value="">Select Category</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Sub Category:</label>
                              <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="edit_sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeEditSubCategory}  >
                                  <option value="">Select Sub Category</option>
                                  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>{itemTaskList.sub_category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" placeholder="Start Date Time" id="start_date_time" name="edit_start_date_time" value={this.state.start_date_time} onChange={this.onChangeEditStartDateTime} required />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" className="form-control" placeholder="End Date Time" id="end_date_time" name="edit_end_date_time" value={this.state.end_date_time} onChange={this.onChangeEditEndDateTime} required />
                            </div>
                          </div>
                       </div>

                        <div class="row">
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Auction Type:</label>
                                 <select className="form-control" placeholder="Auction Type" id="auction_type" name="edit_auction_type" value={this.state.auction_type} onChange={this.onChangeEditAuctionType} required >
                                  <option value="">Select Auction Type:</option>
                                   <option value="online">Online</option>
                                   <option value="offline">Offline</option>
                              </select>
                               </div>
                          </div>
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Starting Price:</label>
                                <input type="number" className="form-control" placeholder="Starting Price" id="starting_price" name="edit_starting_price" value={this.state.starting_price} onChange={this.onChangeEditStartingPrice} required />
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>High Price:</label>
                                <input type="number" className="form-control" placeholder="High Price" id="high_price" name="edit_high_price" value={this.state.high_price} onChange={this.onChangeEditHighPrice} required />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Final Price:</label>
                                <input type="number" className="form-control" placeholder="Final Price" id="final_price" name="edit_final_price" value={this.state.final_price} onChange={this.onChangeEditFinalPrice} required />
                            </div>
                            </div>
                        </div>

                         <div class="row">
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Refund:</label>
                                 <select className="form-control" placeholder="Refund" id="refund" name="edit_refund" value={this.state.refund} onChange={this.onChangeEditRefund} required >
                                   <option value="no">No</option>
                                   <option value="yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Refund Days:</label>
                                <input type="number" className="form-control" placeholder="Refund Days" id="refund_days" name="edit_refund_days" value={this.state.refund_days} onChange={this.onChangeEditRefundDays} required />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Youtube Link</label>
                                <input type="text" className="form-control " placeholder="Youtube Link" id="youtube_link" name="edit_youtube_link" value={this.state.youtube_link} onChange={this.onChangeEditYoutubeLink}  />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Video:</label>
                                <input type="file" className="form-control edit_video" id="video" name="edit_video" onChange={this.onChangeEditVideo} required />
                            </div>
                            </div>
                            
                        </div>

                        <div class="row">\
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Product Images:</label>
                                <input type="file" className="form-control edit_product_img" id="product_img" name="edit_product_img" onChange={this.onChangeEditProductImage} multiple required />
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
                      <h3>Delete Product</h3>
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
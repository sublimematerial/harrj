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

import { CountryList } from "./../../actions/adminCountry";
import { StateListByCountry } from "./../../actions/adminState";
import { CityAdd, CityList, CityInfo, CityUpdate, CityDelete } from "./../../actions/adminCity";

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

    this.ListCountryFun = this.ListCountryFun.bind(this);
    this.ListCityFun = this.ListCityFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoCityFun = this.InfoCityFun.bind(this);

    this.onChangeEditCountry = this.onChangeEditCountry.bind(this);
    this.onChangeEditCity = this.onChangeEditCity.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listCountryData: [],
        listCityData: [],
        delete_id:0,
        country_id:0,
        state_id:0,

        city_name:'',
        city_id:0,
        edit_country_id:0,
        edit_city_name:'',
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
    this.ListCountryFun();
    this.ListCityFun();
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

  ListCountryFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(CountryList())
      .then((response) => {
        this.setState({
          listCountryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listCountryData: []
        });
      });
  }
   ListStateFun=(country_id)=>{

    const { dispatch, history } = this.props;
    dispatch(StateListByCountry(country_id))
      .then((response) => {
        this.setState({
          listStateData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listStateData: []
        });
      });
  }

  ListCityFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(CityList())
      .then((response) => {
        this.setState({
          listCityData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listCityData: []
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
    dispatch(CityDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListCityFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeCountry=(e)=>{
    this.setState({
      country_id: e.target.value,
    });
    this.ListStateFun(e.target.value);
  }

  onChangeState=(e)=>{
    this.setState({
      state_id: e.target.value,
    });
  }

  onChangeCity=(e)=>{
    this.setState({
      city_name: e.target.value,
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
      dispatch(CityAdd(this.state.city_name,this.state.country_id, this.state.state_id))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListCityFun();
              this.setState({ country_id: '',state_id: '',  city_name: '' });
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

  InfoCityFun=(city_id)=>{

    const { dispatch, history } = this.props;
    dispatch(CityInfo(city_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              city_id: city_id,
              edit_country_id: response.data[0].country_id,
              edit_city_name: response.data[0].city_name
            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditCountry=(e)=>{
    this.setState({
      edit_country_id: e.target.value,
    });
  }

  onChangeEditCity=(e)=>{
    this.setState({
      edit_city_name: e.target.value,
    });
  }

  onChangeEditDescription=(e)=>{
    this.setState({
      edit_sub_task_description: e.target.value,
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
      dispatch(CityUpdate(this.state.city_id, this.state.edit_country_id, this.state.edit_city_name))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListCityFun();
              this.setState({ city_id: 0, edit_country_id: 0, edit_city_name: '' });
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
                      <h3 class="page-title">City</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">City</li>
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
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listCityData && typeof this.state.listCityData !=="undefined" & this.state.listCityData.length > 0 && this.state.listCityData.map((itemCityList,l) => (
                          <tr>
                            <td>{l+1}</td>
                            <td>{itemCityList.country_name}</td>
                            <td>{itemCityList.state_name}</td>
                            <td>{itemCityList.city_name}</td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" onClick={() => this.InfoCityFun(itemCityList.city_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemCityList.city_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
                        <h4 className="modal-title">Add City</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Country:</label>
                              <select className="form-control" placeholder="Country" id="country_id" name="country_id" value={this.state.country_id} onChange={this.onChangeCountry} required >
                                  <option value="">Select Country</option>
                                  {this.state.listCountryData && typeof this.state.listCountryData !=="undefined" & this.state.listCountryData.length > 0 && this.state.listCountryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.country_id}>{itemTaskList.country_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>State:</label>
                              <select className="form-control" placeholder="State" id="state_id" name="state_id" value={this.state.state_id} onChange={this.onChangeState}  >
                                  <option value="">Select State</option>
                                  {this.state.listStateData && typeof this.state.listStateData !=="undefined" & this.state.listStateData.length > 0 && this.state.listStateData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.state_id}>{itemTaskList.state_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>City:</label>
                                <input type="text" className="form-control" placeholder="City" id="city_name" name="city_name" value={this.state.city_name} onChange={this.onChangeCity} required />
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
                        <h4 className="modal-title">Info City</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Country:</label>
                              <select className="form-control" placeholder="Country" id="edit_country_id" name="edit_country_id" value={this.state.edit_country_id} onChange={this.onChangeEditCountry} required >
                                  <option value="">Select Country</option>
                                  {this.state.listCountryData && typeof this.state.listCountryData !=="undefined" & this.state.listCountryData.length > 0 && this.state.listCountryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.country_id}>{itemTaskList.country_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>City:</label>
                                <input type="text" className="form-control" placeholder="City" id="edit_city_name" name="edit_city_name" value={this.state.edit_city_name} onChange={this.onChangeEditCity} required />
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
                      <h3>Delete City</h3>
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
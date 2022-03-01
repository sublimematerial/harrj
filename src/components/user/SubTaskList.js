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

import { TaskList } from "./../../actions/adminTask";
import { SubTaskAdd, SubTaskList, SubTaskInfo, SubTaskUpdate, SubTaskDelete } from "./../../actions/adminSubtask";

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

    this.ListTaskFun = this.ListTaskFun.bind(this);
    this.ListSubTaskFun = this.ListSubTaskFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeSubTask = this.onChangeSubTask.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoSubTaskFun = this.InfoSubTaskFun.bind(this);

    this.onChangeEditTask = this.onChangeEditTask.bind(this);
    this.onChangeEditSubTask = this.onChangeEditSubTask.bind(this);
    this.onChangeEditDescription = this.onChangeEditDescription.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listTaskData: [],
        listSubTaskData: [],
        delete_id:0,
        task_id:0,
        sub_task_name:'',
        sub_task_description:'',
        sub_task_id:0,
        edit_task_id:0,
        edit_sub_task_name:'',
        edit_sub_task_description:'',
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
    this.ListTaskFun();
    this.ListSubTaskFun();
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

  ListTaskFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(TaskList())
      .then((response) => {
        this.setState({
          listTaskData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listTaskData: []
        });
      });
  }

  ListSubTaskFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(SubTaskList())
      .then((response) => {
        this.setState({
          listSubTaskData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listSubTaskData: []
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
    dispatch(SubTaskDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
            toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListSubTaskFun();
        }else{
            toast.error(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeTask=(e)=>{
    this.setState({
      task_id: e.target.value,
    });
  }

  onChangeSubTask=(e)=>{
    this.setState({
      sub_task_name: e.target.value,
    });
  }

  onChangeDescription=(e)=>{
    this.setState({
      sub_task_description: e.target.value,
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
      dispatch(SubTaskAdd(this.state.task_id, this.state.sub_task_name, this.state.sub_task_description))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListSubTaskFun();
              this.setState({ task_id: '', sub_task_name: '', sub_task_description: '' });
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

  InfoSubTaskFun=(sub_task_id)=>{

    const { dispatch, history } = this.props;
    dispatch(SubTaskInfo(sub_task_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              sub_task_id: sub_task_id,
              edit_task_id: response.data[0].task_id,
              edit_sub_task_name: response.data[0].sub_task_name,
              edit_sub_task_description: response.data[0].sub_task_description,
            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditTask=(e)=>{
    this.setState({
      edit_task_id: e.target.value,
    });
  }

  onChangeEditSubTask=(e)=>{
    this.setState({
      edit_sub_task_name: e.target.value,
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
      dispatch(SubTaskUpdate(this.state.sub_task_id, this.state.edit_task_id, this.state.edit_sub_task_name, this.state.edit_sub_task_description))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(response.message, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListSubTaskFun();
              this.setState({ sub_task_id: 0, edit_task_id: 0, edit_sub_task_name: '', edit_sub_task_description: '' });
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
                      <h3 class="page-title">Sub Task</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item active">Sub Task</li>
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
                            <th>Task</th>
                            <th>Sub Task</th>
                            <th>Description</th>
                            <th className="text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.listSubTaskData && typeof this.state.listSubTaskData !=="undefined" & this.state.listSubTaskData.length > 0 && this.state.listSubTaskData.map((itemSubTaskList,l) => (
                          <tr>
                            <td>{l+1}</td>
                            <td>{itemSubTaskList.task_name}</td>
                            <td>{itemSubTaskList.sub_task_name}</td>
                            <td>{itemSubTaskList.sub_task_description}</td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" onClick={() => this.InfoSubTaskFun(itemSubTaskList.sub_task_id)}><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                  <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemSubTaskList.sub_task_id)}><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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
                        <h4 className="modal-title">Add Sub Task</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Task:</label>
                              <select className="form-control" placeholder="Task" id="task_id" name="task_id" value={this.state.task_id} onChange={this.onChangeTask} required >
                                  <option value="">Select Task</option>
                                  {this.state.listTaskData && typeof this.state.listTaskData !=="undefined" & this.state.listTaskData.length > 0 && this.state.listTaskData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.task_id}>{itemTaskList.task_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>Sub Task:</label>
                                <input type="text" className="form-control" placeholder="Sub Task" id="sub_task_name" name="sub_task_name" value={this.state.sub_task_name} onChange={this.onChangeSubTask} required />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>Sub Task Description:</label>
                                <textarea className="form-control" placeholder="Sub Task Description" id="sub_task_description" name="sub_task_description" value={this.state.sub_task_description} onChange={this.onChangeDescription} required></textarea>
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
                        <h4 className="modal-title">Info Sub Task</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>Task:</label>
                              <select className="form-control" placeholder="Task" id="edit_task_id" name="edit_task_id" value={this.state.edit_task_id} onChange={this.onChangeEditTask} required >
                                  <option value="">Select Task</option>
                                  {this.state.listTaskData && typeof this.state.listTaskData !=="undefined" & this.state.listTaskData.length > 0 && this.state.listTaskData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.task_id}>{itemTaskList.task_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>Sub Task:</label>
                                <input type="text" className="form-control" placeholder="Sub Task" id="edit_sub_task_name" name="edit_sub_task_name" value={this.state.edit_sub_task_name} onChange={this.onChangeEditSubTask} required />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>Sub Task Description:</label>
                                <textarea className="form-control" placeholder="Sub Task Description" id="edit_sub_task_description" name="edit_sub_task_description" value={this.state.edit_sub_task_description} onChange={this.onChangeEditDescription} required></textarea>
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
                      <h3>Delete Sub Task</h3>
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
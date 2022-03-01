import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';
import CheckboxTree from 'react-checkbox-tree';

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

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import avatarImg2 from './../../assets/img/profiles/avatar-02.jpg';

const nodes = [
    {
        value: 'task1',
        label: 'Task 1',
        icon: '',
        children: [
            {
                value: 'subtask1',
                label: 'Sub Task 1',
                icon: '',
            },
            {
                value: 'subtask2',
                label: 'Sub Task 2',
                icon: '',
            },
        ],
    },
    {
        value: 'task2',
        label: 'Task 2',
        icon: '',
        children: [
            {
                value: 'subtask21',
                label: 'Sub Task 1',
                icon: '',
            },
            {
                value: 'subtask22',
                label: 'Sub Task 2',
                icon: '',
            },
            {
                value: 'subtask23',
                label: 'Sub Task 3',
                icon: '',
            },
            {
                value: 'subtask24',
                label: 'Sub Task 4',
                icon: '',
            },
        ],
    },
    {
        value: 'task3',
        label: 'Task 3',
        icon: '',
        children: [
            {
                value: 'subtask31',
                label: 'Sub Task 1',
                icon: '',
            },
            {
                value: 'subtask32',
                label: 'Sub Task 2',
                icon: '',
            },
        ],
    },
    {
        value: 'task4',
        label: 'Task 4',
        icon: '',
        children: [
            {
                value: 'subtask41',
                label: 'Sub Task 1',
                icon: '',
            },
            {
                value: 'subtask42',
                label: 'Sub Task 2',
                icon: '',
            },
            {
                value: 'subtask43',
                label: 'Sub Task 3',
                icon: '',
            },
            {
                value: 'subtask44',
                label: 'Sub Task 4',
                icon: '',
            },
        ],
    },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	checked: [],
      expanded: [],
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    $(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
      } );
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
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="page-title">Ticket Add</h3>
                        <ul className="breadcrumb">
                          <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                          <li className="breadcrumb-item active">Ticket</li>
                        </ul>
                      </div>
                    </div>
                  </div>


<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Add Ticket</h4>
</div>
<div className="modal-body">


<form>
				<div className="row">

				<div className="col-md-6">
				<div className="form-group">
				<label>Client Name:</label>
				<select className="form-control">

				<option value="3">XYZ</option>
				<option value="4">ABC</option>


				</select>
				</div>
				</div>

				<div className="col-md-6">
				<div className="form-group">
				<label>Ticket Title:</label>
				<input type="text" className="form-control" />
				</div>
				</div>


				<div class="col-md-6">
				<div className="form-group">
				<label>Ticket Description:</label>
				{/*<input type="text" className="form-control" />*/}
				<textarea className="form-control" ></textarea>
				</div>
				</div>

				<div class="col-md-6">
				<div className="form-group">
				<label>Ticket Assign Team:</label>
				<select className="form-control">
				{/*<option value="">Select Team</option>*/}
				<option value="1" selected>Maintenance Team</option>
				{/*<option value="2">Support Team</option>
				<option value="3">Sales Team</option>
				<option value="4">Procurement Team</option>
				<option value="5">Operations Team</option>
				<option value="6">Installation Team</option>
				<option value="7">Other</option>*/}

				</select>
				</div>
				</div>
				<div class="col-md-6">
				<div className="form-group">
				<label>Ticket Priority:</label>
				<select className="form-control" >
				<option value="">Select Priority</option>
				<option value="">Low</option>
				<option value="">Medium</option>
				<option value="">High</option>

				</select>
				</div>
				</div>
				<div class="col-md-6">
				<div className="form-group">
				<label>Estimated Date:</label>
				<input type="date" className="form-control" />
				</div>
				</div>

				<div class="col-md-6">
				<div className="form-group">
				<label>Warranty:</label>
				<select className="form-control" >
				<option value="">Select Warranty</option>
				<option value="">Yes</option>
				<option value="">No</option>
				</select>
				</div>
				</div>

				<div class="col-md-6">
				<div className="form-group">
				<label>Upload File:</label>
				<input type="file" className="form-control" />
				</div>
				</div>

			

				</div>
					<div className="text-center">
				<button className="btn btn-primary btn-lg" type="button">Submit</button>
				</div>

</form>

</div>
</div>
</div>


<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Pending Update</h4>
</div>
<div className="modal-body">


             <form>    
             <div className="row">        				
             <div class="col-md-6">

                              <div className="form-group">
                                  <label>Assign To:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Assign To</option>
                                      <option value="">ABC</option>
                                      <option value="">XYZ</option>
                                      <option value="">PQR</option>
                                      <option value="">MNO</option>
                                  </select>
                              </div>
                              </div>

                              				<div class="col-md-6">

                              <div className="form-group">
                                  <label>Task:</label>
                                  <CheckboxTree
                                      iconsClass='fa4'
                                      showNodeIcon='false'
                                      checked={checked}
                                      expanded={expanded}
                                      nodes={nodes}
                                      onCheck={this.onCheck}
                                      onExpand={this.onExpand}
                                      icons={{
                                        check: <span className="rct-icon rct-icon-check" />,
                                        uncheck: <span className="rct-icon rct-icon-uncheck" />,
                                        halfCheck: <span className="rct-icon rct-icon-half-check" />,
                                        expandClose: <span className="rct-icon rct-icon-expand-close" />,
                                        expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                                        expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                        collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                        parentClose: <span className="rct-icon rct-icon-parent-close" />,
                                        parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                                        leaf: <span className="rct-icon rct-icon-leaf" />,
                                      }}
                                  />
                              </div>
                              </div>
                            
                              </div>
                                <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Submit</button>
                              </div>
                            </form>


</div>
</div>
</div>


 <div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Assign</h4>
</div>
<div className="modal-body">


              <form>
              <div className="row">
              <div class="col-md-6">
                                <div className="form-group">
                                    <h5>Material Cost:</h5>
                                </div>
                                </div>
                                      <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>Vendor</th>
                                         <th>Material</th>
                                        <th>Rate</th>
                                        <th>Quntity</th>
                                        <th>Cost</th>
                                        <th></th>
                                         <th></th>

                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                      <td className="assign-left">
                                     <select className="form-control select">
                                      <option value="">Select Vendor</option>
                                      <option value="">Vendor One</option>
                                      <option value="">Vendor Two</option>
                                  </select>
                                  </td>
                                      <td className="assign-left">
                                     <select className="form-control select">
                                      <option value="">Select Material</option>
                                      <option value="">Material One</option>
                                      <option value="">Material Two</option>
                                  </select>
                                  </td>
                                            <td className="assign-left">
                                                <input class="form-control"  type="text" />
                                            </td>
                                            <td className="assign-left">
                                                <input class="form-control" type="text" />
                                            </td>
                                            <td className="assign-left">
                                                <input class="form-control"   type="text" />
                                            </td>
                                        
                                             <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                                             <td>
                                                <a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
									<div class="table-responsive">
									<table class="table table-hover table-white">

									<tbody formArrayName="items">

									<tr>

									<td></td>
									<td></td>



									<td>
									<h5 className="assign-right"> Total </h5>
									</td>
									<td className="assign-left">
									<input class="form-control" type="text" />

									</td>
									<td className="si"></td>


									</tr>

									</tbody>
									</table>
									</div>
												<div class="table-responsive">
												<table class="table table-hover table-white">

												<tbody formArrayName="items">

												<tr>

												<td></td>
												<td></td>

												<td></td>


												<td>
												<h5 className="assign-right">Transportation Cost </h5>
												</td>
												<td className="assign-left">
												<input class="form-control" type="text" />

												</td>
												<td className="si"></td>


												</tr>

												</tbody>
												</table>
												</div>
								<div class="table-responsive">
								<table class="table table-hover table-white">

								<tbody formArrayName="items">

								<tr>

								<td></td>
								<td></td>

								<td></td>


								<td>
								<h5 className="assign-right"> Installation Cost </h5>
								</td>
								<td className="assign-left">
								<input class="form-control" type="text" />

								</td>
								<td className="si"></td>


								</tr>

								</tbody>
								</table>
								</div>

									<div class="table-responsive">
									<table class="table table-hover table-white">

									<tbody formArrayName="items">

									<tr>

									<td></td>
									<td></td>

									<td></td>


									<td>
									<h5 className="assign-right"> Taxes & Dues </h5>
									</td>
									<td className="assign-left">
									<input class="form-control" type="text" />

									</td>
									<td className="si"></td>


									</tr>

									</tbody>
									</table>
									</div>

										<div class="table-responsive">
										<table class="table table-hover table-white">

										<tbody formArrayName="items">

										<tr>

										<td></td>
										<td></td>

										<td></td>


										<td>
										<h5 className="assign-right">Grand Total</h5>
										</td>
										<td className="assign-left">
										<input class="form-control" type="text" />

										</td>
										<td className="si"></td>


										</tr>

										</tbody>
										</table>
										</div>

                    

                                <div class="col-md-6">
                              <div className="form-group">
                                  <label>Requirement Details:</label>
                                  <textarea className="form-control" ></textarea>
                              </div>
                              </div>

                              {/*<div className="form-group">
                                  <label>Change Status:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Status</option>
                                      <option value="">Assign</option>
                                      <option value="">Inprogress</option>
                                  </select>
                              </div>*/}
                              <div class="col-md-6">
                              <div className="form-group">
                                  <label>Note:</label>
                                  <input type="text" className="form-control" />
                              </div>
                              </div>
                              </div>
                              <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Submit</button>
                              </div>
                            </form>


</div>
</div>
</div>

 




       {/*<div className="card mb-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-view">
                            <div className="profile-img-wrap">
                              <div className="profile-img">
                                <a href="#"><img alt="" src={avatarImg2} /></a>
                              </div>
                            </div>
                            <div className="profile-basic">
                              <div className="row">


                                <div className="col-md-5">
                                  <div className="profile-info-left">
                                    <h3 className="user-name m-t-0 mb-0">Om Trader Pvt Ltd</h3>
                                    <h6 className="text-muted">+91 9876543210, om@sai.com</h6>
                                    <div className="staff-id">Ticket ID : #0001</div>
                                    <div className="small doj text-muted">Date of Ticket : 5-08-2021</div>
                                    <div>
                                      <div className="dropdown action-label">
                                        <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">
                                          <i className="fa fa-dot-circle-o text-danger"></i> Pending
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Pending</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger"></i> Assign</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-warning"></i> Inprogress</a>
                                          <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success"></i> Completed</a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="staff-msg"><a className="btn btn-custom" href="chat.html">Delete</a></div>
                                  </div>
                                </div>
                                <div className="col-md-7">
                                  <ul className="personal-info">
                                    <li>
                                      <div className="title">Ticket Title</div>
                                      <div className="text"><a href="">Ticket demo</a></div>
                                    </li>
                                      <li>
                                      <div className="title">Description</div>
                                      <div className="text"><a href="">Ticket Description</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Assign Team</div>
                                      <div className="text"><a href="">Maintance Team</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Ticket Priority</div>
                                      <div className="text"><a href="">High</a></div>
                                    </li>
                                    <li>
                                      <div className="title">Warranty</div>
                                      <div className="text"><a href="">Yes</a></div>
                                    </li>
                                    <li>
                                      <div className="title">File</div>
                                      <div className="text"><a href="">File.pdf</a></div>
                                    </li>
                                    
                                  </ul>
                                </div>
                              </div>
                            </div>
                      <div className="pro-edit"><a data-target="#proposal_order_confirmation" data-toggle="modal" className="edit-icon" href="#"> <i className="fa fa-pencil"></i></a></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>*/}
                
                </div>


                <div id="proposal_info" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Proposal</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Client <span className="text-danger">*</span></label>
                                    <select className="form-control select" >
                                      <option value="">Select Client</option>
                                      <option value="">ABC Info</option>
                                      <option value="" selected>Sai pvt ltd</option>
                                      <option value="">Om trader pvt ltd</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Vender <span className="text-danger">*</span></label>
                                    <select className="form-control select" >
                                      <option value="">Select Vender</option>
                                      <option value="" selected>Satish Vender</option>
                                      <option value="">Sameer tranders</option>
                                      <option value="">Shah Trande</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Lift <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Installation <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="150000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Taxes and Dues <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="30000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">  
                                  <div className="form-group">
                                    <label className="col-form-label">Sales Value <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value="70000"/>
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>


                <div id="proposal_lift_info" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Lift specifications</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="table-responsive m-t-15">
                                <table className="table table-striped custom-table">
                                  <thead>
                                    <tr>
                                      <th className="text-center">Selection</th>
                                      <th>Lift specifications</th>
                                      <th className="text-center">Input</th>
                                      <th className="text-center">Unit</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Rated Speed in m/sec</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Carrying Capacity in Kg</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Number of Stops</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Pit Size in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Shaft Size in WX D</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Guiderail Position</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Travel in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Headroom in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Cabin Size W X D</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>CAR Finish SS Hairline</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Door Size and Opening</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Door Type </td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Door finish</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Gold brass finish</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car wall Left Side</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car wall Back Side</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car wall Right Side</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Ceiling Standard</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Piston Dia in mm</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Car Push Button Finish </td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Landing Pushbutton Finish</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                    <tr>
                                      <td className="text-center">
                                        <input type="checkbox" />
                                      </td>
                                      <td>Hose Pipe. in mtr</td>
                                      <td><input type="text" className="form-control" /></td>
                                      <td><input type="text" className="form-control" /></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>

                <div id="proposal_order_confirmation" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-md">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Ticket Information</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                                                  <div className="form-group">
                                    <label>Client Name:</label>
                                    <select className="form-control">
                                    
                                        <option value="3">XYZ</option>
                                        <option value="4">ABC</option>
                                       

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Ticket Title:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Ticket Description:</label>
                                    {/*<input type="text" className="form-control" />*/}
                                    <textarea className="form-control" ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Ticket Assign Team:</label>
                                    <select className="form-control">
                                        {/*<option value="">Select Team</option>*/}
                                        <option value="1" selected>Maintenance Team</option>
                                        {/*<option value="2">Support Team</option>
                                        <option value="3">Sales Team</option>
                                        <option value="4">Procurement Team</option>
                                        <option value="5">Operations Team</option>
                                        <option value="6">Installation Team</option>
                                        <option value="7">Other</option>*/}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ticket Priority:</label>
                                    <select className="form-control" >
                                        <option value="">Select Priority</option>
                                        <option value="">Low</option>
                                        <option value="">Medium</option>
                                        <option value="">High</option>

                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label>Estimated Date:</label>
                                    <input type="date" className="form-control" />
                                </div>
                                
                                <div className="form-group">
                                    <label>Warranty:</label>
                                    <select className="form-control" >
                                        <option value="">Select Warranty</option>
                                        <option value="">Yes</option>
                                        <option value="">No</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Upload File:</label>
                                    <input type="file" className="form-control" />
                                </div>

                                <div className="m-t-20 text-center">
                                    <button className="btn btn-primary btn-lg" type="button">Update</button>
                                </div>
                            </form>
                        </div>
                      </div>
                  </div>
                </div>



                <div id="proposal_internal_order" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-md">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Pending Update</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                         <form>
                              <div className="form-group">
                                  <label>Assign To:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Assign To</option>
                                      <option value="">ABC</option>
                                      <option value="">XYZ</option>
                                      <option value="">PQR</option>
                                      <option value="">MNO</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label>Task:</label>
                                  <CheckboxTree
                                      iconsClass='fa4'
                                      showNodeIcon='false'
                                      checked={checked}
                                      expanded={expanded}
                                      nodes={nodes}
                                      onCheck={this.onCheck}
                                      onExpand={this.onExpand}
                                      icons={{
                                        check: <span className="rct-icon rct-icon-check" />,
                                        uncheck: <span className="rct-icon rct-icon-uncheck" />,
                                        halfCheck: <span className="rct-icon rct-icon-half-check" />,
                                        expandClose: <span className="rct-icon rct-icon-expand-close" />,
                                        expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                                        expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                        collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                        parentClose: <span className="rct-icon rct-icon-parent-close" />,
                                        parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                                        leaf: <span className="rct-icon rct-icon-leaf" />,
                                      }}
                                  />
                              </div>
                              <div className="form-group">
                                  <label>Change Status:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Status</option>
                                      <option value="">Pending</option>
                                      <option value="">Assign</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label>Note:</label>
                                  <input type="text" className="form-control" />
                              </div>
                              <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>

                      <div id="proposal_order_assign" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-md">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Assign Update</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                              <form>
                                <div className="form-group">
                                    <h5>Material Cost:</h5>
                                </div>
                                      <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>Vendor</th>
                                        <th>Rate</th>
                                        <th>Quntity</th>
                                        <th>Cost</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                        
                                        
                                            <td>
                                     <select className="form-control select">
                                      <option value="">Select Vendor</option>
                                      <option value="">Vendor One</option>
                                      <option value="">Vendor Two</option>
                                  </select>                                            </td>
                                            <td>
                                                <input class="form-control"  type="text" />
                                            </td>
                                            <td>
                                                <input class="form-control" type="text" />
                                            </td>
                                            <td>
                                                <input class="form-control"   type="text" />
                                            </td>
                                        
                                             <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                                             <td>
                                                <a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                         <div className="form-group">
                                    <label>Total:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                 <div className="form-group">
                                    <label>Transport Cost:</label>
                                    <input type="text" className="form-control" />
                                </div>
                       
                             
                       

                                 <div className="form-group">
                                    <label>Installation Cost:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                 <div className="form-group">
                                    <label>Taxes & Dues:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Grand Total:</label>
                                    <input type="text" className="form-control" />
                                </div>
                              <div className="form-group">
                                  <label>Requirement Details:</label>
                                  <textarea className="form-control" ></textarea>
                              </div>
                              {/*<div className="form-group">
                                  <label>Change Status:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Status</option>
                                      <option value="">Assign</option>
                                      <option value="">Inprogress</option>
                                  </select>
                              </div>*/}
                              <div className="form-group">
                                  <label>Note:</label>
                                  <input type="text" className="form-control" />
                              </div>
                              <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>

                       <div id="proposal_internal_inpro" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-md">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Inprogress Update</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                         <form>
                               <div className="form-group">
                                    <label>Lift Cost:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                 <div className="form-group">
                                    <label>Transport Cost:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                 <div className="form-group">
                                    <label>Installation Cost:</label>
                                    <input type="text" className="form-control" />
                                </div>
                              <div className="form-group">
                                  <label>Requirement Details:</label>
                                  <textarea className="form-control" ></textarea>
                              </div>
                               <div className="form-group">
                                  <label>Task:</label>
                                  <CheckboxTree
                                      iconsClass='fa4'
                                      showNodeIcon='false'
                                      checked={checked}
                                      expanded={expanded}
                                      nodes={nodes}
                                      onCheck={this.onCheck}
                                      onExpand={this.onExpand}
                                      icons={{
                                        check: <span className="rct-icon rct-icon-check" />,
                                        uncheck: <span className="rct-icon rct-icon-uncheck" />,
                                        halfCheck: <span className="rct-icon rct-icon-half-check" />,
                                        expandClose: <span className="rct-icon rct-icon-expand-close" />,
                                        expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                                        expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                        collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                        parentClose: <span className="rct-icon rct-icon-parent-close" />,
                                        parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                                        leaf: <span className="rct-icon rct-icon-leaf" />,
                                      }}
                                  />
                              </div>
                              <div className="form-group">
                                  <label>Change Status:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Status</option>
                                      <option value="">Inprogress</option>
                                      <option value="">Completed</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label>Note:</label>
                                  <input type="text" className="form-control" />
                              </div>
                              <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>




                <div id="proposal_installation" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Installation</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Stay <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Incidental expense <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="35000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Installation expense <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="45000" />
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                </div>


                <div id="proposal_site_inspection" className="modal custom-modal fade" role="dialog">
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h4 className="modal-title">Info Site Inspection</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Transport <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="75000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Cost of Stay <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="50000" />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <label className="col-form-label">Incidental expense <span className="text-danger">*</span></label>
                                    <input className="form-control" type="text" value="35000" />
                                  </div>
                                </div>
                              </div>


                              <div className="submit-section">
                                <button className="btn btn-primary submit-btn">Update</button>
                              </div>
                            </form>
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
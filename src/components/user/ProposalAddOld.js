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
                        <h3 className="page-title">Proposal Add</h3>
                        <ul className="breadcrumb">
                          <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                          <li className="breadcrumb-item active">Proposal</li>
                        </ul>
                      </div>
                    </div>
                  </div>


<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Add Proposal</h4>
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



        {/*<div class="col-md-6">
        <div className="form-group">
        <label>Ticket DateTime:</label>
        <input type="datetime-local" className="form-control" />
        </div>
        </div>
          <div class="col-md-6">
        <div className="form-group">
        <label>Estimated Implementation DateTime:</label>
        <input type="datetime-local" className="form-control" />
        </div>
        </div>*/}



        {/*<div class="col-md-6">
        <div className="form-group">
        <label>Ticket Assign Team:</label>
        <select className="form-control">
        {/*<option value="">Select Team</option>
        <option value="1" selected>Maintenance Team</option>
        <option value="2">Support Team</option>
        <option value="3">Sales Team</option>
        <option value="4">Procurement Team</option>
        <option value="5">Operations Team</option>
        <option value="6">Installation Team</option>
        <option value="7">Other</option>

        </select>
        </div>
        </div>
        */}
                
        <div class="col-md-6">
        <div className="form-group">
        <label>Location:</label>
        <input type="text" className="form-control" />
        </div>
        </div>



        <div class="col-md-6">
        <div className="form-group">
        <label>Proposal Status:</label>
        <select className="form-control" >
        <option value="">Select Status</option>
        <option value="">Proposal Enquiry</option>
        <option value="">Order Confrimation</option>
        <option value="">Internal Order</option>
        <option value="">Installation Team</option>
        <option value="">Site Inspection</option>

        </select>
        </div>
        </div>

      
        </div>
             {/* <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Submit</button>
                              </div>
                          */}

</form>

</div>
</div>
</div>





<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Lift Specifications</h4>
</div>
<div className="modal-body">


             <form>    
             <div className="row">                
                         
        

                        <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>Specifications</th>
                                         <th>Description </th>
                                        <th></th>
                                         <th></th>

                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                      <td className="assign-left">
                                     <select className="form-control select">
                                      <option value="">Number of Stops </option>
                                      <option value="">Carrying Capacity in Kg</option>
                                      <option value="">Rated Speed in m/sec</option>
                                      <option value="">Cabin Size W X D</option>

                                      <option value="">Door Type </option>

                                      <option value="">Door finish</option>

                                      <option value="">Car Push Button Finish </option>
                                      <option value="">Others</option>


                                  </select>
                                  </td>
                            
                                            <td className="">
                                  <textarea className="form-control" ></textarea>
                                            </td>
                                          
                                        
                                             <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>
                                              </td>
                                             <td>
                                                <a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                            
                              </div>

                            </form>


</div>
</div>
</div>








<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Proposal Timeline</h4>
</div>
<div className="modal-body">


<form>
        <div className="row">

        <div className="col-md-6">
        <div className="form-group">
        <label>Start Date:</label>
        <input type="date" className="form-control" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>End Date:</label>
        <input type="date" className="form-control" />
        </div>
        </div>

      
        </div>
             {/* <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Submit</button>
                              </div>
                          */}

</form>

</div>
</div>
</div>




{/*<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Maintenance Requirements</h4>
</div>
<div className="modal-body">


             <form>    
             <div className="row">                
                         
        

                        <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>Requirements</th>
                                         <th>Description </th>
                                        <th></th>
                                         <th></th>

                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                      <td className="assign-left">
                                     <select className="form-control select">
                                      <option value="">Electrical</option>
                                      <option value="">Mechanical</option>
                                      <option value="">Wheel</option>
                                      <option value="">Door</option>

                                      <option value="">Motor</option>

                                      <option value="">Cabin</option>

                                      <option value="">Civil</option>
                                      <option value="">Others</option>


                                  </select>
                                  </td>
                            
                                            <td className="">
                                  <textarea className="form-control" ></textarea>
                                            </td>
                                          
                                        
                                             <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>
                                              </td>
                                             <td>
                                                <a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                            
                              </div>

                            </form>


</div>
</div>
</div>*/}






<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Team Assign</h4>
</div>
<div className="modal-body">


             <form>    
             <div className="row">                
                         
        {/* <div class="col-md-6">

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
                              </div> */}

                                                <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>Assign Team</th>
                                         <th>Staff </th>
                                        <th>Reporting To</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th></th>
                                         <th></th>

                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                      <td className="assign-left">
                                     <select className="form-control select">
                                      <option value="">Select Team</option>
                                      <option value="">Team One</option>
                                      <option value="">Team Two</option>
                                  </select>
                                  </td>
                                      <td className="assign-left">
                                     <select className="form-control select">
                                      <option value="">Select Staff</option>
                                      <option value="">Staff One</option>
                                      <option value="">Staff Two</option>
                                  </select>
                                  </td>
                                            <td className="assign-left">
                                 <select className="form-control select">
                                      <option value="">Select Reporting To</option>
                                      <option value="">Reporting One</option>
                                      <option value="">Reporting Two</option>
                                  </select>                                            
                                  </td>
                                            <td className="assign-left">
                                                <input class="form-control" type="date" />
                                            </td>
                                            <td className="assign-left">
                                                <input class="form-control"   type="date" />
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
                            
                              </div>

                               {/* <div className="m-t-20 text-center">
                                  <button className="btn btn-primary btn-lg" type="button">Submit</button>
                              </div>
                          */}
                            </form>


</div>
</div>
</div>




<div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Documents</h4>
</div>
<div className="modal-body">


             <form>    
             <div className="row">                
                         
        

                        <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>File</th>
                                         <th>Description</th>
                                        
                                        <th></th>
                                         <th></th>

                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                      <td className="assign-left">
                                           <input type="file" className="form-control" />
                                      </td>
                            
                                            <td className="">
                                  <textarea className="form-control" ></textarea>
                                            </td>
                                          
                                        
                                             <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>
                                              </td>
                                             <td>
                                                <a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                            
                      </div>

                   {/* <div className="m-t-20 text-center">
                      <button className="btn btn-primary btn-lg" type="button">Submit</button>
                  </div>
              */}
                </form>


</div>
</div>
</div>





 <div className="card-body">

<div className="modal-content">
<div className="modal-header">
<h4 className="modal-title">Proposal Description</h4>
</div>
<div className="modal-body">


              <form>
              <div className="row">
              <div class="col-md-6">
                                <div className="form-group">
                                    <h5>Lift Cost:</h5>
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

                  <td className="assign-left"></td>
                  <td className="assign-left"></td>
                                    <td className="assign-left"></td>



                  <td>
                  <h5 className="assign-right">Lift Cost</h5>
                  </td>
                  <td className="assign-left">
                  <input class="form-control" type="text" />

                  </td>
                                    <td className="si"></td>


                  </tr>

                  </tbody>
                  </table>
                  </div>
                  <hr/>
                  <hr/>
                  <hr/>
                  <hr/>


                  {/*<div class="col-md-6">
                    <div className="form-group">
                      <h5>Lift Cost: </h5> </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover table-white">
                        <thead>
                          <tr>
                            <th>Description</th>
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
                              <input class="form-control" type="text" /> </td>
                            <td className="assign-left">
                              <input class="form-control" type="text" /> </td>
                            <td className="assign-left">
                              <input class="form-control" type="text" /> </td>
                            <td className="assign-left">
                              <input class="form-control" type="text" /> </td>
                            <td><a class="text-success font-18" title="Add"><i
                                                          class="fa fa-plus"></i></a></td>
                            <td>
                              <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    <div class="table-responsive">
                    <table class="table table-hover table-white">

                    <tbody formArrayName="items">

                    <tr>

                    <td className="assign-left"></td>
                    <td className="assign-left"></td>

                    <td className="assign-left"></td>

                    <td>
                    <h5 className="assign-right">Total Lift Cost </h5>
                    </td>
                    <td className="assign-left">
                    <input class="form-control" type="text" />

                    </td>
                      <td>
                       </td>
                       <td>
                      </td>
                    </tr>

                    </tbody>
                    </table>
                    </div>*/}




                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Transport Cost:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Transport Cost </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>



                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Installation Cost:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Installation Cost </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>




                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Taxes and Dues:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Taxes and Dues </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>




                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Sales Value:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Sales Value </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>



                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Order value:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Order value </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>





















                  <div class="col-md-6">
                    <div className="form-group">
                      <h5>Lift Componenet Cost:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Lift Componenet Cost </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>









                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Procurement Cost:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>




                        <div class="table-responsive">
                        <table class="table table-hover table-white">

                        <tbody formArrayName="items">

                        <tr>

                        <td className="assign-left"></td>
                        <td className="assign-left"></td>

                        <td className="assign-left"></td>


                        <td>
                        <h5 className="assign-right">Total Procurement Cost </h5>
                        </td>
                        <td className="assign-left">
                        <input class="form-control" type="text" />

                        </td>
                                                <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                        </tr>

                        </tbody>
                        </table>
                        </div>








                        <div class="col-md-6">
                    <div className="form-group">
                      <h5>Stay Cost:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  <div class="table-responsive">
                  <table class="table table-hover table-white">

                  <tbody formArrayName="items">

                  <tr>

                  <td className="assign-left"></td>
                  <td className="assign-left"></td>

                  <td className="assign-left"></td>


                  <td>
                  <h5 className="assign-right">Total Stay Cost </h5>
                  </td>
                  <td className="assign-left">
                  <input class="form-control" type="text" />

                  </td>
                                         <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                  </tr>

                  </tbody>
                  </table>
                  </div>







                      <div class="col-md-6">
                    <div className="form-group">
                      <h5>Incidental Expense:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  <div class="table-responsive">
                  <table class="table table-hover table-white">

                  <tbody formArrayName="items">

                  <tr>

                  <td className="assign-left"></td>
                  <td className="assign-left"></td>

                  <td className="assign-left"></td>


                  <td>
                  <h5 className="assign-right">Total Incidental Expense </h5>
                  </td>
                  <td className="assign-left">
                  <input class="form-control" type="text" />

                  </td>
                                         <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
                                            </td>

                  </tr>

                  </tbody>
                  </table>
                  </div>








                    <div class="col-md-6">
                    <div className="form-group">
                      <h5>Installation Expense Cost:</h5> </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover table-white">
                      <thead>
                        <tr>
                          <th>Description</th>
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
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td className="assign-left">
                            <input class="form-control" type="text" /> </td>
                          <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a></td>
                          <td>
                            <a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o"></i> </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  <div class="table-responsive">
                  <table class="table table-hover table-white">

                  <tbody formArrayName="items">

                  <tr>

                  <td className="assign-left"></td>
                  <td className="assign-left"></td>

                  <td className="assign-left"></td>


                  <td>
                  <h5 className="assign-right">Total Installation Expense Cost </h5>
                  </td>
                  <td className="assign-left">
                  <input class="form-control" type="text" />

                  </td>
                                         <td>{/*<a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>*/}
                                                 </td>
                                             <td>
                                                {/*<a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>*/}
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

                    <td></td>


                    <td>
                    <h5 className="assign-right">Total Proposal Cost</h5>
                    </td>
                    <td className="assign-left">
                    <input class="form-control" type="text" />

                    </td>
                    <td className="si"></td>


                    </tr>

                    </tbody>
                    </table>
                    </div>

                    {/*<div class="col-md-6">
                    <div className="form-group">
                      <h5>Upload Files:</h5> </div>
                  </div>


                         <div class="table-responsive">
                            <table class="table table-hover table-white">
                                <thead>
                                    <tr>
                                         <th>File</th>
                                         <th>Description</th>
                                        
                                        <th></th>
                                         <th></th>

                                    </tr>
                                </thead>
                                <tbody formArrayName="items">

                                    <tr>
                                      <td className="assign-left">
                                           <input type="file" className="form-control" />
                                      </td>
                            
                                            <td className="">
                                  <textarea className="form-control" ></textarea>
                                            </td>
                                          
                                        
                                             <td><a class="text-success font-18" title="Add"><i
                                                        class="fa fa-plus"></i></a>
                                              </td>
                                             <td>
                                                <a class="text-danger font-18" title="Remove">
                                                    <i class="fa fa-trash-o"></i>
                                                </a>
                                            </td>
                                        
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>*/}

                                {/* <div class="col-md-6">
                              <div className="form-group">
                                  <label>Requirement Details:</label>
                                  <textarea className="form-control" ></textarea>
                              </div>
                              </div>

                             <div className="form-group">
                                  <label>Change Status:</label>
                                  <select className="form-control select" >
                                      <option value="">Select Status</option>
                                      <option value="">Assign</option>
                                      <option value="">Inprogress</option>
                                  </select>
                              </div>*/}
                              <div class="col-md-12">
                              <div className="form-group">
                                  <label>Note or Remark:</label>
                                  <textarea className="form-control" ></textarea>

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
import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';

import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "./../utils";


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import jQuery from 'jquery';
import Popper from 'popper.js';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

/*const columnNames = ["Pending", "Inprogress", "Completed", "Review", "On Hold"];*/
const columnNames = ["Pending", "Assign", "Inprogress", "Completed"];

//const classListArry = ["pending_list", "inprogress_list", "completed_list", "review_list", "onhold_list"];
const classListArry = ["pending_list", "pending_list", "inprogress_list", "completed_list", "onhold_list"];

//const classHeaderArry = ["pending_header", "inprogress_header", "completed_header", "review_header", "onhold_header"];
const classHeaderArry = ["pending_header", "pending_header", "inprogress_header", "completed_header", "onhold_header"];

//const classProgressBarArry = ["pending_progress_bar", "inprogress_progress_bar", "completed_progress_bar", "review_progress_bar", "onhold_progress_bar"];
const classProgressBarArry = ["pending_progress_bar", "pending_progress_bar", "inprogress_progress_bar", "completed_progress_bar", "onhold_progress_bar"];

const classProgressPercentageArry = ["0", "30", "60", "100", "60"];

const dataArry = ["light not working", "Inprogress", "Completed", "Review", "On Hold"];

const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki"
];

const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: "container",
        props: {
          orientation: "horizontal"
        },
        children: generateItems(4, i => ({
          id: `column${i}`,
          type: "container",
          name: columnNames[i],
          class_list: classListArry[i],
          class_header: classHeaderArry[i],
          class_progress_bar: classProgressBarArry[i],
          class_progress_percentage: classProgressPercentageArry[i],
          props: {
            orientation: "vertical",
            className: "card-container"
          },
          children: generateItems(2, j => ({
            type: "draggable",
            id: `${i}${j}`,
            props: {
              className: "card",
              //style: { backgroundColor: pickColor() }
            },
            //data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
            data: dataArry[0]
          }))
        }))
      }
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter(p => p.id === columnId)[0].children[
      index
    ];
  }

  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        scene
      });
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
                
                    <div className="page-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="page-title">Tickets</h3>
                          <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li className="breadcrumb-item active">Tickets</li>
                          </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                          <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_task_board"><i className="fa fa-plus"></i> Add Ticket</a>
                          <div className="view-icons">
                            <a href="#" className="grid-view btn btn-link"><i className="fa fa-th"></i></a>
                            <NavLink to={"/tickets/list"} className="list-view btn btn-link active"><i className="fa fa-bars"></i></NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row board-view-header">
                        <div className="col-4">
                        </div>

                        {/*<div className="col-8 text-right">*/}
                            {/*<a href="#" className="btn btn-white float-right ml-2" data-toggle="modal" data-target="#add_task_board"><i className="fa fa-plus"></i> Create Ticket</a>*/}
                            {/*<a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_task_board"><i className="fa fa-plus"></i> Add Ticket</a>*/}


                            {/*<div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_task_board"><i className="fa fa-plus"></i> Add Ticket</a>
                            </div>*/}

                            {/*<a href="project-view.html" className="btn btn-white float-right" title="View Board"><i className="fa fa-link"></i> </a>*/}
                        {/*</div>*/}

                        <div className="col-12">
                            <div className="pro-progress">
                                <div className="pro-progress-bar">
                                    <h4>Progress</h4>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: "20%"}}></div>
                                    </div>
                                    <span>20%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="row">
                    <div class="kanban-board card mb-0">
                    <div class="card-body">
                      <div class="kanban-cont">
                        <div className="card-scene">
                            <Container
                              orientation="horizontal"
                              onDrop={this.onColumnDrop}
                              dragHandleSelector=".column-drag-handle"
                              dropPlaceholder={{
                                animationDuration: 150,
                                showOnTop: true,
                                className: 'cards-drop-preview '
                              }}
                            >
                              {this.state.scene.children.map(column => {
                                return (
                                  <Draggable key={column.id} >
                                    <div className={column.props.className}>
                                      <div className={"kanban-list "+column.class_list}>
                                        <div className={"kanban-header "+column.class_header}>
                                          <span className="status-title">{column.name}</span>
                                          <div className="dropdown kanban-action">
                                            <a href="" data-toggle="dropdown">
                                              <i className="fa fa-ellipsis-v"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_task_board">Edit</a>
                                              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_ticket">Delete</a>
                                            </div>
                                          </div>
                                        </div>
                                      
                                        {/*<span className="column-drag-handle">&#x2630;</span>
                                        {column.name}*/}
                                      
                                      <Container
                                        {...column.props}
                                        groupName="col"
                                        onDragStart={e => console.log("drag started", e)}
                                        onDragEnd={e => console.log("drag end", e)}
                                        onDrop={e => this.onCardDrop(column.id, e)}
                                        getChildPayload={index =>
                                          this.getCardPayload(column.id, index)
                                        }
                                        dragClassName="card-ghost"
                                        dropClassName="card-ghost-drop"
                                        onDragEnter={() => {
                                          console.log("drag enter:", column.id);
                                        }}
                                        onDragLeave={() => {
                                          console.log("drag leave:", column.id);
                                        }}
                                        onDropReady={p => console.log('Drop ready: ', p)}
                                        dropPlaceholder={{                      
                                          animationDuration: 150,
                                          showOnTop: true,
                                          className: 'drop-preview' 
                                        }}
                                        dropPlaceholderAnimationDuration={200}
                                      >
                                        {column.children.map(card => {
                                          return (
                                            <Draggable key={card.id}>
                                              {/*<div {...card.props}>
                                                <p>#1</p>
                                                <p>{card.data}</p>
                                                <p>Low</p>
                                              </div>*/}

                                            <div class="kanban-wrap ui-sortable">
                                              <div className="card panel" {...card.props}>
                                                 <div class="kanban-box ui-sortable-handle">
                                                <div className="kanban-box">
                                                  <div className="task-board-header">
                                                    <span className="status-title"><a href="task-view.html">Lift Not Working</a></span>

                                                    <div className="dropdown kanban-task-action">
                                                      <a href="" data-toggle="dropdown">
                                                        <i className="fa fa-angle-down"></i>
                                                      </a>
                                                      <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_task_modal">Edit</a>
                                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_ticket">Delete</a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="task-board-body">
                                                    <p><i class="fa fa-user-circle" aria-hidden="true"></i> Om trader pvt ltd</p>
                                                    {/*<p><i class="fa fa-user-plus" aria-hidden="true"></i> Installation team</p>*/}

                                                    <div className="kanban-info kanban-info-flex">
                                                      <div className="progress progress-xs">
                                                        <div className={"progress-bar "+column.class_progress_bar} role="progressbar" style={{width: column.class_progress_percentage+"%"}} aria-valuenow={column.class_progress_percentage} aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                      <span>{column.class_progress_percentage}%</span>
                                                    </div>

                       

                                                    <div className="kanban-footer kanban-footer-assign">
                                                      <span className="task-info-cont">
                                                        <span className="task-date"><i className="fa fa-clock-o"></i> 5 Aug 2021</span>
                                                        <span className="task-priority badge bg-inverse-danger">High</span>
                                                      </span>
                                                      <span className="task-users">
                                                        <span className="task-date"><i className="fa fa-clock-o"></i> 10 Aug 2021</span>
                                                        <i class="fa fa-user-plus" aria-hidden="true"></i> Installation team
                                                        {/*<img src="assets/img/profiles/avatar-12.jpg" className="task-avatar" width="24" height="24" alt="" />*/}
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                </div>
                                              </div>
                                              </div>



                                            </Draggable>
                                          );
                                        })}
                                      </Container>
                                      </div>
                                    </div>
                                  </Draggable>
                                );
                              })}
                            </Container>
                          </div>
                    </div>
                    </div>
                    </div>
                    
                </div>
                </div>

            </div>




            <div id="add_task_board" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Ticket</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Client:</label>
                                    <select className="form-control" >
                                        <option value="">Select Client</option>
                                        <option value="">ABC Info</option>
                                        <option value="">Sai pvt ltd</option>
                                        <option value="">Om trader pvt ltd</option>
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
                                        <option value="4">Procurement team</option>
                                        <option value="5">Operations team</option>
                                        <option value="6">Installation team</option>
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
                                    <button className="btn btn-primary btn-lg" type="button">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal custom-modal fade" id="delete_ticket" role="dialog">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Delete Ticket</h3>
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a href="javascript:void(0);" className="btn btn-primary continue-btn">Delete</a>
                        </div>
                        <div className="col-6">
                          <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
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
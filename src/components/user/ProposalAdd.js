  import React, { Component } from "react";
  import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

  import Form from "react-validation/build/form";
  import CheckButton from "react-validation/build/button";

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

  import { TicketAdd, TicketAddInspection, TicketAddTeam, TicketAddSupportingDoc, TicketAddMaintenance } from "./../../actions/adminTicket";
  import { ClientList, ClientInfo } from "./../../actions/adminClient";
  import { VendorList, VendorItemsList } from "./../../actions/adminVendor";
  import { TeamList, ListTeamUsers } from "./../../actions/adminTeam";


  import Header from './Header';
  import SideBar from './SideBar';
  import Footer from './Footer';


  import avatarImg2 from './../../assets/img/profiles/avatar-02.jpg';

  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  toast.configure();



  class Dashboard extends Component {
    constructor(props) {
      super(props);

      this.ListClientFun = this.ListClientFun.bind(this);
      this.ListVendorFun = this.ListVendorFun.bind(this);
      this.ListTeamFun = this.ListTeamFun.bind(this);
      this.handleAddTicket = this.handleAddTicket.bind(this);
      this.handleAddTeamData = this.handleAddTeamData.bind(this);
      this.handleAddInspection = this.handleAddInspection.bind(this);
      this.handleAddMaintenanceData = this.handleAddMaintenanceData.bind(this);
      this.handleAddSupportingDocData = this.handleAddSupportingDocData.bind(this);

      this.OnchangeDefTransportationQuantity = this.OnchangeDefTransportationQuantity.bind(this);

      
      this.state = {
        checked: [],
        expanded: [],

        maintenanceMoreAddData: [],
        siteInspectionMoreAddData: [],
        teamMoreAddData:[],
        materialMoreAddData:[],
        transportationMoreAddData: [],
        installationMoreAddData: [],
        taxesDuesMoreAddData: [],
        drawingConfirmationMoreAddData: [],
        uploadFileMoreAddData: [],

        listClientData: [],
        listVendorData: [],
        listTeamData: [],


        other_show:false,

        client_id : '',
        ticket_desc : '',
        priority : '',
        estimated_date : '',
        warranty : '',
        ticket_datetime : '',
        location : '',
        maintenance_requirement : '',
        maintenance_desc : '',
        inspection : '',
        inspection_desc : '',
        team_id : '',
        staff_id : '',
        reporting_to : '',
        from_date : '',
        to_date : '',
        vendor_id : '',
        vendor_item_id : '',
        material_rate : '',
        material_quantity : '',
        material_cost_form : '',
        transport_desc : '',
        transport_rate : '',
        transport_quantity : '',
        transport_cost : '',
        install_desc : '',
        install_rate : '',
        install_quantity : '',
        install_cost : '',
        tax_due_desc : '',
        tax_due_rate : '',
        tax_due_quantity : '',
        tax_due_cost : '',
        draw_date : '',
        draw_description : '',
        version : '',
        draw_doc_file : '',
        doc_file_desc : '',
        doc_file : '',
        note:"",
        total_material_cost:'',
        total_transportation_cost:'',
        total_installation_cost:'',
        total_tax_dues_cost:'',
        total_maintenance_cost:'',
        warranty_desc:'',
        ticket_id:0,
        deftransportationQuantity:0,
        deftransportationCost:0,
        deftransportationRate:0,
        listVendorItemData:[],
        listUserData:[],
        defreporting_to:'',


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

      this.ListClientFun();
      this.ListVendorFun();
      this.ListTeamFun();
    }

    ListClientFun=()=>{

      const { dispatch, history } = this.props;
      dispatch(ClientList())
      .then((response) => {
        this.setState({
          listClientData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listClientData: []
        });
      });
    }

    InfoClientFun=(client_id)=>{

      const { dispatch, history } = this.props;
      dispatch(ClientInfo(client_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
          this.setState({
            location: response.data[0].location,
          });
        }
      })
      .catch((error) => {
      });
    }

    VendorItemsInfo=(vendor_id)=>{
      console.log(vendor_id);

      const { dispatch, history } = this.props;
      dispatch(VendorItemsList(vendor_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
          this.setState({
            listVendorItemData: response.data
          });
        }
      })
      .catch((error) => {
      });
    }
    
    ListTeamUsers=(team_id)=>{
      console.log(team_id);

      const { dispatch, history } = this.props;
      dispatch( ListTeamUsers(team_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
        	console.log("if");
          this.setState({
            listUserData: response.data
          });
          return response.data;
        }else{
        	console.log("else");

        	return [];	
        }
      })
      .catch((error) => {
      	return [];
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

    ListTeamFun=()=>{

      const { dispatch, history } = this.props;
      dispatch(TeamList())
      .then((response) => {
        this.setState({
          listTeamData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listTeamData: []
        });
      });
    }

     CalculateCost=()=>{

        var sum_mt_cost = 0;
        $('.material_cost').each(function(index, element){
          if($(this).val()!="")
            sum_mt_cost = sum_mt_cost + parseFloat($(this).val());
        });

        var sum_tr_cost = 0;
        $('.transport_cost').each(function(index, element){
          if($(this).val()!="")
            sum_tr_cost = sum_tr_cost + parseFloat($(this).val());
        });

        var sum_ins_cost = 0;
        $('.install_cost').each(function(index, element){
          if($(this).val()!="")
            sum_ins_cost = sum_ins_cost + parseFloat($(this).val());
        });

        var sum_tx_cost = 0;
        $('.tax_due_cost').each(function(index, element){
          if($(this).val()!="")
            sum_tx_cost = sum_tx_cost + parseFloat($(this).val());
        });

        this.setState({ total_material_cost:sum_mt_cost,
                        total_transportation_cost:sum_tr_cost,
                        total_installation_cost:sum_ins_cost,
                        total_taxes_dues_cost:sum_tx_cost,
                      });

      // var total_cost= parseFloat(this.state.total_material_cost)+parseFloat(this.state.total_transportation_cost)
      //                 +parseFloat(this.state.total_installation_cost)+parseFloat(this.state.total_taxes_dues_cost)    
      
      var total_cost= sum_mt_cost+sum_tr_cost+sum_ins_cost+sum_tx_cost;
      this.setState({total_maintenance_cost:total_cost});
      $("#submit_cost").css('display','inline-block');
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


    handleMaintenanceRequirementsChange=(e, midx)=>{
      var array = this.state.maintenanceMoreAddData.slice();
      array[midx].maintenance_requirement = e.target.value;
      this.setState({ maintenanceMoreAddData: array });
    }

    handleMaintenanceDescriptionChange=(e, midx)=>{
      var array = this.state.maintenanceMoreAddData.slice();
      array[midx].maintenance_desc = e.target.value;
      this.setState({ maintenanceMoreAddData: array });
    }


    handleAddSiteInspection=()=>{
      var array = this.state.siteInspectionMoreAddData;
      array.push({ midx: array.length + 1 });
      this.setState({ siteInspectionMoreAddData: array });
    }


    handleRemoveSiteInspection=(sidx)=>{
      var array = this.state.siteInspectionMoreAddData;
      array.splice(sidx, 1);
      this.setState({ siteInspectionMoreAddData: array });
    }


    handleSiteInspectionInspectionChange=(e, sidx)=>{
      var array = this.state.siteInspectionMoreAddData.slice();
      array[sidx].siteInspectionInspection = e.target.value;
      this.setState({ siteInspectionMoreAddData: array });
    }

    handleSiteInspectionDescriptionChange=(e, sidx)=>{
      var array = this.state.siteInspectionMoreAddData.slice();
      array[sidx].siteInspectionDescription = e.target.value;
      this.setState({ siteInspectionMoreAddData: array });
    }



  //Team
  handleAddTeam=()=>{
    var array = this.state.teamMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ teamMoreAddData: array });
  }
  handleRemoveTeam=(tmidx)=>{
    var array = this.state.teamMoreAddData;
    array.splice(tmidx, 1);
    this.setState({ teamMoreAddData: array });
  }
  handleTeamIdChange=(e, tmidx)=>{
    var array = this.state.teamMoreAddData.slice();
    array[tmidx].team_id = e.target.value;
    this.setState({ teamMoreAddData: array });
  }
  handleTeamStaffIdChange=(e, tmidx)=>{
    var array = this.state.teamMoreAddData.slice();
    array[tmidx].staff_id = e.target.value;
    this.setState({ teamMoreAddData: array });
  }
  handleTeamReportingToChange=(e, tmidx)=>{
    var array = this.state.teamMoreAddData.slice();
    array[tmidx].reporting_to = e.target.value;
    this.setState({ teamMoreAddData: array });
  }
  handleTeamFromDateChange=(e, tmidx)=>{
    var array = this.state.teamMoreAddData.slice();
    array[tmidx].from_date = e.target.value;
    this.setState({ teamMoreAddData: array });
  }
  handleTeamToDateChange=(e, tmidx)=>{
    var array = this.state.teamMoreAddData.slice();
    array[tmidx].to_date = e.target.value;
    this.setState({ teamMoreAddData: array });
  }
  

  //Material
  handleAddMaterial=()=>{
  var array = this.state.materialMoreAddData;
  array.push({ midx: array.length + 1 });
  this.setState({ materialMoreAddData: array });
  }
  handleRemoveMaterial=(vmidx)=>{
  var array = this.state.materialMoreAddData;
  array.splice(vmidx, 1);
  this.setState({ mterialMoreAddData: array });
  }
  handleMaterialIdChange=(e, vmidx)=>{
  var array = this.state.materialMoreAddData.slice();
  array[vmidx].material_id = e.target.value;
  this.setState({ materialMoreAddData: array });
  }
  handleMaterialStaffIdChange=(e, vmidx)=>{
  var array = this.state.materialMoreAddData.slice();
  array[vmidx].staff_id = e.target.value;
  this.setState({ materialMoreAddData: array });
  }
  handleMaterialReportingToChange=(e, vmidx)=>{
  var array = this.state.materialMoreAddData.slice();
  array[vmidx].reporting_to = e.target.value;
  this.setState({ materialMoreAddData: array });
  }
  handleMaterialFromDateChange=(e, vmidx)=>{
  var array = this.state.materialMoreAddData.slice();
  array[vmidx].from_date = e.target.value;
  this.setState({ materialMoreAddData: array });
  }
  handleMaterialToDateChange=(e, vmidx)=>{
  var array = this.state.materialMoreAddData.slice();
  array[vmidx].to_date = e.target.value;
  this.setState({ materialMoreAddData: array });
  }



  //Transportation
  handleAddTransportation=()=>{
    var array = this.state.transportationMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ transportationMoreAddData: array });
  }


  handleRemoveTransportation=(tidx)=>{
    var array = this.state.transportationMoreAddData;
    array.splice(tidx, 1);
    this.setState({ transportationMoreAddData: array });
  }


  handleTransportationDescriptionChange=(e, tidx)=>{
    var array = this.state.transportationMoreAddData.slice();
    array[tidx].transportationDescription = e.target.value;
    this.setState({ transportationMoreAddData: array });
  }

  handleTransportationRateChange=(e, tidx)=>{
    var array = this.state.transportationMoreAddData.slice();
    array[tidx].transportationRate = e.target.value;

     var sum1=0;

    var rate1 = $("#deftransportationRate").val();
    var quntity1 = $("#deftransportationQuantity").val();
    sum1 = parseFloat(rate1) * parseFloat(quntity1);

    var rate = $("#transportationRate"+tidx).val();
    var quntity = $("#transportationQuntity"+tidx).val();
    var sum = parseFloat(rate) * parseFloat(quntity);
    array[tidx].transportationCost = sum;

    this.setState({ transportationMoreAddData: array});

    var sum_cost = 0;
    $('.transportationCost').each(function(index, element){

      if($(this).val()!="")
        sum_cost = sum_cost + parseFloat($(this).val());

    });

    // this.setState({ total_transportation_cost: sum_cost});
    this.setState({ transportationMoreAddData: array });
      $("#submit_cost").css('display','none');

  }

  handleTransportationQuntityChange=(e, tidx)=>{
    var array = this.state.transportationMoreAddData.slice();

    array[tidx].transportationQuntity = e.target.value;
    var sum1=0;

    var rate1 = $("#deftransportationRate").val();
    var quntity1 = $("#deftransportationQuantity").val();
    sum1 = parseFloat(rate1) * parseFloat(quntity1);

    var rate = $("#transportationRate"+tidx).val();
    var quntity = $("#transportationQuntity"+tidx).val();
    var sum = parseFloat(rate) * parseFloat(quntity);
    array[tidx].transportationCost = sum;

    this.setState({ transportationMoreAddData: array});

    var sum_cost = 0;
    $('.transportationCost').each(function(index, element){

      if($(this).val()!="")
        sum_cost = sum_cost + parseFloat($(this).val());

    });

    // this.setState({ total_transportation_cost: sum_cost});
      $("#submit_cost").css('display','none');


  }

  handleTransportationCostChange=(e, tidx)=>{
    var array = this.state.transportationMoreAddData.slice();
    array[tidx].transportationCost = e.target.value;
    this.setState({ transportationMoreAddData: array });
  }

  OnchangeDefTransportationQuantity=(e)=>{

    var rate = $("#deftransportationRate").val();
    var quntity =  e.target.value;
    var sum = parseFloat(rate) * parseFloat(quntity);
  
    this.setState({ deftransportationCost: sum});

    var sum_cost = 0;
    $('.transportationCost').each(function(index, element){
      if($(element).val()!="")
      {
        sum_cost += parseFloat($(element).val());
      }
    });
    this.setState({ deftransportationQuantity : e.target.value, deftransportationCost: sum });
      $("#submit_cost").css('display','none');
    
  }

  OnchangeDefTransportationRate=(e)=>{

    var quntity = $("#deftransportationQuantity").val();
    var rate =  e.target.value;
    var sum = parseFloat(rate) * parseFloat(quntity);
  
    this.setState({ deftransportationCost: sum});

    var sum_cost = 0;
    $('.transportationCost').each(function(index, element){
      if($(element).val()!="")
      {
        sum_cost += parseFloat($(element).val());
        console.log("parseFloat Cost Rate "+index+"  "+parseFloat($(element).val()));
      }
    });
    this.setState({ deftransportationRate : e.target.value, deftransportationCost: sum });
      $("#submit_cost").css('display','none');

  }


  //Installation
  handleAddInstallation=()=>{
    var array = this.state.installationMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ installationMoreAddData: array });
  }


  handleRemoveInstallation=(iidx)=>{
    var array = this.state.installationMoreAddData;
    array.splice(iidx, 1);
    this.setState({ installationMoreAddData: array });
  }


  handleInstallationDescriptionChange=(e, iidx)=>{
    var array = this.state.installationMoreAddData.slice();
    array[iidx].installationDescription = e.target.value;
    this.setState({ installationMoreAddData: array });
  }

  handleInstallationRateChange=(e, iidx)=>{
    var array = this.state.installationMoreAddData.slice();
    array[iidx].installationRate = e.target.value;
    this.setState({ installationMoreAddData: array });
  }

  handleInstallationQuntityChange=(e, iidx)=>{
    var array = this.state.installationMoreAddData.slice();

    array[iidx].installationQuntity = e.target.value;

    var rate = $("#installationRate"+iidx).val();
    var quntity = $("#installationQuntity"+iidx).val();
    var sum = parseFloat(rate) * parseFloat(quntity);
    array[iidx].installationCost = sum;

    var sum_cost = 0;
    $('.installationCost').each(function(index, element){
      if($(element).val()!="")
        sum_cost += parseFloat($(element).val());
    });

    this.setState({ installationMoreAddData: array, total_installation_cost: sum_cost });

  }

  handleInstallationCostChange=(e, iidx)=>{
    var array = this.state.installationMoreAddData.slice();
    array[iidx].installationCost = e.target.value;
    this.setState({ installationMoreAddData: array });
  }



  //Taxes & Dues
  handleAddTaxesDues=()=>{
    var array = this.state.taxesDuesMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ taxesDuesMoreAddData: array });
  }


  handleRemoveTaxesDues=(iidx)=>{
    var array = this.state.taxesDuesMoreAddData;
    array.splice(iidx, 1);
    this.setState({ taxesDuesMoreAddData: array });
  }


  handleTaxesDuesDescriptionChange=(e, iidx)=>{
    var array = this.state.taxesDuesMoreAddData.slice();
    array[iidx].taxesDuesDescription = e.target.value;
    this.setState({ taxesDuesMoreAddData: array });
  }

  handleTaxesDuesRateChange=(e, iidx)=>{
    var array = this.state.taxesDuesMoreAddData.slice();
    array[iidx].taxesDuesRate = e.target.value;
    this.setState({ taxesDuesMoreAddData: array });
  }

  handleTaxesDuesQuntityChange=(e, iidx)=>{
    var array = this.state.taxesDuesMoreAddData.slice();

    array[iidx].taxesDuesQuntity = e.target.value;

    var rate = $("#taxesDuesRate"+iidx).val();
    var quntity = $("#taxesDuesQuntity"+iidx).val();
    var sum = parseFloat(rate) * parseFloat(quntity);
    array[iidx].taxesDuesCost = sum;

    var sum_cost = 0;
    $('.taxesDuesCost').each(function(index, element){
      if($(element).val()!="")
        sum_cost += parseFloat($(element).val());
    });

    this.setState({ taxesDuesMoreAddData: array, total_taxes_dues: sum_cost });

  }

  handleTaxesDuesCostChange=(e, iidx)=>{
    var array = this.state.taxesDuesMoreAddData.slice();
    array[iidx].taxesDuesCost = e.target.value;
    this.setState({ taxesDuesMoreAddData: array });
  }




  //Drawing Confirmation
  handleAddDrawingConfirmation=()=>{
    var array = this.state.drawingConfirmationMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ drawingConfirmationMoreAddData: array });
  }


  handleRemoveDrawingConfirmation=(dcidx)=>{
    var array = this.state.drawingConfirmationMoreAddData;
    array.splice(dcidx, 1);
    this.setState({ drawingConfirmationMoreAddData: array });
  }


  handleDrawingConfirmationDateChange=(e, dcidx)=>{
    var array = this.state.drawingConfirmationMoreAddData.slice();
    array[dcidx].drawingConfirmationDate = e.target.value;
    this.setState({ drawingConfirmationMoreAddData: array });
  }

  handleDrawingConfirmationVersionChange=(e, dcidx)=>{
    var array = this.state.drawingConfirmationMoreAddData.slice();
    array[dcidx].drawingConfirmationVersion = e.target.value;
    this.setState({ drawingConfirmationMoreAddData: array });
  }

  handleDrawingConfirmationFileChange=(e, dcidx)=>{
    var array = this.state.drawingConfirmationMoreAddData.slice();
    array[dcidx].drawingConfirmationFile = e.target.files[0];
    this.setState({ drawingConfirmationMoreAddData: array });
  }

  handleDrawingConfirmationDescriptionChange=(e, dcidx)=>{
    var array = this.state.drawingConfirmationMoreAddData.slice();
    array[dcidx].drawingConfirmationDescription = e.target.value;
    this.setState({ drawingConfirmationMoreAddData: array });
  }


  //Upload File
  handleAddUploadFile=()=>{
    var array = this.state.uploadFileMoreAddData;
    array.push({ midx: array.length + 1 });
    this.setState({ uploadFileMoreAddData: array });
  }


  handleRemoveUploadFile=(uidx)=>{
    var array = this.state.uploadFileMoreAddData;
    array.splice(uidx, 1);
    this.setState({ uploadFileMoreAddData: array });
  }


  handleUploadFileFileChange=(e, uidx)=>{
    var array = this.state.uploadFileMoreAddData.slice();
    array[uidx].uploadFileFile = e.target.value;
    this.setState({ uploadFileMoreAddData: array });
  }

  handleUploadFileDescriptionChange=(e, uidx)=>{
    var array = this.state.uploadFileMoreAddData.slice();
    array[uidx].uploadFileDescription = e.target.value;
    this.setState({ uploadFileMoreAddData: array });
  }


  onChangeClient=(e)=>{
    this.setState({
      client_id: e.target.value,
    });

    this.InfoClientFun(e.target.value);
  }

  onChangeVendor=(e)=>{
    this.VendorItemsInfo(e.target.value);
  }
  onChangeDefTeam= async(e)=>{
    this.ListTeamUsers(e.target.value);
  }

   

  onChangeTeam=(e, tmidx)=>{

    const { dispatch, history } = this.props;
      dispatch( ListTeamUsers(e.target.value))
      .then((response) => {

        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
          console.log("if response.data");
          console.log(response.data);

          var str  = '<option value="">Select Staff</option>';
          var dataResult = response.data;

          for (var i = 0; i < dataResult.length; i++) {
            str = str + '<option value="'+dataResult[i].user_id+'" data-reporting_to="'+dataResult[i].reporting_to+'" data-reporting_to_name="'+dataResult[i].reporting_to_name+'">'+dataResult[i].user_name+'</option>';
          }

          console.log(str);
          console.log('#staff_id_'+tmidx);

          $('#staff_id_'+tmidx).empty().append(str);

        }else{
          console.log("else");
          $('#staff_id_'+tmidx).empty();
        }
      })
      .catch((error) => {
        console.log("catch");
        $('#staff_id_'+tmidx).empty();
      });
      
  }


  onChangeDefStaff=(e)=>{
    console.log("Shree");
    this.setState({
      defreporting_to: e.target[e.target.selectedIndex].getAttribute('data-reporting_to_name'),

    });
  }


  onChangeStaff=(e, tmidx)=>{
    console.log("Shree onChangeStaff");

    var el = document.getElementById('staff_id_'+tmidx),
    report_name = el.options[el.selectedIndex].getAttribute('data-reporting_to_name');

    console.log("report_name: ");
    console.log(report_name);

    $('#reporting_to_'+tmidx).val(report_name);    
  }

  onChangeTicketDesc=(e)=>{
    this.setState({
      ticket_desc: e.target.value,
    });
  }

  onChangeTicketDate=(e)=>{
    this.setState({
      ticket_datetime: e.target.value,
    });
  }

  onChangeEstimatedDate=(e)=>{
    this.setState({
      estimated_date: e.target.value,
    });
  }

  onChangeLocaton=(e)=>{
    this.setState({
      location: e.target.value,
    });
  }

  onChangeWarranty=(e)=>{

    if(e.target.value==="3"){
      this.setState({
        other_show: true,
        warranty: e.target.value,
      });
    }else{
      this.setState({
        other_show: false,
        warranty: e.target.value,
      });
    }
  }

  onChangePriority=(e)=>{
    this.setState({
      priority: e.target.value,
    });
  }

  onChangeWarrantyDesc=(e)=>{
    this.setState({
      warranty_desc: e.target.value,
    });
  }
  onChangeNote=(e)=>{
    this.setState({
      note: e.target.value,
    });
  }
   onChangeMaintenanceRequirement=(e)=>{
    this.setState({
      maintenance_requirement: e.target.value,
    });
  }
  onChangeMaintenanceDesc=(e)=>{
    this.setState({
      maintenance_desc: e.target.value,
    });
  }

  handleAddTicket=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;
     var maintenance_requirement = $(".maintenance_requirement").map(function(){return $(this).val();}).get();
     var maintenance_desc = $(".maintenance_desc").map(function(){return $(this).val();}).get();


    if (this.checkBtn.context._errors.length === 0) {
      dispatch(TicketAdd(this.state.client_id,this.state.ticket_desc,this.state.priority,this.state.estimated_date,this.state.warranty,this.state.ticket_datetime,this.state.location,maintenance_requirement,maintenance_desc,this.state.note,this.state.warranty_desc))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success(response.message,{position: "bottom-right",autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
         $('#tab_basic_link').removeClass("active");
         $('#tab_cost_link').addClass("active");
         $('#tab_basic').removeClass("active");
         $('#tab_cost').addClass("active");

         this.setState({
            ticket_id: response.data[0].ticket_id,
          });

       
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
      // toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }
  }

    handleAddInspection=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });
    this.Addform.validateAll();

    const { dispatch, history } = this.props;
     var inspection = $(".inspection").map(function(){return $(this).val();}).get();
     var inspection_date = $(".inspection_date").map(function(){return $(this).val();}).get();
     var inspection_desc = $(".inspection_desc").map(function(){return $(this).val();}).get();

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(TicketAddInspection(this.state.ticket_id,inspection,inspection_date,inspection_desc))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success(response.message,{position: "bottom-right",autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
         $('#tab_cost_link').removeClass("active");
         $('#tab_team_link').addClass("active");
         $('#tab_cost').removeClass("active");
         $('#tab_team').addClass("active");
        
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


  handleAddTeamData=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });
    this.Addform.validateAll();

    const { dispatch, history } = this.props;
     var team_id = $(".team_id").map(function(){return $(this).val();}).get();
     var staff_id = $(".staff_id").map(function(){return $(this).val();}).get();
     var reporting_to = $(".reporting_to").map(function(){return $(this).val();}).get();
     var from_date = $(".from_date").map(function(){return $(this).val();}).get();
     var to_date = $(".to_date").map(function(){return $(this).val();}).get();
     

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(TicketAddTeam(this.state.ticket_id,team_id,staff_id,reporting_to,from_date,to_date))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success(response.message,{position: "bottom-right",autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
         $('#tab_team_link').removeClass("active");
         $('#tab_maintenance_link').addClass("active");
         $('#tab_team').removeClass("active");
         $('#tab_maintenance').addClass("active");
        
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


   handleAddMaintenanceData=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });
    this.Addform.validateAll();

    const { dispatch, history } = this.props;
     var vendor_id = $(".vendor_id").map(function(){return $(this).val();}).get();
     var vendor_item_id = $(".vendor_item_id").map(function(){return $(this).val();}).get();
     var material_rate = $(".material_rate").map(function(){return $(this).val();}).get();
     var material_quantity = $(".material_quantity").map(function(){return $(this).val();}).get();
     var material_cost = $(".material_cost").map(function(){return $(this).val();}).get();
     var transport_desc = $(".transport_desc").map(function(){return $(this).val();}).get();
     var transport_rate = $(".transport_rate").map(function(){return $(this).val();}).get();
     var transport_quantity = $(".transport_quantity").map(function(){return $(this).val();}).get();
     var transport_cost = $(".transport_cost").map(function(){return $(this).val();}).get();
     var install_desc = $(".install_desc").map(function(){return $(this).val();}).get();
     var install_rate = $(".install_rate").map(function(){return $(this).val();}).get();
     var install_quantity = $(".install_quantity").map(function(){return $(this).val();}).get();
     var install_cost = $(".install_cost").map(function(){return $(this).val();}).get();
     var tax_due_desc = $(".tax_due_desc").map(function(){return $(this).val();}).get();
     var tax_due_rate = $(".tax_due_rate").map(function(){return $(this).val();}).get();
     var tax_due_quantity = $(".tax_due_quantity").map(function(){return $(this).val();}).get();
     var tax_due_cost = $(".tax_due_cost").map(function(){return $(this).val();}).get();
    
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(TicketAddMaintenance(this.state.ticket_id,vendor_id,vendor_item_id,material_rate,material_quantity,material_cost,transport_desc,transport_rate,transport_quantity,transport_cost,install_desc,install_rate,install_quantity,install_cost,tax_due_desc,tax_due_rate,tax_due_quantity,tax_due_cost,this.state.total_material_cost,this.state.total_transportation_cost,this.state.total_installation_cost,this.state.total_tax_dues_cost,this.state.total_maintenace_cost))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success(response.message,{position: "bottom-right",autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
         $('#tab_maintenance_link').removeClass("active");
         $('#tab_draw_link').addClass("active");
         $('#tab_maintenance').removeClass("active");
         $('#tab_draw').addClass("active");
        
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

   handleAddSupportingDocData=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });
    this.Addform.validateAll();

    const { dispatch, history } = this.props;
     var draw_date = $(".draw_date").map(function(){return $(this).val();}).get();
     var draw_description = $(".draw_description").map(function(){return $(this).val();}).get();
     var version = $(".version").map(function(){return $(this).val();}).get();
     var draw_doc_files = $(".draw_doc_file").prop("files");
     var draw_doc_file = $.map(draw_doc_files, function(val) { return val; });
     // var draw_doc_file = $(".draw_doc_file").map(function(){return $(this).val();});
     var draw_doc_file = $(".draw_doc_file").map(function(files){return files;});

     var doc_file_desc = $(".doc_file_desc").map(function(){return $(this).val();}).get();
     // var doc_file = document.querySelector(".doc_file").files;
     var doc_files= $(".doc_file").prop("files");
     var doc_file = $.map(doc_files, function(val) { return val; });


     console.log("Shree");
     console.log(draw_doc_file.length);
     console.log(draw_doc_file);
     console.log(doc_file);
    
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(TicketAddSupportingDoc(this.state.ticket_id,draw_date,draw_description,version,draw_doc_file,doc_file_desc,doc_file))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success(response.message,{position: "bottom-right",autoClose: 5000, hideProgressBar: false, closeonClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
         $('#tab_draw_link').removeClass("active");
         $('#tab_complete_link').addClass("active");
         $('#tab_draw').removeClass("active");
         $('#tab_complete').addClass("active");
        
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
      <li className="breadcrumb-item active">Ticket</li>
      </ul>
      </div>
      </div>
      </div>

      <div className="card tab-box">
      <div className="row user-tabs">
      <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
      <ul className="nav nav-tabs nav-tabs-bottom">
      <li className="nav-item"><a href="#tab_basic" id="tab_basic_link" data-toggle="tab" className="nav-link active"> Proposal Enquiry</a></li>
      <li className="nav-item"><a href="#tab_order_conf" id="tab_cost_link" data-toggle="tab" className="nav-link"> Order Confrimation</a></li>
      <li className="nav-item"><a href="#tab_internal_order" id="tab_team_link" data-toggle="tab" className="nav-link"> Internal Order</a></li>
      </ul>
      </div>
      </div>
      </div>

      <div className="tab-content card-body">
      <div id="tab_basic" className="pro-overview tab-pane fade show active">
      <div className="card-body">

      <div className="modal-content">
      <div className="modal-header">
      <h4 className="modal-title">Add Proposal</h4>
      </div>
      <div className="modal-body">

      <Form  onSubmit={this.handleAddTicket} ref={(c) => { this.Addform = c; }}>
      <div className="row">

      <div className="col-md-6">
      <div className="form-group">
      <label>Client Name:</label>
      <select className="form-control" id="client_id" name="client_id" value={this.state.client_id} onChange={this.onChangeClient} required>

      <option value="">Select Client</option>
      {this.state.listClientData && typeof this.state.listClientData !=="undefined" & this.state.listClientData.length > 0 && this.state.listClientData.map((itemClientList,a) => (
        <option value={itemClientList.client_id}>{itemClientList.name}</option>
        ))}

        </select>
        </div>
        </div>


        <div class="col-md-6">
        <div className="form-group">
        <label>Location:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>


        <div class="col-md-6">
        <div className="form-group">
        <label>Proposal Description:</label>
        <textarea className="form-control" id="ticket_desc" name="ticket_desc" value={this.state.ticket_desc} onChange={this.onChangeTicketDesc} required ></textarea>
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Lift:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Transport:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Installation:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Taxes and Dues:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Sales Value:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>
        
        <div class="col-md-12">
          <div class="table-responsive m-t-15">
            <table class="table table-striped custom-table">
              <thead>
                <tr>
                  <th class="text-center">Selection</th>
                  <th>Lift specifications</th>
                  <th class="text-center">Input</th>
                  <th class="text-center">Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Rated Speed in m/sec</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Carrying Capacity in Kg</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Number of Stops</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Pit Size in mm</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Shaft Size in WX D</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Guiderail Position</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Travel in mm</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Headroom in mm</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Cabin Size W X D</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>CAR Finish SS Hairline</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Door Size and Opening</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Door Type </td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Door finish</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Gold brass finish</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Car wall Left Side</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Car wall Back Side</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Car wall Right Side</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Ceiling Standard</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Piston Dia in mm</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Car Push Button Finish </td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Landing Pushbutton Finish</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
                <tr>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>
                  <td>Hose Pipe. in mtr</td>
                  <td><input type="text" className="form-control" /></td>
                  <td><input type="text" className="form-control" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

    

        <div class="col-md-6">
            <div className="form-group">
            <h5>Drawing:</h5> </div>
            </div>


            <div class="table-responsive">
            <table class="table table-hover table-white">
            <thead>
            <tr>
            <th>Date</th>
            <th>Version</th>
            <th>File</th>
            <th>Description</th>

            <th></th>
            <th></th>

            </tr>
            </thead>
            <tbody formArrayName="items">

            <tr>
            <td className="assign-left">
            <input type="date" className="form-control draw_date" />
            </td>
            <td className="assign-left">
            <input type="text" className="form-control version" />
            </td>
            <td className="assign-left">
            <input type="file" className="form-control draw_doc_file" />
            </td>

            <td className="">
            <textarea className="form-control draw_description" ></textarea>
            </td>


            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" onClick={this.handleAddDrawingConfirmation} ></i></a>
            </td>

            <td>
            </td>

            </tr>

            {this.state.drawingConfirmationMoreAddData.map((itemdrawingConfirmationMoreAddData, dcidx) => (
              <tr>
              <td className="assign-left">
              <input type="date" className="form-control draw_date" value={itemdrawingConfirmationMoreAddData.drawingConfirmationDate} onChange={e => this.handleDrawingConfirmationDateChange(e, dcidx)} />
              </td>
              <td className="assign-left">
              <input type="text" className="form-control version" value={itemdrawingConfirmationMoreAddData.drawingConfirmationVersion} onChange={e => this.handleDrawingConfirmationVersionChange(e, dcidx)} />
              </td>
              <td className="assign-left">
              <input type="file" className="form-control draw_doc_file" onChange={e => this.handleDrawingConfirmationFileChange(e, dcidx)} />
              </td>

              <td className="">
              <textarea className="form-control draw_description" value={itemdrawingConfirmationMoreAddData.drawingConfirmationDescription} onChange={e => this.handleDrawingConfirmationDescriptionChange(e, dcidx)} ></textarea>
              </td>


              <td>
              <a class="text-danger font-18" title="Remove">
              <i class="fa fa-trash-o" onClick={() => this.handleRemoveDrawingConfirmation(dcidx)} ></i>
              </a>
              </td>

              <td>
              </td>

              </tr>
              ))}

            </tbody>
            </table>
            </div>



            <div class="col-md-6">
            <div className="form-group">
            <h5>Upload Attached Documents:</h5> </div>
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
            <input type="file" className="form-control doc_file" />
            </td>
            <td className="">
            <textarea className="form-control doc_file_desc" ></textarea>
            </td>   
            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" onClick={this.handleAddUploadFile} ></i></a>
            </td>
            <td></td>
            </tr>

            {this.state.uploadFileMoreAddData.map((itemuploadFileMoreAddData, uidx) => (
              <tr>
              <td className="assign-left">
              <input type="file" className="form-control doc_file" onChange={e => this.handleUploadFileFileChange(e, uidx)} />
              </td>
              <td className="">
              <textarea className="form-control doc_file_desc" value={itemuploadFileMoreAddData.uploadFileDescription} onChange={e => this.handleUploadFileDescriptionChange(e, uidx)} ></textarea>
              </td>  
              <td>
              <a class="text-danger font-18" title="Remove">
              <i class="fa fa-trash-o" onClick={() => this.handleRemoveUploadFile(uidx)} ></i>
              </a>
              </td>
              <td></td>
              </tr>
              ))}

            </tbody>
            </table>
            </div>



  </div>
  <div className="m-t-20 text-center">
  <button className="btn btn-primary btn-lg" type="submit" >Submit</button>
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




  <div id="tab_order_conf" className="pro-overview tab-pane fade show">
  <div className="card-body">

  <div className="modal-content">
  <div className="modal-header">
  <h4 className="modal-title"> Order Confrimation</h4>
  </div>
  <div className="modal-body">

  <Form  onSubmit={this.handleAddInspection} ref={(c) => { this.Addform = c; }}>

  <div className="row">
    
          <div class="table-responsive">
            <table class="table table-hover table-white">
            <thead>
            <tr>
            <th>Location</th>
            <th>Cost of Lift</th>
            <th>Cost of Transport</th>
            <th>Cost of Installation</th>
            <th>Taxes and Dues</th>
            <th>Sales Value</th>
            <th></th>
            <th></th>

            </tr>
            </thead>
            <tbody formArrayName="items">

            <tr>
            <td className="assign-left">
            <input type="text" className="form-control doc_file" />
            </td>
            <td className="">
            <input type="text" className="form-control doc_file" />
            </td>
            <td className="">
            <input type="text" className="form-control doc_file" />
            </td>

            <td className="">
            <input type="text" className="form-control doc_file" />
            </td>

            <td className="">
            <input type="text" className="form-control doc_file" />
            </td>

            <td className="">
            <input type="text" className="form-control doc_file" />
            </td>

            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" ></i></a>
            </td>
            <td></td>
            </tr>

           {/* {this.state.uploadFileMoreAddData.map((itemuploadFileMoreAddData, uidx) => (
              <tr>
              <td className="assign-left">
              <input type="file" className="form-control doc_file" onChange={e => this.handleUploadFileFileChange(e, uidx)} />
              </td>
              <td className="">
              <textarea className="form-control doc_file_desc" value={itemuploadFileMoreAddData.uploadFileDescription} onChange={e => this.handleUploadFileDescriptionChange(e, uidx)} ></textarea>
              </td>  
              <td>
              <a class="text-danger font-18" title="Remove">
              <i class="fa fa-trash-o" onClick={() => this.handleRemoveUploadFile(uidx)} ></i>
              </a>
              </td>
              <td></td>
              </tr>
           ))}*/}

            </tbody>
            </table>
            </div>


        <div class="col-md-6">
        <div className="form-group">
        <label>Location:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>



       <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Lift:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Transport:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Installation:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Taxes and Dues:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Sales Value:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>


        <hr />
        <hr />


        <div class="col-md-6">
        <div className="form-group">
        <label>Location:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>



       <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Lift:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Transport:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Installation:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Taxes and Dues:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Sales Value:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>



        <hr />
        <hr />



        <div class="col-md-6">
        <div className="form-group">
        <label>Location:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>



       <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Lift:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Transport:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Cost of Installation:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Taxes and Dues:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>

        <div class="col-md-6">
        <div className="form-group">
        <label>Sales Value:</label>
        <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.onChangeLocaton} required />
        </div>
        </div>





  </div>
  <div className="m-t-20 text-center">
  <button className="btn btn-primary btn-lg" type="submit">Submit</button>
  </div>
  </Form>

  </div>
  </div>
  </div>
  </div>




  <div id="tab_team" className="pro-overview tab-pane fade show">
  <div className="card-body">

  <div className="modal-content">
  <div className="modal-header">
  <h4 className="modal-title">Team Assign</h4>
  </div>
  <div className="modal-body">
  <Form  onSubmit={this.handleAddTeamData} ref={(c) => { this.Addform = c; }}>

  <div className="row">  
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
  <select className="form-control select team_id" onChange={this.onChangeDefTeam}>
  <option value="">Select Team</option>
  {this.state.listTeamData && typeof this.state.listTeamData !=="undefined" & this.state.listTeamData.length > 0 && this.state.listTeamData.map((itemTeamList,c) => (
  <option value={itemTeamList.team_id}>{itemTeamList.team_name}</option>
  ))}
  </select>
  </td>
  <td className="assign-left">
  <select className="form-control select staff_id" onChange={this.onChangeDefStaff}>
  <option value="">Select Staff</option>
   {this.state.listUserData && typeof this.state.listUserData !=="undefined" & this.state.listUserData.length > 0 && this.state.listUserData.map((itemUserList,c) => (
  <option value={itemUserList.user_id} data-reporting_to={itemUserList.reporting_to} data-reporting_to_name={itemUserList.reporting_to_name}>{itemUserList.user_name}</option>
  ))}
  </select>
  </td>
  <td className="assign-left ">
    <input class="form-control reporting_to" name="reporting_to" value={this.state.defreporting_to} type="text" />                                           
  </td>
  <td className="assign-left">
  <input class="form-control from_date" name="from_date" type="date" readonly />
  </td>
  <td className="assign-left">
  <input class="form-control to_date"  name="to_date"  type="date" />
  </td>

  <td><a class="text-success font-18" title="Add"><i
  class="fa fa-plus" onClick={this.handleAddTeam}></i></a></td>
  <td>

  </td>


  </tr>
  {this.state.teamMoreAddData.map((itemteamMoreAddData, tmidx) => (

    <tr>
    <td className="assign-left">
    <select className="form-control select team_id" onChange={e => this.onChangeTeam(e, tmidx)}>
    <option value="">Select Team</option>
    {this.state.listTeamData && typeof this.state.listTeamData !=="undefined" & this.state.listTeamData.length > 0 && this.state.listTeamData.map((itemTeamList,c) => (
    <option value={itemTeamList.team_id}>{itemTeamList.team_name}</option>
    ))}
    </select>
    </td>
    <td className="assign-left">
    <select className="form-control select staff_id" id={'staff_id_'+tmidx} onChange={e => this.onChangeStaff(e, tmidx)} >
    <option value="">Select Staff</option> 
    
    </select>
    </td>
    <td className="assign-left">
      <input class="form-control reporting_to" id={'reporting_to_'+tmidx} type="text" />
    </td>
    <td className="assign-left">
    <input class="form-control from_date" type="date" />
    </td>
    <td className="assign-left">
    <input class="form-control to_date"   type="date" />
    </td>

    <td><a class="text-success font-18" title="Add"><i
    class="fa fa-plus"  onClick={this.handleAddTeam} ></i></a></td>
    <td>
    <a class="text-danger font-18" title="Remove">
    <i class="fa fa-trash-o" onClick={() => this.handleRemoveTeam(tmidx)}></i>
    </a>
    </td>

    </tr>
    ))}

  </tbody>
  </table>
  </div>

  </div>

  <div className="m-t-20 text-center">
  <button className="btn btn-primary btn-lg" type="submit">Submit</button>
  </div>

</Form>
  </div>
  </div>
  </div>
  </div>



  <div id="tab_maintenance" className="pro-overview tab-pane fade show">

  <div className="card-body">

  <div className="modal-content">
  <Form  onSubmit={this.handleAddMaintenanceData} ref={(c) => { this.Addform = c; }}>

  <div className="modal-header">
  <h4 className="modal-title">Maintenance Description</h4>
  </div>
  <div className="modal-body">


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
  <select className="form-control select vendor_id " onChange={this.onChangeVendor}>
  <option value="">Select Vendor</option>
  {this.state.listVendorData && typeof this.state.listVendorData !=="undefined" & this.state.listVendorData.length > 0 && this.state.listVendorData.map((itemVendorList,b) => (
  <option value={itemVendorList.vendor_id}>{itemVendorList.name}</option>
  ))}
  </select>
  </td>
  <td className="assign-left">
  <select className="form-control select vendor_item_id">
  <option value="">Select Material</option>
  {this.state.listVendorItemData && typeof this.state.listVendorItemData !=="undefined" & this.state.listVendorItemData.length > 0 && this.state.listVendorItemData.map((itemVendorItemList,b) => (
  <option value={itemVendorItemList.vendor_item_id}>{itemVendorItemList.item_name}</option>
  ))}
  </select>
  </td>
  <td className="assign-left">
  <input class="form-control material_rate"  type="text" />
  </td>
  <td className="assign-left">
  <input class="form-control material_quantity" type="text" />
  </td>
  <td className="assign-left">
  <input class="form-control material_cost"   type="text" />
  </td>

  <td><a class="text-success font-18" title="Add"><i
  class="fa fa-plus"  onClick={this.handleAddMaterial}></i></a></td>
  <td>
  </td>

  </tr>

  {this.state.materialMoreAddData.map((itemmaterialMoreAddData, vmidx) => (

    <tr>
    <td className="assign-left">
    <select className="form-control select vendor_id"  onChange={this.onChangeVendor}>
    <option value="">Select Vendor</option>
    {this.state.listVendorData && typeof this.state.listVendorData !=="undefined" & this.state.listVendorData.length > 0 && this.state.listVendorData.map((itemVendorList,b) => (
    <option value={itemVendorList.vendor_id}>{itemVendorList.name}</option>
    ))}
    </select>
    </td>

    <td className="assign-left">
    <select className="form-control select vendor_item_id">
    <option value="">Select Material</option>
     {this.state.listVendorItemData && typeof this.state.listVendorItemData !=="undefined" & this.state.listVendorItemData.length > 0 && this.state.listVendorItemData.map((itemVendorItemList,b) => (
  <option value={itemVendorItemList.vendor_item_id}>{itemVendorItemList.item_name}</option>
  ))}
    </select>
    </td>

    <td className="assign-left">
    <input class="form-control material_rate"  type="text" />
    </td>

    <td className="assign-left">
    <input class="form-control material_quantity" type="text" />
    </td>

    <td className="assign-left">
    <input class="form-control material_cost"   type="text" />
    </td>

    <td><a class="text-success font-18" title="Add"><i
    class="fa fa-plus"  onClick={this.handleAddTeam}></i></a></td>
    <td>
    <a class="text-danger font-18" title="Remove">
    <i class="fa fa-trash-o"  onClick={() => this.handleRemoveMaterial(vmidx)}></i>
    </a>
    </td>
    </tr>
    ))}

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
  <h5 className="assign-right">Material Cost</h5>
  </td>
  <td className="assign-left">
  <input class="form-control total_material_cost" type="text" name="total_material_cost" value={this.state.total_material_cost} readonly />

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
  <div class="col-md-6">
  <div className="form-group">
  <h5>Transportation Cost:</h5> </div>
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
  <input class="form-control transport_desc" type="text" /> </td>
  <td className="assign-left">
  <input class="form-control transport_rate"  id="deftransportationRate" type="number" name="deftransportationRate" value={this.state.deftransportationRate}  onChange={this.OnchangeDefTransportationRate} /> </td>
  <td className="assign-left">
  <input class="form-control transport_quantity" id="deftransportationQuantity" type="number" name="deftransportationQuantity" value={this.state.deftransportationQuantity}  onChange={this.OnchangeDefTransportationQuantity} /> </td>
  <td className="assign-left">
  <input class="form-control transportationCost transport_cost" id="deftransportation_cost" name="deftransportationCost" value={this.state.deftransportationCost}  type="number"  readonly/> </td>
  <td><a class="text-success font-18" title="Add"><i
  class="fa fa-plus" onClick={this.handleAddTransportation} ></i></a></td>
  <td>

  </td>
  </tr>
  {this.state.transportationMoreAddData.map((itemtransportationMoreAddData, tidx) => (
    <tr>
    <td className="assign-left">
    <input class="form-control transport_desc" type="text" id={"transportationDescription"+tidx} name="transportationDescription" value={itemtransportationMoreAddData.transportationDescription} onChange={e => this.handleTransportationDescriptionChange(e, tidx)} /> </td>
    <td className="assign-left">
    <input class="form-control transport_rate" type="number" id={"transportationRate"+tidx} name="transportationRate" value={itemtransportationMoreAddData.transportationRate} onChange={e => this.handleTransportationRateChange(e, tidx)} /> </td>
    <td className="assign-left">
    <input class="form-control transport_quantity" type="number" id={"transportationQuntity"+tidx} name="transportationQuntity" value={itemtransportationMoreAddData.transportationQuntity} onChange={e => this.handleTransportationQuntityChange(e, tidx)} /> </td>
    <td className="assign-left">
    <input class="form-control transportationCost transport_cost" type="number" id={"transportationCost"+tidx} name="transportationCost" value={itemtransportationMoreAddData.transportationCost} onChange={e => this.handleTransportationCostChange(e, tidx)} readonly /> </td>
    <td><a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o" onClick={() => this.handleRemoveTransportation(tidx)} ></i> </a></td>
    <td>

    </td>
    </tr>
    ))}
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
  <h5 className="assign-right">Total Transportation Cost </h5>
  </td>
  <td className="assign-left">
  <input class="form-control" type="text" name="total_transportation_cost" value={this.state.total_transportation_cost} />

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
            <input class="form-control install_desc" type="text" /> </td>
            <td className="assign-left">
            <input class="form-control install_rate" type="text" /> </td>
            <td className="assign-left">
            <input class="form-control install_quantity" type="text" /> </td>
            <td className="assign-left">
            <input class="form-control install_cost" type="text" /> </td>
            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" onClick={this.handleAddInstallation} ></i></a></td>
            <td>
            </td>
            </tr>
            {this.state.installationMoreAddData.map((iteminstallationMoreAddData, iidx) => (
              <tr>
              <td className="assign-left">
              <input class="form-control install_desc" type="text" id={"installationDescription"+iidx} name="installationDescription" value={iteminstallationMoreAddData.installationDescription} onChange={e => this.handleInstallationDescriptionChange(e, iidx)} /> </td>
              <td className="assign-left">
              <input class="form-control install_rate" type="number" id={"installationRate"+iidx} name="installationRate" value={iteminstallationMoreAddData.installationRate} onChange={e => this.handleInstallationRateChange(e, iidx)} /> </td>
              <td className="assign-left">
              <input class="form-control install_quantity" type="number" id={"installationQuntity"+iidx} name="installationQuntity" value={iteminstallationMoreAddData.installationQuntity} onChange={e => this.handleInstallationQuntityChange(e, iidx)} /> </td>
              <td className="assign-left">
              <input class="form-control installationCost install_cost" type="number" id={"installationCost"+iidx} name="installationCost" value={iteminstallationMoreAddData.installationCost} onChange={e => this.handleInstallationCostChange(e, iidx)} readonly /> </td>
              <td><a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o" onClick={() => this.handleRemoveInstallation(iidx)} ></i> </a></td>
              <td>

              </td>
              </tr>
              ))}

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
            <input class="form-control" type="text" name="total_installation_cost" value={this.state.total_installation_cost} readonly />

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
            <h5>Taxes & Dues Cost:</h5> </div>
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
            <input class="form-control tax_due_desc" type="text" /> </td>
            <td className="assign-left">
            <input class="form-control tax_due_rate" type="text" /> </td>
            <td className="assign-left">
            <input class="form-control tax_due_quantity" type="text" /> </td>
            <td className="assign-left">
            <input class="form-control tax_due_cost" type="text" /> </td>
            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" onClick={this.handleAddTaxesDues} ></i></a></td>
            <td>
            </td>
            </tr>
            {this.state.taxesDuesMoreAddData.map((itemtaxesDuesMoreAddData, tsidx) => (
              <tr>
              <td className="assign-left">
              <input class="form-control tax_due_desc" type="text" id={"taxesDuesDescription"+tsidx} name="taxesDuesDescription" value={itemtaxesDuesMoreAddData.taxesDuesDescription} onChange={e => this.handleTaxesDuesDescriptionChange(e, tsidx)} /> </td>
              <td className="assign-left">
              <input class="form-control tax_due_rate" type="number" id={"taxesDuesRate"+tsidx} name="taxesDuesRate" value={itemtaxesDuesMoreAddData.taxesDuesRate} onChange={e => this.handleTaxesDuesRateChange(e, tsidx)} /> </td>
              <td className="assign-left">
              <input class="form-control tax_due_quantity" type="number" id={"taxesDuesQuntity"+tsidx} name="taxesDuesQuntity" value={itemtaxesDuesMoreAddData.taxesDuesQuntity} onChange={e => this.handleTaxesDuesQuntityChange(e, tsidx)} /> </td>
              <td className="assign-left">
              <input class="form-control taxesDuesCost tax_due_cost" type="number" id={"taxesDuesCost"+tsidx} name="taxesDuesCost" value={itemtaxesDuesMoreAddData.taxesDuesCost} onChange={e => this.handleTaxesDuesCostChange(e, tsidx)} readonly /> </td>
              <td><a class="text-danger font-18" title="Remove"> <i class="fa fa-trash-o" onClick={() => this.handleRemoveTaxesDues(tsidx)} ></i> </a></td>
              <td>

              </td>
              </tr>
              ))}
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
            <h5 className="assign-right">Total Taxes & Dues </h5>
            </td>
            <td className="assign-left">
            <input class="form-control total_tax_dues_cost" name="total_tax_dues_cost" type="text" value={this.state.total_tax_dues_cost} readonly />

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
            <h5 className="assign-right">Total Maintenance Cost</h5>
            </td>
            <td className="assign-left">
            <input class="form-control" type="text" name="total_maintenance_cost" value={this.state.total_maintenance_cost} readonly />

            </td>
            <td className="si"></td>


            </tr>

            </tbody>
            </table>
            </div>
            </div>
            </div>
           
            <div className="text-center">
                <button className="btn btn-primary btn-lg" id="calculate_cost"  type="button" onClick={this.CalculateCost} >Calculate</button>
                 &nbsp;<button className="btn btn-primary btn-lg" id="submit_cost" style={{ display: "none" }} type="submit" >Submit</button>
            </div> 
          
            <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
            </Form>
            <br/>

            </div>
            </div>
            </div>


  <div id="tab_draw" className="pro-overview tab-pane fade show">
<div className="card-body">

      <div className="modal-content">
      <Form  onSubmit={this.handleAddSupportingDocData} ref={(c) => { this.Addform = c; }}>

      <div className="modal-header">
      <h4 className="modal-title"> Documents</h4>
      </div>
      <div className="modal-body">


      <div className="row">
   <div class="col-md-6">
            <div className="form-group">
            <h5>Drawing:</h5> </div>
            </div>


            <div class="table-responsive">
            <table class="table table-hover table-white">
            <thead>
            <tr>
            <th>Date</th>
            <th>Version</th>
            <th>File</th>
            <th>Description</th>

            <th></th>
            <th></th>

            </tr>
            </thead>
            <tbody formArrayName="items">

            <tr>
            <td className="assign-left">
            <input type="date" className="form-control draw_date" />
            </td>
            <td className="assign-left">
            <input type="text" className="form-control version" />
            </td>
            <td className="assign-left">
            <input type="file" className="form-control draw_doc_file" />
            </td>

            <td className="">
            <textarea className="form-control draw_description" ></textarea>
            </td>


            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" onClick={this.handleAddDrawingConfirmation} ></i></a>
            </td>

            <td>
            </td>

            </tr>

            {this.state.drawingConfirmationMoreAddData.map((itemdrawingConfirmationMoreAddData, dcidx) => (
              <tr>
              <td className="assign-left">
              <input type="date" className="form-control draw_date" value={itemdrawingConfirmationMoreAddData.drawingConfirmationDate} onChange={e => this.handleDrawingConfirmationDateChange(e, dcidx)} />
              </td>
              <td className="assign-left">
              <input type="text" className="form-control version" value={itemdrawingConfirmationMoreAddData.drawingConfirmationVersion} onChange={e => this.handleDrawingConfirmationVersionChange(e, dcidx)} />
              </td>
              <td className="assign-left">
              <input type="file" className="form-control draw_doc_file" onChange={e => this.handleDrawingConfirmationFileChange(e, dcidx)} />
              </td>

              <td className="">
              <textarea className="form-control draw_description" value={itemdrawingConfirmationMoreAddData.drawingConfirmationDescription} onChange={e => this.handleDrawingConfirmationDescriptionChange(e, dcidx)} ></textarea>
              </td>


              <td>
              <a class="text-danger font-18" title="Remove">
              <i class="fa fa-trash-o" onClick={() => this.handleRemoveDrawingConfirmation(dcidx)} ></i>
              </a>
              </td>

              <td>
              </td>

              </tr>
              ))}

            </tbody>
            </table>
            </div>




            <div class="col-md-6">
            <div className="form-group">
            <h5>Upload Attached Documents:</h5> </div>
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
            <input type="file" className="form-control doc_file" />
            </td>
            <td className="">
            <textarea className="form-control doc_file_desc" ></textarea>
            </td>   
            <td><a class="text-success font-18" title="Add"><i
            class="fa fa-plus" onClick={this.handleAddUploadFile} ></i></a>
            </td>
            <td></td>
            </tr>

            {this.state.uploadFileMoreAddData.map((itemuploadFileMoreAddData, uidx) => (
              <tr>
              <td className="assign-left">
              <input type="file" className="form-control doc_file" onChange={e => this.handleUploadFileFileChange(e, uidx)} />
              </td>
              <td className="">
              <textarea className="form-control doc_file_desc" value={itemuploadFileMoreAddData.uploadFileDescription} onChange={e => this.handleUploadFileDescriptionChange(e, uidx)} ></textarea>
              </td>  
              <td>
              <a class="text-danger font-18" title="Remove">
              <i class="fa fa-trash-o" onClick={() => this.handleRemoveUploadFile(uidx)} ></i>
              </a>
              </td>
              <td></td>
              </tr>
              ))}

            </tbody>
            </table>
            </div>

            </div>
            </div>

             <div className="m-t-20 text-center">
            <button className="btn btn-primary btn-lg" type="submit" >Submit</button>
            </div>
            <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
            </Form>
            <br/>
            </div>
            </div>



  </div>


 {/* <div id="tab_complete" className="pro-overview tab-pane fade show">
    <div className="card-body">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Supporting Documents</h4>
        </div>
        <div className="modal-body">
          <div className="row">
             <div class="col-md-6">
                <div className="form-group">
                <h5>Status Complete:</h5> </div>
              </div>
              <div class="col-md-6">
                <div className="form-group">
                <button className="btn btn-primary btn-lg" type="button">Submit</button>
                </div>
              </div>
            </div>
          </div>
 </div>
 </div>
 </div>
 </div>
*/}



<div id="tab_complete" className="pro-overview tab-pane fade show">
    <div className="card-body">
      <div className="modal-content">
        <div className="modal-body">
          <div className="row">
          <div class="col-md-3">
          </div>
             <div class="col-md-3">
                <div className="form-group">
                <h4>Status Complete:</h4> </div>
              </div>
              <div class="col-md-6">
                <div className="form-group">
                <button className="btn btn-primary btn-lg" type="button">Submit</button>
                </div>
              </div>
            </div>
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
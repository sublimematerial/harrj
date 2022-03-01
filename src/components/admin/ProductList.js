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
import {  BrandModelLst, BrandOfCatList } from "./../../actions/adminBrand";
import {CountryList,CountryCityList} from "./../../actions/adminCountry";
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
    this.ListBrandFun = this.ListBrandFun.bind(this);
    this.ListModelFun = this.ListModelFun.bind(this);
    this.ListCountryFun = this.ListCountryFun.bind(this);
    this.ListCityFun = this.ListCityFun.bind(this);
    this.ListProductFun = this.ListProductFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.onChangeProductImage = this.onChangeProductImage.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);

    this.InfoProductFun = this.InfoProductFun.bind(this);

    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listCategoryData: [],
        listBrandData:[],
        listModelData:[],
        listCountryData:[],
        listCityData:[],
        listProductData: [],

        addProductList : [],

        productMoreAddData: [],
        productMoreAddDataEdit: [],
        title:'',
        name:'',
        description:'',
        keywords:'',
        category_id:0,
        brand_id:0,
        model_id:0,
        country_id:0,
        city_id:0,
        sub_category_id:0,
        start_date_time:'',
        end_date_time:'',
        start_time:'',
        end_time:'',

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
        edit_brand_id:0,
        edit_country_id:0,
        edit_city_id:0,
        edit_model_id:0,
        edit_sub_category_id:0,
        edit_start_date_time:'',
        edit_end_date_time:'',
        edit_start_time:'00:00',
        edit_end_time:'00:00',
        edit_auction_type:'',
        edit_starting_price:0,
        edit_high_price:0,
        edit_final_price:0,
        edit_refund:'no',
        edit_refund_days:0,
        edit_youtube_link:'',
        edit_video:'',
        edit_product_img:[],
        edit_product_view_img:[],
        edit_video_view:'',

        other_show:false,
        other_edit_show:false,


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

    var temp_arry = [];
    
    var temp_obj = {'tmidx':0, 'product_img':''}

    temp_arry.push(temp_obj);

    this.setState({
      addProductList: temp_arry
    });

    this.ListCategoryFun();
    this.ListCountryFun();
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
  ListBrandFun=(category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(BrandOfCatList(category_id))
      .then((response) => {
        this.setState({
          listBrandData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listBrandData: []
        });
      });
  }
  ListModelFun=(brand_id)=>{

    const { dispatch, history } = this.props;
    dispatch(BrandModelLst(brand_id))
      .then((response) => {
        this.setState({
          listModelData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listModelData: []
        });
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

  ListCityFun =(country_id)=>{
console.log("city list called")
    const { dispatch, history } = this.props;
    dispatch(CountryCityList(country_id))
      .then((response) => {
        this.setState({
          listCityData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listCityData: []
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
var catid=e.target.value
    this.setState({
      category_id: e.target.value,
    }, () => {
      this.ListBrandFun(catid);
  });
  
  }
  onChangeBrand=(e)=>{
    var brandid=e.target.value
    this.setState({
      brand_id: e.target.value,
    }, () => {
      this.ListModelFun(brandid);
  });
    //this.ListBrandFun(e.target.value);
  }
  onChangeModel=(e)=>{
    this.setState({
      model_id: e.target.value,
    });
    //this.ListBrandFun(e.target.value);
  }
  onChangeCountry=(e)=>{
    var country_id=e.target.value
    this.setState({
      country_id: e.target.value,
    }, () => {
      this.ListCityFun(country_id);
  });
   
  }
  onChangeCity=(e)=>{
    this.setState({
      city_id: e.target.value,
    });
   
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
  onChangeStartTime=(e)=>{
    this.setState({
      start_time: e.target.value,
    });
  }  
  onChangeEndTime=(e)=>{
    this.setState({
      end_time: e.target.value,
    });
  }
   onChangeAuctionType=(e)=>{
    if(e.target.value==="online"){
      this.setState({
        other_show: true,
        auction_type: e.target.value,
      });
    }else{
      this.setState({
        other_show: false,
        auction_type: e.target.value,
      });
    }
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
/*onChangeProductImage=(e)=>{
  console.log("Shree Ganeshay Namaha...");
  let img = new Image()
  let product_img=e.target.files;
  for (let p = 0; p < product_img.length; p++) {
        img.src = window.URL.createObjectURL(product_img[p])
        img.onload = () => {
         if(img.width === 225 && img.height === 225){
              alert(`Nice, image is the right size. It can be uploaded`)
              // upload logic here
              } else {
                let k=p+1;
               toast.error(`Sorry, `+ k +` Position image size is not 225 x 225`, {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
          // e.target.value = null
         }                
    }
  }*/
  
  onChangeProductImage = tmidx => (e) => {
  
    let product_img=e.target.files[0];
    
    var file_type = product_img.type;

    if (file_type.indexOf('image/') > -1) {
      let img = new Image()
      img.src = window.URL.createObjectURL(e.target.files[0])
      
      img.onload = () => {
        if(img.width===255 && img.height === 255){
          toast.success("Nice, image is the right size. It can be uploaded.", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }else{
          $("#product_img_add_"+tmidx).val("")
          toast.error("Sorry, Product image size is not 225 x 225 ..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      }
    }else{
      toast.error("Please select image file only..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }
  
  }

  handleAddProduct=()=>{
    var array = this.state.addProductList;
    array.push({ tmidx: array.length + 1 });
    this.setState({ addProductList: array });
  }

  handleRemoveProduct=(tmidx)=>{
    $("#add_pro_div_"+tmidx).remove();
    /*var array = this.state.addProductList;
    array.splice(tmidx, 1);
    this.setState({ addProductList: array });*/
  }

  AddProductFun=()=>{
    let product_arry_temp = [];
    
    var tempArry = {"file_id":""};
    
    product_arry_temp.push(tempArry);
    
    this.setState({
      productMoreAddData: product_arry_temp
    });

    $("#add_form").modal("show");
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
      dispatch(ProductAdd(this.state.title,this.state.name,this.state.description,this.state.keywords,this.state.category_id,this.state.sub_category_id,this.state.brand_id,this.state.model_id,this.state.country_id,this.state.city_id,this.state.start_date_time,this.state.end_date_time,this.state.auction_type,this.state.starting_price,this.state.high_price,this.state.final_price,this.state.refund,this.state.refund_days,this.state.youtube_link,add_product_img,add_video,this.state.start_time,this.state.end_time))
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
console.log("get info response")
console.log(response.data)
            this.setState({
              product_id: response.data[0].product_id,
              edit_category_id: response.data[0].category_id,

              edit_title:response.data[0].title,
              edit_name:response.data[0].name,
              edit_description:response.data[0].description,
              edit_keywords:response.data[0].keywords,
              edit_category_id:response.data[0].category_id,
              edit_brand_id:response.data[0].brand_id,
              edit_country_id:response.data[0].country_id,
              edit_city_id:response.data[0].city_id,
              edit_model_id:response.data[0].model_id,
              edit_sub_category_id:response.data[0].sub_category_id,
              edit_start_date_time:response.data[0].start_date_time,
              edit_end_date_time:response.data[0].end_date_time,
              edit_start_time:response.data[0].auction_type==="online"?response.data[0].start_time:"00:00",
              edit_end_time:response.data[0].auction_type==="online"?response.data[0].end_time:"00:00",
              edit_auction_type:response.data[0].auction_type,
              other_edit_show: response.data[0].auction_type==="online"?true:false,
              edit_starting_price:response.data[0].starting_price,
              edit_high_price:response.data[0].high_price,
              edit_final_price:response.data[0].final_price,
              edit_refund:response.data[0].refund,
              edit_refund_days:response.data[0].refund_days,
              edit_youtube_link:response.data[0].zoom_link,
              edit_video_view:response.data[0].video,
              edit_product_view_img:response.data[0].product_img,
            }, () => {
              this.ListCityFun(response.data[0].country_id)
              this.ListBrandFun(response.data[0].category_id);
              this.ListModelFun(response.data[0].brand_id);
              // this.listModelFun(response.data[0].brand_id)
          });
            if(response.data[0].auction_type&& response.data[0].auction_type=='online')
            {
              this.setState({ other_edit_show:true});
            }

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
    var catid=e.target.value
    this.setState({
      edit_category_id: e.target.value,
    }, () => {
      this.ListBrandFun(catid);
  });
    
  }
  onchangeEditCity=(e)=>{
    this.setState({
      edit_city_id: e.target.value,
    }
);
    
  }
  onchangeEditCountry=(e)=>{
    console.log("Edit coutry is fired")
    var countryid=e.target.value
    this.setState({
      edit_country_id: e.target.value,
    }, () => {
      this.ListCityFun(countryid);
  });
   
  }
  onChangeEditBrand=(e)=>{
    var brandid=e.target.value
    this.setState({
      edit_brand_id: e.target.value,
    }, () => {
      this.ListModelFun(brandid);
  });
  }
  onChangeEditModel=(e)=>{
    this.setState({
      edit_model_id: e.target.value,
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
    if(e.target.value==="online"){
      this.setState({
        other_edit_show: true,
        edit_auction_type: e.target.value,
      });
    }else{
      this.setState({
        other_edit_show: false,
        edit_auction_type: e.target.value,
      });
    }
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
console.log("now endd ate time is")
console.log(this.state.edit_end_date_time)
    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(ProductUpdate(this.state.product_id,this.state.edit_title,this.state.edit_name,this.state.edit_description,this.state.edit_keywords,this.state.edit_category_id,this.state.edit_brand_id,this.state.edit_model_id,this.state.edit_country_id,this.state.edit_city_id,this.state.edit_sub_category_id,this.state.edit_start_date_time,this.state.edit_end_date_time,this.state.edit_auction_type,this.state.edit_starting_price,this.state.edit_high_price,this.state.edit_final_price,this.state.edit_refund,this.state.edit_refund_days,this.state.edit_youtube_link,this.state.edit_product_img,this.state.edit_video,this.state.edit_start_time,this.state.edit_end_time))
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
                      {/*<a href="#" class="btn add-btn" data-toggle="modal" title="Add Product" data-target="#add_form"><i class="fa fa-plus"></i></a>*/}
                      <a href="#" class="btn add-btn" title="Add Product" onClick={() => this.AddProductFun()}><i class="fa fa-plus"></i></a>

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
                            <th>Category</th>
                            <th>Brand</th>
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
                            <td>{itemProductList.category_name}</td>
                            <td>{itemProductList.brand_name}</td>
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
                           
                           {/* <div class="col-sm-3">
                            <div className="form-group">
                              <label>Category:</label>
                              <select className="form-control" placeholder="Category" id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required >
                                  <option value="">Select Category</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div> */}
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Country:</label>
                              <select className="form-control" placeholder="Country" id="country_id" name="country_id" value={this.state.country_id} onChange={this.onChangeCountry}  >
                                  <option value="">Select Country</option>
                                  {this.state.listCountryData && typeof this.state.listCountryData !=="undefined" & this.state.listCountryData.length > 0 && this.state.listCountryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.country_id}>{itemTaskList.country_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>City:</label>
                              <select className="form-control" placeholder="City" id="city_id" name="city_id" value={this.state.city_id} onChange={this.onChangeCity} required >
                                  <option value="">Select City</option>
                                  {this.state.listCityData && typeof this.state.listCityData !=="undefined" & this.state.listCityData.length > 0 && this.state.listCityData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.city_id}>{itemTaskList.city_name}</option>
                                  ))}
                              </select>
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
                              <label>Brand:</label>
                              <select className="form-control" placeholder="Brand" id="brand_id" name="brand_id" value={this.state.brand_id} onChange={this.onChangeBrand} required >
                                  <option value="">Select Brand</option>
                                  {this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.brand_id}>{itemTaskList.brand_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Model:</label>
                              <select className="form-control" placeholder="Model" id="model_id" name="model_id" value={this.state.model_id} onChange={this.onChangeModel} required >
                                  <option value="">Select Model</option>
                                  {this.state.listModelData && typeof this.state.listModelData !=="undefined" & this.state.listModelData.length > 0 && this.state.listModelData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.model_id}>{itemTaskList.model_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
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
                   
                  </div>
                        <div class="row">
                     
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Price:</label>
                                <input type="number" className="form-control" placeholder="Starting Price" id="starting_price" name="starting_price" value={this.state.starting_price} onChange={this.onChangeStartingPrice} required />
                            </div>
                          </div>
                          {/* <div class="col-sm-3">
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
                            </div> */}
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Keywords:</label>
                                <input type="text" className="form-control" placeholder="Keywords" id="keywords" name="keywords" value={this.state.keywords} onChange={this.onChangeKeywords} required />
                            </div>
                          </div>
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
                        
                       </div>

                        <div class="row">
                      
                       
                   
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Video:</label>
                                <input type="file" className="form-control add_video" id="video" name="video" onChange={this.onChangeVideo} required />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" placeholder="Start Date Time" id="start_date_time" name="start_date_time" value={this.state.start_date_time} onChange={this.onChangeStartDateTime} required />
                            </div>
                          </div>
                          { !this.state.other_show &&
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" className="form-control" placeholder="End Date Time" id="end_date_time" name="edit_end_date_time" value={this.state.edit_end_date_time} onChange={this.onChangeEditEndDateTime} required />
                            </div>
                          </div>
                          }
                        </div>

                         <div class="row">
                        
                        
                     
                           { this.state.other_show &&
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>From Time:</label>
                                <input type="time" className="form-control" placeholder="Start Date Time" id="start_time" name="start_time" value={this.state.start_time} onChange={this.onChangeStartTime} required />
                            </div>
                          </div>
                          }

                          { this.state.other_show &&
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>To Time:</label>
                                <input type="time" className="form-control" placeholder="Start Date Time" id="end_time" name="end_time" value={this.state.end_time} onChange={this.onChangeEndTime} required />
                            </div>
                          </div>
                        }
                             { this.state.other_show &&
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Meeting Link</label>
                                <input type="text" className="form-control " placeholder="Meeting Link" id="youtube_link" name="youtube_link" value={this.state.youtube_link} onChange={this.onChangeYoutubeLink}  />
                            </div>
                            </div>
                          }
                            
                        </div>

                        <div class="row">
                          
                         {/*<div class="col-sm-3">
                            <div className="form-group">
                                <label>Product Images:</label>
                                <input type="file" className="form-control add_product_img" id="product_img" name="product_img" onChange={this.onChangeProductImage} multiple required />
                            </div>
                          </div>*/}
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea className="form-control description"  id="description" name="description" value={this.state.description} onChange={this.onChangeDescription} require  ></textarea>
                                </div>
                          </div>
                        </div>

                        {this.state.addProductList.map((itemaddProductList, tmidx) => (
                          <div class="row" id={"add_pro_div_"+tmidx}>
                            <div class="col-sm-3">
                              <div className="form-group">
                                  <label>Product Images:</label>
                                  <input type="file" className="form-control add_product_img" id={"product_img_add_"+tmidx} name="product_img" onChange={this.onChangeProductImage(tmidx)} accept="image/png, image/jpg, image/jpeg" required />
                              </div>
                            </div>
                            <div class="col-sm-3">
                              {(() => {
                               if(tmidx===0) {
                               return(
                                <div className="form-group">
                                  <a class="text-success font-18" title="Add">
                                    <i class="fa fa-plus" onClick={this.handleAddProduct} ></i>
                                  </a>
                                </div>
                               )
                               }else{
                               return(
                                <div className="form-group">
                                  <a class="text-danger font-18" title="Remove">
                                    <i class="fa fa-trash-o" onClick={() => this.handleRemoveProduct(tmidx)} ></i>
                                  </a>
                                </div>
                               )
                               }
                               })()}
                            </div>
                          </div>
                        ))}

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
                                <input type="text" className="form-control" placeholder="Title" id="title" name="edit_title" value={this.state.edit_title} onChange={this.onChangeEditTitle} required />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" placeholder="Name" id="name" name="edit_name" value={this.state.edit_name} onChange={this.onChangeEditName} required />
                            </div>
                          </div>
                          {/* <div class="col-sm-3">
                            <div className="form-group">
                              <label>Category:</label>
                              <select className="form-control" placeholder="Category" id="category_id" name="edit_category_id" value={this.state.edit_category_id} onChange={this.onChangeEditCategory} required >
                                  <option value="">Select Category</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div> */}
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Country11:</label>
                              <select className="form-control" placeholder="Country" id="Country_id" name="edit_Country_id" value={this.state.edit_country_id} onChange={this.onchangeEditCountry}  >
                                  <option value="">Select Country</option>
                                  {this.state.listCountryData && typeof this.state.listCountryData !=="undefined" & this.state.listCountryData.length > 0 && this.state.listCountryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.country_id}>{itemTaskList.country_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Cityedit:</label>
                              <select className="form-control" placeholder="City" id="City_id" name="City_id" value={this.state.edit_city_id} onChange={this.onchangeEditCity} required >
                                  <option value="">Select City</option>
                                  {this.state.listCityData && typeof this.state.listCityData !=="undefined" & this.state.listCityData.length > 0 && this.state.listCityData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.city_id}>{itemTaskList.city_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-3">
                            <div className="form-group">
                              <label>Category:</label>
                              <select className="form-control" placeholder="Category" id="category_id" name="edit_category_id" value={this.state.edit_category_id} onChange={this.onChangeEditCategory} required >
                                  <option value="">Select Category</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>{itemTaskList.category_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Brand:</label>
                              <select className="form-control" placeholder="Brand" id="brand_id" name="edit_brand_id" value={this.state.edit_brand_id} onChange={this.onChangeEditBrand} required >
                                  <option value="">Select Brand</option>
                                  {this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.brand_id}>{itemTaskList.brand_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>Model:</label>
                              <select className="form-control" placeholder="Model" id="model_id" name="edit_model_id" value={this.state.edit_model_id} onChange={this.onChangeEditModel} required >
                                  <option value="">Select Model</option>
                                  {this.state.listModelData && typeof this.state.listModelData !=="undefined" & this.state.listModelData.length > 0 && this.state.listModelData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.model_id}>{itemTaskList.model_name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Auction Type:</label>
                                 <select className="form-control" placeholder="Auction Type" id="auction_type" name="edit_auction_type" value={this.state.edit_auction_type} onChange={this.onChangeEditAuctionType} required >
                                  <option value="">Select Auction Type:</option>
                                   <option value="online">Online</option>
                                   <option value="offline">Offline</option>
                              </select>
                               </div>
                          </div>
                          </div>
                         <div class="row">
                     
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Price:</label>
                                <input type="number" className="form-control" placeholder="Starting Price" id="starting_price" name="edit_starting_price" value={this.state.edit_starting_price} onChange={this.onChangeEditStartingPrice} required />
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Keywords:</label>
                                <input type="text" className="form-control" placeholder="Keywords" id="keywords" name="edit_keywords" value={this.state.edit_keywords} onChange={this.onChangeEditKeywords} required />
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Refund:</label>
                                 <select className="form-control" placeholder="Refund" id="refund" name="edit_refund" value={this.state.edit_refund} onChange={this.onChangeEditRefund} required >
                                   <option value="no">No</option>
                                   <option value="yes">Yes</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>Refund Days:</label>
                                <input type="number" className="form-control" placeholder="Refund Days" id="refund_days" name="edit_refund_days" value={this.state.edit_refund_days} onChange={this.onChangeEditRefundDays} required />
                            </div>
                            </div>
                          {/* <div class="col-sm-3">
                            <div className="form-group">
                                <label>High Price:</label>
                                <input type="number" className="form-control" placeholder="High Price" id="high_price" name="edit_high_price" value={this.state.edit_high_price} onChange={this.onChangeEditHighPrice} required />
                            </div>
                            </div>
                            <div class="col-sm-3">
                            <div className="form-group">
                                <label>Final Price:</label>
                                <input type="number" className="form-control" placeholder="Final Price" id="final_price" name="edit_final_price" value={this.state.edit_final_price} onChange={this.onChangeEditFinalPrice} required />
                            </div>
                            </div> */}
                        
                        </div>


                        {/* <div class="row"> */}
                      
                        {/* <div class="col-sm-3">
                            <div className="form-group">
                                <label>Auction Type:</label>
                                 <select className="form-control" placeholder="Auction Type" id="auction_type" name="edit_auction_type" value={this.state.edit_auction_type} onChange={this.onChangeEditAuctionType} required >
                                  <option value="">Select Auction Type:</option>
                                   <option value="online">Online</option>
                                   <option value="offline">Offline</option>
                              </select>
                               </div>
                          </div> */}
                         
                        
                        
                        {/* <div class="col-sm-3">
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" className="form-control" placeholder="End Date Time" id="end_date_time" name="edit_end_date_time" value={this.state.edit_end_date_time} onChange={this.onChangeEditEndDateTime} required />
                            </div>
                          </div>
                        */}
                       {/* </div> */}

                       
                         <div class="row">
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Video:</label>
                                <input type="file" className="form-control edit_video" id="video" name="edit_video" onChange={this.onChangeEditVideo} />
                            </div>
                            </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" placeholder="Start Date Time" id="start_date_time" name="edit_start_date_time" value={this.state.edit_start_date_time} onChange={this.onChangeEditStartDateTime} required />
                            </div>
                          </div>
                          { !this.state.other_edit_show &&
                          <div class="col-sm-3">
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" className="form-control" placeholder="End Date Time" id="end_date_time" name="edit_end_date_time" value={this.state.edit_end_date_time} onChange={this.onChangeEditEndDateTime} required />
                            </div>
                          </div>
                          }
                          
                        </div>
<div class="row">
{ this.state.other_edit_show &&
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>From Time:</label>
                                <input type="time" className="form-control" placeholder="Start Date Time" id="edit_start_time" name="edit_start_time" value={this.state.edit_start_time} onChange={this.onChangeEditStartTime} required />
                            </div>
                          </div>
                          }

                          { this.state.other_edit_show &&
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>To Time:</label>
                                <input type="time" className="form-control" placeholder="Start Date Time" id="edit_end_time" name="edit_end_time" value={this.state.edit_end_time} onChange={this.onChangeEditEndTime} required />
                            </div>
                          </div>
                        }
                        
                        { this.state.other_edit_show &&
                             <div class="col-sm-3">
                            <div className="form-group">
                                <label>Meeting Link</label>
                                <input type="text" className="form-control " placeholder="Meeting Link" id="youtube_link" name="edit_youtube_link" value={this.state.edit_youtube_link} onChange={this.onChangeEditYoutubeLink}  />
                            </div>
                            </div>
                        }
                            

</div>
                        <div class="row">
                         <div class="col-sm-3">
                            <div className="form-group">
                                <label>Product Images:</label>
                                <input type="file" className="form-control edit_product_img" id="product_img" name="edit_product_img" onChange={this.onChangeEditProductImage} multiple  />
                            </div>
                          </div>
                           <div class="col-sm-3">
                            <div className="form-group">
                                <label>Description:</label>
                                <input type="text" className="form-control" placeholder="Description" id="description" name="edit_description" value={this.state.edit_description} onChange={this.onChangeEditDescription} required />
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
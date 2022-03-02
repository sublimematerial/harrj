import React,{Component,Suspense,lazy} from 'react';

import { connect } from "react-redux";
//import { Route, Router, BrowserRouter, Switch,Redirect,useHistory,withRouter,Link } from 'react-router-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


/*import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min.js";*/

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

//Admin Section
const LoginAdmin =lazy(() =>import ('./components/admin/Login'));
const LoginWebsite =lazy(() =>import ('./components/website/Login'));
const DashboardAdmin =lazy(() =>import ('./components/admin/Dashboard'));
// const TicketsAdmin =lazy(() =>import ('./components/admin/Tickets'));

const CategoryList =lazy(() =>import ('./components/admin/CategoryList'));

const SubCategoryList =lazy(() =>import ('./components/admin/SubCategoryList'));
const BannerList =lazy(() =>import ('./components/admin/BannerList'));
const BrandList =lazy(() =>import ('./components/admin/BrandList'));
const CountryList =lazy(() =>import ('./components/admin/CountryList'));
const ModelList =lazy(() =>import ('./components/admin/ModelList'));
const StateList =lazy(() =>import ('./components/admin/StateList'));
const CityList =lazy(() =>import ('./components/admin/CityList'));
const ProductList =lazy(() =>import ('./components/admin/ProductList'));
const ClientList =lazy(() =>import ('./components/admin/ClientList'));
const UserList =lazy(() =>import ('./components/admin/UserList'));






//User Section
const LoginUser =lazy(() =>import ('./components/user/Login'));
const DashboardUser =lazy(() =>import ('./components/user/Dashboard'));

// const TaskUser =lazy(() =>import ('./components/user/TaskList'));
// const SubTaskUser =lazy(() =>import ('./components/user/SubTaskList'));

// const MaterialCategoryUser =lazy(() =>import ('./components/user/MaterialCategoryList'));
// const MaterialInputTypeUser =lazy(() =>import ('./components/user/MaterialInputTypeList'));

// const TeamUser =lazy(() =>import ('./components/user/TeamList'));
// const ProfileUser =lazy(() =>import ('./components/user/ProfileList'));
// const DesignationUser =lazy(() =>import ('./components/user/DesignationList'));
// const UserUser =lazy(() =>import ('./components/user/UserList'));


// const LiftSpecificationsUser =lazy(() =>import ('./components/user/LiftSpecificationsList'));

// const ClientListUser =lazy(() =>import ('./components/user/ClientList'));
// const VendorListUser =lazy(() =>import ('./components/user/VendorList'));
// const VendorItemsListUser =lazy(() =>import ('./components/user/VendorItemsList'));

// const TicketsUser =lazy(() =>import ('./components/user/Tickets'));
// const TicketsListUser =lazy(() =>import ('./components/user/TicketsList'));
// const TicketInfoUser =lazy(() =>import ('./components/user/TicketInfo'));
// const TicketAddUser =lazy(() =>import ('./components/user/TicketAdd'));
// const TicketAddNewUser =lazy(() =>import ('./components/user/TicketAddNew'));

// const ProposalUser =lazy(() =>import ('./components/user/Proposal'));
// const ProposalListUser =lazy(() =>import ('./components/user/ProposalList'));
// const ProposalInfoUser =lazy(() =>import ('./components/user/ProposalInfo'));
// const ProposalAddUser =lazy(() =>import ('./components/user/ProposalAdd'));
// const ProposalAddNewUser =lazy(() =>import ('./components/user/ProposalAddNew'));
// const ProposalAddOldUser =lazy(() =>import ('./components/user/ProposalAddOld'));

// const ProposalAddNew =lazy(() =>import ('./components/user/ProposalAddNew'));
// const ProposalAddNewOrderConfrimation =lazy(() =>import ('./components/user/ProposalAddNewOrderConfrimation'));
// const ProposalAddNewInternalOrder =lazy(() =>import ('./components/user/ProposalAddNewInternalOrder'));

// const ArchitectureList =lazy(() =>import ('./components/user/ArchitectureList'));




//website URLs
const WebHome =lazy(() =>import ('./components/website/Home'));
const WebMyAd =lazy(() =>import ('./components/website/MyAds'));
const WebMyBid =lazy(() =>import ('./components/website/MyBids'));
const WebCreateAd =lazy(() =>import ('./components/website/CreateAds'));
// const WebHome =lazy(() =>import ('./components/website/Imageslider'));
const WebProductInfo =lazy(() =>import ('./components/website/ProductInfo'));
const WebLiveAuction =lazy(() =>import ('./components/website/LiveAuction'));
const WebNormalAuction =lazy(() =>import ('./components/website/NormalAuction'));




class App extends Component {
  render() {
    //const { currentUser } = this.state;

    return (
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" component={LoginUser} />

            <Route exact path="/admin/login" component={LoginAdmin} />
            <Route exact path="/web/login" component={LoginWebsite} />

            
            <Route exact path="/admin/dashboard" component={DashboardAdmin} />

            <Route exact path="/admin/category/list" component={CategoryList} />
            <Route exact path="/admin/subcategory/list" component={SubCategoryList} />
            <Route exact path="/admin/banner/list" component={BannerList} />
            <Route exact path="/admin/brand/list" component={BrandList} />
            <Route exact path="/admin/model/list" component={ModelList} />
            

            <Route exact path="/admin/country/list" component={CountryList} />
            <Route exact path="/admin/state/list" component={StateList} />
            <Route exact path="/admin/city/list" component={CityList} />
            <Route exact path="/admin/product/list" component={ProductList} />
            <Route exact path="/admin/client/list" component={ClientList} />
            <Route exact path="/admin/user/list" component={UserList} />





            {/*website Path*/}
            <Route exact path="/web" component={WebHome} />
            <Route exact path="/web/myads" component={WebMyAd} />
            <Route exact path="/web/mybids" component={WebMyBid} />
            <Route exact path="/web/createads" component={WebCreateAd} />
            
            
            <Route exact path="/web/product/info/:product_id" component={WebProductInfo} />
            <Route exact path="/web/live_auction" component={WebLiveAuction} />
            <Route exact path="/web/normal_auction" component={WebNormalAuction} />

            
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
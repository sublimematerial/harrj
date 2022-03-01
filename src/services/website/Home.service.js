import axios from "axios";
import authHeader from "./../auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class HomeService {

  BannerList() {
    return axios
      .get(API_URL + "admin/banner/list")
      .then((response) => {
        return response.data;
      });
  }
 
  CountryList() {
    console.log("serve country 45")
    return axios
    .get(API_URL + "admin/country/list")
    .then((response) => {
     
      return response.data;
    });
   
  }
 
  CountryCityList(country_id) {
    const insertData = new FormData();
    insertData.set('country_id', country_id);

    return axios
      .post(API_URL + "admin/country/country_city_list", insertData )
      .then((response) => {
        return response.data;
      });
  }
  CategoryList() {
    return axios
      .get(API_URL + "admin/category/list")
      .then((response) => {
        return response.data;
      });
  }

  BrandList(category_id) {

    
console.log("cat id recd is ")
console.log(category_id)
    
    const insertData = new FormData();
 
    insertData.set('category_id', category_id);
  return axios
  .post(API_URL + "admin/category/cat_brand_list",insertData)
  .then((response) => {
    return response.data;
  });
      // .get(API_URL + "admin/brand/list")
      // .then((response) => {
      //   return response.data;
      // });
  }
  BrandModelLst(brand_id){
    const insertData = new FormData();
   
      insertData.set('brand_id', brand_id);
    return axios
    .post(API_URL + "admin/brand/brand_model_list",insertData)
    .then((response) => {
      return response.data;
    });
   
  }
  SubCategoryList(category_id) {
    return axios
      .get(API_URL + "admin/sub_category/list_by_category_id?category_id="+category_id)
      .then((response) => {
        return response.data;
      });
  }
 ProductList(auction_type) {
    return axios
      .get(API_URL + "admin/product/list?auction_type="+auction_type)
      .then((response) => {
        return response.data;
      });
  }
}

export default new HomeService();
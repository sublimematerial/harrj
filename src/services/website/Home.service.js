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
  SubCategoryListByCategory(category_id) {
    return axios
      .get(API_URL + "admin/sub_category/list_by_category_id?category_id="+category_id)
      .then((response) => {
        return response.data;
      });
  }

  SubCatBrandList(subcategory_id) {
    const insertData = new FormData();
 
    insertData.set('sub_category_id', subcategory_id);
    return axios
      .post(API_URL + "admin/brand/subcat_brand_list",insertData)
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
  ProductAdd(title,name,description,keywords,category_id,sub_category_id,brand_id,model_id,country_id,city_id,start_date_time,end_date_time,
    auction_type,starting_price,high_price,final_price,refund,refund_days,youtube_link,product_img,video,start_time,end_time) {

    var user_id = 1;

    const insertData = new FormData();
    insertData.set('title', title);
    insertData.set('name', name);
    insertData.set('description', description);
    insertData.set('keywords', keywords);
    insertData.set('category_id', category_id);
    insertData.set('sub_category_id', sub_category_id);
    insertData.set('start_date_time', start_date_time);
    insertData.set('end_date_time', end_date_time);
    insertData.set('starting_price', starting_price);
    insertData.set('high_price', high_price);
    insertData.set('final_price', final_price);
    insertData.set('refund', refund);
    insertData.set('refund_days', refund_days);
    insertData.set('youtube_link', youtube_link);
    insertData.set('auction_type', auction_type);
    insertData.set('start_time', start_time);
    insertData.set('end_time', end_time);
    insertData.set('brand_id', brand_id);
    insertData.set('model_id', model_id);
    insertData.set('country_id', country_id);
    insertData.set('city_id', city_id);



    if(product_img && typeof product_img !=="undefined" && product_img.length>0){
      for (let p = 0; p < product_img.length; p++) {
        insertData.append('product_img', product_img[p]);
      }
    }
     if(video && typeof video !=="undefined" && video.length>0){
      for (let p = 0; p < video.length; p++) {
        insertData.append('video', video[p]);
      }
    }

    return axios
      .post(API_URL + "admin/product/add", insertData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new HomeService();
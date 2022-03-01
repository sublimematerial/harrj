import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class subcategoryService {
  SubCategoryAdd(category_id, sub_category_name,sub_category_img) {
    const insertData = new FormData();
    insertData.set('category_id', category_id);
    insertData.set('sub_category_name', sub_category_name);
    insertData.set('sub_category_img', sub_category_img[0]);

    return axios
      .post(API_URL + "admin/sub_category/add", insertData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  SubCategoryList() {
    return axios
      .get(API_URL + "admin/sub_category/list", { headers: authHeader() })
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

  SubCategoryInfo(sub_category_id) {
    return axios
      .post(API_URL + "admin/sub_category/getinfo", { sub_category_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  SubCategoryUpdate(sub_category_id, category_id, sub_category_name, sub_category_img) {
    const updateData = new FormData();
    updateData.set('sub_category_id', sub_category_id);
    updateData.set('category_id', category_id);
    updateData.set('sub_category_name', sub_category_name);
    updateData.set('sub_category_img', sub_category_img[0]);


    return axios
      .post(API_URL + "admin/sub_category/update", updateData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  
  SubCategoryDelete(sub_category_id) {
    return axios
      .post(API_URL + "admin/sub_category/delete", { sub_category_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new subcategoryService();
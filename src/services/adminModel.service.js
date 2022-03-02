import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class modelService {
  ModelAdd(category_id,sub_category_id,brand_id,model_name,model_desc) {
    const insertData = new FormData();
    insertData.set('category_id', category_id);
    insertData.set('sub_category_id', sub_category_id);
    insertData.set('brand_id', brand_id);
    insertData.set('model_name', model_name);
    insertData.set('model_desc', model_desc);

    return axios
      .post(API_URL + "admin/model/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  ModelList() {
    return axios
      .get(API_URL + "admin/model/list")
      .then((response) => {
        return response.data;
      });
  }

  ModelInfo(model_id) {
    return axios
      .post(API_URL + "admin/model/getinfo", { model_id })
      .then((response) => {
        return response.data;
      });
  }

  ModelUpdate(model_id,category_id,sub_category_id,brand_id, model_name,model_desc) {
    const updateData = new FormData();
    updateData.set('model_id', model_id);
    updateData.set('category_id', category_id);
    updateData.set('sub_category_id', sub_category_id);
    updateData.set('brand_id', brand_id);
    updateData.set('model_name', model_name);
    updateData.set('model_desc', model_desc);

    return axios
      .post(API_URL + "admin/model/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  ModelDelete(model_id) {
    return axios
      .post(API_URL + "admin/model/delete", { model_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new modelService();
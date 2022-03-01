import axios from "axios";
import authHeader from "./../auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class ProductInfoService {

 ProductInfo(product_id) {

    return axios
      .post(API_URL + "admin/product/getinfo", { product_id })
      .then((response) => {
        return response.data;
      });
  }

}

export default new ProductInfoService();
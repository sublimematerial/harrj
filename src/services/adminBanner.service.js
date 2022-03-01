import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class bannerService {
  BannerAdd(banner_img) {
    const insertData = new FormData();
    insertData.set('banner_img', banner_img[0]);

    return axios
      .post(API_URL + "admin/banner/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  BannerList() {
    return axios
      .get(API_URL + "admin/banner/list")
      .then((response) => {
        return response.data;
      });
  }

  BannerInfo(banner_id) {
    return axios
      .post(API_URL + "admin/banner/getinfo", { banner_id })
      .then((response) => {
        return response.data;
      });
  }

  BannerUpdate(banner_id, banner_img) {
    const updateData = new FormData();
    updateData.set('banner_id', banner_id);
    updateData.set('banner_img', banner_img[0]);

    return axios
      .post(API_URL + "admin/banner/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  BannerDelete(banner_id) {
    return axios
      .post(API_URL + "admin/banner/delete", { banner_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new bannerService();
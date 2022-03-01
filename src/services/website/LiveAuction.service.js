import axios from "axios";
import authHeader from "./../auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class LiveAuctionService {

 LiveListFilter(auction_type,category_id,sub_category_id,year,sort_by) {
    const insertData = new FormData();
    console.log("category_id")
    console.log(category_id)

  if(category_id && typeof category_id !=="undefined" && category_id.length>0){
      for (var i = 0; i < category_id.length; i++) {
        insertData.append('category_id', category_id[i]);
      }
    }
     if(sub_category_id && typeof sub_category_id !=="undefined" && sub_category_id.length>0){
      for (var i = 0; i < sub_category_id.length; i++) {
        insertData.append('sub_category_id', sub_category_id[i]);
      }
    } if(year && typeof year !=="undefined" && year.length>0){
      for (var i = 0; i < year.length; i++) {
        insertData.append('year', year[i]);
      }
    }
    return axios
      .get(API_URL + "admin/product/list?auction_type="+auction_type+"&category_id="+category_id+"&sub_category_id="+sub_category_id+"&year="+year+"&sort_by="+sort_by)
      .then((response) => {
        return response.data;
      });
  }
}

export default new LiveAuctionService();
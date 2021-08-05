import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types";

export default {
  addCart(content, payload) {
    //1、判断商品是否已添加
    let oldProduct = content.state.cartList.find(item => item.iid === payload.iid);
    //2、将购物车商品进行相应改变(已存在数量加一，未存在添加)
    if (oldProduct) {
      content.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      content.commit(ADD_TO_CART, payload)
    }

  }
}

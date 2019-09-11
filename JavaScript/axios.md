
axios 

API:  

```js
axios.all([getProvinces(), getProducts()])
  .then(axios.spread(function (provinces, products) {
    if(provinces.message == 'ok'){
      ts.provinceList = [{
          code: 'all',
          name: '全部'
        }];
      ts.provinceList = ts.provinceList.concat(provinces.result.p_list);
    }
    if(products.message == 'ok'){
        ts.productList = [{
          code: 'all',
          name: '全部'
        }];
        ts.productList = ts.productList.concat(products.result.ap_list);
        }
  }));


```




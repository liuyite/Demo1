$(() => {
  // console.log(location.search);
  //获取url的id的值
  let id = location.search.substring(4);
  //查找phoneData数组中匹配的对象
  let t = phoneData.find(function(e) {
    return e.pID == id;
  });
  // console.log(t);
  $(".sku-name").text(t.name);
  $(".summary-price .dd em").text("￥" + t.price);
  $(".preview-img img").attr("src", t.imgSrc);
  //添加数量功能
  $(".add").on("click", function() {
    let content1 = parseInt($(".choose-number").val());
    content1++;
    $(".choose-number").val(content1);
    $(".reduce").removeClass("disabled");
  });
  //减少数量功能
  $(".reduce").on("click", function() {
    let content = parseInt($(".choose-number").val());
    if (content == 1) {
      return;
    }
    content--;
    $(".choose-number").val(content);
    if (content == 1) {
      $(".reduce ").addClass("disabled");
    }
  });
  //当点击添加购物车按钮。就将数据储存在本地localstorage中
  $(".addshopcar").on("click", function() {
    let arr = kits.onLoadData("localArrData");
    let obj = {
      pID: id,
      name: t.name,
      imgSrc: t.imgSrc,
      price: t.price,
      left: t.left,
      percent: t.percent,
      number: parseInt($(".choose-number").val()) 
    };
    let isExit = arr.find(e=>{
        return e.pID === id;
      });
      if(!isExit){
        arr.push(obj);
      }
      else{
        isExit.number += obj.number;
      }
    kits.onSaveData("localArrData", arr);
    location.href = 'cart.html';
  });
});

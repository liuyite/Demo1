$(() => {
  //计算总和
  // function totalAdd(){
  //     let totalCount = 0 ;
  //     let totalPrice = 0 ;
  //     arr.forEach((e,i) =>{
  //         totalCount += e.number ;
  //         totalPrice += e.price * e.number ;
  //         $('.total-of .selected').text(totalCount);
  //         $('.total-of .total-money').text(totalPrice);
  //     })
  // }

  function totalAdd() {
    let totalCount = 0;
    let totalPrice = 0;
    //选择被勾选的商品
    $(".item-list input[type=checkbox]:checked").each((i, e) => {
      //获取到当前选中的商品的ID
      let id = $(e)
        .parents(".item")
        .attr("data-id");
      // 遍历数组找到arr中对应的元素对象，将对应的数字和价格进行相加
      arr.forEach((e, i) => {
        if (id == e.pID) {
          totalCount += e.number;
          totalPrice += e.price * e.number;
        }
      });
    });
    $(".total-of .selected").text(totalCount);
    $(".total-of .total-money").text(totalPrice);
  }

  //初始化购物车
  let html = "";
  let arr = kits.onLoadData("localArrData");
  if (arr.length != 0) {
    arr.forEach(e => {
      html += `<div class="item" data-id="${e.pID}">
        <div class="row">
          <div class="cell col-1 row">
            <div class="cell col-1">
              <input type="checkbox" class="item-ck" checked="">
            </div>
            <div class="cell col-4">
              <img src="${e.imgSrc}" alt="">
            </div>
          </div>
          <div class="cell col-4 row">
            <div class="item-name">${e.name}</div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="price">${e.price}</em>
          </div>
          <div class="cell col-1 tc lh70">
            <div class="item-count">
              <a href="javascript:void(0);" class="reduce fl">-</a>
              <input autocomplete="off" type="text" class="number fl" value="${
                e.number
              }">
              <a href="javascript:void(0);" class="add fl">+</a>
            </div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="computed">${e.number * e.price}</em>
          </div>
          <div class="cell col-1">
            <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
          </div>
        </div>
      </div> `;
    });
    $(".item-list").html(html);
    //把空空如也隐藏
    $(".empty-tip").hide();
    // 把表头+总计显示出来
    $(".cart-header").removeClass("hidden");
    $(".total-of").removeClass("hidden");
  }

  //添加多选框的全选功能
  $(".pick-all").on("click", function() {
    let status = $(this).prop("checked");
    $(".item-list input").prop("checked", status);
    $(".pick-all").prop("checked", status);
    totalAdd();
  });

  $(".item-list input").on("click", function() {
    // 判断是否全选 - 如果选中的个数和所有的个数是一致的，就是全选了
    let isAll = $(".item-ck").length === $(".item-ck:checked").length;
    $(".pick-all").prop("checked", isAll);
    totalAdd();
  });

  //计算总和
  totalAdd();

  //通过事件委托文本框的添加和减少功能
  $(".item").on("click", ".item-count .add", function(e) {
    //   console.log(e.target)
    //获取输入框的值
    let textNumber = $(e.target)
      .siblings("input")
      .val();
    textNumber++;
    //判断输入框的值是否小于等于1
    if (textNumber > 1) {
      $(e.target)
        .siblings(".reduce")
        .removeClass("disabled");
    }
    //更新文本宽的值
    $(e.target)
      .siblings("input")
      .val(textNumber);

    //同步本地存储的数据
    let id = $(e.target)
      .parents(".item")
      .attr("data-id");
    //通过id遍历找到选择的本地数据
    let obj = arr.find(e => {
      return e.pID == id;
    });
    //   console.log(obj)
    // 更改本地数据的数量number
    obj.number = textNumber;
    //更新小计栏中的数据
    $(e.target)
      .parents(".item")
      .find(".computed")
      .text(textNumber * obj.price);
    //更新本地数据
    kits.onSaveData("localArrData", arr);
    //更新总计栏的数据
    totalAdd();
  });
  $(".item").on("click", ".item-count .reduce", function(e) {
    let textNumber = $(e.target)
      .siblings("input")
      .val();
    if (textNumber == 1) {
      return;
    }
    textNumber--;
    if (textNumber == 1) {
      $(e.target).addClass("disabled");
    }
    $(e.target)
      .siblings("input")
      .val(textNumber);
    //同步本地存储的数据
    let id = $(e.target)
      .parents(".item")
      .attr("data-id");
    let obj = arr.find(e => {
      return e.pID == id;
    });
    //   console.log(obj)
    obj.number = textNumber;
    $(e.target)
      .parents(".item")
      .find(".computed")
      .text(textNumber * obj.price);
    kits.onSaveData("localArrData", arr);
    totalAdd();
  });

  //添加删除功能
  $(".item-list").on("click", ".item-del", function() {
    let _this = $(this);
    // $(this).parents('.item').remove();

    //用jQuery UI来制作
    $("#dialog-confirm").dialog({
      resizable: false,
      height: 140,
      modal: true,
      buttons: {
        确认: function() {
          $(this).dialog("close");
          // 把对应的商品删除
          // 把对应的结构移除
          // console.log(_this);
          $(_this)
            .parents(".item")
            .remove();
          // 把本地数据移除
          // 我们现在需要根据id获取本地存储里面的数据
          let id = parseInt(
            $(_this)
              .parents(".item")
              .attr("data-id")
          );
          console.log(id);
          // 把对应id的数据读取出来
          // let obj = arr.find(e => {
          //   return e.pID === id;
          // });
          // // console.log(obj);
          // // 把对应的id的数据从本地存储里面移除
          // // arr.splice(从哪里开始删除,总共删除多少个);
          // let index = arr.indexOf(obj);
          // console.log(index);

          // 在h5里面的，数组新增了一个方法，获取满足条件的元素的索引
          let index = arr.findIndex(e => {
            return e.pID === id;
          });
          // console.log(index);

          arr.splice(index, 1);
          //更新总计栏的数据
          totalAdd();
          // 把数据覆盖回本地
          kits.onSaveData("localArrData", arr);
        },
        取消: function() {
          $(this).dialog("close");
        }
      }
    });
  });
});

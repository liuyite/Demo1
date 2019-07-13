$(() => {
  //初始化购物车
  let html = "";
  let arr = kits.onLoadData("localArrData");
  if (arr.length != 0) {
    arr.forEach(e => {
      html += `<div class="item" data-id="6">
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
  $('.pick-all').on('click' ,function(){
    let status = $(this).prop('checked');
    $('.item-list input').prop('checked',status);
    $('.pick-all').prop('checked',status);



  });

  $('.item-list input').on('click', function () {
    // 判断是否全选 - 如果选中的个数和所有的个数是一致的，就是全选了
    let isAll = $('.item-ck').length === $('.item-ck:checked').length;
    $('.pick-all').prop('checked', isAll);
  })

  //计算总和
  let totalCount = 0 ;
  let totalPrice = 0 ;
  arr.forEach((e,i) =>{
      totalCount += e.number ;
      totalPrice += e.price * e.number ;
      $('.total-of .selected').text(totalCount);
      $('.total-of .total-money').text(totalPrice);
  })


});

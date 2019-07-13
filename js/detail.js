// console.log(location.search);
let id = location.search.substring(4);
// console.log(id)
let t = phoneData.find(function(e) {
  return e.pID == id;
});
// console.log(t);
$(".sku-name").text(t.name);
$(".summary-price .dd em").text("￥" + t.price);
$(".preview-img img").attr("src", t.imgSrc);
$('.add').on('click' , function(){
    let content1 = parseInt($('.choose-number').val());
    content1 ++ ;
    $('.choose-number').val(content1);
    $('.reduce').removeClass('disabled');
})
$('.reduce').on('click' , function(){
    let content = parseInt($('.choose-number').val());
    if(content == 1){
       return;
        }
    content -- ;
    $('.choose-number').val(content);
    if(content == 1){
        $('.reduce ').addClass('disabled');
    }
})
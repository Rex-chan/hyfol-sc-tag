/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
/*回到顶部*/
~function (){
  let gotop=document.querySelector('#gotop');
  function throttle(method,delay){
    var timer=null;
    return function(){
      var context=this;
      var args=arguments;
      clearTimeout(timer);
      timer=setTimeout(function(){
        method.apply(context,args);
      },delay);
    }
  }
  function  show(){
    if(window.scrollY>1500){
      gotop.style.display="block";
    }
    if(window.scrollY<=1500){
      gotop.style.display="none";
    }
  }
  window.addEventListener('scroll',throttle(show,500))
  gotop.onclick=function () {
    let end=0;
    let start=window.scrollY;
    let step;
    let timer=setInterval(()=>{
     if(start>10){
       end=start-start/10
       window.scrollTo(0,end)
       start=end
     }else{
       window.scrollTo(0,0)
       clearInterval(timer);
       timer=null
     }
    },10);
  }
}()

/*购物车观察变化，更新是否显示赠送抽奖项链*/
~function () {

  function callback(){
    let show=sessionStorage.getItem('luckyDog');
    if(show==1){
      document.querySelectorAll('.car_lucky').forEach(item=>{item.style.display='block';})
    }
  }
  callback()
  let sections= document.querySelector("#mini-cart");
  let sections2= document.querySelector(".cart-wrapper__inner-inner");
  const observer=new MutationObserver(callback)
  observer.observe(sections,{childList:true,subtree:true})
}()


'use strict';
var gtCurPage = window.User.clickStream;
var userid = "";
var prodholder = new Array();
var customerNo = window.User.customerNo;
if (window.User.isCustomerAuthenticated != false || window.User.isRegistered == true) {
	userid = window.User.id;
}
var emailID = window.emailID;
var emailID_SHA1 = window.emailID_SHA1;

function filterArrDt(arr) {
        var finishedArr = new Array();

        arr.forEach(function (o) {
           if (typeof o === "object") {
               var finishedObj = new Object();

               Object.keys(o).forEach(function (k) {
                   if (!o[k]) { return; }
                   finishedObj[k] = o[k];
               });

               if (Object.keys(finishedObj).length > 0) {
                   finishedArr.push(finishedObj);
               }
           } else if (!!o) {
               finishedArr.push(o);
           }
        });

        return finishedArr;
}

function filterDt(o) {
        var finishedObj = {};


        Object.keys(o).forEach(function (k) {
           if (!o[k]) { return; }
           else if (o[k] instanceof Array) {
              finishedObj[k] = filterArrDt(o[k]);
           } else {
              finishedObj[k] = o[k];
           }
        }, this);

        return finishedObj;
}
function pushDtLayer(o) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(filterDt(o));
    //alert(JSON.stringify(util.filterObj(o)));
}
function DtgetPageCategory() {
    //return window.pageContext.title || "Content"; ###### this throws product name
    if (searchItems.error == "Page Not Found") {
        return "Error Page";
    }
    switch(gtCurPage)   {
    case 'product-showincategory':
    case 'product-show':
        return "Product Page";
    case 'search-show':
    case 'search-getsuggestions':
        if(!searchItems.rs55){
            return "No Search Results Page";
        }else{
        	if(typeof searchItems.search != undefined){
        		if(searchItems.search){
        			return "Site Search";
        		}else if (window.location.href.indexOf("store-locator") > -1) {
                    return "Store Locator";
                }else if (window.User.isContent) {
                    return 'Content';
                }else{
        			return "Category Page";
        		}
        	}else{
        		return "Category Page";
        	}
        }
    case 'search-showcontent':
    	return "Category Page";
    case 'home-show':
    case 'default-start':
        return "Homepage";
    case 'cart-show':
    case 'cart-addtowishlist':
        return "Cart Page";
    case 'customerservice-contactus':
        return "Contact Customer Service";
    case 'customerservice-concierge':
        return "Ask An Expert";
    case 'account-startregister':
    case 'beautystation-show':
    case 'account-editprofile' :
    case 'address-list':
    case 'paymentinstruments-list':
    case 'wishlist-showlists':
    case 'wishlist-show':
    case 'beautystation-ordersandreplenishments':
    case 'orderreplenishment-show':
    case 'beautystation-configurationpreferences':
    case 'beautystation-shippingbilling': 
        return "My Account";
    case 'login-show':
        return "Login Page";
    case 'coshipping-start':
    case 'coshipping-singleshipping':
    case 'cobilling-start':
    case 'cobilling-billing':
    case 'cocustomer-start':
    case 'cosinglepagecheckout-start':
        return "Checkout";
    case 'giftcert-purchase':
        return "Gift Card";
    case 'cocustomer-loginform':
        return "Customer Login";
    case 'login-checkorder':
        return "Check Your Order";
    case 'search-brandify':
        return "Store Locator";
    case 'cosummary-submit':
        return "Checkout";
    case 'page-show':
        var pageurl = window.location.href;
        if(pageurl.indexOf("customer-service.html") > 0){
            return "Customer Service";
        }else if(pageurl.indexOf("contact-us.html") > 0){
            return "Ask a Question";
        }else if(pageurl.indexOf("faqs.html") > 0){
            return "FAQ";
        }else if(pageurl.indexOf("concierge-form.html") > 0){
            return "Ask An Expert";
        }else if(pageurl.indexOf("replenishment.html") > 0){
            return "Replenishment";
        }else if(pageurl.indexOf("privacy.html") > 0){
            return "Privacy Policy";
        }else if(pageurl.indexOf("terms.html") > 0){
            return "Terms and Condition";
        }else if(pageurl.indexOf("returns-and-exchanges.html") > 0){
            return "Returns and Exchange";
        }else if(pageurl.indexOf("staticcountryselect.html") > 0){
            return "Select Country";
        }else{
            var pagecontext = "${pageContext.title}";
            if(pagecontext == "Consultations"){
                return "Consultation Tool";
            }else{
                return "Content";
            }
        }
    case 'customerservice-submit':
        return "Ask An Expert";
    case 'home-errornotfound':
        return "Error Page";
    case 'login-loginform':
        return "Login Page";
    case 'gatedlandingpage-show':
        return "Gated Landing Page";
    case 'compare-show':
        return 'Compare Tool Page';
    case 'cart-submitform':
        return 'Cart Page';
    default:
        return "Content";
    }
}
// Specific for checkout and cart page only
function CouponSubCategory(){
    switch(gtCurPage){
    case 'cart-show':
        return "Cart"
    case 'coshipping-start':
        return "Shipping"
    case 'coshipping-singleshipping':
    case 'cobilling-removegiftcertificate':
    case 'cobilling-start':
        return "Payment"
    case 'cobilling-billing':
        if(basketConfirmation != null){
            if(basketConfirmation.checkoutErrorMessage){
                return "Payment"
            }else{
                return "Review"
            }
        }else{
            return "Review"
        }
    case 'cosummary-submit':
        if(typeof basketConfirmation != "undefined" && basketConfirmation != null){
            if(basketConfirmation.checkoutErrorMessage){
                return "Review";
            }
        }else{
            return "Order Confirmation";
        }

        break;
    case 'cocustomer-start':
        return "Checkout Login";
    case 'cosinglepagecheckout-start':
        let isCheckoutStep = document.querySelectorAll('.checkout-progress-container .step.active');
        return isCheckoutStep.length ? "Review" : "Shipping";
    case 'account-editprofile' :
        return "Profile"
    case 'beautystation-shippingbilling':
        return "Address Book"
    case 'paymentinstruments-list':
        return "Payment Methods"
    case 'wishlist-showlists':
    case "wishlist-show":
        return "Wishlist"
    case 'beautystation-ordersandreplenishments':
        return "Order History"
    case 'orderreplenishment-show':
        return "Replenishment"
    case 'account-startregister':
        return "Create Account"
    case 'tutorial-show':
        return "Tutorial Page"
    default:
        break;
    }
}

function DtgetPageSubcategory() {
    return window.pageContext ? window.pageContext.title : 'Content';
}
function Dtgethashmap(paramName) {
    var output = "";

    var hashParams = window.location.hash.split("&");
    for (var i = 0; i < hashParams.length; i++) {
        if (hashParams[i].indexOf(paramName) > - 1) {
            output = hashParams[i].split("=")[1];
        }
    }

    return output;
}
function DtgetLanguage() {
    if (window.location.href.indexOf("zh.shiseido") >= 0) {
        return "Chinese";
    } else if (window.location.href.indexOf("es.shiseido") >= 0) {
        return "Spanish";
    } else {
        return "English";
    }
}
function DtisMobile() {
    return $(window).width() <= 640;
}
function DtgetPageError() {
    var $errorMsg = $(".error-form");
    if ($errorMsg.length === 0) {
        return "";
    }

    return $errorMsg.html().trim();
}
function Dtgetsrule() {
    var str = "";
    var params = "";
    if(window.location.href.split("?").length > 1){
        var urlparam = window.location.href.split("?")[1];
        if(urlparam.indexOf("&") > -1){
            params = urlparam.split("&");
        }else{
            params = urlparam;
        }
        var length = params.length;
        var b = length / 2;

        for(var i =0;i<b;i++){
            if(params[i].indexOf("srule") > -1){
             str = params[i].split("=")[1];
            }
        }
    }
    return str;
}
//Specific for PDP
function DtgetProductCategory() {
    return $('.de-breadcrumb').find('li:eq(1)').text().trim();
}
//Specific for PDP
function DtgetProductsubCategory() {
    return $('.de-breadcrumb').find('li:eq(2)').text().trim();
}
// Specific for PDP
function DtgetProductsubsubCategory() {
    return $('.de-breadcrumb').find('li:eq(3)').text().trim();
}
function Dtgetdropdown() {
    var str = "";
    if(window.location.href.split("?").length > 1){
        var urlparam;
        if(window.location.href.split("?")[1].indexOf("&")>-1){
            urlparam = window.location.href.split("?")[1].split("&");
            var length = urlparam.length;
            var prefnval,prefnkey,prefvval,prefvkey;
            for(var i =0;i<length;i++){
                var prefn = urlparam[i].indexOf("prefn");
                if(prefn > -1){
                  prefnkey = urlparam[i].split("=")[0];
                  prefnval = urlparam[i].split("=")[1];
                  console.log(prefnkey);
                  var num = prefnkey.charAt(5);
                  for(var a =0;a<length;a++){
                    var prefv = urlparam[a].indexOf("prefv");
                    prefvkey = urlparam[a].split("=")[0];
                    if(prefvkey == "prefv"+num){
                       prefvval = urlparam[a].split("=")[1];
                       str += "[" + prefnval  + ":" + prefvval  + "]";
                    }
                  }
                }
            }
        }
    }
    return str;
}

function listType(){
    return DtgetProductCategory() == "Search Results" ? "Search Results List" : "Product Category List";
}
function listName(){
    return DtgetProductCategory() == "Search Results" ? "Search" : DtgetProductCategory();
}
//Specific for PDP
function DtgetProductBrand() {
    return "Aromatherapica"; //$(".product-detail .product-brand").text();
}
function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}
function DtgetCountry() {
  var country = document.getElementById('websiteCountryCode').value;
  return country != '' ? country : 'US';
}
function Dtgeterror(){
    switch(DtgetPageCategory()) {
    case 'Checkout Page':   case 'Cart Page':
        if(basketConfirmation != null){
            return basketConfirmation.checkoutErrorMessage;
        }
        break;
    case 'General Error':
        return searchItems.error;
        break;
    case 'Error Page':
        return "Page Not Found";
        break;
    default: break;
    }
}
function receiveMessage(event){

	if (typeof event.data === "object" && event.origin === "https://hosted.where2getit.com"){
    		pushDtLayer(event.data);
	}
}
function Dtgetpage(){
	 var url = window.location.href;
	 var splittedurl = url.split("?");
	 var page = splittedurl[0].split("/");
	 return page[page.length-1]
}
function DtgetRecommendedProductStatus(productID) {
    var recoProds = sessionStorage.getItem('recommendedproducts');
    if (recoProds != null && recoProds != '') {
        var storedRecommendedProducts = JSON.parse(recoProds);
    }
    if (storedRecommendedProducts != undefined && storedRecommendedProducts.length > 0) {
        if (storedRecommendedProducts.indexOf(productID) > -1) {
            return 'recommended';
        } else {
            return 'non-recommended';
        }
    } else {
        return 'non-recommended';
    }
}
function getRRProvider() {
    var rrFlag= document.getElementById('rrprovider').getAttribute('data-rr-provider');
    return rrFlag;
}
/** Trigger the following datalayers before gtm.js container  **/

// document ready
window.addEventListener('load', function () {
    // fire when coupon is added after page load.
    if(DtgetPageCategory() == "Checkout"){
            var error = basketConfirmation.checkoutErrorMessage ? basketConfirmation.checkoutErrorMessage : $(".error-form").text().trim();
            var errormsgtype = "";
            if(error.indexOf("Payment") > -1){
                errormsgtype = "Payment";
            }else if(error.indexOf("email") > -1){
                errormsgtype = "Email";
            }else if(error.indexOf("Server") > -1){
                errormsgtype = "Server";
            }
            if(error){
                pushDtLayer({
                       "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage ? basketConfirmation.checkoutErrorMessage : $(".error-form").text().trim(),
                       "event": "transactionError",
                       "pageSubCategory": CouponSubCategory(),
                       "pageCategory": "Checkout",
                       "checkoutErrorType" : errormsgtype
                   });
            }

           if($(".gtpromochecker").length > 0){
                if(!localStorage.getItem('couponvalidation')){
                    pushDtLayer({
                        "productCoupon":$(".gtpromochecker").data("name"),
                        "event": "couponSubmission",
                        "pageSubCategory": CouponSubCategory(),
                        "pageCategory": DtgetPageCategory()
                        })
                    localStorage['couponvalidation'] = true;
                }
            }else{
                localStorage.removeItem('couponvalidation');
            }
     }


    switch (gtCurPage) {
        case 'cart-show': case 'cart-addtowishlist':

            // fire when coupon is added after page load.
            if($(".gtpromochecker").length > 0 && $(".rowcoupons").length > 0 && ($(".rowcoupons .show-for-large .bonus-item").text().trim() == "Applied")){
                if(!localStorage.getItem('couponvalidation')){
                        pushDtLayer({
                                "productCoupon": $(".gtpromochecker").data("name"),
                                "event": "couponSubmission",
                                "pageSubCategory": CouponSubCategory(),
                                "pageCategory": DtgetPageCategory()
                        })
                        localStorage['couponvalidation'] = true;
                  }
            }else if ($(".gtpromochecker").length > 0 && $(".rowcoupons").length == 0){
                localStorage['couponvalidation'] = true;

            }else{
                localStorage.removeItem('couponvalidation');
            }
            break;
       case 'account-editprofile':
       case 'beautystation-show':
            // user loggedin
            if ($('.user-info-section.row.loggedin-magic-link').length > 0) {
                pushDtLayer({
                    event: "accountLogin",
                    accountType: "Magic Link",
                    loginLocation: "Logged in from Account"
                });
            } else if(window.User.isRegistered && !localStorage.getItem('uservalidation')){
                pushDtLayer({
                        "event": "accountLogin",
                        'userId': window.User.customerNo,
                        'accountType':window.User.isExternallyAuthenticated,
                        'pageCategory': 'Account',
                        'pageSubCategory':'Profile',
                        'loginLocation': 'Logged in outside checkout'
                    });
                localStorage['uservalidation'] = true;
            }

            // Account Registration
            if(window.Resources.ACCOUNT_REGISTRATION){
                pushDtLayer({
                    "event": "accountCreation",
                    "userId": window.User.customerNo,
                    "accountType": window.User.isExternallyAuthenticated,
                    "pageCategory": "Account",
                    "pageSubCategory": "Profile",
                    'loginLocation': 'Logged in outside checkout'
                });
            }
            break;
		case 'cosinglepagecheckout-start':
            if (window.User.isRegistered && !localStorage.getItem('uservalidation')) {
                if ($('.spc-orderconfirmation-div.login-user.loggedin-magic-link').length > 0) {
                    pushDtLayer({
                        event: "accountLogin",
                        accountType: "Magic Link",
                        loginLocation: "Logged in from Account"
                    });
                } else {
                    pushDtLayer({
                        event: 'accountLogin',
                        userId: window.User.customerNo != null ? window.User.customerNo : null,
                        accountType: window.User.customerNo != null ? 'Regular' : 'Guest',
                        pageCategory: 'Checkout',
                        pageSubCategory: 'Login',
                        loginLocation: 'Logged in inside checkout'
                    });
                }
                localStorage['uservalidation'] = true;
            }

            // Account Registration
            if(window.Resources.ACCOUNT_REGISTRATION){
                pushDtLayer({
                    "event": "accountCreation",
                    "userId": window.User.customerNo != null ? window.User.customerNo : null,
                    "accountType": window.User.customerNo != null ? 'Regular' : 'Guest',
                    "pageCategory": "Checkout",
                    "pageSubCategory": "Sign Up",
                    "loginLocation": 'Logged in inside checkout'
                });
            }
			break;
        default: break;
    }
})

switch (gtCurPage) {
    case 'cart-show': case 'cart-addtowishlist':
        // car show data layer
        if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
                "eeAction": "eeCheckout",
                "checkoutStep" : "1",
                "funnelType": basketConfirmation.funnelType,
                "giftWrapping": basketConfirmation.giftWrapping,
                "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage,
                "pageCategory": "Checkout",
                "pageSubCategory": "Cart",
                'products': basketConfirmation.productLineItems
            });
        }

        break;

    case 'cocustomer-loginform' :

         if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
             pushDtLayer({
                 "eeAction": "eeCheckout",
                 "checkoutStep" : "2",
                 "funnelType": basketConfirmation.funnelType,
                 "giftWrapping": basketConfirmation.giftWrapping,
                 "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage,
                 "pageCategory": "Checkout",
                 "pageSubCategory": "Cart",
                 'products': basketConfirmation.productLineItems
             });
         }

         break;
    case 'cocustomer-start':
    // populate data layer for checkout login page
    if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
        pushDtLayer({
            eeAction: 'eeCheckout',
            checkoutStep: '2',
            funnelType: basketConfirmation.funnelType,
            giftWrapping: basketConfirmation.giftWrapping,
            checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
            pageCategory: 'Checkout',
            pageSubCategory: 'Checkout Login',
            checkoutVersion: 'One page checkout',
            products: basketConfirmation.productLineItems,
        });
    }

    break;

    case 'coshipping-start':
        // populate data layer for shipping
        if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
            "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage,
            "giftWrapping": basketConfirmation.giftWrapping,
            "pageSubCategory": "Shipping",
            "funnelType": basketConfirmation.funnelType,
            "eeAction": "eeCheckout",
            "checkoutStep" : "2",
            "productOrderType": basketConfirmation.productOrderType,
            "pageCategory": "Checkout",
            'products': basketConfirmation.productLineItems
            })
       }
    break;


    case 'cosinglepagecheckout-start':
        // populate data layer for OPC shipping
        let checkoutPageLoadStep = true;
        if (typeof spcCheckoutStep != 'undefined' && spcCheckoutStep == '4.0') {
            checkoutPageLoadStep = false;
        }
        var URLParams = window.location.search.substring(1).split('&');
        var isFourthStepPaypal = URLParams.includes('SPCPMRedirectUrlSteps=fourth') && basketConfirmation.paymentMethod.includes('PayPal')
        if (checkoutPageLoadStep && typeof basketConfirmation != 'undefined' && basketConfirmation !== null && !isFourthStepPaypal) {
            pushDtLayer({
                "eeAction": "eeCheckout",
                "checkoutStep" : "3",
                "funnelType": basketConfirmation.funnelType,
                "giftWrapping": basketConfirmation.giftWrapping,
                "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage,
                "pageCategory": 'Checkout',
                "pageSubCategory": "Shipping",
                "checkoutVersion": 'One page checkout',
                'products': basketConfirmation.productLineItems,
                'conversionLocation': window.metaCheckout,
            })
       } else if(isFourthStepPaypal) {
        if(checkoutPageLoadStep) {
            var couponCode = '';
            if(basketConfirmation.coupons){
                for (var i = 0; i < basketConfirmation.coupons.length; i++) {
                    if (basketConfirmation.coupons[i]) {
                        couponCode += basketConfirmation.coupons[i] + ',';
                    }
                }
            }
            if (couponCode.length > 0) {
                couponCode = couponCode.substr(0, couponCode.length - 1);
            }
            var pageUrl = '/us/en/checkout/order-review';

            if (User.locale != null && User.locale != undefined) {
                if (User.locale == 'en_CA') {
                    pageUrl = '/ca/en/checkout/order-review';
                } else if (User.locale == 'fr_CA') {
                    pageUrl = '/ca/fr/checkout/order-review';
                }
            }
            pushDtLayer({
                eeAction: 'eeCheckout',
                event: 'virtualPageview',
                page: pageUrl,
                checkoutStep: '5',
                funnelType: basketConfirmation.funnelType,
                giftWrapping: basketConfirmation.giftWrapping,
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
                pageCategory: 'Checkout',
                pageSubCategory: 'Review',
                checkoutVersion: 'One page checkout',
                couponCode: couponCode,
                paymentType: basketConfirmation.paymentMethod.includes('PayPal') ? sessionStorage.getItem('PayPalSource') ? sessionStorage.getItem('PayPalSource'): basketConfirmation.paymentMethod.join("/"): basketConfirmation.paymentMethod.join("/"),
                products: basketConfirmation.productLineItems,
            });
        }
    }
    break;
    case 'coshipping-singleshipping':
        // populate data layer for successful billing
        if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
            "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage,
            "giftWrapping": basketConfirmation.giftWrapping,
            "pageSubCategory": "Billing",
            "funnelType": basketConfirmation.funnelType,
            "eeAction": "eeCheckout",
            "checkoutStep" : "3",
            "productOrderType": basketConfirmation.productOrderType,
            "pageCategory": "Checkout",
            'products': basketConfirmation.productLineItems
            })
            pushDtLayer({
            "event" : "eeCheckoutOption",
            "checkoutStep" : "2",
            "checkoutOption" : basketConfirmation.defaultShipping
            })
       }
        break;
    case 'cobilling-billing': case 'cobilling-start':
        // populate data layer for successful billing
        if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
            "checkoutErrorMessage": basketConfirmation.checkoutErrorMessage,
            "giftWrapping": basketConfirmation.giftWrapping,
            "pageSubCategory": "Review",
            "funnelType": basketConfirmation.funnelType,
            "eeAction": "eeCheckout",
            "checkoutStep" : "4",
            "productOrderType": basketConfirmation.productOrderType,
            "pageCategory": "Checkout",
            'products': basketConfirmation.productLineItems
            })
            pushDtLayer({
            "event" : "eeCheckoutOption",
                "checkoutStep" : "3",
                "checkoutOption" : basketConfirmation.paymentMethod
            })
       }
        break;
    case 'cosummary-submit': case 'coplaceorder-submit': case 'afterpayredirect-placeorder' : case 'cosummary-showconfirmation': case 'flexredirect-submit':
        // populate data layer for sucessful transaction
        if (typeof orderConfirmation != 'undefined') {
        //the push must be placed before the gtm.js container call
            var checkoutVersion = 'One Page Checkout';

            if (sessionStorage.getItem('spcheckoutv2') == 'true') {
                checkoutVersion = 'Vertical Checkout';
                sessionStorage.removeItem('spcheckoutv2');
            }

            var tansactionCouponCode = '';
            if (orderConfirmation.coupons) {
                for (var i = 0; i < orderConfirmation.coupons.length; i++) {
                    if (orderConfirmation.coupons[i]) {
                        tansactionCouponCode += orderConfirmation.coupons[i] + ',';
                    }
                }
            }

            if (tansactionCouponCode.length > 0) {
                tansactionCouponCode = tansactionCouponCode.substr(0, tansactionCouponCode.length - 1);
            }
            for (var i = 0; i < orderConfirmation.productLineItems.length; i++) {
                orderConfirmation.productLineItems[i].recommendedProduct = DtgetRecommendedProductStatus(orderConfirmation.productLineItems[i].productVariantID);
            }
            var paymentType = '';
            if (orderConfirmation.paymentMethod) {
                if (orderConfirmation.paymentMethod === 'AFTERPAY_PBI') {
                    paymentType = 'After Pay';
                } else if (orderConfirmation.paymentMethod == "ApplePay") {
                    paymentType = orderConfirmation.paymentMethod + sessionStorage.applePayLoc;
                } else if (orderConfirmation.paymentMethod === 'PayPal' && sessionStorage.getItem('PayPalSource')) {
                    paymentType = sessionStorage.getItem('PayPalSource');
                } else if(orderConfirmation.paymentMethod == 'FLEX') {
                    paymentType = 'Flex';
                } else {
                    paymentType = orderConfirmation.paymentMethod;
                }
            }
            pushDtLayer({
                "transactionId": orderConfirmation.transactionId,
                "transactionTotal": orderConfirmation.adjMerchandizeTotalNet,
                "transactionTax": orderConfirmation.tax,
                "transactionShipping": orderConfirmation.transactionShipping,
                "transactionCoupon": orderConfirmation.transactionCoupon,
                "transactionTotalWithoutCoupon": orderConfirmation.merchandizeTotalNet,
                "pageCategory": "Checkout",
                "pageSubCategory": "Order Confirmation",
                "giftWrapping": orderConfirmation.giftWrapping,
                "funnelType": orderConfirmation.funnelType,
                "currencyCode": orderConfirmation.currencyCode,
                "couponCode": tansactionCouponCode,
                "checkoutVersion": checkoutVersion,
                "paymentType": paymentType,
                "shippingType": orderConfirmation.defaultShipping,
                "orderDiscount": orderConfirmation.orderDiscount,
                "products": orderConfirmation.productLineItems,
                "conversionLocation": window.metaCheckout,
            });
        }
        break;
    case 'search-show': case 'search-getsuggestions':
        if (searchItems.search) {
            let pageCategory = !searchItems.rs55 ? "No Search Results Page" : "Site Search";
            pushDtLayer({
                "pageCategory": pageCategory,
                "pageSubCategory": DtgetPageSubcategory() == "My Account" ? DtgetPageSubcategory() : "",
                "kw55": searchItems.kw55.replace(/%20/g, " "),
                "res55": searchItems.rs55,
            });
        } else if (window.location.href.indexOf("store-locator") > -1) {
            pushDtLayer({
                "event": "storeLocator",
                "pageCategory": DtgetPageCategory()
            });
            window.addEventListener("message", receiveMessage);
            break;
        }

        // plp/search pageview
        if(typeof productData !== "undefined"){
            document.addEventListener('DOMContentLoaded', function() {
                for (var i = 0; i < productData.product.length;i++){
                    productData.product[i].brand = DtgetProductBrand();
                    productData.product[i].variant = "";
                }
                for (var j = 0; j < productData.product.length;j++){
                    if(productData.product[j].listName == "Search" && searchItems.kw55){
                        productData.product[j].listName = searchItems.kw55;
                    }
                }
                let $pageSubCategory = DtgetPageSubcategory();
                if(document.getElementsByClassName('de-breadcrumb').length > 0){
                    $pageSubCategory = document.getElementsByClassName('de-breadcrumb')[0].getElementsByTagName('li')[1].getElementsByTagName('span')[0] ? document.getElementsByClassName('de-breadcrumb')[0].getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML.trim() : ""
                }
                if(document.getElementsByClassName('arp-featured-page-wrapper').length > 0){
                    $pageSubCategory = 'Öne Çıkanlar';
                }

                let $pageCategory = searchItems.search ? "Site Search" : "Category Page";

                pushDtLayer({
                    "event": "eeListView",
                    "pageCategory": $pageCategory,
                    "pageSubCategory": $pageCategory === 'Category Page' ? window.Resources.GTPRODUCT_CATEGORYNAME : $pageSubCategory,
                    "currencyCode": window.User.currencyCode,
                    "products": productData.product || new Array()
                });
                prodholder.push(productData.product);
            });
        }
        break;
    case 'product-showincategory': case 'product-show':
        // product detail page load page
        if(DtgetPageCategory() == "Product Page"){
            let productArr = [];
            let prodDataForArr;
            //for product sets productCache is an array with more than 1 product
                if (productCache && productCache.length > 1) {
                    for (let index = 0; index < productCache.length; index++) {
                        let price;

                        if (productCache[index].pricing) {
                            price = productCache[index].productautoreplenish == "YES"
                                ? productCache[index].pricing.minprice
                                : productCache[index].pricing.sale || productCache[index].pricing.minprice;
                        }

                        prodDataForArr = {
                            bundleName :  productCache[index] ? (productCache[index].itemName ? productCache[index].itemName : '') : '',
                            listType : sessionStorage.getItem('listType') ? sessionStorage.getItem('listType') : null,
                            listName : sessionStorage.getItem('listName') ? sessionStorage.getItem('listName') : null,
                            id : productCache[index].masterID ? productCache[index].masterID : productCache[index].ID,
                            category :productCache[index].catid,
                            price : price,
                            name : productCache[index].name,
                            brand : DtgetProductBrand(),
                            quantity :productCache[index].quantity,
                            size : productCache[index].size,
                            subCategory : productCache[index].subcategory,
                            subSubCategory : productCache[index].subsubcategory,
                            productAutoReplen : productCache[index].productautoreplenish,
                            productOutOfStock : productCache[index].productOutOfStock,
                            productColor : productCache[index].productColor,
                            productType : "Bundle",
                            productVariantID : productCache[index].defalutvariant ? productCache[index].defalutvariant : productCache[index].ID,
                            productNumReviews : productCache[index].productNumReviews,
                            productStarRating : productCache[index].productStarRating,
                            new : window.productCache.new,
                            lastChance : window.productCache.lastChance,
                            productLiveDate : window.productCache.productLiveDate
                        }
                        productArr.push(prodDataForArr);
                    }
                    pushDtLayer({
                        "eeAction": "eeProductDetail",
                        "event" : "eeProductDetail",
                        "pageCategory": "Product Page",
                        'products': productArr
                    })

                } else if (productCache) {
                    let price;

                    if (productCache.pricing) {
                        price = productCache.productautoreplenish == "YES"
                            ? productCache.pricing.minprice
                            : productCache.pricing.sale || productCache.pricing.minprice;
                    }

                    pushDtLayer({
                        "eeAction": "eeProductDetail",
                        "event" : "eeProductDetail",
                        "pageCategory": "Product Page",
                        'products': [{
                            "listType" : sessionStorage.getItem('listType') ? sessionStorage.getItem('listType') : null,
                            "listName" : sessionStorage.getItem('listName') ? sessionStorage.getItem('listName') : null,
                            "id": productCache.masterID ? productCache.masterID : productCache.ID,
                            "category":productCache.catid,
                            "price": price,
                            "name": productCache.name,
                            "brand": DtgetProductBrand(),
                            "quantity":productCache.quantity,
                            "size": productCache.size,
                            "subCategory" : productCache.subcategory,
                            "subSubCategory" : productCache.subsubcategory,
                            "productAutoReplen": productCache.productautoreplenish,
                            "productOutOfStock": productCache.productOutOfStock,
                            "productColor": productCache.productColor,
                            "productType": productCache.customProductType == 'Bundle' ? 'Bundle' : 'Product',
                            "productVariantID": productCache.defalutvariant ? productCache.defalutvariant : productCache.ID,
                            "productNumReviews": productCache.productNumReviews,
                            "productStarRating": productCache.productStarRating,
                            "new" : window.productCache.new,
                            "lastChance" : window.productCache.lastChance,
                            "productLiveDate" : window.productCache.productLiveDate,
                        }]
                    })
                }


        }

     if (typeof $BV !== 'undefined') {
         $BV.configure('global', {
             events : {
                 submissionSubmitted : function (data) {
                     // NEW Request fix for submit question in PDP
                     if($(".bv-submission-button-submit:contains('Post Question')").length>0){
                         pushDtLayer({
                             "page": Dtgetpage(),
                             "event": "submitQuestion",
                             "productCategory": DtgetProductCategory(),
                             "question": $("#bv-textarea-field-questionsummary").val(),
                             "productName": productCache.name,
                             "pageSubCategory": "Ask a Question",
                             "pageCategory": "Product Page"
                            })
                        }
                        // NEW Request fix for submit review in PDP
                        if($(".bv-submission-button-submit:contains('Post Review')").length>0){
                            pushDtLayer({
                                "event": "submitReview",
                                "productCategory": DtgetProductCategory(),
                                "productSubCategory":DtgetProductsubCategory(),
                                "pageSubCategory": "Reviews",
                                "productName": productCache.name,
                                "pageCategory": "Product Page",
                                "productId": data.Id
                            })
                        }
                    }
                }
            });
        }
            break;
    case 'search-brandify':
        pushDtLayer({
            "event": "storeLocator",
            "pageCategory": DtgetPageCategory()
        });
        window.addEventListener("message", receiveMessage);
        break;
    default: break;
}

    //Navigation click
	if (typeof searchItems !== "undefined") {
		if (searchItems.error === "Page Not Found") {
			pushDtLayer({
	            "userId": customerNo != null ? customerNo : null,
	            "pageCategory": "Error Page",
	            "pageSubCategory": "",
	            "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
	            "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
	            "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                "emailAddress": window.emailID ? window.emailID : '',
                "language": DtgetLanguage(),
                "websiteCountry": DtgetCountry()
            });
		} else {
			if(DtgetPageCategory()=="Category Page"){
		        if(searchItems.lastclk == "account-editprofile" || searchItems.lastclk == "address-list" || searchItems.lastclk =="paymentinstruments-list" || searchItems.lastclk == "wishlist-show" || searchItems.lastclk == "order-history" || searchItems.lastclk == "orderreplenishment-show" || searchItems.lastclk == "customerservice-contactus"){
		            pushDtLayer({
		                "userId": customerNo != null ? customerNo : null,
		                "pageCategory": DtgetPageCategory(),
		                "pageSubCategory": CouponSubCategory(),
		                "navigationLinkClicked": getCookie("navdata") ? "1" : "0",
		                "navigationLinkNameClicked": sessionStorage.getItem("navlink") ? sessionStorage.getItem("navlink") : getCookie("navdata"),
		                "navigationLocationClicked": "topmenu",
                        "emailAddress": window.emailID ? window.emailID : '',
                        "language": DtgetLanguage(),
                        "websiteCountry": DtgetCountry()
		                });
		        }else{
		            pushDtLayer({
		                "userId": customerNo != null ? customerNo : null,
		                "pageCategory": DtgetPageCategory(),
		                "pageSubCategory": CouponSubCategory(),
		                "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
		                "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
		                "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                        "emailAddress": window.emailID ? window.emailID : '',
                        "language": DtgetLanguage(),
                        "websiteCountry": DtgetCountry()
		                });
		        }

		    }else{
		        if(gtCurPage == "customerservice-contactus"){
		            pushDtLayer({
		                "userId": customerNo != null ? customerNo : null,
		                "pageCategory": DtgetPageCategory(),
		                "pageSubCategory": CouponSubCategory(),
		                "navigationLinkClicked": "0",
		                "navigationLinkNameClicked":"",
		                "navigationLocationClicked":"",
                        "emailAddress": window.emailID ? window.emailID : '',
                        "language": DtgetLanguage(),
                        "websiteCountry": DtgetCountry()
                    });
		        }else{
		            if(gtCurPage == "account-editprofile"){
		                if(sessionStorage.getItem("navlink")!="Profile"){
		                    pushDtLayer({
		                        "userId": customerNo != null ? customerNo : null,
		                        "pageCategory": DtgetPageCategory(),
		                        "pageSubCategory": CouponSubCategory(),
		                        "navigationLinkClicked":"0",
		                        "navigationLinkNameClicked":"",
		                        "navigationLocationClicked":"",
                                "emailAddress": window.emailID ? window.emailID : '',
                                "language": DtgetLanguage(),
                                "websiteCountry": DtgetCountry()
                            });
		                }else{
		                    pushDtLayer({
		                        "userId": customerNo != null ? customerNo : null,
		                        "pageCategory": DtgetPageCategory(),
		                        "pageSubCategory": CouponSubCategory(),
		                        "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
		                        "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
		                        "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                                "emailAddress": window.emailID ? window.emailID : '',
                                "language": DtgetLanguage(),
                                "websiteCountry": DtgetCountry()
                            });
		                }
		            }else{
		                pushDtLayer({
		                    "userId": customerNo != null ? customerNo : null,
		                    "pageCategory": DtgetPageCategory(),
		                    "pageSubCategory": CouponSubCategory(),
		                    "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
		                    "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
		                    "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                            "emailAddress": window.emailID ? window.emailID : '',
                            "language": DtgetLanguage(),
                            "websiteCountry": DtgetCountry()
                        });
		            }
		        }

		    }
		}

	} else {
	    if(DtgetPageCategory()=="Category Page"){
	        if(searchItems.lastclk == "account-editprofile" || searchItems.lastclk == "address-list" || searchItems.lastclk =="paymentinstruments-list" || searchItems.lastclk == "wishlist-show" || searchItems.lastclk == "order-history" || searchItems.lastclk == "orderreplenishment-show" || searchItems.lastclk == "customerservice-contactus"){
	            pushDtLayer({
	                "userId": customerNo != null ? customerNo : null,
	                "pageCategory": DtgetPageCategory(),
	                "pageSubCategory": CouponSubCategory(),
	                "navigationLinkClicked": getCookie("navdata") ? "1" : "0",
	                "navigationLinkNameClicked": sessionStorage.getItem("navlink") ? sessionStorage.getItem("navlink") : getCookie("navdata"),
	                "navigationLocationClicked": "topmenu",
                    "emailAddress": window.emailID ? window.emailID : '',
                    "language": DtgetLanguage(),
                    "websiteCountry": DtgetCountry()
                });
	        }else{
	            pushDtLayer({
	                "userId": customerNo != null ? customerNo : null,
	                "pageCategory": DtgetPageCategory(),
	                "pageSubCategory": CouponSubCategory(),
	                "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
	                "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
	                "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                    "emailAddress": window.emailID ? window.emailID : '',
                    "language": DtgetLanguage(),
                    "websiteCountry": DtgetCountry()
                });
	        }

	    }else{
	        if(gtCurPage == "customerservice-contactus"){
	            pushDtLayer({
	                "userId": customerNo != null ? customerNo : null,
	                "pageCategory": DtgetPageCategory(),
	                "pageSubCategory": CouponSubCategory(),
	                "navigationLinkClicked": "0",
	                "navigationLinkNameClicked":"",
	                "navigationLocationClicked":"",
                    "emailAddress": window.emailID ? window.emailID : '',
                    "language": DtgetLanguage(),
                    "websiteCountry": DtgetCountry()
                });
	        }else{
	            if(gtCurPage == "account-editprofile"){
	                if(sessionStorage.getItem("navlink")!="Profile"){
	                    pushDtLayer({
	                        "userId": customerNo != null ? customerNo : null,
	                        "pageCategory": DtgetPageCategory(),
	                        "pageSubCategory": CouponSubCategory(),
	                        "navigationLinkClicked":"0",
	                        "navigationLinkNameClicked":"",
	                        "navigationLocationClicked":"",
                            "emailAddress": window.emailID ? window.emailID : '',
                            "language": DtgetLanguage(),
                            "websiteCountry": DtgetCountry()
                        });
	                }else{
	                    pushDtLayer({
	                        "userId": customerNo != null ? customerNo : null,
	                        "pageCategory": DtgetPageCategory(),
	                        "pageSubCategory": CouponSubCategory(),
	                        "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
	                        "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
	                        "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                            "emailAddress": window.emailID ? window.emailID : '',
                            "language": DtgetLanguage(),
                            "websiteCountry": DtgetCountry()
                        });
	                }
	            }else{
	                pushDtLayer({
	                    "userId": customerNo != null ? customerNo : null,
	                    "pageCategory": DtgetPageCategory(),
	                    "pageSubCategory": CouponSubCategory(),
	                    "navigationLinkClicked": sessionStorage.getItem("navlink") ? "1" : "0",
	                    "navigationLinkNameClicked": sessionStorage.getItem("navlink"),
	                    "navigationLocationClicked": sessionStorage.getItem("menuloc"),
                        "emailAddress": window.emailID ? window.emailID : '',
                        "language": DtgetLanguage(),
                        "websiteCountry": DtgetCountry()
                    });
	            }
	        }

	    }
	}


    sessionStorage.setItem("navlink","");
    sessionStorage.setItem("menuloc","");
    sessionStorage.setItem("productUpdate","");
    sessionStorage.setItem("userid",userid);
    sessionStorage.setItem("languange", DtgetLanguage());
    sessionStorage.setItem("webCountry",DtgetCountry());
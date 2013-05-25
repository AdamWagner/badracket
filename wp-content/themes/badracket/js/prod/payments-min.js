(function(){var e=this;this.Stripe=function(){function e(){}return e.version=2,e.endpoint="https://api.stripe.com/v1",e.validateCardNumber=function(t){return t=(t+"").replace(/\s+|-/g,""),t.length>=10&&t.length<=16&&e.luhnCheck(t)},e.validateCVC=function(t){return t=e.trim(t),/^\d+$/.test(t)&&t.length>=3&&t.length<=4},e.validateExpiry=function(t,n){var r,i;return t=e.trim(t),n=e.trim(n),/^\d+$/.test(t)?/^\d+$/.test(n)?parseInt(t,10)<=12?(i=new Date(n,t),r=new Date,i.setMonth(i.getMonth()-1),i.setMonth(i.getMonth()+1,1),i>r):!1:!1:!1},e.cardType=function(t){return e.cardTypes[t.slice(0,2)]||"Unknown"},e.setPublishableKey=function(t){e.key=t},e.createToken=function(t,n,r){var i,s,o;n==null&&(n={});if(!t)throw"card required";if(typeof t!="object")throw"card invalid";e.isElement(t)&&(t=e.paramsFromForm(t)),typeof n=="function"?(r=n,n={}):typeof n!="object"&&(i=parseInt(n,10),n={},i>0&&(n.amount=i));for(s in t)o=t[s],delete t[s],t[e.underscore(s)]=o;return n.card=t,n.key||(n.key=e.key||e.publishableKey),e.validateKey(n.key),e.ajaxJSONP({url:""+e.endpoint+"/tokens",data:n,method:"POST",success:function(e,t){return typeof r=="function"?r(t,e):void 0},complete:e.complete(r),timeout:4e4})},e.getToken=function(t,n){if(!t)throw"token required";return e.validateKey(e.key),e.ajaxJSONP({url:""+e.endpoint+"/tokens/"+t,data:{key:e.key},success:function(e,t){return typeof n=="function"?n(t,e):void 0},complete:e.complete(n),timeout:4e4})},e.complete=function(e){return function(t,n,r){if(t!=="success")return typeof e=="function"?e(500,{error:{code:t,type:t,message:"An unexpected error has occurred. We have been notified of the problem."}}):void 0}},e.validateKey=function(e){if(!e||typeof e!="string")throw new Error("You did not set a valid publishable key. Call Stripe.setPublishableKey() with your publishable key. For more info, see https://stripe.com/docs/stripe.js");if(/\s/g.test(e))throw new Error("Your key is invalid, as it contains whitespace. For more info, see https://stripe.com/docs/stripe.js");if(/^sk_/.test(e))throw new Error("You are using a secret key with Stripe.js, instead of the publishable one. For more info, see https://stripe.com/docs/stripe.js")},e}.call(this),typeof module!="undefined"&&module!==null&&(module.exports=this.Stripe),typeof define=="function"&&define("stripe",[],function(){return e.Stripe})}).call(this),function(){var e,t,n,r=[].slice;e=encodeURIComponent,t=(new Date).getTime(),n=function(t,r,i){var s,o;r==null&&(r=[]);for(s in t)o=t[s],i&&(s=""+i+"["+s+"]"),typeof o=="object"?n(o,r,s):r.push(""+s+"="+e(o));return r.join("&").replace(/%20/g,"+")},this.Stripe.ajaxJSONP=function(e){var i,s,o,u,a,f;return e==null&&(e={}),o="sjsonp"+ ++t,a=document.createElement("script"),s=null,i=function(){var t;return clearTimeout(s),(t=a.parentNode)!=null&&t.removeChild(a),o in window&&(window[o]=function(){}),typeof e.complete=="function"?e.complete("abort",f,e):void 0},f={abort:i},a.onerror=function(){return f.abort(),typeof e.error=="function"?e.error(f,e):void 0},window[o]=function(){var t;t=1<=arguments.length?r.call(arguments,0):[],clearTimeout(s),a.parentNode.removeChild(a);try{delete window[o]}catch(n){window[o]=void 0}return typeof e.success=="function"&&e.success.apply(e,t),typeof e.complete=="function"?e.complete("success",f,e):void 0},e.data||(e.data={}),e.data.callback=o,e.method&&(e.data._method=e.method),a.src=e.url+"?"+n(e.data),u=document.getElementsByTagName("head")[0],u.appendChild(a),e.timeout>0&&(s=setTimeout(function(){return f.abort(),typeof e.complete=="function"?e.complete("timeout",f,e):void 0},e.timeout)),f}}.call(this),function(){var e,t,n,r,i,s,o,u,a,f,l=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};e=["number","cvc","exp_month","exp_year","name","address_line1","address_line2","address_city","address_state","address_zip","address_country"],u=function(e){return(e+"").replace(/^\s+|\s+$/g,"")},a=function(e){return(e+"").replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()}).replace(/-/g,"_")},r=function(e){return typeof e!="object"?!1:typeof jQuery!="undefined"&&jQuery!==null&&e instanceof jQuery?!0:e.nodeType===1},o=function(t,n){var r,i,s,o,u,f;n==null&&(n=!0),typeof jQuery!="undefined"&&jQuery!==null&&t instanceof jQuery&&(t=t[0]),s=t.getElementsByTagName("input"),o={};for(u=0,f=s.length;u<f;u++){i=s[u],r=a(i.getAttribute("data-stripe"));if(!(l.call(e,r)>=0||!n))continue;o[r]=i.value}return o},s=function(e){var t,n,r,i,s,o;r=!0,i=0,n=(e+"").split("").reverse();for(s=0,o=n.length;s<o;s++){t=n[s],t=parseInt(t,10);if(r=!r)t*=2;t>9&&(t-=9),i+=t}return i%10===0},t=function(){var e,t,n,r;t={};for(e=n=40;n<=49;e=++n)t[e]="Visa";for(e=r=50;r<=59;e=++r)t[e]="MasterCard";return t[34]=t[37]="American Express",t[60]=t[62]=t[64]=t[65]="Discover",t[35]="JCB",t[30]=t[36]=t[38]=t[39]="Diners Club",t}(),n={attrs:e,trim:u,underscore:a,isElement:r,paramsFromForm:o,luhnCheck:s,cardTypes:t};for(i in n)f=n[i],this.Stripe[i]=f}.call(this);(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b=[].slice,w=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},E=this;e=jQuery;e.payment={};e.payment.fn={};e.fn.payment=function(){var t,n;n=arguments[0],t=2<=arguments.length?b.call(arguments,1):[];return e.payment.fn[n].apply(this,t)};i=/(\d{1,4})/g;r=[{type:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,format:i,length:[12,13,14,15,16,17,18,19],cvcLength:[3],luhn:!0},{type:"dinersclub",pattern:/^(36|38|30[0-5])/,format:i,length:[14],cvcLength:[3],luhn:!0},{type:"laser",pattern:/^(6706|6771|6709)/,format:i,length:[16,17,18,19],cvcLength:[3],luhn:!0},{type:"jcb",pattern:/^35/,format:i,length:[16],cvcLength:[3],luhn:!0},{type:"unionpay",pattern:/^62/,format:i,length:[16,17,18,19],cvcLength:[3],luhn:!1},{type:"discover",pattern:/^(6011|65|64[4-9]|622)/,format:i,length:[16],cvcLength:[3],luhn:!0},{type:"mastercard",pattern:/^5[1-5]/,format:i,length:[16],cvcLength:[3],luhn:!0},{type:"amex",pattern:/^3[47]/,format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,length:[15],cvcLength:[3,4],luhn:!0},{type:"visa",pattern:/^4/,format:i,length:[13,14,15,16],cvcLength:[3],luhn:!0}];t=function(e){var t,n,i;e=(e+"").replace(/\D/g,"");for(n=0,i=r.length;n<i;n++){t=r[n];if(t.pattern.test(e))return t}};n=function(e){var t,n,i;for(n=0,i=r.length;n<i;n++){t=r[n];if(t.type===e)return t}};h=function(e){var t,n,r,i,s,o;r=!0;i=0;n=(e+"").split("").reverse();for(s=0,o=n.length;s<o;s++){t=n[s];t=parseInt(t,10);if(r=!r)t*=2;t>9&&(t-=9);i+=t}return i%10===0};c=function(e){var t;return e.prop("selectionStart")!=null&&e.prop("selectionStart")!==e.prop("selectionEnd")?!0:(typeof document!="undefined"&&document!==null?(t=document.selection)!=null?typeof t.createRange=="function"?t.createRange().text:void 0:void 0:void 0)?!0:!1};p=function(t){var n=this;return setTimeout(function(){var n,r;n=e(t.currentTarget);r=n.val();r=e.payment.formatCardNumber(r);return n.val(r)})};u=function(n){var r,i,s,o,u,a,f;s=String.fromCharCode(n.which);if(!/^\d+$/.test(s))return;r=e(n.currentTarget);f=r.val();i=t(f+s);o=(f.replace(/\D/g,"")+s).length;a=16;i&&(a=i.length[i.length.length-1]);if(o>=a)return;if(r.prop("selectionStart")!=null&&r.prop("selectionStart")!==f.length)return;i&&i.type==="amex"?u=/^(\d{4}|\d{4}\s\d{6})$/:u=/(?:^|\s)(\d{4})$/;if(u.test(f)){n.preventDefault();return r.val(f+" "+s)}if(u.test(f+s)){n.preventDefault();return r.val(f+s+" ")}};s=function(t){var n,r;n=e(t.currentTarget);r=n.val();if(t.meta)return;if(n.prop("selectionStart")!=null&&n.prop("selectionStart")!==r.length)return;if(t.which===8&&/\s\d?$/.test(r)){t.preventDefault();return n.val(r.replace(/\s\d?$/,""))}};a=function(t){var n,r,i;r=String.fromCharCode(t.which);if(!/^\d+$/.test(r))return;n=e(t.currentTarget);i=n.val()+r;if(/^\d$/.test(i)&&i!=="0"&&i!=="1"){t.preventDefault();return n.val("0"+i+" / ")}if(/^\d\d$/.test(i)){t.preventDefault();return n.val(""+i+" / ")}};f=function(t){var n,r,i;r=String.fromCharCode(t.which);if(!/^\d+$/.test(r))return;n=e(t.currentTarget);i=n.val();if(/^\d\d$/.test(i))return n.val(""+i+" / ")};l=function(t){var n,r,i;r=String.fromCharCode(t.which);if(r!=="/")return;n=e(t.currentTarget);i=n.val();if(/^\d$/.test(i)&&i!=="0")return n.val("0"+i+" / ")};o=function(t){var n,r;if(t.meta)return;n=e(t.currentTarget);r=n.val();if(t.which!==8)return;if(n.prop("selectionStart")!=null&&n.prop("selectionStart")!==r.length)return;if(/\s\/\s?\d?$/.test(r)){t.preventDefault();return n.val(r.replace(/\s\/\s?\d?$/,""))}};g=function(e){var t;if(e.metaKey||e.ctrlKey)return!0;if(e.which===32)return!1;if(e.which===0)return!0;if(e.which<33)return!0;t=String.fromCharCode(e.which);return!!/[\d\s]/.test(t)};v=function(n){var r,i,s,o;r=e(n.currentTarget);s=String.fromCharCode(n.which);if(!/^\d+$/.test(s))return;if(c(r))return;o=(r.val()+s).replace(/\D/g,"");i=t(o);return i?o.length<=i.length[i.length.length-1]:o.length<=16};m=function(t){var n,r,i;n=e(t.currentTarget);r=String.fromCharCode(t.which);if(!/^\d+$/.test(r))return;if(c(n))return;i=n.val()+r;i=i.replace(/\D/g,"");if(i.length>6)return!1};d=function(t){var n,r,i;n=e(t.currentTarget);r=String.fromCharCode(t.which);if(!/^\d+$/.test(r))return;i=n.val()+r;return i.length<=4};y=function(t){var n,i,s,o,u;n=e(t.currentTarget);u=n.val();o=e.payment.cardType(u)||"unknown";if(!n.hasClass(o)){i=function(){var e,t,n;n=[];for(e=0,t=r.length;e<t;e++){s=r[e];n.push(s.type)}return n}();n.removeClass("unknown");n.removeClass(i.join(" "));n.addClass(o);n.toggleClass("identified",o!=="unknown");return n.trigger("payment.cardType",o)}};e.payment.fn.formatCardCVC=function(){this.payment("restrictNumeric");this.on("keypress",d);return this};e.payment.fn.formatCardExpiry=function(){this.payment("restrictNumeric");this.on("keypress",m);this.on("keypress",a);this.on("keypress",l);this.on("keypress",f);this.on("keydown",o);return this};e.payment.fn.formatCardNumber=function(){this.payment("restrictNumeric");this.on("keypress",v);this.on("keypress",u);this.on("keydown",s);this.on("keyup",y);this.on("paste",p);return this};e.payment.fn.restrictNumeric=function(){this.on("keypress",g);return this};e.payment.fn.cardExpiryVal=function(){return e.payment.cardExpiryVal(e(this).val())};e.payment.cardExpiryVal=function(e){var t,n,r,i;e=e.replace(/\s/g,"");i=e.split("/",2),t=i[0],r=i[1];if((r!=null?r.length:void 0)===2&&/^\d+$/.test(r)){n=(new Date).getFullYear();n=n.toString().slice(0,2);r=n+r}t=parseInt(t,10);r=parseInt(r,10);return{month:t,year:r}};e.payment.validateCardNumber=function(e){var n,r;e=(e+"").replace(/\s+|-/g,"");if(!/^\d+$/.test(e))return!1;n=t(e);return n?(r=e.length,w.call(n.length,r)>=0)&&(n.luhn===!1||h(e)):!1};e.payment.validateCardExpiry=function(t,n){var r,i,s,o;typeof t=="object"&&"month"in t&&(o=t,t=o.month,n=o.year);if(!t||!n)return!1;t=e.trim(t);n=e.trim(n);if(!/^\d+$/.test(t))return!1;if(!/^\d+$/.test(n))return!1;if(parseInt(t,10)<=12){if(n.length===2){s=(new Date).getFullYear();s=s.toString().slice(0,2);n=s+n}i=new Date(n,t);r=new Date;i.setMonth(i.getMonth()-1);i.setMonth(i.getMonth()+1,1);return i>r}return!1};e.payment.validateCardCVC=function(t,r){var i,s;t=e.trim(t);return/^\d+$/.test(t)?r?(i=t.length,w.call((s=n(r))!=null?s.cvcLength:void 0,i)>=0):t.length>=3&&t.length<=4:!1};e.payment.cardType=function(e){var n;return e?((n=t(e))!=null?n.type:void 0)||null:null};e.payment.formatCardNumber=function(e){var n,r,i,s;n=t(e);if(!n)return e;i=n.length[n.length.length-1];e=e.replace(/\D/g,"");e=e.slice(0,+i+1||9e9);if(n.format.global)return(s=e.match(n.format))!=null?s.join(" "):void 0;r=n.format.exec(e);r!=null&&r.shift();return r!=null?r.join(" "):void 0}}).call(this);(function(){(function(e){var t,n;e.errors={attribute:"validate",activationClass:"validation-active",format:"<div class='validation-block'><div class='validation-message'></div></div>",messageClass:"validation-message"};n=function(t,n){var r;if(!t.hasClass(e.errors.activationClass)){t.addClass(e.errors.activationClass);r=t.find("."+e.errors.messageClass);r.size()===0&&t.append(e.errors.format);r=t.find("."+e.errors.messageClass);if(r.size()>0)return r.html(n);throw new Error("configuration error: $.errors.format must have elment with class "+e.errors.messageClass)}};t=function(t,r,i){var s;s=t.find("["+e.errors.attribute+"~='"+r+"']");if(s.size()===0){s=e("<div "+e.errors.attribute+"='"+r+"'>"+('Unassigned error: Add validate="'+r+'" attribute somewhere in a form.</div>'));t.prepend(s)}return n(s,i)};e.fn.applyErrors=function(t){e(this).clearErrors();return e(this).addErrors(t)};e.fn.addErrors=function(n){var r,i;r=e(this);if(e.type(n)==="object"){i=n;n=[];e.each(i,function(t,r){if(r&&(!e.isArray(r)||r.length!==0))return n.push([t,r])})}return e(n).each(function(n,i){var s,o;s=i[0];o=i[1];e.isArray(o)&&(o=o[0]);return t(r,s,o)})};return e.fn.clearErrors=function(){var t;t=e(this).find("["+e.errors.attribute+"]");t.find("."+e.errors.messageClass).html("");return t.removeClass(e.errors.activationClass)}})(jQuery)}).call(this);(function(){(function(e){var t,n;e.fn.ajaxSubmit=function(r){var i,s,o,u,a,f;r==null&&(r={});i=e(this);i.clearErrors();typeof r=="function"&&(r.success=r);r.redirect&&!r.success&&(r.success=function(){return window.location=r.redirect});s=r.success;u=r.error;a=i.attr("method")||"get";f=i.attr("action");o=i.serialize();jQuery.isEmptyObject(r.data)||(o=o+"&"+e.param(r.data));return e.ajax({type:r.type||a,url:r.url||f,data:o,success:function(e){return n(i,e,s,u)},error:function(e,n,r){return t(i)}})};n=function(t,n,r,i){if(!e.isEmptyObject(n&&n.errors)){typeof i=="function"&&i.call(t,n);return t.applyErrors(n.errors)}if(typeof r=="function")return r.call(t[0],n);if(n.redirect)return window.location=n.redirect};t=function(e){};return e.fn.ajaxForm=function(t){t==null&&(t={});return e(this).bind("submit",function(n){n.preventDefault();return e(this).ajaxSubmit(t)})}})(jQuery)}).call(this);jQuery(function(e){function b(e){var t=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;return t.test(e)}function w(){var t=e.payment.cardType(l.val());l.toggleClass("invalid",!e.payment.validateCardNumber(l.val()));c.toggleClass("invalid",!e.payment.validateCardExpiry(c.payment("cardExpiryVal")));h.toggleClass("invalid",!e.payment.validateCardCVC(h.val(),t));a.toggleClass("invalid",a.val().length<3);f.toggleClass("invalid",!b(f.val()));if(e("input.invalid").length){u.addClass("disabled");return!1}u.removeClass("disabled");return!0}function E(){console.log(p);console.log("handle form sumit attached");n.submit(function(n){n.preventDefault();if(w()){e(this).find("button").prop("disabled",!0);t.addClass("loading");r.show();x();var i=c.val(),s=i.split("/")[0].trim(),o=i.split("/")[1].trim();Stripe.createToken({number:l.val(),cvc:h.val(),exp_month:s,exp_year:o},S)}return!1})}function x(){function r(){e(".loading-messages").append("<div>"+t[n]+"</div>");n++;n<2&&setTimeout(function(){r()},2100)}var t=["Rummaging through the back room...","Grabbing your album... "],n=0;r()}function T(e,t){console.log("send mail js ran");var n=[e+",","\n","Thanks for supporting "+m+"!","You can download "+v+" with the link below.","\n",g,"\n","-The Bad Racket Team","http://www.badracket.com"].join("\n"),r=v+" Download Link";jQuery.ajax({url:s.domain+"wp-admin/admin-ajax.php",data:{action:"do_ajax",fn:"send_mail",subject:r,message:n,email:t},dataType:"JSON",success:function(e){console.log(e)},error:function(e){console.log(e)}})}var t,n,r,i,o,u,a,f,l,c,h,p,d,v,m,g,y;badracket.setupDownloadForm=function(r,i,o,l,c){function b(s){function l(e){var t=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;return t.test(e)&&e.length>0}function c(){a.toggleClass("invalid",a.val().length<3);f.toggleClass("invalid",!l(f.val()));if(e("input.invalid").length){u.addClass("disabled");return!1}u.removeClass("disabled");return!0}function h(){u.click(function(e){if(c()){u.addClass("disabled");T(a.val(),f.val());mixpanel.people.increment("Albums purchased",1);setTimeout(function(){modalFormHTML.modal("hide")},500)}})}e("body").append(s);modalFormHTML=e("#buy-album-form");modalFormHTML.modal("show");e(".buy-album-cover").attr("src",r);e("#buy-album-header").text(i);e(".buy-artist-name").text(o);e(".price").text("Free");modalFormHTML.on("hidden",function(){this.remove()});t=e(".payment-form-wrapper");a=e(".your-name");f=e(".your-email");u=e(".submit-payment-button");n=e("#payment-form");u.attr("href",p);a.toggleClass("invalid",a.val().length<3);f.toggleClass("invalid",!l(f.val()));c();t.keyup(c);h()}var h;e("#buy-album-form").remove();d=r;v=i;m=o;g=c;y=l;p=c;jQuery.ajax({url:s.domain+"wp-admin/admin-ajax.php",data:{action:"do_ajax",fn:"download_modal"},dataType:"JSON",success:function(e){b(e)},error:function(e){console.log("there has been an error")}})};badracket.setupPayForm=function(b,S,x,T,N){function k(s){e("body").append(s);modalFormHTML=e("#buy-album-form");modalFormHTML.modal("show");modalFormHTML.on("hidden",function(){this.remove()});t=e(".payment-form-wrapper");n=e("#payment-form");r=e(".loading-container");i=e(".submit-payment-button");o=e(".validation");u=e(".submit-payment-button");a=e(".your-name");f=e(".your-email");l=e(".cc-number");c=e(".cc-exp");h=e(".cc-cvc");n.append('<input type="hidden" name="price" value="'+C+'"/">');e(".buy-album-cover").attr("src",b);e("#buy-album-header").text(S);e(".buy-artist-name").text(x);e(".price").text(T);e("[data-numeric]").payment("restrictNumeric");l.payment("formatCardNumber");c.payment("formatCardExpiry");h.payment("formatCardCVC");w();t.keyup(w);E()}d=b;v=S;m=x;g=N;y=T;var C=T*100;p=N;jQuery.ajax({url:s.domain+"wp-admin/admin-ajax.php",data:{action:"do_ajax",fn:"get_payment_modal"},dataType:"JSON",success:function(e){k(e)},error:function(e){console.log("there has been an error")}})};var S=function(i,s){if(s.error){n.find(".payment-errors").text(s.error.message);n.find("button").prop("disabled",!1)}else{console.log("payment success");var o=s.id;n.append(e('<input type="hidden" name="stripeToken" />').val(o));n.ajaxSubmit(options={success:function(){t.removeClass("loading");r.hide();u.hide();T(a.val(),f.val());mixpanel.people.increment("Albums purchased",1);mixpanel.people.track_charge(parseInt(y.substring(1),10));var n='<a class="red-button" href="'+p+'">Download album</a>';e(".modal-footer").append(n);var i=['<h2 class="bottom1 top1">Thanks for your support!</h2>','<p class="bottom1">Use the download button below to begin downloading the album. Enjoy :-)</p>'].join("\n");t.html(i)}})}}});Stripe.setPublishableKey("pk_test_iV1NX0AkuxskATxdKxLU26ba");
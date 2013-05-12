!function(e){"use strict";var t,n=function(t,n){this.options=n;this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};n.prototype={constructor:n,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0;this.escape();this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body);t.$element.show();n&&t.$element[0].offsetWidth;t.$element.addClass("in").attr("aria-hidden",!1);t.enforceFocus();n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){var n;t&&t.preventDefault();n=this;t=e.Event("hide");this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1;this.escape();e(document).off("focusin.modal");this.$element.removeClass("in").attr("aria-hidden",!0);e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end);t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n);t.hideModal()})},hideModal:function(){var e=this;this.$element.hide();this.backdrop(function(){e.removeBackdrop();e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove();this.$backdrop=null},backdrop:function(t){var n,r=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){n=e.support.transition&&i;this.$backdrop=e('<div class="modal-backdrop '+i+'" />').appendTo(document.body);this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this));n&&this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");if(!t)return;n?this.$backdrop.one(e.support.transition.end,t):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()}else t&&t()}};t=e.fn.modal;e.fn.modal=function(t){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof t=="object"&&t);i||r.data("modal",i=new n(this,s));typeof t=="string"?i[t]():s.show&&i.show()})};e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};e.fn.modal.Constructor=n;e.fn.modal.noConflict=function(){e.fn.modal=t;return this};e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault();i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery);
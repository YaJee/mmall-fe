window.console&&console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),function(t,s){if(!t)return s;var i=function(){this.el=s,this.items=s,this.sizes=[],this.max=[0,0],this.current=0,this.interval=s,this.opts={speed:500,delay:3e3,complete:s,keys:!s,dots:s,fluid:s};var i=this;this.init=function(s,i){return this.el=s,this.ul=s.children("ul"),this.max=[s.outerWidth(),s.outerHeight()],this.items=this.ul.children("li").each(this.calculate),this.opts=t.extend(this.opts,i),this.setup(),this},this.calculate=function(s){var e=t(this),n=e.outerWidth(),h=e.outerHeight();i.sizes[s]=[n,h],n>i.max[0]&&(i.max[0]=n),h>i.max[1]&&(i.max[1]=h)},this.setup=function(){if(this.el.css({overflow:"hidden",width:i.max[0],height:this.items.first().outerHeight()}),this.ul.css({width:100*this.items.length+"%",position:"relative"}),this.items.css("width",100/this.items.length+"%"),this.opts.delay!==s&&(this.start(),this.el.hover(this.stop,this.start)),this.opts.keys&&t(document).keydown(this.keys),this.opts.dots&&this.dots(),this.opts.fluid){var e=function(){i.el.css("width",Math.min(Math.round(i.el.outerWidth()/i.el.parent().outerWidth()*100),100)+"%")};e(),t(window).resize(e)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function(){t.isFunction(i[this.className])&&i[this.className]()}),t.event.swipe&&this.el.on("swipeleft",i.prev).on("swiperight",i.next)},this.move=function(s,e){this.items.eq(s).length||(s=0),0>s&&(s=this.items.length-1);var n=this.items.eq(s),h={height:n.outerHeight()},o=e?5:this.opts.speed;this.ul.is(":animated")||(i.el.find(".dot:eq("+s+")").addClass("active").siblings().removeClass("active"),this.el.animate(h,o)&&this.ul.animate(t.extend({left:"-"+s+"00%"},h),o,function(){i.current=s,t.isFunction(i.opts.complete)&&!e&&i.opts.complete(i.el)}))},this.start=function(){i.interval=setInterval(function(){i.move(i.current+1)},i.opts.delay)},this.stop=function(){return i.interval=clearInterval(i.interval),i},this.keys=function(s){var e=s.which,n={37:i.prev,39:i.next,27:i.stop};t.isFunction(n[e])&&n[e]()},this.next=function(){return i.stop().move(i.current+1)},this.prev=function(){return i.stop().move(i.current-1)},this.dots=function(){var s='<ol class="dots">';t.each(this.items,function(t){s+='<li class="dot'+(1>t?" active":"")+'">'+(t+1)+"</li>"}),s+="</ol>",this.el.addClass("has-dots").append(s).find(".dot").click(function(){i.move(t(this).index())})}};t.fn.unslider=function(s){var e=this.length;return this.each(function(n){var h=t(this),o=(new i).init(h,s);h.data("unslider"+(e>1?"-"+(n+1):""),o)})}}(window.jQuery,!1);


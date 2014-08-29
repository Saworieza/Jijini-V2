/*
	SIEMENS - MOBILITY
	Javascript Development MadebyCAT
	http://www.madebycat.com
	©2013
*/

function animation(){
	$('body').css('visibility','visible');
	var controller = $.superscrollorama();
	controller.addTween('#sehirlerarasi video', TweenMax.to($('#sehirlerarasi video'),.2,{ onComplete: function(){
		sehirlerarasi_video.play();
		sehirici_video.pause();
		eMobilite_video.pause();
		lojistik_video.pause();
		$("#lojistik .logisticsBoxes li img").removeClass("animation");
	}}));
	
	controller.addTween('#sehirici video', TweenMax.to($('#sehirici video'),.2,{ onComplete: function(){
		sehirici_video.play();
		sehirlerarasi_video.pause();
		eMobilite_video.pause();
		lojistik_video.pause();
		$("#lojistik .logisticsBoxes li img").removeClass("animation");
	}}));
	
	controller.addTween('#eMobilite video', TweenMax.to($('#eMobilite video'),.2,{ onComplete: function(){
		eMobilite_video.play();
		sehirlerarasi_video.pause();
		sehirici_video.pause();
		lojistik_video.pause();
		$("#lojistik .logisticsBoxes li img").removeClass("animation");
	}}));
	
	controller.addTween('#lojistik video', TweenMax.to($('#lojistik video'),.2,{ onComplete: function(){
		lojistik_video.play();
		sehirlerarasi_video.pause();
		sehirici_video.pause();
		eMobilite_video.pause();
		$("#lojistik .logisticsBoxes li img").addClass("animation");
	}}));
	
	controller.addTween('#sehirlerarasi .content', TweenMax.to( $('#sehirlerarasi .content'), .90, {css:{width:"980"}, ease:Quad.easeInOut}));
	controller.addTween('#sehirici .content', TweenMax.to( $('#sehirici .content'), .90, {css:{width:"980"}, ease:Quad.easeInOut}));
	controller.addTween('#eMobilite .content', TweenMax.to( $('#eMobilite .content'), .90, {css:{width:"980"}, ease:Quad.easeInOut}));
	controller.addTween('#eMobilite .content .shapeOut', TweenMax.to( $('#eMobilite .content .shapeOut'), .90, {css:{transform:"rotate(120deg)"}, ease:Quad.easeInOut}));
	controller.addTween('#eMobilite .content .shapeIn', TweenMax.to( $('#eMobilite .content .shapeIn'), .90, {css:{transform:"rotate(0)"}, ease:Quad.easeInOut}));
	controller.addTween('#eMobilite .content .shape span', TweenMax.to( $('#eMobilite .content .shape span'), .90, {css:{opacity:"1"}, ease:Quad.easeInOut}));
	controller.addTween('#lojistik .content', TweenMax.to( $('#lojistik .content'), .90, {css:{width:"980"}, ease:Quad.easeInOut}));
	
	controller.addTween('#sehirlerarasi', TweenMax.to( $('#sehirlerarasi div.leftPage'), .90, {css:{left:-windowWidth}}));
	controller.addTween('#sehirici', TweenMax.from( $('#sehirlerarasi div.leftPage'), .0, {css:{left:-windowWidth}}));
	controller.addTween('#sehirlerarasi', TweenMax.to( $('#sehirlerarasi div.rightPage'), .90, {css:{right:-windowWidth}}));
	controller.addTween('#sehirici', TweenMax.from( $('#sehirlerarasi div.rightPage'), .0, {css:{right:-windowWidth}}));
	
	controller.addTween('#sehirici', TweenMax.to( $('#sehirici div.leftPage'), .90, {css:{left:-windowWidth}}));
	controller.addTween('#eMobilite', TweenMax.from( $('#sehirici div.leftPage'), .0, {css:{left:-windowWidth}}));
	controller.addTween('#sehirici', TweenMax.to( $('#sehirici div.rightPage'), .90, {css:{right:-windowWidth}}));
	controller.addTween('#eMobilite', TweenMax.from( $('#sehirici div.rightPage'), .0, {css:{right:-windowWidth}}));
	
	
	var lastScrollTop = 0;
	$(window).scroll(function(){
	   var st = $(this).scrollTop();
	   if (st > lastScrollTop){
		   // downscroll code
		   controller.addTween('#eMobilite', TweenMax.to( $('#sehirici div.leftPage'), .90, {css:{left:-$(window).width()}}),200);
		   controller.addTween('#eMobilite', TweenMax.to( $('#sehirici div.rightPage'), .90, {css:{right:-$(window).width()}}),200);
	   } else {
		   controller.removeTween('#eMobilite');
		   controller.removeTween('#eMobilite');
		   
		   controller.addTween('#sehirlerarasi video', TweenMax.to($('#sehirlerarasi video'),.2,{ onComplete: function(){
				sehirlerarasi_video.play();
				sehirici_video.pause();
				eMobilite_video.pause();
				lojistik_video.pause();
				$("#lojistik .logisticsBoxes li img").removeClass("animation");
		   }}));
		   
		   controller.addTween('#sehirici video', TweenMax.to($('#sehirici video'),.2,{ onComplete: function(){
				sehirici_video.play();
				sehirlerarasi_video.pause();
				eMobilite_video.pause();
				lojistik_video.pause();
				$("#lojistik .logisticsBoxes li img").removeClass("animation");
			}}));
			
			controller.addTween('#eMobilite video', TweenMax.to($('#eMobilite video'),.2,{ onComplete: function(){
				eMobilite_video.play();
				sehirlerarasi_video.pause();
				sehirici_video.pause();
				lojistik_video.pause();
				$("#lojistik .logisticsBoxes li img").removeClass("animation");
			}}));
			
			controller.addTween('#lojistik video', TweenMax.to($('#lojistik video'),.2,{ onComplete: function(){
				lojistik_video.play();
				sehirlerarasi_video.pause();
				sehirici_video.pause();
				eMobilite_video.pause();
				$("#lojistik .logisticsBoxes li img").addClass("animation");
			}}));
		
	   }
	   lastScrollTop = st;
	});
	/*controller.pin($('#sehirlerarasi'), 3000, {
		anim: (new TimelineLite())
			.append(
				TweenMax.to($('#sehirlerarasi .content'), .5, 
					{css:{width: 980}})
			)
	})*/
	
}
			
function resize(e){
	var wh = document.body.offsetHeight; 
	$(".slider div").css("height", wh);
	$("article#anasayfa .videoWrap, article#sehirlerarasi .videoWrap, article#sehirici .videoWrap, article#eMobilite videoWrap, article#lojistik videoWrap").height(wh);
	$("article#anasayfa, article#sehirlerarasi, article#sehirici, article#eMobilite, article#lojistik").height(wh);
	$("body").removeClass("overflowY");
}

function formInputValue(obj,objTxt) {
	$(obj).focus(function(){
		if($(this).val() == objTxt){
			$(this).val("");
		}
	});
	$(obj).blur(function(){
		if($(this).val() == ""){
			$(this).val(objTxt);
		}
	});
}

$(window).on("resize", function(){
	
	$(".slider").each(function() {
		$(this).slidesjs({
		   height: document.body.offsetHeight,
		   navigation: {
			  effect: "fade"
		   },
		   effect: {
			  fade: {
				speed: 1500
			  }
		   },
		   pagination:false
	   });
    });
	
   resize();
   
   //Resize Page
   $(".leftPage").css({"left":-$(window).width()});
   $(".rightPage").css({"right":-$(window).width()});
   $("#shareAndForm").css({"right":-$(window).width()});
	
});

$(document).ready(function() {
	
	if($.browser.msie && $.browser.version < 9)
	{
		$(".browserUpdate").show();
		$("body").css("overflow","hidden");
	}
	
	windowWidth = $(window).width();
	
	animation();
	
	$("article#anasayfa, article#sehirlerarasi, article#sehirici, article#eMobilite, article#lojistik").height(document.body.offsetHeight);
	
	//Resize Page
	$(".leftPage").css({"left":-$(window).width()});
	$(".rightPage, #shareAndForm").css({"right":-$(window).width()});
	
	$(".navButton").click(function(){
		var $anchor = $(this);
		var thisRel = $(this).attr("rel");
		var thisObj = $(this);
		
		$(".slider").find(".slidesjs-control").width($(window).width());         
		$(".slider").find(".slidesjs-control").height($(window).height()); 
		$(".slider").find(".slidesjs-container ").width($(window).width());         
		$(".slider").find(".slidesjs-container ").height($(window).height()); 
		
		
		
		if($(window).scrollTop() == $($anchor.attr("href")).position().top){
			
			$("body").addClass("overflowY");
			$(".leftPage[title=leftSubPage]").css({"left":-$(window).width()});
			$(".rightPage[title=rightSubPage], #shareAndForm").css({"right":-$(window).width()});
			
			$("div.leftPage").each(function(){
				if($(this).attr("title") == thisRel)
				{
					$(this).animate({'left': (0)+'px'},{ queue:false, duration:700, easing:"easeInOutExpo"});
					if(thisObj.hasClass("heightButton"))
					{
						$(this).find(".subContent").addClass("wrapHeight");
						//$(this).find(".cozumOnerileri").hide();
					}else{
						$(this).find(".subContent").removeClass("wrapHeight");
						//$(this).find(".cozumOnerileri").show();
					}
				}
			});
			
			$("div.rightPage").each(function(){
				if($(this).attr("title") == thisRel)
				{
					$(this).animate({'right': (0)+'px'},{queue:false, duration:700, easing:"easeInOutExpo"});
					if(thisObj.hasClass("heightButton"))
					{
						$(this).find(".subContent").addClass("wrapHeight");
						//$(this).find(".cozumOnerileri").hide();
					}else{
						$(this).find(".subContent").removeClass("wrapHeight");
						//$(this).find(".cozumOnerileri").show();
					}
				}
			});
			
			setTimeout(function(){
				$(".roundInfoBoxesSlide").each(function(){
					$(this).carouFredSel({
						auto:false,
						infinite:false,
						circular: false,
						scroll: {
							item:3,
							pauseOnHover :true,
							duration:2000
						},
						prev	: {	
							button	: $(this).parents(".roundCarousel").find(".foo_prev"),
							key		: "left"
						},
						next	: { 
							button	: $(this).parents(".roundCarousel").find(".foo_next"),
							key		: "right"
						}
					});
				});
			},200);
			
			setTimeout(function(){
				$(".roundBoxes li img").addClass("animation");
			},700);
					
		}else{
			
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500,'easeInOutExpo');
			
			setTimeout(function(){
				
				$("body").addClass("overflowY");
				$(".leftPage[title=leftSubPage]").css({"left":-$(window).width()});
				$(".rightPage[title=rightSubPage], #shareAndForm").css({"right":-$(window).width()});
				
				$("div.leftPage").each(function(){
					if($(this).attr("title") == thisRel)
					{
						$(this).animate({'left': (0)+'px'},{ queue:false, duration:700, easing:"easeInOutExpo"});
						if(thisObj.hasClass("heightButton"))
						{
							$(this).find(".subContent").addClass("wrapHeight");
							//$(this).find(".cozumOnerileri").hide();
						}else{
							$(this).find(".subContent").removeClass("wrapHeight");
							//$(this).find(".cozumOnerileri").show();
						}
					}
				});
				
				$("div.rightPage").each(function(){
					if($(this).attr("title") == thisRel)
					{
						$(this).animate({'right': (0)+'px'},{queue:false, duration:700, easing:"easeInOutExpo"});
						if(thisObj.hasClass("heightButton"))
						{
							$(this).find(".subContent").addClass("wrapHeight");
							//$(this).find(".cozumOnerileri").hide();
						}else{
							$(this).find(".subContent").removeClass("wrapHeight");
							//$(this).find(".cozumOnerileri").show();
						}
					}
				});
				
				setTimeout(function(){
					$(".roundInfoBoxesSlide").each(function(){
						$(this).carouFredSel({
							auto:false,
							infinite:false,
							circular: false,
							scroll: {
								item:3,
								pauseOnHover :true,
								duration:2000
							},
							prev	: {	
								button	: $(this).parents(".roundCarousel").find(".foo_prev"),
								key		: "left"
							},
							next	: { 
								button	: $(this).parents(".roundCarousel").find(".foo_next"),
								key		: "right"
							}
						});
					});
				},200);
				
				setTimeout(function(){
					$(".roundBoxes li img").addClass("animation");
				},700);
				
				
			},1500);
			
		}
		
	
		return false;
	});
	
	$(".socialButton").click(function(){
		var offsetTop = $(".socialButton").offset().top;
		if($("html").hasClass("mobile") == true)
		{
			$("#shareAndForm").css("top",offsetTop - 165);
			$("html.mobile #shareAndForm").fadeIn();
		}else{
			$("#shareAndForm").css("top",offsetTop - 165);
			$("#shareAndForm").animate({'right': (0)+'px'},{ queue:false, duration:700, easing:"easeInOutExpo"});
		}
		return false;
	});
	
	$(".closeButtonv2").click(function(){
		if($("html").hasClass("mobile") == true)
		{
			$("html.mobile #shareAndForm").fadeOut();
		}else{
			$("#shareAndForm").animate({'right': -$(window).width()},{ queue:false, duration:700, easing:"easeInOutExpo"});
		}
		return false;
	});
	
	$(".closeButton").click(function(){
		var thisRel = $(this).attr("rel");
		var thisObj = $(this);
		$("body").removeClass("overflowY");
		
		$("div.leftPage").each(function(){
			if($(this).attr("title") == thisRel)
			{
				$(this).animate({'left': -$(window).width()},{queue:false, duration:700, easing:"easeInOutExpo",complete:function(){
					$(thisObj).parents(".subContent").removeClass("wrapHeight");
					//$(thisObj).find(".cozumOnerileri").show();				
				}});
			}
		});
		$("div.rightPage").each(function(){
			if($(this).attr("title") == thisRel)
			{
				$(this).animate({'right': -$(window).width()},{queue:false, duration:700, easing:"easeInOutExpo",complete:function(){
					$(thisObj).parents(".subContent").removeClass("wrapHeight");
					//$(thisObj).find(".cozumOnerileri").show();	
				}});
			}
		});
		
		return false;
	});
	
	$(".roundBoxes li a").click(function(){
		var index = $(this).parent("li").index();
		var thisRel = $(this).attr("rel");
		$("div").each(function(){
			if($(this).attr("title") == thisRel)
			{
				$(this).find(".tabsButtons li").removeClass("active");
				$(this).find(".tabsContainer .tabSection").removeClass("active");
				$(this).find(".tabsButtons li").eq(index).addClass("active");
				$(this).find(".tabsContainer .tabSection").eq(index).addClass("active");
				
				$(this).find(".slider").addClass("dn").removeClass("active");
				$(this).find(".slider:eq("+ index +")").removeClass("dn").addClass("active");

			}
		});
		
		
		
		return false;
	});
	
	// ScrollTo Init
	
	$(".homeNav li a, #downArrow, nav li a, h1#logo a").bind('click',function(){
        var $anchor = $(this);
 
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500,'easeInOutExpo');
        
        return false;
    });
	
	$('.bottomNav').onePageNav({
		begin: function() {
			$("body").removeClass("overflowY");
		},
		end: function() {
			$("body").removeClass("overflowY");
		}
	});
	
	/*-==  Scrool Fixed Function Start ==-*/
	
	$("nav").scrollSticky({
		stickyStart:'auto'
	});

	/*-==  Scrool Fixed Function End ==-*/
	
	//Menu Navigation
	/*$(".clickNavActive").click(function(){
		$(this).parents("nav").animate({'bottom': (-54)+'px'},{duration:500});
		$(this).parent().find(".clickNav").animate({'bottom': (0)+'px'},{duration:500});
		setTimeout(function(){
			$("nav").addClass("active");
		},500);
		return false;
	});
	
	$(".clickNav").click(function(){
		$(this).animate({'bottom': (-105)+'px'},{duration:100});
		$(this).parents("nav").animate({'bottom': (1)+'px'},1000);
		return false;
	});*/
	$(".clickNavActive").click(function(){
		$(this).parents("nav").animate({'bottom': (-54)+'px'},{duration:500});
		$(this).parent().find(".clickNav").animate({'bottom': (0)+'px'},{duration:500});
		setTimeout(function(){
			$("nav").addClass("active");
		},500);
		return false;
	});
	
	$(".clickNav").click(function(){
		$(this).animate({'bottom': (-105)+'px'},{duration:100});
		$(this).parents("nav").animate({'bottom': (0)+'px'},1000);
		setTimeout(function(){
			$("nav").removeClass("active");
		},500);
		return false;
	});
	
	/*-==  Tabs Function Start ==-*/
	
	$(".tabsButtons li a").click(function(){
		$(this).parents(".subContent").removeClass("wrapHeight");
		//$(this).parents(".subContent").find(".cozumOnerileri").show();
		var index = $(this).parent().index(".tabsButtons li");
		$(".tabsButtons li.active").removeClass("active");
		$(".tabsContainer .tabSection").hide();
		$(this).parent("li").addClass("active");
		$(".tabsContainer .tabSection").removeClass("active");
		$(".tabsContainer .tabSection").eq(index).addClass("active");
		/*if($(this).parents(".subContent").height() == 169){
			$(this).parents(".subContent").find(".subMenuTrigger").show();
		}*/
		
		$(".slider").addClass("dn");
		$(".slider.active").removeClass("active");
		$(this).parents("div").find(".slider:eq("+ $(this).parent("li").index() +")").removeClass("dn").addClass("active");
		
		return false;
	});
	
	$(".tabsButtons li.lie a").click(function(){
		$(".roundInfoBoxesSlide").each(function(){
			$(this).carouFredSel({
				auto:false,
				infinite:false,
				circular: false,
				scroll: {
					item:3,
					pauseOnHover :true,
					duration:2000
				},
				prev	: {	
					button	: $(this).parents(".roundCarousel").find(".foo_prev"),
					key		: "left"
				},
				next	: { 
					button	: $(this).parents(".roundCarousel").find(".foo_next"),
					key		: "right"
				}
			});
		});
		$(this).parents(".subContent").addClass("wrapHeight");
		//$(this).parents(".subContent").find(".cozumOnerileri").hide();
		//$(".subMenuTrigger").hide(); 
		return false;
	});
	
	/*-==  Tabs Function End ==-*/
	
	/*-==  Open Menu Function Start ==-*/
	
	/*$(".cozumOnerileri").click(function(){
		if($(this).hasClass("active"))
		{
			if(windowWidth <= 1366)
			{
				$(this).parents("div.subContent").animate({'height':(425)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			}
			$(this).parents("div.subContent").animate({'height':(460)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			$(this).parents("div.subContent .content").animate({'height':(336)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			//$(this).removeClass("active");
			$(".cozumOnerileri").removeClass("active");
			//$(".subMenuTrigger").fadeOut(500);
			$(".slidesjs-navigation").animate({marginTop: '150px'},1000,"swing");
			$(".slider div").animate({backgroundPosition: 'center 70px'},1000,"swing");
			$(".slider hgroup").animate({bottom: '-185px'},1000,"swing");
			$(".slider hgroup aside p.head").animate({marginBottom: '100px'},1000,"swing");
			$(".overlay").fadeIn(500);
		}else{
			$(this).parents("div.subContent").animate({'height':(169)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			$(this).parents("div.subContent .content").animate({'height':(45)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			//$(this).addClass("active");
			$(".cozumOnerileri").addClass("active");
			//$(".subMenuTrigger").fadeIn(500);
			$(".slidesjs-navigation").animate({marginTop: '-10px'},1000,"swing");
			$(".slider div").animate({backgroundPosition: 'center -20px'},1000);
			$(".slider hgroup").animate({bottom: '120px'},1000,"swing");
			$(".slider hgroup aside p.head").animate({marginBottom: '15px'},1000,"swing");
			$(".overlay").fadeOut(500);
		}
		return false;
	});*/
	
	/*-==  Open Menu Function End ==-*/

	/*-==  Slider Function Start ==-*/
	
	$(".slider").each(function() {
        $(this).slidesjs({
			height: document.body.offsetHeight,
			navigation: {
			  effect: "fade"
			},
			effect: {
			  fade: {
				speed: 1500
			  }
			},
			pagination:false
		  });
    });
	
	$(".slider").each(function(){
		if($(this).find(".slidesjs-slide").length <= 1){
			$(this).find(".slidesjs-navigation").addClass("dn");
		}else{
			$(this).find(".slidesjs-navigation").removeClass("dn").show();
		}
	});
	  
	$("article#anasayfa .videoWrap, article#sehirlerarasi .videoWrap, article#sehirici .videoWrap, article#eMobilite videoWrap, article#lojistik videoWrap").height(document.body.offsetHeight);
	
	$(".slider.dn").hide();
	
	
	resize();
	
	/*-==  Slider Function End ==-*/
	
	/*$(".overlay").click(function(){
		if($(".cozumOnerileri").hasClass("active"))
		{
			if(windowWidth <= 1366)
			{
				//$(".cozumOnerileri").parents("div.subContent").animate({'height':(425)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			}
			//$(".cozumOnerileri").parents("div.subContent").animate({'height':(460)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			//$(".cozumOnerileri").parents("div.subContent .content").animate({'height':(336)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			//$(this).removeClass("active");
			//$(".cozumOnerileri").removeClass("active");
			//$(".subMenuTrigger").fadeOut(500);
			//$(".slidesjs-navigation").animate({marginTop: '150px'},1000,"swing");
			//$(".slider div").animate({backgroundPosition: 'center 70px'},1000,"swing");
			$(".slider hgroup").animate({bottom: '-185px'},1000,"swing");
			$(".slider hgroup aside p.head").animate({marginBottom: '100px'},1000,"swing");
			$(".overlay").fadeIn(500);
		}else{
			//$(".cozumOnerileri").parents("div.subContent").animate({'height':(169)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			//$(".cozumOnerileri").parents("div.subContent .content").animate({'height':(45)+'px'},{queue:false, duration:500, easing:"easeInOutExpo"});
			//$(this).addClass("active");
			//$(".cozumOnerileri").addClass("active");
			//$(".subMenuTrigger").fadeIn(500);
			//$(".slidesjs-navigation").animate({marginTop: '-10px'},1000,"swing");
			$(".slider div").animate({backgroundPosition: 'center -20px'},1000);
			$(".slider hgroup").animate({bottom: '120px'},1000,"swing");
			$(".slider hgroup aside p.head").animate({marginBottom: '15px'},1000,"swing");
			$(".overlay").fadeOut(500);
		}
		return false;
	});*/
	
	/*-==  Animation Function Start ==-*/
	
	/*controller.addTween('#sehirlerarasi', TweenMax.to($('#sehirlerarasi'),.2,{ onComplete: function(){
		sehirlerarasi_video.play();
		sehirici_video.pause();
		eMobilite_video.pause();
		lojistik_video.pause();
	}}));
	
	controller.addTween('#sehirici', TweenMax.to($('#sehirici'),.2,{ onComplete: function(){
		sehirici_video.play();
		sehirlerarasi_video.pause();
		eMobilite_video.pause();
		lojistik_video.pause();
	}}));
	controller.addTween('#eMobilite', TweenMax.to($('#eMobilite'),.2,{ onComplete: function(){
		eMobilite_video.play();
		sehirlerarasi_video.pause();
		sehirici_video.pause();
		lojistik_video.pause();
	}}));
	controller.addTween('#lojistik', TweenMax.to($('#lojistik'),.2,{ onComplete: function(){
		lojistik_video.play();
		sehirlerarasi_video.pause();
		sehirici_video.pause();
		eMobilite_video.pause();
	}}));*/
	
	/*controller.addTween('#anasayfa', TweenMax.from( $('.rightLogos'), .0, {css:{display:'none'}}));
	controller.addTween('#sehirlerarasi', TweenMax.to( $('.rightLogos'), .0, {css:{display:'block'}}));
	controller.addTween('#anasayfa', TweenMax.to( $('.rightLogos'), .0, {css:{display:'none'}}));
	controller.addTween('#sehirlerarasi', TweenMax.from( $('.rightLogos'), .0, {css:{display:'block'}}));*/
	
	//controller.addTween('#sehirlerarasi', TweenMax.from( $('.rightLogos'), .0, {css:{display:'block'}}));
	
	//controller.addTween('#anasayfa', TweenMax.from( $('.rightLogos'), .0, {css:{display:'none'}}));
	/*yok olma*/
	//controller.addTween('#sehirlerarasi', TweenMax.from( $('.rightLogos'), .0, {css:{display:'block'}}));
	
	
	/*controller.pin($('#sehirlerarasi'), 3000, {
		anim: (new TimelineLite())
			.append(
				TweenMax.fromTo($('.rightLogos'), 2, 
					{css:{margin:"24px 80px 0 0"}, immediateRender:true}, 
					{css:{}})
			)
	})*/
	
	/*-==  Animation Function End ==-*/
	
	$(".socialMini").hover(function(){
		$(this).find("a.button").fadeOut(100);
		$(this).find(".mini").fadeIn(200);
	},function(){
		$(this).find(".mini").fadeOut(100);
		$(this).find("a.button").fadeIn(200);
	});

	/*-==  Contact Form Function Start ==-*/
	
	if($.browser.msie && parseInt($.browser.version) < 10)
	{
		var nameSurname = "#adSoyad";
		var eMail = "#email";
		var message = "#mesaj";
		
		$(nameSurname).val("Adınız, Soyadınız");
		$(eMail).val("E-Mail Adresiniz");
		$(message).val("Mesajınız");
		
		formInputValue(nameSurname,"Adınız, Soyadınız");
		formInputValue(eMail,"E-Mail Adresiniz");
		formInputValue(message,"Mesajınız");
			
	}
	
	$.validator.addMethod('requiredDefault', function(value, element, param) {
		return value && value != param; // Compare with blank and default (parameter) value
	},
	'');
	
	$("#contactForm").validate({
		rules:{
			adSoyad:{ requiredDefault: 'Adınız, Soyadınız' },
			email:{ requiredDefault: 'E-Mail Adresiniz' },
			mesaj:{ requiredDefault: 'Mesajınız' }
		},
		submitHandler:function(){
			var adSoyad = $("#adSoyad").val();
			var email = $("#email").val();
			var mesaj = $("#mesaj").val();
			
			$.ajax({				   
				type:"POST",				   
				url:"/p/MobilityMS.asp",				   
				data:"adsoyad="+ adSoyad +"&mail="+ email +"&mesaj="+ mesaj +"&mid=16996",				   
				beforeSend: function(){
					$("#contactForm input[type=submit]").attr("disabled","disabled").val("Gönderiliyor");
				},				   
				success: function(response){
					if(response == "OK"){
						$("#contactForm").hide();
						$(".response").html("<p>Form başarıyla gönderildi.</p>");
						$("#contactForm input[type=submit]").removeAttr("disabled");
					}else{
						$("#contactForm").hide();
						$(".response").html("<p>Form gönderilirken hata oluştu. Lütfen daha sonra tekrar deneyiniz.</p>");
						$("#contactForm input[type=submit]").removeAttr("disabled");
					}
				}			
			});
		}
	});
	

	/*-==  Contact Form Function End ==-*/
	
});



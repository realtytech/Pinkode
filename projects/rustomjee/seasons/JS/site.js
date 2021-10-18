function showLoader(){
	if($("div.loader").length > 0){
	 	$("div.loader").fadeIn(100);
	}
}

function hideLoader(){
	if($("div.loader").length > 0){
	 	$("div.loader").fadeOut(100);
	}
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
	
function isNumberMobile(event){
    var max = 12;
    var currentVal = $(event.target).val();
    currentVal = currentVal.replace(/\D/g,'');
    $(event.target).val(currentVal);
    if($(event.target).val().length > max) {
        $(event.target).val($(event.target).val().substr(0, max));
    } 
}

	   
function isString(evt){
    var keyCode = (evt.which) ? evt.which : evt.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
     
    return false;
        return true;
}

$( window ).load(function() {
	if(location.hash){
		var currHash = location.hash.replace("#","");
		$(".menu-box ul.home a[rel="+currHash+"]").trigger("click");
		location.hash="";
		return false;
	}
	var totSectionH = $("ul.config-table").outerHeight();
	$("div#configurations-sec").find('div.img-box').css('height',totSectionH);
});

function cropFitChild(parent,child){
	if($(parent).length > 0 && $(child).length > 0){
		var p = $(parent); var c = $(child);
		var childW = c.width(); var childH = c.height();
		var parentW = p.width(); var parentH = p.height();
		var newW,newH,left,top;
		if(childW > childH){
			newH = parentH;
			newW = childW*newH/childH;
			top = 0;
			left = (parentW - newW )/2;
		} else {
			newW = parentW;
			newH = childH*newW/childW;
			left = 0;
			top = (parentH - newH)/2;
		}
		c.css({ "width":newW+"px","height":newH+"px","left":left+"px","top":top+"px"});
	}
}

$(document).ready(function(){
$('div.instant-switch').click(function () {
	$("div.callback-div").addClass("active");
});
$('div.callback-div div.hide').click(function () {
	$("div.callback-div").removeClass("active");
});
$("div.popup-form").show();
$('div.popup-form a.close').click(function () {
	$("div.popup-form").hide();
	return false;
});

$('[data-fancybox="g-tab-1"],[data-fancybox="g-tab-2"],[data-fancybox="g-tab-3"],[data-fancybox="g-tab-4"]').fancybox({
	thumbs : {
		showOnStart : true
	},
	hash : true
})

	slickInitial();
	//$("div.sticky-button a.desk-view").hide();
	   
	if($(window).width()<1024){
		if($("div.sticky-button a.enuire-now").hasClass("desk-view")){
			$("div.sticky-button a.enuire-now").removeClass("desk-view");
			$("div.form-popup").removeClass("desk-view-frm");
		}
		$("div.sticky-button a.receiver").show();
		$('.plan-list').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
		});
		
		$('.action a.enq-now').click(function(){
			$('footer .sticky-form').addClass('active');
		});
		$('a.form-close').click(function(){
			$('footer .sticky-form').removeClass('active');
		});
		
		$('.action a.callback').click(function(){
			$('div.form-wrap.ask-expert').addClass('active');
		});
		$('div.ask-expert a.form-close').click(function(){
			$('div.form-wrap.ask-expert').removeClass('active');
		});
		
		$('div.instant-switch').click(function(){
			$('div.callback-div').addClass('active');
		});
		$('a.hide').click(function(){
			$('div.callback-div').removeClass('active');
		});
		
		$('.luxery-list ul').slick({
				dots: true,
				adaptiveHeight: true,
				infinite: true,
				centerMode: true,
				cellpadding:"0",
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				responsive: [
    		    {
				  breakpoint: 1023,
				  settings: {
				  centerMode: true,
					arrows: true,
					slidesToShow: 1,
					cellpadding:"0",
					centerMode: false,
				    }
				  }
  			    ]
			});
	}else{
		$("div.sticky-button a.receiver").hide();
	}
	if($(window).width()>1365){
	var headerH = 73;
	}else{
		var headerH = 53;
	}
	$('.menu-box ul.home a[rel]').click(function(e){
		e.preventDefault();
		var hashValue = $(this).attr("href");
		hashValue = hashValue.replace(SITEURL,"");
		hashValue = hashValue.replace("/","");
		$('#nav-icon').removeClass('open');
		$('.menu-box').removeClass('active');
		$('html, body').stop().animate({
		    'scrollTop': ($(hashValue).offset().top-headerH+50)
		}, 1000,'linear', function () {
		    
		});
	});
	
	//var frmTop = $('div.form-wrap').offset().top;
	jQuery(window).scroll(function() {
		var winTop = jQuery(window).scrollTop();
		var logoTop = $('div.header').innerHeight();
		//console.log(3);
		if (winTop > logoTop) {
        	jQuery("div.header").addClass("sticky-header");
        } else {
            jQuery("div.header").removeClass("sticky-header");
        }
		if($(window).width()>768){
			
		}else{
			// var aboutSahanaTop = $("#about-sahana").offset().top;
            /* var frmEnquiryHeight = $("#frmEnquiry-sec").outerHeight();
			var frmEnquiryTop = $("#frmEnquiry-sec").offset().top;
			var footerTop = $(".footer").offset().top;

			if((winTop+frmEnquiryHeight+50) >= frmEnquiryTop && (winTop+frmEnquiryHeight+50) < footerTop) {
			 	$('div.sticky-button a.enuire-now').hide();
			 	$('div.sticky-button a.receiver').addClass('onlyReceiverShow');
			}else{
				$('div.sticky-button a.enuire-now').show();
				$('div.sticky-button a.receiver').removeClass('onlyReceiverShow');
			} */
		}
		var aboutTop = $("#about").offset().top;
		//var amiTop = $("#passion-sec").offset().top;
		/*var speciTop = $("#luxery-sec").offset().top;*/
		var confiTop = $("#configurations-sec").offset().top;
		var galleryTop = $("#gallery").offset().top;
		// var walkThroughTop = $("#walk-through").offset().top;
		//var planTop = $("#floor-plan").offset().top;
		var locationTop = $("#location-sec").offset().top;
		var contactTop = $("#contact").offset().top;
		var disclaimerTop = ($("#disclaimer").offset().top-100);
		//var frmEnquiryTop = $("#frmEnquiry-sec").offset().top;
		//var aboutTop = $("#about-seth").offset().top;

		if((winTop+headerH) >= aboutTop && (winTop+headerH) < confiTop ) {
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=about]').addClass('active');
		}else if((winTop+headerH) >= confiTop && (winTop+headerH) < galleryTop) {
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=configurations-sec]').addClass('active');
		}else if((winTop+headerH) >= galleryTop && (winTop+headerH) < locationTop) {
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=gallery]').addClass('active');
		}else if((winTop+headerH) >= locationTop && (winTop+headerH) < contactTop) {
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=location-sec]').addClass('active');
		}else if((winTop+headerH) >= contactTop && (winTop+headerH) < disclaimerTop) {
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=contact]').addClass('active');
		}else if((winTop+headerH) >= disclaimerTop) {
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=disclaimer]').addClass('active');
		}
		/*else if((winTop+headerH) >=aboutTop){
			$('ul.home li a').removeClass('active');
			$('ul.home li a[rel=about-seth]').addClass('active');	
		}*/

		// if((winTop+headerH) < frmEnquiryTop){
		// 	$("div.sticky-button a.desk-view").hide();
		// }else{
		// 	$("div.sticky-button a.desk-view").show();
		// }
	});

	$('#nav-icon').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('open');
		$('.menu-box').toggleClass('active');
	});
	if ($(window).width() > 1023) {
	}
	
	$("form.frmEnquiry,form.frmInstantCallback,form.frmPopup,form.price-enquiry-form").submit(function(){    
	    if(FLGERR == 0){
			var aUrl = SITEURL+"/inc/site.inc.php?xAction=saveEnquiry";
			showLoader();
			$.ajax({
				type: 'post',
				url: aUrl,
				data : $(this).serialize(),
				success: function(data){
					if(data.trim() == "OK"){ 
						$("form.frmEnquiry").trigger('reset'); 
						$("#webToLeadSubmit").trigger('click'); 
                        window.location = SITEURL+"/thank-you/";
					}else{ 
						hideLoader();  
						data = JSON.parse(data);
                        var exists = 0;
                        $.mxalert({msg:"Sorry, Some error occured try after some time."});
                       	$("html, body").animate({ scrollTop: $("div.register-section ul.form-list:first").offset().top }, 500);     
					}   
				}
			});     
		}
		return false;
	});

	$("form.e-brochure-form").submit(function(){
    	if(FLGERR == 0){ 
			var aUrl = SITEURL+"/inc/site.inc.php?xAction=downloadBroucherEntry";
			showLoader();
			$.ajax({
				type: 'post',
				url: aUrl,
				data : $(this).serialize(),
				success: function(data){					
					if(data.trim() == "OK"){
						$("form.e-brochure-form").trigger('reset'); 
						$(".e-brochure-popup").hide();
						$.mxalert({msg:"Thank you for download broucher."});
						setTimeout(window.location = SITEURL+"/thank-you/?formType=downloadBrochure", 1000);
					}else{ 
						hideLoader();  
						data = JSON.parse(data);
                        $.mxalert({msg:"Sorry, Some error occured try after some time."});
					}   
				}
			});     
		}
		return false;
	});  
	
	$('.enuire-now').click(function(){
		$('.form-popup').mxpopup({modal:true});
		$("div.sticky-button a.enuire-now").hide();
		$("body").css("overflow","hidden");
	});

	$('a#ebroucher').click(function(event) {
    	$('.e-brochure-popup').mxpopup();	 
    });

    $("div.form-popup a.frm-close-btn").click(function(){
		$("div.sticky-button a.enuire-now").show();
		$("body").css("overflow","");
	});

	if($(window).width()>=1024){
		$('.tab-list li').click(function(){		
			var currID = $(this).attr('id');
			var crtTabs = $(this).attr('data-ref');
			$(this).parent().find('a').removeClass('active');
			$('.'+crtTabs).hide();
			$('div.'+currID).show();
			$(this).find('a').addClass('active');
			slickInitial();
			return false;
		});
	}else{
		$('div.tower-wrap select.gallery-tab').change(function(){		
			var currID = $(this).val();
			$('.gall-tab-data').hide();
			$('div.'+currID).show();
			slickInitial();
			return false;
		});
		$('div.tower-wrap select.plan-tab').change(function(){		
			var currID = $(this).val();
			$('.plan-tab-data').hide();
			$('div.'+currID).show();
			slickInitial();
			return false;
		});
	}
});

function slickInitial(){
	if($('.plan-slider').hasClass('slick-initialized')){
        $('.plan-slider').slick('unslick');
    }
    
    var varRows = 2;
    if($(window).width() <= 767)
     varRows = 1;
	$('.plan-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			arrows:false,
			dots:false,
			speed: 1000,
			infinite: false,
			rows:varRows,
			responsive: [{
			breakpoint:480,
				settings: {
				slidesToShow: 1,
				slidesToScroll:1,
				arrows:false,
				centerMode:true,
				dots:true,
				focusOnSelect: true
			}
		},			
 
	  ]
	   });
	   
	  /* $(".virtual-tour").colorbox({iframe:true, width:"80%", height:"80%"});	
	   if($(window).width()>768){	
		   $(".plans_img").colorbox({
				inline:true,
				width: '800px',
				height:'500px',
				onComplete:function() {
				var rel = $(this).attr("data-image");
				$("#" + rel).smoothZoom({
					width: '760',
					height: '500',
					pan_BUTTONS_SHOW: "YES",
					pan_LIMIT_BOUNDARY: "YES",
					button_SIZE: 15,
					button_ALIGN: "bottom right",
					zoom_MAX: 150,
					border_TRANSPARENCY: 0,
				});
				$.colorbox.resize();
				}
			});
	   }  */
}
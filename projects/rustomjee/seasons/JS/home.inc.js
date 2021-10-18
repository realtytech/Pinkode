$(document).ready(function(){

	$("form.price-enquiry-form").submit(function(){
    	if(FLGERR == 0){ 
			var aUrl = SITEURL+"/mod/home/x-home.inc.php?xAction=priceEnquiryEntry";
			showLoader();
			$.ajax({
				type: 'post',
				url: aUrl,
				data : $(this).serialize(),
				success: function(data){ 
					if(data.trim() == "OK"){ 
						$("form.price-enquiry-form").trigger('reset'); 
						setTimeout(window.location = SITEURL+"/thank-you/", 1000);
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


	//slickInitial();
//$(".virtual-tour").colorbox({iframe:true, width:"80%", height:"80%"});	
if($(window).width()>768){	
	// $(".plans_img").colorbox({
	// 	 inline:true,
	// 	 width: '800px',
	// 	 height:'500px',
	// 	 onComplete:function() {
	// 	 var rel = $(this).attr("data-image");
	// 	 $("#" + rel).smoothZoom({
	// 		 width: '760',
	// 		 height: '500',
	// 		 pan_BUTTONS_SHOW: "YES",
	// 		 pan_LIMIT_BOUNDARY: "YES",
	// 		 button_SIZE: 15,
	// 		 button_ALIGN: "bottom right",
	// 		 zoom_MAX: 150,
	// 		 border_TRANSPARENCY: 0,
	// 	 });
	// 	 $.colorbox.resize();
	// 	 }
	//  });
}

	
	if($(window).width()<1024){
		$("a.plan-download").show();
	}else{
		$("a.plan-download").hide();
	}

	
	$(".fancybox-thumb,.plan-thumb").fancybox({
		openEffect  : 'none',
		closeEffect : 'none'
	});

	$(".fancybox-video").fancybox({ 
	   'autoScale'        : false,
	   'transitionIn'     : 'none',
	   'transitionOut'      : 'none',
	   'type'            : 'iframe' });

	// $(".plan-thumb").colorbox({
	// 	inline:true, width: '800px', height:'500px',
	// 	onComplete:function() {
	// 		var rel = $(this).attr("data-image");
	// 		$("#" + rel).smoothZoom({
	// 			width: '760',
	// 			height: '500',
	// 			pan_BUTTONS_SHOW: "YES",
	// 			pan_LIMIT_BOUNDARY: "YES",
	// 			button_SIZE: 15,
	// 			button_ALIGN: "bottom right",
	// 			zoom_MAX: 150,
	// 			border_TRANSPARENCY: 0,
	// 		});
	// 		$.colorbox.resize();
	// 	}
	// });

	//price form show hide	 
	$(".price-form").hide();
	$('.col3 a').click(function() {
	    $('.price-form').not($(this).closest('li').find('.price-form')).slideUp();
	    $(this).closest('li').find('.price-form').toggle(300);
	    return false;
	});
});
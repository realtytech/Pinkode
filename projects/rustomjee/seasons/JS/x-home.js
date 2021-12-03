$(document).ready(function(){

if($(window).width()>768){	

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


	//price form show hide	 
	$(".price-form").hide();
	$('.col3 a').click(function() {
	    $('.price-form').not($(this).closest('li').find('.price-form')).slideUp();
	    $(this).closest('li').find('.price-form').toggle(300);
	    return false;
	});
});
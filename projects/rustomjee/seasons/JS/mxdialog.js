/*
$.mxconfirm({
	top:"20%",
	message:"Nothing selected to perform this action.",
	buttons:{
			"ok":{"action":function(){ $("div.popup").mxpopuphide(); return false; }},
			"Cancel":{"action":function(){ $.mxalert.hide(); return false;}},
			"Close":{"action":function(){ $.mxconfirm.hide(); $("div.popup").mxpopup(); return false;}}
		}
});
$.mxalert({msg:"TESTING MESSAGE"});

$("div.popup").mxpopup();
*/


(function($){
	$.mxoverlay = function(){		
		if($('div.mxoverlay').length)	{ 
			return $('div.mxoverlay');
			//$('div.mxoverlay').remove(); 
		} else {
			var $overlay = $('<div class="mxoverlay transbg"></div>');					
			$overlay.css({'position':'fixed', 'z-index':'99', 'width':'100%', 'height':WINHEIGHT+'px',
				'background-color':'#FFF', 'background': 'rgb(0, 0, 0)', 'background': 'rgba(0, 0, 0, 0.6)',
				'filter:progid':'DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)',
				'-ms-filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)'});
			$("body").prepend($overlay);
			$overlay.hide();			
			$overlay.stop().fadeIn(300);
			return $overlay;
		}		
	}
	
	$.fn.mxdialog = function(){
		var $objpopup = $(this[0]);
		var params = arguments[0] || {};
		if($objpopup != null && $objpopup != undefined) {			 				
			var defaults = { modal:false,overlay:true};             
	        var params   = $.extend(defaults, params);			
			if(params.overlay) {
				var $overlay = $.mxoverlay();																						
				if(!params.modal){				
					$overlay.click(function(e) { $.mxoverlay.hide(); $objpopup.removeClass("mxdialog"); $objpopup.fadeOut(300,function(){ if($(this).hasClass("mxdestroy")) $(this).remove(); }); });					 
				}
			}
			$objpopup.addClass("mxdialog");
			$objpopup.hide();								 
			var boxW = $objpopup.outerWidth()/2;
			var boxH =  $objpopup.outerHeight()/2;					
			$objpopup.css({'position':'fixed','left':params.left,'top':params.top,'margin-left':'-'+boxW+'px','margin-top':'-'+boxH+'px'});
			
			if(params.btnclose)		
				$objpopup.find(params.btnclose).click(function() { $.mxoverlay.hide(); $objpopup.removeClass("mxdialog"); $objpopup.fadeOut(300,function(){ if($(this).hasClass("mxdestroy")) $(this).remove(); }); return false; });					
			$objpopup.fadeIn();	
		}
	}
		
	
	$.mxalert = function(params){
		if(params.msg){
			var defaults = { modal:false, top:'50%', left:'50%',overlay:true};        
	        var params   = $.extend(defaults, params);						
			if($("div#mxalert").length){ $("div#mxalert").remove(); }
			var $objpopup = $('<div id="mxalert"><a href="#" class="close">X</a>'+'<div id="mxalert-inside"><p>'+params.msg+'</p></div></div>');
			$("body").prepend($objpopup);							
			$objpopup.css({'z-index':'5003'});
			$objpopup.addClass("mxdestroy");					
			$objpopup.mxdialog({modal:params.modal,overlay:params.overlay,btnclose:"a.close",left:params.left,top:params.top});
		}
	}
	
	$.fn.mxpopup = function(){
		var $objpopup = $(this[0]);
		var params = arguments[0] || {};		
		if($objpopup != null && $objpopup != undefined) {			 				
			var defaults = { modal:false, top:'50%', left:'50%',overlay:true,btnclose:".btn-close"};             
	        var params   = $.extend(defaults, params);							
			$objpopup.css({'z-index':'100'});														
			$objpopup.mxdialog({modal:params.modal,overlay:params.overlay,btnclose:params.btnclose,left:params.left,top:params.top});		
		}
	}
	
	$.mxconfirm = function(params){
		var defaults = { modal:true, top:'50%', left:'50%',overlay:true};        
	    var params   = $.extend(defaults, params);
				
		var buttonHTML = '';
		$.each(params.buttons,function(name,obj){			
			buttonHTML += '<a href="#" class="button '+obj['class']+'">'+name+'</a>';			
			if(!obj.action){ obj.action = function(){};	}
		});
		if($("div#mxconfirm").length){ $("div#mxconfirm").remove(); }
		var $objpopup = $('<div id="mxconfirm"><p id="mxconfirm-msg">'+params.message+'</p><div id="mxconfirm-btn">'+buttonHTML+'</div></div>');
		$("body").prepend($objpopup);
						
		$objpopup.css({'z-index':'5002'});
		$objpopup.addClass("mxdestroy");					
		$objpopup.mxdialog({modal:params.modal,overlay:params.overlay,btnclose:"a.close",left:params.left,top:params.top});
		
		var buttons   = $('div#mxconfirm .button'),	i = 0;
		$.each(params.buttons,function(name,obj){
			buttons.eq(i++).click(function(){				
				obj.action();
				return false;
			});
		});		
	}

	$.mxconfirm.hide = function(){
		if($("div#mxconfirm").length){
			$.mxoverlay.hide();
			$("div#mxconfirm").removeClass("mxdialog");
			$("div#mxconfirm").fadeOut(300,function(){ $(this).remove(); });
		}
	}
	
	$.mxalert.hide = function(){
		if($("div#mxalert").length){
			$.mxoverlay.hide();
			$("div#mxalert").removeClass("mxdialog");
			$("div#mxalert").fadeOut(300,function(){ $(this).remove(); });
		}
	}
	
	$.fn.mxpopuphide = function(){
		var $objpopup = $(this[0]);
		var params = arguments[0] || {};		
		if($objpopup != null && $objpopup != undefined) {
			if($objpopup.hasClass("mxdialog")){
				$.mxoverlay.hide();
				$objpopup.removeClass("mxdialog");
				$objpopup.fadeOut(300);
			}
		}
	}
	
	$.mxoverlay.hide = function(){
		//alert($('div.mxdialog').length);
		if($('div.mxdialog').length == 1) {
			$('div.mxoverlay').fadeOut(300,function(){ $('div.mxoverlay').remove(); });
		}
	}
	
})(jQuery);
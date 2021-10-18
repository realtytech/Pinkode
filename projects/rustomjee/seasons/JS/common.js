var WINWIDTH   = 0;
var WINHEIGHT  = 0;
function setWindow(){	
	if(jQuery.browser.msie){ 
		WINWIDTH = document.documentElement.offsetWidth; 
		WINHEIGHT = document.documentElement.offsetHeight; 
	} else { 
		WINWIDTH = window.innerWidth;
		WINHEIGHT = window.innerHeight;
	}
}
setWindow();
jQuery.fn.toggleText = function() {
    var o = $(this);
	o.each(function(index, element) {
		if ($(element).val() == "") { $(element).val($(element).attr("title"));}
    	$(element).focus(function(){ if ($(element).val() == $(element).attr("title")){  $(element).val(""); } });
		$(element).blur(function() { if ($(element).val() == "") { $(element).val($(element).attr("title")); } });
	});
};

function handleEscape(e){ if (e.keyCode == 27){ hideMxPopup(); }}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}

$.extend({URLEncode:function(c){var o='';var x=0;c=c.toString();var r=/(^[a-zA-Z0-9_.]*)/;
  while(x<c.length){var m=r.exec(c.substr(x));
    if(m!=null && m.length>1 && m[1]!=''){o+=m[1];x+=m[1].length;
    }else{if(c[x]==' ')o+='+';else{var d=c.charCodeAt(x);var h=d.toString(16);
    o+='%'+(h.length<2?'0':'')+h.toUpperCase();}x++;}}return o;},
  URLDecode:function(s){var o=s;var binVal,t;var r=/(%[^%]{2})/;
  while((m=r.exec(o))!=null && m.length>1 && m[1]!=''){b=parseInt(m[1].substr(1),16);
  t=String.fromCharCode(b);o=o.replace(m[1],t);}return o;}
});

var ACTIVEPOUP = 0;
function showLoader(obj){
	var loader = $('<div id="pre-loader"><p>Wait...</p></div>');
	$("body").append(loader);
	loader.css("left",obj.offset().left+obj.width()-70);
	loader.css("top",obj.offset().top-obj.height()-1);
	loader.fadeIn(100);
}

function hideLoader(){
	$('div#pre-loader').fadeOut(100,function(){$(this).remove();});
}


function showTooltip(obj,textVal){
	var tip = $('<div id="mx-tooltip"><p>'+textVal+'</p><img class="bottom-arrow" src="'+SITEURL+'/images/tooltip-arrow.png"/></div>');
	$("body").append(tip);
	tip.css("left",obj.offset().left+obj.width()-55);
	tip.css("top",obj.offset().top-obj.height()-40);
	tip.fadeIn(200);
}

function hideTooltip(timer){
	if(!timer)
		timer = 100;
	$('div#mx-tooltip').fadeOut(timer,function(){$(this).remove();});
}

function getParameterByName( name,href )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
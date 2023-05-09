$(document).ready(function() {
    var wht = $(window).height();
    $(".home-slider-init, .full-height").height(wht);
    $(".home-slider-init").bxSlider({
        auto: true,
        mode: 'fade',
        pause: 6000,
        pager: true,
        controls: false
    })
    $(".specs-list li a").on("click", function() {
        var link = $(this).attr("rel");
        console.log(link);
        $(".specs-list li a").removeClass("active-specs");
        $(this).addClass("active-specs");
        $(".specs-tab").hide();
        $("#" + link).fadeIn();

    })
    $(".logo-wrapper a").on("click", function() { $("html, body").animate({ scrollTop: 0 }, 600); })
    $(".open-form, .close-btn").on("click", function() { $(".enquire-form").slideToggle(); })
    if ($(window).width() <= 1024) {
        $(".burger-menu").on("click", function() {
            $(".nav-wrapper").slideToggle();
        })
        $("nav a").on("click", function() {
            {
                $(".nav-wrapper").slideToggle();
            }
        })
    }
    // if($(window).width()<=700){
    // 	$(window).scroll(function(){
    // 		if($(window).scrollTop()>=50){
    // 			$('.logo-wrapper>a>img, .logo-wrapper>a').css('width','85px');
    // 		}
    // 		else{
    // 			$('.logo-wrapper>a>img, .logo-wrapper>a').css('width','85px');
    // 		}
    // 	})	
    // }

    var acc = document.getElementsByClassName("accordion");
    var panel = document.getElementsByClassName('panel');

    for (var i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            var setClasses = !this.classList.contains('active');
            setClass(acc, 'active', 'remove');
            setClass(panel, 'show', 'remove');

            if (setClasses) {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    }

    function setClass(els, className, fnName) {
        for (var i = 0; i < els.length; i++) {
            els[i].classList[fnName](className);
        }
    }
})
$("form").submit(function (e) {
    e.preventDefault();
    save_landing_pageinfo(e)
    console.log("SUbmitting form",e)


});

function save_landing_pageinfo(elm) {
    
    console.log("Saving  form",elm)
    elm = "contact-form"
    jQuery('#' + elm + ' input[type=submit], #' + elm + ' button').prop('disabled', true);
    setTimeout(function () {
        jQuery('#' + elm + ' input[type=submit], #' + elm + ' button').prop('disabled', false);
    }, 5000);
    
    var name = jQuery('#' + elm + ' input[name="fname"]').val();
    var mobile = jQuery('#' + elm + ' input[name="mobile"]').val();
    var cc = jQuery('#' + elm + ' select[name="cc"]').val();
    var email = jQuery('#' + elm + ' input[name="email"]').val();
    // var conf = jQuery('#' + elm + ' select[name="conf"]').val();
    var message = jQuery('#' + elm + ' input[name="message"]').val();
    var fsource = jQuery('#' + elm + ' input[name="source"]').val();
    var currentUrl = location.hostname;
    // var cstm_ppc_channel = Get_Cookie('cstm_ppc_channel');


    var regularExpression = /^[0-9]*$/;
    if (!regularExpression.test(mobile)) {
        alert("Enter Only Number");
        return false;
    }

    var min = 10;
    var max = 10;
    if (mobile.length < min) {
        //alert("Please Enter Valid Mobile Number");
        return false;
    }

    if (mobile.length > max) {
        //alert("Please Enter Valid Mobile Number");
        return false;
    }


    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        return false;
    }

    if (message == undefined) {
        message = "";
    }

    if (name != "" && mobile != "") {
        // $("#pageloader").fadeIn();

        if (elm == 'brochure-form') {
            document.getElementById('broucher1').click();
        }


        

    }
    
    var srd = queryParameter('SRD', currentUrl);


    if (!srd) srd = '7015g0000004xLTWT';
    var project = 'Hubtown Celeste';
    var utm_source = queryParameter('cstm_ppc_campaign',currentUrl);
    var utm_medium = queryParameter('cstm_ppc_channel',currentUrl);
    var data = {
        "name": name,
        "mobile": mobile,
        "email": email,
        "source": "Website",
        "comment":"URL:"+currentUrl.substring(0,255)+" UTM Source:"+utm_source+" UTM Medium:"+utm_medium+"Message:"+message,
        "sub_source":"Website",
        "project": project

    }
    console.log("Adding Data to Enrichr");

    storeLeadInEnrichr(data,fsource);
    return;


}

function queryParameter(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

function storeLeadInEnrichr(data,formName) {
    console.log("Adding Data to Enrichr");
    console.log(data)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://pinkode.glitz.apps.enrichr.co/public/companies/41b21e3e-600b-4d9f-aab1-bfb72c5b915e/leads-all",
        "method": "POST",
        "headers": {
          "content-type": "application/json",          
        },
        "processData": false,
        "data": JSON.stringify(data)
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        storeLeadInDB(data["name"], data["email"], data["mobile"],data["comment"], JSON.stringify(response),formName);
        alert("Your response has been received.")
        // setTimeout(function redirect_response() { window.location.href = "response.html"; }, 2000)
      }); 

}


function storeLeadInSFDC(data) {
    console.log(data)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://l3g8sgyj77.execute-api.ap-south-1.amazonaws.com/Production",
        "method": "POST",
        "headers": {
          "content-type": "application/json",          
        },
        "processData": false,
        "data": JSON.stringify(data)
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        storeLeadInDB(data["name"], data["email"], data["mobile"], JSON.stringify(response));
        setTimeout(function redirect_response() { window.location.href = "response.html"; }, 1000)
      }); 

}




function storeLeadInDB(name, email, mobile,message, response, formName) {
    var currentUrl = window.location.href;
    var utm_source = queryParameter('utm_source', currentUrl);
    var utm_medium = queryParameter('utm_medium', currentUrl)
    var utm_campaign = queryParameter('utm_campaign', currentUrl)
    var utm_adgroup = queryParameter('utm_adgroup', currentUrl)
    var utm_keyword = message
    var utm_adset = queryParameter('utm_adset', currentUrl)
    var utm_ad = queryParameter('utm_ad', currentUrl)
    var utm_device = queryParameter('utm_device', currentUrl)
    var utm_site = queryParameter('utm_site', currentUrl)
    var utm_placement = queryParameter('utm_placement', currentUrl);
    var gclid = queryParameter('gclid', currentUrl);
    var fbclid = queryParameter('fbclid', currentUrl);
    var srd = queryParameter('srd', currentUrl);


    var project = 'Hubtown Celeste';
    var timestamp = Date();
    data = {
        "formId": String(Math.floor(Date.now() / 1000)),
        "name": name,
        "email": email,
        "mobile": mobile,
        "project": project,
        "lead_creation_date": timestamp,
        "utm_source": utm_source,
        "utm_medium": utm_medium,
        "utm_campaign": utm_campaign,
        "utm_adgroup": utm_adgroup,
        "utm_keyword": utm_keyword,
        "utm_adset": utm_adset,
        "utm_ad": utm_ad,
        "utm_device": utm_device,
        "utm_site": utm_site,
        "utm_placement": message,
        "gclid": gclid,
        "fbclid": fbclid,
        "response": response,
        "formName": formName,
        "url":currentUrl,
        "srd":srd

    }
    const formURL = 'https://dj2kxzt125.execute-api.ap-south-1.amazonaws.com/Prod/submitForm';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', formURL, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = response => {
        if (response.target.status === 200) {
            //   form.reset();
            console.error(JSON.parse(response));

            //   submitResponse.innerHTML = 'Form submitted. Success!';
        } else {
            //   submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response));
        }
    };

}

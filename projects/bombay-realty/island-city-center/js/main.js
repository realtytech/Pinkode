$('.responsive').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

$(document).ready(function () {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small></small>';
            }
        }
    });
});


// Allow numbers only in mobile field
function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode
    if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) //if not a number
            return false //disable key press
    }
    isValidOTP();
}

function queryParameter(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

$("#leadForm-popup").submit(function (e) {

    e.preventDefault();

    // handle button click
    $("#submit_button-popup").prop('disabled', true);
    $("#submit_button-popup").prop("value", "Processing....");

    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();

    // form Data
    var name = $("#name-popup").val();
    var email = $("#email-popup").val();
    var mobile = $("#mobile-popup").val();



    // var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);


    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5f60e8487c0dac76c315d298"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            window.location.href = "response.html";
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log("failure");
            // window.location.href = "thankyou.html";
        }
    });


});




$("#leadForm").submit(function (e) {

    e.preventDefault();

    // handle button click
    $("#submit_button").prop('disabled', true);
    $("#submit_button").prop("value", "Processing....");

    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();

    // form Data
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();



    // var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);


    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5f60e8487c0dac76c315d298"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            storeLeadInDB()
            // window.location.href = "response.html";
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log("failure");
            // window.location.href = "thankyou.html";
        }
    });


});


function createLeadSuccess(response) {

    // If sell_do_lead_verified == false then call OTP ajax
    // else if == true then Alert User with details already present

    if (response.sell_do_lead_verified) {
        if (response.sell_do_lead_verified == 'false') {

            // Lead Not Verified

            // Display OTP Field & make other fields read only
            $('#name').prop('readonly', true);
            $('#email').prop('readonly', true);
            $('#mobile').prop('readonly', true);
            $("#otp").css("display", "block");
            $("#submit_button").css("display", "none");
            $("#verify_otp_button").css("display", "inline-block");

            localStorage.setItem("createLeadResponse", JSON.stringify(response));

        } else {
            // Lead already verified
            alert("User with these details already present");
            location.reload();
        }
    }

}

function isValidOTP() {
    var otp = $("#otp").val();

    if (otp.length > '3') {
        $("#verify_otp_button").css("cursor", "pointer");
        $("#verify_otp_button").prop('disabled', false);
    } else {
        $("#verify_otp_button").css("cursor", "not-allowed");
        $("#verify_otp_button").prop('disabled', true);
    }
}

function verifyOtpAPI() {
    $("#verify_otp_button").prop('disabled', true);
    $("#verify_otp_button").prop("value", "Processing....");


    var createLeadResponse = JSON.parse(localStorage.getItem("createLeadResponse"));

    var mobile = $('#mobile').val();
    var otp = $("#otp").val();
    var lead_id = createLeadResponse.sell_do_lead_id;

    $.ajax({
        url: "https://campaigns.citesting.in/spenta/verifyOTP.php",
        type: "get", //send it through get method
        data: {
            "sell_do_input_verify": otp,
            "api_key": "ab8f266fa110d8278a7a8caf24ca53b3",
            "lead_id": lead_id,
            "phone": "+91" + mobile,
            "_": 'ab8f266fa110d8278a7a8caf24ca53b3'
        },
        success: function (response) {

            if (response.toLowerCase().indexOf("false") >= 0) {
                // invalid OTP
                $("#otp").val('');
                $("#verify_otp_button").prop('disabled', false);
                $("#verify_otp_button").prop("value", "Verify");
                isValidOTP();


                alert("Invalid OTP");
            }

            if (response.toLowerCase().indexOf("true") >= 0) {
                // valid OTP
                // save in database & redirect

                storeLeadInDB();
            }

        },
        error: function (xhr) {
            //Do Something to handle error

        }
    });
}

function storeLeadInDB() {
    var currentUrl = window.location.href;
    var utm_source = queryParameter('utm_source', currentUrl);
    var utm_medium = queryParameter('utm_medium', currentUrl)
    var utm_campaign = queryParameter('utm_campaign', currentUrl)
    var utm_adgroup = queryParameter('utm_adgroup', currentUrl)
    var utm_keyword = queryParameter('utm_keyword', currentUrl)
    var utm_adset = queryParameter('utm_adset', currentUrl)
    var utm_ad = queryParameter('utm_ad', currentUrl)
    var utm_device = queryParameter('utm_device', currentUrl)
    var utm_site = queryParameter('utm_site', currentUrl)
    var utm_placement = queryParameter('utm_placement', currentUrl)
    var gclid = queryParameter('gclid', currentUrl)
    var fbclid = queryParameter('fbclid', currentUrl)

    var name = $('#name').val();
    var email = $('#email').val();
    var mobile = $('#mobile').val();
    var project = 'Bombay Realty - ICC';
    var timestamp = Date();
    data = {
        "formId":String(Math.floor(Date.now() / 1000)),
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
        "utm_placement": utm_placement,
        "gclid": gclid,
        "fbclid": fbclid

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

    // $.ajax({
    //     url: "https://dj2kxzt125.execute-api.ap-south-1.amazonaws.com/Prod/submitForm",
    //     type: "post", //send it through get method
    //     dataType: 'json', // Notice! JSONP <-- P (lowercase)
    //     data: data,
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    //         xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    //     },
    //     success: function (response) {
    //         //Do Something
    //         console.log("success");
    //         // window.location.href = "thankyou.html";
    //     },
    //     error: function (xhr) {
    //         //Do Something to handle error
    //         console.log(xhr)
    //         console.log("failure");
    //         // window.location.href = "thankyou.html";
    //     }
    // });
}

function selectSRD(utm_source, utm_campaign) {

    var srd = '';

    // Google srd
    var google_discovery = '5f86a1414443ae16011a4a02';
    var google_display = '5f86a1384443ae22e4278b9c';
    var google_search = '5f86a1294443ae21c7278fde';
    var google_default = '5f71a7717c0dac2729315170';

    // Facebook srd
    var facebook_conv = '5f71afa27c0dac2487b9b6bb';
    var facebook_default = '5f71bfd77c0dac7b7bbfbb91';

    // Direct srd
    var direct_srd = '5f71bfd77c0dac7b7bbfbb91';

    if (utm_source) {

        if (utm_source.toLowerCase() == "google") {

            if (utm_campaign) {
                if (utm_campaign.toLowerCase().indexOf("discovery") >= 0) {
                    // discovery
                    srd = google_discovery;
                } else if (utm_campaign.toLowerCase().indexOf("display") >= 0) {
                    // display
                    srd = google_display;
                } else {
                    // search
                    srd = google_search;
                }
            } else {
                // standard google
                srd = google_default;
            }

        } else if (utm_source.toLowerCase() == 'facebook') {

            if (utm_campaign) {
                if (utm_campaign.toLowerCase().indexOf("conv") >= 0) {
                    // conv
                    srd = facebook_conv;
                } else {
                    // standard facebook
                    srd = facebook_default;
                }
            } else {
                // standard facebook
                srd = facebook_default;
            }

        } else {

            // direct or others
            srd = direct_srd;

        }

    } else {

        // direct
        srd = direct_srd;

    }


    return srd;
}

// Lazy Loading images

document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});



function showModal(type) {
    if (type == 'brochure') {
        $('#sellModal .modal-body').html(brochure_form_body);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    } else {
        // $('#sellModal .modal-body').html(document.getElementsByClassName('form-section')[0].innerHTML);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    }
}
$(document).on('change', 'div', function () {
    x = $('.selldof_row label')
    for (i = 0; i < x.length; i++) {
        if (x[i].innerText == 'Project') {
            x[i].parentNode.parentNode.style.display = 'none'
        }
    }
    console.log(x);
});


window.onscroll = function (e) {
    var myDaemon = '';
    localStorage.setItem('myTimestamp', Date.now());
    if (myDaemon) clearInterval(myDaemon);
    myDaemon = setInterval(function () {
        var TimeDiffinSeconds = (Date.now() - localStorage.myTimestamp) / 1000;
        if (TimeDiffinSeconds > 4) {
            showModal();
            clearInterval(myDaemon);
            localStorage.removeItem('myTimestamp');
        }
    }, 1000);
}


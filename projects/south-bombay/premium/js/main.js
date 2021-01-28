
// Allow numbers only in mobile field
function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode
    if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) //if not a number
            return false //disable key press
    }
    // isValidOTP();
}

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
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
    var formName = "Popup-Form";

    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();

    // form Data
    var name = $("#name-popup").val();
    var email = $("#email-popup").val();
    var mobile = $("#mobile-popup").val();
    var project = $("#project-popup :selected").text();
    if (name == "") {
        alert('Please enter your name');
        return;
    }

    if (email == "") {
        alert('Please enter your email id');
        return;
    } else {
        if (!ValidateEmail(email)) {
            alert('Please enter a valid email id');
            return;
        }

    }
    if (mobile == "") {
        alert('Please enter your valid mobile number');
        return;
    } else {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(mobile)) {
            alert('Please enter your valid 10 digit mobile number');
            return;
        }
    }


    var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);
    if (!srd) srd = '5faa0bce4443ae474efa311d';

    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5fa62a37c825615ac5916737"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            storeLeadInDB(name, email, mobile, JSON.stringify(response));
            setTimeout(function redirect_response() { window.location.href = "response.html"; }, 1000)
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

    var formName = "Desktop-Form";

    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();

    // form Data
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var project = $("#project :selected").text();
    if (name == "") {
        alert('Please enter your name');
        return;
    }

    if (email == "") {
        alert('Please enter your email id');
        return;
    } else {
        if (!ValidateEmail(email)) {
            alert('Please enter a valid email id');
            return;
        }

    }
    if (mobile == "") {
        alert('Please enter your valid mobile number');
        return;
    } else {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(mobile)) {
            alert('Please enter your valid 10 digit mobile number');
            return;
        }
    }


    var srd = selectSRD(queryParameter('souce', currentUrl), queryParameter('sub_source', currentUrl),project);
    var srd = queryParameter('srd', currentUrl);
    if (!srd) srd = '5faa0bce4443ae474efa311d';

    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5fa62a37c825615ac5916737"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            storeLeadInDB(name, email, mobile, JSON.stringify(response), formName);
            setTimeout(function redirect_response() { window.location.href = "response.html"; }, 1000)
        },
        error: function (xhr) {
            //Do Something to handle error
            console.log("failure");
            // window.location.href = "thankyou.html";
        }
    });


});

$("#leadFormMobile").submit(function (e) {

    e.preventDefault();

    // handle button click
    $("#submit_button").prop('disabled', true);
    $("#submit_button").prop("value", "Processing....");
    var formName = "Mobile-Form";
    // Query Params
    var currentUrl = window.location.href;
    // var utm_source = queryParameter('utm_source', currentUrl);
    // var utm_campaign = queryParameter('utm_campaign', currentUrl)

    var d = new Date();

    // form Data
    var name = $("#m-name").val();
    var email = $("#m-email").val();
    var mobile = $("#m-mobile").val();
    if (name == "") {
        alert('Please enter your name');
        return;
    }

    if (email == "") {
        alert('Please enter your email id');
        return;
    } else {
        if (!ValidateEmail(email)) {
            alert('Please enter a valid email id');
            return;
        }

    }
    if (mobile == "") {
        alert('Please enter your valid mobile number');
        return;
    } else {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(mobile)) {
            alert('Please enter your valid 10 digit mobile number');
            return;
        }
    }


    // var srd = selectSRD(utm_source, utm_campaign);
    var srd = queryParameter('srd', currentUrl);
    if (!srd) srd = '5faa0bce4443ae474efa311d';



    $.ajax({
        url: "https://app.sell.do/api/leads/create",
        type: "post", //send it through get method
        data: {
            "sell_do[form][lead][name]": name,
            "sell_do[campaign][srd]": srd,
            "sell_do[form][lead][email]": email,
            "sell_do[form][lead][phone]": mobile,
            "api_key": 'c64d03d6e3f7962538b248e1415aa6a2',
            "form_id": "5fa62a37c825615ac5916737"
        },
        success: function (response) {
            console.log(JSON.parse(response));
            storeLeadInDB(name, email, mobile, JSON.stringify(response));
            setTimeout(function redirect_response() { window.location.href = "response.html"; }, 1000)
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

                storeLeadInDB(name, email, mobile, response);
            }

        },
        error: function (xhr) {
            //Do Something to handle error

        }
    });
}

function storeLeadInDB(name, email, mobile, response, formName) {
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

    // var name = $('#name').val();
    // var email = $('#email').val();
    // var mobile = $('#mobile').val();
    var project = 'Dosti Realty - Eastern Bay';
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
        "utm_placement": utm_placement,
        "gclid": gclid,
        "fbclid": fbclid,
        "response": response,
        "formName": formName

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
function selectSRD(source, sub_source, project) {
    var project_srd = {

        "Bombay Realty - Island City Center": "6012943da6bbc90bcb739a40",
        "Rustomjee Crown": "60129457a6bbc90394be333f",
        "K Raheja Corp - Vivarea": "6012948ea6bbc905e8df5c8e",
        "Lodha Park": "601294a4a6bbc90394be339e"
    }

    
    if (!source){
        return project_srd[project];
    }

        var srd = {
            "Bombay Realty - Island City Center": {

                "Google_Search": {
                    "Brand": "601288584443ae7167c9d85e",
                    "Offer_Specific": "601288684443ae6a4756e94f",
                    "Generic": "601288764443ae7167c9d875",
                    "Competition": "601288834443ae6a4756e966"
                },
                "Progammatic": {
                    "Intent": "601288924443ae77a6f25bd1",
                    "Affinity": "601288a24443ae66de17fb92",
                    "Remarketing": "601288ad4443ae384113e0e7"
                },
                "Facebook": {
                    "Lead_Gen_Property_Interest": "601288c74443ae6681180070",
                    "Lead_Gen_Competitor": "601288db4443ae6bf1416c92"
                }
            },
            "Rustomjee Crown": {

                "Google_Search": {
                    "Brand": "601288eb4443ae7167c9d8c8",
                    "Offer_Specific": "601288f74443ae66de17fbd1",
                    "Generic": "601289044443ae6a4756e9b9",
                    "Competition": "601289104443ae4b0cab5958"
                },
                "Progammatic": {
                    "Intent": "601289fe4443ae4b0cab59e5",
                    "Affinity": "60128a104443ae73d497829d",
                    "Remarketing": "60128a1f4443ae4b0cab59f5"
                },
                "Facebook": {
                    "Lead_Gen_Property_Interest": "60128a354443ae668118016f",
                    "Lead_Gen_Competitor": "60128a434443ae6bf1416d44"
                }
            },

            "K Raheja Corp - Vivarea": {

                "Google_Search": {
                    "Brand": "60128a744443ae66de17fcbf",
                    "Offer_Specific": "60128a854443ae66811801a4",
                    "Generic": "60128a944443ae66811801a9",
                    "Competition": "60128aa94443ae6a4756eaa6"
                },
                "Progammatic": {
                    "Intent": "60128ab74443ae3fb9451593",
                    "Affinity": "60128ac54443ae384113e245",
                    "Remarketing": "60128ad24443ae384113e257"
                },
                "Facebook": {
                    "Lead_Gen_Property_Interest": "60128adf4443ae4b0cab5a6b",
                    "Lead_Gen_Competitor": "60128af04443ae66811801f1"
                }
            },

            "Lodha Park": {

                "Google_Search": {
                    "Brand": "60128b064443ae384113e276",
                    "Offer_Specific": "60128b174443ae3fb94515ec",
                    "Generic": "60128b284443ae7167c9d9c8",
                    "Competition": "60128b3f4443ae73d4978325"
                },
                "Progammatic": {
                    "Intent": "60128b514443ae66de17fd3d",
                    "Affinity": "60128c884443ae3fb94516e9",
                    "Remarketing": "60128c9b4443ae384113e386"
                },
                "Facebook": {
                    "Lead_Gen_Property_Interest": "60128cac4443ae66de17fe08",
                    "Lead_Gen_Competitor": "60128cbe4443ae6bf1416e89"
                }
            }
        }

    return srd[project][source][sub_source];

    var srd = '';

    var google_srd = {
        "park": "60114aaec825613e5e6c040b",
        "icc": "60114ac6c82561218b838325",
        "vivarea": "60114adfc825612a493e5989",
        "crown": "60114bedc82561251b6cbb77"
    }

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

        if (utm_source.toLowerCase() == "googletext") {

            if (utm_campaign) {
                if (utm_campaign.toLowerCase().indexOf("SOBOtxt1b") >= 0) {

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

function isMobileTablet() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

var lazyloadImages = document.querySelectorAll("img.lazy");

lazyloadImages.forEach(function (img) {
    // console.log(isMobileTablet())
    if (!isMobileTablet()) {
        img.src = img.dataset.src;
        img.classList.remove('lazy');

    }
});


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
                console.log(isMobileTablet())
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




function showModal(type, project) {
    if (type == 'project') {

        $("#sellModal").modal("show");
        $('#project-popup').prop('selectedIndex', project);
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
        if (TimeDiffinSeconds > 10) {
            showModal();
            clearInterval(myDaemon);
            localStorage.removeItem('myTimestamp');
        }
    }, 1000);
}

var banner = document.getElementById('banner-scroll');
banner.onmouseover = function (e) {
    setTimeout(() => { $('html, body').stop().animate({ scrollTop: $('.desktop-only .container-fluid').offset().top }, '1500'); }, 2000);




    // $(window).scrollTop($('.desktop-only .container-fluid').offset().top);
    banner.onmouseover = function () { return; }
};

document.onload = function (e) {
    setTimeout(() => { $('html, body').stop().animate({ scrollTop: $('.desktop-only .container-fluid').offset().top }, '1500'); }, 5000);




    // $(window).scrollTop($('.desktop-only .container-fluid').offset().top);
    banner.onmouseover = function () { return; }
};
function openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function () {
    $('#one-tab').click();
    $('#one-tab-mobile').click();
});
$('#one-tab-mobile').trigger("click");

function openNavMobile() {
    document.getElementById("mySidenav-mobile").style.paddingTop = "60px";
    document.getElementById("mySidenav-mobile").style.height = "100vh";
}

function closeNavMobile() {
    document.getElementById("mySidenav-mobile").style.height = "0";
    document.getElementById("mySidenav-mobile").style.paddingTop = "0px";

}
form_body = `
<div>
<script src='//trkr.scdn1.secure.raxcdn.com/t/forms/5f5f2764923d4a24845d1af7/5f60e8487c0dac76c315d298.js'
data-form-id='5f60e8487c0dac76c315d298'></script></div>
`
brochure_form_body = `
<script src='//trkr.scdn1.secure.raxcdn.com/t/forms/5f5f2764923d4a24845d1af7/5f6eca597c0dac27292fb7e3.js' data-form-id='5f6eca597c0dac27292fb7e3'></script>`;

function showModal(type) {
    if (type == 'brochure') {
        $('#sellModal .modal-body').html(brochure_form_body);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    } else {
        $('#sellModal .modal-body').html(form_body);
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
var _selldo = [];
window.sell_do_form_rendered = function () {

}

window.sell_do_form_successfully_submitted = function (data, event) {

    var form_id = data['sell_do[campaign][form_id]'];

    if (form_id == '5f60e8487c0dac76c315d298')
        window.location.href = "./response.html?id=0";
    else if(form_id = '5f6eca597c0dac27292fb7e3'){
        window.location.href = "./response.html?id=1";
    }

}

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
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
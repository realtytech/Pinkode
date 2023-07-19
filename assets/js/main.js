/**
* Template Name: Day - v2.1.0
* Template URL: https://bootstrapmade.com/day-multipurpose-html-template-for-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function ($) {
  "use strict";

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.fixed').fadeIn('slow');
    } else {
      $('.fixed').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  $('.fixed-mail').click(function () {
    console.log('Name');
    $('.fixed-contact').fadeIn('slow');
  });

  $('#close-modal').click(function () {
    console.log('Name');
    $('.fixed-contact').fadeOut('slow');
  });


  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true
    });
  }
  $(window).on('load', function () {
    aos_init();
  });

})(jQuery);



function callGas() {

  document.getElementById("form-submit").disabled = true;

  var form = new FormData();
  form.append("name", $('#name').val());
  form.append("email", $('#email').val());
  form.append("contact", $('#contactNum').val());
  form.append("subject", $('#subject').val());
  form.append("msg", $('#msg').val());
  form.append("project", "home");

  var settings = {
    "url": "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbzPdaNq083tkx6bkO51skH2LmzW8Yy3rRQgDLHdk6XOoehUR2Ms/exec",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form,
  };
  console.log($('#contactNum').val());

  $.ajax(settings).done(function (response) {
    // console.log(response);
    alert('Your message has been successfully received.');
    $('.fixed-contact').fadeOut('slow');
  });
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((reg) => {
//         console.log('Service worker registered.', reg);
//       });
//   });
// }

// window.addEventListener('load', e => {
//   // new PWAConfApp();
//   registerSW();
// });

// async function registerSW() {
//   if ('serviceWorker' in navigator) {
//     try {
//       await navigator.serviceWorker.register('../../service-worker.js');
//     } catch (e) {
//       alert('ServiceWorker registration failed. Sorry about that.');
//     }
//   } else {
//     document.querySelector('.alert').removeAttribute('hidden');
//   }
// }


function populateData() {
  // Sample JSON object
  var data = "eyJhZiI6eyJuYW1lIjoiQW1hbiBGcmFtZXdhbGEiLCJkZXNpZ25hdGlvbiI6IlRlY2ggSGVhZCIsInBob25lIjoiKzkxOTc1NzA2NTU4MCIsIndoYXRzYXBwIjoiOTE5NzU3MDY1NTgwIiwiZW1haWwiOiJhbWFuLnRlY2hAcGlua29kZS5pbiJ9LCJsayI6eyJuYW1lIjoiTGF4bWkgS3VtYmxlIiwiZGVzaWduYXRpb24iOiJNQU5BR0VSIFBSRS1TQUxFUyIsInBob25lIjoiNzUwNjMzNjkyNCIsIndoYXRzYXBwIjoiNzUwNjMzNjkyNCIsImVtYWlsIjoibGF4bWlAcGlua29kZS5pbiJ9LCJpcyI6eyJuYW1lIjoiSWJyYWhpbSBTaGFpa2giLCJkZXNpZ25hdGlvbiI6IlNFTklPUiBTQUxFUyBNQU5BR0VSIiwicGhvbmUiOiI5ODY3NTIyNDQwIiwid2hhdHNhcHAiOiI5ODY3NTIyNDQwIiwiZW1haWwiOiJpYnJhaGltQHBpbmtvZGUuaW4ifSwia2EiOnsibmFtZSI6IktodXNoYm9vIEFjaGFyeWEiLCJkZXNpZ25hdGlvbiI6IlNFTklPUiBTQUxFUyBNQU5BR0VSIiwicGhvbmUiOiI4MzY5MjgzMjAwIiwid2hhdHNhcHAiOiI4MzY5MjgzMjAwIiwiZW1haWwiOiJraHVzaGJvby5hY2hhcnlhQHBpbmtvZGUuaW4ifSwic2RwIjp7Im5hbWUiOiJTaG9tZWV0IERlZXBhayBQYW5kZSIsImRlc2lnbmF0aW9uIjoiU0VOSU9SIFNBTEVTIE1BTkFHRVIiLCJwaG9uZSI6IjkxNzIwNzc3NzEiLCJ3aGF0c2FwcCI6IjkxNzIwNzc3NzEiLCJlbWFpbCI6InNob21lZXQucGFuZGVAcGlua29kZS5pbiJ9LCJtYWIiOnsibmFtZSI6Ik1vaGFuIEFtamFuZXl5YSBCaGFuZGFyaSIsImRlc2lnbmF0aW9uIjoiU0VOSU9SIFNBTEVTIE1BTkFHRVIiLCJwaG9uZSI6Ijk4Njc3MTk2NDAiLCJ3aGF0c2FwcCI6Ijk4Njc3MTk2NDAiLCJlbWFpbCI6Im1vaGFuLmJoYW5kYXJpQHBpbmtvZGUuaW4ifSwiZG1qIjp7Im5hbWUiOiJEaXZ5YSBNb3RpbGFsIEpham9yaWEiLCJkZXNpZ25hdGlvbiI6IkFTU0lTVEFOVCBNQU5BR0VSIFBSRS0gU0FMRVMiLCJwaG9uZSI6IjcyMDg5NTUwMzciLCJ3aGF0c2FwcCI6IjcyMDg5NTUwMzciLCJlbWFpbCI6ImRpdnlhLmpham9yaWFAcGlua29kZS5pbiJ9LCJhdiI6eyJuYW1lIjoiQWF5dXNoIFZpZyIsImRlc2lnbmF0aW9uIjoiREVQVVRZIFNBTEVTIE1BTkFHRVIiLCJwaG9uZSI6Ijk5MjAwNjY2MTAiLCJ3aGF0c2FwcCI6Ijk5MjAwNjY2MTAiLCJlbWFpbCI6ImFheXVzaC52aWdAcGlua29kZS5pbiJ9LCJhdCI6eyJuYW1lIjoiQW51cmFkaGEgVGl3YXJpIiwiZGVzaWduYXRpb24iOiJBU1NJU1RBTlQgU0FMRVMgTUFOQUdFUiIsInBob25lIjoiNzk3NzkwNTMwNCIsIndoYXRzYXBwIjoiNzk3NzkwNTMwNCIsImVtYWlsIjoiYW51cmFkaGEudGl3YXJpQHBpbmtvZGUuaW4ifSwiYWIiOnsibmFtZSI6IkFiaGlzaGVrIEJhdmlza2FyIiwiZGVzaWduYXRpb24iOiJTQUxFUyBNQU5BR0VSIiwicGhvbmUiOiI5NTk0NzAxMzc5Iiwid2hhdHNhcHAiOiI5NTk0NzAxMzc5IiwiZW1haWwiOiJhYmhpc2hlay5iYXZpc2thckBwaW5rb2RlLmluIn0sInBzIjp7Im5hbWUiOiJQcnV0aGl2aXJhaiBTaGVsYXIiLCJkZXNpZ25hdGlvbiI6IkdFTkVSQUwgTUFOQUdFUiAtIFNBTEVTIiwicGhvbmUiOiI4MDgyNDUzMTg3Iiwid2hhdHNhcHAiOiI4MDgyNDUzMTg3IiwiZW1haWwiOiJwcnV0aGl2aXJhai5zaGVsYXJAcGlua29kZS5pbiJ9LCJhcyI6eyJuYW1lIjoiQW1hbiBTaGFybWEiLCJkZXNpZ25hdGlvbiI6IlBhcnRuZXIiLCJwaG9uZSI6Ijk5MzA0MDMyMzQiLCJ3aGF0c2FwcCI6Ijk5MzA0MDMyMzQiLCJlbWFpbCI6ImFtYW5AcGlua29kZS5pbiJ9LCJqbiI6eyJuYW1lIjoiSm9nZXNoIE5haXIiLCJkZXNpZ25hdGlvbiI6IlBhcnRuZXIiLCJwaG9uZSI6Ijk5MzA4NTM5MTYiLCJ3aGF0c2FwcCI6Ijk5MzA4NTM5MTYiLCJlbWFpbCI6ImpvZ2VzaEBwaW5rb2RlLmluIn0sImJnIjp7Im5hbWUiOiJCcmVuZGEgR2Fpa3dhZCIsImRlc2lnbmF0aW9uIjoiTWFuYWdlciAtIE9wZXJhdGlvbnMiLCJwaG9uZSI6Ijk5MzAwMTg4MTciLCJ3aGF0c2FwcCI6Ijk5MzAwMTg4MTciLCJlbWFpbCI6ImJyZW5kYS5nYWlrd2FkQHBpbmtvZGUuaW4ifX0=";

  // Decode Base64 string
  var decodedString = atob(data);

  // Parse the decoded JSON string back to object
  var contactDataList = JSON.parse(decodedString);

  var arr = (window.location.href).split('/');
  var nameKey = queryParameter("id",window.location.href);
  if(!nameKey)  nameKey = (arr[arr.length - 1].includes('index.html') || arr[arr.length - 1] == "" ) ? arr[arr.length - 2] : arr[arr.length - 1];

  console.log(nameKey);

  var contactData = contactDataList[nameKey];




  // Update phone link
  var phoneLink = document.getElementById("phone-link");
  phoneLink.href = "tel:+91" + contactData.phone;

  // Update WhatsApp link
  var whatsappLink = document.getElementById("whatsapp-link");
  whatsappLink.href = "https://wa.me/91" + contactData.whatsapp;

  // Update email link
  var emailLink = document.getElementById("email-link");
  emailLink.href = "mailto:" + contactData.email;

  // Update contact link
  // var contactLink = document.getElementById("contact-link");
  // contactLink.href = "https://pinkode.in/vcf/" + nameKey + ".vcf";

  document.getElementById("name").innerHTML = contactData.name;

}

function downloadVcf() {
  var data = "eyJhZiI6eyJuYW1lIjoiQW1hbiBGcmFtZXdhbGEiLCJkZXNpZ25hdGlvbiI6IlRlY2ggSGVhZCIsInBob25lIjoiKzkxOTc1NzA2NTU4MCIsIndoYXRzYXBwIjoiOTE5NzU3MDY1NTgwIiwiZW1haWwiOiJhbWFuLnRlY2hAcGlua29kZS5pbiJ9LCJsayI6eyJuYW1lIjoiTGF4bWkgS3VtYmxlIiwiZGVzaWduYXRpb24iOiJNQU5BR0VSIFBSRS1TQUxFUyIsInBob25lIjoiNzUwNjMzNjkyNCIsIndoYXRzYXBwIjoiNzUwNjMzNjkyNCIsImVtYWlsIjoibGF4bWlAcGlua29kZS5pbiJ9LCJpcyI6eyJuYW1lIjoiSWJyYWhpbSBTaGFpa2giLCJkZXNpZ25hdGlvbiI6IlNFTklPUiBTQUxFUyBNQU5BR0VSIiwicGhvbmUiOiI5ODY3NTIyNDQwIiwid2hhdHNhcHAiOiI5ODY3NTIyNDQwIiwiZW1haWwiOiJpYnJhaGltQHBpbmtvZGUuaW4ifSwia2EiOnsibmFtZSI6IktodXNoYm9vIEFjaGFyeWEiLCJkZXNpZ25hdGlvbiI6IlNFTklPUiBTQUxFUyBNQU5BR0VSIiwicGhvbmUiOiI4MzY5MjgzMjAwIiwid2hhdHNhcHAiOiI4MzY5MjgzMjAwIiwiZW1haWwiOiJraHVzaGJvby5hY2hhcnlhQHBpbmtvZGUuaW4ifSwic2RwIjp7Im5hbWUiOiJTaG9tZWV0IERlZXBhayBQYW5kZSIsImRlc2lnbmF0aW9uIjoiU0VOSU9SIFNBTEVTIE1BTkFHRVIiLCJwaG9uZSI6IjkxNzIwNzc3NzEiLCJ3aGF0c2FwcCI6IjkxNzIwNzc3NzEiLCJlbWFpbCI6InNob21lZXQucGFuZGVAcGlua29kZS5pbiJ9LCJtYWIiOnsibmFtZSI6Ik1vaGFuIEFtamFuZXl5YSBCaGFuZGFyaSIsImRlc2lnbmF0aW9uIjoiU0VOSU9SIFNBTEVTIE1BTkFHRVIiLCJwaG9uZSI6Ijk4Njc3MTk2NDAiLCJ3aGF0c2FwcCI6Ijk4Njc3MTk2NDAiLCJlbWFpbCI6Im1vaGFuLmJoYW5kYXJpQHBpbmtvZGUuaW4ifSwiZG1qIjp7Im5hbWUiOiJEaXZ5YSBNb3RpbGFsIEpham9yaWEiLCJkZXNpZ25hdGlvbiI6IkFTU0lTVEFOVCBNQU5BR0VSIFBSRS0gU0FMRVMiLCJwaG9uZSI6IjcyMDg5NTUwMzciLCJ3aGF0c2FwcCI6IjcyMDg5NTUwMzciLCJlbWFpbCI6ImRpdnlhLmpham9yaWFAcGlua29kZS5pbiJ9LCJhdiI6eyJuYW1lIjoiQWF5dXNoIFZpZyIsImRlc2lnbmF0aW9uIjoiREVQVVRZIFNBTEVTIE1BTkFHRVIiLCJwaG9uZSI6Ijk5MjAwNjY2MTAiLCJ3aGF0c2FwcCI6Ijk5MjAwNjY2MTAiLCJlbWFpbCI6ImFheXVzaC52aWdAcGlua29kZS5pbiJ9LCJhdCI6eyJuYW1lIjoiQW51cmFkaGEgVGl3YXJpIiwiZGVzaWduYXRpb24iOiJBU1NJU1RBTlQgU0FMRVMgTUFOQUdFUiIsInBob25lIjoiNzk3NzkwNTMwNCIsIndoYXRzYXBwIjoiNzk3NzkwNTMwNCIsImVtYWlsIjoiYW51cmFkaGEudGl3YXJpQHBpbmtvZGUuaW4ifSwiYWIiOnsibmFtZSI6IkFiaGlzaGVrIEJhdmlza2FyIiwiZGVzaWduYXRpb24iOiJTQUxFUyBNQU5BR0VSIiwicGhvbmUiOiI5NTk0NzAxMzc5Iiwid2hhdHNhcHAiOiI5NTk0NzAxMzc5IiwiZW1haWwiOiJhYmhpc2hlay5iYXZpc2thckBwaW5rb2RlLmluIn0sInBzIjp7Im5hbWUiOiJQcnV0aGl2aXJhaiBTaGVsYXIiLCJkZXNpZ25hdGlvbiI6IkdFTkVSQUwgTUFOQUdFUiAtIFNBTEVTIiwicGhvbmUiOiI4MDgyNDUzMTg3Iiwid2hhdHNhcHAiOiI4MDgyNDUzMTg3IiwiZW1haWwiOiJwcnV0aGl2aXJhai5zaGVsYXJAcGlua29kZS5pbiJ9LCJhcyI6eyJuYW1lIjoiQW1hbiBTaGFybWEiLCJkZXNpZ25hdGlvbiI6IlBhcnRuZXIiLCJwaG9uZSI6Ijk5MzA0MDMyMzQiLCJ3aGF0c2FwcCI6Ijk5MzA0MDMyMzQiLCJlbWFpbCI6ImFtYW5AcGlua29kZS5pbiJ9LCJqbiI6eyJuYW1lIjoiSm9nZXNoIE5haXIiLCJkZXNpZ25hdGlvbiI6IlBhcnRuZXIiLCJwaG9uZSI6Ijk5MzA4NTM5MTYiLCJ3aGF0c2FwcCI6Ijk5MzA4NTM5MTYiLCJlbWFpbCI6ImpvZ2VzaEBwaW5rb2RlLmluIn0sImJnIjp7Im5hbWUiOiJCcmVuZGEgR2Fpa3dhZCIsImRlc2lnbmF0aW9uIjoiTWFuYWdlciAtIE9wZXJhdGlvbnMiLCJwaG9uZSI6Ijk5MzAwMTg4MTciLCJ3aGF0c2FwcCI6Ijk5MzAwMTg4MTciLCJlbWFpbCI6ImJyZW5kYS5nYWlrd2FkQHBpbmtvZGUuaW4ifX0=";

  // Decode Base64 string
  var decodedString = atob(data);
  var arr = (window.location.href).split('/');
  var nameKey = queryParameter("id",window.location.href);
  if(!nameKey)  nameKey = (arr[arr.length - 1].includes('index.html') || arr[arr.length - 1] == "" ) ? arr[arr.length - 2] : arr[arr.length - 1];


  // Parse the decoded JSON string back to object
  var contactDataList = JSON.parse(decodedString);
  var contact = contactDataList[nameKey];

  // Generate the VCF content for the contact


var vcfContent2=`BEGIN:VCARD
VERSION:2.1
FN:${contact.name}
TEL;WORK:${contact.phone}
EMAIL;WORK:${contact.email}
ADR;WORK:;;Pinkode Realty LLP, Chembur;Mumbai;Maharashtra;400071;India
ADR;WORK:;;Pinkode Realty LLP, Chembur;Mumbai;Maharashtra;400071;India
ORG:Pinkode Realty LLP
TITLE:${contact.designation}
ORG:Pinkode Realty LLP
TITLE:${contact.designation}
URL:pinkode.in
URL:pinkode.in
END:VCARD`


  // Create a Blob with the VCF content
  var blob = new Blob([vcfContent2], { type: 'text/vcard' });

  // Create a download link for the VCF file
  var downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${contact.name}.vcf`;

  // Add the download link to the document
  document.body.appendChild(downloadLink);

  // Programmatically trigger the download
  downloadLink.click();

  // Remove the download link from the document
  document.body.removeChild(downloadLink);
}


function queryParameter(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}
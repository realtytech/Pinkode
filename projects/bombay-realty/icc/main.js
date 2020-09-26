function openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function () {
    $('#one-tab').click();
    $('#one-tab-mobile').click();
    // showModal('interest');
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

contact_form_body = `
  <div class="form-row">
                            <div class="col-md-12 form-group">
                                <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                                    data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                                <input type="email" class="form-control" name="email" id="email"
                                    placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                                <input type="text" class="form-control" name="contact" id="contactNum"
                                    placeholder="Your Contact No." data-msg="Please enter a valid contact number" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" name="subject" id="subject"
                                    placeholder="Subject" data-rule="minlen:4"
                                    data-msg="Please enter at least 4 chars of subject" />
                                <div class="validate"></div>
                            </div>
                            <div class="form-group col-md-12">
                                <textarea class="form-control" id="msg" name="msg" rows="5" data-rule="required"
                                    data-msg="Please write something for us" placeholder="Message"></textarea>
                                <div class="validate"></div>
                            </div>
                        </div>
  
  
  `;

brochure_form_body = `
  <div class="form-row">
                            <div class="col-md-12 form-group">
                                <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                                    data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                                <input type="email" class="form-control" name="email" id="email"
                                    placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                                <input type="text" class="form-control" name="contact" id="contactNum"
                                    placeholder="Your Contact No." data-msg="Please enter a valid contact number" />
                                <div class="validate"></div>
                            </div>
                        </div>
  
  
  `;

interest_form_body = `
  <div class="form-row">
                            <div class="col-md-12 form-group">
                                <input type="text" name="name" class="form-control" id="name" placeholder="Your Name"
                                    data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                                <input type="email" class="form-control" name="email" id="email"
                                    placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                <div class="validate"></div>
                            </div>
                            <div class="col-md-6 form-group">
                                <input type="text" class="form-control" name="contact" id="contactNum"
                                    placeholder="Your Contact No." data-msg="Please enter a valid contact number" />
                                <div class="validate"></div>
                            </div>
                        </div>
  
  
  `;

visit_form_body = `
<div>
<script defer src='//trkr.scdn1.secure.raxcdn.com/t/5f5f2764923d4a24845d1af7.js'></script>
<script src='//trkr.scdn1.secure.raxcdn.com/t/forms/5f5f2764923d4a24845d1af7/5f63677a7c0dac04c18f7129.js' data-form-id='5f63677a7c0dac04c18f7129'></script>
</div>
`
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
    // Does some stuff and logs the event to the console
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

// var myDaemon = '';
// localStorage.setItem('myTimestamp', Date.now());


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
$(function () {
    "use strict";

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();

    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "/submit-form"; // Update the URL to your server endpoint

            // POST values in the background to the script URL
            $.ajax({
                type: "POST",
                url: "/api/send",
                data: $(this).serialize(),
                success: function (data) {
                    // data = JSON object that the server returns

                    // we receive the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-success';
                    var messageText = 'Your message has been sent successfully.';

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                                    messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                },
                error: function () {
                    var messageAlert = 'alert-danger';
                    var messageText = 'There was an error sending your message. Please try again later.';

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                                    messageText + '</div>';

                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });
});

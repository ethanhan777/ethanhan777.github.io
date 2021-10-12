// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

    // form validations
    $('button.submit').click(function(event) {
      event.preventDefault()
      event.stopPropagation()
      validation($("#html5-form"));
    });

    // show gender identity field when let me type was selected
    $('input[name="genderOptions"]').change(function(){
      if ($(this).val() === 'Let me type') {
        $('.gender-identity').removeClass('d-none');
      } else {
        $('.gender-identity').addClass('d-none');
      }
    });

    // form reset
    $('button.reset').click(function() {
      $("#html5-form").trigger("reset");
      $("#html5-form").addClass('needs-validation');
      $("#html5-form").removeClass('was-validated');
      $('.gender-identity').addClass('d-none');
    })

    function validation(form) {
      form.removeClass('needs-validation');
      form.addClass('was-validated');
    }
})()
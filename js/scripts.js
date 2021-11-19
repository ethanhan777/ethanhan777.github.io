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

    $('.geolocation a').on('click', function(){
      if (Modernizr.geolocation) {
        $('.geolocation .message').text('Geolocation API is supported for yoru browser! (details below in 5 seconds)');
        // supported
        var options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        };
        
        function success(pos) {
          var crd = pos.coords;
  
          $('.geolocation .latitude').text(`Latitude : ${crd.latitude}`);
          $('.geolocation .longitude').text(`Longitude: ${crd.longitude}`);
          $('.geolocation .accuracy').text(`Accuracy: More or less ${crd.accuracy} meters.`);

          var map_url = `https://maps.google.com/maps?q= ${crd.latitude},${crd.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
          $('#gmap_canvas').attr('src', map_url)
        }
        
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        // not-supported
        $('.geolocation .message').text('Geolocation API is not supported for your browser!');
      }
    });

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(document.getElementById('myElement'));

    // listen to events...
    mc.on('swipe tap', function(ev) {
      var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      $('#myElement p').text(ev.type + ' gesture detected.');
      if (ev.type === 'swipe') {
        $('#myElement').css('background-color', randomColor);
      } else if (ev.type === 'tap') {
        $('#myElement').css('color', randomColor);
      }
    });


    // We get the initial value when the promise resolves ...
    navigator.getBattery().then(function(battery) {
      $('.apis p').text(battery.level);
    });

})()
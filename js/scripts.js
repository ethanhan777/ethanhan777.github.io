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

    $('.geolocation a.getmap').on('click', function(){
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

    var mcNav = new Hammer(document.getElementById('hammerNav'));

    // listen to events...
    mcNav.on('swipe', function(ev) {
      // left
      if (ev.direction === 2) {
        $('.step').each(function( index ) {
          if ($(this).hasClass('active') && index != 0) {
            $(this).prev().addClass('active');
            $(this).removeClass('active');
            if ($('.alert').hasClass('show')) {
              $('.alert').removeClass('show');
            }
            return false;
          } else if ($(this).hasClass('active') && index == 0) {
            $('.alert p').text('Feature 10: This is the first section.');
            $('.alert').addClass('show');
          }
        });
      // right
      } else {
        $('.step').each(function( index ) {
          if ($(this).hasClass('active') && index != $('.step').length -1) {
            $(this).next().addClass('active');
            $(this).removeClass('active');
            if ($('.alert').hasClass('show')) {
              $('.alert').removeClass('show');
            }
            return false;
          } else if ($(this).hasClass('active') && index == $('.step').length -1) {
            //alert
            $('.alert p').text('Feature 10: This is the last section.');
            $('.alert').addClass('show');
          }
        });
      }
    });


    // We get the initial value when the promise resolves ...
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

    function logBattery(battery) {
      $('.apis p span').text(battery.level * 100 + '%');
    }

    if (navigator.getBattery) {
      navigator.getBattery().then(logBattery);
    } else if (battery) {
      logBattery(battery);
    }

    $('.apis a.vibrate').on('click', function(){
      // vibrate for 2 seconds
      navigator.vibrate(2000);
    });

})()
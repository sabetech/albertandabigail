//Use Strict Mode
(function ($) {
    "use strict";

    var windowHeight = $(window).height();

    function adjustViewport() {
        windowHeight = $(window).height();
        $('.viewport').css('min-height', windowHeight);
        return false;
    }

    function AdjustingBannerSpacing() {
        var HeaderHeight = $("#header").outerHeight();
        var BannerPadding = windowHeight - HeaderHeight
        $(".main-carousel .slide-inner").css("padding-top", HeaderHeight);
    }

    $('.loading-wrapper').css({'visibility': 'visible'}).animate({opacity: '1'}, 600);
       
    //Begin - Window Load
    $(window).on("load", function () {    

        //loader and Intro Animations
        $('#page-loader').delay(1000).fadeOut(400, function(){});    

        // Calling functions here
        adjustViewport();
        AdjustingBannerSpacing();

    });

    //Runs on window Resize
    $(window).on("resize", function () {
        adjustViewport();
    });

    //Begin - Document Ready
    $(document).on("ready", function () {    

        //WAYPOINTS
        $('#content').waypoint(function (direction) {
            if (direction === 'down') {
                $('#masthead').addClass('header-stick');
                $('#back-to-top').removeClass('back-to-top-hide');
            } else {
                $('#masthead').removeClass('header-stick');
                $('#back-to-top').addClass('back-to-top-hide');
            }
        }, {
            offset: '-20px'
        });

        //Bootstrap menu on hover 
        $('.dropdown').on('mouseenter', function () {
            $(this).addClass('open');
            return false;
        }); 

        $('.dropdown').on('mouseleave', function () {
            $(this).removeClass('open');
            return false;
        });

        //Back to Top Btn
        $('.back-to-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 700);
            return false;
        });        

        //Anchor Smooth Scroll
        $('a[href*="#"]:not([href="#"])').on('click', function ()  {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
              }
            }
        });

        // Mobile Menu Js      
        $("#MobileMenu").on("click", function () {
            var HeaderHeight = $("#header").outerHeight();
            $(this).toggleClass("menu-clicked");
            $("#main-navigation").css("top", HeaderHeight).stop(0, 0).slideToggle();
            $("#main-navigation a").on("click", function () {
                $("#MobileMenu").stop(0, 0).trigger("click");
            });
        });

        //Hero Slider
        var mainSlider = $(".main-carousel");

        mainSlider.on('initialized.owl.carousel', function(e){
            $('.slide-title').addClass('active');
            $('.slide-icon').addClass('active');
            $('.slide-text').addClass('active');
            $('.featured-slide .primary-btn').addClass('active');
        }); 
        
        mainSlider.owlCarousel({
            items: 1,
            nav: true,
            loop: false
        });

        mainSlider.on('changed.owl.carousel', function(e){          
            $('.slide-title').removeClass('active');
            $('.slide-icon').removeClass('active');
            $('.slide-text').removeClass('active');
            $('.featured-slide .primary-btn').removeClass('active');    
            return false;
        });
         

        mainSlider.on('translated.owl.carousel', function(e){
            $('.slide-title').addClass('active');
            $('.slide-icon').addClass('active');
            $('.slide-text').addClass('active');
            $('.featured-slide .primary-btn').addClass('active');
            return false;
        });    

        //=====>  Countdown (Edit this with your own date)  <====
        $("#bearr-countdown-item").countdown( "2020/06/27 10:10:00" , function (event) {
            var $this = $(this).html(event.strftime('' + '<div class="countdown-col"><span class="countdown-time"> %-D </span> <span class="countdown-type"> Days </span></div> ' + '<div class="countdown-col"><span class="countdown-time"> %H </span> <span class="countdown-type">Hours </span></div>' + '<div class="countdown-col"><span class="countdown-time"> %M </span> <span class="countdown-type">Minutes </span></div>' + '<div class="countdown-col"><span class="countdown-time"> %S </span> <span class="countdown-type">Seconds </span></div>'));
        });

        //Testimonials
         $(".testimonial-carousel").owlCarousel({
            items: 1,
            nav: false,         
        });

        // Gallery Fancybox
        $(".bearr-gallery-item a").simpleLightbox();   

        //Git List
        $(".clients-carousel").owlCarousel({
            items: 3,
            nav: false,
            margin: 20
        });  

        //Blogroll
        $(".blogroll-carousel").owlCarousel({
            items: 1,
            nav: false,
            margin: 20,
            responsive : {
                768 : {
                   items: 2,
                },
                1024 : {
                   items: 3,
                }
            }
        });    

        //Post Format: Gallery
        $('.gallery-featured-carousel').owlCarousel({
            loop:true,
            loop:true,
            margin:0,
            nav:true,
            items: 1,
            afterAction: function(el){
                //remove class active
                this.$owlItems.removeClass('active');
                //add class active
                this.$owlItems.eq(this.currentItem).addClass('active');    
            }       
        })

        //Contact Form
        //Form Validator and Ajax Sender
        $("#contactForm").validate({
          submitHandler: function(form) {
            $.ajax({
              type: "POST",
              url: "https://anagkazo.firstlovegallery.com/api/receive_message",
              data: {
                "name": $("#contactForm #name").val(),
                "message": $("#contactForm #message").val()
              },
              dataType: "json",
              success: function (data) {

                if (data.response == "success") {
                  $('#contactWait').hide();
                  $("#contactSuccess").fadeIn(300).addClass('modal-show');
                  //$("#contactError").addClass("hidden");  
                  //$("#contactForm #name, #contactForm #email, #contactForm #events, #contactForm #guests, #contactForm #message")
                    //.val("")
                    //.blur();         
                } else {
                  $('#contactWait').hide();
                  $("#contactError").fadeIn(300).addClass('modal-show');
                  $("#contactSuccess").addClass("hidden");
                }
              },
              beforeSend: function() {
                
                $('#contactWait').fadeIn(200);
              }
            });
          }
        });

        //Modal for Contact Form
        var modalWrap = $('.modal-wrap');
        modalWrap.on('click', function () {
          modalWrap.fadeOut(300);
        }); 

        //Modal for Forms
        function hideModal() {
          modalWrap.fadeOut(300);
          return false;
        }

        modalWrap.on('click', function () {
          hideModal();
        });   

        modalWrap.on('click', function () {
          hideModal();
        }); 
        //End - Document Ready
    });

    //End - Use Strict mode
})(jQuery);
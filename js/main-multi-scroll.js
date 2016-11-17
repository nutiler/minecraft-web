/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. Newsletter panel
    3. MultiScroll Syntax
    4. Portfolio images
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).load(function(){
    "use strict";

    setTimeout(function(){

        $("#preloader").removeClass('flipInY').addClass('flipOutYCustom');
        
    },1000);

    setTimeout(function(){

        
        $("#loading").addClass('vanish');

        $('.open-anim').each(function(i) {
            (function(self) {
                setTimeout(function() {
                    $(self).removeClass('opacity-0').addClass('animated-middle fadeInUp');
                },(i*150)+150);
                })(this);
            });


    },2800);

    setTimeout(function(){

        $("#loading").remove();


        $("#open-newsletter").removeClass('opacity-0').addClass('animated-middle jello');

    },3200);

});

$(document).ready(function(){
    "use strict";

    /* ------------------------------------- */
    /* 2. Newsletter panel ................. */
    /* ------------------------------------- */

    $('#open-newsletter , .close-newsletter').on( "click", function() {
        $(".ms-section , #info").toggleClass("newsletter-opened");
        return false;
    });

    $(document).click(function(e) {

        if (e.target.id !== 'info' && !$('#info').find(e.target).length) {
            $(".ms-section , #info").removeClass("newsletter-opened");
        }
    });

    /* ------------------------------------- */
    /* 3. MultiScroll Syntax ............... */
    /* ------------------------------------- */

    $('#multi-div').multiscroll({
        loopTop: true,
        loopBottom: true,
        navigation: true,
        navigationTooltips: ['About', 'Skins', 'Servers'],
    });

    function toggleMs() {
    if ($(window).width() < 1025) {

        $('#multi-div').multiscroll.destroy();

        $('a#button-more , a#indicator-scroll').on( "click", function() {
            event.preventDefault();
            var target = "#" + this.getAttribute('data-target');
            $('html, body, #multi-div').animate({
                scrollTop: $(target).offset().top
            }, 500);
            return false; 
        });

    } else {

        $('#multi-div').multiscroll.build();

        }
    }

    toggleMs();  // Checking when page load

    $(window).resize(function(){
        toggleMs(); // Checking to destroy or build when we resize browser
    });

    /* ------------------------------------- */
    /* 4. Portfolio images ................. */
    /* ------------------------------------- */

    $('.gallery-link')
        // Background set up
        .each(function(){
        $(this)
        // Add a photo container
        .append('<div class="photo"></div>')
        // Set up a background image for each link based on data-image attribute
        .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
    });
 
});
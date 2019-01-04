/**
 * Created by Kaushik on 2/2/2018.
 */




$(document).ready(function() {

    $('.carousel').carousel({
        interval: 6000
    })


    $('.bannerarrowscroll').click(function () {

        $('html, body').animate({scrollTop:$('.homeblock1').offset().top}, 'slow');

        return false;

    });
    $('map').imageMapResize();
});
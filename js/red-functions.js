/*!
Custom JS for j2 cloud services
*/
 $( document ).ready(function() {
  widthSize();
  heightSize();
  sideBar();
  myLogo();
  socialMedia();
  hdrAbout();
  headShot();
  introCopy();
  workSamples();
  changeW();
}); 
//closes document.ready

//changes header size
$(window).scroll(function() {
  sideBar();
  socialMedia();
  myLogo();
  hdrAbout();
  headShot();
  introCopy();
  workSamples();
  changeW();
});

//checks window resize
$(window).on("resize", function () {  
  function resizedw(){
    widthSize();
    heightSize();
    sideBar();
    myLogo();
    socialMedia();
    hdrAbout();
    headShot();
    introCopy();
    workSamples();
    changeW();
  }

  var doit;
  window.onresize = function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };


});

//define viewport width  
function widthSize(){  
  var theviewportsize = $(".viewportfixer").width();
  //console.log(theviewportsize);
  if (theviewportsize >=991){
    mediaquery = 992;
  } else if (theviewportsize >= 776 && theviewportsize <= 990){
    mediaquery = 776;
  } else if (theviewportsize <= 775){
    mediaquery = 320;
  }
  //console.log(mediaquery);
}

//Add Footer Text to page
$( "div#footer" ).html( "<p class='txt-ftr text-center'>&copy; 2019 All rights reserved. RED Multimedia<br /><a href='mailto:red@redmultimedia.com'>red@redmultimedia.com</a></p>" );


function sideBar(){
    if($(document).scrollTop()>40 && mediaquery == 992 ) {
      $("#sidebar").removeClass("sdbr-lft-eo-before").addClass("sdbr-lft-eo-after");       
    }
    else {
      $("#sidebar").removeClass("sdbr-lft-eo-after").addClass("sdbr-lft-eo-before");
    } 
}

function myLogo(){
    if($(document).scrollTop()>100 && mediaquery == 992) {
      $("#logo").addClass("text-center");       
    }
    else {
      $("#logo").removeClass("text-center");
    } 
}

function socialMedia(){
    if($(document).scrollTop()>300 && mediaquery == 992) {
      $("#socials").removeClass("d-lg-none").addClass("animated fadeIn");       
    }
    else {
      $("#socials").removeClass("animated fadeIn").addClass("d-lg-none");
    } 
}

function hdrAbout (){
    if($(document).scrollTop()>70 && mediaquery == 992) {
      $("#hdrabout").removeClass("d-lg-none").addClass("animated fadeIn");       
    }
    else {
      $("#hdrabout").removeClass("animated fadeIn").addClass("d-lg-none");
    } 
}

function headShot(){
    if($(document).scrollTop()>70 && mediaquery == 992) {
      $("#headshot").removeClass("d-lg-none").addClass("animated fadeInRight");       
    }
    else {
      $("#headshot").removeClass("animated fadeInRight").addClass("d-lg-none");
    } 
}

function changeW(){
    if($(document).scrollTop()>70 && mediaquery == 992) {
      $("#project").removeClass("col-lg-12").addClass("col-lg-8 animated fadeInRight");       
    }
    else {
      $("#project").removeClass("col-lg-8 animated fadeInRight").addClass("col-lg-12");
    } 
}

function introCopy (){
    if($(document).scrollTop()>70 && mediaquery == 992) {
      $("#intro").removeClass("d-lg-none").addClass("animated fadeIn");       
    }
    else {
      $("#intro").removeClass("animated fadeIn").addClass("d-lg-none");
    } 
}

function workSamples (){
    if($(document).scrollTop()>700 && mediaquery == 992) {
      $("#work").removeClass("d-lg-none").addClass("animated slideInUp");       
    }
    else {
      $("#work").removeClass("animated slideInUp").addClass("d-lg-none");
    } 
}

// Measure width and height of browser
function heightSize() {
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
   //myWidth = window.innerWidth;
    myHeight = window.innerHeight;
    $("#pano").css("height", myHeight );
    $("#pano-mbl").css("height", myHeight );
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    //myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
    $("#pano").css("height", myHeight );
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    //myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
    $("#pano").css("height", myHeight );
  }
}
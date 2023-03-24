var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(document).ready(function() {

  /* Logo Link */
  $("#mitreLogo").click(function(){
    var selectedSiteBG = $("#site").attr("class").split(' ').pop();

    if($(window).scrollTop() > 0) {
      $("html,body").animate({scrollTop: 0}, 1000);
    }

    if($("#home").offset().top < 0) {
    	$("#home").animate({top: 0}, 1000, function(){
    		$(".siteLinkOn").fadeOut("fast");
    		$(".selectedSite").removeClass("selectedSite").fadeOut("slow");
    		$("#site").removeClass(selectedSiteBG);
    	});
    }
    return false;
  });

  /* Navigation Bar Scrolling */
  $("#mainNav a").click(function(){
    var navLink = $(this).attr("href");
    var sectionPosition = $(navLink).offset().top - 70;
    $("html, body").animate({scrollTop: sectionPosition}, 1000);
    var href = $(this).attr("href");
    history.pushState(null, '', href);
    return false;
  });

  /* Detect if nav needs to be dark or transparent */
  if($("#masthead").offset().top > 108) {
    $("#masthead").addClass("dark");
  }

  /* Nav Adjusting On Scroll */
  $(window).scroll(function() {
    if($(window).scrollTop() > 108) {
      $("#masthead").addClass("dark");
    } else if($("#masthead").hasClass("dark")){
      $("#masthead").removeClass("dark");
    }
  });

  /* Anchor Functionality */
  if(window.location.hash) {
    var urlHash = window.location.hash;

    // Site Link Anchors
    if($(urlHash).hasClass('site')) {
      $("#home").animate({
        top: "-502px"
      }, 0);
      $('#site').addClass(urlHash.replace('#', '') + 'Section');
      $('a[href="'+urlHash+'"]').find('.siteLinkOn').show();
      $(urlHash).fadeIn(2000).addClass("selectedSite");
    }

    // Team & Advisor Anchors
    // Check if the hash in question is a teamThumb hash
    if($(urlHash).hasClass('teamThumb')) {
      $('.activeTab').removeClass('activeTab');
      $('.activeAboutSection').fadeOut("slow").removeClass('activeAboutSection');
      $('#company').hide();
    }
    // Check if the hash in question is in the team group
    if($(urlHash).parent('#team').length > 0) {
      $(".team").fadeIn("slow").addClass("activeAboutSection");
      $('#teamTab').addClass('activeTab');
      $("#aboutTabArrow").animate({left: '179px'}, "slow");
      $('#team').show();
      $('#teamBios').show();
      $(urlHash).addClass('selectedThumb');
      $(urlHash + 'bio').fadeIn('slow').addClass('selectedBio');
      $('html, body').animate({
          scrollTop: $(urlHash).offset().top - 100
        }, 300, function(){
      });
    }
    // Check if the hash in question is in the advisors group
    if($(urlHash).parent('#advisors').length > 0){
      $(".advisors").fadeIn("slow").addClass("activeAboutSection");
      $('#advisorsTab').addClass('activeTab');
      $("#aboutTabArrow").animate({left: '305px'}, "slow");
      $('#advisors').show();
      $('#teamBios').show();
      $(urlHash).addClass('selectedThumb');
      $(urlHash + 'bio').fadeIn('slow').addClass('selectedBio');
      $('html, body').animate({
          scrollTop: $(urlHash).offset().top - 100
        }, 300, function(){
      });
    }
  }

  /* Site Selection */
  $(".siteLink").click(function(){
    var selectedSite = $(this).attr("class").split(' ').pop();
    var selectedSiteBG = $("#site").attr('class').split(' ').pop();
    var href = $(this).attr("href");
    history.pushState(null, '', href);

    if($("#home").offset().top == 0) {
      $("#home").animate({
        top: "-502px"
      }, 1000);
      // Fade in selected link top border
      $(this).find("div").show();
      // Add class to section div to display proper bg color
      $("#site").addClass(selectedSite + "Section");
      // Fade in proper site content
      $("#" + selectedSite).fadeIn(2000).addClass("selectedSite");

    } else {
      //Remove currently selected link top border
      $(".siteLink").find("div").hide();
      // Fade in newly selected link top border
      $(this).find("div").show();
      // Swap site content
      $(".selectedSite").removeClass("selectedSite").fadeOut("slow", function(){
        $("#site").removeClass(selectedSiteBG).addClass(selectedSite + "Section");
        $("#" + selectedSite).fadeIn("slow").addClass("selectedSite");
      });
    }
    return false;
  });

  /* About Us Tabbed Content */
  $(".aboutNav a").click(function() {
    $(".aboutNav a").removeClass("activeTab");
    $(this).addClass("activeTab");
    var selectedAboutSection = $(this).attr("href");

    $(".activeAboutSection").removeClass("activeAboutSection").fadeOut("slow", function(){
      $("." + selectedAboutSection).fadeIn("slow").addClass("activeAboutSection");
    });

    if($("#companyTab").hasClass("activeTab")){
      $("#aboutTabArrow").animate({left: '54px'}, "slow");
			$("#about").addClass("companyOpen");
    }

    if($("#teamTab").hasClass("activeTab")){
      $("#aboutTabArrow").animate({left: '179px'}, "slow");
			$("#about").removeClass("companyOpen");
    }

    if($("#advisorsTab").hasClass("activeTab")){
      $("#aboutTabArrow").animate({left: '305px'}, "slow");
			$("#about").removeClass("companyOpen");
    }

    if($(".tabLink").hasClass("activeTab") && $("#teamBios").is(":visible")) {
      $("#teamBios").fadeOut("slow");
      $(".selectedBio").removeClass("selectedBio").fadeOut("slow");
      $(".selectedThumb").removeClass("selectedThumb");
    }
    return false;
  });

  /* Bio Swapping */
  $(".teamThumb").click(function() {
    $(this).removeClass("selectedThumb");
    var selectedBio = $(this).attr("id");
    var href = $(this).attr("id");
    history.pushState(null, '', '#' + href);

    if($("#teamBios").is(":hidden")) {
      $(this).addClass("selectedThumb");
      $("#teamBios").fadeIn("slow");
      $("#" + selectedBio + "bio").fadeIn("slow").addClass("selectedBio");
    } else {
      $(".selectedThumb").removeClass("selectedThumb");
      $(this).addClass("selectedThumb");
      $(".selectedBio").removeClass("selectedBio").fadeOut("slow", function (){
        $("#" + selectedBio + "bio").fadeIn("slow").addClass("selectedBio");
      });
    }
  });
  /* Close Bio */
  $("#closeBio").click(function(){
    $("#teamBios").fadeOut("slow");
    $(".selectedBio").removeClass("selectedBio").fadeOut("slow");
    $(".selectedThumb").removeClass("selectedThumb");
    return false;
  });

});


}
/*
     FILE ARCHIVED ON 15:11:35 Jan 24, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:46:47 Mar 02, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 497.526
  exclusion.robots: 0.066
  exclusion.robots.policy: 0.057
  cdx.remote: 0.056
  esindex: 0.006
  LoadShardBlock: 470.265 (3)
  PetaboxLoader3.datanode: 566.217 (5)
  load_resource: 545.31 (2)
  PetaboxLoader3.resolve: 270.368 (2)
*/
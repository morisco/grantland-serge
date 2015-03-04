(function($) {

var SERGE = SERGE || {

  tablet : false,

  mobile : false,

  mouseTimeout : false,

  videoStarted : false,

  initPlayer: function() {
    SERGE.initEvents();
    SERGE.initVideo();
  },

  initEvents: function() {
    $('#related-articles .more-serge').on('click',SERGE.showRelated);
    $('#play-button').on('click',SERGE.playVideo);
    if(SERGE.tablet){
      $('.mousetrap').on('click',SERGE.tabletControl);
    } else{
      $('.mousetrap').on('click',SERGE.playVideo);
    }
    $('#chapter-nav').on('mouseenter', SERGE.expandChapters);
    $('#chapter-nav').on('mouseleave',SERGE.collapseChapters);
    $('#chapter-nav .chapter').on('click',SERGE.swapVideos);
    $('#chapter-nav #mobile-chapters').on('click',SERGE.showMobile);
  },

  initVideo: function(){
    var iframe = $('#player1')[0];
    SERGE.videoPlayer = $f(iframe);
    SERGE.videoPlayer.addEvent('ready', function() {
      $('#video').removeClass('notReady');
    });
  },

  transition: function(element,transition_class,timeout,action) {
    setTimeout(function() {
      if (action == 'off') {
        element.removeClass(transition_class);
      } else if (action == 'on') {
        element.addClass(transition_class);
      } else {
        element.toggleClass(transition_class);
      }
    },timeout);
  },

  tabletControl: function() {
    if(SERGE.videoStarted){
      SERGE.hidePanel();
    } else{
      SERGE.playVideo();
    }
  },

  playVideo: function(event) {
    if(SERGE.videoStarted){
      SERGE.pauseVideo();
      return;
    }
    SERGE.hidePanel();
    SERGE.transition($('.header-title'),'visible',0,'on');
    SERGE.transition($('#play-button'),'playing',0,'on');
    SERGE.transition($('#poster'),'playing',0,'on');
    SERGE.transition($('#poster'),'hidden',500,'on');
    SERGE.transition($('#video iframe'),'playing',0,'on');
    SERGE.videoPlayer.api('play');
    SERGE.videoStarted = true;
    $(document).off('mousemove.video_playing').on('mousemove.video_playing',SERGE.mouseMove);
  },

  pauseVideo: function(){
    SERGE.videoStarted = false;
    SERGE.videoPlayer.api('pause');
    SERGE.transition($('#play-button'),'playing',0,'off');
  },

  showRelated: function(event) {
    event.preventDefault();
    SERGE.transition($('#related-articles'),'open',0);
  },

  hidePanel: function() {
    if ($('#related-articles').hasClass('open')) {
      SERGE.transition($('#related-articles'),'open',0,'off');
      SERGE.transition($('#related-articles'),'hidden',500,'on');
      SERGE.transition($('#chapter-nav'),'hidden',500,'on');
    } else {
      SERGE.transition($('#related-articles'),'hidden',0,'on');
      SERGE.transition($('#chapter-nav'),'hidden',0,'on');
    }
    SERGE.transition($('header'),'hidden',0,'on');
    SERGE.transition($('#play-button'),'visible',0,'off');

  },

  showPanel: function() {
    SERGE.transition($('#play-button'),'visible',0,'on');
    SERGE.transition($('#chapter-nav'),'hidden',0,'off');
    SERGE.transition($('header'),'hidden',0,'off');
    SERGE.transition($('#related-articles'),'hidden',0,'off');
  },

  mouseMove: function() {
    SERGE.showPanel();
    if(SERGE.tablet){ return; }
    window.clearTimeout(SERGE.mouseTimeout);
    SERGE.mouseTimeout = window.setTimeout(function() {
      if(!$('#chapter-nav').is(":hover") && !$('#related-articles').is(":hover")){
        SERGE.hidePanel();
      }
    },1250);
  },

  expandChapters: function() {
    if(!$('#chapter-nav').hasClass('over')) {
      SERGE.transition($('#chapter-nav'),'over',0,'on');
      SERGE.transition($('#related-articles'),'over',0,'on');
    }
  },

  collapseChapters: function() {
    SERGE.transition($('#chapter-nav'),'over',0,'off');
    SERGE.transition($('#related-articles'),'over',0,'off');
  },

  swapVideos: function(event) {
    $('.chapter.active').removeClass('active');
    $(event.target).closest('.chapter').addClass('active');
    alert( 'Play chapter ' + $(event.target).closest('.chapter').attr('data-chapter-id'));
  },

  showMobile: function(event) {
    event.preventDefault();
    SERGE.transition($('#chapter-nav'),'open',0);
  }

}

$(document).ready(function(){
  SERGE.initPlayer();
  if (navigator.userAgent.match(/(iPad)/)) {
    SERGE.tablet = true;
    // $('body, #player').css('height', $(window).outerHeight());
  } else if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/)) {
    SERGE.mobile = true;
  }
});

}(jQuery));
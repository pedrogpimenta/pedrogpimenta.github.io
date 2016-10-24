(function () {
  'use strict';

  $(document).ready(function() {

    var setProjectsClip = function() {
      var scrollTop = $(window).scrollTop(); // Get scrolled distance
      $('.projects-worked__button').each(function(){
        var projectWidth = $(this).width(), // Get Projects thumbs width
            projectHeight = $(this).height(), // Get Projects thumbs height
            projectOffset = $(this).offset(), // Get project offset
            projectOffsetTop = (projectOffset.top - scrollTop) + projectHeight/2, // Set project offset from top of window
            projectOffsetLeft = projectOffset.left + projectWidth/2, // Set project offset from left of window
            thisProjectIsOpen = $(this).parent().hasClass('open'); // Check if project is already open
        if ( !thisProjectIsOpen ) {
          $(this).siblings('.project-container').css({ // Add properties to sibling project container
            'left': projectOffsetLeft,
            'top': projectOffsetTop,
            'width': '0',
            'height': '0'
          })
        }
      });
    };
    setProjectsClip();

    var getProjectsWorked = function() {

      $(window).scroll(function() {
        setProjectsClip();
      });

      // Make project full screen when user clicks on thumb
      $('.projects-worked__button').on('click', function(){
        var thisButton = $(this), // Save variable to use inside other functions
            thisButtonId = thisButton.attr('id');
        thisButton.siblings('.project-container').load('/' + thisButtonId + '/index.html', function(){ // Load partials and then make div fullscreen
          $('body').addClass('projects-open'); // Add class so the body doesn't scroll
          thisButton.siblings('.project-container').css('display', 'block'); // Make the container it display
          setTimeout( // Use timeout so it runs after the display:block change
            function(){
              thisButton.parent().addClass('open'); // Add '.open' helper
              thisButton.siblings('.project-container').css({
                'left': '0',
                'top': '0',
                'width': '100%',
                'height': '100%'
              })
            }, 1);
          // Make project small again when user clicks on close button
          $('.project__close').on('click', function(){
            var thisClose = $(this);
            $(this).parents('.open').removeClass('open');
            setProjectsClip();
            setTimeout(
              function(){
                thisClose.parents('.project-container').css('display', 'none');
              }, 300);
            $('body').removeClass('projects-open');
          });
        });

      });

    };
    getProjectsWorked();

  });

})();
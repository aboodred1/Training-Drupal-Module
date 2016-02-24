(function ($) {  
  Drupal.behaviors.MS1to1Training = {
    attach: function(context) {
      
      if(Drupal.settings['user-training'] != undefined) {
        var userTrainingStatus = $.parseJSON(Drupal.settings['user-training'].trainingStatus);
        if(userTrainingStatus != null) {
          $('.view-member-views-training .views-field-title').each(function(index, item){
            if(userTrainingStatus[$(item).children().html()] == 'completed') {
              $(item).nextAll('.views-field-nothing-1').children('.field-content').html('Complete');
            }
          });
        }
      }
    }
  };
    
  $.fn.afterTrainingModuleLoad = function(data) {
        
    var current = 0;

    var data = $.parseJSON(data);

    var myPlaylist = new Object();

    if(!$.isEmptyObject(data)) {
    myPlaylist = new jPlayerPlaylist({
      jPlayer: "#jquery_jplayer_1",
      cssSelectorAncestor: "#jp_container_1"
    }, data, {
      size: { 
        width: "800px", 
        height: "600px", 
        cssClass : "jp-audio-600p" 
      },
      playlistOptions: {
        autoPlay: true,
        loopOnPrevious: false,
        shuffleOnLoop: false,
        enableRemoveControls: false,
        displayTime: 0,
        addTime: 0,
        removeTime: 0,
        shuffleTime: 0
      },
      click: function() {
          //do nothing
          ////alert('click');
      },
      ready: function() {
        
        var nonCompleted = new Array();

        for (i=0; i < myPlaylist.playlist.length; i++) {
            
          //disable clicking on item list
          if(i > 0 && myPlaylist.playlist[i].status != 'completed'){
            $('#jplayer_playlist li:eq('+ i +') a').removeClass('jp-playlist-item');  
          }
            
          //add completed class to each completed item
          if(myPlaylist.playlist[i].status == 'completed') {
            $('#jplayer_playlist li:eq('+ i +')').addClass('jp-playlist-completed');
          } else {
            nonCompleted.push(i);
          }
            
          //add duration time for each item
          $('#jplayer_playlist li:eq('+ i +') div').append('<span class="jp-list-duration">' + myPlaylist.playlist[i].duration + '</span>');
        }
        
        //play next none completed item
        var upNextItem = (nonCompleted[0] != undefined)? nonCompleted[0] : 0;

        //myPlaylist.current = upNextItem;
        myPlaylist.play(upNextItem);

        //enable next button if all items are completed
        if(!upNextItem) {
          $('#jp_container_1 .custom-jp-next').removeClass('custom-jp-next-disable');
        }
      },
      play: function() {
        //set current item;
        current = myPlaylist.current;
        
        var current_title = myPlaylist.playlist[myPlaylist.current].title;
        //set current title to modal 
        $('.ctools-training-content .modal-title').html(current_title);
        //set current title to image alt
        $('#jquery_jplayer_1 img').attr('alt', current_title);

        if(hasNextButton()) {
          $('#jp_container_1 .custom-jp-next').removeClass('custom-jp-next-disable');
        } else {
          $('#jp_container_1 .custom-jp-next').addClass('custom-jp-next-disable');
        }

        //console.log('play: ' + myPlaylist.current);
      },
      ended: function(event) {
        
        //current played media item
        //var current = myPlaylist.current - 1;
        //console.log('ended: ' + current + ' ---------- ' + myPlaylist.current);
    
        //enable clicking on listened item
        $('#jplayer_playlist li:eq('+ current +') a:eq(1)').addClass('jp-playlist-item');
        
        //check if item is not completed yet by user
        if(!$('#jplayer_playlist li:eq('+ current +')').hasClass('jp-playlist-completed')) {

          //mark item as completed
          $('#jplayer_playlist li:eq('+ current +')').addClass('jp-playlist-completed');

          //update completed item 
          $.ajax({
            type: 'POST',
            url: Drupal.settings.basePath + 'training/ajax/users/topics', 
            data: { nid: myPlaylist.playlist[current].tid },
            success:function(data) { /*do nothing*/ },
            complete:function(data) { /*do nothing*/ }
          });
        }

        //check if user reached end of the last item
        if(current == myPlaylist.playlist.length -1){
          //update the entire module status
          $.ajax({
            type: 'POST',
            url: Drupal.settings.basePath + 'training/ajax/users/modules', 
            data: { nid: myPlaylist.playlist[current].mid, title: $('#jplayer_playlist .jp-playlist-title span').html() },
            success:function(data) { /*do nothing*/ },
            complete:function(data) { /*do nothing*/ }
          });
        }

      },
      volume: 0.5,
      preload: 'auto',
      solution: "flash, html",
      swfPath: Drupal.settings['jplayer-training'].swfPath,
      supplied: "mp3",
      wmode: "window"
    });
    } else {
      //set modal title to module title if no topics/slides 
      $('.ctools-training-content .modal-title').html( $('#jplayer_playlist .jp-playlist-title span').html() );
    }

    //custom next button functionality 
    $('#jp_container_1 .custom-jp-next').click(function(){
      //allow user to click next 
      if(hasNextButton()) {
        myPlaylist.next();
      }
    });

    //when closing training modal
    $('.ctools-training-content .close').click(function(){
      $('body').removeClass('training-modal');
      window.location.reload(true);
    });

    $('.topic-wrapper .jp-list').click(function(){
      $(this).addClass('jp-list-active');
      $('.topic-wrapper .jp-playlist').animate({top: '200'});
    });

    $('.topic-wrapper .jp-playlist-close').click(function(){
      $('.topic-wrapper .jp-playlist').animate({top: '631'}, function(){
        $('.topic-wrapper .jp-list').removeClass('jp-list-active');
      });  
    });

    hasNextButton = function() {
      return $('#jplayer_playlist li:eq('+ myPlaylist.current +')').next().find('a').hasClass('jp-playlist-item');
    }
  }
 
  Drupal.theme.prototype.CToolsTrainingModal = function() {
    var html = ''
    html += '  <div id="ctools-modal">'
    html += '    <div class="ctools-modal-content ctools-training-content">'
    html += '      <div class="modal-header">';
    html += '        <a class="close" href="#"><span>&times;</span></a>';
    html += '        <h3 id="modal-title" class="modal-title">&nbsp;</h3>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    return html;
  };

})(jQuery);
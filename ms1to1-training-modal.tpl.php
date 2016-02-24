<div class="topic-wrapper">
  <div id="jquery_jplayer_1" class="jp-jplayer"><?php print $topic_view; ?></div>
  <div id="jp_container_1" class="jp-audio">
    <div class="jp-type-playlist">
      <div class="jp-gui">
        <div class="jp-interface">
          <div class="jp-controls-holder">
            <ul class="jp-controls">
              <li><a href="javascript:;" class="jp-control jp-previous" tabindex="1"><span>previous</span></a></li>
              <li><a href="javascript:;" class="jp-control jp-play" tabindex="1"><span>play</span></a></li>
              <li><a href="javascript:;" class="jp-control jp-pause" tabindex="1"><span>pause</span></a></li>
              <li><a href="javascript:;" class="jp-control custom-jp-next custom-jp-next-disable" tabindex="1"><span>next</span></a></li>
              <li><a href="javascript:;" class="jp-control jp-stop" tabindex="1"><span>stop</span></a></li>
              <li>
                <div class="jp-audio-bar">
                  <span class="jp-current-time">0:00</span>
                  <span>/</span>
                  <span class="jp-duration">0:00</span>
                </div>
              </li>
              <li><a href="javascript:;" class="jp-control jp-mute" tabindex="1" title="mute"><span>mute</span></a></li>
              <li><a href="javascript:;" class="jp-control jp-unmute" tabindex="1" title="unmute"><span>unmute</span></a></li>
              <li><a href="javascript:;" class="jp-control jp-list" tabindex="1" title="list"><span>list</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="jplayer_playlist" class="jp-playlist">
        <div class="jp-playlist-title"><span><?php print $module_title; ?></span> <a href="javascript:;" class="jp-playlist-close"><span>close</span></a></div>
        <ul>
          <!-- The method Playlist.displayPlaylist() uses this unordered list -->
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</div>
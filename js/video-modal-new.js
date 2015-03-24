$(function() {
		var hasFlash = swfobject.hasFlashPlayerVersion('9.0.45'),
		myPlayer,
		flags = {
			'initial': false,
			'quarter': false,
			'half': false,
			'third': false,
			'finished': false
		};
		if ($('#videoPlayer').hasClass('application')){
			if (hasFlash || Modernizr.video) {
				$('.chapters').show();
				$('#videoPlayer .noFlashMsg').hide();
				myPlayer = videojs('my_video_1');
				myPlayer.ready(function() {

					var duration,
						chapters = {
							'0': 'intro',
							'64': 'pump',
							'77':'swipe',
							'106':'wash',
							'147':'dress'
						},
						clicker = function(i) {
							$('.' + chapters[key]).on('click', function(){
								console.log(chapters[key]);
									$(this).siblings('.selected').removeClass('selected');
									$(this).addClass('selected');
									myPlayer.currentTime(i).play();

							});
						};
					for (var key in chapters) {
						clicker(key);
					}
					myPlayer.on('loadedmetadata', function() {
						duration = myPlayer.duration();
					});
					myPlayer.on('timeupdate', function(){
						trackHTMLvideo('video', myPlayer.currentTime(), duration,
								chapters);
					});
					myPlayer.on('ended', function(){
						myPlayer.currentTime(0).pause();
					});
					myPlayer.on('play', function(){
						myPlayer.bigPlayButton.hide();
					});
					//myPlayer.getChild('controlBar').getChild('progressControl').getChild('seekBar').off();
						for (var flagsKey in flags) {
					  if (flags.hasOwnProperty(flagsKey)) {
					    flags[flagsKey] = false;
					  	}
						}
					function trackHTMLvideo(videoType, progress, duration, chapters) {

				progress = Math.floor(progress);
				duration = Math.floor(duration);

					switch(progress){
						case duration*0:
							if (flags.initial === false){
								dcsMultiTrack('DCS.dcssip', 'www.axironmd.com', 'DCS.dcsuri', '/Video_Modal_-_Video_Start_-_Application_Video.html', 'WT.ti', 'Video Start - Application Video', 'WT.dl', '19');
								flags.initial = true;
							}
							break;
						case Math.floor(duration*.25):
							if (flags.quarter === false){
								dcsMultiTrack('DCS.dcssip', 'www.axironmd.com', 'DCS.dcsuri', '/Video_Modal_-_Video_25%_-_Application_Video.html', 'WT.ti', 'Video 25% - Application Video', 'WT.dl', '19');
								flags.quarter = true;
							}


							break;
						case Math.floor(duration*.5):
						if (flags.half === false){
							dcsMultiTrack('DCS.dcssip', 'www.axironmd.com', 'DCS.dcsuri', '/Video_Modal_-_Video_50%_-_Application_Video.html', 'WT.ti', 'Video 50% - Application Video', 'WT.dl', '19');
							flags.half = true;
						}

							break;
						case Math.floor(duration*.75):
						if (flags.third === false){
							dcsMultiTrack('DCS.dcssip', 'www.axironmd.com', 'DCS.dcsuri', '/Video_Modal_-_Video_75%_-_Application_Video.html', 'WT.ti', 'Video 75% - Application Video', 'WT.dl', '19');
							flags.third = true;
						}

							break;
						case duration*1:
						if (flags.finished === false){
							dcsMultiTrack('DDCS.dcssip', 'www.axironmd.com', 'DCS.dcsuri', '/Video_Modal_-_Video_100%_-_Application_Video.html', 'WT.ti', 'Video 100% - Application Video', 'WT.dl', '19');
							flags.finished = true;
						}

							break;
					}

						if (chapters[progress]){
							$('.'+ chapters[progress]).addClass('selected');
							$('.'+ chapters[progress]).siblings('.selected').removeClass('selected');

						}


			}
				});
			} else{
				$('.video-js').hide();
				$('.chapters').hide();
				$('#videoPlayer .noFlashMsg').show();

			}

		}





});


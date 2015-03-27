$(document).ready(function(){


	var myVideo = document.getElementById('my-video');
		//hasFlash = swfobject.hasFlashPlayerVersion('9.0.45');


			var duration,
				flags = {
					'first' : false,
					'second' :false,
					'third': false,
					'fourth': false,
					'fifth': false,
					'finished': false
				},
				chapters = {
					'0' : 'chapter-1',
					'5' : 'chapter-2',
					'10' : 'chapter-3',
					'15' : 'chapter-4',
					'20' : 'chapter-5'
				},

				currentChapter = 'chapter-1';

				chapterClicker = function(i) {
					$('.' + chapters[key]).on('click', function(){
						myVideo.currentTime = i;
						myVideo.play();
						$('video,#play-pause').removeClass('paused').addClass('playing');

					});

				};

				for (var key in chapters) {
					chapterClicker(key);
				}

				myVideo.onloadedmetadata = function(){
					duration = myVideo.duration;
					myVideo.currentTime = 0;
				};

				myVideo.ontimeupdate = function() {
					trackVideoPlay('video', myVideo.currentTime, duration, chapters);
				};

				myVideo.onended = function() {
					myVideo.currentTime = 0;
					$('video, #play-pause').removeClass('playing');
				}

				//handle play/pause
				$('video, #play-pause').on('click', function(){
					if ($(this).hasClass('playing')){
						$('video').removeClass('playing').addClass('paused');
						$('#play-pause').removeClass('playing').addClass('paused');
						myVideo.pause();
					} else {
						$('video').removeClass('paused').addClass('playing');
						$('#play-pause').removeClass('paused').addClass('playing');
						myVideo.play();
					}
				});

				//previous and next functions

				$('.next').click(function(){
					if (currentChapter !== 'chapter-5') {
						$('.' + currentChapter).next().trigger('click');
					}
					else if (currentChapter === 'chapter-5'){
						myVideo.currentTime = 0;
						myVideo.play();
					}
				});

				$('.prev').click(function(){
					if (currentChapter !== 'chapter-1') {
						$('.' + currentChapter).prev().trigger('click');
					}
					else if (currentChapter === 'chapter-1'){
						myVideo.currentTime = 20;
						myVideo.play();
					}
				});

// custom controls
		$('#fullscreen').on('click', function(){
			$('html').addClass('fullscreen');
		});

		$('#volume-range').change(function(){
			var currentVolume = myVideo.volume;
			newVolume = $(this)[0].value;
			myVideo.volume = newVolume;
			trackVolumeChange();
		});

		function onTrackedVideoFrame(currentChapter, currentTime, duration){
			currentTime = Math.floor(myVideo.currentTime);
			duration = Math.floor(myVideo.duration);
			currentChapter = currentChapter.replace(/\-/g, " ").toUpperCase();
    	$("#current-chapter").text(currentChapter);
    	$('#current').text(currentTime);
    	$("#duration").text(duration);
		}
		function trackVolumeChange(volume, newVolume) {
			volume = myVideo.volume;
			console.log(volume);
			switch(volume){
				case volume*0.25:
					$('#volume-icon').addClass('quarter');
					console.log(hit);
					break;
				}
			}
		}
		function trackVideoPlay(videoType, progress, duration, chapters) {

			progress = Math.floor(progress);
			duration = Math.floor(duration);

			switch(progress){
				case duration*0:
					if (flags.first === false){
						console.log('chapter-1');
						flags.first = true;
					}
					break;

				case Math.floor(duration*.20):
					if (flags.second === false){
						console.log('chapter-2');
						flags.second = true;
					}


					break;
				case Math.floor(duration*.40):
					if (flags.third === false){
						console.log('chapter-3');
						flags.third = true;
					}

					break;
				case Math.floor(duration*.60):
					if (flags.fourth === false){
						console.log('chapter-4');
						flags.fourth = true;
				}

					break;
				case duration*.80:
					if (flags.fifth === false){
						console.log('chapter-5');
						flags.fifth = true;
				}

					break;
				case duration*1:
					if (flags.finished === false){
						console.log('video complete');
						flags.finished = true;
				}

					break;
			}

			if (chapters[progress]){
				$('.'+ chapters[progress]).addClass('current');
				$('.'+ chapters[progress]).siblings('.current').removeClass('current').addClass('visited');
				currentChapter = chapters[progress];

			}



	}
});
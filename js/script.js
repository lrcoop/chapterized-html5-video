$(function() {
	var myVideo = document.getElementById('my-video');
		//hasFlash = swfobject.hasFlashPlayerVersion('9.0.45');

		if(Modernizr.video) {
			var duration,
				flags = {
					'initial' : false,
					'quarter' :false,
					'half': false,
					'third': false,
					'finished': false
				},
				chapters = {
					'0' : 'chapter-1',
					'5' : 'chapter-2',
					'10' : 'chapter-3',
					'15' : 'chapter-4',
					'20' : 'chapter-5'
				},
				chapterClicker = function(i) {
					$('.' + chapters[key]).on('click', function(){
						myVideo.currentTime = i;
						myVideo.play();
						$('video').addClass('playing');


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
					$('.chapter-1').removeClass('current');
				}

				$('video').on('click', function(){
					if ($(this).hasClass('playing')){
						$(this).removeClass('playing').addClass('paused');
						myVideo.pause();
					} else {
						$(this).addClass('playing');
						myVideo.play();
					}
				});
		}

		function trackVideoPlay(videoType, progress, duration, chapters) {

			progress = Math.floor(progress);
			duration = Math.floor(duration);

			switch(progress){
				case duration*0:
					if (flags.initial === false){
						console.log('initial');
						flags.initial = true;
					}
					break;
				case Math.floor(duration*.25):
					if (flags.quarter === false){
						console.log('quarter');
						flags.quarter = true;
					}


					break;
				case Math.floor(duration*.5):
				if (flags.half === false){
					console.log('half');
					flags.half = true;
				}

					break;
				case Math.floor(duration*.75):
				if (flags.third === false){
					console.log('third');
					flags.third = true;
				}

					break;
				case duration*1:
				if (flags.finished === false){
					console.log('finished');
					flags.finished = true;
				}

					break;
			}

				if (chapters[progress]){
					$('.'+ chapters[progress]).addClass('current');
					$('.'+ chapters[progress]).siblings('.current').removeClass('current').addClass('visited');

				}
	}
});
$(function() {
	var myVideo = document.getElementById('my-video');
		//hasFlash = swfobject.hasFlashPlayerVersion('9.0.45');

		if(Modernizr.video) {
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


				// array = $.map(chapters, function(value, index) {
				//     return [value];
				// }),
				// arrayLength = array.length,

				currentChapter = 0;

				chapterClicker = function(i) {
					$('.' + chapters[key]).on('click', function(){
						myVideo.currentTime = i;
						currentChapter = i;
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
		     	onTrackedVideoFrame(currentChapter, this.duration);

				};

				myVideo.onended = function() {
					myVideo.currentTime = 0;
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

		function onTrackedVideoFrame(currentChapter, currentTime, duration){
			currentTime = Math.floor(myVideo.currentTime);
			duration = Math.floor(myVideo.duration);
			currentChapter = currentChapter.replace(/\-/g, " ").toUpperCase();
    	$("#current-chapter").text(currentChapter);
    	$('#current').text(currentTime);
    	$("#duration").text(duration);
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

			$('.next').on('click', function(){
				if (currentChapter !== 'chapter-5') {

					$('.current').next('li').trigger('click');

				}
				else if (currentChapter === 'chapter-5'){
						myVideo.currentTime = 0;
						myVideo.play();
				}
			});

			$('.prev').on('click', function(){
				if (currentChapter !== 'chapter-1') {

					$('.current').prev('li').trigger('click');

				}
				else if (currentChapter === 'chapter-1'){
						myVideo.currentTime = 20;
						myVideo.play();
				}
			});

	}
});
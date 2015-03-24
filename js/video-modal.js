$(function() {

	var hasFlash = swfobject.hasFlashPlayerVersion('9.0.45'),
		myPlayer,
		myPlayer2,
		flags = {
			'initial': false,
			'quarter': false,
			'half': false,
			'third': false,
			'finished': false
		};

	if (hasFlash || Modernizr.video) {

		myPlayer = videojs('my_video_1');
		myPlayer2 = videojs('my_video_2');

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
				myPlayer.pause().currentTime(0);
			});
			myPlayer.on('play', function(){
				myPlayer.bigPlayButton.hide();
			});

			//myPlayer.getChild('controlBar').getChild('progressControl').getChild('seekBar').off();

		});

		myPlayer2.ready(function() {
			var duration,
				chapters = {};
			myPlayer2.on('loadedmetadata', function() {
				duration = myPlayer2.duration();
			});
			myPlayer2.on('timeupdate', function(){
				trackHTMLvideo('video', myPlayer2.currentTime(), duration,
						chapters);
			});
			myPlayer2.on('ended', function(){
				myPlayer2.pause().currentTime(0);
			});
			myPlayer2.on('play', function(){
				myPlayer2.bigPlayButton.hide();
			});
		});
	} else {
		$('.video-js').hide();
		$('.chapters').hide();
	}

	var videoSource = {
		ApplicationEnglish : {
			mp4 : 'http://bpv3.lilly.com/Axiron/2014/04/AxironCom_2014_0715_REV_0724.mp4',
			ogv : 'http://bpv3.lilly.com/Axiron/2014/04/AxironCom_2014_0715_REV_0724.ogv'
		},
		ApplicationSpanish : {
			mp4 : 'http://bpv3.lilly.com/Axiron/2014/08/Axiron_SpanishVersionREV.mp4',
			ogv : 'http://bpv3.lilly.com/Axiron/2014/08/Axiron_SpanishVersionREV.ogv'
		},
		tvCommercial : {
			mp4 : 'http://bpv3.lilly.com/Axiron/2014/04/Axiron_TV-Commercial.mp4',
			ogv : 'http://bpv3.lilly.com/Axiron/2014/04/Axiron_TV-Commercial.ogv'
		}
	};

	var videoTime = 0;
	var percentage = {
			zeroPct : false,
			twentyFivePercent : false,
			fiftyPercent : false,
			seventyFivePercent : false,
			hundredPercent : false
	};

	function videoTracking(video){
		for( var key in percentage ) {
			percentage[key] = false;
		}
		var videoObject = {
			tv : 'tvCommercial',
			appEng : 'applicationEnglish',
			appEsp : 'applicationSpanish'
		},
		videoType;

		if (videoObject[video]){
			videoType = videoObject[video]
		}

	}

	function trackHTMLvideo(videoType, progress, duration, chapters) {

		progress = Math.floor(progress);
		duration = Math.floor(duration);

			switch(progress){
				case duration*0:
					if (flags.initial === false){
						dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_0%_-' + videoType + '.html', 'WT.ti', 'Video 0% -' + videoType, 'WT.dl', '19');
						flags.initial = true;
					}
					break;
				case Math.floor(duration*.25):
					if (flags.quarter === false){
						dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_25%_-' + videoType + '.html', 'WT.ti', 'Video 25% -' + videoType, 'WT.dl', '19');
						flags.quarter = true;
					}


					break;
				case Math.floor(duration*.5):
				if (flags.half === false){
					dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_50%_-' + videoType + '.html', 'WT.ti', 'Video 50% -' + videoType, 'WT.dl', '19');
					flags.half = true;
				}

					break;
				case Math.floor(duration*.75):
				if (flags.third === false){
					dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_75%_-' + videoType + '.html', 'WT.ti', 'Video 75% -' + videoType, 'WT.dl', '19');
					flags.third = true;
				}

					break;
				case duration*1:
				if (flags.finished === false){
					dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_100%_-' + videoType + '.html', 'WT.ti', 'Video 100% -' + videoType, 'WT.dl', '19');
					flags.finished = true;
				}

					break;
			}

				if (chapters[progress]){
					$('.'+ chapters[progress]).addClass('current');
					$('.'+ chapters[progress]).siblings('.current').removeClass('current').addClass('visited');

				}


	}

	function buildProductVideoPlayer(){

		/* PRODUCT VIDEO */
		var flashvars = {
			imagePath: '/_assets/img/',
			videoPath: 'http://bpv3.lilly.com/Axiron/2014/04/Axiron_Product-Demo.flv',
			VideoName: 'Axiron Product Video',
			ProdDemoSWF: 'http://bpv3.lilly.com/Axiron/2014/04/Axiron_Product-Demo.swf',
			webTrendsDomain: 'axiron.com'
		};
		var params = {};
		params.base = '/';
		params.movie = '/_Assets/video/Axiron_Product-Demo.swf';
		params.scale = 'noBorder';
		params.play = 'true';
		params.wmode = 'transparent';
		params.bgcolor = '#ffffff';
		params.allowscriptaccess = 'sameDomain';
		var attributes = {};
		attributes.id = 'videoDisplayArea';
		swfobject.embedSWF('http://bpv3.lilly.com/Axiron/2014/04/Axiron_Product-Demo.swf', 'videoDisplayArea', '544', '437', '9.0.45', false, flashvars, params, attributes);
		$('#videoDisplayArea').css('display', 'block');
		$('#videoDisplayArea').css('height', '437');
		$('#videoApplication').css('display', 'none');
		if (hasFlash || Modernizr.video){
			myPlayer.pause().currentTime(0);
			myPlayer2.pause().currentTime(0);
			$('#videoWrapper p.noFlashMsg').hide();
		} else {

			$('#videoApplication').css('display', 'none');

			engLang();
		}

		clearInterval(trackHTMLvideo);
	}

	function buildVideoPlayer(fileName){

		// make room for control bar
		$('#videoDisplayArea').css('display', 'none');
		$('#videoApplication').css('display', 'block');
		$('.chapters li').removeClass('visited');
		if (hasFlash || Modernizr.video){
			for (var flagsKey in flags) {
		  if (flags.hasOwnProperty(flagsKey)) {
		    flags[flagsKey] = false;
		  	}
			}
			if (fileName === 'spanish'){
				myPlayer.pause().hide();
				myPlayer2.show().play();

				spanLang();
				$('#videoWrapper p.noFlashMsg').hide();
			}
			else{

				myPlayer2.pause().hide();
				myPlayer.show().play();
				engLang();
				$('#videoWrapper p.noFlashMsg').hide();

			}

		} else{
			myPlayer2 = $('#videoWrapper p.noFlashMsg.spanLang');
			myPlayer = $('#videoWrapper p.noFlashMsg.spanLang');
			$('.video-js').hide();
			if (fileName === 'spanish') {
				myPlayer.hide();
				myPlayer2.show();
				spanLang();
			} else {
				myPlayer.show();
				myPlayer2.hide();
				engLang();
				$('.chapters').hide();
			}
		}

		$('.subTabs').show();

 }

	function spanLang(){
		$('.spanLang').show();
		$('.engLang').hide();
		$('.chapters li').removeClass('visited');
		$('.chapters').hide();
	}
	function engLang(){
		$('.engLang').show();
		$('.spanLang').hide();
		$('.chapters li').removeClass('visited');
		$('.chapters').show();
	}

	var videoHeight = '';
	var videoWidth = '';

	// handle tab active states and video player switch
	$('.tab').click(function(){
		$('.tab').removeClass('activeTab');
		$(this).addClass('activeTab');
	});

	$('#tab1, #span-tab1').click(function(){
		buildProductVideoPlayer();
		$('.subTabs').hide();
		engLang();
		$('#tab1').addClass('activeTab');
		if (hasFlash){
			$('#videoWrapper p.noFlashMsg').hide();
			myPlayer2.pause().currentTime(0);
			myPlayer1.pause().currentTime(0);
		}
		else if (Modernizr.video){
			myPlayer2.pause().currentTime(0);
			myPlayer1.pause().currentTime(0);
		}
	});
	$('.english-application-video').click(function(){
		$('.english-application-video').addClass('activeTab');
		buildVideoPlayer('english');
		if (hasFlash || Modernizr.video){
			myPlayer.currentTime(0).play();
			myPlayer2.pause().currentTime(0);
			videoTracking('appEng');
		}
		else{

			$('.video-js').hide();
			$('.chapters').hide();
			$('#videoWrapper p.noFlashMsg.engLang').show();
		}
		$('.english-application-video').addClass('activeTab');

	});
	$('.spanish-application-video').click(function(){
		buildVideoPlayer('spanish');
		if (hasFlash || Modernizr.video){
			myPlayer2.currentTime(0).play();
			myPlayer.pause().currentTime(0);
		} else{
			$('#my_video_1').hide();
			$('#my_video_2').hide();
			$('#videoWrapper p.noFlashMsg.spanLang').show();
		}
		$('.spanish-application-video').addClass('activeTab');
		videoTracking('appEsp');
	});

	if (gravy.queryString.get('loadTab') == 'ApplicationEnglish') {
		$('.english-application-video').addClass('activeTab');
		buildVideoPlayer('english');
		if (hasFlash || Modernizr.video){
			videoTracking('appEng');
			$('.english-application-video').addClass('activeTab');

		} else{
			$('.chapters').hide();
			$('#my_video_2').hide();
			$('#my_video_1').hide();
		}

	}
	if (gravy.queryString.get('loadTab') == 'ApplicationSpanish') {
			buildVideoPlayer('spanish');
			$('.spanish-application-video').addClass('activeTab');
		if (hasFlash || Modernizr.video){
			buildVideoPlayer('spanish');
			$('.spanish-application-video').addClass('activeTab');
			videoTracking('appEsp');
		} else{
			$('#my_video_1').hide();
			$('#my_video_2').hide();
		}
	}
	if (gravy.queryString.get('loadTab') == 'tvCommercial'){
		videoWidth = 544;
		videoHeight = 306;
		buildVideoPlayer(videoSource.tvCommercial);
		videoTracking('tv');
		engLang();
	}
	if (gravy.queryString.get('loadTab') == 'productDemo') {
		if (hasFlash){
			buildProductVideoPlayer();
		$('.tab').removeClass('activeTab');
		$('#tab1').addClass('activeTab');
		$('.subTabs').hide();
		engLang();
		$('#videoWrapper p.noFlashMsg.engLang').hide();

		}else{
			$('#videoApplication').hide();
			$('.tab').removeClass('activeTab');
			$('#tab1').addClass('activeTab');
			$('.subTabs').hide();
			engLang();
			$('#videoWrapper p.noFlashMsg.engLang').show();
		}

	}


});

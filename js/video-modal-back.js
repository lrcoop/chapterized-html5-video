$(document).ready(function () {

	var videoSource = {
		ApplicationEnglish : {
			mp4 : 'http://bpv3.lilly.com/Axiron/2014/04/AxironCom_2014_0715_REV_0724.mp4',
			ogv : 'http://bpv3.lilly.com/Axiron/2014/04/Axiron_2014_0715_AxironCom.ogg'
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

		clearInterval(videoTime);
		videoTime = setInterval( function() { trackHTMLvideo(videoType); }, 250 );
	}

	function trackHTMLvideo(videoType) {
		if (document.getElementsByTagName("video")[0]){
			var videoTracker = document.getElementsByTagName("video")[0];
			var progress = videoTracker.currentTime / videoTracker.duration;

			if (progress > 0 && !percentage.zeroPct) {
				percentage.zeroPct = true;
				dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_0%_-' + videoType + '.html', 'WT.ti', 'Video 0% -' + videoType, 'WT.dl', '19');
			}

			if (progress > 0 && progress < .25) {
				percentage.twentyFivePercent = false;
			}

			if (progress > .25 && progress < .3 && !percentage.twentyFivePercent) {
				percentage.twentyFivePercent = true;
				dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_25%_-' + videoType + '.html', 'WT.ti', 'Video 25% -' + videoType, 'WT.dl', '19');
			}

			if (progress > .3 && progress < .5) {
				percentage.fiftyPercent = false;
			}

			if (progress > .5 && progress < .55 && !percentage.fiftyPercent) {
				percentage.fiftyPercent = true;
				dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_50%_-' + videoType + '.html', 'WT.ti', 'Video 50% -' + videoType, 'WT.dl', '19');
			}

			if (progress > .55 && progress < .75) {
				percentage.seventyFivePercent = false;
			}

			if (progress > .75 && progress < .8 && !percentage.seventyFivePercent) {
				percentage.seventyFivePercent = true;
				dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_75%_-' + videoType + '.html', 'WT.ti', 'Video 75% -' + videoType, 'WT.dl', '19');
			}

			if (progress > .75 && progress < .98) {
				percentage.hundredPercent = false;
			}

			if (progress > .99 && !percentage.hundredPercent) {
				percentage.hundredPercent = true;
				dcsMultiTrack('DCS.dcssip', 'www.axiron.com', 'DCS.dcsuri', '/Video_Modal-Video_100%_-' + videoType + '.html', 'WT.ti', 'Video 100% -' + videoType, 'WT.dl', '19');

				percentage.twentyFivePercent = false;
				percentage.fiftyPercent = false;
				percentage.seventyFivePercent = false;

			}

			if (progress === 0 && videoTracker.paused) {
				percentage.zeroPct = false;
			}
		} else {
			//do nothing
		}

	}

	function buildProductVideoPlayer(){

		/* PRODUCT VIDEO */
		var flashvars = {
			imagePath: "/_assets/img/",
			videoPath: "http://bpv3.lilly.com/Axiron/2014/04/Axiron_Product-Demo.flv",
			VideoName: "Axiron Product Video",
			ProdDemoSWF: "http://bpv3.lilly.com/Axiron/2014/04/Axiron_Product-Demo.swf",
			webTrendsDomain: "axiron.com"
		};
		var params = {};
		params.base = "/";
		params.movie = "/_Assets/video/Axiron_Product-Demo.swf";
		params.scale = "noBorder";
		params.play = "true";
		params.wmode = "transparent";
		params.bgcolor = "#ffffff";
		params.allowscriptaccess = "sameDomain";
		var attributes = {};
		attributes.id = "videoDisplayArea";
		swfobject.embedSWF("http://bpv3.lilly.com/Axiron/2014/04/Axiron_Product-Demo.swf", "videoDisplayArea", "544", "437", "9.0.45", false, flashvars, params, attributes);

		$('#videoDisplayArea').css('height', '437');

		clearInterval(trackHTMLvideo);
	}

	function buildVideoPlayer(fileName){

		if (Modernizr.video && IE == false) {

				//set file type by browser requirement
				fileName = Modernizr.video.h264 ? fileName.mp4 : fileName.ogv;

				var video = document.createElement('video');
				var videoPlayer = '';

				//remove flash object and replace
				$('#videoDisplayArea').remove();
				$('#videoWrapper').html('<div id="videoDisplayArea"></div>');
				videoPlayer = $('#videoDisplayArea');


				// put the pieces together and write the player to the page
				video.src = fileName;
				video.controls = true;
				video.autoplay = true;
				video.width = videoWidth;
				video.height = videoHeight;
				videoPlayer.html(video);
				videoPlayer.load();

		} else {

			// make room for control bar
			videoHeight = 318;

			// USE FLASH PLAYER	in #videoPlayer
			var flashvars = {
				imagePath: "/_assets/img/",
				videoPath: fileName.mp4,
				VideoName: 'Video',
				autostart: "false",
				provider: "http",
				"http.startparam": "starttime"
			};
			var params = {
				base: "/",
				scale: "noBorder",
				wmode: "opaque",
				bgcolor: "#ffffff",
				allowscriptaccess: "sameDomain",
				allowfullscreen: "true"


			};
			var attributes = {
				id: "videoDisplayArea"

			};
			swfobject.embedSWF("/_Assets/video/Axiron_VideoPlayer.swf", "videoDisplayArea", videoWidth, videoHeight, "9.0", false, flashvars, params, attributes);

			$('#videoModal').addClass('flashPlayer');
			$('#videoDisplayArea').css('height', videoHeight);


		}
	}


	function spanLang(){
		$('.spanLang').show();
		$('.engLang').hide();
	}
	function engLang(){
		$('.engLang').show();
		$('.spanLang').hide();
	}


	var videoHeight = '';
	var videoWidth = '';

	// handle tab active states and video player switch
	$('.tab').click(function(){
		$('.tab').removeClass('activeTab');
		$(this).addClass('activeTab');
	});

	$('#tab1, .spanLang #tab1').click(function(){
		buildProductVideoPlayer();
		$('.subTabs').hide();
		$('#videoWrapper').removeClass('applicationVideo');
		engLang();
		$('#tab1').addClass('activeTab');
	});
	$('#tab2').click(function(){
		$('.subTabs').show();
		videoWidth = 544;
		videoHeight = 304;
		$('#videoWrapper').addClass('applicationVideo');
	});
	$('#tab2, #tab3').click(function(){
		buildVideoPlayer(videoSource.ApplicationEnglish);
		engLang();
		videoTracking('appEng');
		$('#tab2').addClass('activeTab');
		$('#tab3').addClass('activeTab');
	});
	$('#tab2, #tab3, #tab4').click(function(){
		$('#tab2').addClass('activeTab');
	});
	$('#tab4').click(function(){
		videoWidth = 544;
		videoHeight = 306;
		buildVideoPlayer(videoSource.ApplicationSpanish);
		spanLang();
		videoTracking('appEsp');
		$('.spanLang #tab2').addClass('activeTab');
		$('#tab4').addClass('activeTab');
	});



	if (gravy.queryString.get('loadTab') == "ApplicationEnglish") {
		videoWidth = 544;
		videoHeight = 304;

		buildVideoPlayer(videoSource.ApplicationEnglish);
		$('.tab').removeClass('activeTab');
		$('#tab2').addClass('activeTab');
		$('#tab3').addClass('activeTab');
		$('.subTabs').show();
		$('#videoWrapper').addClass('applicationVideo');
		videoTracking('appEng');
		engLang();
	}
	if (gravy.queryString.get('loadTab') == "ApplicationSpanish") {
		videoWidth = 544;
		videoHeight = 304;

		buildVideoPlayer(videoSource.ApplicationSpanish);
		$('.tab').removeClass('activeTab');
		$('.spanLang #tab2').addClass('activeTab');
		$('#tab4').addClass('activeTab');
		$('.subTabs').show();
		$('#videoWrapper').addClass('applicationVideo');
		videoTracking('appEsp');
		spanLang();
	}
	if (gravy.queryString.get('loadTab') == "tvCommercial"){
		videoWidth = 544;
		videoHeight = 306;

		buildVideoPlayer(videoSource.tvCommercial);
		videoTracking('tv');
		engLang();
	}
	if (gravy.queryString.get('loadTab') == "productDemo") {
		buildProductVideoPlayer();

		$('.tab').removeClass('activeTab');
		$('#tab1').addClass('activeTab');
		$('.subTabs').hide();
		engLang();

	}






});



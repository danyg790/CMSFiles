(function($, undefined) {
	'use strict';
	/* ========================= */
	/* ::::::::: Notice :::::::: */
	/* ========================= */
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const notice = urlParams.get('notice');
	if( notice )
		alert( notice )
	/* ============================== */
	/* ::::::::: Sticky Menu :::::::: */
	/* ============================== */
	$(window).scroll(function(){
		if($('.navbar-st.sticky').length){
			var scroll = $(window).scrollTop(); // how many pixels you've scrolled
            var os = $('body').offset().top; // pixels to the top of div1
            if($('.topbar').length)
                os = $('.topbar').offset().top; // pixels to the top of div1
			var ht = $('body').outerHeight(); // height of div1 in pixels
            if($('.topbar').length)
                ht = $('.topbar').outerHeight(); // pixels to the top of div1
			// if you've scrolled further than the top of div1 plus it's height
			// change the color. either by adding a class or setting a css property
			if(scroll > os + ht){
				var nbsh = $('nav.navbar-st.sticky').outerHeight();
				$('nav.navbar-st.sticky').css({'position': 'fixed', 'top': '0'}).addClass('pos_fixed');
				$('body').addClass('fixed_nav');
				$('.cont_st').css({'padding-top': nbsh});
			}else{
				$('nav.navbar-st.sticky').css({'position': 'initial'}).removeClass('pos_fixed');
				$('body').removeClass('fixed_nav');
				$('.cont_st').css({'padding-top': 0});
			}
		}
    });
	/* ==================================== */
	/* ::::::::: Mobile Menu Arrow :::::::: */
	/* ==================================== */
	$('body').on('click', '.nav li.menu-item-has-children', function(){
		if($(this).hasClass('opened')){
			$(this).removeClass('opened');
		}else{
			$(this).addClass('opened');
		}
	});
	/* ================================== */
	/* ::::::::: Back to top btn :::::::: */
	/* ================================== */
	$('body').on('click', '.bt-top', function(event){
		$("html, body").animate({scrollTop: 0}, 1000);
		return false;
	});
	$(window).scroll(function() {
		if($('.topbar').length && $('.navbar-st').hasClass('sticky')){
			var scroll = $(window).scrollTop(); // how many pixels you've scrolled
			var os = $('.topbar').offset().top; // pixels to the top of div1
			var ht = $('.topbar').height(); // height of div1 in pixels
			// if you've scrolled further than the top of div1 plus it's height
			// change the color. either by adding a class or setting a css property
			if(scroll > os + ht){
				$('.bt-top').fadeIn();
			}else{
				$('.bt-top').fadeOut();
			}
		}else if($('.navbar-st').length && !$('.navbar-st').hasClass('sticky')){
			var scroll = $(window).scrollTop(); // how many pixels you've scrolled
			var os = $('.navbar-st').offset().top; // pixels to the top of div1
			var ht = $('.navbar-st').height(); // height of div1 in pixels
			// if you've scrolled further than the top of div1 plus it's height
			// change the color. either by adding a class or setting a css property
			if(scroll > os + ht){
				$('.bt-top').fadeIn();
			}else{
				$('.bt-top').fadeOut();
			}
		}else if($('.main_cont').length){
			var scroll = $(window).scrollTop(); // how many pixels you've scrolled
			var os = $('.main_cont').offset().top; // pixels to the top of div1
			var ht = $('.main_cont').height(); // height of div1 in pixels
			var wht = $(window).height();
			// if you've scrolled further than the top of div1 plus it's height
			// change the color. either by adding a class or setting a css property
			if(scroll > os){
				$('.bt-top').fadeIn();
			}else{
				$('.bt-top').fadeOut();
			}
		}
    });
	/* ============================= */
	/* ::::::::: Anchor btn :::::::: */
	/* ============================= */
	$('body').on('click', '.btn_anchor', function(event){
		var elm = $(this).attr('href')!= undefined? $(this).attr('href'): $(this).attr('data-target')!= undefined? $(this).attr('data-target'): $(this).find('a').attr('href');
		$('html, body').animate({
			scrollTop: $(elm).offset().top
		}, 1000);
		return false;
	});
	/* ================================== */
	/* ::::::::: Popup Video btn :::::::: */
	/* ================================== */
	$('body').on('click', '.btn_ppv', function(event){
		var video = $(this).attr('data-video');
		var elm = $(this).attr('data-link');
		var vid_frame = elm +' .dj-popup-video';
		$(elm).prependTo('body');
		$(elm+', '+vid_frame).fadeIn(200);
		$(vid_frame).attr("src", video);
		$(window).trigger('resize');
	});
	$('body').on('click', '.dj-popup-close', function(event){
		$(this).parent().fadeOut(200);
		setTimeout(function(){
			$('.dj-popup-video').attr('src', '');
		}, 200);
	});
	$(window).resize(function(){
		var videoWidth = $('.dj-popup-video').width();
		$('.dj-popup-video').height(videoWidth*0.5625);
	});
	// Close on Escape
	$(document).keyup(function(e){
		if (e.keyCode == 27){
			if($('.wp-video-popup-wrapper').is(':visible')){
				wp_video_popup_close();
			}
		}
	});
	/* ===================================== */
	/* ::::::::: Read More-Less btn :::::::: */
	/* ===================================== */
	$('body').on('click', '.rml_btn', function(event){
		event.preventDefault();
		var open_text = $(this).attr('data-open-text');
		var close_text = $(this).attr('data-close-text');
		if($(this).parents('.r_m_l-wrapper').find('.r_m_l-content').hasClass('cls')){
			$(this).parents('.r_m_l-wrapper').find('.r_m_l-content').removeClass('cls');
			$(this).parents('.r_m_l-wrapper').find('.r_m_l-content').addClass('opn');
			$(this).html('<i class="fa fa-long-arrow-up"></i> ' + close_text);
		}else{
			$(this).parents('.r_m_l-wrapper').find('.r_m_l-content').removeClass('opn');
			$(this).parents('.r_m_l-wrapper').find('.r_m_l-content').addClass('cls');
			$(this).html('<i class="fa fa-long-arrow-down"></i> ' + open_text);
		}
	});
	/* ======================================== */
	/* ::::::::: Page Full screen size :::::::: */
	/* ======================================== */
	$(document).ready( function(){
		var cmbh, mch, tbh, navh, bch, tch, ftrh = 0;
		var winh = $(window).height();
		if($('.top_bar').length){
			tbh = $('.top_bar').outerHeight();
		}
		if($('nav.navbar-st').length){
			navh = $('nav.navbar-st').outerHeight();
		}
		if($('.breadcrumbs_cont').length){
			bch = $('.breadcrumbs_cont').outerHeight();
		}
		if($('header.entry-header').length){
			tch = $('header.entry-header').outerHeight();
		}
		if($('footer').length){
			ftrh = $('footer').outerHeight();
		}
		cmbh = tbh + navh + bch + tch + ftrh;
		mch = winh - cmbh;
		$('.main_cont').css({'min-height': mch});
	});
	$(window).resize( function(){
		var cmbh, mch, tbh, navh, bch, tch, ftrh = 0;
		var winh = $(window).height();
		if($('.top_bar').length){
			tbh = $('.top_bar').outerHeight();
		}
		if($('nav.navbar-st').length){
			navh = $('nav.navbar-st').outerHeight();
		}
		if($('.breadcrumbs_cont').length){
			bch = $('.breadcrumbs_cont').outerHeight();
		}
		if($('header.entry-header').length){
			tch = $('header.entry-header').outerHeight();
		}
		if($('footer').length){
			ftrh = $('footer').outerHeight();
		}
		cmbh = tbh + navh + bch + tch + ftrh;
		mch = winh - cmbh;
		$('.main_cont').css({'min-height': mch});
	});
	$('body').on('click', '.prod_popup_ovly .cls', function(){
		$(this).parents('.prod_popup_ovly').remove();
	});
	$('body').on('click', '.prod_popup_ovly', function(e){
		 var container = $(".prod_popup");
		// if the target of the click isn't the container nor a descendant of the container
		if(!container.is(e.target) && container.has(e.target).length === 0){
			$(this).remove();
		}
	});
	$('.tgl_scl').on('click', function(){
		$('.ftr_cntct_cont .social').toggle()
	});
	/* ================================================ */
	/* ::::::::: Side/Slidein toggle btn press :::::::: */
	/* ================================================ */
	$('.navbar-header.mbl_slidein .navbar-toggle, .navbar-collapse.mbl_slidein .navbar-toggle').click(function(){
		if($(window).width() <= 830){
			if($(this).hasClass('collapsed')){
				if($(this).hasClass('mbl_left')){
					$('body').addClass('pushing-left').delay('300').removeClass('pushing-left').addClass('push-left');
				}else{
					$('body').addClass('pushing-right').delay('300').removeClass('pushing-right').addClass('push-right');
				}
				$('.navbar-toggle').removeClass('collapsed').addClass('opened');
			}else{
				if($(this).hasClass('mbl_left')){
					$('body').removeClass('push-left');
				}else{
					$('body').removeClass('push-right');
				}
				$('.navbar-toggle').removeClass('opened').addClass('collapsed');
			}
			return false;
		}
	});
	$('.slidein .navbar-toggle').click(function(){
		if($(window).width() >= 830){
			if($(this).hasClass('collapsed')){
				if($('.navbar-st').hasClass('left')){
					$('body').addClass('pushing-left').delay('300').removeClass('pushing-left').addClass('push-left');
				}else{
					$('body').addClass('pushing-right').delay('300').removeClass('pushing-right').addClass('push-right');
				}
				$('.navbar-toggle').removeClass('collapsed').addClass('opened');
			}else{
				if($('.navbar-st').hasClass('left')){
					$('body').removeClass('push-left');
				}else{
					$('body').removeClass('push-right');
				}
				$('.navbar-toggle').removeClass('opened').addClass('collapsed');
			}
			return false;
		}
	});
})(jQuery);
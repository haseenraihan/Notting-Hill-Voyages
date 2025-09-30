/*
	Custom Main.js for Your Website
	Based on HTML5 UP Editorial template
	Optimized for SEO, performance, and mobile usability
*/

(function ($) {

	var $window = $(window),
		$head = $('head'),
		$body = $('body');

	// ==============================
	// Breakpoints
	// ==============================
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px'],
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	// ==============================
	// Preload Fix
	// ==============================
	$window.on('load', function () {
		setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// ==============================
	// Resize Fix
	// ==============================
	var resizeTimeout;
	$window.on('resize', function () {
		$body.addClass('is-resizing');
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			$body.removeClass('is-resizing');
		}, 100);
	});

	// ==============================
	// Object Fit Fix (Safari)
	// ==============================
	if (!browser.canUse('object-fit') || browser.name == 'safari') {
		$('.image.object').each(function () {
			var $this = $(this),
				$img = $this.children('img');

			$img.css('opacity', '0');

			$this
				.css('background-image', 'url("' + $img.attr('src') + '")')
				.css('background-size', $img.css('object-fit') || 'cover')
				.css('background-position', $img.css('object-position') || 'center');
		});
	}

	// ==============================
	// Sidebar
	// ==============================
	var $sidebar = $('#sidebar'),
		$sidebar_inner = $sidebar.children('.inner');

	breakpoints.on('<=large', function () {
		$sidebar.addClass('inactive');
	});

	breakpoints.on('>large', function () {
		$sidebar.removeClass('inactive');
	});

	// Android Chrome scrollbar bug fix
	if (browser.os == 'android' && browser.name == 'chrome') {
		$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>').appendTo($head);
	}

	// Sidebar toggle
	$('<a href="#sidebar" class="toggle" aria-label="Toggle Menu">☰</a>')
		.appendTo($sidebar)
		.on('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			$sidebar.toggleClass('inactive');
		});

	// Sidebar link clicks (mobile)
	$sidebar.on('click', 'a', function (event) {
		if (breakpoints.active('>large')) return;

		var $a = $(this),
			href = $a.attr('href'),
			target = $a.attr('target');

		event.preventDefault();
		event.stopPropagation();

		if (!href || href === '#' || href === '') return;

		$sidebar.addClass('inactive');

		setTimeout(function () {
			if (target === '_blank') window.open(href);
			else window.location.href = href;
		}, 500);
	});

	// Prevent sidebar interaction bubbling
	$sidebar.on('click touchend touchstart touchmove', function (event) {
		if (breakpoints.active('>large')) return;
		event.stopPropagation();
	});

	// Close sidebar on body click
	$body.on('click touchend', function () {
		if (breakpoints.active('>large')) return;
		$sidebar.addClass('inactive');
	});

	// Sidebar scroll lock
	$window.on('load.sidebar-lock', function () {
		var sh, wh, st;

		if ($window.scrollTop() === 1) $window.scrollTop(0);

		$window
			.on('scroll.sidebar-lock', function () {
				var x, y;

				if (breakpoints.active('<=large')) {
					$sidebar_inner
						.data('locked', 0)
						.css('position', '')
						.css('top', '');
					return;
				}

				x = Math.max(sh - wh, 0);
				y = Math.max(0, $window.scrollTop() - x);

				if ($sidebar_inner.data('locked') === 1) {
					if (y <= 0)
						$sidebar_inner
							.data('locked', 0)
							.css('position', '')
							.css('top', '');
					else
						$sidebar_inner.css('top', -1 * x);
				}
				else {
					if (y > 0)
						$sidebar_inner
							.data('locked', 1)
							.css('position', 'fixed')
							.css('top', -1 * x);
				}
			})
			.on('resize.sidebar-lock', function () {
				wh = $window.height();
				sh = $sidebar_inner.outerHeight() + 30;
				$window.trigger('scroll.sidebar-lock');
			})
			.trigger('resize.sidebar-lock');
	});

	// ==============================
	// Menu
	// ==============================
	var $menu = $('#menu'),
		$menu_openers = $menu.children('ul').find('.opener');

	$menu_openers.each(function () {
		var $this = $(this);

		$this.on('click', function (event) {
			event.preventDefault();
			$menu_openers.not($this).removeClass('active');
			$this.toggleClass('active');
			$window.triggerHandler('resize.sidebar-lock');
		});
	});

})(jQuery);

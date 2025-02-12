/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Links.
	var $nav_a = $nav.find('a');

	$nav_a
		.scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		})
		.on('click', function() {

			var $this = $(this);

			// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

			// Deactivate all links.
				$nav_a
					.removeClass('active')
					.removeClass('active-locked');

			// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's article).
				$this
					.addClass('active')
					.addClass('active-locked');

		})
		.each(function() {

			var	$this = $(this),
				id = $this.attr('href'),
				$article = $(id);

			// No article for this link? Bail.
				if ($article.length < 1)
					return;

				// console.log($article);

			// Scrollex.
				$article.scrollex({
					mode: 'middle',
					initialize: function() {

						// Deactivate article.
							if (browser.canUse('transition'))
								$article.addClass('inactive');

					},
					enter: function() {

						// Activate article.
							$article.removeClass('inactive');

						// No locked links? Deactivate all links and activate this article's one.
							if ($nav_a.filter('.active-locked').length == 0) {

								$nav_a.removeClass('active');
								$this.addClass('active');

							}

						// Otherwise, if this article's link is the one that's locked, unlock it.
							else if ($this.hasClass('active-locked'))
								$this.removeClass('active-locked');

					}
				});

		});


	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);
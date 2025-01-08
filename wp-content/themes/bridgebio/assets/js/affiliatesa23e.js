
function updateAffiliateStyles() {
	jQuery('.affiliate-page').css('padding-top', jQuery('.nav--dark').height());
	// jQuery('.affiliate-nav').css('top', jQuery('.nav--dark').height());
}

jQuery(document).ready(function () {
	updateAffiliateStyles();
	// Adds screen resize function
	jQuery(window).resize(function () {
		updateAffiliateStyles();
	});
});

jQuery(document).ready(function () {
	// Accordion js
	(function (jQuery) {
		jQuery('.patient-accordion .a-title').click(function (j) {
			var dropDown = jQuery(this).closest('li').find('.a-panel');

			jQuery(this).closest('.patient-accordion').find('.a-panel').not(dropDown).slideUp();

			if (jQuery(this).hasClass('active')) {
				jQuery(this).removeClass('active');
			} else {
				jQuery(this).closest('.patient-accordion').find('.a-title.active').removeClass('active');
				jQuery(this).addClass('active');
			}

			dropDown.stop(false, true).slideToggle();

			j.preventDefault();
		});
	})(jQuery);
});

$(document).ready(function () {
	$(".single-resource").slice(0, 6).show();
	$("#loadMore").on("click", function (e) {
		e.preventDefault();
		$(".single-resource:hidden").slice(0, 2).slideDown();
		if ($(".single-resource:hidden").length == 0) {
			$("#loadMore").addClass("noContent");
		}
	});
	if ($(".single-resource").length <= 6) {
		$("#loadMore").hide();
	}

	$(".single-post").slice(0, 4).show();
	$(".addMore").on("click", function (e) {
		e.preventDefault();
		$(".single-post:hidden").slice(0, 2).slideDown();
		if ($(".single-post:hidden").length == 0) {
			$(".addMore").addClass("noContent");
		}
	});
	if ($(".single-post").length <= 4) {
		$(".addMore").hide();
	}

	$(".single-article").slice(0, 4).show();
	$(".moreButton").on("click", function (e) {
		e.preventDefault();
		$(".single-article:hidden").slice(0, 2).slideDown();
		if ($(".single-article:hidden").length == 0) {
			$(".moreButton").addClass("noContent");
		}
	});
	if ($(".single-article").length <= 4) {
		$(".moreButton").hide();
	}

	$(".single-publication").slice(0, 4).show();
	$(".pubButton").on("click", function (e) {
		e.preventDefault();
		$(".single-publication:hidden").slice(0, 2).slideDown();
		if ($(".single-publication:hidden").length == 0) {
			$(".pubButton").addClass("noContent");
		}
	});
	if ($(".single-publication").length <= 4) {
		$(".pubButton").hide();
	}
});

$(document).ready(function () {
	var listItemText = $('.affiliate-dropdown li.current_page_item').text();
	$('.affiliate-dropdown a.js-link').append(listItemText);
	var list = $('.js-dropdown-list');
	var link = $('.js-link');
	link.click(function (e) {
		e.preventDefault();
		list.slideToggle(200);
		$(this).toggleClass('openedMenu');
	});
	// View disclaimer link in two column text.
	var contentLoader = $('.two-column-wrapper .text-columns a.content-loader');
	var hiddenContent = $('.two-column-wrapper .text-columns p.hidden-content');
	$(contentLoader).on("click", function (e) {
		e.preventDefault();
		$(hiddenContent).toggleClass('not-hidden');
		$(contentLoader).toggleClass('pointing-up');
	});
});
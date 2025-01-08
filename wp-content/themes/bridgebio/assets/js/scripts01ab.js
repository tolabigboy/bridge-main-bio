const $ = jQuery;

$(document).ready(function () {

  if ( $("#speedbump").length ) {
    initializeSpeedbump()
  }

  // Check for dark header
  if (!$(".nav").hasClass("nav--dark")) {
    $(window).scroll(function () {
      // this will work when your window scrolled.
      let height = $(window).scrollTop(); //getting the scrolling height of window
      if (height > 1) {
        $(".nav")
          .removeClass("nav--primary")
          .addClass("nav--secondary nav--dark");
      } else {
          $(".nav")
            .removeClass("nav--secondary nav--dark")
            .addClass("nav--primary");
        }
    });
  }

  // Check for dark header
  if ($("body").hasClass("banner--active")) {
    $(window).bind("load resize", function() {
      let bannerHeight = $('.home--banner').innerHeight();
      $(".nav").css({
        "top": bannerHeight,
        "opacity": 1,
        "transition": "transform 0.3s, opacity 0.3s, background-color 0.3s"
      });
    });
  }

  // AOS init
  AOS.init({
    // Global settings:
    // disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    // startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    // initClassName: 'aos-init', // class applied after initialization
    // animatedClassName: 'aos-animate', // class applied on animation
    // useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    // disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    // debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    // throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    // offset: 120, // offset (in px) from the original trigger point
    // delay: 10, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    // easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    // mirror: false, // whether elements should animate out while scrolling past them
    // anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });

  // Mobile Nav Toggle
  $(".nav__toggle-button").click(function () {
    $(".nav").toggleClass("nav--open");
  });

  // Open video modal and pause hero background video
  $(".hero__cta--primary").click(function (e) {
    e.preventDefault();
    $(".video-full-background__element").trigger("pause");
    $(".base-modal").addClass("base-modal-open");
    $(".base-video-modal__element").trigger("play");
  });

  // Close video modal and resume hero background video
  $(".base-video-modal__close, .base-modal__exit-area").click(function () {
    $(".base-video-modal__element").trigger("pause");
    $(".base-modal").removeClass("base-modal-open");
    $(".video-full-background__element").trigger("play");
  });

  // Open Video Modal
  $(".video-full-background").click(function () {
    $(".video-full-background__element").trigger("pause");
    $(".video-base-modal").addClass("base-modal-open");
    $(".base-video-modal__element").trigger("play");
  });

  // Open People Bio Modal
  $(".person-card").click(function (e) {
    e.preventDefault();
    let clickedPerson = $(this).data("modal-trigger");
    $("#" + clickedPerson).addClass("base-modal-open");
  });

  // Close People Bio Modal
  $(".person-bio-modal__close, .base-modal__exit-area").click(function () {
    $(".base-modal").removeClass("base-modal-open");
  });

  // Close ATTRuby Full Screen Modal
  $('.attruby-modal').each(function() {
    const $modal = $(this);
    function closeModal() {
      $modal.hide();
    }
    $modal.find('.attruby-modal__close').on('click', closeModal);
    $modal.find('.button-close').on('click', closeModal);
  });

  $('.violator').each(function() {
    const $violator = $(this);
    $violator.find('.close-violator').on('click', function () {
      $violator.hide()
    });
  });

  $(".sign-up-button").click(function () {
    $(this).toggleClass("active");
    $('.content-form').toggleClass("active");
  });

  // Jump Links
  $("#jump-menu-toggle").click(function () {
    $(".jump-links ul").toggleClass("open");
  });

  $(".jump-links a[href^='#']").on("click", function (e) {
    e.preventDefault();

    const targetID = $(this).attr("href").substring(1);
    const targetElement = $("#" + targetID);

    if (targetElement.length) {
      const targetPosition = targetElement.offset().top - 70;

        $("html, body").animate({
            scrollTop: targetPosition
        }, 600, "swing");
    }
  });

  // Product Platform Toggle
  $(".item__arrow").click(function () {
    $(this).parent(".item-list__item").toggleClass("item-list__item--open");
  });
  $(".heading__title").click(function () {
    $(this).parents(".item-list__item").toggleClass("item-list__item--open");
  });

  // Publications Toggle
  $(".publications .list header").click(function () {
    $(this).parent().toggleClass("open");
  });

  // Pipeline onload
  setTimeout(function () {
    if (location.hash) {
      window.scrollTo(0, 0);
      target = location.hash.split("#");
      smoothScrollTo($("#" + target[1]));
    }
  }, 1);

  // Pipeline anchor link

  // Click on Tab Label
  $(".pipeline-page__pipeline .tabs__item .tab__label").click(function () {
    // add "Inactive" class to all tabs
    // $(".pipeline-page__pipeline .tabs__item").removeClass("active");
    // $(".pipeline-page__pipeline .tabs__item").addClass("inactive");
    // Remove "Inactive" class from parent tab
    // $(this).parent().removeClass("inactive");
    // Add active class to parent tab
    // $(this).parent().addClass("active");

    $(".pipeline-page__pipeline .tabs__mobile").parent().toggleClass("active");

    let label = $(this).attr("data-h4");
    let click_label = $(this).find("span").text();
    $(".pipeline-page__pipeline .tabs__mobile").text(click_label);
    let baseNavigationHeight = $("nav").outerHeight();

    setTimeout(() => {
      window.scrollTo({
        behavior: "smooth",
        top: $("#" + label)[0].offsetTop - 120,
      });
    }, 0);
  });

  // onscroll TODO: revisit
  $(window).scroll(function () {
    let fromTop = window.scrollY;
    $(".pipeline-page__pipeline .tabs__item h4").each(function () {
      let el = $(this);
      let section = document.querySelector("#" + el.attr("data-h4"));

      if (
        section.offsetTop - 121 < fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        $(".pipeline-page__pipeline .tabs__item").removeClass("active");
        $(".pipeline-page__pipeline .tabs__item").addClass("inactive");
        el.parent().addClass("active");
        el.parent().removeClass("inactive");
      } else {
        // el.parent().removeClass("active");
        // el.parent().addClass("inactive");
      }
    });
  });

  $(".pipeline__expander").click(function () {
    $(this).toggleClass("open");
  });

  // Pipeline anchor link
  $(".pipeline-page__pipeline .tabs__mobile").click(function () {
    $(this).parent().toggleClass("active");
  });

  // Patients and families condition selection
  $(".patients-and-families__select__element").on("change", function (e) {
    var optionSelected = $(this).val();
    var siteUrl = window.location.origin;

    // If same site open page else open in new tab
    if (optionSelected.includes(siteUrl)) {
      window.location.href = optionSelected;
    } else {
      window.open(optionSelected, "_blank").focus();
    }
  });
}); // Document Ready

function smoothScrollTo(target) {
  target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

  if (target.length) {
    $("html,body").animate(
      {
        scrollTop: target.offset().top - 150,
      },
      800
    );
  }
}

// Offsite interstitial
window.initializeSpeedbump = () => {
  const speedbumpElement = $("#speedbump");
  const speedbumpLink = document.querySelector("#speedbump-link");

  // Helper to extract simple domain url for text purposes
  const extractDomainName = (url) => {
      const domainRegex = /https?:\/\/(?:www\.)?([^/]+)/;
      const match = url.match(domainRegex);

      if (match) {
          return match[1];
      } else {
          return "Domain name not found";
      }
  };

  // Helper to update the href of #speedbump-link
  const updateSpeedbumpLink = (newHref) => {
      if (speedbumpLink) {
          speedbumpLink.setAttribute("href", newHref);
      }
  };

  // Helper to show modal
  const showModal = (element) => {
      if (element) {
          document.body.classList.add('no-scroll'); // Prevent scrolling
          speedbumpElement.addClass("show").fadeIn(300).focus();
          document.addEventListener('keydown', (e) => trapTabKey(e, speedbumpElement));
      } else {
          console.warn("Modal element not found in DOM");
      }
  };

  // Grab all links that are NOT the outbound modal link, including those in Marketo forms
  const links = document.querySelectorAll(
      "a:not(#speedbump-link), button:not(#speedbump-link), .mktoForm a, .mktoForm button"
  );

  // Reset speedbump link when modal is closed or proceed is clicked
  if (speedbumpElement) {
      // Close button or Go Back button
      $(".modal-dismiss").each(function () {
          var close_modal_link = this;
          close_modal_link.addEventListener("click", function () {
              speedbumpElement.removeClass("show").fadeOut(300);
              document.body.classList.remove('no-scroll'); // Enable scrolling
              setTimeout(() => {
                  updateSpeedbumpLink("");
              }, 310);
              document.removeEventListener('keydown', trapTabKey);
          });
      });

      // Proceed button
      speedbumpLink.addEventListener("click", function () {
          speedbumpElement.removeClass("show").fadeOut(300);
          document.body.classList.remove('no-scroll'); // Enable scrolling
          setTimeout(() => {
              updateSpeedbumpLink("");
          }, 310);
          document.removeEventListener('keydown', trapTabKey);
      });
  } else {
      console.warn("Modal element not found in DOM");
  }

  // Add event listener to all non-modal links. Grab href, compare to host.
  // If not a match, show interstitial and update modal outbound link.
  links.forEach((el) => {
      el.addEventListener("click", function (e) {
          const href = this.getAttribute("href") || this.getAttribute("data-href");

          if (!href || /^(mailto:|tel:|#)/.test(href)) {
              return;
          }

          const tempAnchor = document.createElement("a");
          tempAnchor.href = href;
        
          if (tempAnchor.hostname.startsWith("investor.")) {
            return;
          }

          const currentDomain = window.location.hostname;

          // Treat relative URLs as internal
          if (tempAnchor.hostname && tempAnchor.hostname !== currentDomain) {
              e.preventDefault();
              updateSpeedbumpLink(href);
              showModal(speedbumpElement);
          }
      });
  });

  // Focus trap
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let firstFocusableElement;
  let lastFocusableElement;

  const trapTabKey = (e, speedbump) => {
      const focusableElements = speedbump.find(focusableElementsString);
      firstFocusableElement = focusableElements[0];
      lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
              if (document.activeElement === firstFocusableElement) {
                  e.preventDefault();
                  lastFocusableElement.focus();
              }
          } else { // Tab
              if (document.activeElement === lastFocusableElement) {
                  e.preventDefault();
                  firstFocusableElement.focus();
              }
          }
      }
  };
}

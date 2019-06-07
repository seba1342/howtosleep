// Set active nav item when scrolling
var topMenu = $("#navBarList"),
  topMenuHeight = topMenu.outerHeight() + 15,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function () {
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });

// Bind to scroll
$(window).scroll(function () {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop)
      return this;
  });

  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  // Set/remove active class
  menuItems.removeClass("active")
  menuItems.filter("[href='#" + id + "']").addClass("active");
})

// ---

// Prevent scroll when mobile menu is open
let hamburgerMenu = document.getElementById("hamburger-menu");
let navLink = document.getElementsByClassName("nav-link");

hamburgerMenu.onclick = function() {
  if (hamburgerMenu.classList.contains("collapsed")) {
    $('body').css('overflow', 'hidden'); // disables scrolling
  } else {
    $('body').css('overflow', 'scroll'); // enables scrolling
  }
}

for (let i = 0; i < navLink.length; i++) {
  navLink[i].onclick = function() {
    $('body').css('overflow-y', 'scroll'); // enables scrolling
  }
}

// Rellax
var rellax = new Rellax('.rellax', {
  center: true
});

// Particles

particlesJS.load('particles-js', '../vendor/particles/particles.json', function() {});

// Tooltips

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

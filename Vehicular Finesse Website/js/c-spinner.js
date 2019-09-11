// Optimized for IE10+

$(window).on("load", function() {
  $(".lds-dual-ring").removeClass("d-none");
});

var loneInterval = setInterval(function() {
  var picsMatched = 0;

  for (var i = 0; i <= 2; i++) {
    if (!$("#cImg".concat(i + 1, " a")).hasClass("replace"))
      picsMatched += 1;

    if (picsMatched == 3) {
      $(".lds-dual-ring").css("opacity", 0);
      setTimeout(function() {$(".lds-dual-ring").addClass("d-none");}, 1500);
      clearInterval(loneInterval);
    }
  }
}, 2000);

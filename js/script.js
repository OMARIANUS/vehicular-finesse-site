$(document).ready(function() {

  // Global Variables

  var didScroll; // pawn for checking whether scrolling has occurred recently

  var lastScrollTop = 0; // records last known position of $(window)'s scrollTop property

  var navbarHeight = $("header").outerHeight(); // General Functions/Event Listeners

  checkPosForNav();
  checkWinSize();
  $(document).scroll(checkPosForNav);
  $(window).resize(checkWinSize);
  $("#navToggler").click(function() {
    if (window.pageYOffset <= 375) {
      $("#mainNav").toggleClass("bg-transparent");
      $("#mainNav").toggleClass("bg-transparent-black");
    }
  });

  function checkPosForNav() {
    // Navbar BgColor Fade In/Out
    if ($("#navToggler").hasClass("collapsed")) {
      if (window.pageYOffset >= 375) {
        $("#mainNav").removeClass("bg-transparent");
        $("#mainNav").addClass("bg-transparent-black");
      } else {
        $("#mainNav").removeClass("bg-transparent-black");
        $("#mainNav").addClass("bg-transparent");
      }
    }
  }

  function checkWinSize() {
    if ($(window).outerWidth() >= 992) {
      if (!$("#navToggler").hasClass("collapsed"))
        $("#navToggler").trigger("click");
      if ($("#mainNav").attr("style") == "top: -80px;")
        $("#mainNav").css({
          top: "0px"
        });
      $(window).off("scroll", confirmScroll);
    } else {
      $(window).on("scroll", confirmScroll);
      setInterval(function() {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 250);
    }
  }

  function confirmScroll() {
    // autonomous function that checks something trivial for event handler link purposes ;)
    didScroll = true;
  }

  function hasScrolled() {
    // checks scroll position and adjusts navbar sliding accordingly
    var st = $(this).scrollTop();

    if ($("#navToggler").hasClass("collapsed")) {
      if (st > lastScrollTop && st > navbarHeight) {
        $("#mainNav").css({
          top: "-80px"
        });
      } else {
        if (st + $(window).height() < $(document).height()) {
          $("#mainNav").css({
            top: "0px"
          });
        }
      }

      lastScrollTop = st;
    }
  }

  // upperSection's Background Image Dynamism

  setInterval(function() {
    if ($(window).width() >= 360) {
      if ($(".bg-filler").attr("style") === undefined) {
        var rand = Math.floor(Math.random() * 4);

        for (var i = 0; i < 4; i++) {
          if (rand === 0) rand += 1;

          if (rand === i) {
            $(".bg-filler").css({
              backgroundImage: 'url("./images/side-img-'.concat(i, '.jpg")')
            });
          }
        }
      }
    } else $(".bg-filler").removeAttr("style");
  }, 1000);

  // Price Calculator Functionality

  var sc1 = new Vehicle("Ford GT", "Sportscar", "Expensive", "High", 450000);
  var sc2 = new Vehicle(
    "Chevrolet Camaro SS",
    "Sportscar",
    "Bargain",
    "High",
    25000
  );
  var sc3 = new Vehicle(
    "Dodge Viper SRT GTS",
    "Sportscar",
    "Expensive",
    "High",
    102500
  );
  var sc4 = new Vehicle(
    "Chevrolet Cobalt SS",
    "Sportscar",
    "Bargain",
    "Low/Average",
    24999
  );
  var sc5 = new Vehicle(
    "Tesla Model S",
    "Sportscar",
    "Expensive",
    "Low/Average",
    96700
  );
  var sc6 = new Vehicle(
    "Pontiac Solstice",
    "Sportscar",
    "Affordable",
    "Low/Average",
    30000
  );
  var ev1 = new Vehicle(
    "Mercedes-Benz 300SDL",
    "Exotica",
    "Affordable",
    "High",
    35000
  );
  var ev2 = new Vehicle(
    "Mazda MX-5 Miata",
    "Exotica",
    "Affordable",
    "High",
    26500
  );
  var ev3 = new Vehicle("Subaru Legacy", "Exotica", "Bargain", "High", 22745);
  var ev4 = new Vehicle(
    "Alfa Romeo Giulia",
    "Exotica",
    "Affordable",
    "Low/Average",
    36275
  );
  var ev5 = new Vehicle(
    "Volvo Polestar 1",
    "Exotica",
    "Expensive",
    "Low/Average",
    155000
  );
  var ev6 = new Vehicle(
    "BMW M5",
    "Exotica",
    "Expensive",
    "Low/Average",
    103695
  );
  var mc1 = new Vehicle("Yamaha MT-15", "Motorcycle", "Bargain", "High", 1909);
  var mc2 = new Vehicle(
    "Suzuki Intruder",
    "Motorcycle",
    "Bargain",
    "High",
    1519
  );
  var mc3 = new Vehicle(
    "Kawasaki Z125",
    "Motorcycle",
    "Affordable",
    "High",
    3199
  );
  var mc4 = new Vehicle(
    "Harley-Davidson Street 750",
    "Motorcycle",
    "Expensive",
    "Low/Average",
    7499
  );
  var mc5 = new Vehicle(
    "BMW F850GS",
    "Motorcycle",
    "Expensive",
    "Low/Average",
    21105
  );
  var mc6 = new Vehicle(
    "Ducati Multistrada V4",
    "Motorcycle",
    "Expensive",
    "Low/Average",
    23929
  );
  var sportsCars = [sc1, sc2, sc3, sc4, sc5, sc6];
  var exotica = [ev1, ev2, ev3, ev4, ev5, ev6];
  var motorcycles = [mc1, mc2, mc3, mc4, mc5, mc6];

  function Vehicle(name, type, costRating, durability, price) {
    this.name = name;
    this.type = type;
    this.costRating = costRating;
    this.durability = durability;
    this.price = price;
  }

  function findVehicle(type, bestBudget, durability) {
    var types = ["Sportscar", "Exotica", "Motorcycle"];
    var budgets = ["Bargain", "Affordable", "Expensive"];
    var durabilityLevels = ["Low/Average", "High"];
    var typesGroup = [sportsCars, exotica, motorcycles];
    var result = [];
    var endResult = [];
    var resLen, rand;
    var msg = "";
    var entriesFound = false;

    // Search Process
    var _loop = function _loop(i) {
      // counter that checks vehicle type array
      for (var j = 0; j < 3; j++) {
        // counter that checks budget level array
        for (var k = 0; k < 2; k++) {
          // counter that checks vehicle durability array
          if (
            type == types[i] &&
            bestBudget == budgets[j] && // checks whether all required conditions are met
            durability == durabilityLevels[k]
          ) {
            var lastCheck = function lastCheck() {
              // when conditions are met, every array element is checked as well
              for (var l = 0; l < typesGroup[i].length; l++) {
                if (
                  typesGroup[i][l].type == type &&
                  typesGroup[i][l].costRating == bestBudget &&
                  typesGroup[i][l].durability == durability
                ) {
                  entriesFound = true;
                  result.push(typesGroup[i][l]);
                }
              }
            };

            lastCheck();
            if (!entriesFound)
              // checks if no elements were found in search
              msg = "No entries found";

            while (!entriesFound) {
              // ensures there are always elements within 'result' array
              if (j == budgets.length - 1) {
                j -= 1;
                bestBudget = budgets[j];
              } else {
                j += 1;
                bestBudget = budgets[j];
              }

              lastCheck();
            }
          }
        }
      }
    };

    for (var i = 0; i < 3; i++) {
      _loop(i);
    }

    rand = Math.floor(Math.random() * result.length);
    resLen = result.length - 1;

    for (var x = 0; x <= resLen; x++) {
      // gets the final array element needed
      if (x === rand) {
        result = result[x];
      }
    }

    endResult = [result, msg];
    return endResult;
  }

  $(".result-circle").on("click", function() {
    var res, resNum;
    var allOptsSelected = false;
    $("#resultText span")
      .addClass("invisible")
      .removeClass("result-heading");

    for (var i = 1; i <= 3; i++) {
      // counter that loops through quizPart1 options
      for (var j = 1; j <= 3; j++) {
        // counter that loops through quizPart2 options
        for (var k = 1; k <= 2; k++) {
          // counter that loops through quizPart3 options
          if (
            $("#qz1Opt".concat(i)).prop("checked") &&
            $("#qz2Opt".concat(j)).prop("checked") &&
            $("#qz3Opt".concat(k)).prop("checked")
          ) {
            // checks whether all required conditions are met
            allOptsSelected = true;
            res = findVehicle(
              $("#qz1Opt".concat(i)).val(),
              $("#qz2Opt".concat(j)).val(),
              $("#qz3Opt".concat(k)).val()
            );
            $("#resultText span:first")
              .html(res[1])
              .removeClass("invisible");
          }
        }
      }
    }

    if (allOptsSelected) {
      // generate counting effect for price calculator numbers
      resNum = new CountUp("resNum", 0, res[0].price, 0, 1.5, {
        prefix: "$"
      });
      if (!resNum.error) resNum.start();
      else console.error(resNum.error);
      window.setTimeout(function() {
        $("#resultText span:first")
          .html("Top recommendation")
          .addClass("result-heading");
        $("#resultText span:last").html(res[0].name);
        $("#resultText span").removeClass("invisible");
        $(".result-circle").attr({
          "aria-label": "Priced at ".concat(res[0].price, " US dollars."),
          "aria-live": "polite"
        });
      }, 1500);
      window.setTimeout(function() {
        $(".result-circle").removeAttr("aria-live");
        $(".result-circle").attr("aria-label", "Calculate");
      }, 1600);
    } else {
      $("#resultText span:first")
        .html("Please select all options")
        .removeClass("invisible");
    }
  });

  // Contact Page Functionality

  autosize($("#message")); // makes <textarea> element autosizes with a different style using Autosize.js
});

const API_PATH = "./backend/index.php";

function isLoggedIn() {
  return Boolean(localStorage.getItem("username"));
}

function updateNavbarActive() {
  const path = window.location.pathname;
  $("#mainNavigationNav")
    .find("li")
    .each(function () {
      const anchor = $("a", this);
      if (anchor.length > 0) {
        const link = anchor.attr("href").replace("./", "");
        if (link === "") {
          $(".nav-link", this).toggleClass(
            "active",
            path.endsWith("/") || path.endsWith("index.html")
          );
        } else if (link !== "login.html") {
          $(".nav-link", this).toggleClass("active", path.includes(link));
        }
      }
    });
}

function updateNavbarRole() {
  if (isLoggedIn()) {
    // User
    $("#mainNavigationNav .nav-item:not(.user)").hide();
  } else {
    // Guest
    $("#mainNavigationNav .nav-item:not(.guest)").hide();
  }
}

function executelogOut() {
  $.ajax({
    method: "POST",
    url: API_PATH + "?action=logout",
    dataType: "json",
    success: function () {
      window.localStorage.clear();
      location.href = "./";
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(JSON.stringify(xhr));
      console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
    },
  });
}

function buildNavbar() {
  const header = $("#mainNavigation");
  if (header.length > 0) {
    header.addClass(
      "d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
    );
    header.append(
      $(`
<head>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="res/css/style.css" rel="stylesheet">
</head>
<a href="./" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
    <span class="fs-4">Car Crawl</span>
</a>
<ul id="mainNavigationNav" class="nav nav-pills">
    <li class="nav-item guest"><a href="./login.html" class="nav-link">Login</a></li>
    <li class="nav-item user"><button class="nav-link logout">Logout</button></li>
</ul>
        `)
    );
    $(".logout", header).click(function () {
      executelogOut();
    });
    updateNavbarRole();
    updateNavbarActive();
  }
}

$(document).ready(function () {
  buildNavbar();
  const body = $("body");
  if (!body.hasClass("no-fadein")) {
    $("body").fadeIn();
  } else {
    $("body").show();
  }
  $("[autofocus]").focus();
});

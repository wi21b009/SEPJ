$(document).ready(function () {
  checkIfUserIsLoggedIn();

  $("#btnLoginUser").on("click", function (event) {
    event.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    executeLogin({
      username,
      password
    });
  });

  function executeLogin(loginData) {
    // When document is ready
    $.ajax({
      method: "POST",
      url: API_PATH + "?action=login",
      dataType: "json", // We know we want JSON data
      data: JSON.stringify(loginData),
      success: function (data) {
        if (Object.keys(data).length > 0) {
          window.localStorage.setItem("username", data["username"]);
          window.localStorage.setItem("email", data["email"]);

          location.href = "./index.html";
        } else {
          showLoginError();
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(JSON.stringify(xhr));
        console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
      },
    });
  }

  function checkIfUserIsLoggedIn() {
    if (window.localStorage.getItem("username") != null) {
      location.href = "./index.html";
    }
  }

  function showLoginError() {
    $("#loginError").show();
    $("#loginError").text("Falscher Benutzername/Passwort!");
  }
});

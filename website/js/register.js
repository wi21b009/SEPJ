$(document).ready(function () {
  $("#registerErrorMessage").hide();

  $("#form_register").submit(function (event) {
    event.preventDefault();
    const email = $("#email").val();
    const username = $("#username").val();
    const password = $("#password").val();
    const repeatpassword = $("#repeatpassword").val();

    const userData = {
      email,
      username,
      password,
      repeatpassword,
    };
    if (password !== repeatpassword) {
      showPasswordsAreNotMatchingError();
    } else {
      checkIfUsernameIsAlreadyTaken(userData, () => {
        createUser(userData);
      });
    }
  });

  function checkIfUsernameIsAlreadyTaken(userData, onSuccess) {
    $.ajax({
      method: "POST",
      datatype: "json",
      url: API_PATH + "?action=checkIfUsernameIsAlreadyTaken",
      data: JSON.stringify(userData),
      success: function (response) {
        if (response == false) {
          onSuccess();
        } else {
          // console.log(response);
          // console.log(data);
          showUsernameAlreadyExistsError();
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(JSON.stringify(xhr));
        console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
      },
    });
  }

  function createUser(userData) {
    $.ajax({
      method: "POST",
      datatype: "json",
      url: API_PATH + "?action=register",
      data: JSON.stringify(userData),
      success: function (data) {
        alert("Registrierung war erfolgreich!");
        location.href = "./login.html";
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(JSON.stringify(xhr));
        console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
      },
    });
  }

  function showPasswordsAreNotMatchingError() {
    $("#registerErrorMessage").show();
    $("#registerErrorMessage").text("Passwörter stimmen nicht überein!");
  }

  function showUsernameAlreadyExistsError() {
    $("#registerErrorMessage").show();
    $("#registerErrorMessage").text("Benutzername existiert bereits!");
  }
});

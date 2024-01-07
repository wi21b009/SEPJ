$(document).ready(function () {
  const username = window.localStorage.getItem("username");

  showWelcomeText();
  fetchSearchAgents();

  function showWelcomeText() {
    willkommenText = "Willkommen";
    if (username == null) {
      $("#welcome-txt").text(willkommenText);
    } else {
      $("#welcome-txt").text(willkommenText + " " + username + "!");
    }
  }

  function fetchSearchAgents() {
    $.ajax({
      method: "GET",
      datatype: "json",
      url: API_PATH + "?resource=getSearchAgents",
      success: function (data) {
        $("#searchAgent-list").removeClass("invisible");
        showSearchAgents(data);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.responseText.includes("Not logged in")) {
          location.href = "./login.html";
        } else {
          console.log(JSON.stringify(xhr));
          console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
        }
      },
    });
  }

  function showSearchAgents(searchAgents) {
    for (const searchAgent of searchAgents) {
      const editLink = `./searchAgent.html?id=${searchAgent.id}&brand=${searchAgent.brand}&maxPrice=${searchAgent.maxPrice}&yearOfManufacture=${searchAgent.yearOfManufacture}&mileage=${searchAgent.mileage}&regions=${searchAgent.regions}`;
      const row = $(`<tr>
        <!--<td>${searchAgent.id}</td>-->
        <td>${searchAgent.brand}</td>
        <td>${searchAgent.maxPrice}</td>
        <td>${searchAgent.yearOfManufacture}m² - ${searchAgent.mileage}m²</td>
        <td>${searchAgent.regions.map((id) => REGION_NAMES[id]).join(", ")}</td>
        <td class="text-end">
            <a class="btn btn-sm btn-secondary edit">Bearbeiten</a>
            <button type="button" class="btn btn-sm btn-secondary delete">Löschen</button>
        </td>
      </tr>`);
      $(row).find(".edit").attr("href", editLink);
      $(row)
        .find(".delete")
        .click(() => {
          if (confirm("Möchtest du diesen Preisalarm wirklich löschen?")) {
            deleteSearchAgent(searchAgent.id, () => {
              $(row).remove();
            });
          }
        });
      $("#searchAgentsTable").append(row);
    }
  }

  function deleteSearchAgent(searchAgentId, onSuccess) {
    $.ajax({
      method: "DELETE",
      datatype: "json",
      url: API_PATH + "?action=deleteSearchAgent",
      data: JSON.stringify(searchAgentId),
      success: function (data) {
        onSuccess();
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(JSON.stringify(xhr));
        console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
      },
    });
  }
});

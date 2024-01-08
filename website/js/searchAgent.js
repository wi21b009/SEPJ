$(document).ready(function () {

  let updateExistingId = null;

  function addSearchAgent(searchAgentData) {
    $.ajax({
      method: "POST",
      datatype: "json",
      url: API_PATH + "?action=createSearchAgent",
      data: JSON.stringify(searchAgentData),
      success: function () {
        alert("Price SearchAgent wurde erfolgreich angelegt!");
        window.location.href = "./";
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(JSON.stringify(xhr));
        console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
        
      },
    });
  }

  function updateSearchAgent(searchAgentData) {
    $.ajax({
      method: "PUT",
      datatype: "json",
      url: API_PATH + "?action=updateSearchAgent",
      data: JSON.stringify(searchAgentData),
      success: function () {
        alert("Price SearchAgent wurde erfolgreich bearbeitet!");
        window.location.href = "./";
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(JSON.stringify(xhr));
        console.log("AJAX error: " + ajaxOptions + " : " + thrownError);
      },
    });
  }

  $("#btnCreateSearchAgent").on("click", function () {
    const brand = $("#brandSelect option:selected").text();
    const model = $("#modelSelect option:selected").text();
    const maxPrice = parseInt($("#maxPrice").val());
    const yearOfManufacture = parseInt($("#yearOfManufacture").val());
    const mileage = parseInt($("#mileage").val());
    const engine = $("#engineSelect option:selected").text();
    //const country = $(".region-checkbox:checked")
    const regions = $(".region-checkbox:checked")
      .get()
      .map((element) => element.value);
    const features = $("#features").val();

    if (regions.length === 0 && brand === "" && model === "" && features === "" && engine === "" && isNaN(maxPrice) && isNaN(yearOfManufacture) && isNaN(mileage)) {
      alert("Mindestens ein Feld muss ausgefüllt werden!");
      return;
    }

    const searchAgentData = {
      brand,
      model,
      maxPrice,
      yearOfManufacture,
      mileage,
      engine,
      features,
      regions,
    };
    console.log(searchAgentData);
    if (updateExistingId) {
      searchAgentData.id = updateExistingId;
      updateSearchAgent(searchAgentData);
    } else {
      addSearchAgent(searchAgentData);
    }
  });

  checkIsUpdate();

  function checkIsUpdate() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id")) {
      updateExistingId = parseInt(params.get("id"));
      const brandSelect = params.get("brandSelect");
      $("#brandSelect option")
        .get()
        .forEach((option) => {
          if (option.textContent === brandSelect) {
            option.selected = true;
          }
        });
      const modelSelect = params.get("modelSelect");
      $("#modelSelect option")
        .get()
        .forEach((option) => {
          if (option.textContent === modelSelect) {
            option.selected = true;
          }
        });
      $("#maxPrice").val(params.get("maxPrice"));
      $("#yearOfManufacture").val(params.get("yearOfManufacture"));
      $("#mileage").val(params.get("mileage"));
      //TODO:fix updating regions
      // const regions = params.get("regions").split(",");
      // for (const region of regions) {
      //   $(`#region-${region}`).prop("checked", true);
      // }
      //$(`#${region}`).prop("checked", true);
      $("#btnCreateSearchAgent").text("Änderungen übernehmen");
      $("#pageTitle").text("Suchagent bearbeiten");
    }
  }


});
//const cars = require("./website/backend/models/cars.json");

$(document).ready(function () {
  
  function createBrandSelect(cars) {
    const brandSelect = $("#brandSelect");
    const selectElement = document.createElement("select");

    cars.forEach(car => {
        const optionElement = document.createElement("option");
        optionElement.value = car.value;
        optionElement.textContent = car.label;
        selectElement.appendChild(optionElement);
    });


  brandSelect.append(selectElement);
  }

  fetch('./website/backend/models/cars.json')
    .then(response => response.json())
    .then(data => {
        const cars = data;
        // You can now use 'cars' here
        createBrandSelect(cars);
    })
    .catch(error => console.error('Error:', error));

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
    const brandSelect = $("#brandSelect option:selected").text();
    const maxPrice = parseFloat($("#maxPrice").val());
    let yearOfManufacture = parseInt($("#yearOfManufacture").val());
    let mileage = parseInt($("#mileage").val());
    const regions = $(".region-checkbox:checked")
      .get()
      .map((element) => element.value);

    if (regions.length === 0) {
      alert("Mindestens eine Region muss ausgewählt werden");
      return;
    }

    const searchAgentData = {
      brandSelect,
      maxPrice,
      yearOfManufacture,
      mileage,
      regions,
    };
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
      $("#maxPrice").val(params.get("maxPrice"));
      $("#yearOfManufacture").val(params.get("yearOfManufacture"));
      $("#mileage").val(params.get("mileage"));
      const regions = params.get("regions").split(",");
      for (const region of regions) {
        $(`#region-${region}`).prop("checked", true);
      }
      $("#btnCreateSearchAgent").text("Änderungen übernehmen");
      $("#pageTitle").text("Price-SearchAgent bearbeiten");
    }
  }

//TODO:find out how to import cars.js


});
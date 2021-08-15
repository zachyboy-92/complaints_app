const list = document.querySelector(".list");
let buttons = document.querySelectorAll(".btn");
let input = document.querySelector("#input");

buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    let inputValue = input.value;
    let buttonValue = btn.value;
    if (!inputValue) {
      inputValue = 10;
    }
    policeComplaints(inputValue, buttonValue);
  });
  btn.addEventListener("mouseout", () => {
    setTimeout(() => {
      list.innerHTML = "";
    }, 5000);
  });
});

function policeComplaints(value, city) {
  list.innerHTML = "";
  fetch("https://data.cityofnewyork.us/resource/erm2-nwe9.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data
        .filter((filterByAgency) => filterByAgency.agency === "NYPD")
        .filter((filterByCity) => filterByCity.borough === city.toUpperCase())
        .forEach((dt, i) => {
          if (value > i) {
            list.insertAdjacentHTML(
              "afterbegin",
              `<div class="item-container">
                    <li class="item">${dt.descriptor}</li>
                    <button class="response">What did the police do</button>
                </div>
                <div class="response-container">
                    <p>${
                      dt.resolution_description
                        ? dt.resolution_description
                        : "Complaint not resolved yet"
                    }</p>
                </div>
                `
            );

            let policeResponse = document.querySelector(".response");
            let response = document.querySelector(".response-container");
            policeResponse.addEventListener("mouseenter", () => {
              response.classList.remove("response-container");
            });

            policeResponse.addEventListener("mouseout", () => {
              setTimeout(() => {
                response.classList.add("response-container");
              }, 1000);
            });
          } else {
            return;
          }
        });
    });
}

import { Page } from "../page.js";
import { API } from "./api_calls.js";
import { Datest } from "./date.js";
import { filterMenu, resultCard } from "./components.js";

export class ReservationPage extends Page {
  api: API;
  constructor() {
    super("/src/pages/reservation/reservation.html");
    this.api = new API(this);
  }

  override getHtmlCallback() {
    //Set default values for date picker
    const startDateField = document.getElementById("startDate") as HTMLInputElement;
    startDateField.value = new Datest().addDays(1).toString();
    startDateField.setAttribute("min", new Datest().toString());

    const endDateField = document.getElementById("endDate") as HTMLInputElement;
    endDateField.value = new Datest().addDays(2).toString();
    endDateField.setAttribute("min", new Datest().addDays(2).toString());

    customElements.define("result-card", resultCard);
    customElements.define("filter-menu", filterMenu);

    const hotelRoom = {
      roomNumber: 123,
      numberOfBeds: 2, // Could be an array for multiple beds: [ { type: "King" }, { type: "Twin" } ]
      numberOfBathrooms: 1,
      hasBalcony: true,
      squareMeters: 45,
      pricePerNight: 150,
      isAvailable: true,
    };

    const searchResult = document.getElementById("searchResults");
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(new resultCard("asd", "asd", hotelRoom));
    searchResult?.appendChild(
      new filterMenu(["4People", "2People", "1Person"]),
    );

    addCallBacks();
  }
}


function addCallBacks() {

  //Align endDate min and value to startDate (endDate is the day after startDate)
  const startDateField = document.getElementById('startDate') as HTMLInputElement;
  const endDateField = document.getElementById('endDate') as HTMLInputElement;
  startDateField?.addEventListener('change', (e) => {
    let nextDay = new Datest().fromString(e?.target?.value).addDays(1).toString()
    endDateField.value = nextDay;
    endDateField.setAttribute('min', nextDay);
  })

  //Add functionality to addPersone and removePerson buttons
  const personCountField = document.getElementById('personCount') as HTMLInputElement;
  const addPersonButton = document.getElementById('addPerson');
  addPersonButton?.addEventListener('click', () => {
    personCountField.value = (Number(personCountField.value) + 1).toString();
  })
  const removePersonButton = document.getElementById('removePerson');
  removePersonButton?.addEventListener('click', () => {
    const value = Number(personCountField.value);
    const newValue = Math.max(1, value - 1);
    personCountField.value = newValue.toString();
  });
}

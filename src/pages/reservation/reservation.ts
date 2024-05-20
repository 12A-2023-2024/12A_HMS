import { Page } from "../page.js";
import { API, Room } from "./api_calls.js";
import { Datest } from "./date.js";
import { filterMenu, resultCard } from "./components.js";

export class ReservationPage extends Page {
  token: string = '';
  constructor() {
    super("/src/pages/reservation/reservation.html");
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

    const searchResult = document.getElementById("searchResults") as HTMLElement;
    const parameterList: any[] = [];
    API.queryParameters().then((parameters: any) => {
      parameters.forEach((parameter: any) => {
        parameterList.push(parameter)
      });
      searchResult.appendChild(new filterMenu(parameterList));
    });
    
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

  // Search command
  const searchButton = document.getElementById('searchButton') as HTMLElement;
  searchButton.addEventListener('click', () => {
    const floor = 0; // create search field
    const fromPrice = null;
    const toPrice = null;
    const capacity = Number.parseInt(personCountField.value);
    const fromDate = startDateField.value;
    const toDate = endDateField.value;
    const searchResult = document.getElementById("searchResults") as HTMLElement;
    API.queryRooms(floor, fromPrice, toPrice, capacity, filterMenu.get_checked_parameters(), fromDate, toDate).then((rooms) => {
      console.log(filterMenu.get_checked_parameters());
      searchResult.innerHTML = "";
      rooms.forEach(room => {
        searchResult?.appendChild(new resultCard(room.roomType.name, room.roomType.imageUrls[0], room));
      });
    });
  });
}
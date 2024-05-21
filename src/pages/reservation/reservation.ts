import { Page } from "../page.js";
import { API, Room } from "./api_calls.js";
import { Datest } from "./date.js";
import { filterMenu, reserveForm, resultCard } from "./components.js";

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
    customElements.define("reserve-form", reserveForm);

    const wrapper = document.getElementById("wrapper") as HTMLElement;
    const parameterList: any[] = [];
    // API.queryParameters().then((parameters: any) => {
    //   parameters.forEach((parameter: any) => {
    //     parameterList.push(parameter)
    //   });
      wrapper.appendChild(new filterMenu(parameterList));

      // 1. Create the main div (inputWrapper)
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'inputWrapper flex h-10 shrink-0 grow-0 basis-[100%]     items-center justify-stretch';

      // 2. Create the search button
      const searchButton = document.createElement('button');
      searchButton.id = 'searchButton';
      searchButton.className = 'm-0 h-full w-full rounded-lg bg-[#f25f3a]';
      searchButton.textContent = 'Search'; // Add th
      inputWrapper.appendChild(searchButton);
      wrapper.appendChild(inputWrapper);

      searchButton.addEventListener('click', () => {
        const personCountField = document.getElementById('personCount') as HTMLInputElement;
        const floor = 0; // create search field
        const fromPrice = null;
        const toPrice = null;
        const capacity = Number.parseInt(personCountField.value);
        const fromDate = startDateField.value;
        const toDate = endDateField.value;
        const searchResult = document.getElementById("searchResults") as HTMLElement;
        searchResult.appendChild(new resultCard("asd", "asd", {}))
        API.queryRooms(floor, fromPrice, toPrice, capacity, filterMenu.get_checked_parameters(), fromDate, toDate).then((rooms) => {
          console.log(filterMenu.get_checked_parameters());
          searchResult.innerHTML = "";
          rooms.forEach(room => {
            searchResult?.appendChild(new resultCard(room.roomType.name, room.roomType.imageUrls[0], room));
          });
        });
      // });
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


  document.querySelector("#PopUpCLoseBt")?.addEventListener("click", (e) => {
    (document.querySelector("#searchResults") as HTMLElement).style.overflow = "scroll";
    (document.querySelector("#popupWrapper") as HTMLElement).style.display = "none";
    (document.querySelector("#searchButton") as HTMLButtonElement).disabled = false;
    const formElements = document.querySelectorAll(".form");

    formElements.forEach(formElement => {
      formElement.remove();
    });
  })

  const modalSubmitButton = document.querySelector("#submit-modal");
  modalSubmitButton?.addEventListener("click", (e) => {
    const elements: any = document.querySelectorAll("reserve-form");
    const raw_guest_info: Object[] = [];
    elements.forEach((e: any) => {
      raw_guest_info.push(e.getAllInfo());
    })

    for (const obj of raw_guest_info) {
      for (const value of Object.values(obj)) {
        if (value === undefined || value === null || value === '') {
          console.log(raw_guest_info);
          (document.querySelector("#form-error-message") as HTMLElement).style.display = "block"
          setTimeout(() => { (document.querySelector("#form-error-message") as HTMLElement).style.display = "none" }, 5000);
        } else {

        }
      }
    }

  })
  // Search command
}
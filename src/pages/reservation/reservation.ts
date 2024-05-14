import { Page } from "../page.js";
import { API } from "./api_calls.js";
import { Datest } from "./date.js";

export class ReservationPage extends Page {
  api: API;
  constructor() {
    super("/src/pages/reservation/reservation.html");
    this.api = new API(this);

    let a = this.api.reserveRoom(103, "2024-01-02", "2024-02-03", []);
    console.log(a);
  }

  override getHtmlCallback() {

    //Set default values for date picker
    const startDateField = document.getElementById('startDate');
    startDateField?.setAttribute('min', new Datest().toString());
    startDateField?.setAttribute('value', new Datest().addDays(1).toString());

    const endDateField = document.getElementById('endDate');
    endDateField?.setAttribute('value', new Datest().addDays(2).toString());
    endDateField?.setAttribute('min', new Datest().addDays(2).toString());

    addCallBacks();
  }
}


function addCallBacks() {

  //Align endDate min and value to startDate (endDate is the day after startDate)
  const startDateField = document.getElementById('startDate');
  const endDateField = document.getElementById('endDate');
  startDateField?.addEventListener('change', (e) => {
    let nextDay = new Datest().fromString(e?.target?.value).addDays(1).toString()
    endDateField?.setAttribute('value', nextDay);
    endDateField?.setAttribute('min', nextDay);
  })

  //Add functionality to addPersone and removePerson buttons
  const personCountField = document.getElementById('personCount') as HTMLElement;
  const addPersonButton = document.getElementById('addPerson');
  addPersonButton?.addEventListener('click', () => {
    personCountField.setAttribute('value', (Number(personCountField.getAttribute('value')) + 1).toString());
  });
  const removePersonButton = document.getElementById('removePerson');
  removePersonButton?.addEventListener('click', () => {
    const value = Number(personCountField.getAttribute('value'));
    const newValue = Math.max(1, value - 1);
    personCountField.setAttribute('value', newValue.toString());
  });
}

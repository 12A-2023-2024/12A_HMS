export class reserveForm extends HTMLElement {
  number: Number;

  constructor(num: number) {
    super();

    this.number = num;
  }

  connectedCallback() {
    const template = document.getElementById(
      "guest-reserve-form",
    ) as HTMLTemplateElement;
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    const h3Element = this.querySelector("h3");
    if (h3Element) {
      h3Element.textContent = "Person " + this.number;
    }
  }

  getAllInfo() {
    const data: { [key: string]: string } = {};
    // Array of input IDs to collect
    const inputIds = ['name', 'addr', 'city', 'nationality', 'birthdate', 'birthplace', 'passport'];

    for (const inputId of inputIds) {
      const inputElement = this.querySelector<HTMLInputElement>(`#${inputId}`);
      if (inputElement) {
        data[inputId] = inputElement.value; // Store the value under the input ID
      } else {
        console.warn(`Input element with ID #${inputId} not found in the form.`);
        data[inputId] = ''; // Store an empty value if the input is missing
      }
    }
    return data;
  }
}

export class resultCard extends HTMLElement {
  title: string;
  data: any;
  imgsource: string;

  constructor(title: string, imgsource: string, data: any) {
    super();

    this.title = title;
    this.data = data;
    this.imgsource = imgsource;
    if (!this.imgsource) {
      this.imgsource = "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
    }
  }
  connectedCallback() {
    const template = document.getElementById(
      "result-card-template",
    ) as HTMLTemplateElement;
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.classList.add("max-xl:w-1/2");
    this.classList.add("max-md:w-full");
    this.classList.add("max-md:space-evenly");
    this.classList.add("xl:w-1/2");
    this.style.height = "224px";
    this.style.display = "flex";
    this.classList.add("p-1");
    this.classList.add("bg-gray-200");
    this.classList.add("rounded-lg");

    const title = this.querySelector("h2") as HTMLHeadingElement;
    if (title != null) {
      title.textContent = this.title;
    }

    const img = this.querySelector("img") as HTMLImageElement;
    if (img != null) {
      img.src = this.imgsource;
    }

    const propeties = this.querySelector(".cardProperties") as HTMLElement;
    if (propeties != null) {
      Object.keys(this.data).forEach((key) => {
        const value = this.data[key];
        const prop = document.createElement("p");
        prop.classList.add("reservationpage-propertyWrapper");
        prop.textContent = key + ": " + value;
        propeties.appendChild(prop);
      });
    }

    this.querySelector(".reserveBT")?.addEventListener("click", (e: any) => {
      (document.querySelector("#searchResults") as HTMLElement).style.overflow = "hidden";
      (document.querySelector("#searchButton") as HTMLButtonElement).disabled = true;

      let modal = (document.querySelector("#popupWrapper") as HTMLElement);
      let personCout = document.querySelector("#personCount") as HTMLInputElement
      modal.style.display = "block"
      let modalinhalt = document.querySelector("#Theactualpopup") as HTMLElement
      for (let index = 0; index < Number(personCout.value); index++) {
        modalinhalt.appendChild(new reserveForm(index + 1));
      }
    })
  }
}

export class filterMenu extends HTMLElement {
  data: any[];
  constructor(data: any[]) {
    super();
    this.data = data;
  }

  connectedCallback() {
    const template = document.getElementById(
      "filter-menu-template",
    ) as HTMLTemplateElement;
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.style.display = "flex";
    this.style.minHeight = "2.5rem"; // Or "40px"
    this.style.flexShrink = "0";
    this.style.flexGrow = "0";
    this.style.flexBasis = "100%";
    this.style.alignItems = "center";
    this.style.justifyContent = "flex-start";
    this.style.backgroundColor = "#ffffff"; // slate-50
    this.style.flexWrap = "wrap";
    this.style.fontSize = ".8rem"; // Or "12px"
    this.style.borderRadius = ".8rem"; // Or "12px"

    const target = this.querySelector(".inputWrapper");
    this.data.forEach((item: { name: string, id: string }) => {
      const fragment = document.createElement("div");
      const filter = document.createElement("input");
      filter.setAttribute("type", "checkbox");
      filter.id = "filterButton" + item.id;
      filter.classList.add("roomParameter");
      const lbl = document.createElement("label");
      lbl.setAttribute("for", "filterButton" + item.id);
      lbl.classList.add("pl-2");
      lbl.textContent = item.name;
      fragment?.appendChild(filter);
      fragment?.appendChild(lbl);
      fragment.setAttribute("class", "checkboxWrapper px-1 xl:w-[20%] max-xl:w-[20%] max-md:w-[33%] ")
      target?.appendChild(fragment);
    });
  }

  static get_checked_parameters() {
    let params = "";
    for (var param of document.getElementsByClassName("roomParameter")) {
      if ((param as HTMLInputElement).checked) {
        params += param.getAttribute("id")?.slice(12) + ';';
      }
    }

    return params.slice(0, -1);
  }
}
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

  popup() {}

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
    this.style.height = "200px";
    this.style.display = "flex";
    this.classList.add("p-1");

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

    const target = this.querySelector(".filterMenuMain");
    this.data.forEach((item: {name: string, id: string}) => {
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
      target?.appendChild(fragment);
    });
  }

  static get_checked_parameters() {
    let params = "";
    for (var param of document.getElementsByClassName("roomParameter")) {
      if (param.checked) {
        params += param.getAttribute("id")?.slice(12) + ';';
      }
    }

    return params.slice(0, -1);
  }
}

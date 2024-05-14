import { Page } from "../../page.js";
import { introductionModel } from "../introductionModel.js";
import { Login } from "../login.js";


export class IntroductionAdminPage extends Page {

    data: introductionModel[] |undefined
    constructor() {
        super('src/pages/introduction/introductionAdmin/introductoinAdmin.html');
    }

    override getHtmlCallback(){
        this.login()
        this.querySelector<HTMLInputElement>("#sendButton").addEventListener("click", () => this.send())
        this.querySelector<HTMLInputElement>("#plusListElement").addEventListener("click", () => this.addInputListItem())
        this.querySelector<HTMLInputElement>("#minusListElement").addEventListener("click", () => this.deleteInputListItem())
        this.querySelector<HTMLInputElement>("#section").addEventListener("change", () => this.changeSection())
    }

    async login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            "loginName": "admin",
            "password": "admin"
         }
        const data = this.fetch<Login>(url, method, body)
        await data.then( (result) => {
            localStorage.setItem('user', JSON.stringify(result));
        })
    }

    addData(fileData:string, newIntroduction:introductionModel){
        const url: string = "https://hms.jedlik.cloud/api/about/introduction"
        const method: string = "POST"
        const body: any= {
            order: 1,
            text: newIntroduction.text,
            section: newIntroduction.section,
            image: {
                filename: newIntroduction.alt,
                file: fileData
            }
        }
        const data = this.fetch<null>(url, method, body)
    }

    send(){
        const newIntroduction = new introductionModel()
        const file = this.querySelector<HTMLInputElement>('#fileUpload');
        newIntroduction.alt = this.querySelector<HTMLInputElement>('#fileUpload').value;
        const section = this.querySelector<HTMLSelectElement>('#section').value;
        newIntroduction.section = section
        newIntroduction.text = this.querySelector<HTMLTextAreaElement>('#title').value;
        if (section === "banner"){
            const listElements = this.querySelectorAll<HTMLInputElement>(".bannerList")
            listElements.forEach(listElement => {
                newIntroduction.text += `<li>${listElement.value}</li>`
            });
        }
        try {
            const fileData = this.getBase64(file)
            fileData.then(data => this.addData(data, newIntroduction));
            alert("Sikeres módosítás!")
        } catch (error) {
            this.hibavanhülye(error);
        }
    }


    async getBase64(element: HTMLInputElement): Promise<string> {
        var filelist = element.files as FileList;
        var file = filelist[0];
        var filedata;
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        }).then(
          data => this.parseResult(data as string)
        );
      }
  
      parseResult(result:string): string {
        return result.slice(result.indexOf("base64")+7)
      }

      hibavanhülye(error: any){
        console.log(error)
      }
  
      changeSection(){
        const sectionValue = this.querySelector<HTMLInputElement>("#section").value
        const listMain = this.querySelector<HTMLElement>("#list-main")
        const inputsMain = this.querySelector<HTMLElement>("#inputs-main")
        if (sectionValue === "banner"){
            listMain.classList.remove("hidden")
            this.addInputListItem()
            this.addInputListItem()
        }else{
            listMain.classList.add("hidden")
            inputsMain.innerHTML = ""
        }
      }
      addInputListItem(){
        const inputsMain = this.querySelector<HTMLElement>("#inputs-main")
        inputsMain.innerHTML += "<input class=\"block bannerList\" type=\"text\" name=\"title\" value=\"list\">"
      }

      deleteInputListItem() {
        const inputsMain = document.querySelector("#inputs-main");
        if (inputsMain && inputsMain.children.length > 0) {
            const lastChild = inputsMain.lastChild;
            if (lastChild) {
                inputsMain.removeChild(lastChild);
            }
        }
    }
    


}
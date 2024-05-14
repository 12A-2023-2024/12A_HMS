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
    }

    async login(){
        const url: string = "https://hms.jedlik.cloud/api/login"
        const method: string = "POST"
        const body: any= {
            "loginName": "admin",
            "password": "admin"
         }
        const data = this.fetch<Login>(url, method, body)
        console.log(data)
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
        console.log(data)
    }

    send(){
        console.log("Itt vagyok gyökér");
        const newIntroduction = new introductionModel()
        const file = this.querySelector<HTMLInputElement>('#fileUpload');
        console.log(file)
        newIntroduction.alt = this.querySelector<HTMLInputElement>('#fileUpload').value;
        newIntroduction.section = this.querySelector<HTMLSelectElement>('#section').value;
        newIntroduction.text = this.querySelector<HTMLTextAreaElement>('#title').value;
        try {
            const fileData = this.getBase64(file)
            fileData.then(data => this.addData(data, newIntroduction));
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
  
}
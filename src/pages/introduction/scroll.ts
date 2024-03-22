export class Scroll {
    private container: HTMLElement | null;
    private intervalId: number | undefined;
    private maxStep: number | undefined;
    private step: number = 0;
    private width: number | undefined = 400;


    constructor(container: HTMLElement, ms: number){
        this.container = container
        this.maxStep = this.container.children.length
        this.intervalId = setInterval(this.scrollRight.bind(this), ms);
        this.addEvents()
    }



    private scrollRight(): void {
        if (this.container) {
            if (this.width && this.maxStep){
                const result = this.step*this.width
                this.container.scroll({
                    top: 0,
                    left: result,
                    behavior: "smooth",
                })
                if (this.step < this.maxStep){
                    this.step += 1
                }else{
                    this.step = 0
                }
            }
        }
    }

    private addEvents(){
        if (this.container) {
            this.container.addEventListener('mouseenter', () => {
                if (this.intervalId !== undefined) {
                    clearInterval(this.intervalId);
                    this.intervalId = undefined;
                }
            });
        }
        if (this.container) {
            this.container.addEventListener('mouseleave', () => {
                if (this.intervalId === undefined) {
                    // Ensure this.intervalId is initialized before using it
                    this.intervalId = setInterval(this.scrollRight.bind(this), 1000);
                }
            });
        }
    }
}

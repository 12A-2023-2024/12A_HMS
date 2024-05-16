import { Page } from "../page";
const inputElements = document.querySelectorAll("input")

inputElements.forEach(element => {
    element.addEventListener('input', (event: any) => {
        const input: string = event.target.value
        const remainingInput = input.slice(0, 1)

        //Backspacing
        //If remaining input is empty, jumping to previous element
        if (remainingInput.length <= 0) {
            const index = Number(element.id)
            const prevElement = inputElements[index - 1]
            prevElement.focus()
            return
        }

        element.value = remainingInput

        //If more characters are present, sending them to the next input field recursively.
        const travellingInput = input.slice(1)
        const index = Number(element.id)
        if (index == 5) {
            checkReservationNumber()
            return
        }

        const nextElement = inputElements[index + 1]

        if (travellingInput.length > 0) {
            nextElement.value = travellingInput
            const inputEvent = new CustomEvent('input')
            nextElement.dispatchEvent(inputEvent)
        }
        else {
            //If no more characters are present, focusing on the next (empty) field.
            nextElement.focus()
        }
    });
});

async function checkReservationNumber() {
    let reservationNumber = ""
    inputElements.forEach(element => {
        reservationNumber += element.value
    });

    const url = "https://hms.jedlik.cloud/api/publicpages/checkin/" + reservationNumber
    const method = "POST"
    const requestOptions: RequestInit = {
        method: method,
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
        }
    };

    const response = await fetch(url, requestOptions)
    //Do stuff here after we have reservations ready
}
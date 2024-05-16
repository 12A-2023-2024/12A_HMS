
function addEventListeners() {


    for (let i = 1; i <= 5; i++) {
        document.getElementById(`pic${i}`)?.addEventListener("click", () => {
            alert("You clicked on the image!");
        });
    }
}

addEventListeners();
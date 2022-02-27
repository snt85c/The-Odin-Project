import * as apiFunctions from "./APIFunctions";
import * as domFunctions from "./DOMFunctions"

const search = document.getElementById("submit");
const input = document.getElementById("input")

window.onload = function() { document.getElementById("loading").style.display = "none" }

apiFunctions.geolocation()

search.addEventListener("click", () => {
    domFunctions.search(input.value)
    input.value = "";
})

window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        domFunctions.search(input.value)
        input.value = "";
    }
})
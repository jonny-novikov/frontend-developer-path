/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

let units = 20;

function convertUnits () {

}

function renderUnits () {
    const items = document.querySelectorAll(".convert-result-item .text");
    const unitsToConvert = units || 1
    if (items.length === 3) {
        const meters = (unitsToConvert / 3.281).toFixed(3)
        const feets = (unitsToConvert * 3.281).toFixed(3)
        items[0].innerText = `${unitsToConvert} meters = ${feets} feet | ${unitsToConvert} feet = ${meters} meters`

        const liter = (unitsToConvert / 0.264).toFixed(3)
        const gallons = (unitsToConvert * 0.264).toFixed(3)
        items[1].innerText = `${unitsToConvert} liters = ${gallons} gallons | ${unitsToConvert} gallons = ${liter} liters`

        const kilograms = (unitsToConvert / 2.204).toFixed(3)
        const pounds = (unitsToConvert * 2.204).toFixed(3)
        items[2].innerText = `${unitsToConvert} kilograms = ${pounds} pounds | ${unitsToConvert} pounds = ${kilograms} kilograms`
    }
}


function domReady (fn) {
    if (typeof fn !== 'function') {
        throw new Error('Argument passed to domReady should be a function')
    }
    if (document.readyState !== 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn, { once: true })
    }
}

domReady(function () {
    document.getElementById("btn-convert").addEventListener("click", function () {
        renderUnits()
    })
    const unitsEl = document.getElementById("metric-value");
    unitsEl.value = units
    unitsEl.addEventListener("input", function () {
        if (unitsEl.value < 0) {
            unitsEl.value = 0
        }
        units = unitsEl.value
        renderUnits()
    })
    renderUnits()
})

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

let units = 20;
const converter = [
    {
        title: "Length (Meter/Feet)",
        metric: "meters",
        imperial: "feet",
        multiplier: 3.281
    },
    {
        title: "Volume (Liters/Gallons)",
        metric: "liters",
        imperial: "gallons",
        multiplier: 0.264
    },
    {
        title: "Mass (Kilograms/Pounds)",
        metric: "kilograms",
        imperial: "pounds",
        multiplier: 3.281
    }
]

function renderUnits () {
    const resultsEl = document.querySelector(".convert-results");
    const unitsToConvert = units || 1
    let resultsHtml = ""
    converter.forEach(function (unit) {
        const srcValue = (unitsToConvert / unit.multiplier).toFixed(3)
        const targetValue = (unitsToConvert * unit.multiplier).toFixed(3)
        const text =
            `${unitsToConvert} ${unit.metric} = ${targetValue} ${unit.imperial} | ` +
            `${unitsToConvert} ${unit.imperial} = ${srcValue} ${unit.metric}`

        const itemHtml =
            `<div class="convert-result-item">
                    <h3 class="h3">${unit.title}</h3>
                    <p class="text">${text}</p>
            </div>
        `
        resultsHtml += itemHtml
    })
    resultsEl.innerHTML = resultsHtml;
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
    const metricBox = document.querySelector(".metric-box")
    const unitsEl = document.getElementById("metric-value")
    unitsEl.value = units
    unitsEl.addEventListener("input", function () {
        if (unitsEl.value < 0) {
            unitsEl.value = 0
        }
        let width = Math.max(117, 117 + (unitsEl.value.length - 2) * 50)
        width = Math.min(window.innerWidth - 40, width);
        metricBox.style.width = width.toString()
        units = unitsEl.value
        renderUnits()
    })
    renderUnits()
})

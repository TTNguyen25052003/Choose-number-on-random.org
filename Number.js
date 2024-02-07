// ==UserScript==
// @name         Random.org
// @namespace    http://tampermonkey.net/
// @version      2024-02-06
// @description  Choose your number on random.org
// @author       TTNguyen2552003
// @match        https://www.random.org/widgets/integers/iframe?title=True+Random+Number+Generator&buttontxt=Generate&width=160&height=230&border=on&bgcolor=%23FFFFFF&txtcolor=%23777777&altbgcolor=%23CCCCFFA&alttxtcolor=%23000000&defaultmin=1&defaultmax=100&fixed=off
// @icon         https://www.google.com/s2/favicons?sz=64&domain=random.org
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    
    function controlRandom() {
        const happyNumber = 15

        let id = document.body.getElementsByTagName('div')[0].id

        let idResult = id + "-result"
        let spanResult = document.querySelector('span[id="' + idResult + '"]');
        spanResult.innerHTML = ``

        let inputNumber = document.querySelectorAll('input[type="number"]')
        let minValue = inputNumber[0].value
        let maxValue = inputNumber[1].value

        // Get current date and time in UTC
        var currentDate = new Date();
        // Get UTC date components
        var utcDate = currentDate.getUTCDate();
        var utcMonth = currentDate.getUTCMonth() + 1; // Month starts from 0
        var utcYear = currentDate.getUTCFullYear();
        // Get UTC time components
        var utcHours = currentDate.getUTCHours();
        var utcMinutes = currentDate.getUTCMinutes();
        var utcSeconds = currentDate.getUTCSeconds();
        // Format UTC date and time
        var formattedUTCDate = utcYear + "-" + (utcMonth < 10 ? "0" : "") + utcMonth + "-" + (utcDate < 10 ? "0" : "") + utcDate;
        var formattedUTCTime = (utcHours < 10 ? "0" : "") + utcHours + ":" + (utcMinutes < 10 ? "0" : "") + utcMinutes + ":" + (utcSeconds < 10 ? "0" : "") + utcSeconds;

        let loadingImage = document.createElement('img')
        loadingImage.src = "https://www.random.org/util/cp/images/ajax-loader.gif"
        loadingImage.alt = "Loading ..."
        spanResult.appendChild(loadingImage)

        setTimeout(() => {
            spanResult.removeChild(loadingImage)

            let center = document.createElement('center')

            let span1 = document.createElement('span')
            span1.style = "font-size:100%;font-weight:bold;"
            span1.innerHTML = `${happyNumber}<br>`

            let span2 = document.createElement('span')
            span2.style = "font-size:70%;"
            span2.innerHTML = `Min:&nbsp;${minValue}, Max:&nbsp;${maxValue}<br>${formattedUTCDate} ${formattedUTCTime} UTC`

            center.appendChild(span1)
            center.appendChild(span2)
            spanResult.appendChild(center)
        }, 750)

    }

    let generateButton = document.querySelector('input[value="Generate"]')
    generateButton.onclick = controlRandom
})();
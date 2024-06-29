// ==UserScript==
// @name         Torn Spotlight
// @namespace    http://tampermonkey.net/
// @version      beta-1.0
// @description  Navigate Torn Faster
// @author       Jayam Patel
// @match        https://www.torn.com/*
// @icon         https://ibb.co/88qx9g7
// @grant        none
// ==/UserScript==

// Set Key Combination (currently set to Ctl + Sft + K)
const mainKey = "K";
const pressControlKey = true;
const pressAltKey = false;
const pressShiftKey = true;

// Define your dictionary of keys and URLs
const urlDictionary = {
    Awards: "/awards.php",
    Bank: "/bank.php",
    Bazaar: "/bazaar.php",
    Calendar: "/calendar.php",
    Casino: "/casino.php",
    Crimes: "/crimes.php",
    Items: "/item.php",
    "Item Market": "/imarket.php",
    Gym: "/gym.php",
    Hospital: "/hospitalview.php",
    Home: "index.php",
    Jail: "/jailview.php",
    Job: "/job.php",
    Market: "/market.php",
    Messages: "/messages.php",
    Newspaper: "/newspaper.php",
    Properties: "properties.php",
    Travel: "/travelagency.php",
    Forums: "/forums.php",
    Faction: "/factions.php?step=your",
    Missions: "/loader.php?sid=missions",
    "Hall of Fame": "/page.php?sid=hof",
    Education: "/page.php?sid=education",
    Events: "/page.php?sid=events",
    Raceway: "/page.php?sid=racing",
    Logs: "/page.php?sid=log",
    Pharmacy: "/shops.php?step=pharmacy",
};

const spotlightDiv = document.createElement("div");
spotlightDiv.style.zIndex = 100000000000000;
spotlightDiv.style.position = "fixed";
spotlightDiv.style.left = "50%";
spotlightDiv.style.transform = "translateX(-50%)";
spotlightDiv.style.width = "200px";
spotlightDiv.style.top = "20px";

const spotlight = document.createElement("input");
spotlight.setAttribute("type", "text");
spotlight.setAttribute("id", "spotlight");
spotlight.setAttribute("placeholder", "Search");
spotlight.style.width = "100%";
spotlight.style.visibility = "hidden";

spotlightDiv.appendChild(spotlight);
document.body.appendChild(spotlightDiv);

function KeyPress(e) {
    var evtobj = window.event ? event : e;
    if (
        evtobj.ctrlKey == pressControlKey &&
        evtobj.altKey == pressAltKey &&
        evtobj.shiftKey == pressShiftKey &&
        evtobj.key == mainKey
    ) {
        console.log("Spotlight activated");
        spotlight.style.visibility = "visible";
        spotlight.value = "";
        spotlight.focus();

        setupAutocomplete(spotlight);

        // Trigger input event to show all suggestions
        spotlight.dispatchEvent(new Event("input"));
    }
}

function setupAutocomplete(inputElement) {
    let currentFocus;
    inputElement.addEventListener("input", function (e) {
        closeAllLists();
        console.log("Autocomplete input event fired", this.value);
        currentFocus = -1;
        const autocompleteList = document.createElement("div");
        autocompleteList.setAttribute("id", this.id + "-autocomplete-list");
        autocompleteList.setAttribute("class", "autocomplete-items");
        autocompleteList.style.background = "#f9f9f9";
        autocompleteList.style.width = "100%";
        autocompleteList.style.color = "#212529";
        this.parentNode.appendChild(autocompleteList);

        const sortedKeys = Object.keys(urlDictionary).sort((a, b) => {
            const aIndex = a.toLowerCase().indexOf(this.value.toLowerCase());
            const bIndex = b.toLowerCase().indexOf(this.value.toLowerCase());
            if (aIndex === bIndex) {
                return a.localeCompare(b); // Alphabetical order if indices are the same
            }
            return aIndex - bIndex; // Earlier match comes first
        });

        for (let key of sortedKeys) {
            if (
                key.toLowerCase().indexOf(this.value.toLowerCase()) > -1 ||
                !this.value
            ) {
                const item = document.createElement("DIV");
                item.innerHTML =
                    "<strong>" + key.substr(0, this.value.length) + "</strong>";
                item.innerHTML += key.substr(this.value.length);
                item.innerHTML += "<input type='hidden' value='" + key + "'>";
                item.addEventListener("click", function (e) {
                    inputElement.value =
                        this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                autocompleteList.appendChild(item);
            }
        }
    });

    inputElement.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "-autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            // Down arrow
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            // Up arrow
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            // Enter
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            } else {
                // Redirect to the URL of the first suggestion
                const firstSuggestion =
                    x[0].getElementsByTagName("input")[0].value;
                window.location.href = urlDictionary[firstSuggestion];
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inputElement) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

document.onkeydown = KeyPress;

document.addEventListener("click", function (event) {
    if (event.target.id != "spotlight") {
        const spotlight = document.getElementById("spotlight");
        if (spotlight) {
            spotlight.style.visibility = "hidden";
        }
    }
});

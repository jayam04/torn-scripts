// ==UserScript==
// @name         Torn Spotlight Search
// @namespace    http://tampermonkey.net/
// @version      beta-1.1
// @description  Navigate Torn Faster
// @author       Jayam Patel
// @match        https://www.torn.com/*
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornSpotlightSearchIcon.png
// @license      Apache License 2.0
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

    "Cracking (Crimes)": "loader.php?sid=crimes#/cracking",
};


function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'spotlight-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.WebkitBackdropFilter = 'blur(5px)'; // For Safari
    overlay.style.zIndex = '99999999999999'; // One less than spotlight
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
    return overlay;
}

const overlay = createOverlay();

const spotlightDiv = document.createElement("div");
spotlightDiv.style.zIndex = 100000000000000;
spotlightDiv.style.position = "fixed";
spotlightDiv.style.left = "50%";
spotlightDiv.style.transform = "translateX(-50%)";
spotlightDiv.style.width = "500px";
spotlightDiv.style.top = "100px";

const spotlight = document.createElement("input");
spotlight.setAttribute("type", "text");
spotlight.setAttribute("id", "spotlight");
spotlight.setAttribute("placeholder", "Spotlight Search");
spotlight.classList.add("spotlight");
// spotlight.style.width = "100%";
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
        overlay.style.display = "block"; // Show overlay
        spotlight.focus();

        setupAutocomplete(spotlight);

        // Trigger input event to show all suggestions
        spotlight.dispatchEvent(new Event("input"));
    }
}

function matchScore(word, string) {
    word = word.toLowerCase();
    string = string.toLowerCase();
    
    // Split the string into words
    const words = string.split(/\s+/);
    
    // Check for exact word match
    if (words.includes(word)) return [2, 0];
    
    // Check for partial word match
    for (let w of words) {
        if (w.includes(word)) return [1, w.indexOf(word)];
    }
    
    // Check for ordered character match
    let i = 0;
    let gaps = 0;
    for (let char of string) {
        if (char === word[i]) {
            i++;
            if (i === word.length) return [0, gaps];
        } else {
            gaps++;
        }
    }
    
    return [-1, Infinity]; // No match
}

function sortKeys(input, dictionary) {
    return Object.keys(dictionary).sort((a, b) => {
        const [scoreA, gapsA] = matchScore(input, a);
        const [scoreB, gapsB] = matchScore(input, b);
        
        if (scoreA !== scoreB) return scoreB - scoreA;
        if (gapsA !== gapsB) return gapsA - gapsB;
        return a.localeCompare(b);
    });
}

let currentFocus = 0;
function setupAutocomplete(inputElement) {
    inputElement.addEventListener("input", function (e) {
        closeAllLists();
        console.log("Autocomplete input event fired", this.value);
        currentFocus = 0;
        const autocompleteList = document.createElement("div");
        autocompleteList.setAttribute("id", this.id + "-autocomplete-list");
        autocompleteList.setAttribute("class", "autocomplete-items");
        autocompleteList.classList.add("spotlight-suggestion-box");
        autocompleteList.style.maxHeight = "400px";
        autocompleteList.style.overflowY = "scroll";
        this.parentNode.appendChild(autocompleteList);

        const sortedKeys = sortKeys(this.value, urlDictionary);

        let tmpIndex = 0;
        for (let key of sortedKeys) {
            const [score, _] = matchScore(this.value, key);
            if (score >= 0 || !this.value) {
                const item = document.createElement("DIV");
                item.innerHTML = key;
                item.innerHTML += "<input type='hidden' value='" + key + "'>";
                item.addEventListener("click", function (e) {
                    inputElement.value =
                        this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                item.classList.add("spotlight-suggestion-item");
                console.log("tmpIndex", tmpIndex, "currentFocus", currentFocus);
                if (tmpIndex === currentFocus) {
                    item.classList.add("spotlight-suggestion-active");
                    // item.style.background = "green";
                    console.log(item)
                }
                autocompleteList.appendChild(item);
                tmpIndex++;

                item.addEventListener("click", function (e) {
                    // const firstSuggestion =
                    // x[0].getElementsByTagName("input")[0].value;
                window.location.href = urlDictionary[key];
                });
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
            // changeFocus(x);
        } else if (e.keyCode == 38) {
            // Up arrow
            currentFocus--;
            addActive(x);
            // changeFocus(x, );
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
        console.log(currentFocus);
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add("spotlight-suggestion-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("spotlight-suggestion-active");
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
            overlay.style.display = "none";
        }
    }
});

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    .spotlight {
        list-style: none;
        font: inherit;
        font-size: 12px;
        font-style: italic;
        vertical-align: middle;
        border: 0;
        text-shadow: none;
        background: linear-gradient(0deg,#111,#000);
        border-radius: 5px;
        box-shadow: 0 1px 0 hsla(0,0%,100%,.102);
        box-sizing: border-box;
        color: #9f9f9f;
        display: inline;
        font-weight: 400;
        height: 24px;
        margin: 0;
        outline: none;
        padding: 0 25px 0 10px;
        width: 100%;
        line-height: 26px;
        padding-right: 26px;

        position: relative;
        zIndex: 1;
    }

    .spotlight-suggestion-item {
        text-shadow: 0 1px 0 #333;
        list-style: none;
        scrollbar-color: #666 #333;
        margin: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
        text-decoration: none;
        color: #ccc;
        cursor: pointer;
        display: block;
        font-size: 12px;
        line-height: 18px;
        padding: 4px 10px;
        background: #333;
    }

    .spotlight-suggestion-box {
        text-shadow: 0 1px 0 #333;
        list-style: none;
        color: #666;
        scrollbar-color: #666 #333;
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: baseline;
    }

    .spotlight-suggestion-active {
        background-color: rgba(0,0,0);
    }

    [class*="spotlight"] {
        font-size: 16px;
    }
`;

document.body.appendChild(styleSheet);

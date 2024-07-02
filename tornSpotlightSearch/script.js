// ==UserScript==
// @name         Torn Spotlight Search
// @namespace    http://tampermonkey.net/
// @version      beta-1.1
// @description  Navigate Torn Faster
// @author       Jayam Patel
// @match        https://www.torn.com/*
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornSpotlightSearch/icon.png
// @license      Apache License 2.0
// @grant        none
// ==/UserScript==


// Key Combinations
const storedSpotlightTrigger = loadSetting("spotlightTrigger", "K+Ctrl+Shift");
const [mainKey, ...modifiers] = storedSpotlightTrigger.split("+").reverse();
const pressControlKey = modifiers.includes("Ctrl");
const pressAltKey = modifiers.includes("Alt");
const pressShiftKey = modifiers.includes("Shift");

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
    const overlay = document.createElement("div");
    overlay.id = "spotlight-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.backdropFilter = "blur(5px)";
    overlay.style.WebkitBackdropFilter = "blur(5px)"; // For Safari
    overlay.style.zIndex = "9999999999999"; // One less than spotlight
    overlay.style.display = "none";
    document.body.appendChild(overlay);
    return overlay;
}

// const overlay = createOverlay();

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

function showSpotlight(dictionary, onSelect) {
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

    spotlightDiv.appendChild(spotlight);
    document.body.appendChild(spotlightDiv);

    const overlay = createOverlay();
    overlay.style.display = "block";
    overlay.style.zIndex = "99999";

    spotlight.style.visibility = "visible";
    spotlight.value = "";
    spotlight.focus();

    setupAutocomplete(spotlight, dictionary, (selectedKey) => {
        document.body.removeChild(spotlightDiv);
        overlay.style.display = "none";
        onSelect(selectedKey);
    });

    spotlight.dispatchEvent(new Event("input"));

    document.addEventListener("click", function closeSpotlight(event) {
        if (event.target.id !== "spotlight") {
            document.body.removeChild(spotlightDiv);
            overlay.style.display = "none";
            document.removeEventListener("click", closeSpotlight);
        }
    });
}

// function KeyPress(e) {
//     var evtobj = window.event ? event : e;
//     const pageBindings = loadSetting('pageBindings', {});
//     const marketSearch = loadSetting('marketSearch', 'M+Ctrl');
//     const marketSearchUrl = loadSetting('marketSearchUrl', 'https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname={q}');

//     // Check for spotlight trigger
//     if (
//         evtobj.ctrlKey == pressControlKey &&
//         evtobj.altKey == pressAltKey &&
//         evtobj.shiftKey == pressShiftKey &&
//         evtobj.key.toUpperCase() == mainKey
//     ) {
//         console.log("Spotlight activated");
//         spotlight.style.visibility = "visible";
//         spotlight.value = "";
//         overlay.style.display = "block"; // Show overlay
//         spotlight.focus();

//         setupAutocomplete(spotlight);

//         // Trigger input event to show all suggestions
//         spotlight.dispatchEvent(new Event("input"));
//     }
//     // Check for page-specific bindings
//     for (const [page, binding] of Object.entries(pageBindings)) {
//         const [pageKey, ...pageModifiers] = binding.split('+').reverse();
//         if (
//             evtobj.ctrlKey == pageModifiers.includes('Ctrl') &&
//             evtobj.altKey == pageModifiers.includes('Alt') &&
//             evtobj.shiftKey == pageModifiers.includes('Shift') &&
//             evtobj.key.toUpperCase() == pageKey
//         ) {
//             window.location.href = urlDictionary[page];
//             return;
//         }
//     }

//     // Check for market search
//     const [marketKey, ...marketModifiers] = marketSearch.split('+').reverse();
//     if (
//         evtobj.ctrlKey == marketModifiers.includes('Ctrl') &&
//         evtobj.altKey == marketModifiers.includes('Alt') &&
//         evtobj.shiftKey == marketModifiers.includes('Shift') &&
//         evtobj.key.toUpperCase() == marketKey
//     ) {
//         const query = prompt('Enter market search query:');
//         if (query) {
//             window.location.href = marketSearchUrl.replace('{q}', encodeURIComponent(query));
//         }
//     }
// }

function KeyPress(e) {
    var evtobj = window.event ? event : e;
    const pageBindings = loadSetting("pageBindings", {});
    const marketSearch = loadSetting("marketSearch", "M+Ctrl");
    const marketSearchUrl = loadSetting(
        "marketSearchUrl",
        "https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname={q}"
    );

    // Check for spotlight trigger
    if (
        evtobj.ctrlKey == pressControlKey &&
        evtobj.altKey == pressAltKey &&
        evtobj.shiftKey == pressShiftKey &&
        evtobj.key.toUpperCase() == mainKey
    ) {
        showSpotlight(urlDictionary, (selectedKey) => {
            window.location.href = urlDictionary[selectedKey];
        });
        return;
    }

    // Check for page-specific bindings
    for (const [page, binding] of Object.entries(pageBindings)) {
        const [pageKey, ...pageModifiers] = binding.split("+").reverse();
        if (
            evtobj.ctrlKey == pageModifiers.includes("Ctrl") &&
            evtobj.altKey == pageModifiers.includes("Alt") &&
            evtobj.shiftKey == pageModifiers.includes("Shift") &&
            evtobj.key.toUpperCase() == pageKey
        ) {
            window.location.href = urlDictionary[page];
            return;
        }
    }

    // Check for market search
    const [marketKey, ...marketModifiers] = marketSearch.split("+").reverse();
    if (
        evtobj.ctrlKey == marketModifiers.includes("Ctrl") &&
        evtobj.altKey == marketModifiers.includes("Alt") &&
        evtobj.shiftKey == marketModifiers.includes("Shift") &&
        evtobj.key.toUpperCase() == marketKey
    ) {
        // Use a separate dictionary for market items
        const marketItems = {
            "Item 1": "Description 1",
            "Item 2": "Description 2",
            // Add more items as needed
        };

        showSpotlight(marketItems, (selectedItem) => {
            const url = marketSearchUrl.replace(
                "{q}",
                encodeURIComponent(selectedItem)
            );
            window.location.href = url;
        });
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
function setupAutocomplete(inputElement, dictionary, onSelect) {
    let currentFocus = 0;

    inputElement.addEventListener("input", function (e) {
        closeAllLists();
        currentFocus = 0;
        const autocompleteList = document.createElement("div");
        autocompleteList.setAttribute("id", this.id + "-autocomplete-list");
        autocompleteList.setAttribute("class", "autocomplete-items");
        autocompleteList.classList.add("spotlight-suggestion-box");
        autocompleteList.style.maxHeight = "400px";
        autocompleteList.style.overflowY = "scroll";
        this.parentNode.appendChild(autocompleteList);

        const sortedKeys = sortKeys(this.value, dictionary);

        for (let i = 0; i < sortedKeys.length; i++) {
            const key = sortedKeys[i];
            const [score, _] = matchScore(this.value, key);
            if (score >= 0 || !this.value) {
                const item = document.createElement("DIV");
                item.innerHTML = key;
                if (dictionary[key]) {
                    item.innerHTML += "<br><small>" + dictionary[key] + "</small>";
                }
                item.innerHTML += "<input type='hidden' value='" + key + "'>";
                item.addEventListener("click", function (e) {
                    inputElement.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    onSelect(inputElement.value);
                });
                item.classList.add("spotlight-suggestion-item");
                if (i === currentFocus) {
                    item.classList.add("spotlight-suggestion-active");
                }
                autocompleteList.appendChild(item);
            }
        }
    });

    inputElement.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "-autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            } else {
                onSelect(this.value);
            }
        }
    });

    // inputElement.addEventListener("keydown", function (e) {
    //     let x = document.getElementById(this.id + "-autocomplete-list");
    //     if (x) x = x.getElementsByTagName("div");
    //     if (e.keyCode == 40) {
    //         // Down arrow
    //         currentFocus++;
    //         addActive(x);
    //         // changeFocus(x);
    //     } else if (e.keyCode == 38) {
    //         // Up arrow
    //         currentFocus--;
    //         addActive(x);
    //         // changeFocus(x, );
    //     } else if (e.keyCode == 13) {
    //         // Enter
    //         e.preventDefault();
    //         if (currentFocus > -1) {
    //             if (x) x[currentFocus].click();
    //         } else {
    //             // Redirect to the URL of the first suggestion
    //             const firstSuggestion =
    //                 x[0].getElementsByTagName("input")[0].value;
    //             window.location.href = urlDictionary[firstSuggestion];
    //         }
    //     }
    //     console.log(currentFocus);
    // });

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
function createSettingsPage() {
    // Remove existing content
    document.body.innerHTML = "";

    // Create settings container
    const settingsContainer = document.createElement("div");
    settingsContainer.id = "spotlight-settings";
    settingsContainer.style.padding = "20px";
    settingsContainer.style.maxWidth = "800px";
    settingsContainer.style.margin = "0 auto";

    // Add title
    const title = document.createElement("h1");
    title.textContent = "Torn Spotlight Search Settings";
    settingsContainer.appendChild(title);

    // 1. Spotlight trigger key combination
    const spotlightKeySection = createKeyBindingSection(
        "Spotlight Trigger",
        "spotlightTrigger",
        loadSetting("spotlightTrigger", "K+Ctrl+Shift")
    );

    // 2. Page-specific key bindings
    const pageBindingsSection = createPageBindingsSection();

    // 3. Market search key
    const marketSearchSection = createKeyBindingSection(
        "Market Search",
        "marketSearch",
        loadSetting("marketSearch", "M+Ctrl")
    );

    // Add market search URL input
    const marketSearchUrlInput = document.createElement("input");
    marketSearchUrlInput.type = "text";
    marketSearchUrlInput.placeholder = "Market search URL (use {q} for query)";
    marketSearchUrlInput.value = loadSetting(
        "marketSearchUrl",
        "https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname={q}"
    );
    marketSearchSection.appendChild(marketSearchUrlInput);

    // Save button
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Settings";
    saveButton.addEventListener("click", saveSettings);

    // Append all sections
    settingsContainer.appendChild(spotlightKeySection);
    settingsContainer.appendChild(pageBindingsSection);
    settingsContainer.appendChild(marketSearchSection);
    settingsContainer.appendChild(saveButton);

    // Add settings container to body
    document.body.appendChild(settingsContainer);
}

function createKeyBindingSection(label, id, defaultValue) {
    const section = document.createElement("div");
    section.style.marginBottom = "20px";

    const sectionLabel = document.createElement("h3");
    sectionLabel.textContent = label;
    section.appendChild(sectionLabel);

    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.value = defaultValue;
    input.addEventListener("keydown", captureKeyCombo);
    section.appendChild(input);

    return section;
}

function createPageBindingsSection() {
    const section = document.createElement("div");
    section.style.marginBottom = "20px";

    const sectionLabel = document.createElement("h3");
    sectionLabel.textContent = "Page-specific Key Bindings";
    section.appendChild(sectionLabel);

    const pageBindings = loadSetting("pageBindings", {});

    for (const [page, url] of Object.entries(urlDictionary)) {
        const binding = createKeyBindingSection(
            page,
            `pageBinding_${page}`,
            pageBindings[page] || ""
        );
        section.appendChild(binding);
    }

    return section;
}

function captureKeyCombo(event) {
    event.preventDefault();
    const key = event.key.toUpperCase();
    const combo = [];
    if (event.ctrlKey) combo.push("Ctrl");
    if (event.altKey) combo.push("Alt");
    if (event.shiftKey) combo.push("Shift");
    combo.push(key);
    event.target.value = combo.join("+");
}

function saveSettings() {
    const spotlightTrigger = document.getElementById("spotlightTrigger").value;
    const marketSearch = document.getElementById("marketSearch").value;
    const marketSearchUrl = document.querySelector(
        'input[placeholder="Market search URL (use {q} for query)"]'
    ).value;

    const pageBindings = {};
    for (const page of Object.keys(urlDictionary)) {
        const binding = document.getElementById(`pageBinding_${page}`).value;
        if (binding) {
            pageBindings[page] = binding;
        }
    }

    saveSetting("spotlightTrigger", spotlightTrigger);
    saveSetting("marketSearch", marketSearch);
    saveSetting("marketSearchUrl", marketSearchUrl);
    saveSetting("pageBindings", pageBindings);

    alert("Settings saved successfully!");
}

function loadSetting(key, defaultValue) {
    const value = localStorage.getItem(`spotlightSearch_${key}`);
    return value !== null ? JSON.parse(value) : defaultValue;
}

function saveSetting(key, value) {
    localStorage.setItem(`spotlightSearch_${key}`, JSON.stringify(value));
}


// Add this near the top of your script
if (window.location.pathname === "/spotlight-settings.php") {
    createSettingsPage();
    return;
}
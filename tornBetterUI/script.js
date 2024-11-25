// ==UserScript==
// @name         Torn Better UI
// @namespace    http://tampermonkey.net/
// @version      alpha-0.1
// @description  Make Torn Beautiful
// @author       Jayam Patel
// @match        https://www.torn.com/*
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornBetterUI/icon.png
// @license      Apache License 2.0
// @grant        none
// @require      https://update.greasyfork.org/scripts/501645/1416051/Torn%20UI%20Elements%20%28for%20Developers%29.js
// @require      https://update.greasyfork.org/scripts/501648/1416074/Constants%20for%20Torn%20Scripts%20%28for%20Developers%29.js
// ==/UserScript==

function realignTornUI() {
  const mainContainer = document.getElementById("mainContainer");
  mainContainer.style.marginLeft = "20px";
}

function updateFont() {
  const mainContainer = document.getElementById("mainContainer");
  mainContainer.style.fontFamily = "Monaco, monospace";
}

function main() {
  realignTornUI();
  updateFont();
}

document.addEventListener("DOMContentLoaded", main);

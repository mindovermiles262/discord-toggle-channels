// ==UserScript==
// @name         Discord Toggle Channels Bar
// @namespace    https://discordapp.com
// @version      1.0.2
// @description  Adds show/hide channels sidebar button to Discord Web App
// @author       Andy D
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set Variables. Classes must be at position [0]
    const toggleButtonText = "<< Toggle Channels >>";
    const toggleButtonParentClass = "scroller-2FKFPG";
    const channelsBarClass = "channels-Ie2l6A";
    const channelNameClass = "channelName-3stJzi"

    // Listen until scroller sidebar is loaded, then add "Toggle Channels" button to sidebar
    let scrollerInterval = setInterval(function() {
        if (document.getElementsByClassName(toggleButtonParentClass).length > 0) {
            let newBtn = document.createElement("p");
            newBtn.setAttribute("id", "toggleChannelsBtn");
            newBtn.innerText = toggleButtonText;
            newBtn.style.color = "white";
            document.getElementsByClassName(toggleButtonParentClass)[0].appendChild(newBtn);
            clearInterval(scrollerInterval);
        }
    }, 1000)

    // Checks for #toggleChannelsBtn every second, then call triggerListeners() function.
    let channelsBtnInterval = setInterval(function(){
        if (document.getElementById("toggleChannelsBtn").innerText.length > 0) {
            triggerListeners();
            clearInterval(channelsBtnInterval);
        }
    }, 1000)

    // Adds listener to #toggleChannelsBtn, then calls toggleVisibility() when clicked
    let triggerListeners = function() {
        document.getElementsByClassName(channelNameClass)[0].addEventListener('click', function() {
            toggleVisibility();
        });

        document.getElementById("toggleChannelsBtn").addEventListener('click', function() {
            toggleVisibility();
        });
    }

    let toggleVisibility = function() {
        let channelsBar = document.getElementsByClassName(channelsBarClass)[0];
        if (channelsBar.style.display == "none") {
            channelsBar.style.display = "";
        } else {
            channelsBar.style.display = "none";
        }
    }
})();

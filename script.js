// ==UserScript==
// @name         Discord Toggle Channels Bar
// @namespace    https://discordapp.com
// @version      1.3.0
// @description  Adds show/hide channels sidebar button to Discord Web App
// @author       Andy D
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const elements = ["toggleChannelsBtn", "channelName-3stJzi"];
    const channelsBar = "channels-Ie2l6A"
    const showHideSidebarButtonParentClass = "scroller-2FKFPG";
    const roomDivClass = "containerDefault-1ZnADq";
    const unreadClass = "unread-1Dp-OI"

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function pageload() {
        await sleep(5000);
        main()
    }

    const toggleVisibility = function() {
        let sidebar = document.getElementsByClassName(channelsBar)[0];
        if (sidebar.style.display == "none") {
            sidebar.style.display = "";
        } else {
            sidebar.style.display = "none";
        }
    }

    let cheveronDirection = function() {
        const sidebar = document.getElementsByClassName(channelsBar)[0]
        const btn = document.getElementById("toggleChannelsBtn")
        if (sidebar.style.display == "none") {
            btn.innerText = "Show >>";
        } else {
            btn.innerText = "<< Hide";
        }
    }

    const createSidebarButton = function() {
        let btn = document.createElement("p");
        btn.setAttribute("class", "toggleChannelsBtn");
        btn.setAttribute("id", "toggleChannelsBtn");
        btn.innerText = "<< Hide";
        btn.style.color = "white";
        btn.style.textAlign = "center";
        return btn
    }

    const addListenersToElements = function() {
        elements.forEach(function(elem) {
            document.getElementsByClassName(elem)[0].addEventListener('click', function() {
                toggleVisibility();
                cheveronDirection();
            })
        });
    }

    const autohideSidebar = function() {
        const roomDivs = document.getElementsByClassName(roomDivClass)
        Array.from(roomDivs).forEach(function(room) {
            room.addEventListener('click', function() {
                toggleVisibility();
                cheveronDirection();
            })
        })
    }

    const colorizeButtonIfUnread = function() {
        const btn = document.getElementById("toggleChannelsBtn");
        const interval = setInterval(function() {
            const unreads = document.getElementsByClassName(unreadClass).length
            if (unreads > 0) {
                btn.style.color = "red";
            } else {
                btn.style.color = "white";
            }
        }, 1000)
    }

    const main = function() {
        const newBtn = createSidebarButton()
        document.getElementsByClassName(showHideSidebarButtonParentClass)[0].appendChild(newBtn)
        addListenersToElements();
        autohideSidebar();
        colorizeButtonIfUnread();
    }

    pageload();
})();

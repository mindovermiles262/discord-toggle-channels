// ==UserScript==
// @name         Discord Toggle Channels Bar
// @namespace    https://discordapp.com
// @version      1.8.0
// @description  Adds show/hide channels sidebar button to Discord Web App
// @author       Github mindovermiles262
// @match        https://discord.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Classes of DIVs you want to be able to toggle sidebar 
    const toggleButtons = [
        "scroller-2TZvBN",
    ]; 
    const columnToHide = "sidebar-2K8pFh"
    const showHideSidebarButtonParentClass = "scroller-2TZvBN";
    const roomDivClass = "containerDefault-1ZnADq";
    const unreadClass = "unread-3zKkbm";
    const channelsId = "channels";
    const channelsWidth = "265px";

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function pageload() {
        await sleep(5000);
        main()
    }

    const toggleVisibility = function() {
        let sidebar = document.getElementsByClassName(columnToHide)[0];
        if (sidebar.style.width == "1px") {
            sidebar.style.width = "auto";
        } else {
            sidebar.style.width = "1px";
        }
    }

    let cheveronDirection = function() {
        const sidebar = document.getElementsByClassName(columnToHide)[0]
        const btn = document.getElementById("toggleChannelsBtn")
        if (sidebar.style.width == "1px") {
            btn.innerText = "> > >";
        } else {
            btn.innerText = "< < <";
        }
    }

    const createSidebarButton = function() {
        let btn = document.createElement("p");
        btn.setAttribute("class", "toggleChannelsBtn");
        btn.setAttribute("id", "toggleChannelsBtn");
        btn.innerText = "< < <";
        btn.style.color = "#43b581"; // Discord Green
        btn.style.width = "70px" // Buttonbar width
        btn.style.textAlign = "center";
        btn.style.position = "absolute"
        btn.style.bottom = "25px"
        return btn
    }

    const addListenersToToggleButtons = function() {
        toggleButtons.forEach(function(elem) {
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
                btn.style.color = "#f04747"; // Discord Red
            } else {
                btn.style.color = "#43b581"; // Discord Green
            }
        }, 1000)
    }

    const strictChannelsWidth = function() {
      // Sets the width of the channels bar to `channelsWidth`
      // Fixes bug where channels bar would change width based on if an
      //   overflowing channel name pushed the channel bar to the right.
      const channelsDiv = document.getElementById(channelsId);
      channelsDiv.style.width = channelsWidth;
    }

    const main = function() {
        console.log("[*] Loading Discord Toggle Channenels Bar Userscript");
        const newBtn = createSidebarButton()
        document.getElementsByClassName(showHideSidebarButtonParentClass)[0].appendChild(newBtn)
        addListenersToToggleButtons();
        autohideSidebar();
        strictChannelsWidth();
        colorizeButtonIfUnread();
    }

    pageload();
})();

const list = document.getElementById("list")
const openAllBtn = document.getElementById("openAllBtn")
const closeAllBtn = document.getElementById("closeAllBtn")
const nightModeBtn = document.getElementById("nightModeBtn")
const body = document.getElementById("body")
const btn = document.getElementById("buttons")
const para1 = document.getElementById("para1")
const para2 = document.getElementById("para2")
const title = document.getElementById("title")
list.className = 'day-mode';
title.className = 'day-mode';
title.classList.add("p")
para1.className = 'day-mode';
para1.classList.add("p")
para2.className = 'day-mode';
para2.classList.add("p")
var night = false

renderTabList()
function renderTabList() {
    chrome.storage.sync.get("tabs", ({tabs}) => {
        console.log("tab list", tabs)
        list.innerHTML = ""
        if (tabs) {
            let htmlStr = ""
            for (let i=0; i<tabs.length; i++) {
                htmlStr += "<div><p>" + (i+1) + 
                ". <a target='_blank' href='" + 
                tabs[i].url + "'>" + tabs[i].title + 
                "</a><span class='delete-btn' id='delete_" + i + "'>Delete</span></span></a></p></div>"
            }
            list.innerHTML = htmlStr
            for (let i=0; i<tabs.length; i++) {
                const delBtn = document.getElementById("delete_" + i)
                if (delBtn) {
                    delBtn.addEventListener("click", function() {
                        tabs.splice(i, 1)
                        chrome.storage.sync.set({"tabs": tabs});
                        renderTabList()
                    })
                }
            }
        }
    });
}

openAllBtn.addEventListener("click", function() {
    chrome.storage.sync.get("tabs", ({tabs}) => {
        if (tabs) {
            for (let i=0; i<tabs.length; i++) {
                window.open(tabs[i].url);
            }
        }
    });
})

closeAllBtn.addEventListener("click", function() {
    const status = confirm("Confirm to delete all?");
    if (status === true) {
        chrome.storage.sync.set({ "tabs": [] });
        window.location.reload();
    }
})

nightModeBtn.addEventListener("click", function() {
    changeMode();
})

function changeMode() {
    if (night === false) {
        list.style="color:#FFFFFF"
        list.classList.remove("day-mode")
        list.classList.add("dark-mode")
        title.classList.remove("day-mode")
        title.classList.add("dark-mode")
        para1.classList.remove("day-mode")
        para1.classList.add("dark-mode")
        para2.classList.remove("day-mode")
        para2.classList.add("dark-mode")
        body.style="background-color:#363636"
        btn.style = "color: #FFFFFF"
        night = true
         
    } else {
        list.style="color: #000000"
        body.style="background-color: #FFFFFF"
        btn.style = "color: #000000"
        list.classList.add("day-mode")
        list.classList.remove("dark-mode")
        title.classList.add("day-mode")
        title.classList.remove("dark-mode")
        para1.classList.add("day-mode")
        para1.classList.remove("dark-mode")
        para2.classList.add("day-mode")
        para2.classList.remove("dark-mode")
        night = false
    }
}
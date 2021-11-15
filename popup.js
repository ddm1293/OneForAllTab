const addBtn = document.getElementById("addBtn")
const viewBtn = document.getElementById("viewBtn")
const addAll = document.getElementById("addAll")
let isAdding = false; 
let isAddingAll = false;
/**
 * If the present tab is alrealy in the OFA Tab,
 * then don't show the "Add into" button
 */
chrome.tabs.getSelected(null, function(tab) {
  chrome.storage.sync.get("tabs", ({tabs}) => {
    console.log("get tabs", tabs)
    if (tabs) {
      for (let i=0; i<tabs.length; i++) {
        if (tabs[i].url === tab.url) {
          addBtn.style.display = "none"
        }
      }
    }
  });
});

addBtn.addEventListener("click", async() => {
  if (isAdding) return;
  isAdding = true
  chrome.tabs.getSelected(null, function(tab) {
    chrome.storage.sync.get("tabs", ({tabs}) => {
      console.log("get tabs", tabs)
      if (tabs) {
        const tabList = [...tabs]
        tabList.unshift({
          url: tab.url,
          title: tab.title
        })
        chrome.storage.sync.set({"tabs": tabList});
      } else {
        chrome.storage.sync.set({"tabs": [tab]});
      }
      addBtn.innerText = "Succesfully Added√"
      isAdding = false
      setTimeout(() => {addBtn.style.display = "none"}, 1500)
    });
  });
});

viewBtn.addEventListener("click", async() => {
  window.open(chrome.extension.getURL('list.html'));
});

addAll.addEventListener("click", async() => {
  if (isAddingAll) return;
  isAddingAll = true
  chrome.storage.sync.get("tabs", ({tabs}) => {
    console.log("get tabs", tabs)
    let tabList = []
    if (tabs) {
      tabList = [...tabs]
    }
    chrome.windows.getAll({populate: true}, function (windows) {
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          tabList.unshift({
            url: tab.url,
            title: tab.title
          });
        });
      });
      chrome.storage.sync.set({"tabs": tabList});
      isAddingAll = false
      addAll.innerText = "Succesfully Added√"
      setTimeout(() => {addAll.innerText = "All all Existing Tab"}, 5000)
    });
  });
});
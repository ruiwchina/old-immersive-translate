if (typeof browser !== 'undefined') {
    chrome = browser
}

const btnClose = document.getElementById("btnClose")
const lblQuestion = document.getElementById("lblQuestion")
const lblAlwaysTranslate = document.getElementById("lblAlwaysTranslate")
const cbAlwaysTranslate = document.getElementById("cbAlwaysTranslate")
const btnTranslate = document.getElementById("btnTranslate")
const btnRestore = document.getElementById("btnRestore")
const btnOpenOnGoogleTranslate = document.getElementById("btnOpenOnGoogleTranslate")

chrome.tabs.query({ currentWindow: true, active: true}, tabs => {
    btnOpenOnGoogleTranslate.setAttribute("href", "https://translate.google.com/translate?u=" + tabs[0].url)
})

lblQuestion.textContent = chrome.i18n.getMessage("lblQuestion")
lblAlwaysTranslate.textContent = chrome.i18n.getMessage("lblAlwaysTranslate")
btnTranslate.textContent = chrome.i18n.getMessage("btnTranslate")
btnRestore.textContent = chrome.i18n.getMessage("btnRestore")

if (localStorage.getItem("alwaysTranslate") == "true") {
    cbAlwaysTranslate.checked = true
}

btnClose.addEventListener("click", () => {
    window.close()
})

btnTranslate.addEventListener("click", () => {
    localStorage.setItem("alwaysTranslate", cbAlwaysTranslate.checked ? "true" : "false")
    chrome.runtime.sendMessage({name: "alwaysTranslate", value: cbAlwaysTranslate.checked})

    chrome.tabs.query({ currentWindow: true, active: true}, tabs => {
        chrome.tabs.executeScript(tabs[0].id, { file: "/scripts/injectTranslate.js" })
        chrome.tabs.executeScript(tabs[0].id, { file: "/scripts/translate.js" })
    })
})

btnRestore.addEventListener("click", () => {
    localStorage.setItem("alwaysTranslate", cbAlwaysTranslate.checked ? "true" : "false")
    chrome.runtime.sendMessage({name: "alwaysTranslate", value: cbAlwaysTranslate.checked})
    
    chrome.tabs.query({ currentWindow: true, active: true}, tabs => {
        chrome.tabs.executeScript(tabs[0].id, { file: "/scripts/restore.js" })
    })
})

cbAlwaysTranslate.addEventListener("change", () => {
    if (!cbAlwaysTranslate.checked) {
        localStorage.setItem("alwaysTranslate", "false")
        chrome.runtime.sendMessage({name: "alwaysTranslate", value: false})
    }
})
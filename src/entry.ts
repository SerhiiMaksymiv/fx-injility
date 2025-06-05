import browser from 'webextension-polyfill';
import { removeInncode } from './remove_inncode.js';

function getByText(text: string) {
  var listItems = document.getElementsByTagName("li");
  for (var i = 0; i < listItems.length; i++) {
      if (listItems[i].textContent == text) {
          return listItems[i];
      }
  }
}

const btn = getByText("Remove Inncode");
if (btn) {
  btn.addEventListener("click", () => {
    browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
      .then(tabs => { 
        if (tabs.length == 0) {
          return;
        }
        if (tabs[0].id == undefined) {
          return
        }
        return browser.tabs.get(tabs[0].id)
      })
      .then(tab => {
        if (tab && tab.id) {
          browser.scripting.executeScript({
            func: removeInncode,
            target: { tabId: tab.id }
          });
        }
      });

  });
}

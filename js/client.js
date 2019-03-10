"use strict";

const ClientManager = {};

ClientManager.list = [
  "files.md"
];

ClientManager.init = (element) => {
  if(ClientManager.list.length === 0){
    element.parentNode.removeChild(element);
    return;
  }
  ClientManager.list.forEach((elt) => {
    element.innerHTML += `<li class="collection-item" src="${elt}" onclick="ClientManager.goToSource(this)" href="#"><b>${elt}</b></li>`;
  });
};

ClientManager.goToSource = (element) => {
  let src = element.getAttribute("src");
  if(!src){
    return;
  }
  let arrayFolders = location.href.split("/");
  ClientManager.tryToChangeURL(`${location.href.replace("/" + arrayFolders[arrayFolders.length - 1],"")}/clients/${src}`);
};

ClientManager.tryToChangeURL = (url) => {

  if(url.includes("file://")){
    return;
  }

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
      if(xhr.readyState == 4 && xhr.status == 200) {
          window.location.href = url;
      }
  };

  xhr.open('head',url);
  xhr.send(null);
};

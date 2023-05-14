import { setupTimer } from "./src/timer.settings.js"
import { manageTimer } from "./src/timer.settings.js"
import { startTimer } from "./src/timer.js"
import OBR from "@owlbear-rodeo/sdk";


const urlRoutes = {
  "/": {
    template: "templates/main.html",
    script: function () {
      setupTimer();
    }

  },
  "/timer": {
    template: "templates/timer.html",
    script: function () {
      startTimer();
    }
  }
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }

  const route = urlRoutes[location] || urlRoutes["/"];

  const html = await fetch(route.template).then((response) =>
    response.text());

  document.getElementById("app").innerHTML = html;
  route.script();
};

urlLocationHandler();

OBR.onReady(async () => {
  OBR.room.onMetadataChange(async (metadata) => {
    manageTimer(metadata);
  })
})

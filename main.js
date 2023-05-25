import { setupTimer } from "./src/timer.settings.js"
import { manageTimer } from "./src/timer.settings.js"
import { startTimer } from "./src/timer.js"
import OBR from "@owlbear-rodeo/sdk";

const urlRoutes = {
  "/": {
    template: {
      "GM": "templates/gm.html",
      "PLAYER": "templates/player.html",
    },
    script: function (role) {
      if (role == "PLAYER") { return; }
      setupTimer();
    }

  },
  "/timer": {
    template: {
      "GM": "templates/timer.html",
      "PLAYER": "templates/timer.html",
    },
    script: function (role) {
      startTimer();
    }
  }
};

const urlLocationHandler = async () => {
  // OBR role (GM or PLAYER)
  const role = await OBR.player.getRole();
  // Current location
  let location = window.location.pathname;
  // Set location to "/" if it's not set
  if (location.length == 0) {
    location = "/";
  }

  // If there is no given location in urlRoutes set it to "/"
  const route = urlRoutes[location] || urlRoutes["/"];

  // Get needed html template
  const html = await fetch(route.template[`${role}`]).then((response) =>
    response.text());

  // Set html template
  document.getElementById("app").innerHTML = html;
  // Execute script for a current location
  route.script(role);
};

let prevState = false
OBR.onReady(async () => {
  // Routes happen only if Owlbear Ready
  // Otherwise we didn't get Role
  urlLocationHandler();

  // Function will be executed any time room metadata changes
  OBR.room.onMetadataChange(async (metadata) => {
    manageTimer(metadata, prevState);
  })
})

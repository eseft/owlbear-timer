import OBR from "@owlbear-rodeo/sdk";
import { ID } from "./timer.settings.js"


export async function startTimer () {
  // Owlbear data
  let metadata = await OBR.room.getMetadata();
  const role = await OBR.player.getRole()
  // Animation parameters
  let currentPercent = 100;
  let element = document.querySelector(".progress_fill");
  const interval = 10;
  const setTime = metadata[`${ID}/metadata`].setTime;
  const step = ((currentPercent * interval) / (setTime * 1000));

  // A function that will set timerActive metadata to false
  // This will trigger modal to close
  const closeTimer = (currentMetadata) => {
    currentMetadata[`${ID}/metadata`].timerActive = false;
    // Play ding sound on modal close
    let ding = new Audio("/ding.mp3");
    ding.play();
    OBR.room.setMetadata(currentMetadata)
  }

  // Not sure about that.
  // Stupid attempt to sync timers across all players
  // Seems to work better than ask each player to send metadata when it ready
  if (role == "GM") {
    await new Promise(r => setTimeout(r, 800));
  }

  // Simple JS animation for progress bar
  let id = setInterval(animateTimer, interval);
  function animateTimer () {
    if ( currentPercent <= 0 ) {
      clearInterval(id);
      element.style.width = "0%";
      currentPercent = 100;
      closeTimer(metadata)
    } else {
      currentPercent -= step;
      element.style.width = currentPercent + "%";
    }
  }
}

import OBR from "@owlbear-rodeo/sdk";

export const ID = "org.eseft.owlbear-timer"

function getTimeValue(inputName) {
  const timeValue = document.querySelector(`input[name="${inputName}"]:checked`).value;
  return parseInt(timeValue, 10);
}

function setupModal(elementButton) {
  async function setClickEvent() {
    let metadataField = {
      timerActive: true,
      setTime: getTimeValue("time"),
    };
    // Get current User role
    const role = await OBR.player.getRole();
    if (role == "GM") {

      // Get current room metadata
      let metadata = await OBR.room.getMetadata();
      metadata[`${ID}/metadata`] = metadataField;

      // Send metadata back to owlbear room
      await OBR.room.setMetadata(metadata);
    };
  };
  elementButton.addEventListener("click", setClickEvent);
}

export function setupTimer () {
  setupModal(document.getElementById("modal"));
};

export function manageTimer (metadata, prevState) {
    const timerActive = metadata[`${ID}/metadata`].timerActive
    if (timerActive && !prevState) {
      prevState = true
      // Owlbear call to open model
      OBR.modal.open({
        id: `${ID}/timer`,
        url: "/timer",
        height: 120,
        width: 320,
        disablePointerEvents: true,
      })
    } else if (!timerActive && prevState) { // TODO(Issue #4 is here)
      prevState = false
      // Play ding sound on modal close
      let ding = new Audio("/ding.mp3");
      ding.play();
      OBR.modal.close(`${ID}/timer`);
    }
}

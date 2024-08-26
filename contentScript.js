// Function to get the SteamID64 by searching the page for the InitializeCommentThread function
function getSteamID64() {
  // Search the page for the InitializeCommentThread script block
  const scripts = document.getElementsByTagName('script');
  for (let script of scripts) {
    const scriptContent = script.innerHTML;
    
    // Check if the script contains the InitializeCommentThread function call
    if (scriptContent.includes('InitializeCommentThread')) {
      // Extract the SteamID64 from the script content using a regular expression
      const match = scriptContent.match(/"owner":"(\d+)"/); //owner of thread is owner of profile
      if (match && match[1]) {
        return match[1]; // Return the SteamID64 if found
      }
    }
  }

  return null; // Return null if SteamID64 is not found (shouldnt happen!!)
}

// Function to create and append the RGL link button
function appendRGLButton(steamID64) {
  const rglLink = `https://rgl.gg/Public/PlayerProfile.aspx?p=${steamID64}`;

  // Find the element to which we'll append the new button
  const profileHeader = document.querySelector(".profile_header_content");

  if (profileHeader) {
    // Create the new button element
    const buttonElement = document.createElement("a");
    buttonElement.href = rglLink;
    buttonElement.target = "_blank"; // Open the link in a new tab
    buttonElement.classList.add("btn_green_white_innerfade", "btn_medium", "rgl-button"); // Same styling as the existing button

    // Create the span element inside the button (for button text)
    const spanElement = document.createElement("span");
    spanElement.textContent = "RGL";

    // Append the span to the button
    buttonElement.appendChild(spanElement);

    // Append the new button to the profile header
    profileHeader.appendChild(buttonElement);
  }
}


// Execute the script
const steamID64 = getSteamID64();
if (steamID64) {
  appendRGLButton(steamID64);
}

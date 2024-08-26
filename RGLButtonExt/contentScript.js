// Function to get the SteamID64 by searching the page
function getSteamID64() {
  // Try to find the SteamID64 from the ReportProfile function (for other profiles)
  const anchors = document.getElementsByTagName('a');
  for (let anchor of anchors) {
    if (anchor.getAttribute('onclick') && anchor.getAttribute('onclick').includes('ReportProfile')) {
      const match = anchor.getAttribute('onclick').match(/ReportProfile\(\s*'(\d+)'\s*\)/);
      if (match && match[1]) {
        return match[1];
      }
    }
  }
  // If not found, check for the SteamID64 in the profile link (for own profile)
  for (let anchor of anchors) {
    const href = anchor.getAttribute('href');
    if (href && href.includes('/profiles/')) {
      const match = href.match(/\/profiles\/(\d+)\//);
      if (match && match[1]) {
        return match[1];
      }
    }
  }
  return null; // Return null if SteamID64 is not found (shouldn't happen)
}

// Function to create and append the RGL link button
function appendRGLButton(steamID64) {
  const rglLink = `https://rgl.gg/Public/PlayerProfile.aspx?p=${steamID64}`;

  // Find the element to which we'll append the new button
  const profileHeader = document.querySelector(".profile_header_content");

  if (profileHeader) {
    //Create button
    const buttonElement = document.createElement("a");
    buttonElement.href = rglLink;
    buttonElement.target = "_blank";
    buttonElement.classList.add("btn_green_white_innerfade", "btn_medium", "rgl-button"); 
    const spanElement = document.createElement("span");
    spanElement.textContent = "RGL";
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

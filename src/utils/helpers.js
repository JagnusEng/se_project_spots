export function setButtontext(btn, isLoading, defaultText = "Save", loadingText = "Saving...") {
    if (isLoading) {
      btn.textContent = loadingText; // Set loading text
    } else {
      btn.textContent = defaultText; // Set default text
    }
  }
  
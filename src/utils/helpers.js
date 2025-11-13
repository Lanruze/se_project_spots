export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
   if (isLoading) {
    console.log(`Setting text to ${loadingText}`);
    btn.textContent = loadingText;
    btn.disabled = true;
  } else {
    console.log(`Setting text to ${defaultText}`);
    btn.textContent = defaultText;
    btn.disabled = false;
  }
}
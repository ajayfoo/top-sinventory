const imagePreview = document.getElementById("image_input_preview");
const fileInput = document.getElementById("image_file");
const openFileBrowserBtn = document.getElementById("open_file_browser");
const fileReader = new FileReader();

fileReader.addEventListener(
  "load",
  () => {
    imagePreview.src = fileReader.result;
  },
  false
);

openFileBrowserBtn.addEventListener("click", () => {
  fileInput.click();
});
fileInput.addEventListener("change", () => {
  if (!fileInput.files[0]) return;
  fileReader.readAsDataURL(fileInput.files[0]);
});

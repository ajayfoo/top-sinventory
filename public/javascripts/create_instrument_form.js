const imagePreview = document.getElementById("image_input_preview");
const imageUrlHiddenField = document.getElementById("image_url");
const imageInput = document.getElementById("image_file");
const openFileBrowserBtn = document.getElementById("open_file_browser");
const resetImage = document.getElementById("reset_image");
const fileReader = new FileReader();
const form = document.querySelector("form");

fileReader.addEventListener(
  "load",
  () => {
    imagePreview.src = fileReader.result;
  },
  false
);

openFileBrowserBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  if (!imageInput.files[0]) return;
  fileReader.readAsDataURL(imageInput.files[0]);
});

resetImage.addEventListener("click", () => {
  imageInput.value = null;
  imagePreview.src = imageUrlHiddenField.value;
});

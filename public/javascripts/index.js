const updateCategoryButton = document.querySelector(
  'button[formaction="/category/create"]'
);

const categoryCheckboxes = document.querySelectorAll(
  'input[name="selected_categories"]'
);

const selectCategoryDialog = document.getElementById(
  "select-category-instruction"
);

const atLeastOneCategoryIsChecked = () => {
  for (const checkbox of categoryCheckboxes) {
    if (checkbox.checked) return true;
  }
  return false;
};

const selectCategoryForm = document.getElementById("select-category-form");
selectCategoryForm.addEventListener("submit", (e) => {
  if (atLeastOneCategoryIsChecked()) return;
  e.preventDefault();
  selectCategoryDialog.showModal();
});

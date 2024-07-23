const logoutButton = document.querySelector(".logout-button");
const logoutModal = document.getElementById("confirm-logout");

logoutButton.addEventListener("click", () => {
  logoutModal.showModal();
});

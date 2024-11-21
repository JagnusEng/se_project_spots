import "../vendor/normalize.css";
import "../pages/index.css";
import Api from "../utils/API.js";
import { seButtonText, setButtontext } from "../utils/helpers.js";

import { enableValidation, settings, resetValidation } from "./validation.js";
enableValidation(settings);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e775eb01-ae86-4e68-acff-d832598a5ddf",
    "Content-Type": "application/json",
  },
});

const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const profileAvatar = document.querySelector(".profile__avatar");

const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editModalClosedBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["new-post"];
const cardSubmitBtn = cardModal.querySelector(".modal__button");
const cardModalClosedBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

//AVATAR form element
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__button");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

let selectedCard;
let selectedCardID;

//Deete form elements
const deleteModal = document.querySelector("#delete-modal");
const cancelDeleteBtn = deleteModal.querySelector(
  ".modal__submit-btn[type='button']"
);
const deleteForm = deleteModal.querySelector(".modal__form");

const allModals = document.querySelectorAll(".modal");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const deleteIcon = document.querySelector(".close_delete-icon");

//TODO -Destructure the secon item in the callback of the ,then()
api
  .getAppInfo()
  .then(([user, cards]) => {
    console.log(cards);
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;

    cards.forEach((card) => {
      const cardEl = getCardElement(card);
      cardsList.append(cardEl);
    });
  })
  .catch((err) => console.error(`Error loading data: ${err}`));

function handleLike(evt, id) {
  api
    .changeLikeStatus(id, isLiked)
    .then((data) => {
      evt.target.classList.toggle("card__like-btn_liked", data.isLiked);
    })
    .catch((err) => console.error(`Error updating like status: ${err}`));
}

//TODO - if the card is liked, set the active class on the card

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__trash-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;

    openModal(previewModal);
  });

  cardLikeBtn.addEventListener("click", (evt) => {
    api
      .changeLikeStatus(data._id, data.isLiked)
      .then((updatedCard) => {
        console.log(updatedCard);
        evt.target.classList.toggle("card__like-btn_liked");
      })
      .catch((err) => console.error(`Error updating like status: ${err}`));
  });

  cardDeleteBtn.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardID = data._id;
    openModal(deleteModal);
  });

  return cardElement;
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function openModal(modal) {
  if (!modal.classList.contains("modal_opened")) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtontext(submitBtn, true, "Save", "Saving...");

  // Call API to update user info
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    })
    .finally(() => {
      setButtontext(submitBtn, false, "Save", "Saving...");
    });
}

//TODO - implement loading text for all other form submissions

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  setButtontext(submitBtn, true, "Save", "Saving...");

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  api
    .addCard(cardData)
    .then((newCard) => {
      cardsList.prepend(getCardElement(newCard)); // Prepend new card
      cardForm.reset(); // Reset form
      resetValidation(cardForm, settings); // Reset validation
      closeModal(cardModal); // Close modal
    })
    .catch((err) => console.error(`Error adding card: ${err}`))
    .finally(() => setButtontext(submitBtn, false, "Save", "Saving...")); // Reset button text
}

function handleDeleteCard(cardElement, cardID) {
  selectedCard = cardElement;
  selectedCardID = cardID;
  openModal(deleteModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, settings);
  openModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

editModalClosedBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalClosedBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

//TODO - select avatrar modal button at the top of the page
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

cancelDeleteBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteIcon.addEventListener("click", () => {
  closeModal(deleteModal);
});

// deleteForm.addEventListener("submit", handleDeleteSubmit);
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  // Changes: Update button text during loading
  setButtontext(submitBtn, true, "Delete", "Deleting...");

  // Changes: API call to delete card
  api
    .deleteCard(selectedCardID)
    .then(() => {
      selectedCard.remove(); // Remove card from DOM
      closeModal(deleteModal); // Close modal
    })
    .catch((err) => console.error(`Error deleting card: ${err}`))
    .finally(() => setButtontext(submitBtn, false, "Delete", "Deleting...")); // Reset button text
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

allModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});

//TOTO - Finish avatar submission handler
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;

  // Changes: Update button text during loading
  setButtontext(submitBtn, true, "Save", "Saving...");

  // Changes: API call to update avatar
  api
    .editAvatarInfo(avatarInput.value)
    .then((updatedUser) => {
      profileAvatar.src = updatedUser.avatar; // Update avatar in DOM
      closeModal(avatarModal); // Close modal
    })
    .catch((err) => console.error(`Error updating avatar: ${err}`))
    .finally(() => setButtontext(submitBtn, false, "Save", "Saving...")); // Reset button text
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

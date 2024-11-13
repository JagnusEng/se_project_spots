(()=>{"use strict";var e,t={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-btn",inactiveButtonClass:"modal__submit-btn_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error"},n=function(e,t,n){var o=e.querySelector("#".concat(t.id,"-error"));o.textContent="",t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass)},o=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):r(t,n)},r=function(e,t){e&&(e.disabled=!0,e.classList.add(t.inactiveButtonClass))},a=function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),a=e.querySelector(t.submitButtonSelector);o.forEach((function(o){n(e,o,t)})),r(a,t)};e=t,document.querySelectorAll(e.formSelector).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),a=e.querySelector(t.submitButtonSelector);o(r,a,t),r.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,o){t.validity.valid?n(e,t,o):function(e,t,n,o){var r=e.querySelector("#".concat(t.id,"-error"));r.textContent=n,t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass)}(e,t,t.validationMessage,o)}(e,c,t),o(r,a,t)}))}))}(t,e)}));var c=document.querySelector(".profile__edit-btn"),i=document.querySelector(".profile__add-btn"),l=document.querySelector(".profile__name"),s=document.querySelector(".profile__description"),u=document.querySelector("#edit-modal"),d=document.forms["edit-profile"],m=u.querySelector(".modal__close-btn"),p=u.querySelector("#profile-name-input"),f=u.querySelector("#profile-description-input"),_=document.querySelector("#add-card-modal"),v=document.forms["new-post"],y=(_.querySelector(".modal__button"),_.querySelector(".modal__close-btn")),S=_.querySelector("#add-card-name-input"),q=_.querySelector("#add-card-link-input"),b=document.querySelector("#preview-modal"),h=b.querySelector(".modal__image"),g=b.querySelector(".modal__caption"),k=b.querySelector(".modal__close-btn"),L=document.querySelectorAll(".modal"),w=document.querySelector("#card-template"),E=document.querySelector(".cards__list");function C(e){var t=w.content.querySelector(".card").cloneNode(!0),n=t.querySelector(".card__title"),o=t.querySelector(".card__like-btn"),r=t.querySelector(".card__trash-btn"),a=t.querySelector(".card__image");return n.textContent=e.name,a.src=e.link,a.alt=e.name,o.addEventListener("click",(function(){o.classList.toggle("card__like-btn_liked")})),r.addEventListener("click",(function(){t.remove()})),a.addEventListener("click",(function(){g.textContent=e.name,h.src=e.link,h.alt=e.name,z(b)})),t}function x(e){if("Escape"===e.key){var t=document.querySelector(".modal_opened");t&&A(t)}}function z(e){e.classList.contains("modal_opened")||(e.classList.add("modal_opened"),document.addEventListener("keydown",x))}function A(e){e.classList.remove("modal_opened"),document.removeEventListener("keydown",x)}c.addEventListener("click",(function(){p.value=l.textContent,f.value=s.textContent,a(d,t),z(u)})),i.addEventListener("click",(function(){z(_)})),m.addEventListener("click",(function(){A(u)})),y.addEventListener("click",(function(){A(_)})),k.addEventListener("click",(function(){A(b)})),L.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("modal_opened")&&A(e)}))})),d.addEventListener("submit",(function(e){e.preventDefault(),l.textContent=p.value,s.textContent=f.value,A(u)})),v.addEventListener("submit",(function(e){e.preventDefault();var n=C({name:S.value,link:q.value});E.prepend(n),v.reset(),a(v,t),A(_)})),[{name:"Val Thorens",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},{name:"Restaurant terrace",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},{name:"An outdoor cafe",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},{name:"A very long bridge, over the forest and through the trees",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},{name:"Tunnel with morning light",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},{name:"Mountain house",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"}].forEach((function(e){var t=C(e);E.append(t)}))})();
'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDesignationElement = document.querySelector("[data-modal-designation]");
const modalDesignation = ['CEO at Feat Technologies Pvt Ltd', 'Cloud Automation Expert at Ericsson', 'Export Executive at Al-Haq Exports']

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    // Assign designation from the array using the index
    modalDesignationElement.innerHTML = modalDesignation[i];

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

console.log("Form elements found:", { form, formInputs, formBtn }); // Debug log

// Add click event to button for debugging
if (formBtn) {
  formBtn.addEventListener("click", function() {
    console.log("Button clicked!"); // Debug log
  });
}

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Button remains enabled at all times
    formBtn.disabled = false;
  });
}

emailjs.init("wrXusl6_vgu9H1tKS"); // Your EmailJS User ID

document.querySelector("[data-form]").addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Form submitted!"); // Debug log

  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  console.log("Form data:", { name, email, message }); // Debug log

  // Check if any required field is empty
  if (!name || !email || !message) {
    alert("Please fill in all fields before sending the message.");
    return;
  }

  // Show immediate feedback
  formBtn.disabled = true;
  formBtn.textContent = "Sending...";
  formBtn.style.opacity = "0.8";

  emailjs.sendForm("service_q2hvulm", "template_znhlk8o", this)
    .then(() => {
      formBtn.textContent = "✓ Sent!";
      formBtn.style.background = "linear-gradient(135deg, hsl(120, 100%, 50%), hsl(120, 100%, 40%))";
      
      // Quick success feedback
      setTimeout(() => {
        alert("Email sent successfully!");
        form.reset();
        formBtn.textContent = "Send Message";
        formBtn.style.background = "linear-gradient(135deg, hsl(25, 100%, 60%), hsl(25, 100%, 50%))";
        formBtn.style.opacity = "1";
        formBtn.disabled = false;
      }, 500);
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      formBtn.textContent = "✗ Failed";
      formBtn.style.background = "linear-gradient(135deg, hsl(0, 100%, 50%), hsl(0, 100%, 40%))";
      
      // Quick error feedback
      setTimeout(() => {
        alert("Failed to send email. Please try again.");
        formBtn.textContent = "Send Message";
        formBtn.style.background = "linear-gradient(135deg, hsl(25, 100%, 60%), hsl(25, 100%, 50%))";
        formBtn.style.opacity = "1";
        formBtn.disabled = false;
      }, 1000);
    });
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
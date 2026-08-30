/* ==========================================================================
   Bandaru Prasad - Portfolio Scripts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  // 2. Active Navigation Indicator on Scroll
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // 3. Back to Top Button Visibility
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  // 4. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 5. Scroll Reveal Observer
  const revealSections = document.querySelectorAll(".section-reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  revealSections.forEach((sec) => revealObserver.observe(sec));
});

// 6. Certificate Lightbox Modal Functions
function openModal(imageSrc, captionText) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImage");
  const modalCap = document.getElementById("modalCaption");

  if (modal && modalImg && modalCap) {
    modal.style.display = "flex";
    modalImg.src = imageSrc;
    modalCap.textContent = captionText;
  }
}

function closeModal() {
  const modal = document.getElementById("certModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// 7. Contact Form Client-Side Validation & mailto fallback
function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  let isValid = true;

  // Clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  if (!nameInput.value.trim()) {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    emailError.textContent = "Please enter your email address.";
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = "Please write a message.";
    isValid = false;
  }

  if (isValid) {
    const subject = encodeURIComponent(`Portfolio Message from ${nameInput.value.trim()}`);
    const body = encodeURIComponent(
      `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
    );

    // Provide immediate UI feedback
    formSuccess.textContent = "Thank you! Your message has been prepared.";
    formSuccess.classList.add("show");

    // Launch default email client
    setTimeout(() => {
      window.location.href = `mailto:bandaruprasad816@gmail.com?subject=${subject}&body=${body}`;
      // Reset form fields
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    }, 1000);
  }
}
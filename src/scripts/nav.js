// Function to handle desktop navigation
export function handleDesktopNav() {
  const navButtons = document.querySelectorAll(".flyout-button");
  const navFlyouts = document.querySelectorAll(".flyout-menu");
  const navFakeBorders = document.querySelectorAll('.flyout-menu div[aria-hidden="true"]');

  function closeAllNavFlyouts() {
    navButtons.forEach((button, idx) => {
      button.setAttribute("aria-expanded", "false");
      navFlyouts[idx].classList.add("hidden", "opacity-0");
      navFakeBorders[idx].classList.replace("bg-gray-200", "bg-transparent");
      button.classList.remove("text-blue-600");
      button.classList.add("text-gray-700", "hover:text-gray-800");
    });
  }

  document.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (clickedElement.closest(".flyout-menu")) {
      event.stopPropagation();
      return;
    }

    const buttonIndex = Array.from(navButtons).indexOf(clickedElement.closest(".flyout-button"));
    if (buttonIndex !== -1) {
      event.stopPropagation();
      const isMenuOpen = navButtons[buttonIndex].getAttribute("aria-expanded") === "true";
      closeAllNavFlyouts();
      if (!isMenuOpen) {
        navButtons[buttonIndex].setAttribute("aria-expanded", "true");
        navFlyouts[buttonIndex].classList.remove("hidden");
        setTimeout(() => navFlyouts[buttonIndex].classList.add("opacity-100"), 20);
        navFakeBorders[buttonIndex].classList.replace("bg-transparent", "bg-gray-200");
        navButtons[buttonIndex].classList.remove("text-gray-700", "hover:text-gray-800");
        navButtons[buttonIndex].classList.add("text-blue-600");
      }
      return;
    }

    closeAllNavFlyouts();
  });

  navFlyouts.forEach((flyout) => {
    flyout.addEventListener("click", (event) => event.stopPropagation());
  });
}

// Function to handle mobile navigation
export function handleMobileNav() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const offCanvasMenu = document.querySelector(".off-canvas-menu");
  const offCanvasMenuBackdrop = document.querySelector(".off-canvas-menu-backdrop");
  const offCanvasCloseButton = document.querySelector(".off-canvas-close-button");

  function toggleMenu() {
    const isOpen = offCanvasMenu.classList.contains("translate-x-0");
    if (isOpen) {
      offCanvasMenu.classList.replace("translate-x-0", "-translate-x-full");
      offCanvasMenuBackdrop.classList.replace("opacity-100", "opacity-0");
      //setTimeout(() => offCanvasMenuBackdrop.classList.add("hidden"), 300);
      mobileMenuToggle.classList.remove("hidden");
    } else {
      offCanvasMenu.classList.replace("-translate-x-full", "translate-x-0");
      offCanvasMenuBackdrop.classList.remove("hidden");
      offCanvasMenuBackdrop.classList.replace("opacity-0", "opacity-100");
      mobileMenuToggle.classList.add("hidden");
    }
  }

  mobileMenuToggle.addEventListener("click", toggleMenu);
  offCanvasCloseButton.addEventListener("click", toggleMenu);
  offCanvasMenuBackdrop.addEventListener("click", toggleMenu);
}

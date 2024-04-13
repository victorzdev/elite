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

export const handleMobileNav = () => {
    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
        const menu = document.querySelector('.off-canvas-menu');
        menu.classList.toggle('hidden', !isOpen);
    };

    const addEventListeners = () => {
        const openButton = document.querySelector('.off-canvas-open-button');
        const closeButton = document.querySelector('.off-canvas-close-button');
        const menu = document.querySelector('.off-canvas-menu');
        const content = document.querySelector('.off-canvas-content');

        const buttons = [openButton, closeButton];
        buttons.forEach(button => button?.addEventListener('click', toggleMenu));

        menu?.addEventListener('click', (event) => {
            if (!content.contains(event.target)) {
                toggleMenu();
            }
        });
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('DOMContentLoaded', addEventListeners);
    }
}
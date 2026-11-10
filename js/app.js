const projects = [
  {
    id: 1,
    title: "Uyo Central Group Website",
    category: "Web Development",
    image: "./assets/projects/project-01.png",
    description:
      "A responsive digital presence for a community organization, structured around ministries, events, leadership, contact information and initiatives.",
    problem:
      "Create a clear, accessible online home for an active organization with multiple ministries and recurring programmes.",
    features: [
      "Responsive multi-section website",
      "Semantic HTML structure",
      "Mobile navigation",
      "Scroll reveal interactions",
      "Event and ministry presentation"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "#",
    live: "https://uyocentralgroup.vercel.app/"
  },

  {
    id: 2,
    title: "SUCF Regional Conference Registration",
    category: "Full-Stack Web App",
    image: "./assets/projects/project-02.png",
    description:
      "A registration workflow connecting a web form with Google Apps Script, Google Sheets and Google Drive for structured conference registration and receipt handling.",
    problem:
      "Replace manual registration handling with a centralized digital workflow for collecting participant and payment information.",
    features: [
      "Registration form",
      "Receipt upload workflow",
      "Google Sheets integration",
      "Google Drive storage",
      "Response processing"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Google Apps Script"],
    github: "#",
    live: "https://sucfuyoregion.vercel.app/"
  },

  {
    id: 3,
    title: "Dorisss Modern Fashion Store",
    category: "E-Commerce Website",
    image: "./assets/projects/project-03.png",
    description:
      "A sleek, high-end e-commerce platform and modern fashion storefront designed to showcase apparel collections with immersive visuals, smooth category navigation, and an intuitive shopping cart experience.",
    problem:
      "Fashion brands often struggle with cluttered layouts, poor mobile responsiveness, and slow checkout flows that lead to high cart abandonment and fail to communicate premium brand value.",
    features: [
      "Curated apparel collections and category filtering",
      "High-resolution image galleries and zoom features",
      "Streamlined shopping bag and checkout workflow",
      "Mobile-first responsive layout",
      "Lookbook showcase for seasonal style inspiration"
    ],
    technologies: ["HTML5", "Tailwind CSS", "JavaScript"],
    github: "#",
    live: "https://dorisss.vercel.app/"
  },

  {
    id: 4,
    title: "ClientVault",
    category: "Mobile Application",
    image: "./assets/projects/project-04.png",
    description:
      "A versatile asset, service-lifecycle, and task manager mobile and web application. The app helps service providers - including web developers, IT managers, digital agencies, graphic designers, real estate/property managers, media managers, and virtual assistants - track their client profiles, recurring digital/physical assets, contract renewals, and critical expiration dates.",
    problem:
      "Service providers and digital agencies constantly struggle with fragmented workflows, missed contract renewals, lost asset tracking, and disorganized client profiles spread across multiple platforms.",
    features: [
      "Client profile and relationship management",
      "Recurring digital and physical asset tracking",
      "Contract renewal and expiration alerts",
      "Service-lifecycle and task workflow automation",
      "Cross-platform responsive mobile and web access"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "#",
    live: "https://clientvaultapp.vercel.app/"
  }
];

const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");
const projectGrid = document.getElementById("project-grid");

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function setTheme(theme) {
  const isLight = theme === "light";

  html.classList.toggle("light", isLight);

  localStorage.setItem(
    "portfolio-theme",
    isLight ? "light" : "dark"
  );

  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      isLight ? "#f5f7fb" : "#09090b"
    );
  }

  if (themeToggle) {
    themeToggle.innerHTML =
      theme === "light"
        ? '<i data-lucide="moon" class="h-4 w-4"></i>'
        : '<i data-lucide="sun" class="h-4 w-4"></i>';

    themeToggle.setAttribute(
      "aria-label",
      theme === "light"
        ? "Switch to dark theme"
        : "Switch to light theme"
    );
  }

  refreshIcons();
}

setTheme(
  localStorage.getItem("portfolio-theme") ||
    (
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
    )
);

themeToggle?.addEventListener("click", () => {
  setTheme(
    html.classList.contains("light")
      ? "dark"
      : "light"
  );
});


function closeMobileMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.add("hidden");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.innerHTML =
    '<i data-lucide="menu" class="h-5 w-5"></i>';

  refreshIcons();
}


menuToggle?.addEventListener("click", () => {
  const open =
    menuToggle.getAttribute("aria-expanded") === "true";

  if (open) {
    closeMobileMenu();
  } else {
    mobileMenu.classList.remove("hidden");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.innerHTML =
      '<i data-lucide="x" class="h-5 w-5"></i>';

    refreshIcons();
  }
});


document
  .querySelectorAll(".mobile-link")
  .forEach(link =>
    link.addEventListener(
      "click",
      closeMobileMenu
    )
  );

function renderProjects() {
  if (!projectGrid) return;

  projectGrid.innerHTML = projects
    .map(project => `
      <article class="project-card reveal">

        <div class="project-visual">
          <img
            src="${project.image}"
            alt="${project.title} screenshot placeholder"
            loading="lazy"
          />

          <span class="project-number">
            ${String(project.id).padStart(2, "0")}
          </span>
        </div>

        <div class="project-content">

          <div class="flex items-center justify-between gap-3">

            <span class="text-[10px] font-semibold uppercase tracking-[.16em] text-sky-300">
              ${project.category}
            </span>

            <i
              data-lucide="arrow-up-right"
              class="h-4 w-4 text-zinc-600"
            ></i>

          </div>

          <h3 class="mt-3">
            ${project.title}
          </h3>

          <p>
            ${project.description}
          </p>

          <div class="project-tech">
            ${project.technologies
              .map(t => `<span>${t}</span>`)
              .join("")}
          </div>

          <div class="project-actions">

            <button
              type="button"
              class="btn-secondary px-3 py-2"
              data-project="${project.id}"
            >
              View Details
            </button>

            ${
              Boolean(
                project.live &&
                project.live.trim()
              )
                ? `
                  <a
                    class="btn-secondary px-3 py-2"
                    href="${project.live}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Site
                  </a>
                `
                : ""
            }

          </div>

        </div>

      </article>
    `)
    .join("");

  refreshIcons();

  projectGrid
    .querySelectorAll("[data-project]")
    .forEach(button => {

      button.addEventListener("click", () => {

        openProject(
          Number(button.dataset.project)
        );

      });

    });

  observeRevealElements();
}

function openProject(id) {

  const project = projects.find(
    item => item.id === id
  );

  if (!project || !modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = `

    <div class="project-visual min-h-[14rem]">

      <img
        src="${project.image}"
        alt="${project.title} screenshot"
      />

      <span class="project-number">
        ${String(project.id).padStart(2, "0")}
      </span>

    </div>

    <div class="p-6 sm:p-8">

      <span class="text-[10px] font-semibold uppercase tracking-[.16em] text-sky-300">
        ${project.category}
      </span>

      <h2
        id="modal-title"
        class="mt-2 font-display text-3xl font-bold tracking-tight text-white"
      >
        ${project.title}
      </h2>

      <p class="mt-4 text-sm leading-7 text-zinc-400">
        ${project.description}
      </p>

      <div class="mt-7 grid gap-6 sm:grid-cols-2">

        <div>

          <h3 class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Problem solved
          </h3>

          <p class="mt-2 text-sm leading-7 text-zinc-400">
            ${project.problem}
          </p>

        </div>

        <div>

          <h3 class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Key features
          </h3>

          <ul class="mt-2 space-y-2 text-sm text-zinc-400">

            ${project.features
              .map(
                f => `
                  <li class="flex gap-2">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400"></span>
                    ${f}
                  </li>
                `
              )
              .join("")}

          </ul>

        </div>

      </div>

      <div class="mt-7">

        <h3 class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Technology
        </h3>

        <div class="project-tech mt-3">

          ${project.technologies
            .map(t => `<span>${t}</span>`)
            .join("")}

        </div>

      </div>

      <div class="mt-8 flex flex-wrap gap-3">

        ${
          Boolean(
            project.live &&
            project.live.trim()
          )
            ? `
              <a
                class="btn-primary"
                href="${project.live}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Live Site

                <i
                  data-lucide="arrow-up-right"
                  class="h-4 w-4"
                ></i>

              </a>
            `
            : ""
        }

        ${
          Boolean(
            project.github &&
            project.github.trim() &&
            project.github !== "#"
          )
            ? `
              <a
                class="btn-secondary"
                href="${project.github}"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub

                <i
                  data-lucide="github"
                  class="h-4 w-4"
                ></i>

              </a>
            `
            : ""
        }

      </div>

    </div>
  `;

  modal.classList.remove("hidden");

  document.body.classList.add(
    "overflow-hidden"
  );

  refreshIcons();

  modalClose?.focus();
}


function closeProject() {

  modal?.classList.add("hidden");

  document.body.classList.remove(
    "overflow-hidden"
  );

}


modalClose?.addEventListener(
  "click",
  closeProject
);


modalBackdrop?.addEventListener(
  "click",
  closeProject
);

const contactForm =
  document.getElementById("contact-form");

const formStatus =
  document.getElementById("form-status");

const submitButton =
  contactForm?.querySelector(
    'button[type="submit"]'
  );

contactForm?.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    const name =
      document.getElementById("name")?.value.trim();

    const email =
      document.getElementById("email")?.value.trim();

    const subject =
      document.getElementById("subject")?.value.trim();

    const message =
      document.getElementById("message")?.value.trim();

    const validEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email || ""
      );

    if (
      !name ||
      !validEmail ||
      !subject ||
      !message ||
      message.length < 20
    ) {

      if (formStatus) {

        formStatus.className =
          "mt-4 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300";

        formStatus.textContent =
          "Please complete all fields, enter a valid email address, and make your message at least 20 characters.";

        formStatus.classList.remove("hidden");

      }

      return;
    }


    if (formStatus) {

      formStatus.className =
        "mt-4 rounded-xl border border-sky-400/20 bg-sky-400/5 px-4 py-3 text-sm text-sky-300";

      formStatus.textContent =
        "Sending your message...";

      formStatus.classList.remove("hidden");

    }

    if (submitButton) {

      submitButton.disabled = true;

      submitButton.style.opacity = "0.7";

      submitButton.style.cursor =
        "not-allowed";

    }

    try {
      const formData =
        new FormData(contactForm);

      const response =
        await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json"
            }
          }
        );

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {

        if (formStatus) {

          formStatus.className =
            "mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300";

          formStatus.textContent =
            "Thank you for reaching out. Your message has been received successfully. I'll get back to you as soon as possible.";

          formStatus.classList.remove(
            "hidden"
          );

        }

        // Clear the form
        contactForm.reset();

      }

      // --------------------------------------
      // WEB3FORMS ERROR
      // --------------------------------------

      else {

        if (formStatus) {

          formStatus.className =
            "mt-4 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300";

          formStatus.textContent =
            data.message ||
            "Sorry, your message could not be sent. Please try again.";

          formStatus.classList.remove(
            "hidden"
          );

        }

      }

    }
    catch (error) {

      console.error(
        "Web3Forms submission error:",
        error
      );

      if (formStatus) {

        formStatus.className =
          "mt-4 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300";

        formStatus.textContent =
          "Something went wrong while sending your message. Please try again or contact me directly by email.";

        formStatus.classList.remove(
          "hidden"
        );

      }

    }

    finally {

      if (submitButton) {

        submitButton.disabled = false;

        submitButton.style.opacity = "";

        submitButton.style.cursor = "";

      }

    }

  }
);

document
  .getElementById("year")
  ?.appendChild(
    document.createTextNode(
      new Date().getFullYear()
    )
  );

let revealObserver;


function observeRevealElements() {

  const elements =
    document.querySelectorAll(
      ".reveal:not(.visible)"
    );


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      el =>
        el.classList.add("visible")
    );

    return;
  }


  if (!revealObserver) {

    revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08
        }
      );

  }


  elements.forEach(
    el =>
      revealObserver.observe(el)
  );

}


const sections = [
  ...document.querySelectorAll(
    "main section[id]"
  )
];

const navLinks = [
  ...document.querySelectorAll(
    ".nav-link"
  )
];


if (
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            navLinks.forEach(
              link =>
                link.classList.toggle(
                  "active",
                  link.getAttribute(
                    "href"
                  ) ===
                    `#${entry.target.id}`
                )
            );

          }

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(
    section =>
      sectionObserver.observe(
        section
      )
  );

}

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeProject();

      closeMobileMenu();

    }

  }
);

renderProjects();

refreshIcons();

observeRevealElements();
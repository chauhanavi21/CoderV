// ---------- THEME TOGGLE ----------
function initTheme() {
  const btn = document.getElementById("themeToggle");
  const labelEl = btn?.querySelector(".theme-toggle-text");
  if (!btn) return;

  function updateToggle() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    if (labelEl) labelEl.textContent = isDark ? "Light" : "Dark";
  }

  updateToggle();

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("coderv-theme", next);
    updateToggle();
  });
}

initTheme();

// ---------- SIDEBAR TOGGLE ----------
function toggleSidebar(btnId, sidebarId) {
  const btn = document.getElementById(btnId);
  const sidebar = document.getElementById(sidebarId);

  if (!btn || !sidebar) return;

  // Hide sidebar on mobile initially
  function checkMobile() {
    const isMobile = window.innerWidth <= 840;
    if (isMobile) {
      sidebar.classList.add("hidden-mobile");
    } else {
      sidebar.classList.remove("hidden-mobile");
    }
  }

  checkMobile();
  window.addEventListener("resize", checkMobile);

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden-mobile");
  });

  document.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 840;
    if (!isMobile) return;

    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedToggle = btn.contains(e.target);

    if (!clickedInsideSidebar && !clickedToggle) {
      sidebar.classList.add("hidden-mobile");
    }
  });
}

// Dashboard
toggleSidebar("menuToggleDashboard", "dashboardSidebar");

// Lesson
toggleSidebar("menuToggleLesson", "lessonSidebar");

// Quiz
toggleSidebar("menuToggleQuiz", "quizSidebar");

// AI
toggleSidebar("menuToggleAI", "aiSidebar");

// Resources
toggleSidebar("menuToggleResources", "resourcesSidebar");

// About
toggleSidebar("menuToggleAbout", "aboutSidebar");

function toggleSidebar(btnId, sidebarId) {
  const btn = document.getElementById(btnId);
  const sidebar = document.getElementById(sidebarId);

  if (!btn || !sidebar) return;

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

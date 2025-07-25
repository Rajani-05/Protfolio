// Toggle navigation on mobile
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
});
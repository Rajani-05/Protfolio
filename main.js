// main.js
document.querySelector('.nav__toggle').addEventListener('click', () => {
  const navList = document.querySelector('.nav__list');
  navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  
});


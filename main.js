function routeTo(page) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  if (page === 'blog') closeBlog();
  if (page === 'projects') loadProjects();
  window.location.hash = page;
}
const blogPosts = [
 
  {
    title: "Why Monospaced Fonts?",
    date: "2025-02-02",
    summary: "Why I prefer monospaced fonts when coding?",
    content: `<p>Monospaced fonts improve code alignment and readability. JetBrains Mono and Fira Code are easy on the eyes and support ligatures for better reading experience.</p>
<p>In short: <b>Style + Productivity!</b></p>`
  }
];
function loadBlog() {
  const list = document.getElementById('blog-list');
  const detail = document.getElementById('blog-detail');
  const backBtn = document.querySelector('.back-btn');
  list.innerHTML = '';
  detail.style.display = 'none';
  backBtn.style.display = 'none';
  blogPosts.forEach((post, i) => {
    const el = document.createElement('div');
    el.className = 'blog-post';
    el.innerHTML = `<div class="blog-title">${post.title}</div>
      <div class="blog-meta">${post.date}</div>
      <div class="blog-summary">${post.summary}</div>`;
    el.onclick = () => showBlog(i);
    list.appendChild(el);
  });
}
function showBlog(idx) {
  const post = blogPosts[idx];
  document.getElementById('blog-detail').style.display = 'block';
  document.getElementById('blog-list').style.display = 'none';
  document.getElementById('blog-detail').innerHTML =
    `<div class="blog-title">${post.title}</div>
     <div class="blog-meta">${post.date}</div>
     <div class="blog-detail-content">${post.content}</div>`;
  document.querySelector('.back-btn').style.display = 'block';
}
function closeBlog() {
  document.getElementById('blog-detail').style.display = 'none';
  document.getElementById('blog-list').style.display = 'flex';
  document.querySelector('.back-btn').style.display = 'none';
}
const galleryPhotos = [
  { src: 'gallery/photo1.jpg', caption: 'Snowy Day' },
  { src: 'gallery/photo2.jpg', caption: 'Terminal Theme' },
  { src: 'gallery/photo3.jpg', caption: 'Coding at Night' }
];
function loadGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  galleryPhotos.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${item.src}" alt="${item.caption}"><div class="gallery-caption">${item.caption}</div>`;
    div.onclick = () => openLightbox(item.src);
    grid.appendChild(div);
  });
}
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}
const projectList = [];
function loadProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  if(projectList.length === 0) {
    grid.innerHTML = `<div style="color:#aaa;padding:38px 0;text-align:center;width:100%;font-size:1.12rem;opacity:0.8;">
      No projects to display yet.<br>I will share my work here in the future.
    </div>`;
    return;
  }
  projectList.forEach(proj => {
    const box = document.createElement('div');
    box.className = 'project-box';
    box.innerHTML = `<div class="project-title">${proj.title}</div>
      <div class="project-desc">${proj.desc}</div>`;
    grid.appendChild(box);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  routeTo('home');
  document.querySelector('.nav-home').addEventListener('click', () => routeTo('home'));
  if (location.hash) {
    let page = location.hash.replace('#', '');
    if (page && document.getElementById(page)) routeTo(page);
  }
  loadBlog();
  loadGallery();
  loadProjects();
  document.addEventListener('keydown', e => {
    if (e.key === "Escape") closeLightbox();
  });
});
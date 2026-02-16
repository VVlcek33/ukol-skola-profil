// app.js - načte data z profile.json pomocí fetch(), .then() a .catch()

function renderProfile(data){
  const nameEl = document.getElementById('name');
  nameEl.textContent = data.name || 'Tvé Jméno';

  const skillsEl = document.getElementById('skills');
  skillsEl.innerHTML = '';
  (data.skills || []).forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsEl.appendChild(li);
  });

  const projectsEl = document.getElementById('projects');
  projectsEl.innerHTML = '';
  (data.projects || []).forEach(proj => {
    const article = document.createElement('article');
    article.className = 'project';

    const h3 = document.createElement('h3');
    h3.textContent = proj.title;

    const p = document.createElement('p');
    p.textContent = proj.description;

    const a = document.createElement('a');
    a.href = proj.link || '#';
    a.textContent = proj.link ? 'Odkaz' : 'Žádný odkaz';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(a);

    projectsEl.appendChild(article);
  });
}

fetch('profile.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    renderProfile(data);
  })
  .catch(error => {
    console.error('Chyba při načítání profile.json:', error);
    const main = document.querySelector('main');
    const err = document.createElement('p');
    err.className = 'error';
    err.textContent = 'Nepodařilo se načíst profil. Zkontroluj soubor profile.json a console.';
    main.appendChild(err);
  });

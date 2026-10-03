const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const projectDialog = document.querySelector('#project-dialog');
const certificateDialog = document.querySelector('#certificate-dialog');
const certificateFrame = document.querySelector('#certificate-frame');
const formStatus = document.querySelector('#form-status');

const projects = {
  supplytrack: {
    category: 'WEB APPLICATION / CASE STUDY 01',
    title: 'SupplyTrack',
    description: 'A supply management system with demand forecasting using Linear Regression to support inventory planning and purchasing decisions.',
    features: ['Inventory management', 'Purchase order handling', 'Supplier management', 'Order tracking', 'Reports and analytics', 'Linear Regression demand forecasting'],
    stack: ['Python', 'Django', 'MySQL', 'Linear Regression', 'HTML', 'CSS', 'JavaScript'],
  },
  ronda: {
    category: 'MOBILE + WEB / CASE STUDY 02',
    title: 'R.O.N.D.A.',
    description: 'Real-time Online Network for Driver Accountability connects fleet visibility, driver sessions, and vehicle safety workflows.',
    features: ['GPS tracking', 'Route monitoring', 'Driver session management', 'SOS notifications', 'Vehicle inspection reports', 'Admin dashboard'],
    stack: ['React Native', 'Django', 'REST API', 'PostgreSQL'],
  },
  lpr: {
    category: 'AUTOMATION / CASE STUDY 03',
    title: 'Automated LPR Generator',
    description: 'A Python and Django workflow concept for processing student records in Excel, generating reports in bulk, and exporting the results together.',
    features: ['Excel processing', 'Bulk report generation', 'Student record automation', 'ZIP export'],
    stack: ['Python', 'Django', 'OpenPyXL'],
  },
  'data-analysis': {
    category: 'DATA ANALYSIS / ACADEMIC WORK 04',
    title: 'Data Analysis & Visualization',
    description: 'College notebook work exploring UK road-accident data from 2019–2022 and plotting a sample population dataset.',
    features: ['CSV data exploration with pandas', 'Missing-value and category checks', 'Accident-pattern questions', 'Population trend visualization'],
    stack: ['Python', 'pandas', 'Matplotlib', 'Jupyter'],
  },
};

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('jo-portfolio-theme', theme);
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☼' : '◐';
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#161a22' : '#f5f6f8';
}

const savedTheme = localStorage.getItem('jo-portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('is-open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelectorAll('[data-project-details]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.projectDetails];
    if (!project) return;

    document.querySelector('#dialog-category').textContent = project.category;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;

    const featureList = document.querySelector('#dialog-features');
    featureList.replaceChildren(...project.features.map((feature) => {
      const item = document.createElement('li');
      item.textContent = feature;
      return item;
    }));

    const stackList = document.querySelector('#dialog-stack');
    stackList.replaceChildren(...project.stack.map((technology) => {
      const item = document.createElement('li');
      item.textContent = technology;
      return item;
    }));

    projectDialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

function openCertificate(card) {
  const certificatePath = card.dataset.certificate;
  const certificateTitle = card.dataset.certificateTitle;
  if (!certificatePath || !certificateTitle) return;

  document.querySelector('#certificate-dialog-title').textContent = certificateTitle;
  certificateFrame.title = `${certificateTitle} Cisco certificate preview`;
  certificateFrame.src = `${certificatePath}#toolbar=0&navpanes=0&scrollbar=0`;
  certificateDialog.showModal();
}

document.querySelectorAll('[data-certificate]').forEach((card) => {
  card.addEventListener('click', () => openCertificate(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCertificate(card);
    }
  });
});

document.querySelector('.certificate-dialog-close').addEventListener('click', () => certificateDialog.close());
certificateDialog.addEventListener('click', (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});
certificateDialog.addEventListener('close', () => {
  certificateFrame.removeAttribute('src');
});

document.querySelectorAll('[data-link-missing]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const name = link.getAttribute('aria-label')?.split(' ')[0] || 'This';
    document.querySelector('#link-notice').textContent = `${name} link has not been provided yet.`;
  });
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const contactEmail = '';
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);

  if (!contactEmail) {
    formStatus.textContent = 'Your email app is ready, but Jo’s email address has not been added yet.';
    return;
  }

  formStatus.textContent = 'Opening your email app with the message prepared.';
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

document.querySelector('#current-year').textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
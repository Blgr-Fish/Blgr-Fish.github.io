<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

const formations = ref([
  {
    school: 'Nantes Université',
    degree: 'Master Informatique',
    period: 'Sept. 2025 - Juil. 2027',
    description: 'Option Génie Logiciel (ALMA)',
    skills: null
  },
  {
    school: 'Nantes Université',
    degree: 'Licence Informatique',
    period: 'Sept. 2022 - Juin 2025',
    description: null,
    skills: ['Java', 'SQL', 'C/C++', 'Databases', 'POO', 'TypeScript']
  },
  {
    school: 'Lycée Nicolas-Appert',
    degree: 'Baccalauréat - Mention Bien',
    period: 'Sept. 2019 - Juin 2022',
    description: 'Options Mathématiques, Sciences Numériques et Informatiques.',
    skills: null
  },
])

const projects = ref([
  {
    title: 'Shell Unix en C',
    description: 'Développement d\'un shell interactif reproduisant les fonctionnalités d\'un shell Unix : exécution de commandes, redirections, historique persistant, gestion des processus et signaux POSIX.',
    tags: ['C', 'Unix', 'Shell', 'POSIX'],
    link: 'https://github.com/Blgr-Fish/RogerLux_Cshell',
    date: 'Déc. 2025',
    image: '/media/images/projects/Cshell.png'
  },
  {
    title: 'Faille de Sécurité Universitaire',
    description: 'Découverte et signalement d\'une faille de sécurité sur un site web de Nantes Université permettant l\'accès à des documents confidentiels. Reconnaissance officielle du responsable informatique.',
    tags: ['Cybersécurité', 'Hacking éthique'],
    link: null,
    date: 'Déc. 2023',
    image: '/media/images/projects/NantesUniversite.png'
  },
  {
    title: 'Jeu Vidéo 2D en Java',
    description: 'Création d\'un shoot\'em up spatial "Galactic Shooter" en équipe de 3, utilisant JavaFX et Maven.',
    tags: ['Java', 'JavaFX', 'Maven', 'Git'],
    link: 'https://github.com/Blgr-Fish/Galactic-Shooter',
    date: 'Oct. 2023',
    image: '/media/images/projects/GalacticShooter.png'
  },
])

const currentProjectIndex = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const currentTranslate = ref(0)
const prevTranslate = ref(0)
const dragThreshold = 100

const nextProject = () => {
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.value.length
}

const prevProject = () => {
  currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.value.length) % projects.value.length
}

const goToProject = (index: number) => {
  currentProjectIndex.value = index
}

// Drag/Swipe functionality
const onDragStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  startX.value = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  prevTranslate.value = currentTranslate.value
}

const onDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  const currentX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  currentTranslate.value = prevTranslate.value + currentX - startX.value
}

const onDragEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false
  const moved = currentTranslate.value - prevTranslate.value
  
  if (moved < -dragThreshold) {
    nextProject()
  } else if (moved > dragThreshold) {
    prevProject()
  }
  
  currentTranslate.value = 0
  prevTranslate.value = 0
}

const getSlideOffset = (index: number) => {
  const total = projects.value.length
  let offset = index - currentProjectIndex.value
  
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  
  return offset
}

// Dark mode toggle
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

// Scroll animations
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  isDarkMode.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)

  // Autorise les transitions après le premier rendu
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transition')
  })

  // IntersectionObserver inchangé
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      } else {
        entry.target.classList.remove('animate-in')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.animate').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <div class="portfolio">
    <nav class="nav">
      <div class="container nav-content">
        <a href="#" class="nav-logo">Portfolio</a>
        <div class="nav-right">
          <div class="nav-links">
            <a href="#about">À propos</a>
            <a href="#formations">Formations</a>
            <a href="#projects">Projets</a>
            <a href="#contact">Contact</a>
          </div>
          <button class="theme-toggle" @click="toggleDarkMode" :title="isDarkMode ? 'Mode clair' : 'Mode sombre'">
            <svg class="icon sun" :class="{ active: !isDarkMode }" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="icon moon" :class="{ active: isDarkMode }" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title animate animate-fade-up delay-1">Ziad Ijja</h1>
        <p class="hero-subtitle animate animate-fade-up delay-2">Étudiant en Master informatique à Nantes Université</p>
        <div class="hero-actions animate animate-fade-up delay-3">
          <a href="#projects" class="btn btn-primary">Voir mes projets</a>
          <a href="#contact" class="btn btn-secondary">Me contacter</a>
        </div>
      </div>
    </section>

    <section id="about" class="section section-alt">
      <div class="container">
        <h2 class="section-title animate animate-fade-up">Qui suis-je ?</h2>
        <div class="about-content">
          <p class="about-text animate animate-fade-up delay-1">
            Je m’intéresse à l’informatique pour ses aspects logiques et structurels, et pour la manière dont des systèmes
            cohérents peuvent émerger de règles simples. J’aime comprendre comment les choses fonctionnent réellement.
          </p>
          <p class="about-text animate animate-fade-up delay-2">
            La cybersécurité m’attire pour la rigueur qu’elle demande et pour l’analyse précise des mécanismes internes
            d’un système. Comprendre les engrenages de ces outils complexes, et réussir à en contourner les principes, voilà quelque chose qui me passionne.
          </p>
        </div>
      </div>
    </section>




    <section id="formations" class="section">
      <div class="container">
        <h2 class="section-title animate animate-fade-up">Formations</h2>
        <div class="formations-timeline">
          <div v-for="(formation, index) in formations" :key="formation.school + formation.degree" class="formation-item animate animate-fade-up" :style="{ transitionDelay: (index * 0.15) + 's' }">
            <div class="formation-marker"></div>
            <div class="formation-content">
              <span class="formation-period">{{ formation.period }}</span>
              <h3 class="formation-degree">{{ formation.degree }}</h3>
              <p class="formation-school">{{ formation.school }}</p>
              <p v-if="formation.description" class="formation-description">{{ formation.description }}</p>
              <div v-if="formation.skills" class="formation-skills">
                <span v-for="skill in formation.skills" :key="skill" class="tag">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="section section-alt projects-section">
      <div class="container">
        <h2 class="section-title animate animate-fade-up">Projets</h2>
        <div class="carousel-container animate animate-fade-up delay-1">
          <div 
            class="carousel-track"
            @mousedown="onDragStart"
            @mousemove="onDragMove"
            @mouseup="onDragEnd"
            @mouseleave="onDragEnd"
            @touchstart="onDragStart"
            @touchmove="onDragMove"
            @touchend="onDragEnd"
            :class="{ dragging: isDragging }"
          >
            <article 
              v-for="(project, index) in projects" 
              :key="project.title" 
              class="project-card"
              :class="{ 
                active: index === currentProjectIndex, 
                adjacent: Math.abs(getSlideOffset(index)) === 1,
                hidden: Math.abs(getSlideOffset(index)) > 1
              }"
              :style="{ 
                transform: `translateX(calc(${getSlideOffset(index) * 105}% + ${isDragging ? currentTranslate : 0}px))`
              }"
            >
              <div class="project-image" :style="{ backgroundImage: `url('${project.image}')` }"></div>
              <div class="project-content">
                <span class="project-date">{{ project.date }}</span>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="project-link">
                  Voir le projet
                </a>
              </div>
            </article>
          </div>
        </div>
        
        <div class="carousel-controls">
          <button class="carousel-btn" @click="prevProject" aria-label="Projet précédent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="carousel-dots">
            <button 
              v-for="(_project, index) in projects" 
              :key="index" 
              class="dot" 
              :class="{ active: index === currentProjectIndex }"
              @click="goToProject(index)"
              :aria-label="`Aller au projet ${index + 1}`"
            ></button>
          </div>
          
          <button class="carousel-btn" @click="nextProject" aria-label="Projet suivant">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="container contact-content">
        <h2 class="section-title animate animate-fade-up">Contact</h2>
        <p class="contact-text animate animate-fade-up delay-1">
          Intéressé par une collaboration ? N'hésitez pas à me contacter.
        </p>
        <a href="mailto:ijjaziad@gmail.com" class="btn btn-primary btn-large animate animate-fade-up delay-2">
          Envoyer un message
        </a>
        <div class="social-links animate animate-fade-up delay-3">
          <a href="https://github.com/Blgr-Fish" target="_blank" rel="noopener" class="social-link" title="GitHub">
            <img class="social-icon github" src="/media/icons/github-black.svg" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/ziad-ijja" target="_blank" rel="noopener" class="social-link" title="LinkedIn">
            <img class="social-icon linkedin" src="/media/icons/linkedin-black.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <p>© 2026 Ziad Ijja. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--nav-bg) !important;
  border-bottom: 1px solid var(--nav-border) !important;
  transition: background-color 0.6s ease, border-color 0.6s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--text);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--text);
  opacity: 1;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.theme-toggle {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  color: var(--text);
}

.theme-toggle:hover {
  background: var(--surface);
}

.theme-toggle .icon {
  position: absolute;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.theme-toggle .icon.sun {
  opacity: 0;
  transform: rotate(-90deg) scale(0);
}

.theme-toggle .icon.sun.active {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.theme-toggle .icon.moon {
  opacity: 0;
  transform: rotate(90deg) scale(0);
}

.theme-toggle .icon.moon.active {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 60px;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-intro {
  font-size: 1.25rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.hero-title {
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--text) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
}

.hero-subtitle {
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  border-radius: 980px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-hover);
  opacity: 1;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--secondary);
  color: var(--text);
}

.btn-secondary:hover {
  border-color: var(--text);
  opacity: 1;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-text {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.formations-timeline {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  padding-left: 2rem;
}

.formations-timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--surface);
}

.formation-item {
  position: relative;
  padding-bottom: 2.5rem;
}

.formation-item:last-child {
  padding-bottom: 0;
}

.formation-marker {
  position: absolute;
  left: -2rem;
  top: 0.25rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--background);
  box-shadow: 0 0 0 2px var(--accent);
}

.formation-content {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.formation-content:hover {
  transform: translateX(8px);
  box-shadow: 0 10px 30px var(--shadow-md);
}

.formation-period {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
}

.formation-degree {
  font-size: 1.25rem;
  margin: 0.5rem 0 0.25rem;
  color: var(--text);
}

.formation-school {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.formation-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 0.75rem;
}

.formation-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

/* Carousel Styles */
.projects-section {
  overflow-x: clip;
}

.carousel-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.carousel-track {
  position: relative;
  width: 100%;
  min-height: 520px;
  cursor: grab;
  user-select: none;
  overflow: visible;
}

.carousel-track.dragging {
  cursor: grabbing;
}

.carousel-track.dragging .project-card {
  transition: none;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.carousel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--secondary);
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.carousel-btn:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--secondary);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: var(--accent);
  transform: scale(1.2);
}

.dot:hover:not(.active) {
  background: var(--text-secondary);
}

.project-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: 80%;
  margin-left: -40%;
  background: var(--background);
  border-radius: 24px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 10px 30px var(--shadow-sm);
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease;
}

.project-card.adjacent {
  opacity: 0.6;
}

.project-card.active {
  opacity: 1;
  pointer-events: auto;
  box-shadow: 0 25px 50px var(--shadow-lg);
}

.project-card.active:hover {
  box-shadow: 0 30px 60px var(--shadow-xl);
}

.project-card.hidden {
  opacity: 0;
  pointer-events: none;
}

.project-image {
  height: 240px;
  background-size: cover;
  background-position: center;
  background-color: var(--image-placeholder);
}

.project-content {
  padding: 2rem;
}

.project-title {
  margin-bottom: 0.75rem;
  color: var(--text);
  transition: color 0.6s ease;
  font-size: 1.5rem;
}

.project-description {
  font-size: 1.05rem;
  margin-bottom: 1.25rem;
  transition: color 0.6s ease;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--surface);
  border-radius: 20px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: background-color 0.6s ease, color 0.6s ease;
}

.project-date {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.project-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--accent);
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.project-link:hover {
  opacity: 0.7;
}

.contact-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.contact-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.social-links {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--surface);
  transition: transform 0.3s ease, background-color 0.6s ease;
}

.social-link:hover {
  transform: translateY(-4px);
}

.social-icon {
  width: 28px;
  height: 28px;
  transition: opacity 0.6s ease;
}

.social-icon.github {
  content: url('/media/icons/github-black.svg');
}

html[data-theme="dark"] .social-icon.github {
  content: url('/media/icons/github-white.svg');
}

.social-icon.linkedin {
  content: url('/media/icons/linkedin-black.svg');
}

html[data-theme="dark"] .social-icon.linkedin {
  content: url('/media/icons/linkedin-white.svg');
}

.footer {
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid var(--surface);
}

.footer p {
  font-size: 0.9rem;
}


@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .section {
    padding: 5rem 0;
  }

  .nav-right {
    gap: 1rem;
  }
}

.animate {
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-fade-up {
  transform: translateY(40px);
}

.animate-scale {
  transform: scale(0.9);
}

.animate-fade-left {
  transform: translateX(-40px);
}

.animate-fade-right {
  transform: translateX(40px);
}

.animate.animate-in {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
}

.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }
.delay-5 { transition-delay: 0.5s; }

@media (prefers-reduced-motion: reduce) {
  .animate {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>

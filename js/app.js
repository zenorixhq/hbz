/**
 * HBZ ARCHITECTURE — APPLICATION SCRIPT
 * Reference: Thirdway (thirdway.com) designed by How&How
 * Includes live GMT clocks, scroll distance tracker, interactive solar CAD,
 * spatial cost calculator, gated article reader, consultation modal & admin CMS.
 */

// Initial Seed Data (Stored in localStorage if not already present)
const DEFAULT_PROJECTS = [
  {
    id: "vvd-villa",
    title: "VVD Villa Monolith",
    category: "Residential",
    location: "Kensington, London",
    year: "2024",
    gfa: "3,400 SQM",
    material: "Board-Formed Basalt",
    glazing: "Triple-Pane Low-Iron",
    engineer: "Eckersley O’Callaghan",
    epc: "A+ Passive Standard",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Massive board-formed basalt residence framing protected oak canopies across Kensington Gardens.",
    brief: "The design balances massive board-formed concrete monoliths with deep glass apertures that frame ancient protected oak canopies across Kensington Gardens. Structural thermal mass creates year-round passive temperature regulation."
  },
  {
    id: "horizon-colonnade",
    title: "Horizon Colonnade",
    category: "Cultural",
    location: "Mayfair, London",
    year: "2023",
    gfa: "1,850 SQM",
    material: "Fluted Cast Concrete & Patinated Bronze",
    glazing: "Diffused Structural Skylight Array",
    engineer: "Arup Structural Group",
    epc: "A Heritage Grade",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Fluted concrete colonnade pavilion with diffused north skylighting for exhibition and cultural assembly.",
    brief: "A monumental public pavilion organized around repetitive fluted stone colonnades. Indirect north light penetrates deep into subterranean exhibition chambers through volumetric roof fissures."
  },
  {
    id: "st-johns-cantilever",
    title: "St. John’s Cantilever",
    category: "Residential",
    location: "Hampstead, London",
    year: "2022",
    gfa: "2,600 SQM",
    material: "Post-Tensioned Concrete & Charred Cedar",
    glazing: "Motorized Minimal Frame Slider",
    engineer: "Price & Myers",
    epc: "A+ Passive Standard",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Post-tensioned concrete structural cantilevers floating over sloping natural heath topography.",
    brief: "Engineered to float twelve meters above ancient heath woodlands without disturbing ground root systems. Post-tensioned concrete ribs act like bridge trusses to cradle minimal private living pavilions."
  },
  {
    id: "geneva-lakefront",
    title: "Lac Léman Pavilion",
    category: "Cultural",
    location: "Geneva, Switzerland",
    year: "2025",
    gfa: "4,100 SQM",
    material: "Swiss Alpine Granite & Glass",
    glazing: "Triple Low-E Acoustic Thermal Glass",
    engineer: "B+S Ingenieure Geneva",
    epc: "Minergie-P Eco",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Low-profile cultural institute reflecting on Lake Geneva's shoreline with geothermal cooling.",
    brief: "An exploration of horizontal weight and lake reflection. Monolithic slabs of hand-dressed granite anchor the institution into the Swiss alpine water table."
  },
  {
    id: "zurich-monolith",
    title: "Zurichberg Monolith",
    category: "Commercial",
    location: "Zurich, Switzerland",
    year: "2024",
    gfa: "6,800 SQM",
    material: "Exposed Basalt Aggregate & White Oak",
    glazing: "Solar Integrated Photovoltaic Glass",
    engineer: "Schnetzer Puskas Ingenieure",
    epc: "Zero Carbon Gold",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Bespoke headquarters exploring brutalist precision and biophilic courtyards for private family office.",
    brief: "Combining raw monolithic basalt exterior envelopes with warm European white oak interiors to create an acoustic sanctuary in the center of financial Zurich."
  }
];

const DEFAULT_LEADS = [
  {
    name: "Julian Thorne",
    contact: "j.thorne@thornegroup.co.uk",
    phone: "+44 20 7946 0912",
    source: "Calculator",
    brief: "Residential Monograph • 2,500 SQM • High-Craft Monolithic Tier (Est. £11.5M–£14.2M)",
    date: "02 Oct 2026"
  },
  {
    name: "Camilla Sterling",
    contact: "c.sterling@vanguard-cap.com",
    phone: "+44 7700 900341",
    source: "Inquiry Modal",
    brief: "Mayfair Private Art Gallery • Approx 1,800 SQM • Diffused skylighting & bronze facade",
    date: "01 Oct 2026"
  },
  {
    name: "Marcus Vance",
    contact: "marcus@vancearchitecture.org",
    phone: "+44 7911 123456",
    source: "Briefing Download",
    brief: "Technical Briefing: Structural steel vs concrete cost trade-offs",
    date: "30 Sep 2026"
  },
  {
    name: "Dr. Arthur Pendelton",
    contact: "a.pendelton@stjohns-trust.org",
    phone: "+44 20 8123 4567",
    source: "Inquiry Modal",
    brief: "St. John's Wood Heritage Extension • Structural cantilever feasibility assessment",
    date: "29 Sep 2026"
  },
  {
    name: "Siddharth Rao",
    contact: "siddharth.rao@apex-infra.in",
    phone: "+91 98201 44556",
    source: "Calculator",
    brief: "Commercial Campus • 8,000 SQM • Monumental Bespoke Tier (Est. £45M+)",
    date: "28 Sep 2026"
  }
];

const DEFAULT_POSTS = [
  {
    id: "steel-vs-concrete",
    title: "Structural steel vs concrete: what actually drives cost",
    category: "Technical Analysis",
    isGated: true,
    leadsCount: 28,
    excerpt: "Cost, timeline, and durability trade-offs for mid-rise builds. When a client asks whether to frame in steel or concrete, the honest answer depends on more than material price per tonne.",
    fullContent: `When a client asks whether to frame in steel or concrete, the honest answer depends on far more than material price per tonne. Concrete offers inherent thermal mass, high fire resistance without secondary coatings, and monolithic acoustic separation. However, in dense urban sites like Mayfair or Kensington, crane hook time, formwork cycle speeds, and basement soil retention often tilt the economic balance toward hybrid prefabricated steel and post-tensioned floor decks. 
    
Our recent comparative analysis across three 2,500+ SQM London monograph builds indicates that post-tensioned concrete achieved a 14% lifecycle carbon reduction and superior vibration damping for private galleries, whilst steel reduced total on-site erection schedules by 11 weeks.`
  },
  {
    id: "permit-timelines",
    title: "Permit timelines and London planning shifts: 2026",
    category: "Planning & Municipal",
    isGated: false,
    leadsCount: 0,
    excerpt: "What has changed in local approval processes and what to plan for. Approval boards have shifted toward digital submissions, which cuts initial review time but adds a new pre-check stage.",
    fullContent: `Approval boards across Westminster, Camden, and Kensington & Chelsea have shifted toward rigorous digital BIM pre-checks. While initial automated validation screens schemes within 10 days, secondary conservation committees demand full embodied-carbon lifecycle audits (EN 15978) before validating full planning submissions. Early engagement with daylight-factor simulations and heritage stone provenance dossiers reduces overall determination delays by up to 4 months.`
  }
];

// State Manager
class HBZState {
  static getProjects() {
    const raw = localStorage.getItem("hbz_projects");
    return raw ? JSON.parse(raw) : DEFAULT_PROJECTS;
  }
  static saveProjects(projects) {
    localStorage.setItem("hbz_projects", JSON.stringify(projects));
  }
  static getLeads() {
    const raw = localStorage.getItem("hbz_leads");
    return raw ? JSON.parse(raw) : DEFAULT_LEADS;
  }
  static addLead(lead) {
    const leads = this.getLeads();
    leads.unshift(lead);
    localStorage.setItem("hbz_leads", JSON.stringify(leads));
  }
  static getPosts() {
    const raw = localStorage.getItem("hbz_posts");
    return raw ? JSON.parse(raw) : DEFAULT_POSTS;
  }
  static savePosts(posts) {
    localStorage.setItem("hbz_posts", JSON.stringify(posts));
  }
}

// ─────────────────────────────────────────────────────────────
// INITIALIZATION ON DOM READY
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initLiveClocks();
  initScrollDistanceTracker();
  initHeaderScrollBehavior();
  initMegaMenu();
  initSolarSimulator();
  initProjectsGrid();
  initProjectModal();
  initSpatialCalculator();
  initJournal();
  initConsultationModal();
  initAdminCMS();
  initBlueprintToggle();
});

// 1. Live Studio Clocks (London GMT & Zurich CET)
function initLiveClocks() {
  function update() {
    const now = new Date();
    
    // London GMT
    const lonHours = String(now.getUTCHours()).padStart(2, "0");
    const lonMins = String(now.getUTCMinutes()).padStart(2, "0");
    const lonTimeEl = document.getElementById("lon-time-display");
    if (lonTimeEl) lonTimeEl.textContent = `${lonHours}:${lonMins}`;

    // Zurich CET (UTC+1 or +2)
    const zurichDate = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Zurich" }));
    const zurHours = String(zurichDate.getHours()).padStart(2, "0");
    const zurMins = String(zurichDate.getMinutes()).padStart(2, "0");
    const zurTimeEl = document.getElementById("zur-time-display");
    if (zurTimeEl) zurTimeEl.textContent = `${zurHours}:${zurMins}`;
  }
  update();
  setInterval(update, 1000);
}

// 2. Thirdway Scroll Distance Meter ("You've scrolled X cm")
function initScrollDistanceTracker() {
  const scrollText = document.getElementById("scroll-cm-count");
  if (!scrollText) return;

  window.addEventListener("scroll", () => {
    // Standard screen CSS pixel to cm conversion (~37.8 px per cm)
    const scrolledPx = window.scrollY;
    const scrolledCm = Math.round(scrolledPx / 37.8);
    scrollText.textContent = `${scrolledCm} cm`;
  }, { passive: true });
}

// 3. Header Scroll Behavior (Sticky + Hide/Show on direction)
function initHeaderScrollBehavior() {
  const header = document.querySelector(".header-wrapper");
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (currentScrollY > 300 && currentScrollY > lastScrollY) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
}

// 4. Mega Menu / "Lately at HBZ" Overlay
function initMegaMenu() {
  const trigger = document.getElementById("btn-open-menu");
  const overlay = document.getElementById("mega-menu-overlay");
  const closeBtn = document.getElementById("btn-close-menu");
  const menuLinks = document.querySelectorAll(".mega-nav-item, .nav-link");

  if (!trigger || !overlay) return;

  function toggleMenu(show) {
    if (show) {
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    } else {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  trigger.addEventListener("click", () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) toggleMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      toggleMenu(false);
    }
  });

  menuLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

// 5. Interactive Solar Path & Colonnade CAD Simulator
function initSolarSimulator() {
  const slider = document.getElementById("solar-angle-slider");
  const angleLabel = document.getElementById("solar-angle-val");
  const lightRay = document.getElementById("cad-light-ray");
  const sunDisk = document.getElementById("cad-sun-disk");
  const shadowPillars = document.querySelectorAll(".cad-pillar-shadow");

  if (!slider) return;

  function updateSolarAngle(angle) {
    if (angleLabel) angleLabel.textContent = `${angle}°`;
    const rad = (angle * Math.PI) / 180;

    // Move sun disk along an arc
    const cx = 200 - Math.cos(rad) * 160;
    const cy = 200 - Math.sin(rad) * 160;
    if (sunDisk) {
      sunDisk.setAttribute("cx", cx);
      sunDisk.setAttribute("cy", cy);
    }

    // Adjust shadow length based on sun elevation angle
    const shadowLength = Math.max(10, Math.min(130, Math.round(80 / Math.tan(rad))));
    shadowPillars.forEach(p => {
      p.setAttribute("width", shadowLength);
      p.setAttribute("opacity", (0.3 + (angle / 100) * 0.5).toFixed(2));
    });
  }

  slider.addEventListener("input", (e) => {
    updateSolarAngle(e.target.value);
  });

  // Default angle 48°
  updateSolarAngle(slider.value || 48);
}

// 6. Selected Works Showcase & Filter
let currentActiveFilter = "All";

function initProjectsGrid() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  renderProjectsList();

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentActiveFilter = btn.getAttribute("data-category");
      renderProjectsList();
    });
  });
}

function renderProjectsList() {
  const container = document.getElementById("projects-grid-container");
  if (!container) return;

  const projects = HBZState.getProjects();
  const filtered = currentActiveFilter === "All" 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === currentActiveFilter.toLowerCase());

  container.innerHTML = filtered.map(p => `
    <article class="project-card" onclick="openProjectDetail('${p.id}')">
      <div class="project-image-box">
        <span class="project-badge-top number-pill dark">${p.category}</span>
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="project-body">
        <div>
          <h3 class="project-title">${p.title}</h3>
          <span class="project-sub">${p.location} • ${p.year}</span>
          <p class="project-brief">${p.summary}</p>
        </div>
        <div class="project-footer">
          <span class="number-pill">${p.gfa}</span>
          <span style="font-weight:600; font-size:12px; display:inline-flex; align-items:center; gap:4px;">
            Examine Scheme &rarr;
          </span>
        </div>
      </div>
    </article>
  `).join("");
}

// 7. Adaptive Project Detail Modal
let currentModalProjectIndex = 0;
let currentModalGalleryIndex = 0;

function initProjectModal() {
  const modal = document.getElementById("project-detail-modal");
  const closeBtn = document.getElementById("close-project-modal");
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
}

window.openProjectDetail = function(projectId) {
  const projects = HBZState.getProjects();
  const idx = projects.findIndex(p => p.id === projectId);
  if (idx === -1) return;

  currentModalProjectIndex = idx;
  currentModalGalleryIndex = 0;
  populateModalData();

  const modal = document.getElementById("project-detail-modal");
  if (modal) modal.classList.add("active");
};

function populateModalData() {
  const projects = HBZState.getProjects();
  const p = projects[currentModalProjectIndex];
  if (!p) return;

  document.getElementById("modal-proj-title").textContent = p.title;
  document.getElementById("modal-proj-meta").textContent = `${p.location} • Completed ${p.year} • ${p.category} • RIBA Nominee`;
  document.getElementById("modal-proj-brief").textContent = p.brief || p.summary;
  document.getElementById("modal-proj-gfa").textContent = p.gfa;
  document.getElementById("modal-proj-material").textContent = p.material;
  document.getElementById("modal-proj-glazing").textContent = p.glazing;
  document.getElementById("modal-proj-engineer").textContent = p.engineer;
  document.getElementById("modal-proj-epc").textContent = p.epc;

  updateModalPhoto();
}

function updateModalPhoto() {
  const projects = HBZState.getProjects();
  const p = projects[currentModalProjectIndex];
  if (!p) return;

  const gallery = p.gallery || [p.image];
  const total = gallery.length;
  if (currentModalGalleryIndex >= total) currentModalGalleryIndex = 0;
  if (currentModalGalleryIndex < 0) currentModalGalleryIndex = total - 1;

  const stageImg = document.getElementById("modal-stage-img");
  if (stageImg) stageImg.src = gallery[currentModalGalleryIndex];

  const counter = document.getElementById("modal-photo-counter");
  if (counter) {
    counter.textContent = `Photo ${String(currentModalGalleryIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }
}

window.prevModalPhoto = function() {
  currentModalGalleryIndex--;
  updateModalPhoto();
};

window.nextModalPhoto = function() {
  currentModalGalleryIndex++;
  updateModalPhoto();
};

window.prevSchemeAnchor = function() {
  const projects = HBZState.getProjects();
  currentModalProjectIndex = (currentModalProjectIndex - 1 + projects.length) % projects.length;
  currentModalGalleryIndex = 0;
  populateModalData();
};

// 8. Spatial Cost Calculator (Feasibility Module)
const COST_TIERS = {
  baseline: { label: "Baseline Architectural", rate: 3200, leadTime: 18 },
  monolithic: { label: "High-Craft Monolithic", rate: 4600, leadTime: 24 },
  bespoke: { label: "Monumental Bespoke", rate: 6400, leadTime: 32 }
};

const TYPOLOGY_FACTORS = {
  residential: 1.0,
  cultural: 1.25,
  commercial: 0.9,
  heritage: 1.35
};

let currentTier = "monolithic";

function initSpatialCalculator() {
  const typologySelect = document.getElementById("calc-typology");
  const areaSlider = document.getElementById("calc-area-slider");
  const areaBadge = document.getElementById("calc-area-badge");
  const tierCards = document.querySelectorAll(".tier-card");
  const quarryCheck = document.getElementById("calc-quarry-toggle");
  const passiveCheck = document.getElementById("calc-passive-toggle");
  const bookEstimateBtn = document.getElementById("btn-book-from-estimate");

  if (!areaSlider) return;

  function calculate() {
    const area = parseInt(areaSlider.value, 10);
    if (areaBadge) areaBadge.textContent = `${area.toLocaleString()} SQM`;

    const typology = typologySelect ? typologySelect.value : "residential";
    const typoFactor = TYPOLOGY_FACTORS[typology] || 1.0;
    const tierData = COST_TIERS[currentTier] || COST_TIERS.monolithic;

    let baseRate = tierData.rate * typoFactor;

    // Add multipliers for options
    if (quarryCheck && quarryCheck.checked) baseRate += 450;
    if (passiveCheck && passiveCheck.checked) baseRate += 380;

    const totalCost = area * baseRate;
    const lowerEstimate = Math.round((totalCost * 0.92) / 100000) / 10;
    const upperEstimate = Math.round((totalCost * 1.15) / 100000) / 10;

    // Display numbers
    const rangeDisplay = document.getElementById("calc-estimate-range");
    if (rangeDisplay) {
      rangeDisplay.textContent = `£${lowerEstimate.toFixed(1)}M – £${upperEstimate.toFixed(1)}M`;
    }

    const subMetric = document.getElementById("calc-sqm-rate-display");
    if (subMetric) {
      subMetric.textContent = `Indicative rate: £${Math.round(baseRate).toLocaleString()} / SQM • Est. Duration: ${tierData.leadTime} Mos`;
    }

    // Breakdown bars
    const barSub = document.getElementById("calc-bar-sub");
    const barSuper = document.getElementById("calc-bar-super");
    const barMech = document.getElementById("calc-bar-mech");
    if (barSub && barSuper && barMech) {
      barSub.style.width = "32%";
      barSuper.style.width = "46%";
      barMech.style.width = "22%";
    }
  }

  // Tier selection cards
  tierCards.forEach(card => {
    card.addEventListener("click", () => {
      tierCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      currentTier = card.getAttribute("data-tier");
      calculate();
    });
  });

  if (typologySelect) typologySelect.addEventListener("change", calculate);
  if (areaSlider) areaSlider.addEventListener("input", calculate);
  if (quarryCheck) quarryCheck.addEventListener("change", calculate);
  if (passiveCheck) passiveCheck.addEventListener("change", calculate);

  // Link to Consultation Modal with pre-filled feasibility numbers
  if (bookEstimateBtn) {
    bookEstimateBtn.addEventListener("click", () => {
      const area = areaSlider.value;
      const range = document.getElementById("calc-estimate-range").textContent;
      const typology = typologySelect.options[typologySelect.selectedIndex].text;
      const tier = COST_TIERS[currentTier].label;

      const briefText = `Feasibility Parameters: ${typology} • ${area} SQM • ${tier} • Indicative Budget Range: ${range}`;
      openConsultationModal(briefText, "Spatial Calculator");
    });
  }

  calculate();
}

// 9. Architectural Journal & Gated Article Reader
let activePostIdForGate = null;

function initJournal() {
  const container = document.getElementById("journal-grid-container");
  if (!container) return;

  const posts = HBZState.getPosts();

  container.innerHTML = posts.map(post => `
    <article class="journal-card">
      <div class="journal-thumb">
        <img src="${post.id === 'steel-vs-concrete' 
          ? 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=800&q=80' 
          : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}" alt="${post.title}" loading="lazy">
      </div>
      <div class="journal-body">
        <div>
          <div class="journal-header">
            <span class="number-pill">${post.category}</span>
            <span class="number-pill ${post.isGated ? 'dark' : ''}">
              ${post.isGated ? '🔒 Gated' : 'Open Read'}
            </span>
          </div>
          <h4 class="journal-title">${post.title}</h4>
          <p class="journal-excerpt">${post.excerpt}</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-line); padding-top:14px;">
          <span style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted);">
            ${post.isGated ? 'Technical Whitepaper' : 'Public Guidance'}
          </span>
          <button class="btn-thirdway" onclick="handleReadArticle('${post.id}')" style="padding:4px 8px 4px 14px; font-size:11px;">
            <span>Read Article</span>
            <span class="btn-arrow-circle" style="width:20px; height:20px;">
              <svg viewBox="0 0 11 8" fill="none"><path fill="currentColor" d="M11 4.007 6.887 8H4.545l3.482-3.2H0V3.215h8.027L4.529 0h2.342z"/></svg>
            </span>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  // Setup gated reader modal
  const gatedModal = document.getElementById("gated-reader-modal");
  const closeGated = document.getElementById("close-gated-modal");
  const gateForm = document.getElementById("gated-unlock-form");

  if (closeGated) closeGated.addEventListener("click", () => gatedModal.classList.remove("active"));
  if (gatedModal) {
    gatedModal.addEventListener("click", (e) => {
      if (e.target === gatedModal) gatedModal.classList.remove("active");
    });
  }

  if (gateForm) {
    gateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("gate-reader-name").value;
      const contact = document.getElementById("gate-reader-contact").value;

      // Add to leads
      HBZState.addLead({
        name: name,
        contact: contact,
        phone: contact,
        source: "Briefing Download",
        brief: `Technical Whitepaper: ${activePostIdForGate}`,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      });

      // Update leads count on post
      const posts = HBZState.getPosts();
      const p = posts.find(item => item.id === activePostIdForGate);
      if (p) {
        p.leadsCount = (p.leadsCount || 0) + 1;
        HBZState.savePosts(posts);
      }

      // Unlock content view
      document.getElementById("gated-form-wrapper").style.display = "none";
      document.getElementById("gated-full-content").style.display = "block";
      document.getElementById("gated-full-content").innerHTML = `
        <div style="background-color:var(--bg-subtle); padding:16px; border-radius:var(--radius-sm); margin-bottom:16px;">
          <strong style="color:#2fb36d; font-size:12px; font-family:var(--font-mono);">&check; Access Unlocked for ${name}</strong>
        </div>
        <p style="font-size:14px; line-height:1.7; color:var(--text-main);">${p ? p.fullContent : ''}</p>
      `;

      refreshAdminLeadsTable();
      refreshAdminPostsTable();
    });
  }
}

window.handleReadArticle = function(postId) {
  const posts = HBZState.getPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  activePostIdForGate = postId;
  const modal = document.getElementById("gated-reader-modal");
  document.getElementById("gated-modal-title").textContent = post.title;
  document.getElementById("gated-modal-teaser").textContent = post.excerpt;

  const formWrapper = document.getElementById("gated-form-wrapper");
  const fullContentWrapper = document.getElementById("gated-full-content");

  if (!post.isGated) {
    // Open article immediately
    formWrapper.style.display = "none";
    fullContentWrapper.style.display = "block";
    fullContentWrapper.innerHTML = `
      <p style="font-size:14px; line-height:1.7; color:var(--text-main); margin-top:16px;">${post.fullContent}</p>
    `;
  } else {
    // Show gate form
    formWrapper.style.display = "block";
    fullContentWrapper.style.display = "none";
  }

  if (modal) modal.classList.add("active");
};

// 10. Direct Consultation Modal ("Let's talk →")
function initConsultationModal() {
  const modal = document.getElementById("consultation-modal");
  const closeBtn = document.getElementById("close-consultation-modal");
  const form = document.getElementById("consultation-form");
  const openButtons = document.querySelectorAll(".btn-open-consultation");

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      openConsultationModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("consult-name").value;
      const contact = document.getElementById("consult-contact").value;
      const brief = document.getElementById("consult-brief").value;
      const source = document.getElementById("consult-source").value || "Inquiry Modal";

      HBZState.addLead({
        name: name,
        contact: contact,
        phone: contact,
        source: source,
        brief: brief,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      });

      // Show success feedback
      const body = document.getElementById("consult-modal-body");
      body.innerHTML = `
        <div style="text-align:center; padding:32px 16px;">
          <div style="width:48px; height:48px; border-radius:50%; background-color:#2fb36d; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:16px;">&check;</div>
          <h3 style="font-size:20px; margin-bottom:8px;">Inquiry Received</h3>
          <p style="color:var(--text-muted); font-size:13px; max-width:38ch; margin:0 auto 20px;">
            Thank you, ${name}. A Studio Director will contact you within 24 hours to review your monograph requirements.
          </p>
          <button class="btn-thirdway" onclick="document.getElementById('consultation-modal').classList.remove('active')">
            <span>Return to Studio Works</span>
          </button>
        </div>
      `;

      refreshAdminLeadsTable();
    });
  }
}

window.openConsultationModal = function(prefilledBrief = "", source = "Direct Consultation") {
  const modal = document.getElementById("consultation-modal");
  const briefField = document.getElementById("consult-brief");
  const sourceField = document.getElementById("consult-source");

  if (briefField && prefilledBrief) briefField.value = prefilledBrief;
  if (sourceField) sourceField.value = source;

  if (modal) modal.classList.add("active");
};

// 11. Studio Administration & CMS Portal
function initAdminCMS() {
  const tabs = document.querySelectorAll(".admin-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetView = tab.getAttribute("data-target");
      document.querySelectorAll(".admin-panel-view").forEach(v => v.classList.remove("active"));
      const view = document.getElementById(targetView);
      if (view) view.classList.add("active");
    });
  });

  // Projects Add Form
  const addProjForm = document.getElementById("admin-add-project-form");
  if (addProjForm) {
    addProjForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("new-proj-title").value;
      const category = document.getElementById("new-proj-category").value;
      const location = document.getElementById("new-proj-location").value;
      const gfa = document.getElementById("new-proj-gfa").value;
      const summary = document.getElementById("new-proj-summary").value;

      const projects = HBZState.getProjects();
      projects.unshift({
        id: "proj-" + Date.now(),
        title,
        category,
        location,
        year: "2026",
        gfa,
        material: "Cast Monolithic Basalt",
        glazing: "Triple-Glaze Low-E",
        engineer: "HBZ Engineering Consortium",
        epc: "A+ Passive Standard",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
        summary,
        brief: summary
      });

      HBZState.saveProjects(projects);
      renderProjectsList();
      refreshAdminProjectsTable();
      addProjForm.reset();
      alert(`Project "${title}" published to live portfolio.`);
    });
  }

  // Publish Journal Briefing Form
  const addPostForm = document.getElementById("admin-add-post-form");
  if (addPostForm) {
    addPostForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("new-post-title").value;
      const category = document.getElementById("new-post-category").value;
      const excerpt = document.getElementById("new-post-excerpt").value;
      const isGated = document.getElementById("new-post-access").value === "gated";

      const posts = HBZState.getPosts();
      posts.unshift({
        id: "post-" + Date.now(),
        title,
        category,
        isGated,
        leadsCount: 0,
        excerpt,
        fullContent: excerpt + "\n\nDetailed operational specification available via studio consultation."
      });

      HBZState.savePosts(posts);
      initJournal();
      refreshAdminPostsTable();
      addPostForm.reset();
      alert(`Briefing "${title}" published.`);
    });
  }

  refreshAdminProjectsTable();
  refreshAdminLeadsTable();
  refreshAdminPostsTable();

  // CSV Export Button
  const csvBtn = document.getElementById("btn-export-leads-csv");
  if (csvBtn) {
    csvBtn.addEventListener("click", () => {
      const leads = HBZState.getLeads();
      let csv = "Name,Contact,Source,Project Brief,Date\n";
      leads.forEach(l => {
        csv += `"${l.name}","${l.contact}","${l.source}","${(l.brief || '').replace(/"/g, '""')}","${l.date}"\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `hbz_client_leads_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

function refreshAdminProjectsTable() {
  const tbody = document.getElementById("admin-projects-tbody");
  if (!tbody) return;

  const projects = HBZState.getProjects();
  tbody.innerHTML = projects.map((p, index) => `
    <tr>
      <td><strong>${p.title}</strong></td>
      <td><span class="number-pill">${p.category}</span></td>
      <td>${p.location}</td>
      <td>${p.gfa}</td>
      <td>
        <button class="number-pill" onclick="deleteProject(${index})" style="color:#d9534f; cursor:pointer;">Delete</button>
      </td>
    </tr>
  `).join("");
}

window.deleteProject = function(index) {
  if (!confirm("Remove this project from the database?")) return;
  const projects = HBZState.getProjects();
  projects.splice(index, 1);
  HBZState.saveProjects(projects);
  renderProjectsList();
  refreshAdminProjectsTable();
};

function refreshAdminLeadsTable() {
  const tbody = document.getElementById("admin-leads-tbody");
  if (!tbody) return;

  const leads = HBZState.getLeads();
  tbody.innerHTML = leads.map(l => `
    <tr>
      <td><strong>${l.name}</strong></td>
      <td>
        ${l.contact}<br>
        <span style="font-size:11px; color:var(--text-muted);">${l.phone || ''}</span>
      </td>
      <td><span class="number-pill">${l.source}</span></td>
      <td style="max-width:320px; font-size:12px;">${l.brief}</td>
      <td style="font-family:var(--font-mono); font-size:11px;">${l.date}</td>
    </tr>
  `).join("");

  const counter = document.getElementById("leads-count-badge");
  if (counter) counter.textContent = `Client Leads (${leads.length})`;
}

function refreshAdminPostsTable() {
  const tbody = document.getElementById("admin-posts-tbody");
  if (!tbody) return;

  const posts = HBZState.getPosts();
  tbody.innerHTML = posts.map(post => `
    <tr>
      <td><strong>${post.title}</strong></td>
      <td><span class="number-pill">${post.category}</span></td>
      <td>
        <span class="number-pill ${post.isGated ? 'dark' : ''}">
          ${post.isGated ? '🔒 Gated' : 'Open'}
        </span>
      </td>
      <td><strong>${post.leadsCount || 0} leads</strong></td>
      <td>
        <button class="number-pill" style="cursor:pointer;" onclick="handleReadArticle('${post.id}')">View</button>
      </td>
    </tr>
  `).join("");
}

// 12. Blueprint / Wireframe Toggle
function initBlueprintToggle() {
  const toggleBtn = document.getElementById("btn-toggle-blueprint");
  if (!toggleBtn) return;

  let isBlueprint = false;
  toggleBtn.addEventListener("click", () => {
    isBlueprint = !isBlueprint;
    document.body.classList.toggle("blueprint-mode", isBlueprint);
    toggleBtn.classList.toggle("active", isBlueprint);
    toggleBtn.textContent = isBlueprint ? "[Blueprint Mode: ON]" : "[Wireframe Blueprint]";
  });
}

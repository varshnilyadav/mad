class MadNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav id="main-nav" class="navbar">
      <div class="nav-container">
        <a href="/" class="nav-logo" id="nav-logo">
          <span class="logo-mad">MAD</span>
          <span class="logo-divider"></span>
          <span class="logo-sub">AUTO DETAILING</span>
        </a>
        <ul class="nav-links" id="nav-links">
          <li class="nav-dropdown-parent" id="services-dropdown-parent">
            <a href="/services" class="nav-link nav-dropdown-trigger" id="services-dropdown-trigger" aria-haspopup="true" aria-expanded="false" style="text-decoration:none;">
              OUR SERVICES
              <svg class="dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="nav-dropdown" id="services-dropdown" role="menu">
              <a href="/services/car-wash" class="dropdown-item" role="menuitem">Car Wash</a>
              <a href="/services/car-detailing" class="dropdown-item" role="menuitem">Car Detailing</a>
              <a href="/services/ppf" class="dropdown-item" role="menuitem">Self-Healing PPF</a>
              <a href="/services/ceramic-coating" class="dropdown-item" role="menuitem">Ceramic Coating</a>
              <a href="/services/graphene-coating" class="dropdown-item" role="menuitem">10H Graphene Coating</a>
              <a href="/services/mechanical-services" class="dropdown-item" role="menuitem">Mechanical Services</a>
              <a href="/services/underbody-coating" class="dropdown-item" role="menuitem">Underbody Coating</a>
              <div class="dropdown-divider"></div>
              <a href="/services" class="dropdown-item" role="menuitem" style="color:var(--red);">View All Services &rarr;</a>
            </div>
          </li>
          <li><a href="/#trust" class="nav-link">About</a></li>
          <li><a href="/#contact" class="nav-link">Location</a></li>
          <li><a href="tel:+919493134501" class="nav-cta" id="nav-call-btn">
              <span class="cta-pulse"></span>
              Call Now
            </a></li>
        </ul>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    `;

    // Re-initialize nav scripts
    const navToggle = this.querySelector('#nav-toggle');
    const navLinks = this.querySelector('#nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      });
    }

    // Mobile dropdown toggle
    const dropdownTrigger = this.querySelector('#services-dropdown-trigger');
    const dropdownParent = this.querySelector('#services-dropdown-parent');
    
    if (dropdownTrigger && dropdownParent) {
      dropdownTrigger.addEventListener('click', (e) => {
        // Only prevent default on mobile sizes to allow dropdown toggle
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdownParent.classList.toggle('dropdown-open');
        }
      });
    }
  }
}

class MadFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer id="contact" class="footer-section">
      <div class="section-slash section-slash-top"></div>
      
      <div class="container">
        <div class="footer-grid">
          
          <div class="footer-info">
            <div class="footer-logo">
              <span class="logo-mad">MAD</span>
              <span class="logo-divider"></span>
              <span class="logo-sub">AUTO DETAILING STUDIO</span>
            </div>
            <p class="footer-desc">Hyderabad's leading auto detailing studio. We don't just wash cars; we protect and restore your investment with world-class graphene coatings, PPF, and obsessive attention to detail.</p>
            
            <div class="footer-contact-items">
              <div class="footer-contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span class="contact-label">Call Us</span>
                  <span class="contact-value">+91 94931 34501</span>
                </div>
              </div>
              
              <div class="footer-contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <span class="contact-label">Hours</span>
                  <span class="contact-value">7:00 AM - 9:00 PM (Everyday)</span>
                </div>
              </div>
              
              <div class="footer-contact-item">
                <div class="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span class="contact-label">Address</span>
                  <span class="contact-value">Plot No 21, Sainath Colony, Panama Godowns,<br />Vanasthalipuram, Hyderabad</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer-map">
            <div class="map-wrapper" id="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15234.331448842106!2d78.5683052!3d17.3399139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9f9337e62a7f%3A0x9ea16668b3f521a8!2sMAD%20AUTO%20DETAILING%20STUDIO!5e0!3m2!1sen!2sin!4v1713830000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style="border:0; filter: grayscale(1) invert(0.92) contrast(1.1);" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="MAD Auto Detailing Studio Location - Vanasthalipuram, Hyderabad"
              ></iframe>
              <div class="map-overlay-border"></div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2026 MAD Auto Detailing Studio. All Rights Reserved.</p>
          <p class="footer-seo">Best Car Detailing in Hyderabad | Ceramic Coating Vanasthalipuram | PPF Hyderabad</p>
          <p class="footer-credits" style="font-size: 11px; margin-top: 8px; color: var(--gray-muted);">Designed by <span class="text-red" style="font-weight: 600;">Varshnil</span></p>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define('mad-navbar', MadNavbar);
customElements.define('mad-footer', MadFooter);

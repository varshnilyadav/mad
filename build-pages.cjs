const fs = require('fs');
const path = require('path');

const services = [
  { id: 'car-wash', title: 'Car Wash', desc: 'Premium & Basic Wash options with PH-neutral soap.' },
  { id: 'car-detailing', title: 'Car Detailing', desc: 'Comprehensive interior and exterior detailing.' },
  { id: 'ppf', title: 'Self-Healing PPF', desc: '5+ Years Warranty invisible protection film.' },
  { id: 'ceramic-coating', title: 'Ceramic Coating', desc: 'Advanced hydrophobic protection for a lasting shine.' },
  { id: 'graphene-coating', title: '10H Graphene Coating', desc: 'Extreme hardness and heat resistance.' },
  { id: 'mechanical-services', title: 'Mechanical Services', desc: 'Expert tuning and mechanical maintenance.' },
  { id: 'underbody-coating', title: 'Underbody Coating', desc: 'Anti-corrosion protection for the chassis.' }
];

const template = (title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | MAD Auto Detailing</title>
  <link rel="stylesheet" href="/style.css" />
  <link rel="stylesheet" href="/lock.css" />
  <script src="/lock.js"></script>
  <script src="/components.js" defer></script>
</head>
<body>
  <mad-navbar></mad-navbar>
  
  <div style="padding-top: 100px; min-height: 80vh; background: var(--black);">
    <div class="container">
      ${body}
    </div>
  </div>

  <mad-footer></mad-footer>
  <script type="module" src="/main.js"></script>
</body>
</html>`;

// Create directories
fs.mkdirSync('services', { recursive: true });
services.forEach(s => fs.mkdirSync(path.join('services', s.id), { recursive: true }));

// 1. Write /services/index.html
const allServicesBody = `
  <div class="section-header" style="margin-top: 40px; text-align: center;">
    <span class="section-tag">OUR EXPERTISE</span>
    <h1 class="section-title">ALL <span class="text-red">SERVICES</span></h1>
  </div>
  <div class="services-grid" style="margin-top: 40px;">
    ${services.map(s => `
      <div class="service-card" style="padding: 30px; background: var(--black-card); border-radius: 8px; border: 1px solid var(--gray-border);">
        <h3 style="color: var(--white); font-size: 24px; margin-bottom: 10px; font-family: var(--font-display);">${s.title}</h3>
        <p style="color: var(--gray-muted); margin-bottom: 20px;">${s.desc}</p>
        <a href="/services/${s.id}/" class="btn btn-outline" style="width: 100%; text-align: center;">View Details</a>
      </div>
    `).join('')}
  </div>
`;
fs.writeFileSync('services/index.html', template('All Services', allServicesBody));

// 2. Write individual service pages
services.forEach(s => {
  const serviceBody = `
    <div style="max-width: 800px; margin: 0 auto; padding: 60px 0;">
      <a href="/services/" style="color: var(--red); text-decoration: none; font-size: 14px; margin-bottom: 20px; display: block;">&larr; Back to Services</a>
      <h1 class="section-title" style="font-size: 48px; margin-bottom: 20px;">${s.title.toUpperCase()}</h1>
      <p style="color: var(--gray-muted); font-size: 18px; line-height: 1.6; margin-bottom: 40px;">
        ${s.desc} Experience unparalleled quality and precision with our premium ${s.title.toLowerCase()} service at MAD Auto Detailing Studio.
      </p>
      
      <div style="background: var(--black-card); padding: 40px; border-radius: 8px; border: 1px solid var(--red); margin-bottom: 40px;">
        <h3 style="color: var(--white); font-size: 24px; margin-bottom: 20px; font-family: var(--font-display);">Why Choose Our ${s.title}?</h3>
        <ul style="color: var(--gray-light); line-height: 1.8; padding-left: 20px;">
          <li>Industry-leading premium products and tools.</li>
          <li>Expert technicians with years of hands-on experience.</li>
          <li>Uncompromised attention to every microscopic detail.</li>
          <li>Long-lasting results and protection for your vehicle.</li>
        </ul>
      </div>

      <div style="text-align: center;">
        <a href="/#booking" class="btn btn-primary btn-lg" style="display: inline-flex;">
          <span class="btn-glow"></span>
          Book This Service
        </a>
      </div>
    </div>
  `;
  fs.writeFileSync(path.join('services', s.id, 'index.html'), template(s.title, serviceBody));
});

console.log('Successfully built multi-page services architecture!');

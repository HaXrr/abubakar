const productLinks = [
  { label: 'Showroom Management', href: '/project/showroom-management' },
  { label: 'ISP Platform', href: '/project/internet-service-provider' },
  { label: 'Multiplayer Maze Game', href: '/project/maze-game' },
  { label: 'GSAP web animations', href: 'GSAP web animations' },
  { label: 'E-Commerce Solutions', href: 'e-commerce-solutions' },
]

const serviceLinks = [
  { label: 'Full Stack Development', href: '#contact' },
  { label: 'UI/UX Development', href: '#contact' },
  { label: 'API & Backend Development', href: '#contact' },
  { label: 'Custome Software Development', href: '#contact' },
  { label: 'Performance & Optimization', href: '#contact' },
]

const companyLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Bala', href: '#' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hazrr' },
  { label: 'Instagram', href: 'https://www.instagram.com/hazratabubakar/' },
  { label: 'Facebook', href: 'https://www.facebook.com/hazratabubakar/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@hazratabubakar' },
  { label: 'Github', href: 'https://github.com/HaXrr' },
  { label: 'X / Twitter', href: '#' },
]

const legalLinks = [
  { label: 'Made', href: '#' },
  { label: 'with', href: '#contact' },
  { label: '❤️', href: '#contact' },
  { label: '🍵', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="sf-footer">
      <div className="sf-top">
        <div className="sf-brand">
          <p className="sf-logo">Hazrat Abu Bakar</p>
          <p className="sf-tagline">
            Full Stack Software Engineer, Web animations and transitions experts, AI/ML Enthusiast.
          </p>
          <div className="sf-contact-block">
            <a href="mailto:hazratabubakar91@gmail.com" className="sf-contact-link">
              hazratabubakar92@
            </a>
            <p className="sf-kvk">PAK: +92 3139752421</p>
          </div>
        </div>

        <div className="sf-col">
          <p className="sf-col-label">site</p>
          <nav>
            {companyLinks.map((l) => (
              <a key={l.label} href={l.href} className="sf-link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="sf-col">
          <p className="sf-col-label">Products</p>
          <nav>
            {productLinks.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="sf-link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="sf-col">
          <p className="sf-col-label">Services</p>
          <nav>
            {serviceLinks.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="sf-link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="sf-col">
          <p className="sf-col-label">Social</p>
          <nav>
            {socialLinks.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="sf-link sf-social-link">
                {l.label} ↗
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="sf-bottom">
        <p className="sf-copy">© {year} hazrr. all rights reserved.</p>
        <div className="sf-legal">
          {legalLinks.map((l, i) => (
            <span key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="sf-legal-link">
                {l.label}
              </a>
              {i < legalLinks.length - 1 && <span className="sf-sep" aria-hidden>·</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

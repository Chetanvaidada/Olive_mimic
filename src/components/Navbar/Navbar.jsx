import OliveLogo from '../OliveLogo/OliveLogo';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Solutions', hasDropdown: true },
  { label: 'Features',  hasDropdown: false },
  { label: 'Pricing',   hasDropdown: false },
  { label: 'Blog',      hasDropdown: true },
  { label: 'Restaurants', hasDropdown: false },
  { label: 'Food',      hasDropdown: true },
];

const CaretIcon = () => (
  <svg className="navbar__caret" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="Main navigation">
    {/* Logo with white box */}
    <a href="/" className="navbar__logo-link" aria-label="Olive — home">
      <OliveLogo size={48} />
    </a>

    {/* Centre links */}
    <ul className="navbar__links">
      {NAV_LINKS.map(({ label, hasDropdown }) => (
        <li key={label}>
          <a href={`#${label.toLowerCase()}`}>
            {label}
            {hasDropdown && <CaretIcon />}
          </a>
        </li>
      ))}
    </ul>

    {/* Right actions */}
    <div className="navbar__actions">
      <a href="#signin" className="navbar__signin">Sign in</a>
      <a href="#get-olive" className="navbar__cta">
        Get Olive&nbsp;→
      </a>
    </div>
  </nav>
);

export default Navbar;

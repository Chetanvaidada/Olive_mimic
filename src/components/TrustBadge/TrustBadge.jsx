import './TrustBadge.css';

/* ── Real avatar images ── */
import person1 from '../../assets/Person_1.webp';
import person2 from '../../assets/Person_2.webp';
import person3 from '../../assets/Person_3.webp';
import person4 from '../../assets/Person_4.webp';

const AVATARS = [person4, person3, person2, person1];

const TrustBadge = () => (
  <div className="trust-badge">
    <div className="trust-badge__avatars" aria-hidden="true">
      {AVATARS.map((src, i) => (
        <div
          className="trust-badge__avatar"
          key={i}
          style={{ zIndex: AVATARS.length - i }}
        >
          <img src={src} alt="" className="trust-badge__avatar-img" />
        </div>
      ))}
      <div className="trust-badge__more">8k+</div>
    </div>
    <span>Trusted by thousands of healthy families</span>
  </div>
);

export default TrustBadge;

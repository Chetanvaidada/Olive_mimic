import { useState, useEffect, useRef } from 'react';
import './PhoneMockup.css';

/* ── Image imports ── */
import imgBread from '../../assets/Bread.webp';
import imgRaincoast from '../../assets/raincoast_strips.webp';
import imgPellegrino from '../../assets/pellegrini.webp';
import imgChips from '../../assets/sea_salt_vinegar_chips.webp';
import imgLarabar from '../../assets/larabar.webp';
import imgSour from '../../assets/sour_candies.webp';
import imgMilk from '../../assets/Raw_milk.webp';
import imgTortilla from '../../assets/Late_june_snacks.webp';

/* ── Product data ── */
const products = [
  {
    id: 1,
    name: 'Organic Bagels, Plain Awesome',
    brand: "Dave's Killer Bread",
    score: 72,
    scoreLabel: 'Good',
    scoreColor: '#e6a817',
    thumb: imgBread,
    oliverText: '"These bagels are a decent option with organic whole grains, but they contain some processed ingredients like refined sugars and preservatives that busy families should keep an eye on. Great for a quick breakfast, just pair with wholesome toppings!"',
    breakdown: { calories: 260, fat: 3.5, protein: 11, carbs: 49, fiber: 5, sugar: 5 },
  },
  {
    id: 2,
    name: 'Fig and Olive Crackers, Fig and Olive',
    brand: 'Lesley Stowe',
    score: 46,
    scoreLabel: 'Avoid',
    scoreColor: '#e53e3e',
    thumb: imgRaincoast,
    oliverText: '"This product\'s low score mainly comes from the processed sugars, like honey and brown sugar, which can impact your family\'s health when consumed frequently, especially for kids who are still developing. Additionally, there are several additives that aren\'t ideal for your goal of avoiding processed foods, making this a choice to consider more carefully."',
    breakdown: { calories: 140, fat: 5, protein: 2, carbs: 21, fiber: 1, sugar: 6 },
  },
  {
    id: 3,
    name: 'San Pellegrino Sparkling Water',
    brand: 'San Pellegrino',
    score: 95,
    scoreLabel: 'Excellent',
    scoreColor: '#38a169',
    thumb: imgPellegrino,
    oliverText: '"Excellent choice! Pure sparkling natural mineral water with no additives, sugars, or artificial ingredients. One of the cleanest beverage options you can choose for your family."',
    breakdown: { calories: 0, fat: 0, protein: 0, carbs: 0, fiber: 0, sugar: 0 },
  },
  {
    id: 4,
    name: 'Sea Salt & Vinegar Potato Crisps',
    brand: 'Kettle Brand',
    score: 52,
    scoreLabel: 'Fair',
    scoreColor: '#e6a817',
    thumb: imgChips,
    oliverText: '"While these chips use natural ingredients and sea salt, they are still fried and contain a significant amount of sodium and fat. Fine as an occasional snack but not something to include in your family\'s daily rotation."',
    breakdown: { calories: 150, fat: 9, protein: 2, carbs: 16, fiber: 1, sugar: 0 },
  },
  {
    id: 5,
    name: 'Chocolate Chip Cookie Dough Bar',
    brand: 'Larabar',
    score: 81,
    scoreLabel: 'Great',
    scoreColor: '#38a169',
    thumb: imgLarabar,
    oliverText: '"A solid snack choice made with minimal ingredients — dates, chocolate chips, and nuts. No added sugars or artificial preservatives. Great for kids\' lunchboxes and on-the-go families."',
    breakdown: { calories: 220, fat: 11, protein: 4, carbs: 28, fiber: 3, sugar: 18 },
  },
  {
    id: 6,
    name: 'Sourlittles',
    brand: 'SmartSweets',
    score: 62,
    scoreLabel: 'Moderate',
    scoreColor: '#e6a817',
    thumb: imgSour,
    oliverText: '"While marketed as a healthier candy alternative with less sugar, these still contain sugar alcohols and fibers that can cause digestive discomfort in children. Better than regular candy but consume in moderation."',
    breakdown: { calories: 80, fat: 0, protein: 0, carbs: 36, fiber: 12, sugar: 3 },
  },
  {
    id: 7,
    name: 'Grade A Raw Pure Jersey Milk',
    brand: 'Organic Valley',
    score: 91,
    scoreLabel: 'Excellent',
    scoreColor: '#38a169',
    thumb: imgMilk,
    oliverText: '"Outstanding choice for your family! Pure raw jersey milk from grass-fed cows with no hormones, antibiotics, or additives. Rich in natural vitamins and minerals."',
    breakdown: { calories: 150, fat: 8, protein: 8, carbs: 12, fiber: 0, sugar: 12 },
  },
  {
    id: 8,
    name: 'Thin & Crispy Organic Tortilla Chips',
    brand: 'Late July',
    score: 68,
    scoreLabel: 'Good',
    scoreColor: '#e6a817',
    thumb: imgTortilla,
    oliverText: '"Made with organic corn and sunflower oil, these are a cleaner snack option than most. However, they still have a moderate sodium content. Balance with wholesome dips like guacamole."',
    breakdown: { calories: 140, fat: 7, protein: 2, carbs: 18, fiber: 1, sugar: 0 },
  },
];

/* ── Breakdown bar config ── */
const BREAKDOWN_ITEMS = [
  { key: 'calories', label: 'Calories', unit: '', max: 300, color: '#e6a817' },
  { key: 'fat', label: 'Fat', unit: 'g', max: 20, color: '#e53e3e' },
  { key: 'protein', label: 'Protein', unit: 'g', max: 20, color: '#38a169' },
  { key: 'carbs', label: 'Carbs', unit: 'g', max: 50, color: '#4a90d9' },
  { key: 'fiber', label: 'Fiber', unit: 'g', max: 15, color: '#8b6fc0' },
  { key: 'sugar', label: 'Sugar', unit: 'g', max: 25, color: '#d97706' },
];

/* ── Icons ── */
const HeartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const OliverIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 26 43" fill="none" aria-hidden="true">
    <path d="M11.6445 7.9541C12.4104 9.378 12.8738 10.428 12.7638 12.295" stroke="#B47E54" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M25.1663 27.013C25.1663 35.827 22.081 42.973 12.599 42.973C3.118 42.973 0.032 35.827 0.032 27.013C0.032 18.199 7.696 12.359 12.599 12.359C17.503 12.359 25.1663 18.199 25.1663 27.013Z" fill="#AEB93E" />
    <path d="M22.2615 1.75C21.734 0.809 17.9 0.622 15.74 1.75C13.579 2.879 12.576 5.553 12.73 7.928C13.989 8.302 15.576 8.676 18.232 7.561C20.888 6.447 22.61 3.116 22.262 1.75Z" fill="#AEB93E" />
    <path d="M5.945 23.536C5.945 22.463 6.815 21.593 7.888 21.593C8.962 21.593 9.832 22.463 9.832 23.536V24.084C9.832 25.157 8.962 26.027 7.888 26.027C6.815 26.027 5.945 25.157 5.945 24.084V23.536Z" fill="#2D2D2D" />
    <path d="M15.365 23.536C15.365 22.463 16.235 21.593 17.308 21.593C18.381 21.593 19.251 22.463 19.251 23.536V24.084C19.251 25.157 18.381 26.027 17.308 26.027C16.235 26.027 15.365 25.157 15.365 24.084V23.536Z" fill="#2D2D2D" />
    <path d="M11.168 25.903C11.471 26.368 11.987 26.667 12.639 26.667C13.486 26.667 13.887 26.378 14.213 25.824" stroke="#2D2D2D" strokeWidth="0.73" strokeLinecap="round" />
  </svg>
);

/* ── Constants ── */
const ITEM_SIZE = 80;
const ITEM_GAP = 8;
const ITEM_TOTAL = ITEM_SIZE + ITEM_GAP;
const SLIDE_INTERVAL = 2800;

/* ── Main component ── */
const PhoneMockup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      // Phase 1: Fade out content AND move slider simultaneously
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev + 1) % products.length);

      // Phase 2: After slider finishes moving, update content and fade in
      setTimeout(() => {
        setDisplayIndex((prev) => (prev + 1) % products.length);
        setIsTransitioning(false);
      }, 700);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const activeProduct = products[displayIndex];
  const totalItems = products.length;
  const activeItemCenter = (totalItems + activeIndex) * ITEM_TOTAL + ITEM_SIZE / 2;
  const sliderOffset = -activeItemCenter;

  return (
    <div className="phone-section">
      <div className="phone-outer-frame">

        {/* Slider carousel — extends beyond phone edges */}
        <div className="phone-slider-viewport">
          <div className="phone-slider-mask">
            <div className="phone-slider-track-wrapper">
              <div
                className="phone-slider-track"
                ref={sliderRef}
                style={{ transform: `translateX(${sliderOffset}px) translateY(-50%)` }}
              >
                {[...products, ...products, ...products].map((product, i) => {
                  const realIndex = i % totalItems;
                  const isActive = realIndex === activeIndex;
                  return (
                    <div
                      key={`${product.id}-${i}`}
                      className={`phone-slider-item ${isActive ? 'phone-slider-item--active' : ''}`}
                      style={{
                        opacity: isActive ? 1 : 0.35,
                        transform: isActive ? 'scale(1.15)' : 'scale(0.82)',
                      }}
                    >
                      <img src={product.thumb} alt={product.name} className="phone-slider-img" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Phone inner frame */}
        <div className="phone-frame" role="img" aria-label="Olive app screenshot showing a food product scan">
          <div className="phone-frame__island"><div className="phone-frame__camera" /></div>
          <div className="phone-frame__dark-bg" />

          {/* Content panel — starts BELOW the slider area, overlaps with curved top */}
          <div className="phone-content-panel">
            <div className="phone-content-panel__handle" />
            {/* Text content — directly after carousel, no separate hero image */}
            <div className={`phone-content ${isTransitioning ? 'phone-content--transitioning' : ''}`}>
              <p className="phone-content__title">{activeProduct.name}</p>

              <div className="phone-content__meta">
                <div className="phone-content__thumb">
                  <img src={activeProduct.thumb} alt={activeProduct.brand} className="phone-content__thumb-img" />
                </div>
                <div className="phone-content__brand-info">
                  <span className="phone-content__author">{activeProduct.brand}</span>
                </div>
              </div>

              <div className="phone-content__score-row">
                <div className="score-badge">
                  <div className="score-badge__dot" style={{ backgroundColor: activeProduct.scoreColor }} />
                  <div>
                    <span className="score-badge__number">{activeProduct.score}/100</span>
                    <span className="score-badge__label">{activeProduct.scoreLabel}</span>
                  </div>
                </div>
                <div className="score-actions">
                  <button className="score-actions__btn" aria-label="Save product"><HeartIcon /></button>
                  <button className="score-actions__btn" aria-label="Share product"><ShareIcon /></button>
                </div>
              </div>

              <div className="phone-content__divider" />

              <div className="oliver-says">
                <div className="oliver-says__header">
                  <OliverIcon />
                  <span className="oliver-says__label">Oliver Says:</span>
                </div>
                <p className="oliver-says__text">{activeProduct.oliverText}</p>
              </div>

              <p className="phone-content__breakdown-title">Breakdown</p>
              <div className="phone-breakdown">
                {BREAKDOWN_ITEMS.map(({ key, label, unit, max, color }) => (
                  <div className="phone-breakdown__row" key={key}>
                    <span className="phone-breakdown__label">{label}</span>
                    <div className="phone-breakdown__bar-track">
                      <div
                        className="phone-breakdown__bar-fill"
                        style={{
                          width: `${Math.min((activeProduct.breakdown[key] / max) * 100, 100)}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                    <span className="phone-breakdown__value">{activeProduct.breakdown[key]}{unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;

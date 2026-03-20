import React, { useState } from "react";
import "./PosterSlider.css";

import poster1 from "../../assets/images/set_list.jpg";
import poster2 from "../../assets/images/poster_2_24.jpg";
import poster3 from "../../assets/images/poster_3_2.jpg";

function PosterSlider() {
  const images = [poster1, poster2, poster3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slide = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setCurrentIndex((prevIndex) =>
      (prevIndex + direction + images.length) % images.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 450);
  };

  return (
    <section id="home" className="home">
      <div className="overlay">
        <div className="home-skew-border">
          <div className="image-slider">
            <button
              type="button"
              className="slide-button left"
              onClick={() => slide(-1)}
            >
              ‹
            </button>

            <div className="slide-frame">
              <div
                className={`slide-track ${isAnimating ? "animating" : ""}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div className="slide-item" key={index}>
                    <img
                      src={image}
                      alt={`poster-${index + 1}`}
                      className="slide-image"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="slide-button right"
              onClick={() => slide(1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PosterSlider;
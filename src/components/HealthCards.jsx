import React, { useRef, useState, useEffect } from 'react';
import cardData from '../assets/CardData';
import './HealthCards.css';
import { leftarrowicon, rightarrowicon } from '../assets/imports';

const HealthCard = () => {
    const scrollRef = useRef(null);
    const [activeTitle, setActiveTitle] = useState(cardData[0].title); // Declare activeTitle state
    const [visibleCards, setVisibleCards] = useState([]);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === 'left') {
            current.scrollLeft -= 300;
        } else {
            current.scrollLeft += 300;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .map(entry => entry.target.getAttribute('data-id'));
                setVisibleCards(visible);
            },
            { threshold: 0.6 } // Trigger when 60% of the card is visible
        );

        const cards = document.querySelectorAll('.health-card');
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);


    return (
        <div className="health-card-container">
            <div className="health-card-header">
                <div className="health-card-header-line">
                    <h2 className="health-card-title1">How It Works</h2>
                    <p className="health-card-subtitle"><span>Lifestyle as medicine: </span> The six pillars</p>
                </div>
                <div className="health-card-arrows">
                    <img src={leftarrowicon} className="arrow-icon" onClick={() => scroll('left')} />
                    <img src={rightarrowicon} className="arrow-icon" onClick={() => scroll('right')} />
                </div>
            </div>

            <div className="health-card-titles">
                {cardData.map((card, index) => (
                    <button
                        key={index}
                        className={`health-card-title-button ${activeTitle === card.title ? 'active' : ''}`}
                        onClick={() => setActiveTitle(card.title)}
                    >
                        {card.title}
                    </button>
                ))}
            </div>

            <div className="health-card-list" ref={scrollRef}>
                {cardData.map((card) => (
                    <div
                        className={`health-card ${visibleCards.includes(card.id.toString()) ? 'visible' : ''}`}
                        key={card.id}
                        data-id={card.id}
                    >
                        <img src={card.image} alt={card.title} className="health-card-image" />
                        <div className="health-card-content">
                            <div className="health-card-metric">
                                <img src={card.metricicon} alt={card.title} />
                                {card.metric}
                                <span> {card.submetric}</span>
                            </div>
                            <h3 className="health-card-title">{card.title}</h3>
                            <p className="health-card-description">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthCard;

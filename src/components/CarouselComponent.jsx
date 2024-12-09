import React, { memo } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const CarouselComponent = memo(({ children }) => {
    const options = {
        loop: true,
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1100: {
                items: 3,
            },
            1400: {
                items: 4,
                loop: false,
            }
        }
    };

    const childrenArray = React.Children.toArray(children);

    return (
        <OwlCarousel className="owl-theme" {...options}>
            {childrenArray.map((child) => (
                <div key={child.id}>
                    {child}
                </div>
            ))}
        </OwlCarousel>
    );
});

export default CarouselComponent;

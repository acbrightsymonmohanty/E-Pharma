import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CarousalDetails } from "./CarousalDetails";
import { useNavigate } from "react-router-dom";


const handleDragStart = (e) => e.preventDefault();

const Carousal = () => {
    const navigate = useNavigate();
  const item = CarousalDetails.map((item) => (
    <img
      className="cursor-pointer w-100 mx-auto"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
    />
  );
};

export default Carousal;

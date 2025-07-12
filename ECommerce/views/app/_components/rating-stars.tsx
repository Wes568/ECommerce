import { Star, StarHalf, StarOff } from "lucide-react";
import React from "react";

interface RatingStarsProps {
  rating: number[];
}

const RatingStars = ({ rating }: RatingStarsProps) => {
  if (rating.length === 0) return <p>Sem avaliações ainda</p>;

  const sum = rating.reduce((acc, val) => acc + val, 0);
  const media = sum / rating.length;

  const fullStars = Math.floor(media);
  const midStars = media % 1 >= 0.5 ? 1 : 0;
  const emptyStart = 5 - fullStars - midStars;

  return (
    <div className="flex gap-2">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star color="gold" key={i} />
      ))}
      {midStars ? <StarHalf color="gold" key="mid" /> : null}
      {Array.from({ length: emptyStart }, (_, i) => (
        <StarOff color="red" key={i} />
      ))}
      <span title="Média de avaliações">({media})</span>
    </div>
  );
};

export default RatingStars;

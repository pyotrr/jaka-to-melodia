import React, { useMemo } from "react";
import { NUMBER_OF_LIVES } from "../../utils/contants";
import { HeartContainer } from "../../styles/components/ScoreWidget.styled";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

interface HeartsProps {
  numberOfLives: number;
  isGameEnded?: boolean;
}

const Hearts: React.FC<HeartsProps> = ({ numberOfLives, isGameEnded }) => {
  const lives = useMemo(
    () =>
      Array(NUMBER_OF_LIVES)
        .fill(false)
        .map((_, i) => i < numberOfLives),
    [numberOfLives]
  );

  return (
    <HeartContainer row gap={1} ended={isGameEnded}>
      {lives.map((isHeartFull, i) =>
        isHeartFull ? (
          <FaHeart key={i} />
        ) : (
          <FaHeartBroken key={i} opacity={0.5} />
        )
      )}
    </HeartContainer>
  );
};

export default Hearts;

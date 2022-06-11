import React, { useMemo } from "react";
import {
  ScoreWidgetStyled,
  HeartContainer,
} from "../../../styles/components/ScoreWidget.styled";
import Text from "../../../styles/Typography.styled";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { NUMBER_OF_LIVES } from "../../../utils/contants";

interface ScoreWidgetProps {
  score: number;
  songNumber: number;
  numberOfLives: number;
}

const ScoreWidget: React.FC<ScoreWidgetProps> = ({ score, numberOfLives }) => {
  const lives = useMemo(
    () =>
      Array(NUMBER_OF_LIVES)
        .fill(false)
        .map((_, i) => i < numberOfLives),
    [numberOfLives]
  );
  return (
    <ScoreWidgetStyled>
      <HeartContainer row gap={1}>
        {lives.map((isHeartFull, i) =>
          isHeartFull ? <FaHeart key={i} /> : <FaHeartBroken key={i} />
        )}
      </HeartContainer>
      <Text center secondary>
        score: {score}
      </Text>
    </ScoreWidgetStyled>
  );
};

export default React.memo(ScoreWidget);

import React, { useMemo } from "react";
import {
  HeartContainer,
  ScoreWidgetStyled,
  StatusEmoji,
} from "../../../styles/components/ScoreWidget.styled";
import Text from "../../../styles/Typography.styled";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { NUMBER_OF_LIVES } from "../../../utils/contants";
import { GameStatus } from "./index";

interface ScoreWidgetProps {
  score: number;
  songNumber: number;
  numberOfLives: number;
  gameStatus: GameStatus;
}

const GameStateWidget: React.FC<ScoreWidgetProps> = ({
  score,
  numberOfLives,
  gameStatus,
}) => {
  const lives = useMemo(
    () =>
      Array(NUMBER_OF_LIVES)
        .fill(false)
        .map((_, i) => i < numberOfLives),
    [numberOfLives]
  );
  const isEnded = useMemo(
    () => gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won,
    [gameStatus]
  );
  return (
    <ScoreWidgetStyled ended={isEnded}>
      <HeartContainer row gap={1} ended={isEnded}>
        {lives.map((isHeartFull, i) =>
          isHeartFull ? (
            <FaHeart key={i} />
          ) : (
            <FaHeartBroken key={i} opacity={0.5} />
          )
        )}
      </HeartContainer>
      <Text center secondary>
        score: {score}
      </Text>
      {isEnded && (
        <StatusEmoji>{gameStatus === GameStatus.Won ? "🥳" : "😪"}</StatusEmoji>
      )}
    </ScoreWidgetStyled>
  );
};

export default React.memo(GameStateWidget);

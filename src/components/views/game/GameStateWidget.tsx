import React, { useMemo } from "react";
import {
  ScoreWidgetStyled,
  StatusEmoji,
} from "../../../styles/components/ScoreWidget.styled";
import Text from "../../../styles/Typography.styled";
import { GameStatus } from "./index";
import Hearts from "../../ui/Hearts";

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
  const isEnded = useMemo(
    () => gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won,
    [gameStatus]
  );
  return (
    <ScoreWidgetStyled ended={isEnded}>
      <Hearts numberOfLives={numberOfLives} isGameEnded={isEnded} />
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

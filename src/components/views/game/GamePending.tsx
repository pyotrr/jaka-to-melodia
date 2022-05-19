import React, { useState } from "react";
import { CenteredContainer } from "../../../styles/Containers.styled";
import { PageTitle } from "../../../styles/Typography.styled";
import { Button } from "../../../styles/components/Button.styled";
import { ThreeTwoOne } from "../../../styles/views/Game.styled";
import Text from "../../../styles/Typography.styled";

interface GamePendingProps {
  startGame: () => void;
}

const GamePending: React.FC<GamePendingProps> = ({ startGame }) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <CenteredContainer>
      {!isReady ? (
        <>
          <PageTitle>Are you ready?</PageTitle>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsReady(true);
            }}
          >
            Start!
          </Button>
        </>
      ) : (
        <ThreeTwoOne>
          <Text onAnimationEnd={startGame}>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </ThreeTwoOne>
      )}
    </CenteredContainer>
  );
};

export default GamePending;

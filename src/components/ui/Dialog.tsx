import React, { ReactNode, useRef } from "react";
import {
  DialogBackground,
  DialogContent,
} from "../../styles/components/Dialog.styled";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import useKeyDown from "../../utils/hooks/useKeyDown";

interface DialogProps {
  children: ReactNode;
  closeDialog?: () => void;
}

const fadeOutKeyframes = [{ opacity: 1 }, { opacity: 0 }];

const Dialog: React.FC<DialogProps> = ({ children, closeDialog }) => {
  const dialogContentRef = useRef<HTMLDivElement | null>(null);
  const dialogBackgroundRef = useRef<HTMLDivElement | null>(null);

  const animateDialogOut = () => {
    if (!dialogBackgroundRef.current) return;
    const dialogBackgroundAnimation = dialogBackgroundRef.current.animate(
      fadeOutKeyframes,
      {
        iterations: 1,
        fill: "forwards",
        duration: 150,
      }
    );
    return dialogBackgroundAnimation.finished;
  };

  const animateAndCloseDialog = async () => {
    await animateDialogOut();
    closeDialog?.();
  };

  useKeyDown("Escape", () => {
    if (closeDialog) {
      animateAndCloseDialog();
    }
  });
  useOutsideClick(dialogContentRef, () => {
    if (closeDialog) {
      animateAndCloseDialog();
    }
  });

  return (
    <DialogBackground ref={dialogBackgroundRef}>
      <DialogContent ref={dialogContentRef}>{children}</DialogContent>
    </DialogBackground>
  );
};

export default Dialog;

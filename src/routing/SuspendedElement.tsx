import React, { Suspense } from "react";
import Loading from "../components/layout/Loading";

interface SuspendedElementProps {
  element: React.ReactNode;
}

const SuspendedElement: React.FC<SuspendedElementProps> = ({
  element,
}: SuspendedElementProps) => {
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export default SuspendedElement;

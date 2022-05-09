import React, { ReactNode, useCallback, useRef } from "react";
import { Container, ListContainer } from "../../../styles/Containers.styled";
import Loading from "../../layout/Loading";

interface InfiniteScrollProps {
  list: Array<any>;
  renderElement: (item: any) => ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoad: () => void;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  list,
  renderElement,
  hasMore,
  loading,
  onLoad,
}) => {
  const observer = useRef<null | IntersectionObserver>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoad();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading, onLoad]
  );

  return (
    <ListContainer>
      {list.map((item, index) => {
        if (index === list.length - 1) {
          return (
            <Container ref={lastElementRef} key={index}>
              {renderElement(item)}
            </Container>
          );
        } else {
          return <Container key={index}>{renderElement(item)}</Container>;
        }
      })}
      {loading && <Loading />}
    </ListContainer>
  );
};

export default InfiniteScroll;

import styled from "styled-components";

interface ThumbnailProps {
  size?: number;
}

const Thumbnail = styled.img<ThumbnailProps>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  min-width: ${(props) => `${props.size}px`};
  min-height: ${(props) => `${props.size}px`};
  object-fit: cover;
`;

Thumbnail.defaultProps = {
  size: 80,
};

export default Thumbnail;

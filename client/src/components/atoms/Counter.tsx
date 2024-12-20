import styled, { useTheme, DefaultTheme } from "styled-components";

type Props = {
  count: number;
  $bgColor?: string;
  $position?: string;
  className?: string; // Allow className prop
};

const StyledDiv = styled.div<Omit<Props, "count">>`
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  font-size: 0.7rem;
  border-radius: 50%;
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.buttonBg};
  color: ${({ theme }) => theme.text};
  transform: ${({ $position }) => $position || "translate(0, 0)"};
`;

const Counter = ({ count, $bgColor, $position, className }: Props) => {
  const theme = useTheme() as DefaultTheme;

  return (
    <StyledDiv
      className={className} // Pass className here
      $bgColor={$bgColor || theme.buttonBg}
      $position={$position}
    >
      {count}
    </StyledDiv>
  );
};

export default Counter;

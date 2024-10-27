import styled from "styled-components";

const StyledButton = styled.button<Props>`
  font-family: inherit;
  border: 1px solid transparent;
  font-size: ${({ $fontSize }) => $fontSize || "14px"};
  background-color: ${({ theme, $bgColor }) => $bgColor || theme.buttonBg};
  color: ${({ theme, $color }) => $color || theme.buttonText};
  padding: ${({ $padding }) => $padding || "10px 20px"};
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s;
  transition: border-color 0.25s;

  &:hover {
    background-color: ${({ theme, $bgColor }) =>
      $bgColor ? darkenColor($bgColor) : darkenColor(theme.buttonBg)};
    border-color: ${({ theme, $color }) => $color || theme.buttonText};
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

type Props = {
  $fontSize?: string;
  $bgColor?: string;
  $color?: string;
  $padding?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const darkenColor = (color: string) => {
  const colorCode = color.replace("#", "");
  let r = parseInt(colorCode.substring(0, 2), 16) - 20;
  let g = parseInt(colorCode.substring(2, 4), 16) - 20;
  let b = parseInt(colorCode.substring(4, 6), 16) - 20;
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const Button = ({
  children,
  $fontSize,
  $bgColor,
  $color,
  $padding,
  onClick,
}: Props) => {
  return (
    <StyledButton
      $fontSize={$fontSize}
      $bgColor={$bgColor}
      $color={$color}
      $padding={$padding}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

import styled, { useTheme } from "styled-components";
import Button from "../atoms/Button";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  z-index: 1000;
`;

const DialogBox = styled.div`
  background: white;
  padding: 20px;
  width: 300px;
  max-width: 80%;
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h2`
  margin-top: 0;
  color: ${({ theme }) => theme.accent};
`;

const Message = styled.p`
  margin: 20px 0;
`;

const Note = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.error};
  margin-top: -10px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

type Props = {
  title: string;
  message: React.ReactNode;
  note?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  visible: boolean;
};

const Dialog = ({
  title,
  message,
  note,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  visible,
}: Props) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Overlay>
      <DialogBox>
        <Title>{title}</Title>
        <Message>{message}</Message>
        {note && <Note>{note}</Note>}
        <ButtonContainer>
          <Button $bgColor={theme.error} className="delete" onClick={onConfirm}>
            {confirmLabel}
          </Button>
          {onCancel && <Button onClick={onCancel}>{cancelLabel}</Button>}
        </ButtonContainer>
      </DialogBox>
    </Overlay>
  );
};

export default Dialog;
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 100;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 10;
  transition: all 0.5s;
  cursor: pointer;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
};

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <>
      <Overlay onClick={close}></Overlay>
      <StyledModal>
        <Button onClick={close}>
          <AiOutlineClose />
        </Button>
        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

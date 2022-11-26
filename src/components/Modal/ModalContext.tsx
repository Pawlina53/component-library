import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
} from "react";
import { TModalReducer } from "./Modal.types";

const Component = ({ hideModal, showModal }) => <div></div>;

const ModalContext = createContext({
  component: Component,
  modalProps: {},
  showModal: () => {},
  hideModal: () => {},
});

const { Provider, Consumer: ModalConsumer } = ModalContext;

const reducer = (
  state: any,
  { type, component, displayName, modalProps }: TModalReducer
) => {
  if (type === "openModal") {
    const showIndex = state.modals
      .map((x: TModalReducer) => x.displayName)
      .indexOf(displayName);

    if (showIndex > -1 && state.modals[showIndex]) {
      const modals = [...state.modals];
      modals[showIndex].isActive = true;
      modals[showIndex].modalProps = modalProps;
      return { ...state, modals };
    }
    return {
      ...state,
      modals: [
        ...state.modals,
        ...[
          {
            displayName: displayName,
            isActive: true,
            component,
            modalProps,
          },
        ],
      ],
    };
  } else if (type === "hideModal") {
    const hideIndex = state.modals
      .map((x) => x.displayName)
      .indexOf(displayName);
    const modals = [...state.modals];
    if (hideIndex > -1 && state.modals[hideIndex]) {
      modals[hideIndex].isActive = false;
    }
    return { ...state, modals };
  } else {
    throw new Error("Unspecified action.");
  }
};

const ModalProvider = ({ children }: any) => {
  const initialState = {
    modals: [],
    showModal: (component: ReactElement, modalProps = {}) => {
      dispatch({ type: "openModal", component, modalProps });
    },
    hideModal: (displayName: string) => {
      dispatch({ type: "hideModal", displayName });
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={state}>
      {state.modals.map((modal) => {
        const Component = modal.component;
        return (
          Component && (
            <Component
              {...modal.modalProps}
              hideModal={() => state.hideModal(modal.component.displayName)}
              showModal={state.showModal}
              isActive={modal.isActive}
              key={modal.displayName}
            />
          )
        );
      })}
      {children}
    </Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalContext, ModalConsumer, ModalProvider, useModal };

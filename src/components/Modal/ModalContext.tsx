import React, { createContext, useContext, useReducer } from "react";
import {
  ActionType,
  TActionType,
  TInitialStateType,
  TModal,
} from "./Modal.types";

let initialState: TInitialStateType = {
  modalProps: {},
  modals: [],
  showModal: (
    component: React.ElementType,
    displayName: string,
    modalProps = {}
  ) => {},
  hideModal: (displayName: string) => {},
};

const ModalContext = createContext<TInitialStateType>(initialState);

const { Provider, Consumer: ModalConsumer } = ModalContext;

const reducer = (state: TInitialStateType, action: TActionType) => {
  const { type, displayName, component, modalProps } = action;
  if (type === ActionType.openModal) {
    const showIndex = state.modals
      .map((x: TModal) => x.displayName)
      .indexOf(displayName);

    if (showIndex > -1 && state.modals[showIndex]) {
      const modals = [...state.modals];
      modals[showIndex].isActive = true;
      modals[showIndex].displayName = displayName;
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
  } else if (type === ActionType.hideModal) {
    const hideIndex = state.modals
      .map((x: TModal) => x.displayName)
      .indexOf(displayName);
    const modals = [...state.modals];
    if (hideIndex > -1 && state.modals[hideIndex]) {
      modals[hideIndex].isActive = false;
    }
    return { ...state, modals };
  } else {
    throw new Error("Invalid action.");
  }
};

const ModalProvider = ({ children }: { children: React.ReactElement }) => {
  initialState = {
    modalProps: {},
    modals: [],
    showModal: (
      component: React.ElementType,
      displayName: string,
      modalProps = {}
    ) => {
      const showModal: TActionType = {
        type: ActionType.openModal,
        displayName,
        component,
        modalProps,
      };
      dispatch(showModal);
    },
    hideModal: (displayName: string) => {
      const hideModal: TActionType = {
        type: ActionType.hideModal,
        displayName,
      };
      dispatch(hideModal);
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={state}>
      {state.modals.map((modal: TModal) => {
        const Component: React.ElementType | undefined = modal.component;
        return (
          Component && (
            <Component
              {...modal.modalProps}
              hideModal={state.hideModal}
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

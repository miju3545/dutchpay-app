import { FC, ReactNode, createContext, useReducer, useCallback, useMemo, useContext } from 'react';
import { ThemeProvider } from 'next-themes';

export interface State {
  displaySidebar: boolean;
  displayDropdown: boolean;
  displayModal: boolean;
  sidebarView: string;
  modalView: string;
  userAvatar: string;
}

type ReturnState = State & {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfPresent: () => void;
  openDropdown: () => void;
  closeDropdown: () => void;
  openModal: () => void;
  closeModal: () => void;
  setSidebarView: (view: SIDEBAR_VIEWS) => void;
  setModalView: (view: MODAL_VIEWS) => void;
  setUserAvatar: (avatar: string) => void;
};

const initialState: State = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  sidebarView: 'EXPENSE_VIEW',
  modalView: 'CREATEGROUP_VIEW',
  userAvatar: '',
};

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'CREATEGROUP_VIEW' | 'ADDMEMBERS_VIEW';
type SIDEBAR_VIEWS = 'EXPENSE_VIEW' | 'CHECKOUT_VIEW' | 'PAYMENT_METHOD_VIEW';

type Action =
  | { type: 'OPEN_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'OPEN_DROPDOWN' }
  | { type: 'CLOSE_DROPDOWN' }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_SIDEBAR_VIEW'; view: SIDEBAR_VIEWS }
  | { type: 'SET_MODAL_VIEW'; view: MODAL_VIEWS }
  | { type: 'SET_USER_AVATAR'; avatar: string };

export const UIContext = createContext<ReturnState | null>(null);

UIContext.displayName = 'UIContext';

const uiReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return { ...state, displaySidebar: true };
    }
    case 'CLOSE_SIDEBAR': {
      return { ...state, displaySidebar: false };
    }
    case 'OPEN_DROPDOWN': {
      return { ...state, displayDropdown: true };
    }
    case 'CLOSE_DROPDOWN': {
      return { ...state, displayDropdown: false };
    }
    case 'OPEN_MODAL': {
      return { ...state, displayModal: true, displaySidebar: false };
    }
    case 'CLOSE_MODAL': {
      return { ...state, displayModal: false };
    }
    case 'SET_SIDEBAR_VIEW': {
      return { ...state, sidebarView: action.view };
    }
    case 'SET_MODAL_VIEW': {
      return { ...state, modalView: action.view };
    }
    case 'SET_USER_AVATAR': {
      return { ...state, userAvatar: action.avatar };
    }
    default:
      return state;
  }
};

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(() => dispatch({ type: 'OPEN_SIDEBAR' }), [dispatch]);
  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);
  const toggleSidebar = useCallback(
    () => (state.displaySidebar ? dispatch({ type: 'CLOSE_SIDEBAR' }) : dispatch({ type: 'OPEN_SIDEBAR' })),
    [dispatch, state.displaySidebar]
  );
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );

  const openDropdown = useCallback(() => dispatch({ type: 'OPEN_DROPDOWN' }), [dispatch]);
  const closeDropdown = useCallback(() => dispatch({ type: 'CLOSE_DROPDOWN' }), [dispatch]);

  const openModal = useCallback(() => dispatch({ type: 'OPEN_MODAL' }), [dispatch]);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), [dispatch]);

  const setUserAvatar = useCallback((avatar: string) => dispatch({ type: 'SET_USER_AVATAR', avatar }), [dispatch]);

  const setSidebarView = useCallback((view: SIDEBAR_VIEWS) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }), [dispatch]);
  const setModalView = useCallback((view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }), [dispatch]);

  const value: ReturnState = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) throw new Error('useUI must be used within a UIProvider.');
  return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);

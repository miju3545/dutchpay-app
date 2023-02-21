import { FC, ReactNode, createContext, useReducer, useCallback, useMemo, useContext } from 'react';

export interface State {
  groupName: string;
  // members?: string[];
}

export interface User {
  id: number;
  nickname: string;
}

type ReturnState = State & {
  saveGroupName: (name: string) => void;
  // addMember: (name: string) => void;
  // removeMember: (name: string) => void;
};

const initialState: State = {
  groupName: '',
};

type Action = { type: 'SAVE_GROUP_NAME'; name: string };
// | { type: 'ADD_MEMBER'; name: string }
// | { type: 'REMOVE_MEMBER'; name: string };

export const GroupContext = createContext<ReturnState | null>(null);

GroupContext.displayName = 'GroupContext';

const groupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SAVE_GROUP_NAME': {
      return { ...state, groupName: action.name };
    }

    // case 'ADD_MEMBER': {
    //   return { ...state, members: [...state.members, action.name] };
    // }

    default:
      return state;
  }
};

export const GroupProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(groupReducer, initialState);

  const saveGroupName = useCallback((name: string) => dispatch({ type: 'SAVE_GROUP_NAME', name }), [dispatch]);

  const value: ReturnState = useMemo(
    () => ({
      ...state,
      saveGroupName,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <GroupContext.Provider value={value} {...props} />;
};

export const useGroup = () => {
  const context = useContext(GroupContext);

  if (!context) throw new Error('useGroup must be used within a GroupProvider.');
  return context;
};

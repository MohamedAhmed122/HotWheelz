import storage from '@react-native-async-storage/async-storage';
import {create, StoreApi} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {AuthSlice, createAuthSlice} from './authSlice';

// zustand store
export type StoreState = AuthSlice;

const zustandStorage = {
  setItem: (name: string, value: any) => {
    return storage.setItem(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getItem(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return storage.removeItem(name);
  },
};
export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;

const keysToExclude = ['cities'];

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get),
    }),
    {
      name: 'student_app_store',
      storage: createJSONStorage(() => zustandStorage),
      version: 2,
      partialize: state => {
        // Filter out the excluded keys
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !keysToExclude.includes(key)),
        );
      },

      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // if the stored value is in version 0, we rename the field to the new name
          persistedState.newField = persistedState.oldField;
          delete persistedState.oldField;
        }

        return persistedState;
      },
    },
  ),
);
export default useStore;

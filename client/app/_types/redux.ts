import store from '../redux/store';

export type ReduxRootState = ReturnType<typeof store.getState>;

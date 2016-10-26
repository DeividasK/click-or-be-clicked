import store from '../store';

export function modalOpen(callback) {
  store.dispatch({ type: 'MODAL_OPEN', payload: callback });
}

export function modalClose() {
  store.dispatch({ type: 'MODAL_CLOSE' });
}
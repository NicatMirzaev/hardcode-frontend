import store from 'store';

export const setValue = (name, value) => store.set(name, value);

export const getValue = name => store.get(name);
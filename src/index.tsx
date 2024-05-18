import { createStore } from 'redux';
import { render } from './ui/react';

const r = (s) => s;
const store = createStore(r, {});
render(store);

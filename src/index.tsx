import { render } from './ui/react';
import { configureStore } from './store/init/index.dev';

const store = configureStore({});
render(store);

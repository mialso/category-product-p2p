import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Store } from 'redux';
import { Provider } from 'react-redux';

import { App } from './component/app';

export function render(store: Store) {
    // @ts-expect-error doesn't matter for now
    const root = createRoot(document.getElementById('app-root'));
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
}

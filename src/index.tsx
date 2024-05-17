import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    const [hasPear, setPear] = useState(false);

    const onClick = () => setPear(true);

    return (
        <h1 onClick={onClick}>
            {hasPear ? '🍐' : 'category-product-p2p XXX'}
        </h1>
    );
}

// @ts-expect-error doesn't matter for now
const root = createRoot(document.getElementById('app-root'));
root.render(<App />);

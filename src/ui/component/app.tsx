import React from 'react';
import { CategoryEditor } from './category/input';
import { Modal } from './modal';
import { ProgressBar, UnseenError } from './common';
import { ProductEditor } from './content';
import { CategoryProductView } from './view/category-product';
import { ViewPicker } from './view/picker';
import { ViewSwitch } from './view/switch';
import { CATEGORY_PRODUCT_VIEW } from '../model/view/constant';

import './app.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App = () => (
    <div className="App">
        <div className="App-Notification">
            <ProgressBar />
            <UnseenError />
        </div>
        <div className="App-TopMenu">
            <ViewPicker />
        </div>
        <div className="App-Content">
            <ViewSwitch
                views={{
                    [CATEGORY_PRODUCT_VIEW]: CategoryProductView,
                }}
            />
        </div>
        <Modal>
            <CategoryEditor />
            <ProductEditor />
        </Modal>
    </div>
);

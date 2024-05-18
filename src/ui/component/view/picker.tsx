import React from 'react';
import { connect } from 'react-redux';
import { viewIds, viewCurrentId, viewName } from '../../model/view/selector';
import { setView } from '../../model/view/action';

import './picker.css';

export const ViewButtonRaw = ({ name, onClick, isDisabled }) => (
    <button type="button" onClick={onClick} disabled={isDisabled}>{name}</button>
);

export const ViewButton = connect(
    // @ts-expect-error TODO later
    (state, { id }) => ({
        name: viewName(id)(state),
        isDisabled: viewCurrentId(state) === id,
    }),
    // @ts-expect-error TODO later
    (dispatch, { id }) => ({
        onClick: () => dispatch(setView(id)),
    }),
)(ViewButtonRaw);

export const ViewPickerRaw = ({ ids }) => (
    <div className="ViewPicker">
        {/* @ts-expect-error TODO later */}
        {ids.map((id) => <ViewButton key={id} id={id} />)}
    </div>
);

export const ViewPicker = connect(
    (state) => ({
        ids: viewIds(state),
    }),
)(ViewPickerRaw);

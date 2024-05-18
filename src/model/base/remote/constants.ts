// remote data status
export const NOT_ASKED = 'NOT_ASKED';
export const ASKED = 'ASKED';
export const LOADING = 'LOADING';
export const READY = 'READY';
export const ERROR = 'ERROR';

export type DataStatus =
    typeof NOT_ASKED |
    typeof ASKED |
    typeof LOADING |
    typeof READY |
    typeof ERROR;

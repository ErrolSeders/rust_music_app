/* tslint:disable */
/* eslint-disable */
/**
* @param {number} n
* @returns {number}
*/
export function fibonnaci(n: number): number;
/**
* @param {Uint8Array} notes_on
* @returns {number}
*/
export function get_scalenum(notes_on: Uint8Array): number;
/**
* @param {number} scalenum
* @returns {string}
*/
export function get_scalename(scalenum: number): string;
/**
* @param {number} scalenum
* @returns {Uint16Array}
*/
export function build_pitchclassset(scalenum: number): Uint16Array;
/**
* @param {Uint16Array} pitchclassset
* @returns {Uint16Array}
*/
export function build_intervals(pitchclassset: Uint16Array): Uint16Array;
/**
* @param {string} quality
* @param {number} tonic
* @param {Uint16Array} pitchclassset
* @returns {Uint32Array}
*/
export function get_chord_in_scale(quality: string, tonic: number, pitchclassset: Uint16Array): Uint32Array;

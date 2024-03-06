import * as wasm from "./scalesite_api_bg.wasm";
import { __wbg_set_wasm } from "./scalesite_api_bg.js";
__wbg_set_wasm(wasm);
export * from "./scalesite_api_bg.js";

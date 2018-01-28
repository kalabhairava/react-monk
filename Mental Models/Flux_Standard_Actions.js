/**
 * Original Link => https://github.com/acdlite/flux-standard-action/blob/master/README.md
 *
 * An action MUST be a plan JS object and have 'type' property.
 *
 * An action may:
 *  have an error property.
 *  have a payload property.
 *  have a meta property.
 *
 * An action MUST NOT include properties other than type, payload, error, and meta
 */
import { isPlainObject, isString } from "lodash";

export function isFSA(action) {
  return (
    isPlainObject(action) &&
    isString(action.type) &&
    Object.keys(action).every(isValidKey)
  );
}

export function isError(action) {
  return isFSA(action) && action.error === true;
}

function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}

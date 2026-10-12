const STORAGE_PREFIX = "github-achievement-hunt:";

function getStorageKey(key) {
  if (typeof key !== "string" || key.trim() === "") {
    throw new TypeError("A non-empty storage key is required.");
  }

  return `${STORAGE_PREFIX}${key.trim()}`;
}

/**
 * Read locally stored, non-sensitive JSON. Malformed data raises a clear error
 * without exposing the stored contents or silently replacing them.
 */
export function readStoredValue(key) {
  const storageKey = getStorageKey(key);
  const storedValue = window.localStorage.getItem(storageKey);

  if (storedValue === null) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch (cause) {
    const error = new Error(`Stored progress for "${key}" is not valid JSON.`);
    error.cause = cause;
    throw error;
  }
}

/** Store non-sensitive JSON data in this browser only. */
export function writeStoredValue(key, value) {
  const storageKey = getStorageKey(key);
  const serializedValue = JSON.stringify(value);

  if (serializedValue === undefined) {
    throw new TypeError("The value cannot be represented as JSON.");
  }

  window.localStorage.setItem(storageKey, serializedValue);
}

/** Remove one value stored by this application. */
export function removeStoredValue(key) {
  window.localStorage.removeItem(getStorageKey(key));
}

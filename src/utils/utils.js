/**
 * Safe object extension utility that uses Object.assign instead of util._extend
 * @param {Object} target - The target object to extend
 * @param {...Object} sources - The source objects to copy properties from
 * @returns {Object} - The extended object
 */
export const extendObject = (target, ...sources) => {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object.assign(target, ...sources);
};

/**
 * Deep clone an object without using deprecated methods
 * @param {Object} obj - The object to clone
 * @returns {Object} - A deep clone of the object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
  );
};

/**
 * Safely merge multiple objects
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - Merged object
 */
export const mergeObjects = (...objects) => {
  return objects.reduce((merged, obj) => {
    if (obj === null || obj === undefined) {
      return merged;
    }
    return Object.assign({}, merged, obj);
  }, {});
}; 
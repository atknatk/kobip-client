import { isNullOrUndefined } from 'util';

export function forEachSync(items: any, callback: (v: any, k: string | number) => void) {
  if (isNullOrUndefined(callback)) {
    throw Error('callback function is undefined');
  }
  if (isNullOrUndefined(items)) {
    return;
  }
  if (items instanceof Array) {
    for (let i = 0; i < items.length; i++) {
      callback(items[i], i);
    }
  } else if (typeof items === 'object') {
    for (const item of items) {
      callback(items[item], item);
    }
  }
}

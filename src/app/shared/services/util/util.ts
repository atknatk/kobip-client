import { Injectable } from '@angular/core';
import { KbStorageService } from '../storage/storage.service';
import { kobipConfig } from '../../kobip.config';
import { KbAuthUser } from '../../../model/auth-user';

declare const $: any;

export function deepCopy(value: {}): {} {
  return $.extend(true, {}, value);
}

export function deepCopyArray(value: any[]): any[] {
  return $.extend(true, [], value);
}


export function sortBy(array, options) {
  const _defaults = {
    parser: (x) => x,
    desc: false
  };

  const isObject = (o) => o !== null && typeof o === 'object';
  const isDefined = (v) => typeof v !== 'undefined';

  function getItem(x) {
    const isProp = isObject(x) && isDefined(x[this.prop]);
    return this.parser(isProp ? x[this.prop] : x);
  }

  if (!(array instanceof Array) || !array.length) {
    return [];
  }
  const opt = Object.assign({}, _defaults, options);
  opt.desc = opt.desc ? -1 : 1;
  return array.sort(function (a, b) {
    a = getItem.call(opt, a);
    b = getItem.call(opt, b);
    return opt.desc * (a < b ? -1 : +(a > b));
  });
}


export function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

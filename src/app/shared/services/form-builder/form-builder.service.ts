import { Injectable } from '@angular/core';
import { IFormBuilderOptions } from './form-builder-options';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ngFormBuilderStore } from './form-builder-store';

@Injectable()
export class KbFormBuilder {

  static baseTypes = ['String', 'Number', 'Boolean'];

  constructor(private _fb: FormBuilder) {
  }

  get formBuilder() {
    return this._fb;
  }

  static dec(obj?: IFormBuilderOptions) {
    return function (target: any, key: string) {
      const t = Reflect['getMetadata']('design:type', target, key),
        cn = target.constructor.name;

      let toSet = obj;

      if (typeof t.name === 'string' && KbFormBuilder.baseTypes.indexOf(t.name) === -1) {
        /*if (t.name === 'Array') {

        }*/
        toSet = t.name;
      }
      if (ngFormBuilderStore[cn]) {
        ngFormBuilderStore[cn][key] = toSet;
      } else {
        ngFormBuilderStore[cn] = {[key]: toSet};
      }
    };
  }

  createForm(cls: Object): FormGroup {
    return this._fb.group(this.buildFb(ngFormBuilderStore[cls.constructor.name], cls));
  }

  private _setValue(fromStore: IFormBuilderOptions, originalObject: Object): any {
    let toReturn = fromStore.initial;
    if (originalObject) {
      toReturn = Array.isArray(fromStore.initial) ? [originalObject, ...fromStore.initial.slice(1)] : originalObject;
    }
    return toReturn;
  }

  private buildFb(objFromStore: Object, originalObj: Object): Object {
    const final: any = {};
    for (const key in objFromStore) {
      if (objFromStore.hasOwnProperty(key)) {
        if (typeof objFromStore[key] === 'string') {
          if (objFromStore[key] === 'Array') {
            final[key] = this._fb.array([this.buildFb(ngFormBuilderStore[objFromStore[key]], originalObj[key])]);
          } else {
            final[key] = this._fb.group(this.buildFb(ngFormBuilderStore[objFromStore[key]], originalObj[key]));
          }
        } else {
          final[key] = this._setValue(objFromStore[key], originalObj[key]);
        }
      }
    }
    return final;
  }
}

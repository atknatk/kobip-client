import { KbLoadingBase } from '../../../components/loading/loading.base';
import { isNullOrUndefined } from 'util';

export interface IKbEnumConfig {
  addSelect?: boolean;
  useTranslate?: boolean;

  [key: string]: boolean | undefined;
}

export class KbEnumConfig implements IKbEnumConfig {
  addSelect?: boolean;
  useTranslate?: boolean;
  [key: string]: boolean | undefined;

  constructor(config: IKbEnumConfig = {}) {
    if (isNullOrUndefined(config.addSelect)) {
      this.addSelect = false;
    } else {
      this.addSelect = config.addSelect;
    }

    if (isNullOrUndefined(config.useTranslate)) {
      this.useTranslate = false;
    } else {
      this.useTranslate = config.useTranslate;
    }
  }
}


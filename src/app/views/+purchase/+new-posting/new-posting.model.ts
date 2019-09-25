import { KbFormBuilder } from '../../../shared/services/form-builder/form-builder.service';

export class PostingInfoModel {

  @KbFormBuilder.dec({initial: 0})
  id?: number;

  @KbFormBuilder.dec({initial: 0})
  amount?: number;

  @KbFormBuilder.dec({initial: null})
  idUnit?: string;

  @KbFormBuilder.dec({initial: 0})

  @KbFormBuilder.dec({initial: null})
  idDeliveryDuration?: string;

  @KbFormBuilder.dec({initial: 0})
  timeInterval?: number;

  @KbFormBuilder.dec({initial: null})
  idTimeName?: string;

  @KbFormBuilder.dec({initial: null})
  deliveryDate?: string;

  @KbFormBuilder.dec({initial: null})
  expiredAt?: string;

  @KbFormBuilder.dec({initial: false})
  isShowHasPartnership?: boolean;

  @KbFormBuilder.dec({initial: false})
  isOfferMandatory?: boolean;

  @KbFormBuilder.dec({initial: 0})
  idPostingAssignee?: number;

  @KbFormBuilder.dec({initial: null})
  companyProductCode?: string;

  @KbFormBuilder.dec({initial: null})
  postingNo?: string;

  @KbFormBuilder.dec({initial: false})
  isCompleted?: boolean;

  @KbFormBuilder.dec({initial: false})
  isAccepted?: boolean;

  @KbFormBuilder.dec({initial: false})
  isCancelled?: boolean;

  @KbFormBuilder.dec({initial: false})
  isExpired?: boolean;

  @KbFormBuilder.dec({initial: false})
  isKbCancelled?: boolean;

  @KbFormBuilder.dec({initial: 0})
  viewCount?: number;

  @KbFormBuilder.dec({initial: 0})
  offerCount?: number;

  @KbFormBuilder.dec({initial: 1})
  minimumTokenRequired?: number;

  // @KbFormBuilder.dec({initial: null})
  postingDetailList?: PostingDetailModel[];

  // @KbFormBuilder.dec({initial: null})
  postingInfoCountryList ?: string[];

  // @KbFormBuilder.dec({initial: null})
  postingInfoDeliveryTypeList ?: string[];

  // @KbFormBuilder.dec({initial: null})
  postingInfoTransportationTypeList ?: string[];

  // @KbFormBuilder.dec({initial: null})
  postingBrandList ?: PostingBrandModel[];
}

export class PostingDetailModel {

  @KbFormBuilder.dec({initial: 0})
  id?: number;

  @KbFormBuilder.dec({initial: 0})
  idPostingInfo?: number;

  @KbFormBuilder.dec({initial: null})
  idLanguage?: string;

  @KbFormBuilder.dec({initial: null})
  postingDescription?: string;

  @KbFormBuilder.dec({initial: null})
  postingTitle?: string;

  @KbFormBuilder.dec({initial: null})
  deliveryNote?: string;
}

export class PostingBrandModel {
  @KbFormBuilder.dec({initial: 0})
  id?: number;

  @KbFormBuilder.dec({initial: 0})
  ídPostingInfo?: number;

  @KbFormBuilder.dec({initial: null})
  brand?: string;

  @KbFormBuilder.dec({initial: null})
  model?: string;

  @KbFormBuilder.dec({initial: null})
  orderCode?: string;
}



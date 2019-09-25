export class PostingPagingModel {
  categoryList: number[];
  countryList: string[];
  minPiece: number;
  pattern: string;
  isAmountOrder: boolean;
  isDeadlineOrder: boolean;
  onlyShowPartnerPosting: boolean;
  showBlockedPosting: boolean;
  limit: number;
  offset: number;
}

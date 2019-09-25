import { NgModule } from '@angular/core';
import { CompletedPostingModule } from './+completed-posting/completed-posting.module';
import { DraftPostingModule } from './+draft-posting/draft-posting.module';
import { ListPostingModule } from './+list-posting/list-posting.module';
import { NewPostingModule } from './+new-posting/new-posting.module';
import { purchaseRouting } from './purchase.router';
import { NewPostingGeneralComponent } from './+new-posting/new-posting-general/new-posting-general.component';
import { NewPostingDeliveryComponent } from './+new-posting/new-posting-delivery/new-posting-delivery.component';


const modules = [
  CompletedPostingModule,
  DraftPostingModule,
  ListPostingModule,
  NewPostingModule,
  purchaseRouting
];

@NgModule({
  imports: [...modules]
})

export class PurchaseModule {
}

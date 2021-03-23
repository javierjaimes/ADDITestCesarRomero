import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/services/core.service';

import { Lead } from '../../entities/user.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  public leads: Lead[];
  public subscription: Subscription;
  public showModal: boolean = false;
  public idUpdate: string;

  constructor(
    public core: CoreService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllLeads();
  }

  public getAllLeads(): void {
    this.subscription = this.core.getLeads().subscribe(leads => {
      this.leads = leads;
    });
  }

  public createLead(): void {
    this.idUpdate = null;
    this.showModal = !this.showModal;
    this.isScroll();
  }

  public updateLead(event): void {
    this.showModal = !this.showModal;
    this.idUpdate = event;
    this.isScroll();
  }

  public refreshList(): void {
    this.getAllLeads();
  }

  public updateList(): void {
    this.showModal = !this.showModal;
    this.isScroll();
    this.refreshList();
  }

  public isScroll(): void {
    if (this.showModal) { this.core.scroll(false); }
    else { this.core.scroll(true); }
  }

}

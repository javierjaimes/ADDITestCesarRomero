import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from 'src/app/entities/user.entity';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {

  @Input() lead: Lead;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateLead: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private core: CoreService) { }

  get photo(): string {
    return '../../../assets/user.png';
  }

  public leadDetail(id: string): void {
    this.router.navigate([`lead/${id}`]);
  }

  public deleteLead(id: string): void {
    this.core.deleteLead(id).subscribe(() => this.refreshList.emit());
  }
}

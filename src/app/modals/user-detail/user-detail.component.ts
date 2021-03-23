import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lead } from 'src/app/entities/user.entity';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailModalComponent implements OnInit {

  @Input() update: string = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private core: CoreService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (!this.isCreate) {
      this.core.getLeadById(this.update).subscribe(data => this.initForm(data));
    }
  }

  get isCreate(): boolean {
    return this.update === null ? true : false;
  }

  public initForm(data?: Lead): void {
    this.form = this.frmBuilder.group({
      firstName: ['' || data?.firstName, Validators.required],
      lastName: ['' || data?.lastName, Validators.required],
      email: ['' || data?.email, Validators.required],
      celphone: ['' || data?.celphone, Validators.required],
      birthdate: ['' || data?.birthdate, Validators.required],
      id: ['' || data?.id, Validators.required],
    });
  }

  public save(): void {
    const data: Lead = {
      ...this.form.value,
      ...this.core.addValidationLead(),
      id: Math.random() * 1000,
    };
    this.core.createLead(data).subscribe(x => { this.closeModal.emit(); });
  }

  updateData(): void {
    const data: Lead = { ...this.form.value };
    this.core.updateLead(data).subscribe(response => {
      this.closeModal.emit();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from 'src/app/entities/user.entity';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  private id: string;
  public lead: Lead;
  public response: boolean = false;
  public showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private core: CoreService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLeadByID();
  }

  get photo(): string {
    return '../../../assets/user.png';
  }

  public getLeadByID(): void {
    this.core.getLeadById(this.id).subscribe(response => this.lead = response);
  }

  public goBack(): void {
    this.router.navigate([``]);
  }

  public check(lead: Lead): void {
    this.core.isValidProspect(lead)
      .then((response) => {
        this.showMessage = true;
        response ? this.response = true : this.response = false;
      })
      .catch((err) => console.log(err));
  }

}

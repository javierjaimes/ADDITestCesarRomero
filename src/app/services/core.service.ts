import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Observable } from 'rxjs';

import { environment as ENV } from '../../environments/environment';

import { Lead } from '../entities/user.entity';

interface Validate {
  judicialRecords: boolean;
  nationalRegistry: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private renderer: Renderer2;

  constructor(private http: HttpClient, private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public createLead(lead: Lead): Observable<any> {
    return this.http.post(`${ENV.api}/data`, lead);
  }

  public getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${ENV.api}/data`);
  }

  public getLeadById(id: string): Observable<Lead> {
    return this.http.get<Lead>(`${ENV.api}/data/${id}`);
  }

  public updateLead(lead: Lead): Observable<any> {
    return this.http.put(`${ENV.api}/data/${lead.id}`, lead);
  }

  public deleteLead(id: string): Observable<any> {
    return this.http.delete<Lead>(`${ENV.api}/data/${id}`);
  }

  addValidationLead(): Validate {
    const random = Math.random() * 100;
    const numberRound = Math.round(random);
    if (numberRound > 50) {
      return {
        nationalRegistry: true,
        judicialRecords: false
      };
    } else {
      return {
        nationalRegistry: false,
        judicialRecords: false
      };
    }
  }

  public isValidProspect(lead: Lead): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      if (lead.nationalRegistry) {
        if (!lead.judicialRecords) {
          const random = Math.random() * 100;
          const qualifity = Math.round(random);
          if (qualifity >= 60) { return resolve(true); }
          else { return resolve(false); }
        }
      } else {
        return resolve(false);
      }
    });
    return promise;
  }

  public scroll(state: boolean): void {
    if (typeof window === 'undefined') {
      return;
    } else if (!!window && state) {
      this.renderer.setStyle(document.body, 'overflow-y', 'auto');
    } else { this.renderer.setStyle(document.body, 'overflow-y', 'hidden'); }
  }
}

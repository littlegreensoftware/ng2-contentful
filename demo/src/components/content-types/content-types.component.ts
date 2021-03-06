import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContentfulCommon, ContentfulContentType } from '../../../../src/contentful-types';
import { ContentfulService } from '../../../../index';

@Component({
  template: `
    <h2>Content types</h2>
    <div class="error" *ngIf="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <li *ngFor="let contentType of contentTypes">
          <a [routerLink]="['/entries', contentType.sys.id ]">
            {{ contentType.name }}
          </a>
        </li>
      </ul>
    </div>
  `
})
export class ContentTypesComponent implements OnInit {
  private contentTypes: ContentfulCommon<ContentfulContentType>[];

  private error: string;

  private contentfulService: ContentfulService;
  private router: Router;

  public constructor(contentfulService: ContentfulService, router: Router) {
    this.contentfulService = contentfulService;
    this.router = router;
  }

  public ngOnInit(): void {
    if(this.contentfulService.isServiceConfigured()){
      this.contentfulService
        .create()
        .getContentTypes()
        .commit()
        .subscribe((value)=>{
            this.contentTypes = value.items;
        });
    } else {
      this.router.navigateByUrl('');
    }
  }
}

import { NgTemplateOutlet } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  APP_CONFIG,
  AppConfig,
} from '../../../../config/app-config.interface';

import { HomeCoarComponent } from '../../../../app/home-page/home-coar/home-coar.component';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { RecentItemListComponent } from '../../../../app/home-page/recent-item-list/recent-item-list.component';
import { ThemedTopLevelCommunityListComponent } from '../../../../app/home-page/top-level-community-list/themed-top-level-community-list.component';
import { SuggestionsPopupComponent } from '../../../../app/notifications/suggestions/popup/suggestions-popup.component';
import { ThemedConfigurationSearchPageComponent } from '../../../../app/search-page/themed-configuration-search-page.component';

@Component({
  selector: 'ds-themed-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
  imports: [
    FormsModule,
    HomeCoarComponent,
    NgTemplateOutlet,
    RecentItemListComponent,
    RouterLink,
    SuggestionsPopupComponent,
    ThemedConfigurationSearchPageComponent,
    ThemedHomeNewsComponent,
    ThemedTopLevelCommunityListComponent,
    TranslateModule,
  ],
})
export class HomePageComponent extends BaseComponent {
  selectedSearchField = '';
  searchByValue = '';

  searchFields = [
    { id: 'title', label: 'Title', solr: 'title' },
    { id: 'author', label: 'Author', solr: 'author' },
    { id: 'mentor', label: 'Mentor', solr: 'advisor' },
    { id: 'keywords', label: 'Keywords', solr: 'subject' },
    { id: 'abstract', label: 'Abstract', solr: 'abstract' },
    { id: 'year', label: 'Year', solr: 'dateIssued' },
    { id: 'document type', label: 'Document Type', solr: 'dc.type' },
    { id: 'research field', label: 'Research Field', solr: 'department' },
  ];

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected route: ActivatedRoute,
    private router: Router,
  ) {
    super(appConfig, route);
  }

  getSelectedFieldLabel(): string {
    return this.searchFields.find(f => f.id === this.selectedSearchField)?.label || '';
  }

  onSearchBySubmit(): void {
    const value = this.searchByValue.trim();
    if (!value) { return; }
    const field = this.searchFields.find(f => f.id === this.selectedSearchField);
    const query = field ? `${field.solr}:"${value}"` : value;
    this.router.navigate(['/search'], { queryParams: { query } });
    this.searchByValue = '';
    this.selectedSearchField = '';
  }
}

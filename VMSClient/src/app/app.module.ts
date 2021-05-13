//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

//components
import { AppComponent } from './app.component';
import { CreateComponent as UserCreateComponent } from './user/components/create/create.component';
import { SearchComponent as UserSearchComponent } from './user/components/search/search.component';

//services
import { UserService } from './user/services/user.service'
import { AlertService } from './shared/services/alert.service'
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

//routing
import { RouterModule, Routes } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

//directive
import { DateCompareValidatorDirective } from './shared/directives/datecompare.directive';
import { NgbDateMomentParserFormatter } from './shared/date.formatter';

//routes
const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'add', component: UserCreateComponent }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserSearchComponent,
    DateCompareValidatorDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    AlertService,
    ToastrService,
    SlimLoadingBarService,
    { provide: NgbDateParserFormatter, useFactory: () => { return new NgbDateMomentParserFormatter("DD/MM/YYYY") } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './pages/book/create/create.component';
import { UpdateComponent } from './pages/book/update/update.component';
import { IndexComponent } from './pages/book/index/index.component';
import { BookService } from './pages/book/book.service';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    UpdateComponent,
    IndexComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatFormField,
     MatButtonModule,
     MatIconModule,
     MatLabel,
     MatError,
     ReactiveFormsModule 
     
  ],
  providers: [
    provideClientHydration(),

    BookService,
     provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

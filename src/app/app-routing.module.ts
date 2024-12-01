import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/book/create/create.component';
import { IndexComponent } from './pages/book/index/index.component';
import { UpdateComponent } from './pages/book/update/update.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}

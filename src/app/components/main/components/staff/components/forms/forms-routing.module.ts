import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { FormViewerComponent } from './components/form-viewer/form-viewer.component';

const routes: Routes = [
  {
    path:"",
    component:FormsComponent
  },
  { path: 'view/:id', component: FormViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }

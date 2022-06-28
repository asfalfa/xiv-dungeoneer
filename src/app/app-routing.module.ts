import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { HomeComponent } from './components/home/home.component';
import { MinionsComponent } from './components/minions/minions.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'search/:search',
    component: SearchComponent,
  },
  {
    path:'search/:search/:server',
    component: SearchComponent,
  },
  {
    path:'details/:id',
    component: CharacterDetailsComponent,
  },
  { 
    path: 'minions', 
    component: MinionsComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

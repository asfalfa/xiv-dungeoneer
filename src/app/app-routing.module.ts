import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BluemageComponent } from './components/bluemage/bluemage.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { DungeonsComponent } from './components/dungeons/dungeons.component';
import { HomeComponent } from './components/home/home.component';
import { MinionsComponent } from './components/minions/minions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
    component: CharacterDetailsComponent
  },
  {
    path:'notfound',
    component: NotFoundComponent
  },
  { 
    path: 'minions', 
    component: MinionsComponent 
  },
  {
    path: 'dungeons',
    component: DungeonsComponent
  },
  {
    path: 'spells',
    component: BluemageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {HotelsComponent} from "../hotels/hotels.component";
import {ProfileComponent} from "../profile/profile.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'hotels',
    component: HotelsComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

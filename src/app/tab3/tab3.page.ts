import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab3Page {
  constructor(private router: Router, public auth: AuthService) {
  }
  logOut() {
    localStorage.removeItem('phone');
    this.auth.isLoggedIn = false;
    this.router.navigate(['/login'])
    console.log(14)
  }
}

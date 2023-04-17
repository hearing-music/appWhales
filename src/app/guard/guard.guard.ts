import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url; // 将要跳转的路径
    console.log(url)
    return this.checkLogin(url)
  }
  private checkLogin(url: string): any {
    let phone = localStorage.getItem('phone');
    // let token_expiration_time = localStorage.getItem("ModifyTime");
    console.log(phone)
    if (!phone) {
      // 修改登陆后重定向的地址
      this.authService.redirectUrl = url;
      // 重定向到登录页面
      this.authService.isLoggedIn = false;
      return this.router.parseUrl('/login');
    } else {
      //本地存储有token
      this.authService.isLoggedIn = true;
      this.authService.Name = localStorage.getItem("name")
      this.authService.phone = localStorage.getItem("phone")
      // if ((Number(token_expiration_time) + (16 * 60 * 60 * 1000)) > Date.now()) {
      // } else {
      //   localStorage.removeItem('token');
      //   this.authService.isLoggedIn = false;
      //   this.router.navigate(['/login'])
      // }
    }
    //已经登录返回true
    if (this.authService.isLoggedIn) { return true; }
  }
}

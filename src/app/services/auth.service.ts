import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  baseUrl = "https://whaleTail.tingjianmusic.top";
  // 登陆状态
  isLoggedIn = false;
  // 保存登录后重定向的路径
  redirectUrl: string = "";
  Name!: string | null;
  phone!: string | null
  ModifyTime!: number
  // 模拟登录
  logout(): void {
    this.isLoggedIn = false;
  }
  getCode(phone: any) {
    return this.http.get(this.baseUrl + '/v10/SmsLogin?phone=' + phone)
  }
  login(phone: string, phoneCode: string) {
    return this.http.get(this.baseUrl + '/v10/CheckSmsLogin?phone=' + phone + '&code=' + phoneCode)
  }
  GetUserMessage(phone: string) {
    return this.http.get(this.baseUrl + '/v10/GetInPerson?phone=' + phone)
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  phoneCodeNumber!: number
  phone: string = ""
  phoneErrMessage!: string
  phoneCode!: string
  codeErr: string = ""
  constructor(private auth: AuthService, public router: Router) { }
  ngOnInit() {
  }
  getCode() {
    const regex = /^1[3-9]\d{9}$/;
    if (regex.test(this.phone)) {
      this.phoneErrMessage = ""
      this.auth.getCode(this.phone).subscribe((res: any) => {
        if (res.data == "success") {
          this.phoneCodeNumber = 60
          const intervalId = setInterval(() => {
            this.phoneCodeNumber -= 1
            if (this.phoneCodeNumber == 0) {
              this.phoneCodeNumber = 0
              clearInterval(intervalId);
            }
          }, 1000);
        }
        else if (res.data == "暂无权限") {
          this.phoneErrMessage = "该手机号暂无权限"
        }
      })
    } else {
      this.phoneErrMessage = "手机号格式错误"
    }
  }
  login() {
    this.auth.login(this.phone, this.phoneCode).subscribe((res: any) => {
      console.log(res)
      if (res.data == false) {
        this.codeErr = "验证码错误"
      } else {
        this.codeErr = ""
        this.auth.GetUserMessage(this.phone).subscribe((res: any) => {
          localStorage.setItem('phone', res.data.Phone);
          localStorage.setItem('name', res.data.Name);
          this.auth.isLoggedIn = true;
          const redirectUrl = this.auth.redirectUrl || '/';
          this.router.navigate([redirectUrl]);
        })
      }
    })
  }
}

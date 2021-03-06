import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent {

  @Input() apiService: ApiService;
  @Output() updateIsLogin = new EventEmitter<boolean>();

  constructor() {}

  handleRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const body = {email: form.value.email, name: form.value.name, password: form.value.password};
    this.apiService.post('/user/register', body).toPromise()
      .then(ack => {
        this.updateIsLogin.emit(true);
      })
      .catch(err => {
        console.log('err:' + err.error);
      });

    form.reset();
  }
}

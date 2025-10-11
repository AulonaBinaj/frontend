import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  async login(username: string, password: string) {
    const res = await axios.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password,
    });
    const token = res.data.token;
    localStorage.setItem('token', token);
    return res.data;
  }

  async register(username: string, password: string) {
    return axios.post(`${this.apiUrl}/register`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

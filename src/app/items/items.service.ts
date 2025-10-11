import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Item } from '../models/item.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private apiUrl = `${environment.apiUrl}/items`;

  constructor(private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }
  async getItems(): Promise<Item[]> {
    const res = await axios.get<Item[]>(this.apiUrl, this.getHeaders());
    return res.data;
  }

  async addItem(item: Item): Promise<Item> {
    const res = await axios.post<Item>(this.apiUrl, item, this.getHeaders());
    return res.data;
  }
  async updateItem(id: string, item: Item): Promise<Item> {
    const res = await axios.put<Item>(
      `${this.apiUrl}/${id}`,
      item,
      this.getHeaders()
    );
    return res.data;
  }
  async deleteItem(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}

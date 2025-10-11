import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../items.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '' };
  editMode = false;
  editingItemId: string | null = null;

  constructor(
    private itemsService: ItemsService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadItems();
  }

  async loadItems() {
    this.items = await this.itemsService.getItems();
  }

  async addItem() {
    if (this.editMode && this.editingItemId) {
      await this.itemsService.updateItem(this.editingItemId, this.newItem);
      this.editMode = false;
      this.editingItemId = null;
    } else {
      await this.itemsService.addItem(this.newItem);
    }
    this.newItem = { name: '', description: '' };
    await this.loadItems();
  }

  editItem(item: Item) {
    this.newItem = { ...item };
    this.editMode = true;
    this.editingItemId = item._id!;
  }

  async deleteItem(id: string) {
    await this.itemsService.deleteItem(id);
    await this.loadItems();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

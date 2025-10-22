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
  newItem: Partial<Item> = { name: '', description: '' };

  editingId: string | null | undefined = null;
  editingItem: Partial<Item> = {};

  constructor(private itemService: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    this.items = await this.itemService.getItems();
  }

  async addItem() {
    if (!this.newItem.name) return;
    const added = await this.itemService.addItem(this.newItem as Item);
    this.items.push(added);
    this.newItem = { name: '', description: '' };
  }

  startEdit(item: Item) {
    this.editingId = item._id;
    this.editingItem = { ...item };
  }

  async saveEdit(id: string) {
    const updated = await this.itemService.updateItem(
      id,
      this.editingItem as Item
    );
    const index = this.items.findIndex((i) => i._id === id);
    this.items[index] = updated;
    this.editingId = null;
    this.editingItem = {};
  }

  async deleteItem(id: string) {
    await this.itemService.deleteItem(id);
    this.items = this.items.filter((i) => i._id !== id);
  }
}

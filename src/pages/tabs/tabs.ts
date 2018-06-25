import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tasks = HomePage;
  feed = FeedPage;
}

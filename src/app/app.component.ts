import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gym-syst';
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnDestroy {
  public title?: string;
  public titleSubs$: Subscription;
  constructor(private router: Router) {
    this.titleSubs$ = this.getArgumentos().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminLte - ${title}`;
    });
  }

  ngOnDestroy() {
    this.titleSubs$.unsubscribe();
  }

  getArgumentos() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdeasService } from '../core/services/ideas.service';
import { Idea } from '../idea.interface';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.page.html',
  styleUrls: ['./idea.page.scss'],
})
export class IdeaPage implements OnInit {
  idea$: Observable<Idea>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ideasService: IdeasService
  ) {
    const ideaId = this.route.snapshot.paramMap.get('ideaId');

    if (!ideaId) {
      this.router.navigate(['/']);
    } else {
      this.idea$ = this.ideasService.getOne(ideaId);
    }
  }

  ngOnInit() {}
}

import { Component } from '@angular/core';
import { faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.styl']
})
export class PageFooterComponent {

  public githubIcon: IconDefinition = faGithub;

  public OpenGitHub = (): Window => window.open('https://github.com/CharlesPeterMcCarthy/', '_blank');

}

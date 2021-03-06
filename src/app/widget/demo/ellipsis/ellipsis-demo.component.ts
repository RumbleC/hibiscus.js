import {Component} from '@angular/core';

@Component({
  selector: 'hi-ellipsis-demo',
  templateUrl: './ellipsis-demo.template.html'
})
export class EllipsisDemoComponent {
  /* tslint:disable */
  text = `Welcome to This repo is Angular4 ui library for Bootstrap. And it is being built from scratch in Typescript.`;
  html = `<p>Arch <strong>Linux</strong> users can install <a href="https://aur.archlinux.org/packages/autoenv/">autoenv</a> or <a href="https://aur.archlinux.org/packages/autoenv-git/">autoenv-git</a> with their favorite AUR helper.</p>`;
  /* tslint:enable */
}

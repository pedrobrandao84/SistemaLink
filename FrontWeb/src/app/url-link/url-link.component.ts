import { Component, OnInit } from '@angular/core';
import { LinkService } from '../link/services/link.service';
import { GrupoService } from '../link/services/grupo.service';
import { Router } from '@angular/router';
import { Link } from '../link/Model/link';
import { Grupo } from '../link/Model/grupo';

@Component({
  selector: 'app-url-link',
  templateUrl: './url-link.component.html',
  styleUrls: ['./url-link.component.css']
})
export class UrlLinkComponent implements OnInit {

  links: Link[];

  constructor(
    private linkService: LinkService, 
    private grupoService: GrupoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.linkService.getLinksList().subscribe((link: Link[]) => {
      this.links = link;
      this.validaLink();
    });
  }

  validaLink(){
    this.links.forEach(link => {
      if(link.url == window.location.href) {
        this.direcionaGrupo(link);
      }
    });
  }

  direcionaGrupo(link: Link) {
    this.grupoService.getGruposList(link.idEnderecoLink).subscribe((grupos: Grupo[]) => {
      let gruposLink = grupos;

      gruposLink.sort(s => s.ordem);

      let url: string = "";

      for(let g of gruposLink){
        if (g.qtdClicks < link.qtdClicks) {
          g.qtdClicks++;
          url = g.url
          this.grupoService.updateGrupo(g.idGrupo, g).subscribe(() => {
            window.location.href = url;
          });
          break;
        }
      }
    });
  }
}

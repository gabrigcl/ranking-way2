import { Component, OnInit } from '@angular/core';

import { RankingService } from './ranking.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  code = "";
  standings = [];
  competitionName = "";
  error = {
    status: false,
    msg: ""
  };

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
  }

  getCompetitionStandings(code: string){
    this.error.status = false;
    let codeNumber = Number(code);
    if(codeNumber){
      this.rankingService.getStandings(codeNumber)
        .subscribe(
          (data) => {
            console.log(data);
            this.standings = data.standings.filter( (standing) => {
              return standing.type == "TOTAL";
            });
            this.competitionName = data.competition.name;
          }, 
          error => {
            this.error.status = true;
            if(error.status == 404){
              this.error.msg = "Campeonato não encontrado";
            }else if(error.status = 403){
              this.error.msg = error.error.message;
            }
            else{
              this.error.msg = "Houve um erro ao completar a requisição";
            }
            this.standings = [];
            this.competitionName = "";
            console.log(error);
          }
      );
    }else{
      this.error.status = true;
      this.error.msg = "Digite um código numérico"
    }
  }

}

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RankingService } from './ranking.service';
import { RankingDummy } from './ranking.dummy';

describe('RankingService', () => {

  let service: RankingService;
  let httpMock: HttpTestingController;

  const endp = "http://api.football-data.org/v2/competitions/";
  const par = 2000;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RankingService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(RankingService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([RankingService], (service: RankingService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getStandings', () => {
    it('should return a valid data', () => {
  
      service.getStandings(2000).subscribe(data => {
        expect(data).toEqual(RankingDummy.standings);
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/competitions/2000/standings`);
      expect(req.request.method).toBe("GET");
      req.flush(RankingDummy.standings);
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});

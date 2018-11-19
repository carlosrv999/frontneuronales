import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getApi (params: any) {
    return this.http.get(`http://200.60.68.125:3000/calcularPesos?area=${params.area}&riesgo_deslizamiento=${params.riesgo_deslizamiento}&riesgo_inundacion=${params.riesgo_inundacion}&mov_masas=${params.mov_masas}&inundacion=${params.inundacion}&infra_niv_i=${params.infra_niv_i}&infra_niv_ii=${params.infra_niv_ii}&infra_niv_iii=${params.infra_niv_iii}`);
  }

  confirm() {
    return this.http.post(`http://localhost:3000/confirmar`, {});
  }
}
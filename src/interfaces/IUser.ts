import { UUID } from "crypto";

export default interface IUser {
  /* 
    Em `id: UUID` definimos que o id é um UUID pois como o banco de dados é um
    arquivo JSON, fica mais fácil de gerar um UUID do que um número sequencial. 

    Porém, se o banco de dados fosse um banco de dados relacional, poderíamos
    definir o id como um número sequencial, pois o banco de dados já possui um
    mecanismo para gerar um número sequencial.
  */
  id: UUID;
  name: string;
  job: string;
  accessCount?: number;
  permissions?: string[];
}

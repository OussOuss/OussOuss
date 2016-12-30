export class User {
  constructor(
    public userId: number,
    public name: string,
    public passworld: string,
    public emailPrincipal: string,
    public emailSecondaire?: string,
    public tel?: string,
    public adress?: string ) { }
}
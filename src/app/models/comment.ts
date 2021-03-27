// to be determined...
export class Comment{
  constructor(
    public commentId:number,
    public postId:number,
    public userId:number,
    public content:string,
    public timestamp:number
  ){}
}

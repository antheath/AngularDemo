export class CommentItem {
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public tags: string[]
  ) {}
}

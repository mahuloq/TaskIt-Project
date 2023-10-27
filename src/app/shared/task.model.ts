export class Task {
  constructor(
    public title: string,
    public dueDate: string,
    public priority: any,
    public status: boolean,
    public description: string
  ) {}
}

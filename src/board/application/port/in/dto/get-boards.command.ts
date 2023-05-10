export class GetBoardsCommand {
  private readonly _pageSize: number;
  private readonly _pageNum: number;

  constructor(_pageSize: number, _pageNum: number) {
    this._pageSize = _pageSize;
    this._pageNum = _pageNum;
  }

  get pageNum() {
    return this._pageNum;
  }

  get pageSize() {
    return this._pageSize;
  }
}

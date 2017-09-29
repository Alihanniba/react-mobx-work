import { observable, action } from "mobx";
// import axios from "axios";

export default class AppState {
  @observable count;
  constructor() {
    this.count = 0;
  }

  async changeCount(count) {
    await this.setData(count)
  }

  @action setData(data) {
    this.count = data;
  }

  @action clearItems() {
    this.count = [];
  }
}

export default class Message {
  private _timestamp: string;
  private _text: string;
  private _email: string;
  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}

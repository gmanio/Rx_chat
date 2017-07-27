import { NgrxChatPage } from './app.po';

describe('ngrx-chat App', () => {
  let page: NgrxChatPage;

  beforeEach(() => {
    page = new NgrxChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

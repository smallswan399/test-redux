import { TestReduxPage } from './app.po';

describe('test-redux App', () => {
  let page: TestReduxPage;

  beforeEach(() => {
    page = new TestReduxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

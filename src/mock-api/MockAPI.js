import users from './users.json';
import news from './news.json';

export class MockAPI {
  constructor() {
    this.users = users;
    this.news = news;
  }

  logIn = (login, password) => {
    const request = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.users.forEach((item) => {
          if (item.login === login && item.password === password) resolve(item);
        });

        reject(new Error('invalid login or password'));
      }, 300);
    });

    return request.then((result) => result).catch((error) => error);
  };

  getNews = (role) => {
    const request = new Promise((resolve) => {
      setTimeout(() => {
        const news = this.news.filter((item) => (
          (role === 'user') ? item.confirmed : !item.confirmed
        ));

        resolve(news);
      }, 300);
    });

    return request.then((result) => result).catch((error) => error);
  };

  confirmNews = (newsId) => {
    const request = new Promise((resolve, reject) => {
      setTimeout(() => {
        const newsIndex = this.news.findIndex((item) => item.id === newsId);

        if (newsIndex === -1) reject(new Error('news is not found'));

        this.news[newsIndex].confirmed = true;

        resolve(true);
      }, 300);
    });

    return request.then((result) => result).catch((error) => error);
  };

  deleteNews = (newsId) => {
    const request = new Promise((resolve) => {
      setTimeout(() => {
        this.news = this.news.filter((item) => item.id !== newsId);
        resolve(true);
      }, 300);
    });

    return request.then((result) => result).catch((error) => error);
  };

  removeNews = (title, text, date) => {
    const request = new Promise((resolve) => {
      setTimeout(() => {
        this.news.push({
          newsId: this.news.length + 1,
          title,
          text,
          date,
          confirmed: false,
        });
        resolve(true);
      }, 300);
    });

    return request.then((result) => result).catch((error) => error);
  };
}

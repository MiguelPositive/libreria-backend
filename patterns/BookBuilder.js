class BookBuilder {
  constructor() {
    this.book = {};
  }

  setTitle(title) {
    this.book.title = title;
    return this;
  }

  setAuthor(author) {
    this.book.author = author;
    return this;
  }

  setCategory(category) {
    this.book.category = category;
    return this;
  }

  setAvailable(available) {
    this.book.available = available;
    return this;
  }

  build() {
    return this.book;
  }
}

module.exports = BookBuilder;

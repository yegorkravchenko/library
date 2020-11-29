const addBtn = document.querySelector('.header__add-btn');

const library = [];

function Book(name, author, pages, hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype = {

};

function addBookToLibrary() {

}
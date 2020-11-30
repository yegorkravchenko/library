const newBookBtn = document.querySelector('.header__add-btn');
const newBookModal = document.querySelector('.header__form-wrapper');

let modalActive = false;

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

newBookBtn.addEventListener('click', () => {
    if (!modalActive) {
        modalActive = true;
        newBookModal.style.display = 'flex';
    } else {
        modalActive = false;
        newBookModal.style.display = 'none';
    }
});
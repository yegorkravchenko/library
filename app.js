const newBookBtn = document.querySelector('.header__add-btn');
const newBookModal = document.querySelector('.header__form-wrapper');
const btnAdd = document.querySelector('.add-form__btn');
const newBookInputs = document.querySelectorAll('.add-form__input');
const [titleInput, authorInput, pagesInput] = newBookInputs;
const cardsContainer = document.querySelector('.main__wrapper');

let isModalActive = false;

const library = [];

function Book(name, author, pages, hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype = {

};

function addBookToLibrary(name, author, pages) {
    library.push(new Book(name, author, pages));
}

function toggleModal(state) {
    const appearanceAnimation = [
        { height: '0', opacity: '0' },
        { height: '200px', opacity: '1' }
    ];
    const disappearanceAnimation = [
        { height: '250px', opacity: '1'},
        { height: '0', opacity: '0' }
    ];

    if (!state) {
        isModalActive = true;
        newBookModal.style.display = 'flex';
        newBookModal.animate(appearanceAnimation, {
            duration: 150
        });
    } else {
        isModalActive = false;
        newBookModal.animate(disappearanceAnimation, { duration: 150 });
        window.setTimeout(() => { newBookModal.style.display = 'none'; }, 150);
    }
}

function renderCards() {
    cardsContainer.innerHTML = '';
    library.forEach(book => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.innerHTML = `
            <div class="card__header">
                <h2 class="card__book-title">${book.name}</h2>
                <h3 class="card__book-author">${book.author}</h3>
                <label class="card__checkbox checkbox"><input type="checkbox" class="checkbox__input"> Read</label>
            </div>
            <p class="card__pages">${book.pages}</p>
            <p class="card__delete-btn">x</p>
        `;
        cardsContainer.appendChild(card);
    });
}

newBookBtn.addEventListener('click', () => {
    toggleModal(isModalActive);
});

btnAdd.addEventListener('click', () => {
    toggleModal(isModalActive);
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value);
    renderCards();
});

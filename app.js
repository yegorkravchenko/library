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

function addBookToLibrary(name, author, pages, hasRead) {
    library.push(new Book(name, author, pages, hasRead));
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

function resetModal() {
    newBookInputs.forEach(input => input.value = '');
}

function renderCards() {
    cardsContainer.innerHTML = '';
    library.forEach((book, index) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <div class="card__header">
                <h2 class="card__book-title">${book.name}</h2>
                <h3 class="card__book-author">${book.author}</h3>
                <label class="card__checkbox checkbox"><input type="checkbox" class="checkbox__input"> Read</label>
            </div>
            <p class="card__pages">${book.pages} pages</p>
            <p class="card__delete-btn">x</p>
        `;
        
        if (book.hasRead) {
            toggleCheckbox(card);
        }

        cardsContainer.appendChild(card);
    });
}

function toggleCheckbox(card) {
    // const card = el.parentNode.parentNode.parentNode;
    const elementsToChange = [card, card.childNodes[1], card.childNodes[3], card.childNodes[5]];
    const checkbox = card.childNodes[1].childNodes[5].childNodes[0];
    
    if (checkbox.checked) {
        elementsToChange.forEach(element => {
            element.classList.add(`${element.classList[0]}--active`);
        });
        library[card.dataset.index].hasRead = true;
        checkbox.checked = true;
    } else {
        elementsToChange.forEach(element => {
            element.classList.remove(`${element.classList[0]}--active`);
        });
        library[card.dataset.index].hasRead = false;
        checkbox.checked = false;
    }

    updateStorage();
}

function updateStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

newBookBtn.addEventListener('click', () => {
    toggleModal(isModalActive);
});

btnAdd.addEventListener('click', () => {
    toggleModal(isModalActive);
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, false);
    resetModal();
    updateStorage();
    renderCards();
});

const cardsContainerObserver = new MutationObserver(() => {
    const cardsCheckboxes = document.querySelectorAll('.checkbox__input');
    const cardsDeleteBtns = document.querySelectorAll('.card__delete-btn');

    cardsCheckboxes.forEach(checkbox => checkbox.addEventListener('click', (e) => {
        toggleCheckbox(e.target.parentNode.parentNode.parentNode);
    }));

    cardsDeleteBtns.forEach(btn => btn.addEventListener('click', (e) => {
        const card = e.target.parentNode;
        library.splice(card.dataset.index, 1);
        updateStorage();
        renderCards();
    }));
});

cardsContainerObserver.observe(cardsContainer, { childList: true });

window.addEventListener('load', () => {
   if (localStorage.getItem('library')) {
       JSON.parse(localStorage.getItem('library')).forEach(obj => library.push(obj));
       renderCards();
   }
});

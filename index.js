class Book{
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ){
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

Book.prototype.toggleStatus = function (){
    this.isRead = !this.isRead;
}

class Library{
    constructor() {
        this.books = []
    }

    addBookToLibrary(book){
        this.books.push(book);
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title != title);
    }

    getBook(title){
        return this.books.find((book) => book.title === title)
    }
}

let myLibrary = new Library();

myLibrary.addBookToLibrary(new Book("Hobbit", "J.R.R Tolkien", 295, false));

function displayLibrary(library){
    let container = document.querySelector('.container');
    container.innerHTML = '';
    for (let i=0; i<library.books.length;i++){
        let book = document.createElement('div');
        book.className = 'book';
        book.innerHTML = `<h1>${library.books[i].title}</h1><h3>Author ${library.books[i].author}</h3><p>${library.books[i].pages} pages</p><p id='st'>${library.books[i].isRead}</p><button id=dlt-btn>Delete</button><button id=toggle-status>Read</button>`
        container.appendChild(book);
    }
}

displayLibrary(myLibrary);

document.addEventListener('click',function(e){
    if (e.target && e.target.id === 'submit-btn'){
        let title = document.querySelector('#title')
        let author = document.querySelector('#author')
        let pages = document.querySelector('#pages')
        myLibrary.addBookToLibrary(new Book(title.value, author.value, pages.value, false));
        displayLibrary(myLibrary);
        title.value='';
        author.value='';
        pages.value='';        
        e.preventDefault();
    }
    else if (e.target && e.target.id === 'dlt-btn'){
        let bookNode = e.target.parentElement;
        let title = bookNode.querySelector('h1').textContent;
        myLibrary.removeBook(title);
        displayLibrary(myLibrary);
    }
    else if (e.target && e.target.id === 'toggle-status'){
        let bookNode = e.target.parentElement;
        let title = bookNode.querySelector('h1').textContent;
        let book = myLibrary.getBook(title);
        book.toggleStatus();
        displayLibrary(myLibrary);
    }
})
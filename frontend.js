window.onload = function () {
    //buttons
    var quickAddBtn = document.getElementById("QuickAdd");
    var AddBtn = document.getElementById("Add");
    var cancelBtn = document.getElementById("Cancel");
    var quickAddFormDiv = document.querySelector(".quickaddForm");
    var searchButton = document.getElementById("Search");
    var searchBookDiv = document.querySelector(".searchBook");
    var doneButton = document.getElementById("Done");
    var startSearchButton = document.getElementById("startSearch");

    //form fields

    var author = document.getElementById("author");
    var title = document.getElementById("title");
    var genre = document.getElementById("genre");
    var price = document.getElementById("price");
    var searchKey = document.getElementById("searchKey");
    var resultTextArea = document.getElementById("results");


    //json
    function jsonStructure(author, title, genre, price) {
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.price = price;
    }

    //event listeners

    quickAddBtn.addEventListener("click", function () {
        quickAddFormDiv.style.display = "block";
        searchBookDiv.style.display = "none";
    });

    cancelBtn.addEventListener("click", function () {
        quickAddFormDiv.style.display = "none";
        clearForm();
    });

    AddBtn.addEventListener("click", addBook);

    searchButton.addEventListener("click", function () {
        searchBookDiv.style.display = "block";
        quickAddFormDiv.style.display = "none";
    });


    doneButton.addEventListener("click", function () {
        searchBookDiv.style.display = "none";
    });

    startSearchButton.addEventListener("click", function () {
        //check if empty otherwise error occurs
        if (searchKey.value != ''){
            resultTextArea.innerHTML = sendSearchGET(searchKey.value);
        }
       
    });


    //functions

    function sendBookToServer(BookJSON) {
        var xml = new XMLHttpRequest();
        let msgShown = false;
        const url = "http://localhost:3000/books";
        xml.open("POST", url, true);
        xml.setRequestHeader("Content-Type", "application/json");

        console.log(BookJSON);

        xml.send(BookJSON);

        xml.addEventListener('readystatechange', function () {
            if (xml.status == 200 && msgShown === false) {
                alert("Book added successfully to the database!");
                msgShown = true;
            } else if (msgShown === false) {
                console.log(xml.status);
                alert("There was an error while adding the book\nMake sure you have internet connection");
                msgShown = true;
            }
        });


    }

    function clearForm() {
        var form = document.querySelectorAll(".formFields");
        for (var i in form) {
            form[i].value = ' ';
        }
    }

    function addBook() {
        var isNull = author.value != '' && title.value != '' && price.value != '';
        console.log(isNull);
        if (isNull) {
            console.log(isNaN(price.value));
            if (!isNaN(price.value)) {

                var bookObj = new jsonStructure(author.value, title.value, genre.value, price.value);
                console.log(title.value);

                //send to server

                sendBookToServer(JSON.stringify(bookObj));



                quickAddFormDiv.style.display = "none";
                clearForm();
            } else {
                alert("Make sure you have submited a number in the price field");
            }

        } else {
            alert("Please fill all the fields!");
        }
    }

    function sendSearchGET(key) {
        var xml = new XMLHttpRequest();
        xml.open("GET", "http://localhost:3000/books/" + key + "/", false);
        xml.send();
        return xml.responseText;
    }

}
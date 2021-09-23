1.  Folositi scheletul facut la sedinta cu npm pentru modulele http si ui, si adaugati pe parcurs.
2.  Creati lista de produse, in jur de 20-30 pe mockapi, care sa contina, id, nume, pret, imagine, descriere
3.  Pentru pagina de start: index.html incepeti cu ceva usor, meniuri pentru navigation bar ca sa mergeti catre celelalte pagini
4.  Exemple navigation bar: https://onaircode.com/html-css-navbar-examples/
5.  Example bootstrap navbar: https://colorlib.com/wp/bootstrap-navbar/

~~ index.html - lista produse
pagina ce afiseaza lista de prodose pe care le primeste de la un server in format JSON
cererea catre server se face folosind tehnica AJAX
in gif-ul de mai jos, este un exemplu despre cum ar putea arata implementarea acestei pagini

~~ details.html
acesata pagina primeste id-ul produsului ca si query parameter(ex: details.html?id=0, unde 0 este id-ul produsului)
in aceasta pagina vor fi afisate: imaginea produsului, nume, descrierea, pretul, numarul de produse din stoc
tot in pagina va fi afisat si un buton "adauga in cos": la apasarea acestui buton, in partea de sus a ecranului, va aparea un mesaj ce va avertiza utilizatorul ca produsul din imagine a fost adaugat in cosul de cumparaturi
toate produsele adaugate in cos vor fi stocate in memoria browserului, folosind functionalitatea localstorage
in gif-ul de mai jos, este un exemplu despre cum ar putea arata implementarea acestei pagini

~~ cart.html
aceasta pagina citeste toate elementele salvate in localstorage si le afiseaza sub forma unui tabel
pe fiecare linie din tabel, ce reprezinta produsele cumparate se pot face mai multe actiuni:
sa modificam cantitatea unui produs adaugat in cos (increase/decrease)
sa renuntam la un produs adaugat in cos, printr-o functie de "Remove"
numele fiecarui produs din lista, contine un link catre pagina de detalii a produsului adaugat in cos
de fiecare data cand continutul tabelului se modifica, totalul si subtotalurile vor fi calculate din nou
in gif-ul de mai jos, este un exemplu despre cum ar putea arata implementarea acestei pagini

~~ admin.html
din pagina de admin, se pot gestiona produsele afisate in paginile index.html si details.html
acesata pagina este doar o interfata grafica, ce comunica prin cereri AJAX cu un server, folosind verbele GET, POST, PUT, DELETE pentru a adauga si a actualiza lista de produse disponibile
tabelul de produse, contine pe coloana de nume produs, un link care atunci cand va fi actionat de catre utilizator, va afisa pe ecran un formular de adaugare/editare a produselor
fiecare produs va contine urmatorele informatii: imagine, nume, descriere, pret, cantitate stoc
elementele din lista pot fi sterse din lista de pe server, folosind un buton "Remove"

- Make product with mockapi

Look up exactly http requests

- ui.js
  Make a class to handle the UI,with construcor id the divs, that will have output

  - ShowAllProducts() - On index.html fetch all the products, and list them in a grid, div - on windiws load
  - ShowSingleProduct() - Get request to details.html where onload list a single items details
  - FilterProduct() - Based on the sidebar show the products on index.html, checkbox input add eventlistener
  - AddProductToCart() - add product to cart from details.html / later add button on index.html to products and add to cart
  - ShowAllAdminProducts() - on admin.html fetch all the products and list them, add edit and delete button with event listeners
  - AddProduct - add product to the json file
  - EditProduct() - the product.value will go to the input field on admin.html and can be edited
  - DeleteProduct() - event listener on button to delete product from the json file
  - ClearFields() - clear input fields after editing or adding a product
  - ShowSuccessMessage() - div with success message, disappearring with set timeout
  - ShowErrorMessage() - div with error message, disappearring with set timeout

- http.js

  - HTTP methods, function to GET/Post/Put/Edit/Delete

- admin.js

  - functions where admin events happen edit/delete/add product

- cart.js

  - list all the items added to cart, save products to local storage, onload remembers the products
  - addi number input to increase/decrease product quantity - linked with total price calculator

- index.js

  - load all products
  - filter events
  - link to cart.html & admin.html

- details.js
  - details events, add to cart button, quantity calculator

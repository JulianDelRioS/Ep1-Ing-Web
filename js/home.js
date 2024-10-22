document.addEventListener('DOMContentLoaded', function() {
    // Obtener el usuario logueado desde localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userBtn = document.querySelector('.user-btn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Verificar si hay un usuario logueado
    if (loggedInUser) {
        userBtn.textContent = loggedInUser.username;
        userBtn.style.display = 'inline-block';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        userBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }

    // Lógica para cerrar sesión
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    // Redirigir a login.html cuando se haga clic en el botón de "Iniciar sesión"
    loginBtn.addEventListener('click', function() {
        window.location.href = 'login.html'; // Redirigir al usuario a login.html
    });

    // Cargar productos y solicitudes desde el localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let requests = JSON.parse(localStorage.getItem('requests')) || [];

    const productsList = document.getElementById('productsList');
    const uploadProductForm = document.getElementById('uploadProductForm');
    const uploadSection = document.getElementById('upload-section');
    const showUploadFormBtn = document.getElementById('showUploadFormBtn');
    const showAllProductsBtn = document.getElementById('showAllProductsBtn');

    // Función para renderizar productos
    function renderProducts(filteredProducts) {
        productsList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');

            let imagesHTML = '<div class="carousel-container"><div class="carousel">';
            product.images.forEach(image => {
                imagesHTML += `<img src="${image}" class="product-image" alt="Imagen del producto">`;
            });
            imagesHTML += '</div><button class="carousel-prev">&lt;</button><button class="carousel-next">&gt;</button></div>';

            productDiv.innerHTML = `
                ${imagesHTML}
                <h4>${product.name}</h4>
                <p>Precio: $${product.price}</p>
                <p>${product.description}</p>
                <p>Usuario vendedor: ${product.userId}</p> <!-- Mostrar el usuario vendedor -->
            `;

            // Mostrar el botón de eliminar si el usuario es el propietario
            if (product.userId === loggedInUser.username) {
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-btn');
                deleteButton.setAttribute('data-name', product.name);
                deleteButton.setAttribute('data-user', product.userId);
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', deleteProduct);
                productDiv.appendChild(deleteButton);
            }

            productsList.appendChild(productDiv);
        });

        // Inicializar carruseles
        document.querySelectorAll('.carousel-container').forEach(initCarousel);
    }

    // Función para inicializar los carruseles
    function initCarousel(carouselContainer) {
        const carousel = carouselContainer.querySelector('.carousel');
        const carouselImages = carousel.querySelectorAll('img');
        let currentIndex = 0;

        function showImage(index) {
            const offset = -index * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }

        carouselContainer.querySelector('.carousel-prev').addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselImages.length - 1;
            showImage(currentIndex);
        });

        carouselContainer.querySelector('.carousel-next').addEventListener('click', function() {
            currentIndex = (currentIndex < carouselImages.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        // Mostrar la primera imagen al iniciar
        showImage(currentIndex);
    }

    // Mostrar el formulario de subida de productos
    showUploadFormBtn.addEventListener('click', function() {
        uploadSection.style.display = 'block';
    });

    // Mostrar todos los productos
    showAllProductsBtn.addEventListener('click', function() {
        renderProducts(products);
    });

    // Enviar formulario para solicitar la publicación de un producto
    uploadProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productCategory = document.getElementById('productCategory').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImagesInput = document.getElementById('productImages').files;

        let imagesArray = [];
        if (productImagesInput.length > 0) {
            const readers = Array.from(productImagesInput).slice(0, 3).map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = e => resolve(e.target.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readers).then(images => {
                imagesArray = images;
                saveRequest(productName, productPrice, productCategory, productDescription, imagesArray);
            });
        } else {
            saveRequest(productName, productPrice, productCategory, productDescription, imagesArray);
        }

        uploadProductForm.reset();
        uploadSection.style.display = 'none';
    });

    // Función para guardar la solicitud de publicación de un producto
    function saveRequest(name, price, category, description, images) {
        const newRequest = {
            name: name,
            price: price,
            category: category,
            description: description,
            images: images,
            userId: loggedInUser.username, // Almacenar el username del usuario que solicita la publicación
            status: 'pending'
        };

        requests.push(newRequest);
        localStorage.setItem('requests', JSON.stringify(requests));
        alert('Solicitud de publicación enviada exitosamente.');
    }

    // Función para eliminar productos
    function deleteProduct(event) {
        const productName = event.target.getAttribute('data-name');
        const productUserId = event.target.getAttribute('data-user');

        // Permitir eliminar si el usuario es el propietario
        if (productUserId === loggedInUser.username) {
            products = products.filter(product => product.name !== productName);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts(products);
            alert('Producto eliminado exitosamente.');
        } else {
            alert('No tienes permiso para eliminar este producto.');
        }
    }

    // Filtrar productos por categoría
    function filterProductsByCategory(category) {
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }

    // Manejar la selección de categorías
    document.querySelectorAll('.categories-content a').forEach(categoryLink => {
        categoryLink.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });

    // Renderizar productos al cargar la página
    renderProducts(products);
});

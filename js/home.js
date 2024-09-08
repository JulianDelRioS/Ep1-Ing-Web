document.addEventListener('DOMContentLoaded', function() {
    // Obtener el usuario logueado desde localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users[users.length - 1]; // El último usuario logueado

    const userBtn = document.querySelector('.user-btn');
    const loginBtn = document.getElementById('loginBtn');

    if (loggedInUser) {
        userBtn.textContent = loggedInUser.username;
        userBtn.style.display = 'inline-block';
        loginBtn.style.display = 'none';
    } else {
        userBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
    }

    // Cargar productos desde el localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('Loaded products:', products); // Verifica los productos cargados

    const productsList = document.getElementById('productsList');
    const uploadProductForm = document.getElementById('uploadProductForm');
    const uploadSection = document.getElementById('upload-section');
    const showUploadFormBtn = document.getElementById('showUploadFormBtn');
    const showAllProductsBtn = document.getElementById('showAllProductsBtn');
    const deleteAllProductsBtn = document.getElementById('deleteAllProductsBtn');

    // Función para renderizar productos en la vista
    function renderProducts(filteredProducts) {
        console.log('Rendering products:', filteredProducts); // Verifica los productos a renderizar
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
            `;
            productsList.appendChild(productDiv);
        });

        // Inicializar los carruseles
        document.querySelectorAll('.carousel-container').forEach(initCarousel);
    }

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

        // Inicializar el carrusel mostrando la primera imagen
        showImage(currentIndex);
    }

    showUploadFormBtn.addEventListener('click', function() {
        uploadSection.style.display = 'block';
    });

    showAllProductsBtn.addEventListener('click', function() {
        renderProducts(products);
    });

    uploadProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productCategory = document.getElementById('productCategory').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImagesInput = document.getElementById('productImages').files;

        let imagesArray = [];
        if (productImagesInput.length > 0) {
            Array.from(productImagesInput).forEach((file, index) => {
                if (index < 3) { // Limitar a 3 imágenes
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        imagesArray.push(e.target.result);
                        if (imagesArray.length === productImagesInput.length || imagesArray.length === 3) {
                            saveProduct(productName, productPrice, productCategory, productDescription, imagesArray);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        } else {
            saveProduct(productName, productPrice, productCategory, productDescription, imagesArray);
        }

        uploadProductForm.reset();
        uploadSection.style.display = 'none';
    });

    function saveProduct(name, price, category, description, images) {
        const newProduct = {
            name: name,
            price: price,
            category: category,
            description: description,
            images: images
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
    }

    function filterProductsByCategory(category) {
        if (category) {
            const filteredProducts = products.filter(product => product.category === category);
            renderProducts(filteredProducts);
        } else {
            renderProducts(products);
        }
    }

    document.querySelectorAll('.categories-content a').forEach(categoryLink => {
        categoryLink.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });

    // Botón para borrar todos los productos
    deleteAllProductsBtn.addEventListener('click', function() {
        // Solicitar clave al usuario
        const userInput = prompt('Introduce la clave para confirmar la eliminación de todos los productos:');

        if (userInput === '1234') {
            // Si la clave es correcta, eliminar los productos de localStorage
            localStorage.removeItem('products');
            
            // También limpiar la lista de productos en el DOM
            products = [];
            renderProducts(products);

            alert('Todos los productos han sido borrados.');
        } else {
            alert('Clave incorrecta. No se han borrado los productos.');
        }
    });

    // Renderizar productos al cargar la página
    renderProducts(products);
});

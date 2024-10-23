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

    function renderProducts(filteredProducts) {
        productsList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
    
            // Mostrar solo la primera imagen
            let imagesHTML = '';
            if (product.images.length > 0) {
                imagesHTML = `<img src="${product.images[0]}" class="product-image" alt="Imagen del producto">`;
            }
    
            // Solo mostrar el nombre y el precio del producto
            productDiv.innerHTML = `
                ${imagesHTML}
                <h4>${product.name}</h4>
                <p>Precio: $${product.price}</p>
            `;
    
    // Añadir botón "Ver detalles"
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = 'Ver detalles';
    viewDetailsButton.classList.add('view-details-btn');
    viewDetailsButton.addEventListener('click', () => {
        // Almacenar el producto seleccionado en localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        // Redirigir a detalles_productos.html
        window.location.href = 'detalles_producto.html';
    });
    productDiv.appendChild(viewDetailsButton);
    
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

    function saveRequest(name, price, category, description, images) {
        console.log('loggedInUser:', loggedInUser); // Esto mostrará el objeto loggedInUser en la consola
        
        const newRequest = {
            name: name,
            price: price,
            category: category,
            description: description,
            images: images,
            userId: loggedInUser.username,
            status: 'pending',
            seller: loggedInUser.username,
            region: loggedInUser.region || document.getElementById('region').value, // Obtener la región del formulario si está vacío
            commune: loggedInUser.commune || document.getElementById('comuna').value // Obtener la comuna del formulario si está vacío
        };
    
        requests.push(newRequest);
        localStorage.setItem('requests', JSON.stringify(requests));
        localStorage.setItem('selectedProduct', JSON.stringify(newRequest)); // Guardar el producto para mostrarlo
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

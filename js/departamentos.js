document.addEventListener('DOMContentLoaded', () => {

    var loaderDiv = document.createElement("div");
    loaderDiv.id = "loader";
    loaderDiv.className = "loader";

    var spinnerDiv = document.createElement("div");
    spinnerDiv.className = "spinner";

    loaderDiv.appendChild(spinnerDiv);
    document.body.appendChild(loaderDiv);

    // jQuery carga
    $(document).ready(function () {
        $("#loader").fadeIn(500);

        setTimeout(function () {
            $("#loader").fadeOut(500);
        }, 300);

        $("a").on("click", function (event) {
            const targetUrl = $(this).attr("href");
            window.location = targetUrl;
        });
    });

    window.onload = function () {
        const selectedDepartment = sessionStorage.getItem('selectedDepartment');
        if (selectedDepartment) {
            loadDepartmentInfo(selectedDepartment); // Cargar la información del departamento seleccionado
        } else {
            console.error("No hay un departamento seleccionado.");
        }
    };


    const body = document.body;
    const nav = document.createElement("nav");

    // Traducciones para el menú
    const menuTranslations = {
        es: {
            title: "El Salvador Map",
            home: "Inicio",
            developers: "Desarrolladores",
            form: "Formulario",
            searchPlaceholder: "Buscar...",
            zones: {
                central: "Zona Central",
                oriental: "Zona Oriental",
                pr: "Zona Occidental"
            }
        },
        en: {
            title: "El Salvador Map",
            home: "Home",
            developers: "Developers",
            form: "Form",
            searchPlaceholder: "Search...",
            zones: {
                central: "Central Zone",
                oriental: "Eastern Zone",
                pr: "Western Zone"
            }
        }
    };

    // almacenamiento del idioma en sessionStorage
    let language = sessionStorage.getItem('language') || 'es';

    // Verificar qué idioma se ha detectado
    console.log("Idioma detectado:", language);

    // Crear el menú de navegación
    nav.className = "navbar navbar-expand-lg";

    const containerDiv = document.createElement("div");
    containerDiv.className = "container-fluid";

    // Logo y nombre
    const logoLink = document.createElement("a");
    logoLink.className = "navbar-brand";
    logoLink.href = "./index.html";

    // Crear el elemento de imagen
    const logoImage = document.createElement("img");
    logoImage.src = "../img/escudo.png";
    logoImage.alt = "Logo de El Salvador Map";
    logoImage.style.width = "40px";
    logoImage.style.height = "40px";
    logoImage.style.marginRight = "10px";

    // Añadir la imagen al enlace
    logoLink.appendChild(logoImage);
    logoLink.appendChild(document.createTextNode(menuTranslations[language].title));
    containerDiv.appendChild(logoLink);


    // Botón de menú (toggler)
    const button = document.createElement("button");
    button.className = "navbar-toggler";
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#navbarNavDropdown");
    button.setAttribute("aria-controls", "navbarNavDropdown");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Toggle navigation");

    const span = document.createElement("span");
    span.className = "navbar-toggler-icon";
    button.appendChild(span);

    containerDiv.appendChild(button);

    // Div para el contenido del menú desplegable
    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse navbar-collapse";
    collapseDiv.id = "navbarNavDropdown";

    const navList = document.createElement("ul");
    navList.className = "navbar-nav ms-auto";

    // Crear los elementos del menú
    const createNavItem = (text, href) => {
        const li = document.createElement("li");
        li.className = "nav-item";

        const a = document.createElement("a");
        a.className = "nav-link";
        a.href = href;
        a.textContent = text;

        li.appendChild(a);
        return li;
    };


    navList.appendChild(createNavItem(menuTranslations[language].home, "../index.html"));

    // Crear el menú desplegable (dropdown)
    const createDropdown = (text, items) => {
        const li = document.createElement("li");
        li.className = "nav-item dropdown";

        const a = document.createElement("a");
        a.className = "nav-link dropdown-toggle";
        a.href = "#";
        a.setAttribute("role", "button");
        a.setAttribute("data-bs-toggle", "dropdown");
        a.setAttribute("aria-expanded", "false");
        a.textContent = text;

        const dropdownMenu = document.createElement("ul");
        dropdownMenu.className = "dropdown-menu";

        items.forEach(item => {
            const dropdownItem = document.createElement("a");
            dropdownItem.className = "dropdown-item";
            dropdownItem.href = "#";
            dropdownItem.textContent = item.text;
            dropdownItem.addEventListener('click', function (event) {
                event.preventDefault();
                sessionStorage.setItem('selectedDepartment', item.text); // Guarda el departamento seleccionado
                window.location.href = `../departamentos.html`;
            });
            const dropdownLi = document.createElement("li");
            dropdownLi.appendChild(dropdownItem);
            dropdownMenu.appendChild(dropdownLi);
        });

        li.appendChild(a);
        li.appendChild(dropdownMenu);
        return li;
    };

    // Verificación de zonas antes de crear dropdown
    console.log("Zonas en el idioma seleccionado:", menuTranslations[language].zones);

    // Creación de dropdowns para cada zona
    navList.appendChild(createDropdown(menuTranslations[language].zones.pr, [
        { text: "Santa Ana", departmentName: "Santa Ana" },
        { text: "Ahuachapán", departmentName: "Ahuachapán" },
        { text: "Sonsonate", departmentName: "Sonsonate" }
    ]));

    navList.appendChild(createDropdown(menuTranslations[language].zones.central, [
        { text: "La Libertad", departmentName: "La Libertad" },
        { text: "Chalatenango", departmentName: "Chalatenango" },
        { text: "San Salvador", departmentName: "San Salvador" },
        { text: "Cuscatlán", departmentName: "Cuscatlán" },
        { text: "La Paz", departmentName: "La Paz" },
        { text: "Cabañas", departmentName: "Cabañas" },
        { text: "San Vicente", departmentName: "San Vicente" }
    ]));

    navList.appendChild(createDropdown(menuTranslations[language].zones.oriental, [
        { text: "San Miguel", departmentName: "San Miguel" },
        { text: "Morazán", departmentName: "Morazán" },
        { text: "La Unión", departmentName: "La Unión" },
        { text: "Usulután", departmentName: "Usulután" }
    ]));

    // Añadir los enlaces "Desarrolladores" y "Formulario"
    navList.appendChild(createNavItem(menuTranslations[language].developers, "../desarrolladores.html"));
    navList.appendChild(createNavItem(menuTranslations[language].form, "../formulario.html"));

    // Formulario de búsqueda
    const searchForm = document.createElement("form");
    searchForm.className = "search-form ms-3";
    searchForm.setAttribute("role", "search");

    const inputSearch = document.createElement("input");
    inputSearch.className = "form-control";
    inputSearch.type = "search";
    inputSearch.id = "buscador";
    inputSearch.placeholder = menuTranslations[language].searchPlaceholder;
    inputSearch.setAttribute("aria-label", "Buscar");

    searchForm.appendChild(inputSearch);
    navList.appendChild(searchForm);

    // Añadir la lista de navegación al div colapsable
    collapseDiv.appendChild(navList);
    containerDiv.appendChild(collapseDiv);

    // Añadir todo el contenido al elemento <nav>
    nav.appendChild(containerDiv);

    // Insertar el <nav> en el cuerpo del documento
    document.body.appendChild(nav);
    //Fin del menu


    // Crear el div con el id 'sugerencias'
    const sugerenciasDiv = document.createElement("div");
    sugerenciasDiv.id = "sugerencias";



    let departmentData = {};

    // Cargar el archivo adecuado según el idioma
    let jsonFile = (language === 'en') ? '../departamentos-en.json' : '../departamentos.json';

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            departmentData = data;
        })
        .catch(error => console.error('Error al cargar el archivo:', error));

    // Asignar eventos para cambiar el idioma en el footer
    document.querySelectorAll('.language-option').forEach(item => {
        item.addEventListener('click', function () {
            const selectedLanguage = this.querySelector('span').textContent;
            const languageCode = (selectedLanguage === 'English') ? 'en' : 'es';

            // Guardar el idioma en sessionStorage y recargar
            sessionStorage.setItem('language', languageCode);
            location.reload();
        });
    });

    // Función para cargar la información del departamento (sin cambios)
    function loadDepartmentInfo(departmentName) {
        const departmentInfo = departmentData[departmentName];
        if (departmentInfo) {

        }
    }


    function loadDepartmentInfo(departmentName) {
        // Detectar el idioma guardado en sessionStorage (español por defecto)
        let language = sessionStorage.getItem('language') || 'es';
        let jsonFile = (language === 'en') ? '../departamentos-en.json' : '../departamentos.json';

        // Cargar la información del departamento del archivo adecuado
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                const departmentInfo = data[departmentName];
                if (departmentInfo) {
                    const contentDiv = document.getElementById("content");
                    contentDiv.innerHTML = ""; // Limpiar contenido previo

                    const containerFluid = document.createElement("div");
                    containerFluid.className = "container-fluid";

                    const row = document.createElement("div");
                    row.className = "row";

                    const mapDiv = document.createElement("div");
                    mapDiv.className = "col-md-6 mapadiv";
                    const mapImg = document.createElement("img");
                    mapImg.src = departmentInfo.mapImage;
                    mapImg.alt = departmentName;
                    mapImg.className = "depimg";
                    mapDiv.appendChild(mapImg);

                    const infoDiv = document.createElement("div");
                    infoDiv.className = "col-md-6 info";
                    const infoH2 = document.createElement("h2");
                    infoH2.textContent = departmentInfo.title;
                    const infoP1 = document.createElement("p");
                    infoP1.textContent = departmentInfo.description[0];
                    const carousel = createCarousel(departmentInfo.carouselImages);

                    infoDiv.append(infoH2, infoP1, carousel);
                    row.append(mapDiv, infoDiv);
                    containerFluid.append(row);
                    contentDiv.append(containerFluid);

                    // Mostrar los municipios y lugares turísticos
                    const municipiosContent = createMunicipiosSection(departmentInfo.municipios);
                    const lugaresContent = createLugaresSection(departmentInfo.lugaresTuristicos);
                    contentDiv.append(municipiosContent, lugaresContent);
                } else {
                    console.error("Información del departamento no encontrada.");
                }
            })
            .catch(error => console.error('Error al cargar el archivo JSON:', error));
    }

    // Mostrar los municipios y lugares turísticos usando jQuery
    $.ajax({
        url: jsonFile, // Utiliza el archivo correspondiente según el idioma
        method: "GET",
        dataType: "json",
        success: function (data) {
            const departmentInfo = data[departmentName];

            if (departmentInfo) {
                const contentDiv = $("#content");
                contentDiv.empty(); // Limpiar contenido previo

                const containerFluid = $("<div>").addClass("container-fluid");
                const row = $("<div>").addClass("row");

                // Sección del mapa
                const mapDiv = $("<div>").addClass("col-md-6 mapadiv");
                const mapImg = $("<img>")
                    .attr("src", departmentInfo.mapImage)
                    .attr("alt", departmentName)
                    .addClass("depimg");
                mapDiv.append(mapImg);

                // Sección de información
                const infoDiv = $("<div>").addClass("col-md-6 info");
                const infoH2 = $("<h2>").text(departmentInfo.title);
                const infoP1 = $("<p>").text(departmentInfo.description[0]);
                const carousel = createCarousel(departmentInfo.carouselImages);

                infoDiv.append(infoH2, infoP1, carousel);
                row.append(mapDiv, infoDiv);
                containerFluid.append(row);
                contentDiv.append(containerFluid);

                // Mostrar los municipios y lugares turísticos
                const municipiosContent = createMunicipiosSection(departmentInfo.municipios);
                const lugaresContent = createLugaresSection(departmentInfo.lugaresTuristicos);

                contentDiv.append(municipiosContent, lugaresContent);
            } else {
                console.error("Información del departamento no encontrada.");
            }
        },
        error: function (error) {
            console.error("Error al cargar el archivo JSON:", error);
        }
    });


    function createCarousel(images) {
        const carousel = document.createElement("div");
        carousel.id = "carouselExampleIndicators";
        carousel.className = "carousel slide";
        carousel.setAttribute("data-bs-ride", "carousel");

        const carouselIndicators = document.createElement("div");
        carouselIndicators.className = "carousel-indicators";
        images.forEach((_, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("data-bs-target", "#carouselExampleIndicators");
            button.setAttribute("data-bs-slide-to", index);
            button.className = index === 0 ? "active" : "";
            button.setAttribute("aria-current", index === 0 ? "true" : "false");
            button.setAttribute("aria-label", `Slide ${index + 1}`);
            carouselIndicators.appendChild(button);
        });

        const carouselInner = document.createElement("div");
        carouselInner.className = "carousel-inner";
        images.forEach((src, index) => {
            const item = document.createElement("div");
            item.className = index === 0 ? "carousel-item active" : "carousel-item";
            const img = document.createElement("img");
            img.src = src;
            img.className = "d-block w-100";
            item.appendChild(img);
            carouselInner.appendChild(item);
        });

        const carouselPrev = document.createElement("button");
        carouselPrev.className = "carousel-control-prev";
        carouselPrev.type = "button";
        carouselPrev.setAttribute("data-bs-target", "#carouselExampleIndicators");
        carouselPrev.setAttribute("data-bs-slide", "prev");
        carouselPrev.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

        const carouselNext = document.createElement("button");
        carouselNext.className = "carousel-control-next";
        carouselNext.type = "button";
        carouselNext.setAttribute("data-bs-target", "#carouselExampleIndicators");
        carouselNext.setAttribute("data-bs-slide", "next");
        carouselNext.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

        carousel.appendChild(carouselIndicators);
        carousel.appendChild(carouselInner);
        carousel.appendChild(carouselPrev);
        carousel.appendChild(carouselNext);

        return carousel;
    }


    function createMunicipiosSection(municipios) {
        const buttonTranslations = {
            es: "Más información sobre municipios",
            en: "More information about municipalities"
        };

        const parentContainer = document.createElement("div");
        parentContainer.className = "parent-container";

        const municipiosContainer = document.createElement("div");
        municipiosContainer.className = "containerr";

        const toggleButton = document.createElement("div");
        toggleButton.className = "toggle-button";
        toggleButton.textContent = buttonTranslations[language]; // Cambia el texto según el idioma

        // Agregar evento de clic
        toggleButton.addEventListener("click", () => {
            toggleContent('municipios');
        });

        const municipiosContent = document.createElement("div");
        municipiosContent.id = "municipios";
        municipiosContent.className = "toggle-content";
        municipiosContent.style.display = "none";

        const municipiosList = document.createElement("ul");
        municipiosList.className = "municipios-list";

        municipios.forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;
            municipiosList.appendChild(li);
        });

        municipiosContent.appendChild(municipiosList);
        municipiosContainer.appendChild(toggleButton);
        municipiosContainer.appendChild(municipiosContent);
        parentContainer.appendChild(municipiosContainer);

        function updateButtonText() {
            let currentLanguage = sessionStorage.getItem('language') || 'es';
            toggleButton.textContent = buttonTranslations[currentLanguage];
        }

        return parentContainer;
    }

    function createLugaresSection(lugares) {
        const headerTranslations = {
            es: "Lugares Turísticos",
            en: "Tourist Attractions"
        };

        const lugaresContainer = document.createElement("div");
        lugaresContainer.className = "lugares-container container";

        const lugaresDiv = document.createElement("div");
        lugaresDiv.className = "lugares";

        const lugaresH2 = document.createElement("h2");
        lugaresH2.textContent = headerTranslations[language];

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        // Usar el parámetro 'lugares'
        lugares.forEach(lugar => {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = lugar.img;
            const p = document.createElement("p");
            p.textContent = lugar.nombre;
            div.appendChild(img);
            div.appendChild(p);
            imageContainer.appendChild(div);
        });

        lugaresDiv.appendChild(lugaresH2);
        lugaresDiv.appendChild(imageContainer);
        lugaresContainer.appendChild(lugaresDiv);
        function updateHeaderText() {
            let currentLanguage = sessionStorage.getItem('language') || 'es';
            lugaresH2.textContent = headerTranslations[currentLanguage];
        }

        return lugaresContainer;
    }

    // Función para agregar ambos elementos a un solo contenedor
    function renderSections(municipios, lugares) {
        const flexContainer = document.createElement("div"); // Crea el contenedor principal
        flexContainer.className = "flex-container"; // Aplica clase flex

        const municipiosContent = createMunicipiosSection(municipios);
        const lugaresContent = createLugaresSection(lugares);

        // Agrega las secciones dentro del contenedor flex
        flexContainer.appendChild(municipiosContent);
        flexContainer.appendChild(lugaresContent);

        // Asumiendo que tienes un elemento con id 'content' donde se inserta el contenedor
        document.getElementById('content').appendChild(flexContainer);
    }


    function toggleContent(id) {
        $(`#${id}`).slideToggle();  // Alterna con animación deslizante
    }

    // Ejemplo de cómo llamar esta función en tu código:
    const toggleButton = document.createElement("div");
    toggleButton.className = "toggle-button";
    toggleButton.textContent = "Más información sobre municipios";
    toggleButton.addEventListener("click", () => toggleContent('municipios'));  // Llamada a la función


    function loadDepartmentInfo(departmentName) {
        const contentDiv = $("#content");
        const loadingDiv = $("#loading");

        loadingDiv.show();
        contentDiv.fadeOut(300, function () {
            const departmentInfo = departmentData[departmentName];

            if (departmentInfo) {
                contentDiv.html("");
                document.title = departmentName;

                const containerFluid = $("<div>").addClass("container-fluid");
                const row = $("<div>").addClass("row");

                const mapDiv = $("<div>").addClass("col-md-6 mapadiv");
                const mapImg = $("<img>").attr({
                    src: departmentInfo.mapImage,
                    alt: departmentName
                }).addClass("depimg");
                mapDiv.append(mapImg);

                const infoDiv = $("<div>").addClass("col-md-6 info");
                const infoH2 = $("<h2>").text(departmentInfo.title);
                const infoP1 = $("<p>").text(departmentInfo.description[0]);
                const carousel = createCarousel(departmentInfo.carouselImages);

                infoDiv.append(infoH2, infoP1, carousel);
                row.append(mapDiv, infoDiv);
                containerFluid.append(row);
                contentDiv.append(containerFluid);

                // Crear y mostrar las secciones de municipios y lugares turísticos
                renderSections(departmentInfo.municipios, departmentInfo.lugaresTuristicos);
            } else {
                console.error("Información del departamento no encontrada.");
            }

            loadingDiv.hide();
            contentDiv.fadeIn(300);
        });
    }

    document.body.appendChild(sugerenciasDiv);
    var contentDiv = document.createElement("div");
    contentDiv.id = "content";
    document.body.appendChild(contentDiv);


    //AJAX
    $(document).ready(function () {
        // Prevenir que el formulario envíe los datos y recargue la página
        $(".search-form").on("submit", function (e) {
            e.preventDefault(); 
        });
    
        // Escucha el evento de escritura en el buscador
        $("#buscador").on("input", function () {
            let query = $(this).val().toLowerCase();
    
            // Limpia las sugerencias cuando el input esté vacío
            if (query === "") {
                $("#sugerencias").empty();
                return;
            }
    
            // Determinar el idioma y la ruta del archivo JSON correspondiente
            let language = sessionStorage.getItem('language') || 'es'; // Por defecto en español
            let jsonFile = language === 'en' ? "../search-en.json" : "../search.json";

            // Solicita el archivo JSON con AJAX
            $.ajax({
                url: jsonFile,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    // Filtra los departamentos según lo que el usuario escribió
                    let resultados = data.filter(departamento =>
                        departamento.nombre.toLowerCase().startsWith(query)
                    );
    
                    // Limpia el contenedor de sugerencias
                    $("#sugerencias").empty();
    
                    // Genera dinámicamente los resultados
                    if (resultados.length > 0) {
                        resultados.forEach(departamento => {
                            $("#sugerencias").append(`
                                <div class="sugerencia" data-department="${departamento.nombre}">
                                    <a href="#">
                                        <img src="${departamento.imagen}" alt="${departamento.nombre}" width="75">
                                        <p><strong>${departamento.nombre}</strong> <br>${departamento.zona}</p>
                                    </a>   
                                </div>
                            `);
                        });
    
                        // Agrega un evento 'click' para cargar la información del departamento cuando se selecciona
                        $(".sugerencia").on("click", function (e) {
                            e.preventDefault(); // Previene redirección
                            let selectedDepartment = $(this).data("department");
                            sessionStorage.setItem("selectedDepartment", selectedDepartment);
                            window.location.href = "departamentos.html";
                        });
                    } else {
                        $("#sugerencias").append("<p>No hay coincidencias</p>");
                    }
                },
                error: function (error) {
                    console.log("Error al cargar los datos: ", error);
                }
            });
        });
    });

    $(document).ready(function () {
        const sugerencias = $('#sugerencias');
        const buscador = $('#buscador');

        // Mostrar sugerencias al hacer clic en el input
        buscador.focus(function () {
            sugerencias.fadeIn(300); // Muestra las sugerencias con una animación
        });

        // Ocultar sugerencias al hacer clic en otro lugar
        $(document).click(function (event) {
            if (!buscador.is(event.target) && !sugerencias.is(event.target) && sugerencias.has(event.target).length === 0) {
                sugerencias.fadeOut(300); // Oculta las sugerencias con una animación
            }
        });

        // Ocultar sugerencias al hacer clic en una sugerencia
        $('.sugerencia').click(function () {
            sugerencias.fadeOut(300); // Oculta las sugerencias al seleccionar una
        });
    });

    // Código para el dropdown y otras funcionalidades
    $(document).ready(function () {
        // Inicialmente aseguramos que el dropdown esté oculto
        $('.dropdown-menu').hide();

        // Cambiar el color del texto del enlace de 'Inicio' cuando se haga clic
        $('.nav-link').on('click', function () {
            $(this).css('color', 'white');
        });

        // Mostrar el dropdown con un efecto de deslizamiento suave
        $('.dropdown-toggle').on('click', function (event) {
            event.preventDefault(); // Evitar comportamiento predeterminado

            var $dropdownMenu = $(this).next('.dropdown-menu');

            // Si el menú está visible, lo ocultamos
            if ($dropdownMenu.is(':visible')) {
                $dropdownMenu.slideUp();
            } else {
                // Si no está visible, nos aseguramos de cerrar los otros menús abiertos
                $('.dropdown-menu').slideUp();
                $dropdownMenu.slideDown(); // Desplegamos el menú actual
            }
        });

        // Cerrar el menú cuando se haga clic fuera del dropdown
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.dropdown-toggle').length) {
                $('.dropdown-menu').slideUp();
            }
        });
    });

    function createFooter() {
        // Traducciones para el contenido del footer en español e inglés
        const translations = {
            es: {
                title: 'República de El Salvador',
                text: 'El Salvador es conocido por sus impresionantes paisajes, hermosas playas y rica cultura. Es el país más pequeño de Centroamérica, famoso por su amabilidad y su deliciosa gastronomía, como las pupusas. El Salvador ofrece una mezcla única de naturaleza y tradición, convirtiéndolo en un destino atractivo para los visitantes.',
                linksTitle: 'Enlaces',
                links: ['Inicio', 'Desarrolladores', 'Formulario'],
                languageTitle: 'Idiomas',
                copyright: '&copy; 2024 Ministerio de Turismo El Salvador'
            },
            en: {
                title: 'Republic of El Salvador',
                text: 'El Salvador is known for its stunning landscapes, beautiful beaches, and rich culture. It is the smallest country in Central America, famous for its hospitality and delicious cuisine, like pupusas. El Salvador offers a unique blend of nature and tradition, making it an attractive destination for visitors.',
                linksTitle: 'Links',
                links: ['Home', 'Developers', 'Form'],
                languageTitle: 'Languages',
                copyright: '&copy; 2024 Ministry of Tourism El Salvador'
            }
        };

        // Detectar el idioma almacenado en sessionStorage, español como predeterminado
        let language = sessionStorage.getItem('language') || 'es';
        const footerContent = translations[language];

        // Crear el footer
        const footer = document.createElement('footer');
        footer.style.backgroundColor = '#6f9c76'; // Color de fondo

        const container = document.createElement('div');
        container.className = 'container p-4';

        const row = document.createElement('div');
        row.className = 'row';

        // Columna para contenido del footer
        const contentCol = document.createElement('div');
        contentCol.className = 'col-lg-6 col-md-12 mb-4';

        const contentTitle = document.createElement('h5');
        contentTitle.className = 'mb-3';
        contentTitle.style.letterSpacing = '2px';
        contentTitle.style.color = '#fff';
        contentTitle.textContent = footerContent.title;

        const contentText = document.createElement('p');
        contentText.style.color = '#fff';
        contentText.style.marginBottom = '20px';
        contentText.textContent = footerContent.text;

        contentCol.appendChild(contentTitle);
        contentCol.appendChild(contentText);
        row.appendChild(contentCol);

        // Columna para links
        const linksCol = document.createElement('div');
        linksCol.className = 'col-lg-3 col-md-6 mb-4';

        const linksTitle = document.createElement('h5');
        linksTitle.className = 'mb-3';
        linksTitle.style.letterSpacing = '2px';
        linksTitle.style.color = '#fff';
        linksTitle.textContent = footerContent.linksTitle;

        const linksList = document.createElement('ul');
        linksList.className = 'list-unstyled mb-0';

        footerContent.links.forEach(linkText => {
            const listItem = document.createElement('li');
            listItem.className = 'mb-1';

            const linkElement = document.createElement('a');
            linkElement.href = '#!';
            linkElement.style.color = '#fff';
            linkElement.textContent = linkText;

            listItem.appendChild(linkElement);
            linksList.appendChild(listItem);
        });

        linksCol.appendChild(linksTitle);
        linksCol.appendChild(linksList);
        row.appendChild(linksCol);

        // Columna para selección de idiomas con banderas
        const languageCol = document.createElement('div');
        languageCol.className = 'col-lg-3 col-md-6 mb-4';

        const languageTitle = document.createElement('h5');
        languageTitle.className = 'mb-3';
        languageTitle.style.letterSpacing = '2px';
        languageTitle.style.color = '#fff';
        languageTitle.textContent = footerContent.languageTitle;

        const languageContainer = document.createElement('div');
        languageContainer.className = 'd-flex flex-column';

        // Lista de idiomas con banderas
        const languages = [
            { code: "en", name: "English", flagSrc: "../img/banderas/us.svg" },
            { code: "es", name: "Español", flagSrc: "../img/banderas/es.svg" }
        ];

        languages.forEach(language => {
            const languageOption = document.createElement('div');
            languageOption.className = 'language-option d-flex align-items-center my-2';

            // Crear la imagen de la bandera
            const flagImg = document.createElement('img');
            flagImg.src = language.flagSrc;
            flagImg.alt = `${language.name} flag`;
            flagImg.style.width = '30px';
            flagImg.style.marginRight = '10px';

            // Crear el texto del idioma
            const languageText = document.createElement('span');
            languageText.textContent = language.name;
            languageText.style.cursor = 'pointer';
            languageText.style.fontSize = '18px';
            languageText.style.color = '#fff';

            // Agregar evento para cambiar el idioma y almacenar en sessionStorage
            languageOption.addEventListener('click', function () {
                sessionStorage.setItem('language', language.code); // Guardar el idioma seleccionado
                location.reload(); // Recargar la página para aplicar el cambio de idioma
            });

            // Agregar la bandera y el texto al div del idioma
            languageOption.appendChild(flagImg);
            languageOption.appendChild(languageText);

            // Agregar el idioma al contenedor de idiomas
            languageContainer.appendChild(languageOption);
        });

        languageCol.appendChild(languageTitle);
        languageCol.appendChild(languageContainer);
        row.appendChild(languageCol);

        container.appendChild(row);
        footer.appendChild(container);

        // Copyright
        const copyright = document.createElement('div');
        copyright.className = 'text-center p-3';
        copyright.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        copyright.style.color = '#fff'; // Color del texto
        copyright.innerHTML = footerContent.copyright;

        footer.appendChild(copyright);

        // Append footer to body
        document.body.appendChild(footer);
    }

    createFooter();



});

// Función para mostrar/ocultar contenido
function toggleContent(id) {
    var content = document.getElementById(id);
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}
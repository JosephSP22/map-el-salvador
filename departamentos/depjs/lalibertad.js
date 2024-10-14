document.addEventListener('DOMContentLoaded', () => {

    window.onload = function() {
        const selectedDepartment = sessionStorage.getItem('selectedDepartment');
        if (selectedDepartment) {
            loadDepartmentInfo(selectedDepartment); // Cargar la información del departamento seleccionado
        } else {
            console.error("No hay un departamento seleccionado.");
        }
    };
    
    const body = document.body;
    const nav = document.createElement("nav");
    nav.className = "navbar navbar-expand-lg";
    
    const containerDiv = document.createElement("div");
    containerDiv.className = "container-fluid";
    
    // Logo y nombre
    const logoLink = document.createElement("a");
    logoLink.className = "navbar-brand";
    logoLink.href = "#";
    logoLink.appendChild(document.createTextNode("El Salvador Map"));
    containerDiv.appendChild(logoLink);
    
    // Agregar el enlace "Inicio"

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
    
    // Función para crear los elementos del menú
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
     navList.appendChild(createNavItem("Inicio", "../index.html"));
    
    // Función para crear un menú desplegable (dropdown)
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
            dropdownItem.setAttribute("data-department", item.departmentName); // Agregar atributo data-department
            dropdownItem.addEventListener("click", function (event) {
                event.preventDefault();
                const departmentName = this.getAttribute("data-department");
                sessionStorage.setItem("selectedDepartment", departmentName);
                loadDepartmentInfo(departmentName);
            });
    
            const dropdownLi = document.createElement("li");
            dropdownLi.appendChild(dropdownItem);
            dropdownMenu.appendChild(dropdownLi);
        });
    
        li.appendChild(a);
        li.appendChild(dropdownMenu);
        return li;
    };
    
    // Crear los dropdowns por zona
    navList.appendChild(createDropdown("Zona Occidental", [
        { text: "Santa Ana", departmentName: "Santa Ana" },
        { text: "Ahuachapán", departmentName: "Ahuachapán" },
        { text: "Sonsonate", departmentName: "Sonsonate" }
    ]));
    
    navList.appendChild(createDropdown("Zona Central", [
        { text: "La Libertad", departmentName: "La Libertad" },
        { text: "Chalatenango", departmentName: "Chalatenango" },
        { text: "San Salvador", departmentName: "San Salvador" },
        { text: "Cuscatlán", departmentName: "Cuscatlán" },
        { text: "La Paz", departmentName: "La Paz" },
        { text: "Cabañas", departmentName: "Cabañas" },
        { text: "San Vicente", departmentName: "San Vicente" }
    ]));
    
    navList.appendChild(createDropdown("Zona Oriental", [
        { text: "San Miguel", departmentName: "San Miguel" },
        { text: "Morazán", departmentName: "Morazán" },
        { text: "La Unión", departmentName: "La Unión" },
        { text: "Usulután", departmentName: "Usulután" }
    ]));
    
    // Añadir los enlaces "Desarrolladores" y "Formulario"
    navList.appendChild(createNavItem("Desarrolladores", "../desarrolladores.html"));
    navList.appendChild(createNavItem("Formulario", "../formulario.html"));
    
    // Formulario de búsqueda
    const searchForm = document.createElement("form");
    searchForm.className = "search-form ms-3";
    searchForm.setAttribute("role", "search");
    
    const inputSearch = document.createElement("input");
    inputSearch.className = "form-control";
    inputSearch.type = "search";
    inputSearch.id = "buscador";
    inputSearch.placeholder = "Buscar...";
    inputSearch.setAttribute("aria-label", "Buscar");
    
    searchForm.appendChild(inputSearch);
    navList.appendChild(searchForm);
    
    // Añadir la lista de navegación al div colapsable
    collapseDiv.appendChild(navList);
    containerDiv.appendChild(collapseDiv);
    nav.appendChild(containerDiv);
    
    // Insertar el <nav> en el cuerpo del documento
    document.body.appendChild(nav);

    // Asignar eventos a los dropdown items
    // document.querySelectorAll('a[data-department]').forEach(item => {
    //     item.addEventListener('click', function (event) {
    //         event.preventDefault(); // Prevenir redirección
    //         const departmentName = this.getAttribute('data-department');
    //         loadDepartmentInfo(departmentName); // Llamar la función para cargar info
    //     });
    // });



    //Fin del menu


    //Sesion Storage



    // Crear el div con el id 'sugerencias'
    const sugerenciasDiv = document.createElement("div");
    sugerenciasDiv.id = "sugerencias";

    // Insertar el div en el cuerpo del documento


    let departmentData = {};

    // Cargar el archivo departamentos.json
    fetch('../departamentos.json')
        .then(response => response.json())
        .then(data => {
            departmentData = data;
        })
        .catch(error => console.error('Error al cargar departamentos.json:', error));

    // Asignar eventos a los dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir redirección

            const departmentName = this.textContent.trim(); // Obtiene el nombre del departamento
            loadDepartmentInfo(departmentName); // Llamar la función para cargar info
        });
    });

    function loadDepartmentInfo(departmentName) {
        fetch('../departamentos.json')
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
                } else {
                    console.error("Información del departamento no encontrada.");
                }
            })
            .catch(error => console.error('Error al cargar departamentos.json:', error));;

        // Mostrar los municipios y lugares turísticos
        $.ajax({
            url: "../departamentos.json", // Archivo que contiene la info detallada de los departamentos
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
                console.error("Error al cargar el archivo departamentos.json:", error);
            }
        });
    }

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
        const parentContainer = document.createElement("div");
        parentContainer.className = "parent-container";
    
        const municipiosContainer = document.createElement("div");
        municipiosContainer.className = "containerr";
    
        const toggleButton = document.createElement("div");
        toggleButton.className = "toggle-button";
        toggleButton.textContent = "Más información sobre municipios";
        toggleButton.addEventListener("click", () => toggleContent('municipios'));
    
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
    
        return parentContainer; // Retorna el contenedor
    }
    
    function createLugaresSection(lugares) {
        const lugaresContainer = document.createElement("div");
        lugaresContainer.className = "lugares-container container"; // Asegúrate de que tenga la clase 'lugares-container'
    
        const lugaresDiv = document.createElement("div");
        lugaresDiv.className = "lugares";
    
        const lugaresH2 = document.createElement("h2");
        lugaresH2.textContent = "Lugares Turísticos";
    
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
    
        return lugaresContainer; // Retorna el contenedor
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

    //Cargando

    var loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.style.display = "none";

    var loadingText = document.createElement("p");
    loadingText.textContent = "Cargando...";

    loadingDiv.appendChild(loadingText);
    document.body.insertBefore(loadingDiv, document.getElementById("content"));



    $(document).ready(function () {
        // Prevenir que el formulario envíe los datos y recargue la página
        $(".search-form").on("submit", function (e) {
            e.preventDefault(); // Previene el comportamiento por defecto del formulario
        });
    
        // Escucha el evento de escritura en el buscador
        $("#buscador").on("input", function () {
            let query = $(this).val().toLowerCase();
    
            // Limpia las sugerencias cuando el input esté vacío
            if (query === "") {
                $("#sugerencias").empty();
                return;
            }
    
            // Solicita el archivo JSON con AJAX
            $.ajax({
                url: "../search.json", // Ruta del archivo JSON
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
                            // Agrega la información dinámica y un evento click para cargar más detalles
                            $("#sugerencias").append(`
                                <div class="sugerencia" data-department="${departamento.nombre}">
                                    <a href="#">
                                        <img src="${departamento.imagen}" alt="${departamento.nombre}" width="75">
                                        <p><strong>${departamento.nombre}</strong> <br> Zona ${departamento.zona}</p>
                                    </a>   
                                </div>
                            `);
                        });
    
                        // Agrega un evento 'click' para cargar la información del departamento cuando se selecciona
                        $(".sugerencia").on("click", function (e) {
                            e.preventDefault(); // Previene redirección
                            let selectedDepartment = $(this).data("department");
    
                            // Llama a la función que cargará la información del departamento
                            loadDepartmentInfo(selectedDepartment);
    
                            // Limpia el input de búsqueda
                            $("#buscador").val(""); // Limpiar el input
                            $("#sugerencias").empty(); // Limpiar las sugerencias
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
        contentTitle.style.color = '#fff'; // Color del texto
        contentTitle.textContent = 'República de El Salvador';
        
        const contentText = document.createElement('p');
        contentText.style.color = '#fff'; // Color del texto
        contentText.style.marginBottom = '20px'; // Espacio entre descripción y enlaces
        contentText.textContent = 'El Salvador es conocido por sus impresionantes paisajes, hermosas playas y rica cultura. Es el país más pequeño de Centroamérica, famoso por su amabilidad y su deliciosa gastronomía, como las pupusas. El Salvador ofrece una mezcla única de naturaleza y tradición, convirtiéndolo en un destino atractivo para los visitantes.';
    
        contentCol.appendChild(contentTitle);
        contentCol.appendChild(contentText);
        row.appendChild(contentCol);
    
        // Columna para links
        const linksCol = document.createElement('div');
        linksCol.className = 'col-lg-3 col-md-6 mb-4';
        
        const linksTitle = document.createElement('h5');
        linksTitle.className = 'mb-3';
        linksTitle.style.letterSpacing = '2px';
        linksTitle.style.color = '#fff'; // Color del texto
        linksTitle.textContent = 'Enlaces';
    
        const linksList = document.createElement('ul');
        linksList.className = 'list-unstyled mb-0';
        
        const linkItems = [
            { text: 'Inicio', href: '#!' },
            { text: 'Desarrolladores', href: '#!' },
            { text: 'Formulario', href: '#!' }
        ];
    
        linkItems.forEach(link => {
            const listItem = document.createElement('li');
            listItem.className = 'mb-1';
            
            const linkElement = document.createElement('a');
            linkElement.href = link.href; // Enlace asignado
            linkElement.style.color = '#fff'; // Color del texto
            linkElement.textContent = link.text;
    
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
        languageTitle.style.color = '#fff'; // Color del texto
        languageTitle.textContent = 'Idiomas';
    
        const languageContainer = document.createElement('div');
        languageContainer.className = 'd-flex flex-column'; // Cambié a columna
    
        // Lista de idiomas con banderas
        const languages = [
            { code: "en", name: "English", flagSrc: "../img/banderas/us.svg" },
            { code: "es", name: "Español", flagSrc: "../img/banderas/es.svg" },
            // { code: "pt", name: "Português", flagSrc: "../img/banderas/pt.svg" },
            // { code: "fr", name: "Français", flagSrc: "../img/banderas/fr.svg" }
        ];
    
        languages.forEach(language => {
            const languageOption = document.createElement('div');
            languageOption.className = 'language-option d-flex align-items-center my-2'; // Espaciado entre filas
    
            // Crear la imagen de la bandera
            const flagImg = document.createElement('img');
            flagImg.src = language.flagSrc;
            flagImg.alt = `${language.name} flag`;
            flagImg.style.width = '30px'; // Tamaño ajustable de la bandera
            flagImg.style.marginRight = '10px';
    
            // Crear el texto del idioma
            const languageText = document.createElement('span');
            languageText.textContent = language.name;
            languageText.style.cursor = 'pointer';
            languageText.style.fontSize = '18px';
            languageText.style.color = '#fff'; // Color del texto
    
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
        copyright.innerHTML = `&copy; 2024 Ministerio de Turismo El Salvador`;
    
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
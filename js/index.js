document.addEventListener('DOMContentLoaded', () => {
    //Pantalla de Carga
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



    // Crear Nav

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
    document.body.appendChild(sugerenciasDiv);


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

    // Mostrar sugerencias al hacer clic en el input
    $(document).ready(function () {
        const sugerencias = $('#sugerencias');
        const buscador = $('#buscador');

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

    // Código para el dropdown
    $(document).ready(function () {
        // Inicialmente aseguramos que el dropdown esté oculto
        $('.dropdown-menu').hide();

        $('.nav-link').on('click', function () {
            $(this).css('color', 'white');
        });

        // Mostrar el dropdown con un efecto de deslizamiento suave
        $('.dropdown-toggle').on('click', function (event) {
            event.preventDefault(); // Evitar comportamiento predeterminado

            var $dropdownMenu = $(this).next('.dropdown-menu');

            // Si el menú está visible, se oculta
            if ($dropdownMenu.is(':visible')) {
                $dropdownMenu.slideUp();
            } else {
                $('.dropdown-menu').slideUp();
                $dropdownMenu.slideDown();
            }
        });

        // Cerrar el menú cuando se haga clic fuera del dropdown
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.dropdown-toggle').length) {
                $('.dropdown-menu').slideUp();
            }
        });
    });

    // let jsonFile = language === 'en' ? '../info-en.json' : '../info-es.json';
    // Definimos un objeto con las traducciones
    const messages = {
        es: {
            ahuachapan: {
                title: 'Ahuachapán',
                info: 'Cabecera departamental: Ahuachapán <br> Extensión territorial: 1,239 km² <br> Fiesta patronal: Nuestra Señora de la Asunción, 9 de febrero <br> Número de habitantes: 333,000'
            },
            santaAna: {
                title: 'Santa Ana',
                info: 'Cabecera departamental: Santa Ana <br> Extensión territorial: 2,023 km² <br> Fiesta patronal: Nuestra Señora Santa Ana, 17 de julio <br> Número de habitantes: 572,000'
            },
            chalatenango: {
                title: 'Chalatenango',
                info: 'Cabecera departamental: Chalatenango <br> Extensión territorial: 2,017 km² <br> Fiesta patronal: San Juan Bautista, 24 de junio <br> Número de habitantes: 202,000'
            },
            laUnion: {
                title: 'La Unión',
                info: 'Cabecera departamental: La Unión <br> Extensión territorial: 2,074 km² <br> Fiesta patronal: San Carlos Borromeo, 15 de enero <br> Número de habitantes: 372,000'
            },
            morazan: {
                title: 'Morazán',
                info: 'Cabecera departamental: San Francisco Gotera <br> Extensión territorial: 1,447 km² <br> Fiesta patronal: San Francisco de Asís, 4 de octubre <br> Número de habitantes: 199,000'
            },
            sanMiguel: {
                title: 'San Miguel',
                info: 'Cabecera departamental: San Miguel <br> Extensión territorial: 2,077 km² <br> Fiesta patronal: San Miguel Arcángel, 29 de septiembre <br> Número de habitantes: 518,000'
            },
            sonsonate: {
                title: 'Sonsonate',
                info: 'Cabecera departamental: Sonsonate <br> Extensión territorial: 1,226 km² <br> Fiesta patronal: San Juan Bautista, 25 de enero <br> Número de habitantes: 438,000'
            },
            laLibertad: {
                title: 'La Libertad',
                info: 'Cabecera departamental: Santa Tecla <br> Extensión territorial: 1,653 km² <br> Fiesta patronal: San Juan Evangelista, 23 de diciembre <br> Número de habitantes: 747,000'
            },
            laPaz: {
                title: 'La Paz',
                info: 'Cabecera departamental: Zacatecoluca <br> Extensión territorial: 1,223 km² <br> Fiesta patronal: Nuestra Señora de los Ángeles, 8 de diciembre <br> Número de habitantes: 328,000'
            },
            usulutan: {
                title: 'Usulután',
                info: 'Cabecera departamental: Usulután <br> Extensión territorial: 2,130 km² <br> Fiesta patronal: San Miguel Arcángel, 24 de octubre <br> Número de habitantes: 366,000'
            },
            sanVicente: {
                title: 'San Vicente',
                info: 'Cabecera departamental: San Vicente <br> Extensión territorial: 1,184 km² <br> Fiesta patronal: San Vicente de Paúl, 5 de diciembre <br> Número de habitantes: 174,000'
            },
            cabañas: {
                title: '¿Cabañas?🤔🤔🤷',
                info: 'Cabecera departamental: Sensuntepeque <br> Extensión territorial: 1,103 km² <br> Fiesta patronal: San Juan de Dios, 8 de marzo <br> Número de habitantes: 164,000'
            },
            cuscatlan: {
                title: 'Cuscatlán',
                info: 'Cabecera departamental: Sensuntepeque <br> Extensión territorial: 1,104 km² <br> Fiesta patronal: Santa Bárbara, 4 de diciembre <br> Número de habitantes: 149,000'
            },
            sanSalvador: {
                title: 'San Salvador',
                info: 'Cabecera departamental: San Salvador <br> Extensión territorial: 886 km² <br> Fiesta patronal: El Divino Salvador del Mundo, 6 de agosto <br> Número de habitantes: 1,740,000'
            }
        },
        en: {
            ahuachapan: {
                title: 'Ahuachapán',
                info: 'Department Capital: Ahuachapán <br> Territorial extension: 1,239 km² <br> Patron Saint Festival: Our Lady of the Assumption, February 9 <br> Population: 333,000'
            },
            santaAna: {
                title: 'Santa Ana',
                info: 'Department Capital: Santa Ana <br> Territorial extension: 2,023 km² <br> Patron Saint Festival: Our Lady of Santa Ana, July 17 <br> Population: 572,000'
            },
            chalatenango: {
                title: 'Chalatenango',
                info: 'Department Capital: Chalatenango <br> Territorial extension: 2,017 km² <br> Patron Saint Festival: Saint John the Baptist, June 24 <br> Population: 202,000'
            },
            laUnion: {
                title: 'La Unión',
                info: 'Department Capital: La Unión <br> Territorial extension: 2,074 km² <br> Patron Saint Festival: Saint Charles Borromeo, January 15 <br> Population: 372,000'
            },
            morazan: {
                title: 'Morazán',
                info: 'Department Capital: San Francisco Gotera <br> Territorial extension: 1,447 km² <br> Patron Saint Festival: Saint Francis of Assisi, October 4 <br> Population: 199,000'
            },
            sanMiguel: {
                title: 'San Miguel',
                info: 'Department Capital: San Miguel <br> Territorial extension: 2,077 km² <br> Patron Saint Festival: Saint Michael the Archangel, September 29 <br> Population: 518,000'
            },
            sonsonate: {
                title: 'Sonsonate',
                info: 'Department Capital: Sonsonate <br> Territorial extension: 1,226 km² <br> Patron Saint Festival: Saint John the Baptist, January 25 <br> Population: 438,000'
            },
            laLibertad: {
                title: 'La Libertad',
                info: 'Department Capital: Santa Tecla <br> Territorial extension: 1,653 km² <br> Patron Saint Festival: Saint John the Evangelist, December 23 <br> Population: 747,000'
            },
            laPaz: {
                title: 'La Paz',
                info: 'Department Capital: Zacatecoluca <br> Territorial extension: 1,223 km² <br> Patron Saint Festival: Our Lady of the Angels, December 8 <br> Population: 328,000'
            },
            usulutan: {
                title: 'Usulután',
                info: 'Department Capital: Usulután <br> Territorial extension: 2,130 km² <br> Patron Saint Festival: Saint Michael the Archangel, October 24 <br> Population: 366,000'
            },
            sanVicente: {
                title: 'San Vicente',
                info: 'Department Capital: San Vicente <br> Territorial extension: 1,184 km² <br> Patron Saint Festival: Saint Vincent de Paul, December 5 <br> Population: 174,000'
            },
            cabañas: {
                title: 'Cabañas?🤔🤔🤷',
                info: 'Department Capital: Sensuntepeque <br> Territorial extension: 1,103 km² <br> Patron Saint Festival: Saint John of God, March 8 <br> Population: 164,000'
            },
            cuscatlan: {
                title: 'Cuscatlán',
                info: 'Department Capital: Sensuntepeque <br> Territorial extension: 1,104 km² <br> Patron Saint Festival: Saint Barbara, December 4 <br> Population: 149,000'
            },
            sanSalvador: {
                title: 'San Salvador',
                info: 'Department Capital: San Salvador <br> Territorial extension: 886 km² <br> Patron Saint Festival: The Divine Savior of the World, August 6 <br> Population: 1,740,000'
            }            
        }        
    };    


    // Crear el mapa SVG
    const mapDiv = document.createElement('div');
    mapDiv.classList.add('mapadiv'); // <div class="mapadiv">

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('version', '1.2'); // <svg version="1.2">
    svg.setAttribute('viewBox', '0 0 1000 547'); // <svg viewBox="0 0 1000 547">
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); // <svg xmlns="http://www.w3.org/2000/svg">

    const features = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    features.setAttribute('id', 'features'); // <g id="features">

    // Aqui se agregan los PATH de cada departamento
    // Ahuchapan a

    const aElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    aElement.setAttribute('href', '#');

    const pathAhuachapan = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathAhuachapan.setAttribute('d', 'M183.1 180l3.2 1.3 6.8 4.3 1.3 1.2 0.7 0.8 0.4 0.8 0.8 3.2 0.4 0.9 0.6 0.9 1.3 1.3 1.6 1.2 1.3 1.4 0.1 0.1 0.8 1.5 0.3 0.9-1.1 6.9-7.5 25.9-6.7 2.8-8.2 2.3-4.6 0.7-1 0.7-0.8 1.1-0.4 2.5-0.1 1.6 0.9 7.2 0.6 2.3 0.7 1.7 0.9 1.8 0.3 0.9-0.2 1.3-7.6 11.7-0.7 2.1-0.2 1.6 3.1 10 0.4 2.2-0.5 1.5-1.1 1.8-2.8 3.4-1.1 2.1-0.6 1.6-0.3 3.6-0.3 1-4.8 8.6-0.7 1.9-2.1 8.6-1.9 0.8-3.1 0.4-11.3-0.7-2.3-0.5-0.8-0.5-2.7-2.6-4.9-5.7-0.8-0.6-1.5-1.1-0.9-0.4-1-0.4-1.4-0.1-1.5 0-2.1 0.4-1.3 0.4-1.1 0.5-0.9 0.6-1.1 0.9-2.8 3.4-5.9 9.4-0.9 1.4-25.4-11.6-29-14-6-25.1-0.1-6 0.9-6.3 2-6.1 3-5.6 4.5-4.6 10.3-5.5 4.6-3.8 3.4-5.4 2.5-5.6 3.2-5.5 5.6-4.9 36.1-25.3 7.9-8 4-2.7 16.7-6.3 5.5-0.4 6.8 1.8 9.8 7.6 5.5 2.3 5.5-3 0.1-2.2-0.3-0.6z');
    pathAhuachapan.setAttribute('id', 'SVAH'); // <path id="SVAH">
    pathAhuachapan.setAttribute('name', 'Ahuachapán'); // <path name="Ahuachapán">

    // Evento click para redirigir y guardar el departamento
    pathAhuachapan.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Ahuachapán');
        window.location.href = '../departamentos.html'; // Redirige a la página 
    });
    // Evento mouseenter para mostrar la caja de información
    pathAhuachapan.addEventListener('mouseenter', event => {
        const message = messages[language]?.ahuachapan || messages['es'].ahuachapan; // Usar español por defecto si el idioma no está definido
        showInfoBox(event, message.title, message.info);
    });

    pathAhuachapan.addEventListener('mouseleave', hideInfoBox);

    aElement.appendChild(pathAhuachapan);
    features.appendChild(aElement);



    // Santa Ana b 
    const bElementSantaAna = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    bElementSantaAna.setAttribute('href', '#');
    const pathSantaAna = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathSantaAna.setAttribute('d', 'M194.1 232.6l7.5-25.9 1.1-6.9-0.3-0.9-0.8-1.5-0.1-0.1-1.3-1.4-1.6-1.2-1.3-1.3-0.6-0.9-0.4-0.9-0.8-3.2-0.4-0.8-0.7-0.8-1.3-1.2-6.8-4.3-3.2-1.3-2.4-5.6-0.3-3 1-3.2 16.1-28.4 7.5-8.2 9.4-7.3 9.9-4.6 40.3-9.7 2.5-2.4-0.1-6-1.2-1.6-4.8-2.4-1.6-1.6-0.7-2.5-0.7-5.9-0.5-1.8-2.2-4.2-1-1.5-2.2-2-2.6-1.2-7.9-1-2.3-5.5 2.2-3.3 3.8-2.7 2.4-3.8-1.1-4.5-2.7-3.8-1.7-4.4 2.5-6.1 5.3-4 5.5 0.5 4.1 4.1 1.1 7.2 5.1-3.7 9.3-11.2 2.6-1.1 4.1-1.8 5.9 0.8 4.3 2.3 4.2 1.5 5.9-1.2 8.6-8.8 3.8-1.5 0.5 7.5 1.9-3 0.4-0.9 10.8 7.9 0.1 0.1 5.8 0.9 14.3 13.4 2.5 2.8 0.5 0.7 1.2 2.9 1.7 2.9 0.8 0.8 1.3 1.1 5.6 2.9 0.8 0.7 1.8 2.4 6.9 4.4-4.8 14-1.5 7.8-3.3 3.7-14 5.7 0 7.7 0.3 4.3-0.1 1.5-0.7 1.8-7.3 10.1-1.3 1.3-0.8 0.6-0.8 0.5-1 0.3-1 0.3-1.2 0.2-3.8 0.2-1 0.2-1 0.3-0.9 0.4-0.8 0.5-0.7 0.6-4.4 8.1-0.9 1.2-0.7 0.7-0.9 0.5-0.9 0.4-7.1-0.5-7.2 24.8 1.1 8.4 4.2 3.8 5.6 1.1 5.6 0 4.4-1.2-4 21.4-0.7 5.5 0.1 1.2-0.6 7.5-0.4 1.2-0.8 1-1.9 0.9-1.4 0-1.3 0-1 0.1-0.8 0.4-3 4.9-1.2 0.8-1.1 0.1-0.9-0.3-1-0.1-0.9 0.3-0.8 0.5-0.6 0.8-0.5 2.1-0.5 10.4 0.4 6.9-0.7 8.3-6.6 18-1.8 10.7-17.9-3.4-4.7-1.6-0.6-0.8-0.6-0.8-2.2-5.6-5-4.7-8-5.9-3.6-2.2-2.5-1.1-1 0.2-0.8 0.6-0.6 0.7-1 1.6-1.2 2.8-0.5 2.1 0 3.5-0.3 0.9-0.8 0.9-1.4 0.7-2.7 0.6-1.7-0.4-1.2-0.4-0.9-0.7-0.6-0.7-0.5-0.9-0.4-1.2-0.9-1.3-1.7-1.8-2.4-0.4-1.2-0.8-0.5-0.8 0.2-1 0.4-0.8 0.7-0.8 1.4-1.2 0.6-0.6 0.5-0.9 0.3-1.1 0.1-1-0.4-2-1.7-2.8-2.3-2.1-1.2-1.3-0.8-1.1-1.2-2.8-1.1-1.5-6.1-6-2.2-1.6-1.7-0.8-1.2 0-1.1 0.1-2.1 0.6-3.4 0.1-8.7-2.2z');
    pathSantaAna.setAttribute('id', 'SVSA'); // <path id="SVSA">
    pathSantaAna.setAttribute('name', 'Santa Ana'); // <path name="Santa Ana">

    // Evento click para redirigir a una página común y guardar el nombre del departamento en sessionStorage
    pathSantaAna.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir cualquier acción predeterminada
        sessionStorage.setItem('selectedDepartment', 'Santa Ana'); // Guarda el nombre del departamento en sessionStorage
        window.location.href = '../departamentos.html'; // Redirige a la página común para todos los departamentos
    });

    // Evento mouseenter para mostrar la caja de información
    pathSantaAna.addEventListener('mouseenter', event => {
        const message = messages[language]?.santaAna || messages['es'].santaAna; // Usar español por defecto si el idioma no está definido
        showInfoBox(event, message.title, message.info);
    });
    // Evento mouseleave para ocultar la caja de información
    pathSantaAna.addEventListener('mouseleave', hideInfoBox);

    bElementSantaAna.appendChild(pathSantaAna);
    features.appendChild(bElementSantaAna);

    // Chalatenango c

    const cElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    cElement.setAttribute('href', '#');

    const pathChalatenango = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathChalatenango.setAttribute('d', 'M324.5 181.7l-4.4 1.2-5.6 0-5.6-1.1-4.2-3.8-1.1-8.4 7.2-24.8 7.1 0.5 0.9-0.4 0.9-0.5 0.7-0.7 0.9-1.2 4.4-8.1 0.7-0.6 0.8-0.5 0.9-0.4 1-0.3 1-0.2 3.8-0.2 1.2-0.2 1-0.3 1-0.3 0.8-0.5 0.8-0.6 1.3-1.3 7.3-10.1 0.7-1.8 0.1-1.5-0.3-4.3 0-7.7 14-5.7 3.3-3.7 1.5-7.8 4.8-14-6.9-4.4-1.8-2.4-0.8-0.7-5.6-2.9-1.3-1.1-0.8-0.8-1.7-2.9-1.2-2.9-0.5-0.7-2.5-2.8-14.3-13.4 14.5 2.3 11.6 5.6 19.2 4.1 9.5 6.7 17.3 5.2 3.6-3.2 5.4-10.5 3-3.1 3.3-0.9 2.2 0.4 1.9 1.7 2.1 3 1.9 3.5 0.8 3.9-0.3 3.9-1.5 3.8 4.3 3.7 12.8 1.5 6 3 2.4 4.8 1.5 11.9 1.7 3.5 9.5 7.2 3.4 4.2 3.4 5.7 1.4 4.9 0.2 1.8 0.4 3.2 1.2 4.1 3.3 2.4 3.7-0.8 4.4-2.6 5.3-2.3 5.8 0.1 9.3 6 7.9 9.9 5.6 11.6 2.5 10.9 6.6-1 16.4 1.3 4.5-1.8 3.9-2.4 3.3-0.3 2.7 4.4-0.4 6.5-2.2 6.4-0.2 5.5 5.9 3.8 8 1.1 1.8 0.6 2.7 2.4 1.8 2.6 0.9 3.2-0.2 2-17.3 2.6-7.7 3.8-2.9 3.8-2.5 2-4.5 2.1-23.1 7.6-5.6 2.1-5.2 1.3-9.8-0.9-11.1 0.3-6.2-0.7-5.8-2.2-6.8 0.5-8-3.8-1.4-0.9-1.7-1.6-2-2.9-1-2.1-0.6-1.8-0.3-1-0.1-0.9 0-1.1 0.3-1.6 0-0.1-0.2-0.7-0.7-1-8.2-9.8-1.7-3-0.6-0.8-6.3-4.5-2.7-2.4-1.9-1.1-9.7-3.5-4.7-2.4-1.3-0.1-1.2 0-6.6 3.4-10.4 4.8-4.2-1-5.3-4.2-2.4 4.8-5.2-0.1-7.8-3.4-2.9 1-4.9 3.5-1.5 0.8-2.7-0.4-3.6-1.7-1.2-0.3-6.1-0.9-6.8-3.9-3.9-0.8-3.6 2.8-3.5 1.9-4.4 0.9-3.1 1.2-1.2 2.6-1.7 2.7z');
    pathChalatenango.setAttribute('id', 'SVCH'); // <path id="SVCH">
    pathChalatenango.setAttribute('name', 'Chalatenango'); // <path name="Chalatenango">

    pathChalatenango.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Chalatenango');
        window.location.href = '../departamentos.html';
    });
    // Evento mouseenter para mostrar la caja de información
    pathChalatenango.addEventListener('mouseenter', event => {
        const message = messages[language]?.chalatenango || messages['es'].chalatenango;
        showInfoBox(event, message.title, message.info);
    });
    // Evento mouseleave para ocultar la caja de información
    pathChalatenango.addEventListener('mouseleave', hideInfoBox);

    cElement.appendChild(pathChalatenango);
    features.appendChild(cElement);



    // La Union d
    const dElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    dElement.setAttribute('href', '#');

    const pathUnion = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathUnion.setAttribute('d', 'M836.2 370.7l11.6-12.4 2.7-4.2 0.7-7.3 8.6-22.3 2.2-10.4 1.1-8.9 0.2-7.4-0.4-2.4-0.3-0.9-0.4-0.9-0.5-0.9-1.7-2.2-0.5-0.8-0.2-1-0.1-1.3 1.5-23.5-0.7-10.9-1.6-6.3-1.2-7.6 2.1 0.5 5.5 3.6 2.6 0.7 1.7-0.8 4.8-3.8 3-1 3.7 0.2 7.4 1.6 3.6-0.3 3.6-2.6 3.1-3.9 3.8-3.2 5.6-0.2 3.6 2.8 3.6 10.2 3.1 4.6 1.9 1.1 5.3 2.1 2.3 1.2 5.9 5.2 10.6 9.1 6.6 2.7-3.3 5.6-7.6 17.6-1.9 6.3 2.4 6.4-1.8 4.1-3.8 3.6-3.3 4.7-1.3 6.9 0.3 14.3-0.9 7-9 21.9-2.2 10.6 4 8.8 3.8 1.4 8-2.6 5.4 2.1 2.9 3.4 2 4.6 0.6 5.2-0.9 4.9-6.4 7.4-29.6 13.6-0.3-0.1-2.9-1.8-1.9-3.1-2.8-8.3-10.6 18.4-2.7 10.8 6.9 4.8 4.4 1.7 12.4 12 7.1 4.8 0.6 2.2 0 4.7-3 8.2-7.5 5.9-27.9 14.1-7.6 6.1-1.3 6.1 8.7 6-13.3 3.1-51.7-3.6-9.6-1.8 0-0.1 2.1-30.2 0.5-2.9 1-3.8 0.8 0.3 3.1 2.3 3.2 1.9 3.9 1.4 1.3 0.3 1.2 0 1.8-0.5 0.8-0.9 4.9-16.1 0.3-2.4-0.6-2.2-0.1-1.6 4.8-27.8-0.1-0.9-0.4-1-0.4-0.9-3.5-5.6-0.5-0.9-0.3-1-1.1-6.8-0.2-9.9 0.3-2.5 0.6-1.5 0.7-0.6 1.6-0.9 1-0.8 1.1-0.9 1.4-1.7 0.4-1.3 0-1.2-1.5-5.6-0.2-11.7 0.8-4.9 2.5-3.3z m105.9 136.3l-0.3-4.9 2.7-2 5.2 1.7 3.2 7.1 0.2 5.9 1.4 3.9-3.1 1.8-4.9-1.8-3.2 1.5 0-4.2-2-4.1 0.8-4.9z m-14.8-19.2l2.9 1.8 2.5 5.6-2.2 3.2-2.5 2.4-4.9-4.4-1.2-6.1 2.2-2.2 3.2-0.3z');
    pathUnion.setAttribute('id', 'SVSA'); // <path id="SVSA">
    pathUnion.setAttribute('name', 'La Union'); // <path name="La Union">
    pathUnion.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'La Unión');
        window.location.href = '../departamentos.html';
    });

    pathUnion.addEventListener('mouseenter', event => {
        const message = messages[language]?.laUnion || messages['es'].laUnion;
        showInfoBox(event, message.title, message.info);
    });

    pathUnion.addEventListener('mouseleave', hideInfoBox);

    dElement.appendChild(pathUnion);
    features.appendChild(dElement);

    // Morazan e
    const eElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    eElement.setAttribute('href', '#');

    const pathMorazan = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathMorazan.setAttribute('d', 'M736.4 228.6l1.5-2.6 2.5-2.8 4.5-1.9 3.3 0.5 2.4-0.5 1.8-5.3-0.6-1-3.4-3.1-0.8-1.4-0.3-7.7 0.1-1.3 3.7-1.4 5.7 0.6 0.9 0.2 9 2 6 0.2 19.6-2.4 9.9 0.6 4.3 3.6 5.5 14.3 5.4 6.6 7 6.3 6.1 7.4 3.1 9.5 17.1-8.5 5.6-1.5 0.9 0.1 1.2 7.6 1.6 6.3 0.7 10.9-1.5 23.5 0.1 1.3 0.2 1 0.5 0.8 1.7 2.2 0.5 0.9 0.4 0.9 0.3 0.9 0.4 2.4-0.2 7.4-1.1 8.9-2.2 10.4-8.6 22.3-0.7 7.3-2.7 4.2-11.6 12.4-8.1-1.3-3.9 0.2-14.7 4.6-2.8 0.3-1.8-0.3-0.6-0.6-0.6-1.1-0.3-0.8-0.9-1-1.3-1.2-5.5-3.3-0.8-0.6-0.6-0.8-0.4-0.8-1.1-6.9-0.6-2.1-1.4-2.6-1.6-2.1-1.3-0.8-1.4-0.5-14.6 1.2-2.1 0.4-1.9 0.8-3 1.8-2.1 0.6-0.6-0.5-0.1-0.6 0.5-0.9 2.2-3 0.4-0.9 0.1-1-0.6-1-0.9-0.9-2.7-1.7-0.8-0.7-0.6-0.7-0.3-0.9-0.3-1.1-0.2-1.1-0.8-1.5-1.4-1.9-3.5-2.6-1.4-1.4-0.7-2.3-1.2-1.9-4.8-4.3-1.9-2.3-1.2-1.8-0.6-9.7 0-1 0.4-0.8 0.7-0.7 12.3-8.9 1.7-1 2.9-1 0.9-0.5 0.7-0.7 0.6-0.7 0.3-1.1 0-1.4-0.7-2.3-1-1.5-0.8-1-14.2-9.7-2.1-1.9-1.4-1.5-0.3-1-0.3-1-0.1-3.8 0.3-2.1 0.2-0.7 0.2-0.7 0.5-0.8 1.1-1.4 0.7-0.6 0.8-0.5 0.6-0.7 0.6-0.8 0.4-0.8 0.4-1 0.2-1.1 0-2.3-1.2-3.2-1.5-2.9-0.6-1.7-0.1-1.3-0.7-3.1-4.4-10.4-2.1-2.9z');
    pathMorazan.setAttribute('id', 'SVSA'); // <path id="SVSA">
    pathMorazan.setAttribute('name', 'Morazan'); // <path name="Morazan">
    pathMorazan.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Morazán');
        window.location.href = '../departamentos.html';
    });
    pathMorazan.addEventListener('mouseenter', event => {
        const message = messages[language]?.morazan || messages['es'].morazan;
        showInfoBox(event, message.title, message.info);
    });

    pathMorazan.addEventListener('mouseleave', hideInfoBox);

    eElement.appendChild(pathMorazan);
    features.appendChild(eElement);

    // San Miguel f

    const fElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    fElement.setAttribute('href', '#');

    const pathSanMiguel = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathSanMiguel.setAttribute('d', 'M639.5 290.4l0-0.1 3.4-6.7 3.5-5.4-0.8-5.3 4.1-2.6 2.6-3.9 0.6-4.6-2.4-4.8 1.7-1.5 0.7-0.6 10-0.5 7-4.3 6.8-2.9 15.2-3.3 3.5 0.2 6 2.3 2.8 0.3 0.4-1.1 0-2.3 0.3-2.4 1.2-1.4 2.4-0.1 3 0.5 3 0.9 2.4 1 2.6-4.8 4.1-1.5 4.5-0.4 4.1-1.4 3-2.8 1.2-2.3 2.1 2.9 4.4 10.4 0.7 3.1 0.1 1.3 0.6 1.7 1.5 2.9 1.2 3.2 0 2.3-0.2 1.1-0.4 1-0.4 0.8-0.6 0.8-0.6 0.7-0.8 0.5-0.7 0.6-1.1 1.4-0.5 0.8-0.2 0.7-0.2 0.7-0.3 2.1 0.1 3.8 0.3 1 0.3 1 1.4 1.5 2.1 1.9 14.2 9.7 0.8 1 1 1.5 0.7 2.3 0 1.4-0.3 1.1-0.6 0.7-0.7 0.7-0.9 0.5-2.9 1-1.7 1-12.3 8.9-0.7 0.7-0.4 0.8 0 1 0.6 9.7 1.2 1.8 1.9 2.3 4.8 4.3 1.2 1.9 0.7 2.3 1.4 1.4 3.5 2.6 1.4 1.9 0.8 1.5 0.2 1.1 0.3 1.1 0.3 0.9 0.6 0.7 0.8 0.7 2.7 1.7 0.9 0.9 0.6 1-0.1 1-0.4 0.9-2.2 3-0.5 0.9 0.1 0.6 0.6 0.5 2.1-0.6 3-1.8 1.9-0.8 2.1-0.4 14.6-1.2 1.4 0.5 1.3 0.8 1.6 2.1 1.4 2.6 0.6 2.1 1.1 6.9 0.4 0.8 0.6 0.8 0.8 0.6 5.5 3.3 1.3 1.2 0.9 1 0.3 0.8 0.6 1.1 0.6 0.6 1.8 0.3 2.8-0.3 14.7-4.6 3.9-0.2 8.1 1.3-2.5 3.3-0.8 4.9 0.2 11.7 1.5 5.6 0 1.2-0.4 1.3-1.4 1.7-1.1 0.9-1 0.8-1.6 0.9-0.7 0.6-0.6 1.5-0.3 2.5 0.2 9.9 1.1 6.8 0.3 1 0.5 0.9 3.5 5.6 0.4 0.9 0.4 1 0.1 0.9-4.8 27.8 0.1 1.6 0.6 2.2-0.3 2.4-4.9 16.1-0.8 0.9-1.8 0.5-1.2 0-1.3-0.3-3.9-1.4-3.2-1.9-3.1-2.3-0.8-0.3-1 3.8-0.5 2.9-2.1 30.2 0 0.1-2.6-0.5-2.5 0-2.8 1.1-23-26.8-1-0.4-1-0.2-1.2-0.1-10.2 1.6-0.9-0.2-0.7-0.8-0.1-1.9 0.2-1.2 0.4-1.3 2.8-5.1-0.2-1.1-0.9-1.2-2.5-1.3-1.4-1.2-0.9-1.4 0-5.7-0.2-1.1-0.3-1.2-0.7-1.1-1.2-1.4-1.6-0.2-1.2 0.1-3.5 1.9-1.9 0.8-1.1 0.3-1 0-1.1-0.1-0.9-0.4-0.8-0.5-1.5-1.2-0.8-0.5-0.9-0.4-1.1-0.1-0.9 0.1-1.1-0.8-1.6-1.4-3.3-4-1.9-1.6-1.7-1-7.4-0.8-2-0.5-2.8-1.3-0.8-0.5-0.7-0.5-2.6-3.4-3.8-6.1-2-4.1-2-6.9-0.6-3-0.2-2.3 0.1-2.5-0.2-1.2-0.6-1-1.5-0.5-1.8 0.7-0.6-0.1-0.6-0.4-0.4-1.2-1.2-7.1-0.1-2.5-0.6-5.2-0.1-1.1 0.1-1.2 0.3-1 0.6-0.7 0.7-0.2 0.6 0.2 0.4 0.4 0.5 0.6 0.6 0.5 0.7 0 0.5-0.6 0.4-1 0.2-2.4-0.1-2.3 0.1-1.2 0.3-1 0.5-0.9 0.6-0.7 2-1.9 0.1-0.1 0.5-1 0.1-0.8-0.2-1.5-1.5-5.1-0.3-2 0-1.6 0.8-3 0-0.9-0.5-1.5-4.5-9.6-0.3-1-0.2-1.1 0-2.3 0.1-1.2 0.3-1 0.5-0.8 0.6-0.7 0.8-0.5 2.1-0.7 0.8-0.4 0.6-0.7 0.6-0.8 0.3-1 0.2-1-0.2-1.4-0.5-1.6-1.1-2.7-0.7-3.2 0-1.2 0.2-1.1 1.8-5 0-1.1-1.2-1-2.3-0.7-9.2-1.2-2.9-1-3.3-2.3-2.5-2.4-3.2-5-2.3-2.9-4.4-0.3-15.4 1.8-4.3-6.8-11.6-11.6-1-9.1z');
    pathSanMiguel.setAttribute('id', 'SVSM'); // <path id="SVSA">
    pathSanMiguel.setAttribute('name', 'San Miguel'); // <path name="San Miguel">
    pathSanMiguel.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'San Miguel');
        window.location.href = '../departamentos.html';
    });
    pathSanMiguel.addEventListener('mouseenter', event => {
        const message = messages[language]?.sanMiguel || messages['es'].sanMiguel;
        showInfoBox(event, message.title, message.info);
    });

    pathSanMiguel.addEventListener('mouseleave', hideInfoBox);

    fElement.appendChild(pathSanMiguel);
    features.appendChild(fElement);

    // Sonsonate g

    const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    gElement.setAttribute('href', '#');

    const pathSonsonate = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathSonsonate.setAttribute('d', 'M106 326.8l0.9-1.4 5.9-9.4 2.8-3.4 1.1-0.9 0.9-0.6 1.1-0.5 1.3-0.4 2.1-0.4 1.5 0 1.4 0.1 1 0.4 0.9 0.4 1.5 1.1 0.8 0.6 4.9 5.7 2.7 2.6 0.8 0.5 2.3 0.5 11.3 0.7 3.1-0.4 1.9-0.8 2.1-8.6 0.7-1.9 4.8-8.6 0.3-1 0.3-3.6 0.6-1.6 1.1-2.1 2.8-3.4 1.1-1.8 0.5-1.5-0.4-2.2-3.1-10 0.2-1.6 0.7-2.1 7.6-11.7 0.2-1.3-0.3-0.9-0.9-1.8-0.7-1.7-0.6-2.3-0.9-7.2 0.1-1.6 0.4-2.5 0.8-1.1 1-0.7 4.6-0.7 8.2-2.3 6.7-2.8 8.7 2.2 3.4-0.1 2.1-0.6 1.1-0.1 1.2 0 1.7 0.8 2.2 1.6 6.1 6 1.1 1.5 1.2 2.8 0.8 1.1 1.2 1.3 2.3 2.1 1.7 2.8 0.4 2-0.1 1-0.3 1.1-0.5 0.9-0.6 0.6-1.4 1.2-0.7 0.8-0.4 0.8-0.2 1 0.5 0.8 1.2 0.8 2.4 0.4 1.7 1.8 0.9 1.3 0.4 1.2 0.5 0.9 0.6 0.7 0.9 0.7 1.2 0.4 1.7 0.4 2.7-0.6 1.4-0.7 0.8-0.9 0.3-0.9 0-3.5 0.5-2.1 1.2-2.8 1-1.6 0.6-0.7 0.8-0.6 1-0.2 2.5 1.1 3.6 2.2 8 5.9 5 4.7 2.2 5.6 0.6 0.8 0.6 0.8 4.7 1.6 17.9 3.4 4.3 1.4 0.9 0.4 0.8 0.6 0.7 0.6 0.5 0.8 0.3 1 0.2 1-0.5 1.5-1 1.5-2.7 2.4-2.4 1.7-5.5 3.2-2.1 1.9-4.4 5.5-1.5 1.2-1.5 0.6-2.6 0.3-0.9 0.2-1.5 0.9-0.8 0.7-0.8 1.4-0.8 2.1-1.1 4.6-0.6 4.5 0.5 8.5-0.1 1.3-1 1.8-1.9 2.6-8.2 8.2-0.7 0.5-0.8 0.8-0.9 1.2-0.8 1.9-0.7 3.2-0.5 4.7-1.1 1.5-1.6 1.9-9.5 8.4-2 3.2-4 9.1-1 2.5-2.6-0.6-23.8-7.8-12.6 2.6-35.6 0.4-5.7-3.9-3.8-14.2-1.4-8.9-4.7-3.9-7.8-4.8-30.4-17.3-0.8-0.4z');
    pathSonsonate.setAttribute('id', 'SVSA'); // <path id="SVSA">
    pathSonsonate.setAttribute('name', 'Sonsonate'); // <path name="Sonsonate">
    pathSonsonate.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Sonsonate');
        window.location.href = '../departamentos.html';
    });
    pathSonsonate.addEventListener('mouseenter', event => {
        const message = messages[language]?.sonsonate || messages['es'].sonsonate;
        showInfoBox(event, message.title, message.info);
    });

    pathSonsonate.addEventListener('mouseleave', hideInfoBox);

    gElement.appendChild(pathSonsonate);
    features.appendChild(gElement);

    // La Libertad h

    const hElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    hElement.setAttribute('href', '#');

    const pathLaLibertad = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathLaLibertad.setAttribute('d', 'M292.5 284.3l1.8-10.7 6.6-18 0.7-8.3-0.4-6.9 0.5-10.4 0.5-2.1 0.6-0.8 0.8-0.5 0.9-0.3 1 0.1 0.9 0.3 1.1-0.1 1.2-0.8 3-4.9 0.8-0.4 1-0.1 1.3 0 1.4 0 1.9-0.9 0.8-1 0.4-1.2 0.6-7.5-0.1-1.2 0.7-5.5 4-21.4 1.7-2.7 1.2-2.6 3.1-1.2 4.4-0.9 3.5-1.9 3.6-2.8 3.9 0.8 6.8 3.9 6.1 0.9 1.2 0.3 3.6 1.7-0.4 13-2 8.3-0.1 2.1 0.2 1.4 2.3 1.8 0.9 1.3 1.1 2 1.9 4.4 1.1 2.1 1 1.4 1.6 1 1.8 0.9 3 0.9 1.1 0.1 3.5-0.3 1.2 0 1.1 0.2 1.1 0.2 1 0.4 1.2 0.7 1.4 1.1 2 1.1 0.6 0.8 0.1 0.6-1 2.6-0.5 2.2-0.1 0.4-0.3 0.3-2.8-0.1-1 0.3-0.7 0.7-0.4 1.2-1.9 21.6-0.5 2.2-0.4 0.9-0.8 0.5-1.9 0.7-0.9 0.5-0.7 0.6-1.2 1.4-0.7 1.9-0.5 1.8-0.7 6.8-0.8 3-1.2 2.8-0.7 3.6-0.4 6.2-0.3 1.6-0.3 1-2.6 4.9-1.7 4.8 0.2 1.5 0.6 0.8 1 0.3 1.2 0.1 1.9 2.5-0.4 3.8 0.3 3.7 0.4 1 0.5 0.8 0.6 0.7 1.5 1.1 0.7 0.9 0.4 1.3 0.7 3 0.6 1.7 0.7 1.1 0.8 0.6 5.4 2.9 0.7 0.5 1.6 1.4 2.5 3.4 0.4 1.4-0.2 1.2-1.2 2.3-0.9 2.2 0.1 1.2 0.8 0.8 2.9 1.4 0.4 0.9-0.2 0.9-0.6 0.7-0.7 0.6-0.6 2.2-0.2 3.7 0.7 15.9-0.2 1.2-2.4 6.1-0.8 3.4-0.1 1.8 0.2 1.4 6 9.8 2.1 4.6 0.6 0.7 0.8 0.4 1.1 0.2 1.2-0.1 2.1-0.5 3.9-1.3 2.2-0.3 1.4 0.2 1 0.3 2.8 1.2 1.3 6.3 1.1 1.6 0.9 0 1.6 0.1 2 0.5 3.7 1.5 1.3 1.3 0.3 1.1-1 1.7-1.8 2.2-0.5 0.8-0.6 0.7-2.9 5.2-1 2.3-1.2 3.6-17.9-11-25.5-11.3-27.6-6.6-12.8 0-9.8-2.3-53.3 0.5-22.8-5.8-8.1-1.5 1-2.5 4-9.1 2-3.2 9.5-8.4 1.6-1.9 1.1-1.5 0.5-4.7 0.7-3.2 0.8-1.9 0.9-1.2 0.8-0.8 0.7-0.5 8.2-8.2 1.9-2.6 1-1.8 0.1-1.3-0.5-8.5 0.6-4.5 1.1-4.6 0.8-2.1 0.8-1.4 0.8-0.7 1.5-0.9 0.9-0.2 2.6-0.3 1.5-0.6 1.5-1.2 4.4-5.5 2.1-1.9 5.5-3.2 2.4-1.7 2.7-2.4 1-1.5 0.5-1.5-0.2-1-0.3-1-0.5-0.8-0.7-0.6-0.8-0.6-0.9-0.4-4.3-1.4z');
    pathLaLibertad.setAttribute('id', 'SVLI'); // <path id="SVSA">
    pathLaLibertad.setAttribute('name', 'La Libertad'); // <path name="La Libertad">
    pathLaLibertad.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'La Libertad');
        window.location.href = '../departamentos.html';
    });

    pathLaLibertad.addEventListener('mouseenter', event => {
        const message = messages[language]?.laLibertad || messages['es'].laLibertad;
        showInfoBox(event, message.title, message.info);
    });

    pathLaLibertad.addEventListener('mouseleave', hideInfoBox);

    hElement.appendChild(pathLaLibertad);
    features.appendChild(hElement);

    // La Paz i

    const iElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    iElement.setAttribute('href', '#');

    const pathLaPaz = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathLaPaz.setAttribute('d', 'M413 423.6l1.2-3.6 1-2.3 2.9-5.2 0.6-0.7 0.5-0.8 1.8-2.2 1-1.7-0.3-1.1-1.3-1.3-3.7-1.5-2-0.5-1.6-0.1-0.9 0-1.1-1.6-1.3-6.3 0.8-3.2 1.1-0.7 2.7-3 1.9-4.1 3.2-9.6 0.8-4.2 0.2-2.7-0.7-1.9-2.9-5.1-1.1-3.1-0.7-3.3 0.2-1.8 0.5-1.2 0.9-0.5 1-0.2 1.2 0 1.1 0.2 6 1.9 1.2 0.2 1.1 0.1 1.9-1.5 11.3-14.4 13.6-12.8 16.5 6.1 6.5 3.5 7.1 2.2 1.3 0 1.7-0.3 0.7-0.2 0.8-0.4 0.6-0.7 0.8-1.8 0.7-0.8 0.8-0.4 1-0.3 4.7-0.6 2.1-0.7 2.6-1.6 2.8 7.6 0.1 6.3-0.4 6.6 0.4 2.6 0.7 1.6 1.2 0.1 1.2 0 1.2-0.2 8.9-2.8 1.6-0.1 1.7 0.3 2.9 1.1 1 1.3 9.3 19.8 0.3 1.1 0.1 1.1-0.1 2.5-0.4 2.2-2.9 7.9-0.2 0.9-0.3 0.9-0.3 1.3 0 0.6 0 0.1-1.6 8.4 0 1.8 0.5 6.7 0.5 2.2 0.6 1.6 2.4 2.7 2.3 1.8 3.3 2 2.6 2.5 2.4 3.2 0.9 2 0.4 1.6-0.2 1.2-0.5 2.2-0.3 0.9-0.5 0.9-2.3 1.7-0.6 0.7-0.5 0.8-0.3 1-0.1 1.2-0.1 1.2 1.7 15.8-0.1 2.2-0.5 0.8-0.6 0.7-0.7 0.8-0.8 0.5-3.5 1.7-2.7 1.1-1.7 1-1.5 1.2-0.6 0.7-0.5 0.8-0.5 1-0.3 0.9-0.3 1.1-0.9 11.6 0 0.1-87.6-40.9-26.6-16.4z');
    pathLaPaz.setAttribute('id', 'SVPA'); // <path id="SVSA">
    pathLaPaz.setAttribute('name', 'La Paz'); // <path name="La Paz">
    pathLaPaz.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'La Paz');
        window.location.href = '../departamentos.html';
    });
    pathLaPaz.addEventListener('mouseenter', event => {
        const message = messages[language]?.laPaz || messages['es'].laPaz;
        showInfoBox(event, message.title, message.info);
    });

    pathLaPaz.addEventListener('mouseleave', hideInfoBox);

    iElement.appendChild(pathLaPaz);
    features.appendChild(iElement);

    // Usulutan j

    const jElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    jElement.setAttribute('href', '#');

    const pathUsulutan = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathUsulutan.setAttribute('d', 'M656.4 317.9l15.4-1.8 4.4 0.3 2.3 2.9 3.2 5 2.5 2.4 3.3 2.3 2.9 1 9.2 1.2 2.3 0.7 1.2 1 0 1.1-1.8 5-0.2 1.1 0 1.2 0.7 3.2 1.1 2.7 0.5 1.6 0.2 1.4-0.2 1-0.3 1-0.6 0.8-0.6 0.7-0.8 0.4-2.1 0.7-0.8 0.5-0.6 0.7-0.5 0.8-0.3 1-0.1 1.2 0 2.3 0.2 1.1 0.3 1 4.5 9.6 0.5 1.5 0 0.9-0.8 3 0 1.6 0.3 2 1.5 5.1 0.2 1.5-0.1 0.8-0.5 1-0.1 0.1-2 1.9-0.6 0.7-0.5 0.9-0.3 1-0.1 1.2 0.1 2.3-0.2 2.4-0.4 1-0.5 0.6-0.7 0-0.6-0.5-0.5-0.6-0.4-0.4-0.6-0.2-0.7 0.2-0.6 0.7-0.3 1-0.1 1.2 0.1 1.1 0.6 5.2 0.1 2.5 1.2 7.1 0.4 1.2 0.6 0.4 0.6 0.1 1.8-0.7 1.5 0.5 0.6 1 0.2 1.2-0.1 2.5 0.2 2.3 0.6 3 2 6.9 2 4.1 3.8 6.1 2.6 3.4 0.7 0.5 0.8 0.5 2.8 1.3 2 0.5 7.4 0.8 1.7 1 1.9 1.6 3.3 4 1.6 1.4 1.1 0.8 0.9-0.1 1.1 0.1 0.9 0.4 0.8 0.5 1.5 1.2 0.8 0.5 0.9 0.4 1.1 0.1 1 0 1.1-0.3 1.9-0.8 3.5-1.9 1.2-0.1 1.6 0.2 1.2 1.4 0.7 1.1 0.3 1.2 0.2 1.1 0 5.7 0.9 1.4 1.4 1.2 2.5 1.3 0.9 1.2 0.2 1.1-2.8 5.1-0.4 1.3-0.2 1.2 0.1 1.9 0.7 0.8 0.9 0.2 10.2-1.6 1.2 0.1 1 0.2 1 0.4 23 26.8-3.5 1.4-32.4 2.7-34.8-5.3-9 2.9-4.8-1.6-5.5-1.2 0-2.4 8.5-0.6 0.6-5.9-4.5-7.4-6.9-4.8 1.5 3 4.5 6.3 1.7 3.9-13.6-0.5-6.6 0.7-5.7 2.4 3.7 1.6 2.9-0.5 3.5-1 5.3-0.1 0 2.9-8.7 3.6-9.7-0.3-7.5-4.6-2.3-9.5 3.7 1.7 1.4 0.9 5.2-5.2 0-2.4-6.5-2.9-7-10-4.7-2.9 1.2 5.5 2.2 4.6 1.1 4.1-1.7 4-5.5-3.2-15.9-4-6.8-3.6-6.2-11.1-2.9-1.8-4.4-0.4-12.4-2.5-5.5 0-15.2 2.9-21.2 0.5-4.7 2.1 2.6 2 2.7 1.5 2.8 0.5 2.4-1.1 10.6 2.4 30.2-3.2 3.3 0.5 4.9 2.7 2.6 2.4 4.7 5.7 3.1 2.4 0 2.9-7-1.2-5.1-1-11.2-3.3 0 2.6 30.8 6.3 16.1 5.3 7.2 7.1-2.7 4.6-6.7-1.1-7.5-4-4.9-3.7-5.5-2.8-97-18.1-11.6-5.4-0.2-0.1 0-0.8 1.5-5.5 2.8-3.8 4.5-1.7 7.3-1.1 3.6-2.9 2.2-4.2 3.5-5.2 6.6-6.4 0.9-2.6 0.5-12 0.9-4.9 1.6-4.1 17.1-32.6 3.2-11.5 0.9-11.7 2.1-3 6.2-1.1 0.5-2.4 10.8-13.4 8.3 1.9 7.5-4.8 5.6-7.7 2.1-6.8 23.6-17.2z');
    pathUsulutan.setAttribute('id', 'SVUS'); // <path id="SVSA">
    pathUsulutan.setAttribute('name', 'Usulutan'); // <path name="Usulutan">
    pathUsulutan.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Usulután');
        window.location.href = '../departamentos.html';
    });
    pathUsulutan.addEventListener('mouseenter', event => {
        const message = messages[language]?.usulutan || messages['es'].usulutan;
        showInfoBox(event, message.title, message.info);
    });

    pathUsulutan.addEventListener('mouseleave', hideInfoBox);

    jElement.appendChild(pathUsulutan);
    features.appendChild(jElement);

    //San Vicente k

    const kElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    kElement.setAttribute('href', '#');

    const pathSanVicente = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathSanVicente.setAttribute('d', 'M520.2 293.8l0.5-11.1 0.7-1.2 1-1.4 2.4 0.1 2.2 0.5 3.9 1.3 2.6-0.4 3.6-1.2 11.7-5.2 2.5-0.6 2.7 0.6 2.2 0.2 1.3-0.8 1.2-1.3 1.9-2.5 1.4-0.7 1.2-0.1 5.4 3.9 1.8 0.5 2.7 0.2 12-0.1 2.4 0.4 5.2 0.3 4.1 0.8 0.9 0.4 6.9 5.1 0.9 0.5 3.9 1.4 2.6 1.5 0.9 0.4 2.6 0.7 1 0.5 0.6 0.9 0.4 2.1 0.3 1 0.5 0.8 0.7 0.6 1.4 0.5 9.5 1.2 3.5 0.9 6.1-4.1 1 9.1 11.6 11.6 4.3 6.8-23.6 17.2-2.1 6.8-5.6 7.7-7.5 4.8-8.3-1.9-10.8 13.4-0.5 2.4-6.2 1.1-2.1 3-0.9 11.7-3.2 11.5-17.1 32.6-1.6 4.1-0.9 4.9-0.5 12-0.9 2.6-6.6 6.4-3.5 5.2-2.2 4.2-3.6 2.9-7.3 1.1-4.5 1.7-2.8 3.8-1.5 5.5 0 0.8 0.2 0.1-5.6-2.6 0-0.1 0.9-11.6 0.3-1.1 0.3-0.9 0.5-1 0.5-0.8 0.6-0.7 1.5-1.2 1.7-1 2.7-1.1 3.5-1.7 0.8-0.5 0.7-0.8 0.6-0.7 0.5-0.8 0.1-2.2-1.7-15.8 0.1-1.2 0.1-1.2 0.3-1 0.5-0.8 0.6-0.7 2.3-1.7 0.5-0.9 0.3-0.9 0.5-2.2 0.2-1.2-0.4-1.6-0.9-2-2.4-3.2-2.6-2.5-3.3-2-2.3-1.8-2.4-2.7-0.6-1.6-0.5-2.2-0.5-6.7 0-1.8 1.6-8.4 0-0.1 0-0.6 0.3-1.3 0.3-0.9 0.2-0.9 2.9-7.9 0.4-2.2 0.1-2.5-0.1-1.1-0.3-1.1-9.3-19.8-1-1.3-2.9-1.1-1.7-0.3-1.6 0.1-8.9 2.8-1.2 0.2-1.2 0-1.2-0.1-0.7-1.6-0.4-2.6 0.4-6.6-0.1-6.3-2.8-7.6 7.3-7.2 0.8-1.3 0.9-1.8 1.3-5.4 6.9-18.3z');
    pathSanVicente.setAttribute('id', 'SVSV'); // <path id="SVSV">
    pathSanVicente.setAttribute('name', 'San Vicente'); // <path name="San Vicente">
    pathSanVicente.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'San Vicente');
        window.location.href = '../departamentos.html';
    });
    pathSanVicente.addEventListener('mouseenter', event => {
        const message = messages[language]?.sanVicente || messages['es'].sanVicente;
        showInfoBox(event, message.title, message.info);
    });

    pathSanVicente.addEventListener('mouseleave', hideInfoBox);

    kElement.appendChild(pathSanVicente);
    features.appendChild(kElement);

    //Cuscatlan l

    const lElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    lElement.setAttribute('href', '#');

    const pathCuscatlan = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathCuscatlan.setAttribute('d', 'M410.9 171.4l6.6-3.4 1.2 0 1.3 0.1 4.7 2.4 9.7 3.5 1.9 1.1 2.7 2.4 6.3 4.5 0.6 0.8 1.7 3 8.2 9.8 0.7 1 0.2 0.7 0 0.1-0.3 1.6 0 1.1 0.1 0.9 0.3 1 0.6 1.8 1 2.1 2 2.9 1.7 1.6 1.4 0.9 8 3.8 6.8-0.5 5.8 2.2 6.2 0.7-5.5 8.8-0.4 0.9-1.1 1.6-1.3 1.4-1.4 1.2-5 2.9-0.8 0.6-0.6 0.6-0.6 0.9-0.3 0.9-0.3 1-0.2 1.2 0.9 2.5 1.8 3.3 7.3 10.4 2.3 2.4 3.1 2.1 1.8 2.1 1.4 3 0.3 1.7 0.4 1.6 1.9 3.4 0.5 1.5 0.5 2.5 0.9 1.7 1.5 2 3.6 3.9 2.4 3.7 0.4 1 3.4 1.9 13 3.6-6.9 18.3-1.3 5.4-0.9 1.8-0.8 1.3-7.3 7.2-2.6 1.6-2.1 0.7-4.7 0.6-1 0.3-0.8 0.4-0.7 0.8-0.8 1.8-0.6 0.7-0.8 0.4-0.7 0.2-1.7 0.3-1.3 0-7.1-2.2-6.5-3.5-16.5-6.1-0.3-11.6-0.8-2-0.7-2-1.8-2.3-6.6-12.5-0.5-1.8 0.6-8.3-0.3-1.7-0.7-1.1-1-0.3-1.4-1-1.6-1.6-4.7-7-0.7-0.6-1-0.4-1.1-0.2-2.4-0.1-2.6-2.1-3.4-4-10-15.7-1.1-3 0.7-0.6 2.7-1.2 1-0.7 0.7-0.8 0.7-1.5-0.4-0.8-2.3-3-7.8-12.8-3.5-7.4-0.8-2.9-0.4-3.3 0.2-0.6 0.6-0.5 0.7-0.6 0.7-0.6 1-1.6 0.3-0.9 0.3-1.1 0.3-2.3 0.5-2.1 0.2-1.6 0-0.4 0.1-0.7-0.3-3.7-1.2-6.4-0.1-1.7 0.3-1.2 1.8-3.7 1.7-4.6 0.2-3.8z');
    pathCuscatlan.setAttribute('id', 'SVCU'); // <path id="SVCU">
    pathCuscatlan.setAttribute('name', 'Cuscatlan'); // <path name="Cuscatlan">
    pathCuscatlan.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Cuscatlán');
        window.location.href = '../departamentos.html';
    });
    pathCuscatlan.addEventListener('mouseenter', event => {
        const message = messages[language]?.cuscatlan || messages['es'].cuscatlan;
        showInfoBox(event, message.title, message.info);
    });

    pathSanVicente.addEventListener('mouseleave', hideInfoBox);

    lElement.appendChild(pathCuscatlan);
    features.appendChild(lElement);

    // Cabañas m

    const mElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    mElement.setAttribute('href', '#');

    const pathCabanas = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathCabanas.setAttribute('d', 'M490.3 217.5l11.1-0.3 9.8 0.9 5.2-1.3 5.6-2.1 23.1-7.6 4.5-2.1 2.5-2 2.9-3.8 7.7-3.8 17.3-2.6 0 0.7 2.3-0.9 9.5-1.5 9.6 0.7 28.4 9.1 16.6 1.2 3.6 1.6 3.4 3.3-0.3 1.2-0.1 0.9-0.2 0.2-0.4 0.3-0.1 0-1.5-0.2 0.4 0.9 1.9 4.2-0.2 4.5-1.3 4.7-0.8 5.7 1 3.7 4.1 10.2 0.3 6.1-3.3 5.5-0.7 0.6-1.7 1.5 2.4 4.8-0.6 4.6-2.6 3.9-4.1 2.6 0.8 5.3-3.5 5.4-3.4 6.7 0 0.1-6.1 4.1-3.5-0.9-9.5-1.2-1.4-0.5-0.7-0.6-0.5-0.8-0.3-1-0.4-2.1-0.6-0.9-1-0.5-2.6-0.7-0.9-0.4-2.6-1.5-3.9-1.4-0.9-0.5-6.9-5.1-0.9-0.4-4.1-0.8-5.2-0.3-2.4-0.4-12 0.1-2.7-0.2-1.8-0.5-5.4-3.9-1.2 0.1-1.4 0.7-1.9 2.5-1.2 1.3-1.3 0.8-2.2-0.2-2.7-0.6-2.5 0.6-11.7 5.2-3.6 1.2-2.6 0.4-3.9-1.3-2.2-0.5-2.4-0.1-1 1.4-0.7 1.2-0.5 11.1-13-3.6-3.4-1.9-0.4-1-2.4-3.7-3.6-3.9-1.5-2-0.9-1.7-0.5-2.5-0.5-1.5-1.9-3.4-0.4-1.6-0.3-1.7-1.4-3-1.8-2.1-3.1-2.1-2.3-2.4-7.3-10.4-1.8-3.3-0.9-2.5 0.2-1.2 0.3-1 0.3-0.9 0.6-0.9 0.6-0.6 0.8-0.6 5-2.9 1.4-1.2 1.3-1.4 1.1-1.6 0.4-0.9 5.5-8.8z');
    pathCabanas.setAttribute('id', 'SVCA'); // <path id="SVCA">
    pathCabanas.setAttribute('name', 'Cabañas'); // <path name="Cabañas">
    pathCabanas.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'Cabañas');
        window.location.href = '../departamentos.html';
    });
    pathCabanas.addEventListener('mouseenter', event => {
        const message = messages[language]?.cabañas || messages['es'].cabañas;
        showInfoBox(event, message.title, message.info);
    });

    pathSanVicente.addEventListener('mouseleave', hideInfoBox);

    mElement.appendChild(pathCabanas);
    features.appendChild(mElement);

    // San Salvador n

    const nElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    nElement.setAttribute('href', '#');

    const pathSanSalvador = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathSanSalvador.setAttribute('d', 'M363.6 177.2l2.7 0.4 1.5-0.8 4.9-3.5 2.9-1 7.8 3.4 5.2 0.1 2.4-4.8 5.3 4.2 4.2 1 10.4-4.8-0.2 3.8-1.7 4.6-1.8 3.7-0.3 1.2 0.1 1.7 1.2 6.4 0.3 3.7-0.1 0.7 0 0.4-0.2 1.6-0.5 2.1-0.3 2.3-0.3 1.1-0.3 0.9-1 1.6-0.7 0.6-0.7 0.6-0.6 0.5-0.2 0.6 0.4 3.3 0.8 2.9 3.5 7.4 7.8 12.8 2.3 3 0.4 0.8-0.7 1.5-0.7 0.8-1 0.7-2.7 1.2-0.7 0.6 1.1 3 10 15.7 3.4 4 2.6 2.1 2.4 0.1 1.1 0.2 1 0.4 0.7 0.6 4.7 7 1.6 1.6 1.4 1 1 0.3 0.7 1.1 0.3 1.7-0.6 8.3 0.5 1.8 6.6 12.5 1.8 2.3 0.7 2 0.8 2 0.3 11.6-13.6 12.8-11.3 14.4-1.9 1.5-1.1-0.1-1.2-0.2-6-1.9-1.1-0.2-1.2 0-1 0.2-0.9 0.5-0.5 1.2-0.2 1.8 0.7 3.3 1.1 3.1 2.9 5.1 0.7 1.9-0.2 2.7-0.8 4.2-3.2 9.6-1.9 4.1-2.7 3-1.1 0.7-0.8 3.2-2.8-1.2-1-0.3-1.4-0.2-2.2 0.3-3.9 1.3-2.1 0.5-1.2 0.1-1.1-0.2-0.8-0.4-0.6-0.7-2.1-4.6-6-9.8-0.2-1.4 0.1-1.8 0.8-3.4 2.4-6.1 0.2-1.2-0.7-15.9 0.2-3.7 0.6-2.2 0.7-0.6 0.6-0.7 0.2-0.9-0.4-0.9-2.9-1.4-0.8-0.8-0.1-1.2 0.9-2.2 1.2-2.3 0.2-1.2-0.4-1.4-2.5-3.4-1.6-1.4-0.7-0.5-5.4-2.9-0.8-0.6-0.7-1.1-0.6-1.7-0.7-3-0.4-1.3-0.7-0.9-1.5-1.1-0.6-0.7-0.5-0.8-0.4-1-0.3-3.7 0.4-3.8-1.9-2.5-1.2-0.1-1-0.3-0.6-0.8-0.2-1.5 1.7-4.8 2.6-4.9 0.3-1 0.3-1.6 0.4-6.2 0.7-3.6 1.2-2.8 0.8-3 0.7-6.8 0.5-1.8 0.7-1.9 1.2-1.4 0.7-0.6 0.9-0.5 1.9-0.7 0.8-0.5 0.4-0.9 0.5-2.2 1.9-21.6 0.4-1.2 0.7-0.7 1-0.3 2.8 0.1 0.3-0.3 0.1-0.4 0.5-2.2 1-2.6-0.1-0.6-0.6-0.8-2-1.1-1.4-1.1-1.2-0.7-1-0.4-1.1-0.2-1.1-0.2-1.2 0-3.5 0.3-1.1-0.1-3-0.9-1.8-0.9-1.6-1-1-1.4-1.1-2.1-1.9-4.4-1.1-2-0.9-1.3-2.3-1.8-0.2-1.4 0.1-2.1 2-8.3 0.4-13z');
    pathSanSalvador.setAttribute('id', 'SVSS'); // <path id="SVSS">
    pathSanSalvador.setAttribute('name', 'San Salvador'); // <path name="San Salvador">
    pathSanSalvador.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('selectedDepartment', 'San Salvador');
        window.location.href = '../departamentos.html';
    });
    pathSanSalvador.addEventListener('mouseenter', event => {
        const message = messages[language]?.sanSalvador || messages['es'].sanSalvador;
        showInfoBox(event, message.title, message.info);
    });

    pathSanVicente.addEventListener('mouseleave', hideInfoBox);

    nElement.appendChild(pathSanSalvador);
    features.appendChild(nElement);

    svg.appendChild(features);
    mapDiv.appendChild(svg);
    body.appendChild(mapDiv);

    // Crear el cuadro de información
    const infoBox = document.createElement('div');
    infoBox.setAttribute('id', 'info-box'); // <div id="info-box">
    body.appendChild(infoBox);

    function createFooter() {
        const translations = {
            es: {
                title: 'República de El Salvador',
                text: 'El Salvador es conocido por sus impresionantes paisajes, hermosas playas y rica cultura. Es el país más pequeño de Centroamérica, famoso por su amabilidad y su deliciosa gastronomía, como las pupusas. El Salvador ofrece una mezcla única de naturaleza y tradición, convirtiéndolo en un destino atractivo para los visitantes.',
                linksTitle: 'Enlaces',
                links: ['Inicio', 'Desarrolladores', 'Formulario'],
                languageTitle: 'Idiomas',
                copyright: '&copy; 2024 Ministerio de Turismo El Salvador',
                urls: ['index.html', 'desarrolladores.html', 'formulario.html']
            },
            en: {
                title: 'Republic of El Salvador',
                text: 'El Salvador is known for its stunning landscapes, beautiful beaches, and rich culture. It is the smallest country in Central America, famous for its hospitality and delicious cuisine, like pupusas. El Salvador offers a unique blend of nature and tradition, making it an attractive destination for visitors.',
                linksTitle: 'Links',
                links: ['Home', 'Developers', 'Form'],
                languageTitle: 'Languages',
                copyright: '&copy; 2024 Ministry of Tourism El Salvador',
                urls: ['index.html', 'desarrolladores.html', 'formulario.html']
            }
        };

        let language = sessionStorage.getItem('language') || 'es';
        const footerContent = translations[language];

        const footer = document.createElement('footer');
        footer.style.backgroundColor = '#6f9c76';

        const container = document.createElement('div');
        container.className = 'container p-4';

        const row = document.createElement('div');
        row.className = 'row';

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

        const linksCol = document.createElement('div');
        linksCol.className = 'col-lg-3 col-md-6 mb-4';

        const linksTitle = document.createElement('h5');
        linksTitle.className = 'mb-3';
        linksTitle.style.letterSpacing = '2px';
        linksTitle.style.color = '#fff';
        linksTitle.textContent = footerContent.linksTitle;

        const linksList = document.createElement('ul');
        linksList.className = 'list-unstyled mb-0';

        footerContent.links.forEach((linkText, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'mb-1';

            const linkElement = document.createElement('a');
            linkElement.href = footerContent.urls[index];
            linkElement.style.color = '#fff';
            linkElement.textContent = linkText;

            listItem.appendChild(linkElement);
            linksList.appendChild(listItem);
        });

        linksCol.appendChild(linksTitle);
        linksCol.appendChild(linksList);
        row.appendChild(linksCol);

        const languageCol = document.createElement('div');
        languageCol.className = 'col-lg-3 col-md-6 mb-4';

        const languageTitle = document.createElement('h5');
        languageTitle.className = 'mb-3';
        languageTitle.style.letterSpacing = '2px';
        languageTitle.style.color = '#fff';
        languageTitle.textContent = footerContent.languageTitle;

        const languageContainer = document.createElement('div');
        languageContainer.className = 'd-flex flex-column';

        const languages = [
            { code: "en", name: "English", flagSrc: "../img/banderas/us.svg" },
            { code: "es", name: "Español", flagSrc: "../img/banderas/es.svg" }
        ];

        languages.forEach(language => {
            const languageOption = document.createElement('div');
            languageOption.className = 'language-option d-flex align-items-center my-2';

            const flagImg = document.createElement('img');
            flagImg.src = language.flagSrc;
            flagImg.alt = `${language.name} flag`;
            flagImg.style.width = '30px';
            flagImg.style.marginRight = '10px';

            const languageText = document.createElement('span');
            languageText.textContent = language.name;
            languageText.style.cursor = 'pointer';
            languageText.style.fontSize = '18px';
            languageText.style.color = '#fff';

            languageOption.addEventListener('click', function () {
                sessionStorage.setItem('language', language.code);
                location.reload();
            });

            languageOption.appendChild(flagImg);
            languageOption.appendChild(languageText);
            languageContainer.appendChild(languageOption);
        });

        languageCol.appendChild(languageTitle);
        languageCol.appendChild(languageContainer);
        row.appendChild(languageCol);

        container.appendChild(row);
        footer.appendChild(container);

        const copyright = document.createElement('div');
        copyright.className = 'text-center p-3';
        copyright.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        copyright.style.color = '#fff';
        copyright.innerHTML = footerContent.copyright;

        footer.appendChild(copyright);
        document.body.appendChild(footer);
    }

    createFooter();
});

function showInfoBox(event, department, info) {
    var infoBox = document.getElementById('info-box');
    infoBox.innerHTML = `<strong>${department}</strong><br>${info}`;
    infoBox.style.display = 'block';
    infoBox.style.left = event.pageX + 'px';
    infoBox.style.top = event.pageY + 'px';
}

// Ocultar cuadro
function hideInfoBox() {
    var infoBox = document.getElementById('info-box');
    infoBox.style.display = 'none';
}
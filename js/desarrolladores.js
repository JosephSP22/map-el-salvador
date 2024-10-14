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
        // Mostrar el loader al cargar la página
        $("#loader").fadeIn(500); // Fade in al cargar

        // Ocultar el loader después de un breve período (ajusta el tiempo según lo que necesites)
        setTimeout(function () {
            $("#loader").fadeOut(500); // Fade out después de 300ms
        }, 300); // Ajusta el tiempo aquí (300ms = 0.3 segundos)

        // Capturar el clic en los enlaces
        $("a").on("click", function (event) {
            // No mostrar el loader al hacer clic en los enlaces
            const targetUrl = $(this).attr("href"); // Obtener la URL del enlace

            // Cambiar de página inmediatamente al hacer clic
            window.location = targetUrl; // Cambiar de página
        });
    });


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



    // Crear el div para sugerencias
    const sugerenciasDiv = document.createElement("div");
    sugerenciasDiv.id = "sugerencias";
    document.body.appendChild(sugerenciasDiv);

    // Definir traducciones para el encabezado y los perfiles
    const translations = {
        es: {
            header: "Equipo de Desarrolladores",
            profiles: [
                { name: "Adán Ruano", job: "Programador" },
                { name: "Blanca Marravilla", job: "Programadora" },
                { name: "Rebeca Orozco", job: "Programadora" },
                { name: "Elmer Cruz", job: "Programador" }
            ]
        },
        en: {
            header: "Developers Team",
            profiles: [
                { name: "Adán Ruano", job: "Programmer" },
                { name: "Blanca Marravilla", job: "Programmer" },
                { name: "Rebeca Orozco", job: "Programmer" },
                { name: "Elmer Cruz", job: "Programmer" }
            ]
        }
    };

    // Detectar el idioma almacenado en sessionStorage
    const profileTranslations = translations[language].profiles; // Obtener nombres y trabajos según el idioma

    // Crear el encabezado
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = translations[language].header; // Asignar el encabezado según el idioma
    header.appendChild(h1);
    document.body.appendChild(header);

    // Crear el contenedor de perfiles
    const profilesContainer = document.createElement("div");
    profilesContainer.id = "profiles-container";
    document.body.appendChild(profilesContainer);

    // Arreglo de perfiles con imágenes y enlaces sociales
    const profiles = [
        {
            imgSrc: "../img/adann.png",
            socialLinks: [
                { href: "https://www.instagram.com/adan_ruano/", background: "#e1306c", icon: "bx bxl-instagram" },
                { href: "https://www.linkedin.com/in/ad%C3%A1n-ruano-19b339284/", background: "#0077b5", icon: "bx bxl-linkedin", target: "_blank" },
                { href: "https://github.com/JosephSP22", background: "#24282e", icon: "bx bxl-github", target: "_blank" }
            ]
        },
        {
            imgSrc: "../img/blancaa.png",
            socialLinks: [
                { href: "https://www.instagram.com/esmii_cz?igsh=bGIybHY0bHRicnJs", background: "#e1306c", icon: "bx bxl-instagram" },
                { href: "https://www.linkedin.com/in/blanca-maravilla-308000239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", background: "#0077b5", icon: "bx bxl-linkedin", target: "_blank" },
                { href: "https://github.com/bmaravilla-hub", background: "#24282e", icon: "bx bxl-github", target: "_blank" }
            ]
        },
        {
            imgSrc: "../img/rebecaa.png",
            socialLinks: [
                { href: "https://www.instagram.com/x.rebecaa.x/?utm_source=ig_web_button_share_sheet", background: "#e1306c", icon: "bx bxl-instagram" },
                { href: "https://www.linkedin.com/in/blanca-maravilla-308000239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", background: "#0077b5", icon: "bx bxl-linkedin", target: "_blank" },
                { href: "https://github.com/bmaravilla-hub", background: "#24282e", icon: "bx bxl-github", target: "_blank" }
            ]
        },
        {
            imgSrc: "../img/elmerr.png",
            socialLinks: [
                { href: "https://www.instagram.com/elmer_cruz44?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", background: "#e1306c", icon: "bx bxl-instagram" },
                { href: "https://www.linkedin.com/in/elmer-cruz06/", background: "#0077b5", icon: "bx bxl-linkedin", target: "_blank" },
                { href: "https://github.com/AntonySP22", background: "#24282e", icon: "bx bxl-github", target: "_blank" }
            ]
        }
    ];

    // Renderizar los perfiles
    profiles.forEach((profile, index) => {
        const profileCard = document.createElement("div");
        profileCard.className = "profile-card";

        const imageDiv = document.createElement("div");
        imageDiv.className = "image";
        const img = document.createElement("img");
        img.src = profile.imgSrc; // Asignar la imagen correspondiente
        img.alt = "Profile Image";
        img.className = "profile-img";
        imageDiv.appendChild(img);

        const textDataDiv = document.createElement("div");
        textDataDiv.className = "text-data";
        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = profileTranslations[index].name; // Obtener nombre según el idioma
        const jobSpan = document.createElement("span");
        jobSpan.className = "job";
        jobSpan.textContent = profileTranslations[index].job; // Obtener trabajo según el idioma
        textDataDiv.appendChild(nameSpan);
        textDataDiv.appendChild(jobSpan);

        const mediaButtonsDiv = document.createElement("div");
        mediaButtonsDiv.className = "media-buttons";
        profile.socialLinks.forEach(link => {
            const a = document.createElement("a");
            a.href = link.href;
            a.style.background = link.background;
            a.className = "link";
            if (link.target) {
                a.target = link.target;
            }
            const i = document.createElement("i");
            i.className = link.icon;
            a.appendChild(i);
            mediaButtonsDiv.appendChild(a);
        });

        profileCard.appendChild(imageDiv);
        profileCard.appendChild(textDataDiv);
        profileCard.appendChild(mediaButtonsDiv);
        profilesContainer.appendChild(profileCard);
    });


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

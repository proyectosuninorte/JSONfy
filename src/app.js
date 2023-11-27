let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo');
let logoSpan = document.querySelectorAll('.logo-parts');

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        logoSpan.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (index + 1) * 100);
        });

        setTimeout(() => {
            logoSpan.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (span + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const generateButtonCol = document.getElementById("generateCol");
    const generateButton = document.getElementById("generate");
    const dataTable = document.getElementById("data-table");
    const downloadLink = document.getElementById("download-link");
    const principalTable = document.getElementById("principal-table");


    //Se obtienen los valores de los campos de la tabla
    let nombresColumnas = [];
    let tiposDatos = [];
    
    
    // BOTON QUE GENERA LA CANTIDAD DE COLUMNAS DE LA TABLA, se le muestra al usuario una tabla con los campos a llenar
    generateButtonCol.addEventListener("click", function () {
        const botonGenerar = document.getElementById("BotonGenerar");
        const casillaRegistros = document.getElementById("casillaRegistros");
        const cantidadFilas = document.getElementById("casillaCol").value;

        // Validar que la cantidad sea un número positivo
        if (isNaN(cantidadFilas) || cantidadFilas <= 0) {
            alert("Ingresa un número positivo válido.");
            return;
        }
    
        // Crear la tabla
        let tablaHTML = '<table>';
        tablaHTML += '<thead><tr><th>Datos del Archivo</th></tr></thead>';
        tablaHTML += '<tbody>';
    
        // Generar filas de la tabla
        for (let i = 0; i < cantidadFilas; i++) {
            tablaHTML += `<tr><td> 
                Nombre de la columna:
                <input id="Namecolum${i}" type="text">
                Tipo de dato:
                <select id="selectType${i}">
                <option value="Selecciona">Selecciona</option>
                <option value="Nombre">Nombre</option>
                <option value="Apellido">Apellido</option>
                <option value="Nombre y Apellido">Nombre y Apellido</option>
                <option value="Nombre Completo">Nombre Completo</option>
                <option value="Identificación">Identificación</option>
                <option value="Edad">Edad</option>      
                <option value="Pais">Pais</option>
                <option value="Ciudad">Ciudad</option> 
                <option value="Coordenadas">Coordenadas</option>
                <option value="Boleean">boleean</option>
                <option value="Productos">Productos</option>   
                <option value="Categorias">Categorias</option>            
                </select>
                </td></tr>`;
        }
    
        tablaHTML += '</tbody>';
        tablaHTML += '</table>';
        botonGenerar.style.display = "flex";
        casillaRegistros.style.display = "flex";
    
        // Mostrar la tabla en el contenedor
        document.getElementById("tablaContainer").innerHTML = tablaHTML;

        downloadLink.style.display = "none";
        principalTable.style.display = "none";

        var inputElement = document.getElementById("cantidadRegistros");
        inputElement.value = ""

    });


    //RECOPILA LOS TIPOS DE DATOS Y NOMBRES DE LAS COLUMNAS DADAS POR EL USUARIO.
    function GetColumnasDatos(cantidadFilas){
        nombresColumnas = [];
        tiposDatos = [];

        for (let i = 0; i < cantidadFilas; i++) {
            // Obtener el valor del input por su ID
            var nombreColumna = document.getElementById(`Namecolum${i}`).value;
            var tipoDato = document.getElementById(`selectType${i}`).value;

            nombresColumnas.push(nombreColumna);
            tiposDatos.push(tipoDato);
        }
    }

    //GENERAR LAS FILAS DE LA TABLA Y DEFINIR LOS DATOS A MOSTRAR EN EL JSON
    function generateData(tiposDatos, nombresColumnas) {
        dataTable.innerHTML = "";
        const numRowsInput = document.getElementById("cantidadRegistros").value;
        let data = {};

        if (isNaN(numRowsInput) || numRowsInput <= 0) {
            alert("Ingresa una cantidad de registros válida");
            return;
        }else{
            for (let i = 1; i <= numRowsInput; i++) {
    
                const row = document.createElement("tr");
    
                for (const field of tiposDatos) {
                    data[field] = getDataGenerator(field);
    
                    const cell = document.createElement("td");
                    cell.textContent = data[field];
                    row.appendChild(cell);
                }

                dataTable.appendChild(row);
            }

            const jsonData = Array.from(dataTable.querySelectorAll("tr")).map((row) => {
                const cells = Array.from(row.querySelectorAll("td"));
                const data = {};
            
                for (let i = 0; i < nombresColumnas.length; i++) {
                    data[nombresColumnas[i]] = cells[i].textContent;
                }
            
                return data;
            });
            
            const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            
            downloadLink.href = url;
            downloadLink.style.display = "flex";
            principalTable.style.display = "table";
            downloadLink.download = "datos.json";
        }

            
    }

    //FUNCION QUE CAMBIA EL ENCABEZADO DE LA TABLA
    function changeHeadTable() {
        var tableHeaders = document.getElementById("table-headers");

        tableHeaders.innerHTML = "";

        if (nombresColumnas.length === 0) {
            alert("Ingresa los nombres de las columnas");
            return;
        }

        for (const field of nombresColumnas) {
            if (field === "") {
                alert("Ingresa los nombres de las columnas");
                return;
            }
            const th = document.createElement("th");
            th.textContent = field;
            tableHeaders.appendChild(th);
        }
    }

    // Funciones generadoras aleatorias para los datos
    function getDataGenerator(field) {
        if (field === "Selecciona") {
            alert("Selecciona un tipo de dato de las opciones");
            return;
        } else if (field === "Nombre") {
            return generateRandomName();
        } else if (field === "Apellido") {
            return generateRandomApellido();
        } else if (field === "Nombre y Apellido") {
            return generateRandomName() + " " + generateRandomApellido();
        }else if (field === "Nombre Completo") {
            return generateRandomName() + " " + generateRandomName() + " " + generateRandomApellido() + " " + generateRandomApellido();
        }else if (field === "Identificación") {
            return generateRandomID();
        }else if (field === "Edad") {
            return generateRandomAge();
        }else if (field === "Pais") {
            return generateRandomCountry();
        }else if (field === "Ciudad") {
            return generateRandomCity();
        }else if (field === "Coordenadas") {
            return generateRandomCoordinates();
        }else if (field === "Boleaan") {
            return generarBooleanoAleatorio();
        }else if (field === "Productos") {
            return generateRandomProductName();
        }else if (field === "Categorias") {
            return generateRandomCategory();
        }
    }

    // Funciones generadoras aleatorias específicas
    function generateRandomID() {
        return Math.floor(Math.random() * 1000000);
    }

    function generateRandomName() {
        const names = ["Alice", "Bob", "Alinson", "Judith", "Esteban", "Charlie", "David", "Eve", "Frank", "Grace", "Helen", "Isaac", "Jack", 
        "Sophia", "Oliver", "Liam", "Emma", "Ava", "Lucas", "Mia", "Zoe", "Ethan", "Luna", "Chloe", "Noah", "Harper", "Aiden", "Lily", "Grace", 
        "Sophie", "Benjamin", "Ella", "Emily", "Michael", "William", "James", "Daniel", "Olivia", "Alexander", "Sebastian", "Evelyn", "Nora"];
        return names[Math.floor(Math.random() * names.length)];
    }

    function generateRandomApellido() {
        const apellidos = [
            "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
            "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
            "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
            "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
            "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
            "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
            "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez",
            "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross",
            "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington"
        ];
        return apellidos[Math.floor(Math.random() * apellidos.length)];
    }

    function generateRandomAge() {
        return Math.floor(Math.random() * 50) + 18;
    }

    function generateRandomCity() {
        const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Houston", "Seattle", "Boston", "Atlanta", "Denver", 
        "Philadelphia", "Phoenix", "Dallas", "Minneapolis", "Portland", "Detroit", "Las Vegas", "Charlotte", "San Diego", "Nashville", "New Orleans", 
        "Indianapolis", "Columbus", "Salt Lake City", "Austin", "San Antonio", "Kansas City", "Raleigh", "Tucson", "Tampa", "Orlando", "Hartford", 
        "St. Louis", "Pittsburgh", "Cincinnati", "Milwaukee", "Cleveland", "Buffalo", "Providence"
        ];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    function generateRandomCountry() {
        const paises = [
            "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia",
            "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín",
            "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
            "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre",
            "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca",
            "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos",
            "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana",
            "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría",
            "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia",
            "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto",
            "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia del Norte", "Madagascar", "Malasia"
          ];
        return paises[Math.floor(Math.random() * paises.length)];
    }

    function generateRandomProductName() {
        const products = ["Portátil", "Teléfono inteligente", "Tableta", "Auriculares", "Cámara", "Monitor", "Teclado", "Ratón", "Impresora", 
        "Enrutador", "Silla", "Sofá", "Bicicleta", "Cafetera", "Mochila", "Gafas de sol", "Paraguas", "Guitarra", "Zapatos", "Reloj de pulsera", 
        "Sweater", "Cepillo de dientes", "Cortacésped", "Patinete", "Caña de pescar", "Manguera de jardín", "Mesa de comedor", "Aspiradora", 
        "Botas de senderismo", "Telescopio", "Rompecabezas", "Maceta para plantas", "Taladro eléctrico", "Equipo de esquí", "Equipaje", 
        "Juego de utensilios de cocina", "Casco de bicicleta", "Hervidor de agua", "Toallas de baño"];
        return products[Math.floor(Math.random() * products.length)];
    }

    function generateRandomCategory() {
        const categories = ["Electrónica", "Ropa", "Hogar y Jardín", "Libros", "Deportes y Aire Libre", "Juguetes", "Salud y Belleza"];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    function generateRandomCoordinates() {
        return `${(Math.random() * 180 - 90).toFixed(6)}, ${(Math.random() * 360 - 180).toFixed(6)}`;
    }

    function generarBooleanoAleatorio() {
        return Math.random() < 0.5; // 50% de probabilidad de ser true o false
    }

    // BOTON QUE CREA LA TABLA A MOSTRAR EN PANTALLA
    generateButton.addEventListener("click", function () {

        //DEFINE LA CANTIDAD DE COLUMNAS DEL JSON
        const cantidadFilas = document.getElementById("casillaCol").value;

        GetColumnasDatos(cantidadFilas);
        changeHeadTable();

        generateData(tiposDatos, nombresColumnas);

    });

});
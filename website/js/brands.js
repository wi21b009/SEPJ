$(document).ready(function () {
    addBrandsDropDown();
    addModelsDropDown();
});

const addBrandsDropDown = () => {
    const brandSelect = $("#brandSelect");
    //const selectElement = document.createElement("select");
    cars.Brands.forEach(brand => {
        const optionElement = document.createElement("option");
        optionElement.value = brand.ID;
        optionElement.textContent = brand.Marke;
        brandSelect.append(optionElement);
    });
}

const addModelsDropDown = () => {
    const modelSelect = $("#modelSelect");
    const brandSelect = $("#brandSelect");
    brandSelect.change(function() {
        modelSelect.prop('disabled', false);
        cars.Models
            .filter(obj => obj.Marke === brandSelect.find(':selected').text())
            .forEach(obj => {
                const optionElement = document.createElement("option");
                optionElement.value = obj.ID;
                optionElement.textContent = obj.Model;
                modelSelect.append(optionElement);
        });
    })
}

const cars = {
    "Brands":[
     {
      "ID": 1000,
      "Marke": "Alfa Romeo"
     },
     {
      "ID": 1003,
      "Marke": "Audi"
     },
     {
      "ID": 1005,
      "Marke": "BMW"
     },
     {
      "ID": 1008,
      "Marke": "Chevrolet"
     },
     {
      "ID": 1009,
      "Marke": "Chrysler"
     },
     {
      "ID": 1010,
      "Marke": "Citroen"
     },
     {
      "ID": 1011,
      "Marke": "Dacia"
     },
     {
      "ID": 1015,
      "Marke": "Ferrari"
     },
     {
      "ID": 1016,
      "Marke": "Fiat"
     },
     {
      "ID": 1017,
      "Marke": "Ford"
     },
     {
      "ID": 1018,
      "Marke": "Honda"
     },
     {
      "ID": 1020,
      "Marke": "Hyundai"
     },
     {
      "ID": 1023,
      "Marke": "Jaguar"
     },
     {
      "ID": 1024,
      "Marke": "Jeep"
     },
     {
      "ID": 1025,
      "Marke": "KIA"
     },
     {
      "ID": 1028,
      "Marke": "Lancia"
     },
     {
      "ID": 1029,
      "Marke": "Land Rover"
     },
     {
      "ID": 1030,
      "Marke": "Lexus"
     },
     {
      "ID": 1033,
      "Marke": "Maserati"
     },
     {
      "ID": 1035,
      "Marke": "Mazda"
     },
     {
      "ID": 1036,
      "Marke": "Mercedes-Benz"
     },
     {
      "ID": 1038,
      "Marke": "MG"
     },
     {
      "ID": 1039,
      "Marke": "MINI"
     },
     {
      "ID": 1040,
      "Marke": "Mitsubishi"
     },
     {
      "ID": 1042,
      "Marke": "Nissan"
     },
     {
      "ID": 1043,
      "Marke": "Opel"
     },
     {
      "ID": 1045,
      "Marke": "Peugeot"
     },
     {
      "ID": 1048,
      "Marke": "Porsche"
     },
     {
      "ID": 1051,
      "Marke": "Renault"
     },
     {
      "ID": 1056,
      "Marke": "Seat"
     },
     {
      "ID": 1057,
      "Marke": "Skoda"
     },
     {
      "ID": 1058,
      "Marke": "Smart"
     },
     {
      "ID": 1060,
      "Marke": "Subaru"
     },
     {
      "ID": 1061,
      "Marke": "Suzuki"
     },
     {
      "ID": 1062,
      "Marke": "Toyota"
     },
     {
      "ID": 1064,
      "Marke": "Volvo"
     },
     {
      "ID": 1065,
      "Marke": "Volkswagen"
     },
     {
      "ID": 10004,
      "Marke": "Abarth"
     },
     {
      "ID": 10008,
      "Marke": "Tesla"
     },
     {
      "ID": 10012,
      "Marke": "Aixam"
     },
     {
      "ID": 10026,
      "Marke": "Cupra"
     },
     {
      "ID": 10029,
      "Marke": "Polestar"
     },
     {
      "ID": 10034,
      "Marke": "BYD"
     }
    ],
    "Models":[
     {
      "ID": 1002,
      "Marke": "Alfa Romeo",
      "Model": 147
     },
     {
      "ID": 1004,
      "Marke": "Alfa Romeo",
      "Model": 156
     },
     {
      "ID": 1005,
      "Marke": "Alfa Romeo",
      "Model": 159
     },
     {
      "ID": 1010,
      "Marke": "Alfa Romeo",
      "Model": "GT"
     },
     {
      "ID": 1012,
      "Marke": "Alfa Romeo",
      "Model": "GTV"
     },
     {
      "ID": 2067,
      "Marke": "Alfa Romeo",
      "Model": "Giulia"
     },
     {
      "ID": 1837,
      "Marke": "Alfa Romeo",
      "Model": "Giulietta"
     },
     {
      "ID": 1823,
      "Marke": "Alfa Romeo",
      "Model": "MiTo"
     },
     {
      "ID": 1013,
      "Marke": "Alfa Romeo",
      "Model": "Spider"
     },
     {
      "ID": 2091,
      "Marke": "Alfa Romeo",
      "Model": "Stelvio"
     },
     {
      "ID": 2241,
      "Marke": "Alfa Romeo",
      "Model": "Tonale"
     },
     {
      "ID": 1838,
      "Marke": "Audi",
      "Model": "A1"
     },
     {
      "ID": 1022,
      "Marke": "Audi",
      "Model": "A2"
     },
     {
      "ID": 1023,
      "Marke": "Audi",
      "Model": "A3"
     },
     {
      "ID": 1024,
      "Marke": "Audi",
      "Model": "A4"
     },
     {
      "ID": 2065,
      "Marke": "Audi",
      "Model": "A4 allroad"
     },
     {
      "ID": 1789,
      "Marke": "Audi",
      "Model": "A5"
     },
     {
      "ID": 1026,
      "Marke": "Audi",
      "Model": "A6"
     },
     {
      "ID": 2066,
      "Marke": "Audi",
      "Model": "A6 allroad"
     },
     {
      "ID": 1842,
      "Marke": "Audi",
      "Model": "A7"
     },
     {
      "ID": 1027,
      "Marke": "Audi",
      "Model": "A8"
     },
     {
      "ID": 2082,
      "Marke": "Audi",
      "Model": "Q2"
     },
     {
      "ID": 1925,
      "Marke": "Audi",
      "Model": "Q3"
     },
     {
      "ID": 2219,
      "Marke": "Audi",
      "Model": "Q4"
     },
     {
      "ID": 1824,
      "Marke": "Audi",
      "Model": "Q5"
     },
     {
      "ID": 1031,
      "Marke": "Audi",
      "Model": "Q7"
     },
     {
      "ID": 2145,
      "Marke": "Audi",
      "Model": "Q8"
     },
     {
      "ID": 1750,
      "Marke": "Audi",
      "Model": "R8"
     },
     {
      "ID": 1033,
      "Marke": "Audi",
      "Model": "TT"
     },
     {
      "ID": 2171,
      "Marke": "Audi",
      "Model": "e-tron"
     },
     {
      "ID": 2315,
      "Marke": "Audi",
      "Model": "e-tron GT"
     },
     {
      "ID": 1041,
      "Marke": "BMW",
      "Model": "1er-Reihe"
     },
     {
      "ID": 2044,
      "Marke": "BMW",
      "Model": "2er-Reihe"
     },
     {
      "ID": 1042,
      "Marke": "BMW",
      "Model": "3er-Reihe"
     },
     {
      "ID": 2026,
      "Marke": "BMW",
      "Model": "4er-Reihe"
     },
     {
      "ID": 1046,
      "Marke": "BMW",
      "Model": "5er-Reihe"
     },
     {
      "ID": 1050,
      "Marke": "BMW",
      "Model": "6er-Reihe"
     },
     {
      "ID": 1051,
      "Marke": "BMW",
      "Model": "7er-Reihe"
     },
     {
      "ID": 1054,
      "Marke": "BMW",
      "Model": "8er-Reihe"
     },
     {
      "ID": 1843,
      "Marke": "BMW",
      "Model": "X1"
     },
     {
      "ID": 2125,
      "Marke": "BMW",
      "Model": "X2"
     },
     {
      "ID": 1055,
      "Marke": "BMW",
      "Model": "X3"
     },
     {
      "ID": 2048,
      "Marke": "BMW",
      "Model": "X4"
     },
     {
      "ID": 1056,
      "Marke": "BMW",
      "Model": "X5"
     },
     {
      "ID": 1814,
      "Marke": "BMW",
      "Model": "X6"
     },
     {
      "ID": 2178,
      "Marke": "BMW",
      "Model": "X7"
     },
     {
      "ID": 2287,
      "Marke": "BMW",
      "Model": "XM"
     },
     {
      "ID": 1057,
      "Marke": "BMW",
      "Model": "Z1"
     },
     {
      "ID": 1058,
      "Marke": "BMW",
      "Model": "Z3"
     },
     {
      "ID": 1060,
      "Marke": "BMW",
      "Model": "Z4"
     },
     {
      "ID": 2027,
      "Marke": "BMW",
      "Model": "i3"
     },
     {
      "ID": 2290,
      "Marke": "BMW",
      "Model": "i4"
     },
     {
      "ID": 2289,
      "Marke": "BMW",
      "Model": "i7"
     },
     {
      "ID": 2046,
      "Marke": "BMW",
      "Model": "i8"
     },
     {
      "ID": 2233,
      "Marke": "BMW",
      "Model": "iX"
     },
     {
      "ID": 2288,
      "Marke": "BMW",
      "Model": "iX1"
     },
     {
      "ID": 2232,
      "Marke": "BMW",
      "Model": "iX3"
     },
     {
      "ID": 1825,
      "Marke": "Chevrolet",
      "Model": "Aveo"
     },
     {
      "ID": 1932,
      "Marke": "Chevrolet",
      "Model": "Camaro"
     },
     {
      "ID": 1752,
      "Marke": "Chevrolet",
      "Model": "Captiva"
     },
     {
      "ID": 1074,
      "Marke": "Chevrolet",
      "Model": "Corvette"
     },
     {
      "ID": 1844,
      "Marke": "Chevrolet",
      "Model": "Cruze"
     },
     {
      "ID": 1729,
      "Marke": "Chevrolet",
      "Model": "Kalos"
     },
     {
      "ID": 1731,
      "Marke": "Chevrolet",
      "Model": "Matiz"
     },
     {
      "ID": 1910,
      "Marke": "Chevrolet",
      "Model": "Orlando"
     },
     {
      "ID": 1078,
      "Marke": "Chrysler",
      "Model": 300
     },
     {
      "ID": 1080,
      "Marke": "Chrysler",
      "Model": "Crossfire"
     },
     {
      "ID": 1088,
      "Marke": "Chrysler",
      "Model": "PT Cruiser"
     },
     {
      "ID": 2179,
      "Marke": "Chrysler",
      "Model": "Pacifica"
     },
     {
      "ID": 1090,
      "Marke": "Chrysler",
      "Model": "Sebring"
     },
     {
      "ID": 1094,
      "Marke": "Chrysler",
      "Model": "Voyager"
     },
     {
      "ID": 1753,
      "Marke": "Citroen",
      "Model": "2CV"
     },
     {
      "ID": 1096,
      "Marke": "Citroen",
      "Model": "Berlingo"
     },
     {
      "ID": 1100,
      "Marke": "Citroen",
      "Model": "C1"
     },
     {
      "ID": 1101,
      "Marke": "Citroen",
      "Model": "C2"
     },
     {
      "ID": 1102,
      "Marke": "Citroen",
      "Model": "C3"
     },
     {
      "ID": 2117,
      "Marke": "Citroen",
      "Model": "C3 Aircross"
     },
     {
      "ID": 1846,
      "Marke": "Citroen",
      "Model": "C3 Picasso"
     },
     {
      "ID": 1103,
      "Marke": "Citroen",
      "Model": "C4"
     },
     {
      "ID": 2057,
      "Marke": "Citroen",
      "Model": "C4 Cactus"
     },
     {
      "ID": 1987,
      "Marke": "Citroen",
      "Model": "C4 Picasso"
     },
     {
      "ID": 2280,
      "Marke": "Citroen",
      "Model": "C4 X"
     },
     {
      "ID": 1104,
      "Marke": "Citroen",
      "Model": "C5"
     },
     {
      "ID": 2170,
      "Marke": "Citroen",
      "Model": "C5 Aircross"
     },
     {
      "ID": 2262,
      "Marke": "Citroen",
      "Model": "C5 X"
     },
     {
      "ID": 1106,
      "Marke": "Citroen",
      "Model": "C8"
     },
     {
      "ID": 1847,
      "Marke": "Citroen",
      "Model": "DS3"
     },
     {
      "ID": 1912,
      "Marke": "Citroen",
      "Model": "DS4"
     },
     {
      "ID": 1942,
      "Marke": "Citroen",
      "Model": "DS5"
     },
     {
      "ID": 1110,
      "Marke": "Citroen",
      "Model": "Jumpy"
     },
     {
      "ID": 2094,
      "Marke": "Citroen",
      "Model": "Spacetourer"
     },
     {
      "ID": 1115,
      "Marke": "Citroen",
      "Model": "Xsara"
     },
     {
      "ID": 1988,
      "Marke": "Citroen",
      "Model": "Xsara Picasso"
     },
     {
      "ID": 1849,
      "Marke": "Dacia",
      "Model": "Duster"
     },
     {
      "ID": 2272,
      "Marke": "Dacia",
      "Model": "Jogger"
     },
     {
      "ID": 1953,
      "Marke": "Dacia",
      "Model": "Lodgy"
     },
     {
      "ID": 1118,
      "Marke": "Dacia",
      "Model": "Logan"
     },
     {
      "ID": 1826,
      "Marke": "Dacia",
      "Model": "Sandero"
     },
     {
      "ID": 2245,
      "Marke": "Dacia",
      "Model": "Spring"
     },
     {
      "ID": 1150,
      "Marke": "Ferrari",
      "Model": 348
     },
     {
      "ID": 1151,
      "Marke": "Ferrari",
      "Model": 360
     },
     {
      "ID": 1851,
      "Marke": "Ferrari",
      "Model": 458
     },
     {
      "ID": 2133,
      "Marke": "Ferrari",
      "Model": 488
     },
     {
      "ID": 2134,
      "Marke": "Ferrari",
      "Model": "488 Spider"
     },
     {
      "ID": 1853,
      "Marke": "Ferrari",
      "Model": "California"
     },
     {
      "ID": 1762,
      "Marke": "Ferrari",
      "Model": "F430"
     },
     {
      "ID": 2240,
      "Marke": "Ferrari",
      "Model": "F8 Tributo"
     },
     {
      "ID": 2294,
      "Marke": "Ferrari",
      "Model": "Portofino"
     },
     {
      "ID": 2239,
      "Marke": "Ferrari",
      "Model": "Roma"
     },
     {
      "ID": 1795,
      "Marke": "Fiat",
      "Model": 500
     },
     {
      "ID": 2205,
      "Marke": "Fiat",
      "Model": "500 E"
     },
     {
      "ID": 2072,
      "Marke": "Fiat",
      "Model": "500C"
     },
     {
      "ID": 2041,
      "Marke": "Fiat",
      "Model": "500L"
     },
     {
      "ID": 2056,
      "Marke": "Fiat",
      "Model": "500X"
     },
     {
      "ID": 1163,
      "Marke": "Fiat",
      "Model": "Bravo"
     },
     {
      "ID": 1168,
      "Marke": "Fiat",
      "Model": "Doblo"
     },
     {
      "ID": 1170,
      "Marke": "Fiat",
      "Model": "Ducato"
     },
     {
      "ID": 1926,
      "Marke": "Fiat",
      "Model": "Freemont"
     },
     {
      "ID": 1173,
      "Marke": "Fiat",
      "Model": "Grande Punkt"
     },
     {
      "ID": 1179,
      "Marke": "Fiat",
      "Model": "Panda"
     },
     {
      "ID": 1180,
      "Marke": "Fiat",
      "Model": "Punto"
     },
     {
      "ID": 2142,
      "Marke": "Fiat",
      "Model": "Talento"
     },
     {
      "ID": 1189,
      "Marke": "Fiat",
      "Model": "Tipo"
     },
     {
      "ID": 1961,
      "Marke": "Ford",
      "Model": "B-MAX"
     },
     {
      "ID": 1816,
      "Marke": "Ford",
      "Model": "C-MAX"
     },
     {
      "ID": 2028,
      "Marke": "Ford",
      "Model": "EcoSport"
     },
     {
      "ID": 2075,
      "Marke": "Ford",
      "Model": "Edge"
     },
     {
      "ID": 1194,
      "Marke": "Ford",
      "Model": "Escort"
     },
     {
      "ID": 1195,
      "Marke": "Ford",
      "Model": "Fiesta"
     },
     {
      "ID": 1197,
      "Marke": "Ford",
      "Model": "Focus"
     },
     {
      "ID": 1200,
      "Marke": "Ford",
      "Model": "Galaxy"
     },
     {
      "ID": 1201,
      "Marke": "Ford",
      "Model": "Ka"
     },
     {
      "ID": 1829,
      "Marke": "Ford",
      "Model": "Kuga"
     },
     {
      "ID": 1203,
      "Marke": "Ford",
      "Model": "Mondeo"
     },
     {
      "ID": 1216,
      "Marke": "Ford",
      "Model": "Mustang"
     },
     {
      "ID": 2228,
      "Marke": "Ford",
      "Model": "Mustang Mach-E"
     },
     {
      "ID": 1206,
      "Marke": "Ford",
      "Model": "Puma"
     },
     {
      "ID": 1740,
      "Marke": "Ford",
      "Model": "S-MAX"
     },
     {
      "ID": 1210,
      "Marke": "Ford",
      "Model": "Tourneo"
     },
     {
      "ID": 1211,
      "Marke": "Ford",
      "Model": "Transit"
     },
     {
      "ID": 2157,
      "Marke": "Ford",
      "Model": "Transit Custom"
     },
     {
      "ID": 1220,
      "Marke": "Honda",
      "Model": "Accord"
     },
     {
      "ID": 1225,
      "Marke": "Honda",
      "Model": "CR-V"
     },
     {
      "ID": 1222,
      "Marke": "Honda",
      "Model": "Civic"
     },
     {
      "ID": 1228,
      "Marke": "Honda",
      "Model": "HR-V"
     },
     {
      "ID": 1230,
      "Marke": "Honda",
      "Model": "Jazz"
     },
     {
      "ID": 2354,
      "Marke": "Honda",
      "Model": "ZR-V"
     },
     {
      "ID": 2213,
      "Marke": "Hyundai",
      "Model": "Bayon"
     },
     {
      "ID": 1243,
      "Marke": "Hyundai",
      "Model": "Getz"
     },
     {
      "ID": 2080,
      "Marke": "Hyundai",
      "Model": "Ioniq"
     },
     {
      "ID": 2229,
      "Marke": "Hyundai",
      "Model": "Ioniq 5"
     },
     {
      "ID": 2278,
      "Marke": "Hyundai",
      "Model": "Ioniq 6"
     },
     {
      "ID": 2105,
      "Marke": "Hyundai",
      "Model": "Kona"
     },
     {
      "ID": 1249,
      "Marke": "Hyundai",
      "Model": "Santa Fe"
     },
     {
      "ID": 2270,
      "Marke": "Hyundai",
      "Model": "Staria"
     },
     {
      "ID": 1256,
      "Marke": "Hyundai",
      "Model": "Tucson"
     },
     {
      "ID": 1818,
      "Marke": "Hyundai",
      "Model": "i10"
     },
     {
      "ID": 1857,
      "Marke": "Hyundai",
      "Model": "i20"
     },
     {
      "ID": 1796,
      "Marke": "Hyundai",
      "Model": "i30"
     },
     {
      "ID": 1927,
      "Marke": "Hyundai",
      "Model": "i40"
     },
     {
      "ID": 1916,
      "Marke": "Hyundai",
      "Model": "iX20"
     },
     {
      "ID": 1858,
      "Marke": "Hyundai",
      "Model": "iX35"
     },
     {
      "ID": 2116,
      "Marke": "Jaguar",
      "Model": "E-Pace"
     },
     {
      "ID": 2083,
      "Marke": "Jaguar",
      "Model": "F-Pace"
     },
     {
      "ID": 1972,
      "Marke": "Jaguar",
      "Model": "F-Type"
     },
     {
      "ID": 2174,
      "Marke": "Jaguar",
      "Model": "I-Pace"
     },
     {
      "ID": 1264,
      "Marke": "Jaguar",
      "Model": "S-Type"
     },
     {
      "ID": 1266,
      "Marke": "Jaguar",
      "Model": "X-Type"
     },
     {
      "ID": 2059,
      "Marke": "Jaguar",
      "Model": "XE"
     },
     {
      "ID": 1797,
      "Marke": "Jaguar",
      "Model": "XF"
     },
     {
      "ID": 1267,
      "Marke": "Jaguar",
      "Model": "XJ"
     },
     {
      "ID": 2269,
      "Marke": "Jeep",
      "Model": "Avenger"
     },
     {
      "ID": 1273,
      "Marke": "Jeep",
      "Model": "Cherokee"
     },
     {
      "ID": 1766,
      "Marke": "Jeep",
      "Model": "Compass"
     },
     {
      "ID": 1275,
      "Marke": "Jeep",
      "Model": "Grand Cherokee"
     },
     {
      "ID": 2053,
      "Marke": "Jeep",
      "Model": "Renegade"
     },
     {
      "ID": 1276,
      "Marke": "Jeep",
      "Model": "Wrangler"
     },
     {
      "ID": 1767,
      "Marke": "KIA",
      "Model": "Ceed"
     },
     {
      "ID": 2230,
      "Marke": "KIA",
      "Model": "EV6"
     },
     {
      "ID": 2079,
      "Marke": "KIA",
      "Model": "Niro"
     },
     {
      "ID": 1933,
      "Marke": "KIA",
      "Model": "Optima"
     },
     {
      "ID": 1283,
      "Marke": "KIA",
      "Model": "Picanto"
     },
     {
      "ID": 2194,
      "Marke": "KIA",
      "Model": "ProCeed"
     },
     {
      "ID": 1285,
      "Marke": "KIA",
      "Model": "Rio"
     },
     {
      "ID": 1288,
      "Marke": "KIA",
      "Model": "Sorento"
     },
     {
      "ID": 1859,
      "Marke": "KIA",
      "Model": "Soul"
     },
     {
      "ID": 1289,
      "Marke": "KIA",
      "Model": "Sportage"
     },
     {
      "ID": 2102,
      "Marke": "KIA",
      "Model": "Stonic"
     },
     {
      "ID": 2193,
      "Marke": "KIA",
      "Model": "XCeed"
     },
     {
      "ID": 1311,
      "Marke": "Lancia",
      "Model": "Delta"
     },
     {
      "ID": 1319,
      "Marke": "Lancia",
      "Model": "Thema"
     },
     {
      "ID": 1934,
      "Marke": "Lancia",
      "Model": "Voyager"
     },
     {
      "ID": 1748,
      "Marke": "Lancia",
      "Model": "Ypsilon"
     },
     {
      "ID": 1325,
      "Marke": "Land Rover",
      "Model": "Defender"
     },
     {
      "ID": 1326,
      "Marke": "Land Rover",
      "Model": "Discovery"
     },
     {
      "ID": 2055,
      "Marke": "Land Rover",
      "Model": "Discovery Sport"
     },
     {
      "ID": 1328,
      "Marke": "Land Rover",
      "Model": "Freelander"
     },
     {
      "ID": 1330,
      "Marke": "Land Rover",
      "Model": "Range Rover"
     },
     {
      "ID": 1998,
      "Marke": "Land Rover",
      "Model": "Range Rover Evoque"
     },
     {
      "ID": 1864,
      "Marke": "Land Rover",
      "Model": "Range Rover Sport"
     },
     {
      "ID": 2097,
      "Marke": "Land Rover",
      "Model": "Range Rover Velar"
     },
     {
      "ID": 1333,
      "Marke": "Lexus",
      "Model": "IS"
     },
     {
      "ID": 2049,
      "Marke": "Lexus",
      "Model": "NX"
     },
     {
      "ID": 1339,
      "Marke": "Lexus",
      "Model": "RX"
     },
     {
      "ID": 2176,
      "Marke": "Lexus",
      "Model": "UX"
     },
     {
      "ID": 1348,
      "Marke": "Maserati",
      "Model": "Ghibli"
     },
     {
      "ID": 2074,
      "Marke": "Maserati",
      "Model": "Levante"
     },
     {
      "ID": 1349,
      "Marke": "Maserati",
      "Model": "Quattroporte"
     },
     {
      "ID": 2060,
      "Marke": "Mazda",
      "Model": "CX-3"
     },
     {
      "ID": 2186,
      "Marke": "Mazda",
      "Model": "CX-30"
     },
     {
      "ID": 1945,
      "Marke": "Mazda",
      "Model": "CX-5"
     },
     {
      "ID": 2263,
      "Marke": "Mazda",
      "Model": "CX-60"
     },
     {
      "ID": 1802,
      "Marke": "Mazda",
      "Model": "CX-7"
     },
     {
      "ID": 2202,
      "Marke": "Mazda",
      "Model": "MX-30"
     },
     {
      "ID": 1369,
      "Marke": "Mazda",
      "Model": "MX-5"
     },
     {
      "ID": 1363,
      "Marke": "Mazda",
      "Model": "Mazda2"
     },
     {
      "ID": 1364,
      "Marke": "Mazda",
      "Model": "Mazda3"
     },
     {
      "ID": 1365,
      "Marke": "Mazda",
      "Model": "Mazda5"
     },
     {
      "ID": 1366,
      "Marke": "Mazda",
      "Model": "Mazda6"
     },
     {
      "ID": 1382,
      "Marke": "Mercedes-Benz",
      "Model": 190
     },
     {
      "ID": 1384,
      "Marke": "Mercedes-Benz",
      "Model": "A-Klasse"
     },
     {
      "ID": 2118,
      "Marke": "Mercedes-Benz",
      "Model": "AMG GT"
     },
     {
      "ID": 1386,
      "Marke": "Mercedes-Benz",
      "Model": "B-Klasse"
     },
     {
      "ID": 1387,
      "Marke": "Mercedes-Benz",
      "Model": "C-Klasse"
     },
     {
      "ID": 1741,
      "Marke": "Mercedes-Benz",
      "Model": "CL-Klasse"
     },
     {
      "ID": 1973,
      "Marke": "Mercedes-Benz",
      "Model": "CLA-Klasse"
     },
     {
      "ID": 1390,
      "Marke": "Mercedes-Benz",
      "Model": "CLK-Klasse"
     },
     {
      "ID": 1392,
      "Marke": "Mercedes-Benz",
      "Model": "CLS-Klasse"
     },
     {
      "ID": 1393,
      "Marke": "Mercedes-Benz",
      "Model": "E-Klasse"
     },
     {
      "ID": 2236,
      "Marke": "Mercedes-Benz",
      "Model": "EQA"
     },
     {
      "ID": 2265,
      "Marke": "Mercedes-Benz",
      "Model": "EQB"
     },
     {
      "ID": 2201,
      "Marke": "Mercedes-Benz",
      "Model": "EQC"
     },
     {
      "ID": 2259,
      "Marke": "Mercedes-Benz",
      "Model": "EQE"
     },
     {
      "ID": 1396,
      "Marke": "Mercedes-Benz",
      "Model": "G-Klasse"
     },
     {
      "ID": 1742,
      "Marke": "Mercedes-Benz",
      "Model": "GL-Klasse"
     },
     {
      "ID": 2043,
      "Marke": "Mercedes-Benz",
      "Model": "GLA-Klasse"
     },
     {
      "ID": 2206,
      "Marke": "Mercedes-Benz",
      "Model": "GLB"
     },
     {
      "ID": 2073,
      "Marke": "Mercedes-Benz",
      "Model": "GLC-Klasse"
     },
     {
      "ID": 2068,
      "Marke": "Mercedes-Benz",
      "Model": "GLE-Klasse"
     },
     {
      "ID": 1832,
      "Marke": "Mercedes-Benz",
      "Model": "GLK-Klasse"
     },
     {
      "ID": 1398,
      "Marke": "Mercedes-Benz",
      "Model": "M-Klasse"
     },
     {
      "ID": 1771,
      "Marke": "Mercedes-Benz",
      "Model": "S-Klasse"
     },
     {
      "ID": 1408,
      "Marke": "Mercedes-Benz",
      "Model": "SL-Klasse"
     },
     {
      "ID": 1410,
      "Marke": "Mercedes-Benz",
      "Model": "SLK-Klasse"
     },
     {
      "ID": 1412,
      "Marke": "Mercedes-Benz",
      "Model": "Sprinter"
     },
     {
      "ID": 1413,
      "Marke": "Mercedes-Benz",
      "Model": "V-Klasse"
     },
     {
      "ID": 1416,
      "Marke": "Mercedes-Benz",
      "Model": "Vito"
     },
     {
      "ID": 2242,
      "Marke": "MG",
      "Model": "EHS"
     },
     {
      "ID": 2296,
      "Marke": "MG",
      "Model": "MG4"
     },
     {
      "ID": 2256,
      "Marke": "MG",
      "Model": "MG5"
     },
     {
      "ID": 2234,
      "Marke": "MG",
      "Model": "Marvel R"
     },
     {
      "ID": 2247,
      "Marke": "MG",
      "Model": "ZS"
     },
     {
      "ID": 1723,
      "Marke": "MINI",
      "Model": "Cabrio"
     },
     {
      "ID": 1803,
      "Marke": "MINI",
      "Model": "Clubman"
     },
     {
      "ID": 1871,
      "Marke": "MINI",
      "Model": "Countryman"
     },
     {
      "ID": 2009,
      "Marke": "MINI",
      "Model": "Coupé"
     },
     {
      "ID": 1722,
      "Marke": "MINI",
      "Model": "Mini"
     },
     {
      "ID": 1872,
      "Marke": "Mitsubishi",
      "Model": "ASX"
     },
     {
      "ID": 1428,
      "Marke": "Mitsubishi",
      "Model": "Colt"
     },
     {
      "ID": 1429,
      "Marke": "Mitsubishi",
      "Model": "Eclipse"
     },
     {
      "ID": 1434,
      "Marke": "Mitsubishi",
      "Model": "Lancer"
     },
     {
      "ID": 1435,
      "Marke": "Mitsubishi",
      "Model": "Outlander"
     },
     {
      "ID": 1436,
      "Marke": "Mitsubishi",
      "Model": "Pajero"
     },
     {
      "ID": 1442,
      "Marke": "Mitsubishi",
      "Model": "Space Star"
     },
     {
      "ID": 1878,
      "Marke": "Nissan",
      "Model": "Juke"
     },
     {
      "ID": 1943,
      "Marke": "Nissan",
      "Model": "Leaf"
     },
     {
      "ID": 1460,
      "Marke": "Nissan",
      "Model": "Micra"
     },
     {
      "ID": 1774,
      "Marke": "Nissan",
      "Model": "Qashqai"
     },
     {
      "ID": 2255,
      "Marke": "Nissan",
      "Model": "Townstar"
     },
     {
      "ID": 1474,
      "Marke": "Nissan",
      "Model": "X-TRAIL"
     },
     {
      "ID": 1969,
      "Marke": "Opel",
      "Model": "Adam"
     },
     {
      "ID": 1776,
      "Marke": "Opel",
      "Model": "Antara"
     },
     {
      "ID": 1477,
      "Marke": "Opel",
      "Model": "Astra"
     },
     {
      "ID": 1481,
      "Marke": "Opel",
      "Model": "Combo"
     },
     {
      "ID": 1482,
      "Marke": "Opel",
      "Model": "Corsa"
     },
     {
      "ID": 2090,
      "Marke": "Opel",
      "Model": "Crossland"
     },
     {
      "ID": 2282,
      "Marke": "Opel",
      "Model": "Crossland X"
     },
     {
      "ID": 2356,
      "Marke": "Opel",
      "Model": "Grandland"
     },
     {
      "ID": 2104,
      "Marke": "Opel",
      "Model": "Grandland X"
     },
     {
      "ID": 1833,
      "Marke": "Opel",
      "Model": "Insignia"
     },
     {
      "ID": 1487,
      "Marke": "Opel",
      "Model": "Meriva"
     },
     {
      "ID": 1043,
      "Marke": "Opel",
      "Model": "Mokka"
     },
     {
      "ID": 1499,
      "Marke": "Opel",
      "Model": "Vectra"
     },
     {
      "ID": 1502,
      "Marke": "Opel",
      "Model": "Vivaro"
     },
     {
      "ID": 1503,
      "Marke": "Opel",
      "Model": "Zafira"
     },
     {
      "ID": 1977,
      "Marke": "Peugeot",
      "Model": 2008
     },
     {
      "ID": 1508,
      "Marke": "Peugeot",
      "Model": 206
     },
     {
      "ID": 1743,
      "Marke": "Peugeot",
      "Model": 207
     },
     {
      "ID": 1948,
      "Marke": "Peugeot",
      "Model": 208
     },
     {
      "ID": 1881,
      "Marke": "Peugeot",
      "Model": 3008
     },
     {
      "ID": 1510,
      "Marke": "Peugeot",
      "Model": 306
     },
     {
      "ID": 1511,
      "Marke": "Peugeot",
      "Model": 307
     },
     {
      "ID": 1805,
      "Marke": "Peugeot",
      "Model": 308
     },
     {
      "ID": 1514,
      "Marke": "Peugeot",
      "Model": 406
     },
     {
      "ID": 1515,
      "Marke": "Peugeot",
      "Model": 407
     },
     {
      "ID": 2281,
      "Marke": "Peugeot",
      "Model": 408
     },
     {
      "ID": 1882,
      "Marke": "Peugeot",
      "Model": 5008
     },
     {
      "ID": 1919,
      "Marke": "Peugeot",
      "Model": 508
     },
     {
      "ID": 1520,
      "Marke": "Peugeot",
      "Model": 807
     },
     {
      "ID": 2146,
      "Marke": "Peugeot",
      "Model": "Rifter"
     },
     {
      "ID": 2121,
      "Marke": "Porsche",
      "Model": 718
     },
     {
      "ID": 1528,
      "Marke": "Porsche",
      "Model": 911
     },
     {
      "ID": 1533,
      "Marke": "Porsche",
      "Model": 944
     },
     {
      "ID": 2320,
      "Marke": "Porsche",
      "Model": 991
     },
     {
      "ID": 2321,
      "Marke": "Porsche",
      "Model": 992
     },
     {
      "ID": 1535,
      "Marke": "Porsche",
      "Model": "Boxster"
     },
     {
      "ID": 1537,
      "Marke": "Porsche",
      "Model": "Cayenne"
     },
     {
      "ID": 1538,
      "Marke": "Porsche",
      "Model": "Cayman"
     },
     {
      "ID": 2038,
      "Marke": "Porsche",
      "Model": "Macan"
     },
     {
      "ID": 1884,
      "Marke": "Porsche",
      "Model": "Panamera"
     },
     {
      "ID": 2220,
      "Marke": "Porsche",
      "Model": "Taycan"
     },
     {
      "ID": 2231,
      "Marke": "Renault",
      "Model": "Arkana"
     },
     {
      "ID": 2286,
      "Marke": "Renault",
      "Model": "Austral"
     },
     {
      "ID": 1978,
      "Marke": "Renault",
      "Model": "Captur"
     },
     {
      "ID": 1542,
      "Marke": "Renault",
      "Model": "Clio"
     },
     {
      "ID": 1543,
      "Marke": "Renault",
      "Model": "Espace"
     },
     {
      "ID": 1940,
      "Marke": "Renault",
      "Model": "Grand Scénic"
     },
     {
      "ID": 2062,
      "Marke": "Renault",
      "Model": "Kadjar"
     },
     {
      "ID": 1545,
      "Marke": "Renault",
      "Model": "Kangoo"
     },
     {
      "ID": 1834,
      "Marke": "Renault",
      "Model": "Koleos"
     },
     {
      "ID": 1546,
      "Marke": "Renault",
      "Model": "Laguna"
     },
     {
      "ID": 1548,
      "Marke": "Renault",
      "Model": "Mégane"
     },
     {
      "ID": 1558,
      "Marke": "Renault",
      "Model": "Scénic"
     },
     {
      "ID": 2070,
      "Marke": "Renault",
      "Model": "Talisman"
     },
     {
      "ID": 1561,
      "Marke": "Renault",
      "Model": "Trafic"
     },
     {
      "ID": 1562,
      "Marke": "Renault",
      "Model": "Twingo"
     },
     {
      "ID": 1960,
      "Marke": "Renault",
      "Model": "Zoe"
     },
     {
      "ID": 1583,
      "Marke": "Seat",
      "Model": "Alhambra"
     },
     {
      "ID": 2103,
      "Marke": "Seat",
      "Model": "Arona"
     },
     {
      "ID": 2069,
      "Marke": "Seat",
      "Model": "Ateca"
     },
     {
      "ID": 1588,
      "Marke": "Seat",
      "Model": "Ibiza"
     },
     {
      "ID": 1590,
      "Marke": "Seat",
      "Model": "Leon"
     },
     {
      "ID": 2172,
      "Marke": "Seat",
      "Model": "Tarraco"
     },
     {
      "ID": 2217,
      "Marke": "Skoda",
      "Model": "Enyaq"
     },
     {
      "ID": 1596,
      "Marke": "Skoda",
      "Model": "Fabia"
     },
     {
      "ID": 2192,
      "Marke": "Skoda",
      "Model": "Kamiq"
     },
     {
      "ID": 2100,
      "Marke": "Skoda",
      "Model": "Karoq"
     },
     {
      "ID": 2092,
      "Marke": "Skoda",
      "Model": "Kodiaq"
     },
     {
      "ID": 1600,
      "Marke": "Skoda",
      "Model": "Octavia"
     },
     {
      "ID": 1601,
      "Marke": "Skoda",
      "Model": "Rapid"
     },
     {
      "ID": 2183,
      "Marke": "Skoda",
      "Model": "Scala"
     },
     {
      "ID": 1605,
      "Marke": "Skoda",
      "Model": "Superb"
     },
     {
      "ID": 1380,
      "Marke": "Smart",
      "Model": "forfour"
     },
     {
      "ID": 1378,
      "Marke": "Smart",
      "Model": "fortwo"
     },
     {
      "ID": 1381,
      "Marke": "Smart",
      "Model": "roadster"
     },
     {
      "ID": 1612,
      "Marke": "Subaru",
      "Model": "Forester"
     },
     {
      "ID": 1613,
      "Marke": "Subaru",
      "Model": "Impreza"
     },
     {
      "ID": 1619,
      "Marke": "Subaru",
      "Model": "Outback"
     },
     {
      "ID": 1944,
      "Marke": "Subaru",
      "Model": "XV"
     },
     {
      "ID": 2207,
      "Marke": "Suzuki",
      "Model": "Across"
     },
     {
      "ID": 1627,
      "Marke": "Suzuki",
      "Model": "Ignis"
     },
     {
      "ID": 1628,
      "Marke": "Suzuki",
      "Model": "Jimny"
     },
     {
      "ID": 2237,
      "Marke": "Suzuki",
      "Model": "S-Cross"
     },
     {
      "ID": 1744,
      "Marke": "Suzuki",
      "Model": "SX4"
     },
     {
      "ID": 2208,
      "Marke": "Suzuki",
      "Model": "Swace"
     },
     {
      "ID": 1632,
      "Marke": "Suzuki",
      "Model": "Swift"
     },
     {
      "ID": 1633,
      "Marke": "Suzuki",
      "Model": "Vitara"
     },
     {
      "ID": 1785,
      "Marke": "Toyota",
      "Model": "Auris"
     },
     {
      "ID": 1637,
      "Marke": "Toyota",
      "Model": "Avensis"
     },
     {
      "ID": 1639,
      "Marke": "Toyota",
      "Model": "Aygo"
     },
     {
      "ID": 2081,
      "Marke": "Toyota",
      "Model": "C-HR"
     },
     {
      "ID": 1640,
      "Marke": "Toyota",
      "Model": "Camry"
     },
     {
      "ID": 1643,
      "Marke": "Toyota",
      "Model": "Corolla"
     },
     {
      "ID": 1646,
      "Marke": "Toyota",
      "Model": "Land Cruiser"
     },
     {
      "ID": 1653,
      "Marke": "Toyota",
      "Model": "Prius"
     },
     {
      "ID": 2098,
      "Marke": "Toyota",
      "Model": "Proace"
     },
     {
      "ID": 1654,
      "Marke": "Toyota",
      "Model": "RAV4"
     },
     {
      "ID": 1894,
      "Marke": "Toyota",
      "Model": "Verso"
     },
     {
      "ID": 1657,
      "Marke": "Toyota",
      "Model": "Yaris"
     },
     {
      "ID": 2235,
      "Marke": "Toyota",
      "Model": "Yaris Cross"
     },
     {
      "ID": 2251,
      "Marke": "Volvo",
      "Model": "C40"
     },
     {
      "ID": 1673,
      "Marke": "Volvo",
      "Model": "S60"
     },
     {
      "ID": 1675,
      "Marke": "Volvo",
      "Model": "S80"
     },
     {
      "ID": 1676,
      "Marke": "Volvo",
      "Model": "S90"
     },
     {
      "ID": 1677,
      "Marke": "Volvo",
      "Model": "V40"
     },
     {
      "ID": 1678,
      "Marke": "Volvo",
      "Model": "V50"
     },
     {
      "ID": 1924,
      "Marke": "Volvo",
      "Model": "V60"
     },
     {
      "ID": 1679,
      "Marke": "Volvo",
      "Model": "V70"
     },
     {
      "ID": 1680,
      "Marke": "Volvo",
      "Model": "V90"
     },
     {
      "ID": 2126,
      "Marke": "Volvo",
      "Model": "XC40"
     },
     {
      "ID": 1835,
      "Marke": "Volvo",
      "Model": "XC60"
     },
     {
      "ID": 1682,
      "Marke": "Volvo",
      "Model": "XC90"
     },
     {
      "ID": 2089,
      "Marke": "Volkswagen",
      "Model": "Arteon"
     },
     {
      "ID": 1683,
      "Marke": "Volkswagen",
      "Model": "Beetle"
     },
     {
      "ID": 1686,
      "Marke": "Volkswagen",
      "Model": "Caddy"
     },
     {
      "ID": 1687,
      "Marke": "Volkswagen",
      "Model": "Caravelle"
     },
     {
      "ID": 1746,
      "Marke": "Volkswagen",
      "Model": "Eos"
     },
     {
      "ID": 1691,
      "Marke": "Volkswagen",
      "Model": "Golf"
     },
     {
      "ID": 2330,
      "Marke": "Volkswagen",
      "Model": "ID.Buzz"
     },
     {
      "ID": 2203,
      "Marke": "Volkswagen",
      "Model": "ID.3"
     },
     {
      "ID": 2214,
      "Marke": "Volkswagen",
      "Model": "ID.4"
     },
     {
      "ID": 2261,
      "Marke": "Volkswagen",
      "Model": "ID.5"
     },
     {
      "ID": 1787,
      "Marke": "Volkswagen",
      "Model": "Käfer"
     },
     {
      "ID": 1702,
      "Marke": "Volkswagen",
      "Model": "Multivan"
     },
     {
      "ID": 1703,
      "Marke": "Volkswagen",
      "Model": "Passat"
     },
     {
      "ID": 1705,
      "Marke": "Volkswagen",
      "Model": "Polo"
     },
     {
      "ID": 1836,
      "Marke": "Volkswagen",
      "Model": "Scirocco"
     },
     {
      "ID": 1706,
      "Marke": "Volkswagen",
      "Model": "Sharan"
     },
     {
      "ID": 2175,
      "Marke": "Volkswagen",
      "Model": "T-Cross"
     },
     {
      "ID": 2108,
      "Marke": "Volkswagen",
      "Model": "T-Roc"
     },
     {
      "ID": 2198,
      "Marke": "Volkswagen",
      "Model": "T3"
     },
     {
      "ID": 2158,
      "Marke": "Volkswagen",
      "Model": "T4"
     },
     {
      "ID": 1929,
      "Marke": "Volkswagen",
      "Model": "T5"
     },
     {
      "ID": 2064,
      "Marke": "Volkswagen",
      "Model": "T6"
     },
     {
      "ID": 2252,
      "Marke": "Volkswagen",
      "Model": "Taigo"
     },
     {
      "ID": 1812,
      "Marke": "Volkswagen",
      "Model": "Tiguan"
     },
     {
      "ID": 1708,
      "Marke": "Volkswagen",
      "Model": "Touareg"
     },
     {
      "ID": 1709,
      "Marke": "Volkswagen",
      "Model": "Touran"
     },
     {
      "ID": 1938,
      "Marke": "Volkswagen",
      "Model": "up!"
     },
     {
      "ID": 1839,
      "Marke": "Abarth",
      "Model": 500
     },
     {
      "ID": 2136,
      "Marke": "Tesla",
      "Model": "Model 3"
     },
     {
      "ID": 1979,
      "Marke": "Tesla",
      "Model": "Model S"
     },
     {
      "ID": 2045,
      "Marke": "Tesla",
      "Model": "Model X"
     },
     {
      "ID": 2257,
      "Marke": "Tesla",
      "Model": "Model Y"
     },
     {
      "ID": 2088,
      "Marke": "Aixam",
      "Model": "City"
     },
     {
      "ID": 2148,
      "Marke": "Aixam",
      "Model": "Crossline"
     },
     {
      "ID": 2210,
      "Marke": "Aixam",
      "Model": "Crossover"
     },
     {
      "ID": 2188,
      "Marke": "Cupra",
      "Model": "Ateca"
     },
     {
      "ID": 2225,
      "Marke": "Cupra",
      "Model": "Born"
     },
     {
      "ID": 2224,
      "Marke": "Cupra",
      "Model": "Formentor"
     },
     {
      "ID": 2189,
      "Marke": "Cupra",
      "Model": "Leon"
     },
     {
      "ID": 2303,
      "Marke": "Polestar",
      "Model": 1
     },
     {
      "ID": 2302,
      "Marke": "Polestar",
      "Model": 2
     },
     {
      "ID": 2285,
      "Marke": "BYD",
      "Model": "Atto"
     },
     {
      "ID": 2350,
      "Marke": "BYD",
      "Model": "Dolphin"
     },
     {
      "ID": 2351,
      "Marke": "BYD",
      "Model": "Han"
     },
     {
      "ID": 2283,
      "Marke": "BYD",
      "Model": "Tang"
     }
    ]
    }
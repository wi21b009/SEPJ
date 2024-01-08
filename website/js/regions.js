$(document).ready(function () {
  addRegions();
});

const addRegions = () => {
  const container = $("#regionsContainer");

  regions.forEach((region) => {

    const div = $('<div>')
        .addClass('form-check')
        .attr({
            name: region.name
        });

    const input = $('<input>')
        .addClass('form-check-input region-checkbox')
        .attr({
            type: 'checkbox',
            value: region.name,
            name: region.name,
            id: region.name,
        })
        .change(function() {
            if ($(this).is(':checked')) {
                region.bezirke.forEach(bezirk => {
                    const subDiv = $('<div>').addClass('form-check');
                    const subInput = $('<input>')
                        .addClass('form-check-input region-checkbox')
                        .attr({
                            type: 'checkbox',
                            value: bezirk,
                            name: bezirk,
                            id: bezirk,
                        })
                    const subLabelElement = $('<label>')
                        .addClass('form-check-label')
                        .attr('for', bezirk)
                        .text(bezirk);
                
                    subDiv.append(subInput, subLabelElement);
                    $(`div[name="${region.name}SubContainer"]`).append(subDiv);
                })
            } 
            else {
                $(`div[name="${region.name}SubContainer"]`).empty();
            }
        });
    const labelElement = $('<label>')
        .addClass('form-check-label')
        .attr('for', region.name)
        .text(region.name);
    
    const subContainer = $('<div>')
        .attr({
            name: `${region.name}SubContainer`,
            id: `${region.name}SubContainer`,
        })
    div.append(input, labelElement, subContainer);
    container.append(div);
  });
}


const regions = [
  {
      name: 'Burgenland',
      bezirke: ['Eisenstadt', 'Güssing', 'Jennersdorf', 'Mattersburg', 'Neusiedl am See', 'Oberpullendorf', 'Oberwart']
  },
  {
      name: 'Kärnten',
      bezirke: ['Feldkirchen', 'Hermagor', 'Klagenfurt-Land', 'Klagenfurt-Stadt', 'Sankt Veit an der Glan', 'Spittal an der Drau', 'Villach-Land', 'Villach-Stadt', 'Völkermarkt', 'Wolfsberg']
  },
  {
      name: 'Niederösterreich',
      bezirke: ['Amstetten', 'Baden', 'Bruck an der Leitha', 'Gänserndorf', 'Gmünd', 'Hollabrunn', 'Horn', 'Korneuburg', 'Krems an der Donau', 'Lilienfeld', 'Melk', 'Mistelbach', 'Mödling', 'Neunkirchen', 'Sankt Pölten-Land', 'Sankt Pölten-Stadt', 'Scheibbs', 'Tulln', 'Waidhofen an der Thaya', 'Waidhofen an der Ybbs', 'Wiener Neustadt-Land', 'Wiener Neustadt-Stadt', 'Zwettl']
  },
  {
      name: 'Oberösterreich',
      bezirke: ['Braunau am Inn', 'Eferding', 'Freistadt', 'Gmunden', 'Grieskirchen', 'Kirchdorf an der Krems', 'Linz-Land', 'Linz-Stadt', 'Perg', 'Ried im Innkreis', 'Rohrbach', 'Schärding', 'Steyr-Land', 'Steyr-Stadt', 'Urfahr-Umgebung', 'Vöcklabruck', 'Wels-Land', 'Wels-Stadt']
  },
  {
      name: 'Salzburg',
      bezirke: ['Hallein', 'Salzburg-Umgebung', 'Salzburg-Stadt', 'Sankt Johann im Pongau', 'Tamsweg', 'Zell am See']
  },
  {
      name: 'Steiermark',
      bezirke: ['Bruck-Mürzzuschlag', 'Deutschlandsberg', 'Graz', 'Graz-Umgebung', 'Hartberg-Fürstenfeld', 'Leibnitz', 'Leoben', 'Liezen', 'Murtal', 'Murau', 'Südoststeiermark', 'Voitsberg', 'Weiz']
  },
  {
      name: 'Tirol',
      bezirke: ['Imst', 'Innsbruck-Land', 'Innsbruck-Stadt', 'Kitzbühel', 'Kufstein', 'Landeck', 'Lienz', 'Reutte', 'Schwaz']
  },
  {
      name: 'Vorarlberg',
      bezirke: ['Bludenz', 'Bregenz', 'Dornbirn', 'Feldkirch']
  },
  {
    name: 'Wien',
    bezirke: ['1. Innere Stadt', '2. Leopoldstadt', '3. Landstraße', '4. Wieden', '5. Margareten', '6. Mariahilf', '7. Neubau', '8. Josefstadt', '9. Alsergrund', '10. Favoriten', '11. Simmering', '12. Meidling', '13. Hietzing', '14. Penzing', '15. Rudolfsheim-Fünfhaus', '16. Ottakring', '17. Hernals', '18. Währing', '19. Döbling', '20. Brigittenau', '21. Floridsdorf', '22. Donaustadt', '23. Liesing']
  },
  {
    name: 'Andere Länder',
    bezirke: ['Deutschland', 'Tschechien', 'Slowakei', 'Ungarn', 'Slowenien', 'Italien', 'Schweiz', 'Liechtenstein']
    }
];
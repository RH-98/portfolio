function onClick(e) {
  e.preventDefault();
  // get form values
  let search = document.getElementById('search').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  // setup URL
  let url = "http://www.dnd5eapi.co/api/" + type + "/?name=" + search;
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the D&D 5e API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      let results = "<div id='resultList'>";
      results += "<ul>"
        for (let i=0; i < json.results.length; i++) {
          result_url = "http://www.dnd5eapi.co" + json.results[i].url
          results += "<li><button onclick='resultClick(\"" + result_url +  "\")'>" + json.results[i].name + "</button></li>"
        } 
      results += "</ul></div>";
      updateResult(results, "search");
    });
}

function resultClick(url) {
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the D&D 5e API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      console.log(json)
      let result = "<div id=sheet>";
      if (json.url.search("/api/monsters") != -1){
        //monster
        result += "<img src=images/monster.svg>"
        result += "<h1>" + json.name + "</h1>";
        result += "<h2>Type: " + json.size + " " + json.type + "</h2>"
        result += "<ul>"
        result += "<li>Challenge Rating: " + json.challenge_rating +"</li>"
        result += "<li>Armor Class: " + json.armor_class +"</li>"
        result += "<li>Hit Points: " + json.hit_points + " (" + json.hit_dice +")</li>"
        result += "<li>Strength: " + json.strength +"</li>"
        result += "<li>Dexterity: " + json.dexterity +"</li>"
        result += "<li>Constitution: " + json.constitution +"</li>"
        result += "<li>Intelligence: " + json.intelligence +"</li>"
        result += "<li>Wisdom: " + json.wisdom +"</li>"
        result += "<li>Charisma: " + json.charisma +"</li>"
        result += "</ul>"
        result += "<h2>Actions:</h2><ul class='actions'>"
        for (let i=0; i < json.actions.length; i++) {
          result += "<li><h2>" + json.actions[i].name + "</h2>"
          result += "<p>" + json.actions[i].desc + "</p></li>"
        }
        result += "</ul>"
      }
      else if (json.url.search("api/spells") != -1){
        //spell
        result += "<img src=images/spellbook.svg>"
        result += "<h1>" + json.name + "</h1>";
        result += "<ul>"
        result += "<li>Level: " + json.level +"</li>"
        result += "<li>Casting Time: " + json.casting_time +"</li>"
        result += "<li>Duration: " + json.duration +"</li>"
        result += "<li>Range: " + json.range +"</li>"
        result += "</ul>"
        result += "<h2>Description:</h2>"
        result += "<p>" + json.desc + "</p>"
        if (json.higher_level != undefined) {
          result += "<h3>At Higher Levels:</h3>"
          result += "<p>" + json.higher_level + "</p>"
        }
      }
      else {
        //equipment
        result += "<img src=images/swords.svg>"
        result += "<h1>" + json.name + "</h1><br>";
        if (json.equipment_category.name == "Weapon") {
          result += "<h2>Type: " + json.category_range + " " + json.equipment_category.name + "</h2>"
          result += "<h3>Damage: " + json.damage.damage_dice + " " + json.damage.damage_type.name + "</h3>"
          result += "<h3>Range: " +  json.range.normal + "ft"
          if (json.range.long != null){
            result += " (Long: " + json.range.long + "ft)"
          }
          result += "</h3>"

        }
        else {
          result += "<h2>Type: " + json.equipment_category.name + "</h2>"
        }
        result += "<h3>Cost: " + json.cost.quantity + json.cost.unit + "</h3>"
        if (json.weight != undefined) {
          result += "<h3>Weight: " + json.weight + "lb</h3>"
        }
      }
      result += "</div>"
      updateResult(result, "sheet")
    });
}

function updateResult(info, type) {
  if (type == "search") {
    document.getElementById('result').innerHTML = info;
  }
  else {
    document.getElementById('infoSheet').innerHTML = info;
  }
}

document.getElementById('woo').addEventListener('click', onClick);

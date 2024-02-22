const fs = require('fs');

fs.readFile('recipesEn.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }
  try {
    const cocktails = JSON.parse(data);
    cocktails.forEach(cocktail => {
      cocktail.drink = {
        en: cocktail.drink,
      };
      cocktail.ingredients.forEach(item => {
        item.title = {
          en: item.title,
        };
        item.measure = {
          en: item.measure,
        };
      })
      cocktail.drinkAlternate = {
        en: cocktail.drinkAlternate,
      };
      cocktail.category = {
        en: cocktail.category,
      };
      cocktail.alcoholic = {
        en: cocktail.alcoholic,
      };
      cocktail.glass = {
        en: cocktail.glass,
      };
      cocktail.description = {
        en: cocktail.description,
      };
      cocktail.instructions = {
        en: cocktail.instructionsUK,
      };
      cocktail.shortDescription = {
        en: cocktail.shortDescription,
      };
      delete cocktail.instructionsES;
      delete cocktail.instructionsDE;
      delete cocktail.instructionsFR;
      delete cocktail.instructionsIT;
      delete cocktail.instructionsRU;
      delete cocktail.instructionsPL;
      delete cocktail.instructionsUK;
    });
    fs.writeFile('recipesUa.json', JSON.stringify(cocktails, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return;
      }
      console.log('JSON file updated successfully');
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});



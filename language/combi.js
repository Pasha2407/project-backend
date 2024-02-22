const fs = require('fs');

const englishData = JSON.parse(fs.readFileSync('recipesEn.json', 'utf8'));
const ukrainianData = JSON.parse(fs.readFileSync('recipesUa.json', 'utf8'));

const combinedData = englishData.map((englishItem, index) => {
    const ukrainianItem = ukrainianData[index];
    return {
        _id: englishItem._id,
        drink: {
            en: englishItem.drink.en,
            ua: ukrainianItem.drink.ua
        },
        drinkAlternate: {
            en: englishItem.drinkAlternate.en,
            ua: ukrainianItem.drinkAlternate.ua
        },
        tags: englishItem.tags,
        video: englishItem.video,
        category: {
            en: englishItem.category.en,
            ua: ukrainianItem.category.ua
        },
        IBA: englishItem.IBA,
        alcoholic: {
            en: englishItem.alcoholic.en,
            ua: ukrainianItem.alcoholic.ua
        },
        glass: {
            en: englishItem.glass.en,
            ua: ukrainianItem.glass.ua
        },
        description: {
            en: englishItem.description.en,
            ua: ukrainianItem.description.ua
        },
        instructions: {
            en: englishItem.instructions.en,
            ua: ukrainianItem.instructions.ua
        },
        drinkThumb: englishItem.drinkThumb,
        ingredients: englishItem.ingredients.map((ingredient, index) => ({
            title: {
                en: ingredient.title.en,
                ua: ukrainianItem.ingredients[index].title.ua
            },
            measure: {
                en: ingredient.measure.en,
                ua: ukrainianItem.ingredients[index].measure.ua
            },
            ingredientId: ingredient.ingredientId
        })),
        shortDescription: {
            en: englishItem.shortDescription.en,
            ua: ukrainianItem.shortDescription.ua
        }
    };
});

fs.writeFile('combiNew.json', JSON.stringify(combinedData, null, 2), 'utf8', (err) => {
    if (err) {
        console.error('Error writing combined JSON file:', err);
        return;
    }
    console.log('Combined JSON file created successfully');
});
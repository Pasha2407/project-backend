// import('node-fetch')
//   .then(({ default: fetch }) => {
//     const fs = require('fs');

//     // Функція для перекладу тексту за допомогою LibreTranslate
//     async function translateText(text, sourceLang, targetLang) {
//       const response = await fetch('https://ru.libretranslate.com/translate', {
//         method: 'POST',
//         body: JSON.stringify({
//           q: text,
//           source: sourceLang,
//           target: targetLang,
//           format: 'text'
//         }),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await response.json();
//       console.log('Перекладений текст:', data.translatedText);
//       return data.translatedText;
//     }

//     // Функція для глибокого клонування об'єктів
//     function deepClone(obj) {
//       return JSON.parse(JSON.stringify(obj));
//     }

//     // Функція для перекладу описів з поля "ua" в об'єкті "description"
//     async function translateDescriptions(jsonArray, sourceLang, targetLang) {
//       const translatedArray = [];
//       for (let i = 0; i < jsonArray.length; i++) {
//         const obj = jsonArray[i];
//         const translatedObj = deepClone(obj);
//         if (obj.description && obj.description.ua) {
//           const translatedDescription = await translateText(obj.description.ua, sourceLang, targetLang);
//           translatedObj.description.ru = translatedDescription;
//           console.log('Перекладено опис для:', obj.drink.ua);
//         } else {
//           console.log('Немає опису для:', obj.drink.ua);
//         }
//         translatedArray.push(translatedObj);
//       }
//       return translatedArray;
//     }

//     // Використання функції
//     const filePath = './recipes.json'; // Замініть на правильний шлях до файлу
//     const sourceLang = 'en'; // Вихідна мова
//     const targetLang = 'uk'; // Мова перекладу

//     fs.readFile(filePath, 'utf8', async (err, data) => {
//       if (err) {
//         console.error('Помилка при читанні файлу:', err);
//         return;
//       }

//       try {
//         const jsonArray = JSON.parse(data);
//         const translatedJsonArray = await translateDescriptions(jsonArray, sourceLang, targetLang);
//         console.log('Перекладено');

//         // Запис результату перекладу у новий файл
//         fs.writeFile('translatedUa.json', JSON.stringify(translatedJsonArray, null, 2), 'utf8', (err) => {
//           if (err) {
//             console.error('Помилка при записі у файл:', err);
//             return;
//           }
//           console.log('Результат перекладу збережено у файлі "translatedUa.json"');
//         });

//       } catch (error) {
//         console.error('Помилка при обробці JSON:', error);
//       }
//     });
//   })
//   .catch(err => console.error('Помилка під час імпорту node-fetch:', err));

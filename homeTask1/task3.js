import fs from "fs";
import csvtojson from "csvtojson";

const filePath = "homeTask1/csv/test.csv";

function normalizeBookData(book) {
  return JSON.stringify({
    book: book.Book,
    author: book.Author,
    price: Number(book.Price),
  });
}

function writeFileFromJSON(jsonObj) {
  const data = jsonObj.map(normalizeBookData).join("\n");
  return fs.promises
    .writeFile("homeTask1/csv/result.txt", data)
    .then(() => {
      console.log("File is saved!");
    })
    .catch(handleError);
}

function handleError(error) {
  console.error(error);
}

fs.promises
  .readFile(filePath)
  .then((data) => {
    return csvtojson()
      .fromString(data.toString())
      .then(writeFileFromJSON)
      .catch(handleError);
  })
  .catch(handleError);

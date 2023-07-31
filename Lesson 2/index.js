const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "newPromiseWrite.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "newPromiseWrite.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\nYes it is",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete");
//       }
//     );

//     fs.rename(
//       path.join(__dirname, "files", "reply.txt"),
//       path.join(__dirname, "files", "test.txt"),
//       (err) => {
//         if (err) throw err;
//         console.log("Rename complete");
//       }
//     );
//   }
// );

// console.log("Hello");
// console.log(path.join(__dirname, "files", "starter.txt"));

const { spawn } = require("child_process");
const gm = require("gm").subClass({ imageMagick: true });
const fs = require("fs");
require("dotenv").config();

module.exports = class ocr_instance {
  constructor() {
    this.instance;
  }
  start() {
    this.instance = spawn("manga_ocr", [
      `${process.env.OCR_READ_DIR}`,
      `${process.env.OCR_WRITE_DIR}`,
      "--force_cpu",
    ]);
    this.instance.stderr.on("data", async (data) => {
      let errString = data.toString();
      if (errString.includes("__init__:29 - OCR ready")) {
        this.instance.emit(
          "message",
          `OCR READY\n writting to ${process.env.OCR_WRITE_DIR}`
        );
      } else {
        console.log(`stderr: ${data}\n`), errString;
        if (errString.includes("Text recognized")) {
          this.instance.emit("translated", errString);
        }
      }
    });
    this.instance.on(`error`, (error) => {
      console.log(`Error: ${error}`);
    });
    this.instance.on(`close`, (code) => {
      console.log(`MangaOCR Child process exited with code: ${code}`);
    });

    this.instance.stdin.on("data", () => {
      console.log("STDIN DATA");
    });
  }
  kill() {
    this.instance.kill();
  }
  translate(data) {
    console.log(`translating... \n`, data);
    gm(data.url)
      .resize(data.res)
      .crop(data.width, data.height, data.x, data.y)
      .stream((err, stdout, stderr) => {
        var ws = fs.createWriteStream(`${process.env.OCR_READ_DIR}/in.jpg`);
        // this.instance.stdin.pipe(process.env.OCR_WRITE_DIR);
        stdout.pipe(ws);
      });
  }
};

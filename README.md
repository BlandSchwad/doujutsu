
# Doujutsu
Doujtusu is a GUI Manga reader that uses [kha-white's manga_ocr](https://github.com/kha-white/manga-ocr) to translate cropped Japanese images into text. 






<img alt="demoPic 1" src="https://i.imgur.com/pR2vaPl.png">

## How it works:


  - The server reads storage locations of CBZ and CBR files into a Postgres database. 
  - In the reader, kanji on any page can be cropped, and a request is sent to the server.
  - An Optical Character Recognition microservice interprets the crop, and sends back a text response
  - Combined with browser add-ons like [Yomichan](https://github.com/FooSoft/yomichan) or [Rikaikun](https://github.com/melink14/rikaikun), the text can be instantly translated
<img alt="demoPic2" src="https://i.imgur.com/us1czdW.png">



**Client:** React, Bootstrap, Formik

**Server:** Node, Express, Postgres

**OCR Microservice:** Python, FastAPI

## Work in progress
- Authentication
- Saving crops/translation to user accounts for later review


    
## Acknowledgements

 - [kha-white](https://github.com/kha-white/)
 

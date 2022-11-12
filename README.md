
# Doujutsu
Doujtusu is a GUI Manga reader that uses [kha-white's manga_ocr](https://github.com/kha-white/manga-ocr) to translate cropped Japanese images into text. 






<img alt="demoPic 1" src="https://i.imgur.com/pR2vaPl.png">

## How it works:


  - The server reads storage locations of CBZ and CBR files into a Postgres database. 
  - In the reader,  kanji on any page can be cropped, and a request is sent to the server.
  - The server generates a crop of the image, runs it through an Optical Character Recognition program, and sends back a text response. 
  - Combined with apps like [Yomichan](https://github.com/FooSoft/yomichan) or [Rikaikun](https://github.com/melink14/rikaikun), get an instant translatation
<img alt="demoPic2" src="https://i.imgur.com/us1czdW.png">



**Client:** React, Bootstrap

**Server:** Node, Express, Postgres, Python


## Work in progress
See the dev branch(es)

- Deployment/Live Demo
- Testing
- Centralized State
- Better dictionary integration


    
## Acknowledgements

 - [kha-white](https://github.com/kha-white/)
 

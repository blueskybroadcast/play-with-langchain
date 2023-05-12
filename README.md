# Play with LangChain Framework

## Endpoints

### /seed

```
POST /seed HTTP/1.1
Content-Type: text/plain; charset=utf-8
Host: localhost:3000

{
  "0": {
    "description": "<article><p>Welcome to \"Journey to Enchanting Sintra: Exploring the Fairytale Charm and Majestic Beauty.\" In this captivating presentation, we invite you to embark on a virtual tour of Sintra, a truly magical destination that captures the imagination and leaves visitors spellbound.<br>Prepare to be transported to a world of enchantment as we delve into the fairytale charm that permeates every corner of Sintra. From the moment you set foot in this picturesque town nestled among lush green hills, you will be captivated by its architectural wonders, romantic gardens, and mystical atmosphere.<br>We will unravel the secrets of Sintra's iconic palaces, such as the breathtaking Pena Palace with its vibrant colors and whimsical architecture. Discover the intricacies of Quinta da Regaleira, an estate adorned with hidden tunnels, mystical symbols, and lush gardens, offering an immersive experience like no other.<br>As we explore the historic center of Sintra, a UNESCO World Heritage site, you will uncover the fascinating blend of Gothic, Moorish, and Manueline architectural styles that adorn the streets and create an ambiance of timeless beauty. From the stunning National Palace of Sintra to the charming streets of Vila Sassetti, we will showcase the town's rich history and architectural grandeur.<br>Prepare to be amazed by the natural wonders that surround Sintra. We will guide you through the breathtaking landscapes of the Sintra-Cascais Natural Park, with its lush forests, rugged cliffs, and sweeping coastal vistas. Discover hidden gems such as the mystical Quinta da Regaleira well, or explore the pristine beaches that dot the coastline.<br>Through stunning visuals, immersive storytelling, and fascinating anecdotes, we will bring the fairytale charm and majestic beauty of Sintra to life. Gain insider knowledge on the best times to visit, must-see attractions, and lesser-known gems that will make your journey to Sintra truly unforgettable.<br>Whether you are a history enthusiast, nature lover, or simply seeking an escape into a world of wonder, Sintra offers an experience like no other. Join us on this virtual exploration as we unlock the secrets and unveil the enchanting allure of Sintra, a place where dreams come to life and where reality merges with fantasy.</p></article>",
    "title": "Journey to Enchanting Sintra: Exploring the Fairytale Charm and Majestic Beauty",
    "url": "http://localhost:3800/joy/courses/34623/video_presentations/207621",
    "captions": null
  },
  "1": {
    "description": "Welcome to general information about Portugal, where we will provide you with a comprehensive overview of this captivating country. In this course, we will delve into various aspects, including climate, population, geography, and language, giving you a well-rounded understanding of Portugal's unique characteristics.<br>We will start by exploring Portugal's diverse climate, examining how different regions experience varying weather patterns throughout the year. From the mild Mediterranean climate in the south to the cooler Atlantic climate in the north, we will uncover the nuances of Portugal's weather and how it influences daily life, agriculture, and tourism.<br>Next, we will delve into the population dynamics of Portugal, examining its size, demographic composition, and notable trends. Discover the vibrant mix of ethnicities, cultures, and traditions that contribute to the country's social fabric. We will explore the urban centers, such as Lisbon and Porto, as well as the rural areas, gaining insights into the lifestyles, customs, and values of the Portuguese people.<br>As we venture into Portugal's geography, prepare to be enchanted by its diverse landscapes. From the stunning coastline stretching along the Atlantic Ocean to the majestic mountain ranges, rolling plains, and verdant valleys, Portugal offers a breathtaking tapestry of natural beauty. We will also highlight significant geographical features, including the Douro River, the Azores archipelago, and the Algarve's picturesque beaches.<br>Language plays a crucial role in understanding a country's culture, and Portugal is no exception. We will explore the Portuguese language, its origins, and its characteristics. Gain insights into the linguistic nuances, common phrases, and cultural significance of the Portuguese language. Additionally, we will discuss the prevalence of English and other languages in the country, providing practical tips for communication during your visit.<br>By the end of this course, you will have a solid foundation of general information about Portugal, enabling you to appreciate its climate diversity, understand its population dynamics, admire its geographical wonders, and navigate its language landscape. Whether you are planning a trip to Portugal, interested in its cultural heritage, or simply seeking knowledge about this captivating nation, this course will provide you with valuable insights and a deeper appreciation for the richness of Portugal's identity.",
    "title": "General information about Portugal",
    "url": "http://localhost:3800/joy/courses/34623/links/24281",
    "captions": ""
  }
}
```

### /ask

```
POST /ask HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: localhost:3000

{"questions":["Tell me about the capital","What islands are the part of Portugal?","Tell me about the ocean","Is Portuguese language is official language for Macao Special Administrative Region of China?"]}
```

### /test

```
POST /test HTTP/1.1
Content-Type: text/plain; charset=utf-8
Host: localhost:3000

What is the capital of Portugal?
```

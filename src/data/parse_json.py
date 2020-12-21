# Parse Blessings initial JSON from HTML to more robust JSON

import json
from bs4 import BeautifulSoup

def parse(chapter):
    try:
        soup = BeautifulSoup(chapter, 'html.parser')
        text = soup.find('blockquote')
        title = text.find_previous_sibling('p', 'calibre10')
        title = title.get_text().strip()
        text = text.find("p")
        stanzas = []
        while text:
            stanza = []
            while True:
                stanza.append(text.get_text(strip=True))
                text = text.find_next_sibling()
                if not text or text.name == 'br':
                    break
            stanzas.append(stanza)
            if text:
                text = text.find_next_sibling()
        print(title, stanzas)   
        return (title, stanzas)
    except Exception as e:
        print(e)
        return (None, None)



f = open('blessings.json')

data = json.load(f)

chapters = data["chapters"]

parsed_chapters = []

for key, value in chapters.items():
    title, stanzas = parse(value)
    if title and stanzas:
        chapter = {
            'title': title,
            'stanzas': stanzas
        }
        parsed_chapters.append(chapter)

with open('blessings_parsed.json', 'w') as s:
    json.dump(parsed_chapters, s)
    


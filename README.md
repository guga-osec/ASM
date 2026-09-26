# ASM 🔎🕵️
Auxiliary Search Mechanism

This is a Website made for people who maybe don't have more than the basic knowledge of google and search engines.
Basically this modern website let people choose specifically sites, filetypes, etc.. to search, and use google advanced search to it.


## Technologies 💻
- HTML
- CSS
- Javascript

## Helps 🤝
I used Chatgpt to help me with CSS and a little with javascript (this is my first website project with all of the 3 technologies)

## How it works? ❓

### Main page🟣
- So in the main page you have a 3 lines in the search input, if you put your mouse hover it's going to open a little dropdown content where you can check your options.
If you click the 3 lines you going to the advanced search page.

### Advanced Search Page 🟣
- Here you have the option to just write what you want or load a JSON file with the options, if you want to search something exactly you need to get on the previous page and check the checkbox.
  To go to the previous page just click the icon in the top left corner.
  (If you load a file don't check anything but the exactly checkbox (if you want to ))

### Process📍
- Initially I wanted to do this because of a friend of mine that was going to college and didn't know how to search specifically things, like the domain, etc..
  So I did some documents for him explaining the google dorking (It could help him with it as helped me in the past), but after that I started thinking.. 
  Why don't I do a site that maybe, just maybe, would be able to help him more easily, and then I started this project It took more or less than 3 weeks ( with help as I said before).

### Default JSON file
<pre>
  {
      "exactly": "\"test\"", 
      "site": "site:.pt", 
      "file_type": "filetype:pdf",
      "page_title": "intitle:\"Title frase\"", 
      "page_intext": "intext:\"Text frase\"", 
      "page_url": "inurl:\"Url frase\"",
      "pages_associated": "related:", 
      "minus": "-\"word or phrase to eliminate from the search\"",
      "before": "before:10/11/2026", 
      "after": "after:10/11/2022", 
      "_comment" : "this is a example (U can put more, just do \"name u want\" : \"the expression and what u want to search\", and be careful because when u do double quotes u need to put \" so that the json file knows that it doesnt mean the \"code\" is over)" 
  
  }
</pre>







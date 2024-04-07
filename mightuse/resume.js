// const subtitle = document.getElementsByClassName("card-subtitle")[0];

// const createWord = (text, index) => {
//   const word = document.createElement("span");
  
//   word.innerHTML = `${text} `;
  
//   word.classList.add("card-subtitle-word");
  
//   word.style.transitionDelay = `${index * 40}ms`;
  
//   return word;
// }

// const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

// const createSubtitle = text => text.split(" ").map(addWord);

// createSubtitle("JASON WAN                               • Los Angeles, California, USA\n    • +1 (424) 535-9757\n                    • jason.wan@ucla.edu");


const subtitles = document.getElementsByClassName("card-subtitle");

const createWord = (text, index) => {
    const word = document.createElement("span");
    word.innerHTML = text;
    word.classList.add("card-subtitle-word");
    word.style.transitionDelay = `${index * 20}ms`;
    return word;
  };
  
  const addWord = (text, index, subtitle) => subtitle.appendChild(createWord(text, index));
  
  const createSubtitle = (subtitle, text) => {
    subtitle.innerHTML = ""; // Clear previous content
    const lines = text.split("\n");
    let wordIndex = 0;
    lines.forEach((line, lineIndex) => {
      const words = line.split(" ");
      words.forEach((word, index) => {
        if (word.startsWith("<a") && word.endsWith("</a>")) {
          const link = document.createElement("a");
          link.href = word.match(/href='([^']*)/)[1];
          link.target = "_blank";
          link.textContent = word.match(/>([^<]*)/)[1];
          addWord(link.outerHTML, wordIndex, subtitle);
        } else {
          addWord(word, wordIndex, subtitle);
        }
        wordIndex++;
        if (index < words.length - 1) {
          addWord(" ", wordIndex, subtitle);
          wordIndex++;
        }
      });
      if (lineIndex < lines.length - 1) {
        subtitle.appendChild(document.createElement("br"));
      }
    });
  };

const texts = [
  "JASON WAN\n\n• Los Angeles, CA, USA\n\n• +1 (424) 535-9757\n\n• jason.wan@ucla.edu\n\n Aspiring software engineer\n with a passion for web\n development and artificial\n intelligence.    ",
  "UCLA\\n2022 - 2025\\n• Los Angeles, CA\\n• B.S. Computer Science\\n• Cumulative 3.7 GPA\\n\\nRelevant Coursework: Computer Organization,\\nSoftware Construction, Operating System Principles\\n\\n\\nST THERESA OF LISIEUX\\nCHS: 2018 - 2022\\n• Richmondhill, ON, CA 🇨🇦\\n• 98% Grade Average\\n• <a href='../highschool/APScoreReport.pdf' target='_blank'>AP</a> <a href='../highschool/SATreport.pdf' target='_blank'>SAT</a> <a href='../highschool/SATMath2Report.pdf' target='_blank'>SAT Math II</a>\\nSt Theresa AP Program",
  "",
  "Software Engineering Intern at Anthem\nInc., Woodland Hills, CA\nJune 2023 - September 2023",
  "English (Native)\nChinese (Conversational)\nFrench (Basic)",
  "Canadian Citizen\n• F-1 Visa"
];

Array.from(subtitles).forEach((subtitle, index) => {
  const text = texts[index];
  if (text) {
    createSubtitle(subtitle, text.replace(/\\n/g, "\n"));
  }
});
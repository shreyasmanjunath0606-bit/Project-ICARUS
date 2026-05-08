export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  link: string;
  description: string;
  category: "Coding" | "Blockchain" | "AI" | "General Tech";
  rewardValue: number;
  ageRange: "4-7" | "8-12" | "13-18";
  questions: Question[];
}

export const courses: Course[] = [
  {
    id: "python-01",
    title: "Python for Absolute Beginners",
    platform: "Edube/YouTube",
    link: "https://edube.org/study/pe1",
    description: "Master the fundamentals of the worlds most popular programming language.",
    category: "Coding",
    rewardValue: 4500,
    ageRange: "13-18",
    questions: [
      { id: 1, text: "What is the correct way to output 'Hello World' in Python?", options: ["print('Hello World')", "echo('Hello World')", "Console.Log('Hello World')", "p('Hello World')"], correctAnswer: 0 },
      { id: 2, text: "Which character is used to start a comment in Python?", options: ["//", "/*", "#", "--"], correctAnswer: 2 },
      { id: 3, text: "What is the correct file extension for Python files?", options: [".pyt", ".py", ".python", ".txt"], correctAnswer: 1 },
      { id: 4, text: "How do you create a variable named x with the numeric value 5?", options: ["x = 5", "int x = 5", "var x = 5", "x := 5"], correctAnswer: 0 },
      { id: 5, text: "Which data type is used for whole numbers?", options: ["float", "string", "int", "boolean"], correctAnswer: 2 },
      { id: 6, text: "What does the 'input()' function do?", options: ["Prints data", "Stops the program", "Takes user input", "Calculates a sum"], correctAnswer: 2 },
      { id: 7, text: "What is the result of 10 // 3 in Python?", options: ["3.33", "3", "4", "1"], correctAnswer: 1 },
      { id: 8, text: "Which of these is a valid variable name?", options: ["2myvar", "my-var", "my_var", "my var"], correctAnswer: 2 },
      { id: 9, text: "How do you start an 'if' statement in Python?", options: ["if x > y then:", "if (x > y)", "if x > y:", "if x > y"], correctAnswer: 2 },
      { id: 10, text: "Which keyword is used to create a function?", options: ["function", "void", "def", "create"], correctAnswer: 2 },
      { id: 11, text: "What symbol is used for exponentiation (power)?", options: ["^", "**", "*", "exp"], correctAnswer: 1 },
      { id: 12, text: "Which of these is used to add an item to a list?", options: ["add()", "push()", "append()", "insertLast()"], correctAnswer: 2 },
      { id: 13, text: "What is the first index in a Python list?", options: ["1", "0", "-1", "Any"], correctAnswer: 1 },
      { id: 14, text: "Which of these is NOT a Python data type?", options: ["List", "Tuple", "Dictionary", "Scanner"], correctAnswer: 3 },
      { id: 15, text: "What does 'len()' do?", options: ["Deletes a list", "Finds the length", "Loops through data", "Logic check"], correctAnswer: 1 },
      { id: 16, text: "How do you declare a list?", options: ["x = (1, 2)", "x = {1, 2}", "x = [1, 2]", "x = <1, 2>"], correctAnswer: 2 },
      { id: 17, text: "What is the keyword for 'else if' in Python?", options: ["elseif", "elif", "elsestop", "otherif"], correctAnswer: 1 },
      { id: 18, text: "What is the return type of the function '5 > 3'?", options: ["int", "string", "bool", "float"], correctAnswer: 2 },
      { id: 19, text: "Which operator is used for equality?", options: ["=", "==", "===", "is"], correctAnswer: 1 },
      { id: 20, text: "What is the output of 'Hello'[0]?", options: ["H", "h", "e", "Error"], correctAnswer: 0 }
    ]
  },
  {
    id: "html-01",
    title: "Web Lab: HTML & CSS",
    platform: "Code.org",
    link: "https://studio.code.org/s/csd2-2023",
    description: "Learn to build your first website with structured tags and beautiful styles.",
    category: "Coding",
    rewardValue: 3200,
    ageRange: "8-12",
    questions: [
      { id: 1, text: "What does HTML stand for?", options: ["Hyper Tool Markup", "Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"], correctAnswer: 2 },
      { id: 2, text: "Which tag is used for the largest heading?", options: ["<head>", "<h6>", "<h1>", "<header>"], correctAnswer: 2 },
      { id: 3, text: "What is the purpose of the <p> tag?", options: ["Page", "Paragraph", "Print", "Primary"], correctAnswer: 1 },
      { id: 4, text: "How do you create a link in HTML?", options: ["<url>", "<a>", "<link>", "<href>"], correctAnswer: 1 },
      { id: 5, text: "Which CSS property changes text color?", options: ["font-color", "text-style", "color", "bgcolor"], correctAnswer: 2 },
      { id: 6, text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: 0 },
      { id: 7, text: "Which tag is used to insert an image?", options: ["<pic>", "<img text=''>", "<img>", "<image>"], correctAnswer: 2 },
      { id: 8, text: "How do you start an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correctAnswer: 0 },
      { id: 9, text: "Which tag defines the title of a page?", options: ["<head>", "<meta>", "<title>", "<body>"], correctAnswer: 2 },
      { id: 10, text: "How do you bold text in HTML?", options: ["<bold>", "<b>", "<strong>", "Both B and C"], correctAnswer: 3 },
      { id: 11, text: "What does the <br> tag do?", options: ["Break line", "Break link", "Bold row", "Big row"], correctAnswer: 0 },
      { id: 12, text: "Which property controls the text size in CSS?", options: ["text-size", "font-weight", "font-size", "size"], correctAnswer: 2 },
      { id: 13, text: "What is the correct HTML for a line break?", options: ["<lb>", "<br>", "<break>", "<hr>"], correctAnswer: 1 },
      { id: 14, text: "Which tag is the root of an HTML document?", options: ["<body>", "<head>", "<html>", "<doc>"], correctAnswer: 2 },
      { id: 15, text: "What is the purpose of the <head> section?", options: ["Main content", "Meta data/Title", "Footer links", "Images"], correctAnswer: 1 },
      { id: 16, text: "How do you make a list with numbers?", options: ["<ul>", "<li>", "<ol>", "<nl>"], correctAnswer: 2 },
      { id: 17, text: "Which attribute is used to specify an image source?", options: ["href", "link", "src", "alt"], correctAnswer: 2 },
      { id: 18, text: "Which CSS property adds space inside a border?", options: ["margin", "padding", "border-width", "spacing"], correctAnswer: 1 },
      { id: 19, text: "Which CSS property adds space outside a border?", options: ["margin", "padding", "spacing", "outer"], correctAnswer: 0 },
      { id: 20, text: "What is the correct way to write a CSS comment?", options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"], correctAnswer: 1 }
    ]
  },
  {
    id: "js-01",
    title: "JavaScript Magic",
    platform: "Khan Academy",
    link: "https://www.khanacademy.org/computing/computer-programming/programming",
    description: "Bring your websites to life with interactivity and logic.",
    category: "Coding",
    rewardValue: 4000,
    ageRange: "13-18",
    questions: [
      { id: 1, text: "Which keyword is used to declare a variable in JS?", options: ["set", "let", "var", "Both B and C"], correctAnswer: 3 },
      { id: 2, text: "What is the symbol for multi-line comments in JS?", options: ["//", "/* ... */", "--", "##"], correctAnswer: 1 },
      { id: 3, text: "How do you write 'Hello' in an alert box?", options: ["msg('Hello')", "alertBox('Hello')", "alert('Hello')", "console.log('Hello')"], correctAnswer: 2 },
      { id: 4, text: "What does '===' mean in JS?", options: ["Assignment", "Equal value", "Equal value and type", "Not equal"], correctAnswer: 2 },
      { id: 5, text: "How do you define a function?", options: ["function myFunction()", "def myFunction()", "func myFunction()", "void myFunction()"], correctAnswer: 0 },
      { id: 6, text: "What is the first index of an array?", options: ["1", "0", "A", "-1"], correctAnswer: 1 },
      { id: 7, text: "Which math tool generates a random number?", options: ["Math.rand()", "Math.random()", "Math.floor()", "Random.next()"], correctAnswer: 1 },
      { id: 8, text: "How do you select an element by ID?", options: ["document.id('...')", "document.getElementById('...')", "#ID", "getElement('...')"], correctAnswer: 1 },
      { id: 9, text: "What does document.write() do?", options: ["Writes to a console", "Writes directly to HTML", "Edits a file", "Saves a PDF"], correctAnswer: 1 },
      { id: 10, text: "Which operator is used to add two values?", options: ["&", "+", "add", "*"], correctAnswer: 1 },
      { id: 11, text: "What is result of '2' + 2?", options: ["4", "22", "Error", "NaN"], correctAnswer: 1 },
      { id: 12, text: "What does 'DOM' stand for?", options: ["Data Object Model", "Document Object Model", "Direct Online Movie", "Digital Object Mode"], correctAnswer: 1 },
      { id: 13, text: "Which event occurs when a user clicks an element?", options: ["onmouseover", "onchange", "onclick", "onfocus"], correctAnswer: 2 },
      { id: 14, text: "Which keyword returns a value from a function?", options: ["give", "return", "back", "exit"], correctAnswer: 1 },
      { id: 15, text: "How do you start a 'for' loop?", options: ["for (i <= 5; i++)", "for i = 1 to 5", "for (let i = 0; i < 5; i++)", "foreach (i in 5)"], correctAnswer: 2 },
      { id: 16, text: "What is 'NaN'?", options: ["New and Nice", "Not a Number", "Node and Network", "No access Now"], correctAnswer: 1 },
      { id: 17, text: "Which symbol is used for multiplication?", options: ["x", "#", "*", "&"], correctAnswer: 2 },
      { id: 20, text: "How do you call a function named 'hello'?", options: ["hello[]", "call hello()", "hello()", "run hello"], correctAnswer: 2 },
      { id: 18, text: "Which is a JavaScript data type?", options: ["String", "Number", "Boolean", "All of the above"], correctAnswer: 3 },
      { id: 19, text: "What is an array?", options: ["A single variable", "A list of values", "A math operation", "An image"], correctAnswer: 1 }
    ]
  },
  {
    id: "web3-01",
    title: "CryptoZombies: Solidity Path",
    platform: "CryptoZombies",
    link: "https://cryptozombies.io/",
    description: "Learn to build DApps by making your own zombie game.",
    category: "Blockchain",
    rewardValue: 6500,
    ageRange: "13-18",
    questions: [
      { id: 1, text: "What is Solidity primarily used for?", options: ["Web Design", "Smart Contracts", "Game Engines", "Data Science"], correctAnswer: 1 },
      { id: 2, text: "Which blockchain uses Solidity?", options: ["Bitcoin", "Ethereum", "Solana", "Polkadot"], correctAnswer: 1 },
      { id: 3, text: "What does 'uint' stand for?", options: ["Universal Integer", "Unsigned Integer", "Unit", "Unique Tint"], correctAnswer: 1 },
      { id: 4, text: "Where are smart contracts stored?", options: ["On your PC", "On a database", "On the blockchain", "On GitHub"], correctAnswer: 2 },
      { id: 5, text: "What keyword is used to declare a contract?", options: ["class", "struct", "contract", "module"], correctAnswer: 2 },
      { id: 6, text: "Which visibility makes a function callable from outside?", options: ["private", "internal", "external", "secret"], correctAnswer: 2 },
      { id: 7, text: "What is used to pay for transactions on Ethereum?", options: ["Gold", "Gas (Ether)", "Credits", "RAM"], correctAnswer: 1 },
      { id: 8, text: "What is a 'mapping' in Solidity?", options: ["A physical map", "A key-value store", "A list of coordinates", "A loop"], correctAnswer: 1 },
      { id: 9, text: "What version of Solidity is most common today?", options: ["0.4.x", "0.8.x", "1.0.x", "5.0.x"], correctAnswer: 1 },
      { id: 10, text: "What does 'msg.sender' refer to?", options: ["The owner", "The person calling the function", "The contract", "The AI Agent"], correctAnswer: 1 },
      { id: 11, text: "What is an ERC-20 token?", options: ["A Non-Fungible Token", "A Fungible Token", "A Soulbound Token", "A Crypto Kitty"], correctAnswer: 1 },
      { id: 12, text: "What is an event used for?", options: ["Scheduling", "Logging data to the frontend", "Deleting contracts", "Stopping miners"], correctAnswer: 1 },
      { id: 13, text: "What keyword is used for constants?", options: ["final", "constant", "fixed", "immutable"], correctAnswer: 1 },
      { id: 14, text: "What is the EVM?", options: ["Electric Vehicle Motor", "Ethereum Virtual Machine", "Earned Value Management", "Entry View Model"], correctAnswer: 1 },
      { id: 15, text: "Which of these is a variable type in Solidity?", options: ["string", "address", "bool", "All of the above"], correctAnswer: 3 },
      { id: 16, text: "What is a 'modifier' in Solidity?", options: ["A mathematical operation", "Code that changes function behavior", "A variable renamer", "A security patch"], correctAnswer: 1 },
      { id: 17, text: "Can you change code once it is deployed to the blockchain?", options: ["Yes, easily", "No, it is immutable", "Only if you pay", "Only with a password"], correctAnswer: 1 },
      { id: 18, text: "What is a 'revert'?", options: ["Going back in time", "Stopping execution and undoing changes", "A success message", "Deleting the wallet"], correctAnswer: 1 },
      { id: 19, text: "What is the base unit of Ether?", options: ["Wei", "Satoshi", "Bit", "Gwei"], correctAnswer: 0 },
      { id: 20, text: "What does 'pure' function mean?", options: ["It uses no gas", "It does not read or write state", "It is for kids only", "It is highly secure"], correctAnswer: 1 }
    ]
  },
  {
    id: "ai-01",
    title: "AI for Everyone",
    platform: "Coursera (DeepLearning.AI)",
    link: "https://www.coursera.org/learn/ai-for-everyone",
    description: "Learn the basics of AI and how it impacts our lives.",
    category: "AI",
    rewardValue: 5000,
    ageRange: "8-12",
    questions: [
      { id: 1, text: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Information", "Actual Insight", "Alpha Index"], correctAnswer: 0 },
      { id: 2, text: "What is Machine Learning?", options: ["Machines making parts", "Computers learning from data", "A type of robot", "A text editor"], correctAnswer: 1 },
      { id: 3, text: "What is a 'Neural Network' inspired by?", options: ["The Internet", "Spider Webs", "The Human Brain", "Railway Systems"], correctAnswer: 2 },
      { id: 4, text: "What is 'Big Data'?", options: ["Large files", "Massive amounts of information", "A specific company", "Tall servers"], correctAnswer: 1 },
      { id: 5, text: "Which of these is an example of AI?", options: ["A light bulb", "Facial recognition", "A manual clock", "A pencil"], correctAnswer: 1 },
      { id: 6, text: "What does 'NLP' stand for?", options: ["Natural Language Processing", "Normal Logic Path", "Network Level Protocol", "Net Label Policy"], correctAnswer: 0 },
      { id: 7, text: "What is a 'Bias' in AI?", options: ["A fast calculation", "Unfair prejudice in data", "A security code", "A hardware part"], correctAnswer: 1 },
      { id: 8, text: "What is 'Deep Learning'?", options: ["Reading a library", "A subfield of Machine Learning", "Ocean exploration AI", "A very long course"], correctAnswer: 1 },
      { id: 9, text: "Which company created ChatGPT?", options: ["Google", "Microsoft", "OpenAI", "Meta"], correctAnswer: 2 },
      { id: 10, text: "What is 'Generative AI'?", options: ["AI that finds errors", "AI that creates new content", "AI that saves power", "AI for old people"], correctAnswer: 1 },
      { id: 11, text: "What is a 'Prompt'?", options: ["A computer error", "Instructions given to an AI", "A payment reminder", "A fast computer"], correctAnswer: 1 },
      { id: 12, text: "Can AI truly feel emotions currently?", options: ["Yes, like humans", "No, it simulates patterns", "Only when charging", "Only top secrets ones can"], correctAnswer: 1 },
      { id: 13, text: "What is 'Supervised Learning'?", options: ["Learning with a teacher/labels", "Learning in a school", "Learning while sleeping", "Robot fighting"], correctAnswer: 0 },
      { id: 14, text: "What is 'Computer Vision'?", options: ["Viewing a monitor", "AI interpreting images/videos", "A glasses brand", "A screen filter"], correctAnswer: 1 },
      { id: 15, text: "What is an 'Algorithm'?", options: ["A mathematical dance", "A set of rules/steps", "A type of drum", "A solar flare"], correctAnswer: 1 },
      { id: 16, text: "What is 'Turing Test' used for?", options: ["Speed test", "Measuring AI intelligence", "Battery life", "Storage capacity"], correctAnswer: 1 },
      { id: 17, text: "Which of these is an AI assistant?", options: ["Alexa", "Siri", "Google Assistant", "All of the above"], correctAnswer: 3 },
      { id: 18, text: "What is 'Reinforcement Learning'?", options: ["Learning by rewards/penalties", "Studying for exams", "Deleting wrong data", "Copying others"], correctAnswer: 0 },
      { id: 19, text: "What is 'Anomaly Detection'?", options: ["Finding normal data", "Finding unusual patterns", "Creating new data", "Sorting numbers"], correctAnswer: 1 },
      { id: 20, text: "Will AI replace all human jobs?", options: ["Yes, 100%", "No, it will augment/change tasks", "It already has", "AI doesn't work"], correctAnswer: 1 }
    ]
  },
  {
    id: "scratch-01",
    title: "Scratch Creative Coding",
    platform: "MIT Media Lab",
    link: "https://scratch.mit.edu/",
    description: "Drag and drop coding blocks to create stories, games, and animations.",
    category: "Coding",
    rewardValue: 2000,
    ageRange: "4-7",
    questions: [
      { id: 1, text: "What color are the 'Motion' blocks in Scratch?", options: ["Red", "Blue", "Green", "Yellow"], correctAnswer: 1 },
      { id: 2, text: "What do you click to start a project in Scratch?", options: ["Red Stop", "Yellow Star", "Green Flag", "Blue Arrow"], correctAnswer: 2 },
      { id: 3, text: "What are the characters in Scratch called?", options: ["Actors", "Robots", "Sprites", "Players"], correctAnswer: 2 },
      { id: 4, text: "Where do you drag blocks to make code?", options: ["The Stage", "The Backpack", "The Scripts Area", "The Sprite Pane"], correctAnswer: 2 },
      { id: 5, text: "Which block makes a sprite repeat an action forever?", options: ["Repeat 10", "Forever", "If", "Wait"], correctAnswer: 1 }
    ]
  }
];


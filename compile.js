function lexer(input) {
  const tokens = [];
  let cursor = 0;
  while (cursor < input.length) {
    let char = input[cursor];
    // TODO: skip whitespace
    if (/\s/.test(char)) {
      cursor++;
      continue;
    }
    // TODO: we get characters
    if (/[a-zA-Z]/.test(char)) {
      let word = "";
      while (/[a-zA-Z0-9]/.test(char)) {
        word += char;
        cursor++; //* Go to next index
        char = input[cursor];
      }
      // TODO: If the word is a keyword for our language
      if (word == "ye" || word == "bol") {
        tokens.push({ type: "keyword", value: word });
      }
      // TODO: If word is a variable name
      else {
        tokens.push({ type: "identifier", value: word });
      }
      continue;
    }
    if (/[0-9]/.test(char)) {
      let num = "";
      while (/[0-9]/.test(char)) {
        num += char;
        cursor++;
        char = input[cursor];
      }
      tokens.push({ type: "number", value: parseInt(num) });
      continue;
    }
    // TODO: char is an operator
    if (/[\+\-\*\/=]/.test(char)) {
      tokens.push({ type: "operator", value: char });
      cursor++;
      continue;
    }
  }

  return tokens;
}
// PARSER
function parser(tokens) {
  const ast = {
    type: "Program",
    body: [],
  };

  while (tokens.length > 0) {
    let start_token = tokens.shift();
    //*The shift() method in JavaScript is used
    //* to remove the first element from an array and returns that removed element.
    //* It also changes the length of the array by decreasing it by 1.
    if (start_token.type === "keyword" && start_token.value === "ye") {
      let declaration = {
        type: "Declaration",
        name: tokens.shift().value,
        value: null,
      };
      // TODO : checking for assignment

      if (tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift();
        // Parse expression
        let expression = "";
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          expression += tokens.shift().value;
        }
        declaration.value = expression.trim();
      }

      ast.body.push(declaration);
    } else if (start_token.type === "keyword" && start_token.value === "bol") {
      ast.body.push({
        type: "Print",
        expression: tokens.shift().value,
      });
      // console.log("BOL : ", ast);
    }
  }
  return ast;
}
// CODE GENERATOR
function generate_code(node) {
  switch (node.type) {
    case "Program": return node.body.map(generate_code).join('\n') 
    case "Declaration": return `const ${node.name} = ${node.value};`
    case "Print" : return `console.log(${node.expression})`
  }
} 
// RUN CODE 
function runner(input){
  console.log('EVAL : ')
  console.log(input)
  eval(input)
}
// COMPILER
function compiler(input) {
  const token = lexer(input);
  // console.log(token);
  abstract_syntax_tree = parser(token);
  // console.log("Abstract Syntax Tree : ", abstract_syntax_tree);
  const executable_code = generate_code(abstract_syntax_tree);
  // console.log(executable_code)
  return executable_code
}
const code = `
ye x = 10
ye y = 2
ye sum = x + y
bol sum
`;
const exe = compiler(code);
runner(exe)
// Lexer : tokenize the code into words
// AST : We have to make a syntax Tree
// Code Generator : We can generate code in any language like c++ , python , js 
// Executable : After code generated we get executable code and we can run that using respective compilers


export const lessonsRegistry = [
  {
    id: 'type-1',
    number: 1,
    title: 'Python Step Visualizer',
    description:
      'Learn Python step by step — watch variables, loops, functions, and classes come to life on an animated graph as each line executes.',
    color: 'bg-indigo-600',
    available: true,
  },
  {
    id: 'type-2',
    number: 2,
    title: 'Data Structures Explorer',
    description:
      'Understand how data structures work under the hood with interactive visualizations.',
    color: 'bg-emerald-600',
    available: false,
  },
  {
    id: 'type-3',
    number: 3,
    title: 'Algorithm Patterns',
    description:
      'Master common algorithm patterns through guided examples and visual breakdowns.',
    color: 'bg-amber-600',
    available: false,
  },
  {
    id: 'type-4',
    number: 4,
    title: 'System Design Basics',
    description:
      'Learn fundamental system design concepts with real-world scenario walkthroughs.',
    color: 'bg-rose-600',
    available: false,
  },
];

export function getLessonModule(lessonId) {
  switch (lessonId) {
    case 'type-1':
      return lessonTypeOneModule;
    default:
      return null;
  }
}

export const lessonTypeOneModule = {
  id: 'python-basics-type-1',
  title: 'Python Step Visualizer',
  lessonType: {
    id: 'type-1',
    label: 'Type 1',
    name: 'Visual graph lesson',
    totalTypes: 4,
  },
  summary:
    'Learn Python step by step — watch variables, loops, functions, and classes come to life on an animated graph as each line executes.',
  difficultyOrder: ['beginner', 'easy', 'medium', 'hard'],
  difficulties: {
    beginner: {
      id: 'beginner',
      label: 'Beginner',
      description: 'Start with variables and basic data types.',
      examples: [
        {
          id: 'string-variable',
          title: 'Your first variable',
          concept: 'A variable is a named box that stores a value.',
          code: `name = "Alice"
print(name)`,
          explanation: 'Python creates a box called name and puts "Alice" inside it.',
          challenge: 'What would happen if you changed "Alice" to your own name?',
          quiz: [
            { question: 'What type of value does the variable `name` hold?', options: ['Integer', 'Boolean', 'String', 'Float'], answer: 2 },
            { question: 'What will `print(name)` output?', options: ['name', '"Alice"', 'Alice', 'Error'], answer: 2 },
            { question: 'Which symbol is used to assign a value to a variable?', options: ['==', '=', ':', '->'], answer: 1 },
          ],
          nodes: [{ id: 'name', label: 'name' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create string variable', action: { type: 'create', name: 'name', val: '"Alice"', color: '#7C6AF6' } },
            { line: 1, desc: 'Print name to output', action: { type: 'output', val: 'Alice' } },
          ],
        },
        {
          id: 'number-variable',
          title: 'Number variables',
          concept: 'Python can store whole numbers (int) and decimal numbers (float).',
          code: `age = 14
height = 1.62
print(age)
print(height)`,
          explanation: 'age is an integer and height is a float. Both are stored as separate variables.',
          challenge: 'What type is the number 3.14?',
          quiz: [
            { question: 'What type is the variable `age`?', options: ['float', 'str', 'bool', 'int'], answer: 3 },
            { question: 'What type is `1.62`?', options: ['int', 'float', 'str', 'double'], answer: 1 },
            { question: 'What does `print(height)` output?', options: ['height', '1', '1.62', '"1.62"'], answer: 2 },
          ],
          nodes: [{ id: 'age', label: 'age' }, { id: 'height', label: 'height' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create integer variable', action: { type: 'create', name: 'age', val: '14', color: '#1D9E75' } },
            { line: 1, desc: 'Create float variable', action: { type: 'create', name: 'height', val: '1.62', color: '#1D9E75' } },
            { line: 2, desc: 'Print age', action: { type: 'output', val: '14' } },
            { line: 3, desc: 'Print height', action: { type: 'output', val: '1.62' } },
          ],
        },
        {
          id: 'boolean-variable',
          title: 'True or False',
          concept: 'A boolean variable can only be True or False.',
          code: `is_student = True
is_tired = False
print(is_student)`,
          explanation: 'Booleans are used to represent yes/no or on/off states in your program.',
          challenge: 'Can a boolean have any value other than True or False?',
          quiz: [
            { question: 'How many possible values can a boolean have?', options: ['1', '2', '3', 'Unlimited'], answer: 1 },
            { question: 'What does `print(is_student)` output?', options: ['is_student', '1', 'True', '"True"'], answer: 2 },
            { question: 'Which of these is a valid boolean value in Python?', options: ['"yes"', 'Maybe', 'False', '0.5'], answer: 2 },
          ],
          nodes: [{ id: 'is_student', label: 'is_student' }, { id: 'is_tired', label: 'is_tired' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create boolean True', action: { type: 'create', name: 'is_student', val: 'True', color: '#BA7517' } },
            { line: 1, desc: 'Create boolean False', action: { type: 'create', name: 'is_tired', val: 'False', color: '#BA7517' } },
            { line: 2, desc: 'Print is_student', action: { type: 'output', val: 'True' } },
          ],
        },
        {
          id: 'combine-strings',
          title: 'Joining strings',
          concept: 'You can combine two strings using the + operator.',
          code: `first = "Hello"
second = "World"
message = first + " " + second
print(message)`,
          explanation: 'The + operator glues strings together. This is called concatenation.',
          challenge: 'What would message be if you removed the " " in the middle?',
          quiz: [
            { question: 'What operator is used to concatenate strings?', options: ['&', '+', '*', '.'], answer: 1 },
            { question: 'What would `"Hello" + "World"` produce (no space)?', options: ['Hello World', 'HelloWorld', 'Error', '"Hello" + "World"'], answer: 1 },
            { question: 'What is the value of `message` after the code runs?', options: ['HelloWorld', 'Hello World', 'first + second', 'None'], answer: 1 },
          ],
          nodes: [
            { id: 'first', label: 'first' },
            { id: 'second', label: 'second' },
            { id: 'message', label: 'message' },
          ],
          edges: [{ from: 'first', to: 'message' }, { from: 'second', to: 'message' }],
          steps: [
            { line: 0, desc: 'Create first string', action: { type: 'create', name: 'first', val: '"Hello"', color: '#7C6AF6' } },
            { line: 1, desc: 'Create second string', action: { type: 'create', name: 'second', val: '"World"', color: '#7C6AF6' } },
            { line: 2, desc: 'Combine into message', action: { type: 'create', name: 'message', val: '"Hello World"', color: '#7C6AF6', from: ['first', 'second'] } },
            { line: 3, desc: 'Print message', action: { type: 'output', val: 'Hello World' } },
          ],
        },
        {
          id: 'update-variable',
          title: 'Changing a variable',
          concept: 'You can overwrite a variable by assigning a new value to it.',
          code: `score = 10
print(score)
score = 20
print(score)`,
          explanation: 'The box called score first holds 10, then is replaced with 20.',
          challenge: 'What is the final value of score after the code runs?',
          quiz: [
            { question: 'What is the final value of `score` after the code runs?', options: ['10', '30', '20', '0'], answer: 2 },
            { question: 'What happens to the old value when a variable is reassigned?', options: ['It is kept alongside', 'It is replaced', 'An error occurs', 'Both values are stored'], answer: 1 },
            { question: 'How many times is `print(score)` called?', options: ['1', '3', '2', '4'], answer: 2 },
          ],
          nodes: [{ id: 'score', label: 'score' }],
          edges: [],
          steps: [
            { line: 0, desc: 'score = 10', action: { type: 'create', name: 'score', val: '10', color: '#1D9E75' } },
            { line: 1, desc: 'Print score', action: { type: 'output', val: '10' } },
            { line: 2, desc: 'score updated to 20', action: { type: 'update', name: 'score', val: '20' } },
            { line: 3, desc: 'Print new score', action: { type: 'output', val: '20' } },
          ],
        },
      ],
    },
    easy: {
      id: 'easy',
      label: 'Easy',
      description: 'Work with lists, loops, and conditions.',
      examples: [
        {
          id: 'create-list',
          title: 'Your first list',
          concept: 'A list stores many values in a single variable, in order.',
          code: `fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(len(fruits))`,
          explanation: 'Square brackets create a list. Index 0 is always the first item.',
          challenge: 'What index would give you "cherry"?',
          quiz: [
            { question: 'What index is used to access the first item in a list?', options: ['1', '0', '-1', 'first'], answer: 1 },
            { question: 'What does `len(fruits)` return?', options: ['2', '4', '3', '1'], answer: 2 },
            { question: 'Which brackets are used to create a list?', options: ['()', '{}', '[]', '<>'], answer: 2 },
          ],
          nodes: [{ id: 'fruits', label: 'fruits' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create list of strings', action: { type: 'create', name: 'fruits', val: '["apple",...]', color: '#7C6AF6' } },
            { line: 1, desc: 'Print index 0', action: { type: 'output', val: 'apple' } },
            { line: 2, desc: 'Print length', action: { type: 'output', val: '3' } },
          ],
        },
        {
          id: 'for-loop',
          title: 'Looping through a list',
          concept: 'A for loop visits each item in a list one by one.',
          code: `scores = [8, 5, 9]
total = 0
for s in scores:
    total = total + s
print(total)`,
          explanation: 'Each time the loop runs, s takes the next value from scores.',
          challenge: 'What is the value of total after all three iterations?',
          quiz: [
            { question: 'What is the final value of `total`?', options: ['8', '14', '22', '9'], answer: 2 },
            { question: 'How many times does the loop body execute?', options: ['1', '2', '3', '4'], answer: 2 },
            { question: 'What does the variable `s` represent during each iteration?', options: ['The index', 'The current item from scores', 'The sum so far', 'A constant'], answer: 1 },
          ],
          nodes: [
            { id: 'scores', label: 'scores' },
            { id: 'total', label: 'total' },
            { id: 's', label: 's' },
          ],
          edges: [{ from: 'scores', to: 's' }, { from: 's', to: 'total' }],
          steps: [
            { line: 0, desc: 'Create list of scores', action: { type: 'create', name: 'scores', val: '[8,5,9]', color: '#1D9E75' } },
            { line: 1, desc: 'total starts at 0', action: { type: 'create', name: 'total', val: '0', color: '#1D9E75' } },
            { line: 2, desc: 'Loop: s = 8', action: { type: 'loop', name: 's', val: '8', target: 'scores', color: '#E24B4A' } },
            { line: 3, desc: 'total = 0 + 8 = 8', action: { type: 'update', name: 'total', val: '8', from: ['s', 'total'] } },
            { line: 2, desc: 'Loop: s = 5', action: { type: 'loop', name: 's', val: '5', target: 'scores', color: '#E24B4A' } },
            { line: 3, desc: 'total = 8 + 5 = 13', action: { type: 'update', name: 'total', val: '13', from: ['s', 'total'] } },
            { line: 2, desc: 'Loop: s = 9', action: { type: 'loop', name: 's', val: '9', target: 'scores', color: '#E24B4A' } },
            { line: 3, desc: 'total = 13 + 9 = 22', action: { type: 'update', name: 'total', val: '22', from: ['s', 'total'] } },
            { line: 4, desc: 'Print total', action: { type: 'output', val: '22' } },
          ],
        },
        {
          id: 'if-else',
          title: 'Making decisions with if/else',
          concept: 'if/else runs different code depending on whether a condition is true.',
          code: `score = 75
if score >= 60:
    grade = "Pass"
else:
    grade = "Fail"
print(grade)`,
          explanation: 'Python checks the condition. If it is true it runs the first block, otherwise the else block.',
          challenge: 'What would grade be if score was 45?',
          quiz: [
            { question: 'What is the value of `grade` after the code runs?', options: ['"Fail"', '"Pass"', '75', 'None'], answer: 1 },
            { question: 'What would `grade` be if `score` was 45?', options: ['"Pass"', '45', '"Fail"', 'Error'], answer: 2 },
            { question: 'What does the `>=` operator mean?', options: ['Greater than', 'Less than or equal', 'Greater than or equal', 'Not equal'], answer: 2 },
          ],
          nodes: [
            { id: 'score', label: 'score' },
            { id: 'grade', label: 'grade' },
          ],
          edges: [{ from: 'score', to: 'grade' }],
          steps: [
            { line: 0, desc: 'score = 75', action: { type: 'create', name: 'score', val: '75', color: '#1D9E75' } },
            { line: 1, desc: 'Check: 75 >= 60? YES', action: { type: 'condition', result: true, check: 'score >= 60' } },
            { line: 2, desc: 'grade = "Pass"', action: { type: 'create', name: 'grade', val: '"Pass"', color: '#7C6AF6', from: ['score'] } },
            { line: 5, desc: 'Print grade', action: { type: 'output', val: 'Pass' } },
          ],
        },
        {
          id: 'while-loop',
          title: 'While loop',
          concept: 'A while loop keeps running as long as its condition stays true.',
          code: `count = 0
while count < 3:
    print(count)
    count = count + 1`,
          explanation: 'The loop checks the condition before each run. Once count reaches 3 it stops.',
          challenge: 'How many times will print run before the loop stops?',
          quiz: [
            { question: 'How many times does `print(count)` execute?', options: ['2', '4', '3', '0'], answer: 2 },
            { question: 'What is the value of `count` when the loop stops?', options: ['2', '4', '3', '0'], answer: 2 },
            { question: 'What happens if the while condition is never false?', options: ['The loop runs once', 'The loop never starts', 'The loop runs forever', 'Python raises an error'], answer: 2 },
          ],
          nodes: [{ id: 'count', label: 'count' }],
          edges: [],
          steps: [
            { line: 0, desc: 'count = 0', action: { type: 'create', name: 'count', val: '0', color: '#1D9E75' } },
            { line: 1, desc: 'Check: 0 < 3? YES', action: { type: 'condition', result: true, check: 'count < 3' } },
            { line: 2, desc: 'Print 0', action: { type: 'output', val: '0' } },
            { line: 3, desc: 'count = 1', action: { type: 'update', name: 'count', val: '1' } },
            { line: 1, desc: 'Check: 1 < 3? YES', action: { type: 'condition', result: true, check: 'count < 3' } },
            { line: 2, desc: 'Print 1', action: { type: 'output', val: '1' } },
            { line: 3, desc: 'count = 2', action: { type: 'update', name: 'count', val: '2' } },
            { line: 1, desc: 'Check: 2 < 3? YES', action: { type: 'condition', result: true, check: 'count < 3' } },
            { line: 2, desc: 'Print 2', action: { type: 'output', val: '2' } },
            { line: 3, desc: 'count = 3', action: { type: 'update', name: 'count', val: '3' } },
            { line: 1, desc: 'Check: 3 < 3? NO — loop ends', action: { type: 'condition', result: false, check: 'count < 3' } },
          ],
        },
        {
          id: 'list-append',
          title: 'Adding to a list',
          concept: 'append() adds a new item to the end of a list.',
          code: `names = []
names.append("Alice")
names.append("Bob")
print(names)`,
          explanation: 'You start with an empty list and build it up one item at a time.',
          challenge: 'How many items are in names after the code runs?',
          quiz: [
            { question: 'How many items are in `names` after the code runs?', options: ['0', '1', '3', '2'], answer: 3 },
            { question: 'What does `append()` do?', options: ['Removes the last item', 'Adds an item to the end', 'Adds an item to the start', 'Replaces the first item'], answer: 1 },
            { question: 'What does `print(names)` output?', options: ['["Alice"]', '["Bob", "Alice"]', '["Alice", "Bob"]', '[]'], answer: 2 },
          ],
          nodes: [{ id: 'names', label: 'names' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create empty list', action: { type: 'create', name: 'names', val: '[]', color: '#7C6AF6' } },
            { line: 1, desc: 'Append "Alice"', action: { type: 'update', name: 'names', val: '["Alice"]' } },
            { line: 2, desc: 'Append "Bob"', action: { type: 'update', name: 'names', val: '["Alice","Bob"]' } },
            { line: 3, desc: 'Print names', action: { type: 'output', val: '["Alice", "Bob"]' } },
          ],
        },
      ],
    },
    medium: {
      id: 'medium',
      label: 'Medium',
      description: 'Define and call your own functions.',
      examples: [
        {
          id: 'define-function',
          title: 'Defining a function',
          concept: 'A function is a reusable block of code you can call by name.',
          code: `def greet(name):
    msg = "Hello, " + name
    return msg

result = greet("Alice")
print(result)`,
          explanation: 'def defines the function. return sends the result back to the caller.',
          challenge: 'What would result contain if you called greet("Bob")?',
          quiz: [
            { question: 'What keyword is used to define a function in Python?', options: ['func', 'function', 'def', 'define'], answer: 2 },
            { question: 'What does `return` do inside a function?', options: ['Prints the value', 'Sends a value back to the caller', 'Stops the program', 'Creates a variable'], answer: 1 },
            { question: 'What would `greet("Bob")` return?', options: ['"Hello, Alice"', '"Bob"', '"Hello, Bob"', 'None'], answer: 2 },
          ],
          nodes: [
            { id: 'greet()', label: 'greet()' },
            { id: 'result', label: 'result' },
          ],
          edges: [{ from: 'greet()', to: 'result' }],
          steps: [
            { line: 0, desc: 'Define function greet', action: { type: 'fn_def', name: 'greet', params: 'name', color: '#D85A30' } },
            { line: 4, desc: 'Call greet("Alice")', action: { type: 'fn_call', name: 'greet', arg: '"Alice"', ret: 'result' } },
            { line: 1, desc: 'msg = "Hello, Alice"', action: { type: 'create', name: 'msg', val: '"Hello, Alice"', color: '#7C6AF6', scope: 'greet' } },
            { line: 2, desc: 'Return msg', action: { type: 'fn_return', ret: 'result', val: '"Hello, Alice"', color: '#7C6AF6' } },
            { line: 5, desc: 'Print result', action: { type: 'output', val: 'Hello, Alice' } },
          ],
        },
        {
          id: 'function-two-params',
          title: 'Multiple parameters',
          concept: 'Functions can accept more than one input value.',
          code: `def add(a, b):
    return a + b

x = add(3, 4)
y = add(10, 5)
print(x, y)`,
          explanation: 'Each call passes different values for a and b and gets a different result back.',
          challenge: 'What are the values of x and y after the code runs?',
          quiz: [
            { question: 'What is the value of `x` after `add(3, 4)`?', options: ['3', '4', '7', '12'], answer: 2 },
            { question: 'What is the value of `y` after `add(10, 5)`?', options: ['10', '5', '50', '15'], answer: 3 },
            { question: 'Can a Python function accept more than two parameters?', options: ['No, maximum is two', 'Yes', 'Only with special syntax', 'Only in Python 3'], answer: 1 },
          ],
          nodes: [
            { id: 'add()', label: 'add()' },
            { id: 'x', label: 'x' },
            { id: 'y', label: 'y' },
          ],
          edges: [{ from: 'add()', to: 'x' }, { from: 'add()', to: 'y' }],
          steps: [
            { line: 0, desc: 'Define function add', action: { type: 'fn_def', name: 'add', params: 'a, b', color: '#D85A30' } },
            { line: 3, desc: 'Call add(3, 4)', action: { type: 'fn_call', name: 'add', arg: '3, 4', ret: 'x' } },
            { line: 1, desc: 'Return 3 + 4 = 7', action: { type: 'fn_return', ret: 'x', val: '7', color: '#1D9E75' } },
            { line: 4, desc: 'Call add(10, 5)', action: { type: 'fn_call', name: 'add', arg: '10, 5', ret: 'y' } },
            { line: 1, desc: 'Return 10 + 5 = 15', action: { type: 'fn_return', ret: 'y', val: '15', color: '#1D9E75' } },
            { line: 5, desc: 'Print x and y', action: { type: 'output', val: '7 15' } },
          ],
        },
        {
          id: 'default-param',
          title: 'Default parameter values',
          concept: 'You can give a parameter a default value so the caller does not have to provide it.',
          code: `def greet(name, msg="Hello"):
    return msg + ", " + name

print(greet("Alice"))
print(greet("Bob", "Hi"))`,
          explanation: 'When msg is not passed, Python uses "Hello" automatically.',
          challenge: 'What is printed on the second line?',
          quiz: [
            { question: 'What is printed when `greet("Alice")` is called?', options: ['Hello, Alice', 'Hi, Alice', 'Alice', 'Error'], answer: 0 },
            { question: 'What is the default value of the `msg` parameter?', options: ['"Hi"', '"Hey"', '"Hello"', 'None'], answer: 2 },
            { question: 'What is printed when `greet("Bob", "Hi")` is called?', options: ['Hello, Bob', 'Hi, Bob', 'Bob, Hi', 'Hi'], answer: 1 },
          ],
          nodes: [{ id: 'greet()', label: 'greet()' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Define greet with default msg', action: { type: 'fn_def', name: 'greet', params: 'name, msg="Hello"', color: '#D85A30' } },
            { line: 3, desc: 'Call greet("Alice") — uses default', action: { type: 'fn_call', name: 'greet', arg: '"Alice"', ret: 'out1' } },
            { line: 1, desc: 'Return "Hello, Alice"', action: { type: 'fn_return', ret: 'out1', val: '"Hello, Alice"', color: '#7C6AF6' } },
            { line: 3, desc: 'Print Hello, Alice', action: { type: 'output', val: 'Hello, Alice' } },
            { line: 4, desc: 'Call greet("Bob", "Hi")', action: { type: 'fn_call', name: 'greet', arg: '"Bob","Hi"', ret: 'out2' } },
            { line: 1, desc: 'Return "Hi, Bob"', action: { type: 'fn_return', ret: 'out2', val: '"Hi, Bob"', color: '#7C6AF6' } },
            { line: 4, desc: 'Print Hi, Bob', action: { type: 'output', val: 'Hi, Bob' } },
          ],
        },
        {
          id: 'recursive-function',
          title: 'Recursion basics',
          concept: 'A function can call itself. This is called recursion.',
          code: `def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`,
          explanation: 'Each call reduces n by 1 until it hits 0, then prints Go!',
          challenge: 'In what order will the numbers print?',
          quiz: [
            { question: 'What is recursion?', options: ['A type of loop', 'A function calling itself', 'A class method', 'A variable type'], answer: 1 },
            { question: 'What stops the recursion in this example?', options: ['When n equals 1', 'When n equals 0', 'When n is negative', 'It never stops'], answer: 1 },
            { question: 'In what order are the numbers printed?', options: ['0, 1, 2, 3', '3, 2, 1', '1, 2, 3', '3, 2, 1, 0'], answer: 1 },
          ],
          nodes: [{ id: 'countdown()', label: 'countdown()' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Define countdown', action: { type: 'fn_def', name: 'countdown', params: 'n', color: '#D85A30' } },
            { line: 7, desc: 'Call countdown(3)', action: { type: 'fn_call', name: 'countdown', arg: '3', ret: '_' } },
            { line: 4, desc: 'Print 3', action: { type: 'output', val: '3' } },
            { line: 5, desc: 'Call countdown(2)', action: { type: 'fn_call', name: 'countdown', arg: '2', ret: '_' } },
            { line: 4, desc: 'Print 2', action: { type: 'output', val: '2' } },
            { line: 5, desc: 'Call countdown(1)', action: { type: 'fn_call', name: 'countdown', arg: '1', ret: '_' } },
            { line: 4, desc: 'Print 1', action: { type: 'output', val: '1' } },
            { line: 5, desc: 'Call countdown(0)', action: { type: 'fn_call', name: 'countdown', arg: '0', ret: '_' } },
            { line: 2, desc: 'n == 0 → Print Go!', action: { type: 'output', val: 'Go!' } },
          ],
        },
        {
          id: 'function-list',
          title: 'Functions and lists',
          concept: 'Functions can take lists as inputs and return new lists.',
          code: `def double_all(nums):
    result = []
    for n in nums:
        result.append(n * 2)
    return result

output = double_all([1, 2, 3])
print(output)`,
          explanation: 'The function loops through the list and builds a new list with each value doubled.',
          challenge: 'What would output be if you passed [5, 10] instead?',
          quiz: [
            { question: 'What does `double_all([1, 2, 3])` return?', options: ['[1, 2, 3]', '[2, 4, 6]', '[3, 6, 9]', '[1, 4, 9]'], answer: 1 },
            { question: 'What does `n * 2` do for each element?', options: ['Divides by 2', 'Adds 2', 'Multiplies by 2', 'Subtracts 2'], answer: 2 },
            { question: 'What would `double_all([5, 10])` return?', options: ['[5, 10]', '[10, 20]', '[25, 100]', '[7, 12]'], answer: 1 },
          ],
          nodes: [
            { id: 'double_all()', label: 'double_all()' },
            { id: 'output', label: 'output' },
          ],
          edges: [{ from: 'double_all()', to: 'output' }],
          steps: [
            { line: 0, desc: 'Define double_all', action: { type: 'fn_def', name: 'double_all', params: 'nums', color: '#D85A30' } },
            { line: 6, desc: 'Call double_all([1,2,3])', action: { type: 'fn_call', name: 'double_all', arg: '[1,2,3]', ret: 'output' } },
            { line: 1, desc: 'result = []', action: { type: 'create', name: 'result', val: '[]', color: '#1D9E75', scope: 'double_all' } },
            { line: 3, desc: 'Append 2', action: { type: 'update', name: 'result', val: '[2]' } },
            { line: 3, desc: 'Append 4', action: { type: 'update', name: 'result', val: '[2,4]' } },
            { line: 3, desc: 'Append 6', action: { type: 'update', name: 'result', val: '[2,4,6]' } },
            { line: 4, desc: 'Return [2,4,6]', action: { type: 'fn_return', ret: 'output', val: '[2,4,6]', color: '#1D9E75' } },
            { line: 7, desc: 'Print output', action: { type: 'output', val: '[2, 4, 6]' } },
          ],
        },
      ],
    },
    hard: {
      id: 'hard',
      label: 'Hard',
      description: 'Build classes and understand object-oriented programming.',
      examples: [
        {
          id: 'define-class',
          title: 'Your first class',
          concept: 'A class is a blueprint for creating objects with shared attributes and methods.',
          code: `class Dog:
    def __init__(self, name):
        self.name = name

d = Dog("Rex")
print(d.name)`,
          explanation: '__init__ runs automatically when you create a new object. self refers to the object itself.',
          challenge: 'What does self.name mean inside the class?',
          quiz: [
            { question: 'What does `__init__` do in a class?', options: ['Deletes the object', 'Initializes a new object automatically', 'Prints the object', 'Returns the object'], answer: 1 },
            { question: 'What does `self` refer to?', options: ['The class name', 'The current object instance', 'A global variable', 'The parent class'], answer: 1 },
            { question: 'What does `d.name` contain after `Dog("Rex")`?', options: ['"Dog"', '"d"', '"Rex"', 'None'], answer: 2 },
          ],
          nodes: [
            { id: 'Dog', label: 'Dog' },
            { id: 'd', label: 'd' },
            { id: 'd.name', label: 'd.name' },
          ],
          edges: [{ from: 'Dog', to: 'd' }, { from: 'd', to: 'd.name' }],
          steps: [
            { line: 0, desc: 'Define class Dog', action: { type: 'class_def', name: 'Dog', color: '#D85A30' } },
            { line: 4, desc: 'Create Dog object "Rex"', action: { type: 'create', name: 'd', val: 'Dog', color: '#D85A30' } },
            { line: 2, desc: 'd.name = "Rex"', action: { type: 'attr', obj: 'd', attr: 'name', val: '"Rex"', color: '#7C6AF6' } },
            { line: 5, desc: 'Print d.name', action: { type: 'output', val: 'Rex' } },
          ],
        },
        {
          id: 'class-method',
          title: 'Adding methods',
          concept: 'Methods are functions that belong to a class.',
          code: `class Dog:
    def __init__(self, name):
        self.name = name
        self.tricks = []

    def learn(self, trick):
        self.tricks.append(trick)

d = Dog("Rex")
d.learn("sit")
print(d.tricks)`,
          explanation: 'learn() is a method — it acts on the object and updates its tricks list.',
          challenge: 'What would d.tricks contain after calling d.learn("shake") as well?',
          quiz: [
            { question: 'What does `d.learn("sit")` do?', options: ['Creates a new Dog', 'Adds "sit" to the tricks list', 'Prints "sit"', 'Returns "sit"'], answer: 1 },
            { question: 'What is `d.tricks` after calling `d.learn("sit")`?', options: ['["sit"]', '["sit", "shake"]', '[]', '"sit"'], answer: 0 },
            { question: 'What is a method?', options: ['A variable in a class', 'A function that belongs to a class', 'A type of loop', 'A built-in Python function'], answer: 1 },
          ],
          nodes: [
            { id: 'Dog', label: 'Dog' },
            { id: 'd', label: 'd' },
            { id: 'd.name', label: 'd.name' },
            { id: 'd.tricks', label: 'd.tricks' },
          ],
          edges: [
            { from: 'Dog', to: 'd' },
            { from: 'd', to: 'd.name' },
            { from: 'd', to: 'd.tricks' },
          ],
          steps: [
            { line: 0, desc: 'Define class Dog', action: { type: 'class_def', name: 'Dog', color: '#D85A30' } },
            { line: 8, desc: 'Create Dog("Rex")', action: { type: 'create', name: 'd', val: 'Dog', color: '#D85A30' } },
            { line: 2, desc: 'd.name = "Rex"', action: { type: 'attr', obj: 'd', attr: 'name', val: '"Rex"', color: '#7C6AF6' } },
            { line: 3, desc: 'd.tricks = []', action: { type: 'attr', obj: 'd', attr: 'tricks', val: '[]', color: '#1D9E75' } },
            { line: 9, desc: 'Call d.learn("sit")', action: { type: 'method_call', obj: 'd', method: 'learn', arg: '"sit"' } },
            { line: 6, desc: 'tricks.append("sit")', action: { type: 'attr', obj: 'd', attr: 'tricks', val: '["sit"]', color: '#1D9E75', from: ['d'] } },
            { line: 10, desc: 'Print d.tricks', action: { type: 'output', val: '["sit"]' } },
          ],
        },
        {
          id: 'two-objects',
          title: 'Multiple objects from one class',
          concept: 'One class can create many independent objects, each with its own data.',
          code: `class Cat:
    def __init__(self, name, lives):
        self.name = name
        self.lives = lives

a = Cat("Luna", 9)
b = Cat("Mochi", 7)
print(a.lives, b.lives)`,
          explanation: 'a and b are two separate objects. Changing one does not affect the other.',
          challenge: 'If you set a.lives = 8, does b.lives change?',
          quiz: [
            { question: 'Are `a` and `b` the same object?', options: ['Yes', 'No, they are independent objects', 'Only if they have the same name', 'It depends on the class'], answer: 1 },
            { question: 'Does changing `a.lives` affect `b.lives`?', options: ['Yes, always', 'No', 'Only if both are Cat', 'Only sometimes'], answer: 1 },
            { question: 'What does `print(a.lives, b.lives)` output?', options: ['9 9', '7 7', '9 7', '7 9'], answer: 2 },
          ],
          nodes: [
            { id: 'Cat', label: 'Cat' },
            { id: 'a', label: 'a (Luna)' },
            { id: 'b', label: 'b (Mochi)' },
          ],
          edges: [{ from: 'Cat', to: 'a' }, { from: 'Cat', to: 'b' }],
          steps: [
            { line: 0, desc: 'Define class Cat', action: { type: 'class_def', name: 'Cat', color: '#D85A30' } },
            { line: 5, desc: 'Create Cat("Luna", 9)', action: { type: 'create', name: 'a', val: 'Cat', color: '#D85A30' } },
            { line: 2, desc: 'a.name = "Luna"', action: { type: 'attr', obj: 'a', attr: 'name', val: '"Luna"', color: '#7C6AF6' } },
            { line: 3, desc: 'a.lives = 9', action: { type: 'attr', obj: 'a', attr: 'lives', val: '9', color: '#1D9E75' } },
            { line: 6, desc: 'Create Cat("Mochi", 7)', action: { type: 'create', name: 'b', val: 'Cat', color: '#D85A30' } },
            { line: 2, desc: 'b.name = "Mochi"', action: { type: 'attr', obj: 'b', attr: 'name', val: '"Mochi"', color: '#7C6AF6' } },
            { line: 3, desc: 'b.lives = 7', action: { type: 'attr', obj: 'b', attr: 'lives', val: '7', color: '#1D9E75' } },
            { line: 7, desc: 'Print both lives', action: { type: 'output', val: '9 7' } },
          ],
        },
        {
          id: 'inheritance',
          title: 'Inheritance',
          concept: 'A child class inherits all attributes and methods from its parent class.',
          code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"

d = Dog("Rex")
print(d.speak())`,
          explanation: 'Dog extends Animal. It overrides speak() to return its own sound.',
          challenge: 'What would print if you created an Animal object instead of a Dog?',
          quiz: [
            { question: 'What does `Dog(Animal)` mean?', options: ['Dog contains Animal', 'Dog inherits from Animal', 'Dog replaces Animal', 'Dog and Animal are the same'], answer: 1 },
            { question: 'What does `d.speak()` return?', options: ['"..."', '"Woof!"', '"Rex"', 'None'], answer: 1 },
            { question: 'What is it called when a child class redefines a parent method?', options: ['Overloading', 'Overriding', 'Inheriting', 'Encapsulating'], answer: 1 },
          ],
          nodes: [
            { id: 'Animal', label: 'Animal' },
            { id: 'Dog', label: 'Dog' },
            { id: 'd', label: 'd' },
          ],
          edges: [{ from: 'Animal', to: 'Dog' }, { from: 'Dog', to: 'd' }],
          steps: [
            { line: 0, desc: 'Define class Animal', action: { type: 'class_def', name: 'Animal', color: '#888780' } },
            { line: 7, desc: 'Define class Dog(Animal)', action: { type: 'class_def', name: 'Dog', color: '#D85A30' } },
            { line: 11, desc: 'Create Dog("Rex")', action: { type: 'create', name: 'd', val: 'Dog', color: '#D85A30' } },
            { line: 2, desc: 'd.name = "Rex"', action: { type: 'attr', obj: 'd', attr: 'name', val: '"Rex"', color: '#7C6AF6' } },
            { line: 12, desc: 'Call d.speak()', action: { type: 'method_call', obj: 'd', method: 'speak', arg: '' } },
            { line: 12, desc: 'Print Woof!', action: { type: 'output', val: 'Woof!' } },
          ],
        },
        {
          id: 'class-counter',
          title: 'Class with a counter',
          concept: 'Objects can track state across multiple method calls.',
          code: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1

c = Counter()
c.increment()
c.increment()
print(c.count)`,
          explanation: 'Each call to increment() adds 1 to the same count attribute on the object.',
          challenge: 'What would c.count be if you called increment() five times?',
          quiz: [
            { question: 'What is `c.count` after two calls to `increment()`?', options: ['0', '1', '2', '3'], answer: 2 },
            { question: 'What does `self.count += 1` do?', options: ['Resets count to 1', 'Adds 1 to count', 'Multiplies count by 1', 'Does nothing'], answer: 1 },
            { question: 'What would `c.count` be after five calls to `increment()`?', options: ['3', '4', '5', '10'], answer: 2 },
          ],
          nodes: [
            { id: 'Counter', label: 'Counter' },
            { id: 'c', label: 'c' },
            { id: 'c.count', label: 'c.count' },
          ],
          edges: [{ from: 'Counter', to: 'c' }, { from: 'c', to: 'c.count' }],
          steps: [
            { line: 0, desc: 'Define class Counter', action: { type: 'class_def', name: 'Counter', color: '#D85A30' } },
            { line: 7, desc: 'Create Counter()', action: { type: 'create', name: 'c', val: 'Counter', color: '#D85A30' } },
            { line: 2, desc: 'c.count = 0', action: { type: 'attr', obj: 'c', attr: 'count', val: '0', color: '#1D9E75' } },
            { line: 8, desc: 'Call c.increment()', action: { type: 'method_call', obj: 'c', method: 'increment', arg: '' } },
            { line: 5, desc: 'count = 0 + 1 = 1', action: { type: 'attr', obj: 'c', attr: 'count', val: '1', color: '#1D9E75', from: ['c'] } },
            { line: 9, desc: 'Call c.increment()', action: { type: 'method_call', obj: 'c', method: 'increment', arg: '' } },
            { line: 5, desc: 'count = 1 + 1 = 2', action: { type: 'attr', obj: 'c', attr: 'count', val: '2', color: '#1D9E75', from: ['c'] } },
            { line: 10, desc: 'Print c.count', action: { type: 'output', val: '2' } },
          ],
        },
      ],
    },
  },
};
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
    available: true,
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
    case 'type-2':
      return lessonTypeTwoModule;
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

// ─────────────────────────────────────────────────────────────────────────────
// Lesson Type 2 — Data Structures Explorer
// 4 difficulties × 5 examples = 20 examples
// Beginner: Lists | Easy: Stacks | Medium: Queues | Hard: Dictionaries
// ─────────────────────────────────────────────────────────────────────────────
export const lessonTypeTwoModule = {
  id: 'data-structures-type-2',
  title: 'Data Structures Explorer',
  lessonType: {
    id: 'type-2',
    label: 'Type 2',
    name: 'Data structure visualizer',
    totalTypes: 4,
  },
  summary:
    "Explore Python's core data structures — lists, stacks, queues, and dictionaries — through animated step-by-step visualizations that show exactly what happens in memory.",
  difficultyOrder: ['beginner', 'easy', 'medium', 'hard'],
  difficulties: {
    // ── BEGINNER ── Lists ──────────────────────────────────────────────────
    beginner: {
      id: 'beginner',
      label: 'Beginner',
      description: 'Master Python lists — create, access, modify, and remove items.',
      examples: [
        {
          id: 'list-create',
          title: 'Creating a list',
          concept: 'A list stores many values in order under a single variable name.',
          code: `fruits = ["apple", "banana", "cherry"]
print(fruits[0])
print(fruits[2])
print(len(fruits))`,
          explanation:
            'Square brackets [ ] create a list. Items are indexed from 0. len() counts all items.',
          challenge: 'What index would give you "banana"?',
          quiz: [
            { question: 'What index is "apple" at?', options: ['0', '1', '2', '-1'], answer: 0 },
            { question: 'What does `len(fruits)` return?', options: ['2', '3', '4', '1'], answer: 1 },
            { question: 'Which brackets create a list in Python?', options: ['()', '{}', '[]', '<>'], answer: 2 },
          ],
          nodes: [{ id: 'fruits', label: 'fruits' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create list with 3 strings', action: { type: 'create', name: 'fruits', val: '["apple","banana","cherry"]', color: '#1D9E75' } },
            { line: 1, desc: 'Access index 0 → "apple"', action: { type: 'output', val: 'apple' } },
            { line: 2, desc: 'Access index 2 → "cherry"', action: { type: 'output', val: 'cherry' } },
            { line: 3, desc: 'len(fruits) = 3', action: { type: 'output', val: '3' } },
          ],
        },
        {
          id: 'list-index',
          title: 'Positive and negative indexing',
          concept: 'Lists support both positive (from start) and negative (from end) indexing.',
          code: `nums = [10, 20, 30, 40, 50]
first = nums[0]
last = nums[-1]
second_last = nums[-2]
print(first, last, second_last)`,
          explanation:
            'nums[0] is 10 (first). nums[-1] is 50 (last). nums[-2] is 40 (second from end).',
          challenge: 'What would nums[-3] give you?',
          quiz: [
            { question: 'What is `nums[0]`?', options: ['50', '20', '10', '30'], answer: 2 },
            { question: 'What is `nums[-1]`?', options: ['10', '20', '40', '50'], answer: 3 },
            { question: 'What is `nums[-2]`?', options: ['30', '40', '20', '10'], answer: 1 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'first', label: 'first' },
            { id: 'last', label: 'last' },
            { id: 'second_last', label: 'second_last' },
          ],
          edges: [
            { from: 'nums', to: 'first' },
            { from: 'nums', to: 'last' },
            { from: 'nums', to: 'second_last' },
          ],
          steps: [
            { line: 0, desc: 'Create list [10,20,30,40,50]', action: { type: 'create', name: 'nums', val: '[10,20,30,40,50]', color: '#1D9E75' } },
            { line: 1, desc: 'first = nums[0] = 10', action: { type: 'create', name: 'first', val: '10', color: '#7C6AF6', from: ['nums'] } },
            { line: 2, desc: 'last = nums[-1] = 50', action: { type: 'create', name: 'last', val: '50', color: '#7C6AF6', from: ['nums'] } },
            { line: 3, desc: 'second_last = nums[-2] = 40', action: { type: 'create', name: 'second_last', val: '40', color: '#7C6AF6', from: ['nums'] } },
            { line: 4, desc: 'Print 10 50 40', action: { type: 'output', val: '10 50 40' } },
          ],
        },
        {
          id: 'list-append',
          title: 'Appending to a list',
          concept: 'append() adds an item to the end of a list, growing it in place.',
          code: `cart = []
cart.append("shirt")
cart.append("shoes")
cart.append("hat")
print(cart)
print(len(cart))`,
          explanation:
            'We start with an empty list. Each append() call adds one item to the right end.',
          challenge: 'What would happen if you called cart.append("shirt") twice?',
          quiz: [
            { question: 'What does `append()` do?', options: ['Removes the last item', 'Adds to the start', 'Adds to the end', 'Removes the first item'], answer: 2 },
            { question: 'What is `len(cart)` at the end?', options: ['2', '4', '3', '1'], answer: 2 },
            { question: 'What is `cart[0]` at the end?', options: ['"hat"', '"shoes"', '"shirt"', 'empty'], answer: 2 },
          ],
          nodes: [{ id: 'cart', label: 'cart' }],
          edges: [],
          steps: [
            { line: 0, desc: 'cart starts as empty list []', action: { type: 'create', name: 'cart', val: '[]', color: '#1D9E75' } },
            { line: 1, desc: 'append "shirt" → cart = ["shirt"]', action: { type: 'update', name: 'cart', val: '["shirt"]', color: '#1D9E75' } },
            { line: 2, desc: 'append "shoes" → cart = ["shirt","shoes"]', action: { type: 'update', name: 'cart', val: '["shirt","shoes"]', color: '#1D9E75' } },
            { line: 3, desc: 'append "hat" → cart = ["shirt","shoes","hat"]', action: { type: 'update', name: 'cart', val: '["shirt","shoes","hat"]', color: '#1D9E75' } },
            { line: 4, desc: 'Print cart', action: { type: 'output', val: '["shirt", "shoes", "hat"]' } },
            { line: 5, desc: 'len(cart) = 3', action: { type: 'output', val: '3' } },
          ],
        },
        {
          id: 'list-update',
          title: 'Updating a list item',
          concept: 'You can change any list item by assigning a new value to its index.',
          code: `grades = [80, 70, 90]
print(grades[1])
grades[1] = 85
print(grades[1])
print(grades)`,
          explanation:
            'grades[1] points to the second slot. Assigning replaces it. The rest of the list stays unchanged.',
          challenge: 'What would grades[0] need to be for the list to be sorted ascending?',
          quiz: [
            { question: 'What is `grades[1]` before the update?', options: ['80', '90', '70', '85'], answer: 2 },
            { question: 'What is `grades[1]` after the update?', options: ['70', '80', '90', '85'], answer: 3 },
            { question: 'What will `print(grades)` output?', options: ['[80, 70, 90]', '[80, 85, 90]', '[85, 70, 90]', '[80, 70, 85]'], answer: 1 },
          ],
          nodes: [{ id: 'grades', label: 'grades' }],
          edges: [],
          steps: [
            { line: 0, desc: 'Create grades = [80,70,90]', action: { type: 'create', name: 'grades', val: '[80,70,90]', color: '#1D9E75' } },
            { line: 1, desc: 'grades[1] = 70 → print 70', action: { type: 'output', val: '70' } },
            { line: 2, desc: 'Update grades[1] = 85', action: { type: 'update', name: 'grades', val: '[80,85,90]', color: '#1D9E75' } },
            { line: 3, desc: 'grades[1] is now 85 → print 85', action: { type: 'output', val: '85' } },
            { line: 4, desc: 'Print full updated list', action: { type: 'output', val: '[80, 85, 90]' } },
          ],
        },
        {
          id: 'list-remove',
          title: 'Removing list items',
          concept: 'pop() removes the last item and returns it. remove() deletes a specific value.',
          code: `items = ["a", "b", "c", "d"]
last = items.pop()
print(last)
items.remove("b")
print(items)`,
          explanation:
            'pop() pulls "d" off the end and returns it. remove("b") finds and deletes the first "b" by value.',
          challenge: 'What would items look like if you called pop() one more time after remove?',
          quiz: [
            { question: 'What does `pop()` return?', options: ['"a"', '"b"', '"c"', '"d"'], answer: 3 },
            { question: 'What is `items` after `remove("b")`?', options: ['["a","c"]', '["a","c","d"]', '["a","b","c"]', '["b","c"]'], answer: 0 },
            { question: 'What is the key difference between pop() and remove()?', options: ['No difference', 'pop removes by value, remove by index', 'pop removes last item, remove removes by value', 'pop adds items'], answer: 2 },
          ],
          nodes: [
            { id: 'items', label: 'items' },
            { id: 'last', label: 'last' },
          ],
          edges: [{ from: 'items', to: 'last' }],
          steps: [
            { line: 0, desc: 'items = ["a","b","c","d"]', action: { type: 'create', name: 'items', val: '["a","b","c","d"]', color: '#1D9E75' } },
            { line: 1, desc: 'pop() removes last → last = "d"', action: { type: 'create', name: 'last', val: '"d"', color: '#7C6AF6', from: ['items'] } },
            { line: 1, desc: 'items shrinks → ["a","b","c"]', action: { type: 'update', name: 'items', val: '["a","b","c"]', color: '#1D9E75' } },
            { line: 2, desc: 'Print "d"', action: { type: 'output', val: 'd' } },
            { line: 3, desc: 'remove("b") → items = ["a","c"]', action: { type: 'update', name: 'items', val: '["a","c"]', color: '#1D9E75' } },
            { line: 4, desc: 'Print ["a","c"]', action: { type: 'output', val: '["a", "c"]' } },
          ],
        },
      ],
    },

    // ── EASY ── Stacks ────────────────────────────────────────────────────
    easy: {
      id: 'easy',
      label: 'Easy',
      description: 'Learn about stacks — LIFO data structures built with Python lists.',
      examples: [
        {
          id: 'stack-intro',
          title: 'What is a stack?',
          concept: 'A stack is LIFO — Last In, First Out. Like a stack of plates.',
          code: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack)
print(stack[-1])`,
          explanation:
            'We build a stack using a list. The last item added (3) is on top and accessed with index -1.',
          challenge: 'What would stack[-1] be if you appended 5 next?',
          quiz: [
            { question: 'What does LIFO stand for?', options: ['Last In First Out', 'Last Item Found On', 'Linked Items For Output', 'Loop In Function Out'], answer: 0 },
            { question: 'What is `stack[-1]` after appending 1, 2, 3?', options: ['1', '2', '3', '0'], answer: 2 },
            { question: 'Which end of a stack do you add and remove from?', options: ['The front', 'The middle', 'The top (end)', 'Any position'], answer: 2 },
          ],
          nodes: [{ id: 'stack', label: 'stack' }],
          edges: [],
          steps: [
            { line: 0, desc: 'stack starts empty', action: { type: 'create', name: 'stack', val: '[]', color: '#D85A30' } },
            { line: 1, desc: 'Push 1 onto stack', action: { type: 'update', name: 'stack', val: '[1]', color: '#D85A30' } },
            { line: 2, desc: 'Push 2 onto stack', action: { type: 'update', name: 'stack', val: '[1,2]', color: '#D85A30' } },
            { line: 3, desc: 'Push 3 onto stack', action: { type: 'update', name: 'stack', val: '[1,2,3]', color: '#D85A30' } },
            { line: 4, desc: 'Print full stack', action: { type: 'output', val: '[1, 2, 3]' } },
            { line: 5, desc: 'stack[-1] = 3 (top item)', action: { type: 'output', val: '3' } },
          ],
        },
        {
          id: 'stack-pop',
          title: 'Popping from a stack',
          concept: 'pop() removes and returns the top (last) item of the stack.',
          code: `stack = ["a", "b", "c"]
top = stack.pop()
print(top)
print(stack)`,
          explanation:
            'pop() takes "c" off the top and returns it into top. The stack shrinks by one.',
          challenge: 'What would stack look like after two more pop() calls?',
          quiz: [
            { question: 'What is `top` after the pop?', options: ['"a"', '"b"', '"c"', 'empty'], answer: 2 },
            { question: 'What is `stack` after the pop?', options: ['["a","b","c"]', '["b","c"]', '["a","b"]', '["a"]'], answer: 2 },
            { question: 'What error does pop() raise on an empty stack?', options: ['ValueError', 'TypeError', 'IndexError', 'KeyError'], answer: 2 },
          ],
          nodes: [
            { id: 'stack', label: 'stack' },
            { id: 'top', label: 'top' },
          ],
          edges: [{ from: 'stack', to: 'top' }],
          steps: [
            { line: 0, desc: 'stack = ["a","b","c"]', action: { type: 'create', name: 'stack', val: '["a","b","c"]', color: '#D85A30' } },
            { line: 1, desc: 'pop() removes top → top = "c"', action: { type: 'create', name: 'top', val: '"c"', color: '#7C6AF6', from: ['stack'] } },
            { line: 1, desc: 'stack shrinks → ["a","b"]', action: { type: 'update', name: 'stack', val: '["a","b"]', color: '#D85A30' } },
            { line: 2, desc: 'Print top = "c"', action: { type: 'output', val: 'c' } },
            { line: 3, desc: 'Print stack = ["a","b"]', action: { type: 'output', val: '["a", "b"]' } },
          ],
        },
        {
          id: 'stack-peek',
          title: 'Peeking the top',
          concept: 'Peeking reads the top item without removing it — use index -1.',
          code: `stack = [10, 20, 30]
top = stack[-1]
print(top)
print(stack)`,
          explanation:
            'stack[-1] reads the last element without modifying the stack. This is called a "peek" operation.',
          challenge: 'How would you peek at the second item from the top?',
          quiz: [
            { question: 'What is `top` after the peek?', options: ['10', '20', '30', 'None'], answer: 2 },
            { question: 'Is the stack changed after a peek?', options: ['Yes, top is removed', 'Yes, stack is reversed', 'No, it stays the same', 'No, only length changes'], answer: 2 },
            { question: 'How do you peek the second item from the top?', options: ['stack[-3]', 'stack[0]', 'stack[-2]', 'stack[1]'], answer: 2 },
          ],
          nodes: [
            { id: 'stack', label: 'stack' },
            { id: 'top', label: 'top' },
          ],
          edges: [{ from: 'stack', to: 'top' }],
          steps: [
            { line: 0, desc: 'stack = [10,20,30]', action: { type: 'create', name: 'stack', val: '[10,20,30]', color: '#D85A30' } },
            { line: 1, desc: 'Peek: top = stack[-1] = 30', action: { type: 'create', name: 'top', val: '30', color: '#7C6AF6', from: ['stack'] } },
            { line: 2, desc: 'Print top = 30', action: { type: 'output', val: '30' } },
            { line: 3, desc: 'Stack unchanged — print [10,20,30]', action: { type: 'output', val: '[10, 20, 30]' } },
          ],
        },
        {
          id: 'stack-lifo',
          title: 'LIFO in action',
          concept: 'The item you added LAST is always the first one out — reverse of insertion order.',
          code: `stack = []
stack.append("first")
stack.append("second")
stack.append("third")
a = stack.pop()
b = stack.pop()
print(a, b)`,
          explanation:
            '"third" was added last so it pops first. "second" next. This is LIFO — items come out in reverse order.',
          challenge: 'What order would all three items come out if you kept popping?',
          quiz: [
            { question: 'What is `a` after the first pop?', options: ['"first"', '"second"', '"third"', 'None'], answer: 2 },
            { question: 'What is `b` after the second pop?', options: ['"first"', '"second"', '"third"', 'empty'], answer: 1 },
            { question: 'In LIFO, items come out in what order relative to insertion?', options: ['Same order', 'Random order', 'Reverse order', 'Sorted order'], answer: 2 },
          ],
          nodes: [
            { id: 'stack', label: 'stack' },
            { id: 'a', label: 'a' },
            { id: 'b', label: 'b' },
          ],
          edges: [{ from: 'stack', to: 'a' }, { from: 'stack', to: 'b' }],
          steps: [
            { line: 0, desc: 'stack starts empty', action: { type: 'create', name: 'stack', val: '[]', color: '#D85A30' } },
            { line: 1, desc: 'Push "first"', action: { type: 'update', name: 'stack', val: '["first"]', color: '#D85A30' } },
            { line: 2, desc: 'Push "second"', action: { type: 'update', name: 'stack', val: '["first","second"]', color: '#D85A30' } },
            { line: 3, desc: 'Push "third"', action: { type: 'update', name: 'stack', val: '["first","second","third"]', color: '#D85A30' } },
            { line: 4, desc: 'pop() → a = "third" (last in, first out)', action: { type: 'create', name: 'a', val: '"third"', color: '#7C6AF6', from: ['stack'] } },
            { line: 4, desc: 'stack → ["first","second"]', action: { type: 'update', name: 'stack', val: '["first","second"]', color: '#D85A30' } },
            { line: 5, desc: 'pop() → b = "second"', action: { type: 'create', name: 'b', val: '"second"', color: '#7C6AF6', from: ['stack'] } },
            { line: 5, desc: 'stack → ["first"]', action: { type: 'update', name: 'stack', val: '["first"]', color: '#D85A30' } },
            { line: 6, desc: 'Print "third second"', action: { type: 'output', val: 'third second' } },
          ],
        },
        {
          id: 'stack-reverse',
          title: 'Reversing a string with a stack',
          concept: 'Because of LIFO, popping all items from a stack reverses their order.',
          code: `word = "hello"
stack = []
for ch in word:
    stack.append(ch)
result = ""
for i in range(len(stack)):
    result = result + stack.pop()
print(result)`,
          explanation:
            'Push each letter of "hello". Popping gives "o","l","l","e","h" — the word reversed.',
          challenge: 'What would happen if you used "racecar"? Would the result be the same?',
          quiz: [
            { question: 'What is printed at the end?', options: ['"hello"', '"olleh"', '"helo"', '"lolhe"'], answer: 1 },
            { question: 'Why does popping reverse the word?', options: ['Python reverses automatically', 'LIFO gives items back in reverse order', 'The loop runs backwards', 'append() reverses items'], answer: 1 },
            { question: 'What is `stack` after pushing all letters of "hello"?', options: ['["o","l","l","e","h"]', '["h","e","l","l","o"]', '["hello"]', '["h"]'], answer: 1 },
          ],
          nodes: [
            { id: 'word', label: 'word' },
            { id: 'stack', label: 'stack' },
            { id: 'ch', label: 'ch' },
            { id: 'result', label: 'result' },
          ],
          edges: [
            { from: 'word', to: 'ch' },
            { from: 'ch', to: 'stack' },
            { from: 'stack', to: 'result' },
          ],
          steps: [
            { line: 0, desc: 'word = "hello"', action: { type: 'create', name: 'word', val: '"hello"', color: '#7C6AF6' } },
            { line: 1, desc: 'stack = []', action: { type: 'create', name: 'stack', val: '[]', color: '#D85A30' } },
            { line: 2, desc: 'Loop: ch = "h"', action: { type: 'loop', name: 'ch', val: '"h"', target: 'word', color: '#E24B4A' } },
            { line: 3, desc: 'Push "h" → stack = ["h"]', action: { type: 'update', name: 'stack', val: '["h"]', color: '#D85A30' } },
            { line: 2, desc: 'Loop: ch = "e"', action: { type: 'loop', name: 'ch', val: '"e"', target: 'word', color: '#E24B4A' } },
            { line: 3, desc: 'Push "e" → stack = ["h","e"]', action: { type: 'update', name: 'stack', val: '["h","e"]', color: '#D85A30' } },
            { line: 2, desc: 'Loop: ch = "l"', action: { type: 'loop', name: 'ch', val: '"l"', target: 'word', color: '#E24B4A' } },
            { line: 3, desc: 'Push "l" → stack = ["h","e","l"]', action: { type: 'update', name: 'stack', val: '["h","e","l"]', color: '#D85A30' } },
            { line: 2, desc: 'Loop: ch = "l"', action: { type: 'loop', name: 'ch', val: '"l"', target: 'word', color: '#E24B4A' } },
            { line: 3, desc: 'Push "l" → stack = ["h","e","l","l"]', action: { type: 'update', name: 'stack', val: '["h","e","l","l"]', color: '#D85A30' } },
            { line: 2, desc: 'Loop: ch = "o"', action: { type: 'loop', name: 'ch', val: '"o"', target: 'word', color: '#E24B4A' } },
            { line: 3, desc: 'Push "o" → stack = ["h","e","l","l","o"]', action: { type: 'update', name: 'stack', val: '["h","e","l","l","o"]', color: '#D85A30' } },
            { line: 4, desc: 'result = ""', action: { type: 'create', name: 'result', val: '""', color: '#7C6AF6' } },
            { line: 6, desc: 'pop "o" → result = "o"', action: { type: 'update', name: 'result', val: '"o"', color: '#7C6AF6', from: ['stack'] } },
            { line: 6, desc: 'pop "l" → result = "ol"', action: { type: 'update', name: 'result', val: '"ol"', color: '#7C6AF6' } },
            { line: 6, desc: 'pop "l" → result = "oll"', action: { type: 'update', name: 'result', val: '"oll"', color: '#7C6AF6' } },
            { line: 6, desc: 'pop "e" → result = "olle"', action: { type: 'update', name: 'result', val: '"olle"', color: '#7C6AF6' } },
            { line: 6, desc: 'pop "h" → result = "olleh"', action: { type: 'update', name: 'result', val: '"olleh"', color: '#7C6AF6' } },
            { line: 7, desc: 'Print "olleh"', action: { type: 'output', val: 'olleh' } },
          ],
        },
      ],
    },

    // ── MEDIUM ── Queues ──────────────────────────────────────────────────
    medium: {
      id: 'medium',
      label: 'Medium',
      description: 'Learn about queues — FIFO data structures for ordered processing.',
      examples: [
        {
          id: 'queue-intro',
          title: 'What is a queue?',
          concept: 'A queue is FIFO — First In, First Out. Like a line at a shop.',
          code: `queue = []
queue.append("alice")
queue.append("bob")
queue.append("charlie")
print(queue)
print(queue[0])`,
          explanation:
            'Items join the back with append(). queue[0] is always the front — the next one to be served.',
          challenge: 'Who is at position queue[1]?',
          quiz: [
            { question: 'What does FIFO stand for?', options: ['First In First Out', 'Fast Input Fast Output', 'First Item Found Outside', 'Function In Function Out'], answer: 0 },
            { question: 'What is `queue[0]` after the three appends?', options: ['"charlie"', '"bob"', '"alice"', 'empty'], answer: 2 },
            { question: 'In a queue, where do new items join?', options: ['The front', 'The middle', 'The back', 'A random position'], answer: 2 },
          ],
          nodes: [{ id: 'queue', label: 'queue' }],
          edges: [],
          steps: [
            { line: 0, desc: 'queue starts empty', action: { type: 'create', name: 'queue', val: '[]', color: '#7C6AF6' } },
            { line: 1, desc: 'Enqueue "alice" — first in line', action: { type: 'update', name: 'queue', val: '["alice"]', color: '#7C6AF6' } },
            { line: 2, desc: 'Enqueue "bob" — joins the back', action: { type: 'update', name: 'queue', val: '["alice","bob"]', color: '#7C6AF6' } },
            { line: 3, desc: 'Enqueue "charlie" — joins the back', action: { type: 'update', name: 'queue', val: '["alice","bob","charlie"]', color: '#7C6AF6' } },
            { line: 4, desc: 'Print full queue', action: { type: 'output', val: '["alice", "bob", "charlie"]' } },
            { line: 5, desc: 'queue[0] = "alice" (front of line)', action: { type: 'output', val: 'alice' } },
          ],
        },
        {
          id: 'queue-dequeue',
          title: 'Dequeuing — removing from front',
          concept: 'pop(0) removes and returns the FRONT item of the queue.',
          code: `queue = ["alice", "bob", "charlie"]
served = queue.pop(0)
print(served)
print(queue)`,
          explanation:
            'pop(0) removes index 0 — the front. "alice" is served first, then "bob" becomes the new front.',
          challenge: 'What would queue look like after two more dequeue operations?',
          quiz: [
            { question: 'What is `served` after `queue.pop(0)`?', options: ['"charlie"', '"bob"', '"alice"', 'None'], answer: 2 },
            { question: 'What is `queue` after the dequeue?', options: ['["alice","bob"]', '["bob","charlie"]', '["alice","charlie"]', '["charlie"]'], answer: 1 },
            { question: 'What argument does pop() need to remove from the front?', options: ['pop(-1)', 'pop()', 'pop(0)', 'pop(front)'], answer: 2 },
          ],
          nodes: [
            { id: 'queue', label: 'queue' },
            { id: 'served', label: 'served' },
          ],
          edges: [{ from: 'queue', to: 'served' }],
          steps: [
            { line: 0, desc: 'queue = ["alice","bob","charlie"]', action: { type: 'create', name: 'queue', val: '["alice","bob","charlie"]', color: '#7C6AF6' } },
            { line: 1, desc: 'pop(0) → served = "alice" (front)', action: { type: 'create', name: 'served', val: '"alice"', color: '#1D9E75', from: ['queue'] } },
            { line: 1, desc: 'queue → ["bob","charlie"]', action: { type: 'update', name: 'queue', val: '["bob","charlie"]', color: '#7C6AF6' } },
            { line: 2, desc: 'Print "alice"', action: { type: 'output', val: 'alice' } },
            { line: 3, desc: 'Print ["bob","charlie"]', action: { type: 'output', val: '["bob", "charlie"]' } },
          ],
        },
        {
          id: 'queue-fifo',
          title: 'FIFO in action',
          concept: 'The first item added is always the first removed — opposite of a stack.',
          code: `queue = []
queue.append("task1")
queue.append("task2")
queue.append("task3")
first = queue.pop(0)
second = queue.pop(0)
print(first, second)`,
          explanation:
            '"task1" was added first so it leaves first. "task2" next. This is FIFO — same order as insertion.',
          challenge: 'What would happen if you used pop() with no argument instead of pop(0)?',
          quiz: [
            { question: 'What is `first` after the first pop(0)?', options: ['"task3"', '"task2"', '"task1"', 'None'], answer: 2 },
            { question: 'What is `second` after the second pop(0)?', options: ['"task1"', '"task2"', '"task3"', 'empty'], answer: 1 },
            { question: 'In FIFO, items come out in what order?', options: ['Reverse of insertion', 'Same order as inserted', 'Random order', 'Sorted order'], answer: 1 },
          ],
          nodes: [
            { id: 'queue', label: 'queue' },
            { id: 'first', label: 'first' },
            { id: 'second', label: 'second' },
          ],
          edges: [{ from: 'queue', to: 'first' }, { from: 'queue', to: 'second' }],
          steps: [
            { line: 0, desc: 'queue starts empty', action: { type: 'create', name: 'queue', val: '[]', color: '#7C6AF6' } },
            { line: 1, desc: 'Enqueue "task1"', action: { type: 'update', name: 'queue', val: '["task1"]', color: '#7C6AF6' } },
            { line: 2, desc: 'Enqueue "task2"', action: { type: 'update', name: 'queue', val: '["task1","task2"]', color: '#7C6AF6' } },
            { line: 3, desc: 'Enqueue "task3"', action: { type: 'update', name: 'queue', val: '["task1","task2","task3"]', color: '#7C6AF6' } },
            { line: 4, desc: 'pop(0) → first = "task1" (first in, first out)', action: { type: 'create', name: 'first', val: '"task1"', color: '#1D9E75', from: ['queue'] } },
            { line: 4, desc: 'queue → ["task2","task3"]', action: { type: 'update', name: 'queue', val: '["task2","task3"]', color: '#7C6AF6' } },
            { line: 5, desc: 'pop(0) → second = "task2"', action: { type: 'create', name: 'second', val: '"task2"', color: '#1D9E75', from: ['queue'] } },
            { line: 5, desc: 'queue → ["task3"]', action: { type: 'update', name: 'queue', val: '["task3"]', color: '#7C6AF6' } },
            { line: 6, desc: 'Print "task1 task2"', action: { type: 'output', val: 'task1 task2' } },
          ],
        },
        {
          id: 'queue-size',
          title: 'Queue size and empty check',
          concept: 'Use len() to check queue size. Compare to 0 to check if it is empty.',
          code: `queue = ["x", "y", "z"]
size = len(queue)
empty = (size == 0)
print(size)
print(empty)
queue.pop(0)
queue.pop(0)
queue.pop(0)
print(len(queue) == 0)`,
          explanation:
            'len() counts items. After popping all three, the queue is empty so len == 0 is True.',
          challenge: 'How would you check if a queue has at least 2 items?',
          quiz: [
            { question: 'What is `size` initially?', options: ['1', '2', '3', '0'], answer: 2 },
            { question: 'What is `empty` initially?', options: ['True', 'False', 'None', '0'], answer: 1 },
            { question: 'What is `len(queue) == 0` after popping all items?', options: ['False', 'None', '0', 'True'], answer: 3 },
          ],
          nodes: [
            { id: 'queue', label: 'queue' },
            { id: 'size', label: 'size' },
            { id: 'empty', label: 'empty' },
          ],
          edges: [
            { from: 'queue', to: 'size' },
            { from: 'size', to: 'empty' },
          ],
          steps: [
            { line: 0, desc: 'queue = ["x","y","z"]', action: { type: 'create', name: 'queue', val: '["x","y","z"]', color: '#7C6AF6' } },
            { line: 1, desc: 'size = len(queue) = 3', action: { type: 'create', name: 'size', val: '3', color: '#1D9E75', from: ['queue'] } },
            { line: 2, desc: 'empty = (3 == 0) = False', action: { type: 'create', name: 'empty', val: 'False', color: '#BA7517', from: ['size'] } },
            { line: 3, desc: 'Print size = 3', action: { type: 'output', val: '3' } },
            { line: 4, desc: 'Print empty = False', action: { type: 'output', val: 'False' } },
            { line: 5, desc: 'pop(0) → queue = ["y","z"]', action: { type: 'update', name: 'queue', val: '["y","z"]', color: '#7C6AF6' } },
            { line: 6, desc: 'pop(0) → queue = ["z"]', action: { type: 'update', name: 'queue', val: '["z"]', color: '#7C6AF6' } },
            { line: 7, desc: 'pop(0) → queue = []', action: { type: 'update', name: 'queue', val: '[]', color: '#7C6AF6' } },
            { line: 8, desc: 'len(queue) == 0 → True', action: { type: 'output', val: 'True' } },
          ],
        },
        {
          id: 'queue-simulation',
          title: 'Queue simulation',
          concept: 'Real queues process the front item while new items can join the back at any time.',
          code: `queue = ["order1", "order2"]
queue.append("order3")
current = queue.pop(0)
print("Processing:", current)
queue.append("order4")
current = queue.pop(0)
print("Processing:", current)
print("Waiting:", queue)`,
          explanation:
            'New orders join the back. We process the front one. This mimics a real restaurant or job queue.',
          challenge: 'What would the final queue contain if you added "order5" before the last pop?',
          quiz: [
            { question: 'What is the first item processed?', options: ['"order3"', '"order2"', '"order1"', '"order4"'], answer: 2 },
            { question: 'What is the second item processed?', options: ['"order1"', '"order3"', '"order2"', '"order4"'], answer: 2 },
            { question: 'What is still waiting at the end?', options: ['["order3","order4"]', '["order4"]', '["order3"]', 'empty'], answer: 0 },
          ],
          nodes: [
            { id: 'queue', label: 'queue' },
            { id: 'current', label: 'current' },
          ],
          edges: [{ from: 'queue', to: 'current' }],
          steps: [
            { line: 0, desc: 'queue = ["order1","order2"]', action: { type: 'create', name: 'queue', val: '["order1","order2"]', color: '#7C6AF6' } },
            { line: 1, desc: 'append "order3" → queue has 3 orders', action: { type: 'update', name: 'queue', val: '["order1","order2","order3"]', color: '#7C6AF6' } },
            { line: 2, desc: 'pop(0) → current = "order1"', action: { type: 'create', name: 'current', val: '"order1"', color: '#1D9E75', from: ['queue'] } },
            { line: 2, desc: 'queue → ["order2","order3"]', action: { type: 'update', name: 'queue', val: '["order2","order3"]', color: '#7C6AF6' } },
            { line: 3, desc: 'Print Processing: order1', action: { type: 'output', val: 'Processing: order1' } },
            { line: 4, desc: 'append "order4" → joins the back', action: { type: 'update', name: 'queue', val: '["order2","order3","order4"]', color: '#7C6AF6' } },
            { line: 5, desc: 'pop(0) → current = "order2"', action: { type: 'update', name: 'current', val: '"order2"', color: '#1D9E75' } },
            { line: 5, desc: 'queue → ["order3","order4"]', action: { type: 'update', name: 'queue', val: '["order3","order4"]', color: '#7C6AF6' } },
            { line: 6, desc: 'Print Processing: order2', action: { type: 'output', val: 'Processing: order2' } },
            { line: 7, desc: 'Print Waiting: ["order3","order4"]', action: { type: 'output', val: 'Waiting: ["order3", "order4"]' } },
          ],
        },
      ],
    },

    // ── HARD ── Dictionaries ──────────────────────────────────────────────
    hard: {
      id: 'hard',
      label: 'Hard',
      description: "Master Python dictionaries — key-value hash maps for fast data lookups.",
      examples: [
        {
          id: 'dict-create',
          title: 'Creating a dictionary',
          concept: 'A dictionary stores key-value pairs. Look up any value instantly by its key.',
          code: `person = {"name": "Alice", "age": 22}
print(person["name"])
print(person["age"])
print(len(person))`,
          explanation:
            'Curly braces { } with key: value pairs. Access a value with dict[key]. len() counts the pairs.',
          challenge: "What would happen if you tried person[\"height\"] which doesn't exist?",
          quiz: [
            { question: 'What is `person["name"]`?', options: ['"age"', '22', '"Alice"', '"person"'], answer: 2 },
            { question: 'What is `len(person)`?', options: ['1', '3', '2', '4'], answer: 2 },
            { question: 'Which brackets create a dictionary?', options: ['[]', '()', '<>', '{}'], answer: 3 },
          ],
          nodes: [
            { id: 'person', label: 'person' },
            { id: 'person.name', label: 'name key' },
            { id: 'person.age', label: 'age key' },
          ],
          edges: [
            { from: 'person', to: 'person.name' },
            { from: 'person', to: 'person.age' },
          ],
          steps: [
            { line: 0, desc: 'Create dict with 2 key-value pairs', action: { type: 'create', name: 'person', val: '{name,age}', color: '#BA7517' } },
            { line: 0, desc: 'person["name"] = "Alice"', action: { type: 'attr', obj: 'person', attr: 'name', val: '"Alice"', color: '#7C6AF6' } },
            { line: 0, desc: 'person["age"] = 22', action: { type: 'attr', obj: 'person', attr: 'age', val: '22', color: '#1D9E75' } },
            { line: 1, desc: 'Print person["name"] = "Alice"', action: { type: 'output', val: 'Alice' } },
            { line: 2, desc: 'Print person["age"] = 22', action: { type: 'output', val: '22' } },
            { line: 3, desc: 'len(person) = 2', action: { type: 'output', val: '2' } },
          ],
        },
        {
          id: 'dict-add-update',
          title: 'Adding and updating keys',
          concept: 'Assigning to a new key adds it. Assigning to an existing key updates its value.',
          code: `scores = {"math": 80}
scores["science"] = 90
scores["math"] = 95
print(scores["math"])
print(scores["science"])`,
          explanation:
            'scores["science"] is new so Python adds it. scores["math"] already exists so it is updated in place.',
          challenge: 'What would len(scores) be after both assignments?',
          quiz: [
            { question: 'What is `scores["math"]` at the end?', options: ['80', '90', '85', '95'], answer: 3 },
            { question: 'What is `scores["science"]`?', options: ['80', '95', '90', '75'], answer: 2 },
            { question: 'What is `len(scores)` after both assignments?', options: ['1', '3', '2', '4'], answer: 2 },
          ],
          nodes: [
            { id: 'scores', label: 'scores' },
            { id: 'scores.math', label: 'math key' },
            { id: 'scores.science', label: 'science key' },
          ],
          edges: [
            { from: 'scores', to: 'scores.math' },
            { from: 'scores', to: 'scores.science' },
          ],
          steps: [
            { line: 0, desc: 'scores = {"math": 80}', action: { type: 'create', name: 'scores', val: '{"math":80}', color: '#BA7517' } },
            { line: 0, desc: 'scores["math"] = 80', action: { type: 'attr', obj: 'scores', attr: 'math', val: '80', color: '#7C6AF6' } },
            { line: 1, desc: 'New key → scores["science"] = 90', action: { type: 'attr', obj: 'scores', attr: 'science', val: '90', color: '#1D9E75' } },
            { line: 2, desc: 'Update existing → scores["math"] = 95', action: { type: 'attr', obj: 'scores', attr: 'math', val: '95', color: '#D85A30' } },
            { line: 3, desc: 'Print scores["math"] = 95', action: { type: 'output', val: '95' } },
            { line: 4, desc: 'Print scores["science"] = 90', action: { type: 'output', val: '90' } },
          ],
        },
        {
          id: 'dict-membership',
          title: 'Checking if a key exists',
          concept: 'Use the `in` operator to safely check if a key exists before accessing it.',
          code: `data = {"a": 1, "b": 2}
has_a = "a" in data
has_c = "c" in data
print(has_a)
print(has_c)`,
          explanation:
            '"a" in data is True because "a" is a key. "c" in data is False — that key does not exist.',
          challenge: 'How would you safely get a value without raising a KeyError if the key is missing?',
          quiz: [
            { question: 'What is `has_a`?', options: ['False', 'None', '1', 'True'], answer: 3 },
            { question: 'What is `has_c`?', options: ['True', 'None', 'False', 'Error'], answer: 2 },
            { question: 'What does `"x" in data` check?', options: ['If "x" is a value', 'If "x" is a key', 'If data contains the index x', 'The length of data'], answer: 1 },
          ],
          nodes: [
            { id: 'data', label: 'data' },
            { id: 'has_a', label: 'has_a' },
            { id: 'has_c', label: 'has_c' },
          ],
          edges: [
            { from: 'data', to: 'has_a' },
            { from: 'data', to: 'has_c' },
          ],
          steps: [
            { line: 0, desc: 'data = {"a":1, "b":2}', action: { type: 'create', name: 'data', val: '{"a":1,"b":2}', color: '#BA7517' } },
            { line: 1, desc: '"a" in data → True (key exists)', action: { type: 'create', name: 'has_a', val: 'True', color: '#1D9E75', from: ['data'] } },
            { line: 2, desc: '"c" in data → False (no such key)', action: { type: 'create', name: 'has_c', val: 'False', color: '#ef4444', from: ['data'] } },
            { line: 3, desc: 'Print True', action: { type: 'output', val: 'True' } },
            { line: 4, desc: 'Print False', action: { type: 'output', val: 'False' } },
          ],
        },
        {
          id: 'dict-loop',
          title: 'Looping over a dictionary',
          concept: 'Looping over a dict gives you each key. Use dict[key] to get the matching value.',
          code: `prices = {"apple": 1.5, "banana": 0.5, "cherry": 2.0}
total = 0
for item in prices:
    total = total + prices[item]
print(total)`,
          explanation:
            'Each iteration, item is a key. prices[item] gives the value. We sum all values to get the total.',
          challenge: 'What would total be if you only summed items costing more than 1.0?',
          quiz: [
            { question: 'What does `item` hold during each loop iteration?', options: ['A value', 'An index', 'A key', 'A tuple'], answer: 2 },
            { question: 'What is `total` after the loop?', options: ['3.0', '4.0', '3.5', '5.0'], answer: 1 },
            { question: 'How do you access a value inside a dict loop?', options: ['prices.item', 'item.prices', 'prices[item]', 'item[prices]'], answer: 2 },
          ],
          nodes: [
            { id: 'prices', label: 'prices' },
            { id: 'total', label: 'total' },
            { id: 'item', label: 'item' },
          ],
          edges: [{ from: 'prices', to: 'item' }, { from: 'item', to: 'total' }],
          steps: [
            { line: 0, desc: 'prices = {apple:1.5, banana:0.5, cherry:2.0}', action: { type: 'create', name: 'prices', val: '{apple,banana,cherry}', color: '#BA7517' } },
            { line: 1, desc: 'total = 0', action: { type: 'create', name: 'total', val: '0', color: '#1D9E75' } },
            { line: 2, desc: 'Loop: item = "apple"', action: { type: 'loop', name: 'item', val: '"apple"', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 0 + 1.5 = 1.5', action: { type: 'update', name: 'total', val: '1.5', from: ['item', 'total'] } },
            { line: 2, desc: 'Loop: item = "banana"', action: { type: 'loop', name: 'item', val: '"banana"', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 1.5 + 0.5 = 2.0', action: { type: 'update', name: 'total', val: '2.0', from: ['item', 'total'] } },
            { line: 2, desc: 'Loop: item = "cherry"', action: { type: 'loop', name: 'item', val: '"cherry"', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 2.0 + 2.0 = 4.0', action: { type: 'update', name: 'total', val: '4.0', from: ['item', 'total'] } },
            { line: 4, desc: 'Print total = 4.0', action: { type: 'output', val: '4.0' } },
          ],
        },
        {
          id: 'dict-frequency',
          title: 'Frequency counter',
          concept: 'A dictionary can count how many times each item appears in a list.',
          code: `words = ["cat", "dog", "cat", "bird", "dog", "cat"]
freq = {}
for w in words:
    if w in freq:
        freq[w] = freq[w] + 1
    else:
        freq[w] = 1
print(freq)`,
          explanation:
            "For each word, check if it's a key already. If yes add 1. If no, start at 1. Result: counts per word.",
          challenge: 'What would freq look like if "bird" appeared 3 times?',
          quiz: [
            { question: 'What is `freq["cat"]` at the end?', options: ['1', '2', '3', '4'], answer: 2 },
            { question: 'What is `freq["dog"]` at the end?', options: ['3', '2', '1', '4'], answer: 1 },
            { question: 'What does `if w in freq` check?', options: ['If w is a value', 'If w has been seen before (is a key)', 'If freq is empty', 'If w is a number'], answer: 1 },
          ],
          nodes: [
            { id: 'words', label: 'words' },
            { id: 'freq', label: 'freq' },
            { id: 'w', label: 'w' },
          ],
          edges: [{ from: 'words', to: 'w' }, { from: 'w', to: 'freq' }],
          steps: [
            { line: 0, desc: 'words = ["cat","dog","cat","bird","dog","cat"]', action: { type: 'create', name: 'words', val: '["cat","dog",...]', color: '#7C6AF6' } },
            { line: 1, desc: 'freq = {} (empty dict)', action: { type: 'create', name: 'freq', val: '{}', color: '#BA7517' } },
            { line: 2, desc: 'Loop: w = "cat" (1st time)', action: { type: 'loop', name: 'w', val: '"cat"', target: 'words', color: '#E24B4A' } },
            { line: 6, desc: '"cat" not in freq → freq["cat"] = 1', action: { type: 'update', name: 'freq', val: '{"cat":1}', color: '#BA7517' } },
            { line: 2, desc: 'Loop: w = "dog" (1st time)', action: { type: 'loop', name: 'w', val: '"dog"', target: 'words', color: '#E24B4A' } },
            { line: 6, desc: '"dog" not in freq → freq["dog"] = 1', action: { type: 'update', name: 'freq', val: '{"cat":1,"dog":1}', color: '#BA7517' } },
            { line: 2, desc: 'Loop: w = "cat" (2nd time)', action: { type: 'loop', name: 'w', val: '"cat"', target: 'words', color: '#E24B4A' } },
            { line: 4, desc: '"cat" in freq → freq["cat"] = 2', action: { type: 'update', name: 'freq', val: '{"cat":2,"dog":1}', color: '#BA7517' } },
            { line: 2, desc: 'Loop: w = "bird"', action: { type: 'loop', name: 'w', val: '"bird"', target: 'words', color: '#E24B4A' } },
            { line: 6, desc: '"bird" not in freq → freq["bird"] = 1', action: { type: 'update', name: 'freq', val: '{"cat":2,"dog":1,"bird":1}', color: '#BA7517' } },
            { line: 2, desc: 'Loop: w = "dog" (2nd time)', action: { type: 'loop', name: 'w', val: '"dog"', target: 'words', color: '#E24B4A' } },
            { line: 4, desc: '"dog" in freq → freq["dog"] = 2', action: { type: 'update', name: 'freq', val: '{"cat":2,"dog":2,"bird":1}', color: '#BA7517' } },
            { line: 2, desc: 'Loop: w = "cat" (3rd time)', action: { type: 'loop', name: 'w', val: '"cat"', target: 'words', color: '#E24B4A' } },
            { line: 4, desc: '"cat" in freq → freq["cat"] = 3', action: { type: 'update', name: 'freq', val: '{"cat":3,"dog":2,"bird":1}', color: '#BA7517' } },
            { line: 7, desc: 'Print {"cat":3,"dog":2,"bird":1}', action: { type: 'output', val: '{"cat": 3, "dog": 2, "bird": 1}' } },
          ],
        },
      ],
    },
  },
};
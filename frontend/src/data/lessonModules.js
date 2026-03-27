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
    available: true,
  },
  {
    id: 'type-4',
    number: 4,
    title: 'System Design Basics',
    description:
      'Learn fundamental system design concepts with real-world scenario walkthroughs.',
    color: 'bg-rose-600',
    available: true,
  },
];

export function getLessonModule(lessonId) {
  switch (lessonId) {
    case 'type-1':
      return lessonTypeOneModule;
    case 'type-2':
      return lessonTypeTwoModule;
    case 'type-3':
      return lessonTypeThreeModule;
    case 'type-4':
      return lessonTypeFourModule;
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

// ─────────────────────────────────────────────────────────────────────────────
// Lesson Type 3 — Algorithm Patterns
// 4 difficulties × 5 examples = 20 examples
// Beginner: Searching | Easy: Sorting | Medium: Recursion | Hard: Two Pointers
// ─────────────────────────────────────────────────────────────────────────────
export const lessonTypeThreeModule = {
  id: 'algorithm-patterns-type-3',
  title: 'Algorithm Patterns',
  lessonType: {
    id: 'type-3',
    label: 'Type 3',
    name: 'Algorithm pattern visualizer',
    totalTypes: 4,
  },
  summary:
    'Master common algorithm patterns — searching, sorting, recursion, and two pointers — through animated step-by-step examples that show exactly how each pattern works.',
  difficultyOrder: ['beginner', 'easy', 'medium', 'hard'],
  difficulties: {

    // ── BEGINNER ── Searching ─────────────────────────────────────────────
    beginner: {
      id: 'beginner',
      label: 'Beginner',
      description: 'Learn searching patterns — scan, find, and compare values in a list.',
      examples: [
        {
          id: 'linear-search',
          title: 'Linear search',
          concept: 'Check every element one by one until you find the target.',
          code: `nums = [4, 7, 2, 9, 1]
target = 9
found = -1
for i in range(len(nums)):
    if nums[i] == target:
        found = i
print(found)`,
          explanation: 'We walk through each index. When nums[i] matches the target we save that index in found.',
          challenge: 'What would found be if target was 99?',
          quiz: [
            { question: 'What is `found` after the loop?', options: ['-1', '3', '4', '9'], answer: 1 },
            { question: 'How many elements does linear search check in the worst case?', options: ['1', 'Half the list', 'All elements', 'None'], answer: 2 },
            { question: 'What value of `found` means the target was NOT found?', options: ['0', '1', '-1', 'None'], answer: 2 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'target', label: 'target' },
            { id: 'found', label: 'found' },
            { id: 'i', label: 'i' },
          ],
          edges: [{ from: 'nums', to: 'i' }, { from: 'i', to: 'found' }],
          steps: [
            { line: 0, desc: 'nums = [4,7,2,9,1]', action: { type: 'create', name: 'nums', val: '[4,7,2,9,1]', color: '#1D9E75' } },
            { line: 1, desc: 'target = 9', action: { type: 'create', name: 'target', val: '9', color: '#7C6AF6' } },
            { line: 2, desc: 'found = -1 (not found yet)', action: { type: 'create', name: 'found', val: '-1', color: '#ef4444' } },
            { line: 3, desc: 'Loop: i = 0, nums[0] = 4 ≠ 9', action: { type: 'loop', name: 'i', val: '0', target: 'nums', color: '#E24B4A' } },
            { line: 3, desc: 'Loop: i = 1, nums[1] = 7 ≠ 9', action: { type: 'loop', name: 'i', val: '1', target: 'nums', color: '#E24B4A' } },
            { line: 3, desc: 'Loop: i = 2, nums[2] = 2 ≠ 9', action: { type: 'loop', name: 'i', val: '2', target: 'nums', color: '#E24B4A' } },
            { line: 3, desc: 'Loop: i = 3, nums[3] = 9 == target!', action: { type: 'loop', name: 'i', val: '3', target: 'nums', color: '#E24B4A' } },
            { line: 5, desc: 'found = 3 (target is at index 3)', action: { type: 'update', name: 'found', val: '3', color: '#1D9E75' } },
            { line: 6, desc: 'Print found = 3', action: { type: 'output', val: '3' } },
          ],
        },
        {
          id: 'find-max',
          title: 'Finding the maximum',
          concept: 'Track the largest value seen so far as you scan through the list.',
          code: `scores = [42, 87, 55, 91, 73]
max_val = scores[0]
for s in scores:
    if s > max_val:
        max_val = s
print(max_val)`,
          explanation: 'Start by assuming the first item is the max. Replace it whenever a bigger value is found.',
          challenge: 'What would the algorithm do differently if the list was already sorted descending?',
          quiz: [
            { question: 'What is `max_val` at the end?', options: ['87', '73', '91', '55'], answer: 2 },
            { question: 'Why do we start `max_val = scores[0]`?', options: ['It must be the max', 'We need a starting comparison point', 'The first item is always largest', 'It is required by Python'], answer: 1 },
            { question: 'How many comparisons does this algorithm make?', options: ['1', 'len(scores) - 1', 'len(scores)', 'len(scores) + 1'], answer: 2 },
          ],
          nodes: [
            { id: 'scores', label: 'scores' },
            { id: 'max_val', label: 'max_val' },
            { id: 's', label: 's' },
          ],
          edges: [{ from: 'scores', to: 's' }, { from: 's', to: 'max_val' }],
          steps: [
            { line: 0, desc: 'scores = [42,87,55,91,73]', action: { type: 'create', name: 'scores', val: '[42,87,55,91,73]', color: '#1D9E75' } },
            { line: 1, desc: 'max_val = scores[0] = 42', action: { type: 'create', name: 'max_val', val: '42', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: s = 42, 42 > 42? No', action: { type: 'loop', name: 's', val: '42', target: 'scores', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: s = 87, 87 > 42? Yes!', action: { type: 'loop', name: 's', val: '87', target: 'scores', color: '#E24B4A' } },
            { line: 4, desc: 'max_val = 87', action: { type: 'update', name: 'max_val', val: '87', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: s = 55, 55 > 87? No', action: { type: 'loop', name: 's', val: '55', target: 'scores', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: s = 91, 91 > 87? Yes!', action: { type: 'loop', name: 's', val: '91', target: 'scores', color: '#E24B4A' } },
            { line: 4, desc: 'max_val = 91', action: { type: 'update', name: 'max_val', val: '91', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: s = 73, 73 > 91? No', action: { type: 'loop', name: 's', val: '73', target: 'scores', color: '#E24B4A' } },
            { line: 5, desc: 'Print max_val = 91', action: { type: 'output', val: '91' } },
          ],
        },
        {
          id: 'find-min',
          title: 'Finding the minimum',
          concept: 'The same pattern as max — but update when a SMALLER value is found.',
          code: `temps = [22, 15, 30, 8, 19]
min_val = temps[0]
for t in temps:
    if t < min_val:
        min_val = t
print(min_val)`,
          explanation: 'Start with the first item. Whenever a smaller temperature is found, update min_val.',
          challenge: 'Could you find both min and max in a single loop?',
          quiz: [
            { question: 'What is `min_val` at the end?', options: ['15', '8', '19', '22'], answer: 1 },
            { question: 'What is the only difference from the max pattern?', options: ['We use a different variable', 'The condition is < instead of >', 'We loop in reverse', 'We start from index 1'], answer: 1 },
            { question: 'What is `min_val` after seeing 22 and 15?', options: ['22', '19', '15', '8'], answer: 2 },
          ],
          nodes: [
            { id: 'temps', label: 'temps' },
            { id: 'min_val', label: 'min_val' },
            { id: 't', label: 't' },
          ],
          edges: [{ from: 'temps', to: 't' }, { from: 't', to: 'min_val' }],
          steps: [
            { line: 0, desc: 'temps = [22,15,30,8,19]', action: { type: 'create', name: 'temps', val: '[22,15,30,8,19]', color: '#1D9E75' } },
            { line: 1, desc: 'min_val = temps[0] = 22', action: { type: 'create', name: 'min_val', val: '22', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: t = 22, 22 < 22? No', action: { type: 'loop', name: 't', val: '22', target: 'temps', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: t = 15, 15 < 22? Yes!', action: { type: 'loop', name: 't', val: '15', target: 'temps', color: '#E24B4A' } },
            { line: 4, desc: 'min_val = 15', action: { type: 'update', name: 'min_val', val: '15', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: t = 30, 30 < 15? No', action: { type: 'loop', name: 't', val: '30', target: 'temps', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: t = 8, 8 < 15? Yes!', action: { type: 'loop', name: 't', val: '8', target: 'temps', color: '#E24B4A' } },
            { line: 4, desc: 'min_val = 8', action: { type: 'update', name: 'min_val', val: '8', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: t = 19, 19 < 8? No', action: { type: 'loop', name: 't', val: '19', target: 'temps', color: '#E24B4A' } },
            { line: 5, desc: 'Print min_val = 8', action: { type: 'output', val: '8' } },
          ],
        },
        {
          id: 'count-pattern',
          title: 'Counting with a condition',
          concept: 'Scan the list and increment a counter each time a condition is true.',
          code: `nums = [3, 8, 2, 7, 4, 9, 1]
count = 0
for n in nums:
    if n > 5:
        count = count + 1
print(count)`,
          explanation: 'count starts at 0. Each time n > 5 we add 1. The numbers greater than 5 are 8, 7, 9 — so count = 3.',
          challenge: 'How would you count numbers that are even instead?',
          quiz: [
            { question: 'What is `count` at the end?', options: ['2', '4', '3', '5'], answer: 2 },
            { question: 'Which values trigger the counter?', options: ['3, 2, 4, 1', '8, 7, 9', '3, 8, 7', '8, 7, 4, 9'], answer: 1 },
            { question: 'What is `count` after seeing just 3 and 8?', options: ['0', '2', '1', '3'], answer: 2 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'count', label: 'count' },
            { id: 'n', label: 'n' },
          ],
          edges: [{ from: 'nums', to: 'n' }, { from: 'n', to: 'count' }],
          steps: [
            { line: 0, desc: 'nums = [3,8,2,7,4,9,1]', action: { type: 'create', name: 'nums', val: '[3,8,2,7,4,9,1]', color: '#1D9E75' } },
            { line: 1, desc: 'count = 0', action: { type: 'create', name: 'count', val: '0', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: n = 3, 3 > 5? No', action: { type: 'loop', name: 'n', val: '3', target: 'nums', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: n = 8, 8 > 5? Yes!', action: { type: 'loop', name: 'n', val: '8', target: 'nums', color: '#E24B4A' } },
            { line: 4, desc: 'count = 0 + 1 = 1', action: { type: 'update', name: 'count', val: '1', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: n = 2, 2 > 5? No', action: { type: 'loop', name: 'n', val: '2', target: 'nums', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: n = 7, 7 > 5? Yes!', action: { type: 'loop', name: 'n', val: '7', target: 'nums', color: '#E24B4A' } },
            { line: 4, desc: 'count = 1 + 1 = 2', action: { type: 'update', name: 'count', val: '2', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: n = 4, 4 > 5? No', action: { type: 'loop', name: 'n', val: '4', target: 'nums', color: '#E24B4A' } },
            { line: 2, desc: 'Loop: n = 9, 9 > 5? Yes!', action: { type: 'loop', name: 'n', val: '9', target: 'nums', color: '#E24B4A' } },
            { line: 4, desc: 'count = 2 + 1 = 3', action: { type: 'update', name: 'count', val: '3', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: n = 1, 1 > 5? No', action: { type: 'loop', name: 'n', val: '1', target: 'nums', color: '#E24B4A' } },
            { line: 5, desc: 'Print count = 3', action: { type: 'output', val: '3' } },
          ],
        },
        {
          id: 'sum-accumulate',
          title: 'Accumulator pattern',
          concept: 'Start at zero and keep adding each value to build up a running total.',
          code: `prices = [12, 5, 8, 20, 3]
total = 0
for p in prices:
    total = total + p
print(total)
average = total / len(prices)
print(average)`,
          explanation: 'total grows with each price. After the loop total = 48. Dividing by 5 items gives average = 9.6.',
          challenge: 'What would happen if prices was an empty list []?',
          quiz: [
            { question: 'What is `total` after the loop?', options: ['40', '48', '45', '50'], answer: 1 },
            { question: 'What is `average`?', options: ['8.0', '10.0', '9.6', '9.0'], answer: 2 },
            { question: 'What is the value of `total` after seeing 12 and 5?', options: ['12', '5', '17', '60'], answer: 2 },
          ],
          nodes: [
            { id: 'prices', label: 'prices' },
            { id: 'total', label: 'total' },
            { id: 'average', label: 'average' },
            { id: 'p', label: 'p' },
          ],
          edges: [{ from: 'prices', to: 'p' }, { from: 'p', to: 'total' }, { from: 'total', to: 'average' }],
          steps: [
            { line: 0, desc: 'prices = [12,5,8,20,3]', action: { type: 'create', name: 'prices', val: '[12,5,8,20,3]', color: '#1D9E75' } },
            { line: 1, desc: 'total = 0', action: { type: 'create', name: 'total', val: '0', color: '#7C6AF6' } },
            { line: 2, desc: 'Loop: p = 12', action: { type: 'loop', name: 'p', val: '12', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 0 + 12 = 12', action: { type: 'update', name: 'total', val: '12', from: ['p', 'total'] } },
            { line: 2, desc: 'Loop: p = 5', action: { type: 'loop', name: 'p', val: '5', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 12 + 5 = 17', action: { type: 'update', name: 'total', val: '17', from: ['p', 'total'] } },
            { line: 2, desc: 'Loop: p = 8', action: { type: 'loop', name: 'p', val: '8', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 17 + 8 = 25', action: { type: 'update', name: 'total', val: '25', from: ['p', 'total'] } },
            { line: 2, desc: 'Loop: p = 20', action: { type: 'loop', name: 'p', val: '20', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 25 + 20 = 45', action: { type: 'update', name: 'total', val: '45', from: ['p', 'total'] } },
            { line: 2, desc: 'Loop: p = 3', action: { type: 'loop', name: 'p', val: '3', target: 'prices', color: '#E24B4A' } },
            { line: 3, desc: 'total = 45 + 3 = 48', action: { type: 'update', name: 'total', val: '48', from: ['p', 'total'] } },
            { line: 4, desc: 'Print total = 48', action: { type: 'output', val: '48' } },
            { line: 5, desc: 'average = 48 / 5 = 9.6', action: { type: 'create', name: 'average', val: '9.6', color: '#BA7517', from: ['total'] } },
            { line: 6, desc: 'Print average = 9.6', action: { type: 'output', val: '9.6' } },
          ],
        },
      ],
    },

    // ── EASY ── Sorting ───────────────────────────────────────────────────
    easy: {
      id: 'easy',
      label: 'Easy',
      description: 'Learn sorting patterns — arrange items in order using classic algorithms.',
      examples: [
        {
          id: 'bubble-sort',
          title: 'Bubble sort',
          concept: 'Repeatedly swap adjacent items if they are in the wrong order.',
          code: `arr = [5, 3, 8, 1]
for i in range(len(arr)):
    for j in range(len(arr) - 1):
        if arr[j] > arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], arr[j]
print(arr)`,
          explanation: 'Larger values "bubble up" to the end with each pass. After enough passes the list is sorted.',
          challenge: 'How many passes does bubble sort need in the worst case?',
          quiz: [
            { question: 'What is `arr` after the sort?', options: ['[5,3,8,1]', '[1,3,5,8]', '[8,5,3,1]', '[1,5,3,8]'], answer: 1 },
            { question: 'What does a swap do in bubble sort?', options: ['Removes an element', 'Moves larger element one step right', 'Reverses the list', 'Finds the minimum'], answer: 1 },
            { question: 'What is the time complexity of bubble sort?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 2 },
          ],
          nodes: [{ id: 'arr', label: 'arr' }],
          edges: [],
          steps: [
            { line: 0, desc: 'arr = [5,3,8,1]', action: { type: 'create', name: 'arr', val: '[5,3,8,1]', color: '#D85A30' } },
            { line: 3, desc: 'Compare 5,3 → swap → [3,5,8,1]', action: { type: 'update', name: 'arr', val: '[3,5,8,1]', color: '#D85A30' } },
            { line: 3, desc: 'Compare 5,8 → ok, no swap', action: { type: 'update', name: 'arr', val: '[3,5,8,1]', color: '#D85A30' } },
            { line: 3, desc: 'Compare 8,1 → swap → [3,5,1,8]', action: { type: 'update', name: 'arr', val: '[3,5,1,8]', color: '#D85A30' } },
            { line: 3, desc: 'Pass 2: Compare 3,5 → ok', action: { type: 'update', name: 'arr', val: '[3,5,1,8]', color: '#D85A30' } },
            { line: 3, desc: 'Compare 5,1 → swap → [3,1,5,8]', action: { type: 'update', name: 'arr', val: '[3,1,5,8]', color: '#D85A30' } },
            { line: 3, desc: 'Compare 5,8 → ok, no swap', action: { type: 'update', name: 'arr', val: '[3,1,5,8]', color: '#D85A30' } },
            { line: 3, desc: 'Pass 3: Compare 3,1 → swap → [1,3,5,8]', action: { type: 'update', name: 'arr', val: '[1,3,5,8]', color: '#D85A30' } },
            { line: 3, desc: 'Compare 3,5 → ok | Compare 5,8 → ok', action: { type: 'update', name: 'arr', val: '[1,3,5,8]', color: '#D85A30' } },
            { line: 5, desc: 'Print sorted arr', action: { type: 'output', val: '[1, 3, 5, 8]' } },
          ],
        },
        {
          id: 'selection-sort',
          title: 'Selection sort',
          concept: 'Find the smallest remaining element and move it to the correct position.',
          code: `arr = [64, 25, 12, 22]
for i in range(len(arr)):
    min_idx = i
    for j in range(i+1, len(arr)):
        if arr[j] < arr[min_idx]:
            min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
print(arr)`,
          explanation: 'In each pass, we find the minimum of the unsorted part and swap it to the front.',
          challenge: 'How many swaps does selection sort make at most?',
          quiz: [
            { question: 'What is `arr` after the sort?', options: ['[64,25,12,22]', '[22,25,12,64]', '[12,22,25,64]', '[12,64,22,25]'], answer: 2 },
            { question: 'What is `min_idx` used for?', options: ['The current loop counter', 'The index of the smallest found so far', 'The value to swap', 'The sorted portion length'], answer: 1 },
            { question: 'How many swaps does selection sort make at most?', options: ['n²', '1', 'n', 'n-1'], answer: 3 },
          ],
          nodes: [
            { id: 'arr', label: 'arr' },
            { id: 'min_idx', label: 'min_idx' },
          ],
          edges: [{ from: 'arr', to: 'min_idx' }],
          steps: [
            { line: 0, desc: 'arr = [64,25,12,22]', action: { type: 'create', name: 'arr', val: '[64,25,12,22]', color: '#D85A30' } },
            { line: 2, desc: 'Pass 1: min_idx = 0 (value 64)', action: { type: 'create', name: 'min_idx', val: '0', color: '#7C6AF6' } },
            { line: 4, desc: 'j=1: 25 < 64 → min_idx = 1', action: { type: 'update', name: 'min_idx', val: '1', color: '#7C6AF6' } },
            { line: 4, desc: 'j=2: 12 < 25 → min_idx = 2', action: { type: 'update', name: 'min_idx', val: '2', color: '#7C6AF6' } },
            { line: 4, desc: 'j=3: 22 > 12, no change', action: { type: 'update', name: 'min_idx', val: '2', color: '#7C6AF6' } },
            { line: 6, desc: 'Swap arr[0] and arr[2] → [12,25,64,22]', action: { type: 'update', name: 'arr', val: '[12,25,64,22]', color: '#D85A30' } },
            { line: 2, desc: 'Pass 2: min_idx = 1 (value 25)', action: { type: 'update', name: 'min_idx', val: '1', color: '#7C6AF6' } },
            { line: 4, desc: 'j=2: 64 > 25 | j=3: 22 < 25 → min_idx = 3', action: { type: 'update', name: 'min_idx', val: '3', color: '#7C6AF6' } },
            { line: 6, desc: 'Swap arr[1] and arr[3] → [12,22,64,25]', action: { type: 'update', name: 'arr', val: '[12,22,64,25]', color: '#D85A30' } },
            { line: 2, desc: 'Pass 3: find min in [64,25] → min_idx = 3', action: { type: 'update', name: 'min_idx', val: '3', color: '#7C6AF6' } },
            { line: 6, desc: 'Swap arr[2] and arr[3] → [12,22,25,64]', action: { type: 'update', name: 'arr', val: '[12,22,25,64]', color: '#D85A30' } },
            { line: 7, desc: 'Print sorted arr', action: { type: 'output', val: '[12, 22, 25, 64]' } },
          ],
        },
        {
          id: 'insertion-sort',
          title: 'Insertion sort',
          concept: 'Insert each new element into its correct position among already-sorted elements.',
          code: `arr = [4, 2, 7, 1, 5]
for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j = j - 1
    arr[j+1] = key
print(arr)`,
          explanation: 'Like sorting cards in your hand — pick the next card and slide it left until it fits.',
          challenge: 'What is the best case for insertion sort — when does it make fewest moves?',
          quiz: [
            { question: 'What is `arr` after the sort?', options: ['[4,2,7,1,5]', '[7,5,4,2,1]', '[1,2,4,5,7]', '[1,4,2,5,7]'], answer: 2 },
            { question: 'What does the `key` variable hold?', options: ['The sorted portion length', 'The element being inserted', 'The minimum value', 'The loop counter'], answer: 1 },
            { question: 'When is insertion sort most efficient?', options: ['Random data', 'Reverse sorted data', 'Already sorted data', 'Very large lists'], answer: 2 },
          ],
          nodes: [
            { id: 'arr', label: 'arr' },
            { id: 'key', label: 'key' },
          ],
          edges: [{ from: 'arr', to: 'key' }],
          steps: [
            { line: 0, desc: 'arr = [4,2,7,1,5]', action: { type: 'create', name: 'arr', val: '[4,2,7,1,5]', color: '#D85A30' } },
            { line: 2, desc: 'i=1: key = arr[1] = 2', action: { type: 'create', name: 'key', val: '2', color: '#7C6AF6' } },
            { line: 4, desc: '4 > 2 → shift 4 right → [4,4,7,1,5]', action: { type: 'update', name: 'arr', val: '[4,4,7,1,5]', color: '#D85A30' } },
            { line: 7, desc: 'Insert 2 at index 0 → [2,4,7,1,5]', action: { type: 'update', name: 'arr', val: '[2,4,7,1,5]', color: '#D85A30' } },
            { line: 2, desc: 'i=2: key = arr[2] = 7', action: { type: 'update', name: 'key', val: '7', color: '#7C6AF6' } },
            { line: 4, desc: '4 < 7 → 7 already in place', action: { type: 'update', name: 'arr', val: '[2,4,7,1,5]', color: '#D85A30' } },
            { line: 2, desc: 'i=3: key = arr[3] = 1', action: { type: 'update', name: 'key', val: '1', color: '#7C6AF6' } },
            { line: 4, desc: 'Shift 7,4,2 right → [2,2,4,7,5]', action: { type: 'update', name: 'arr', val: '[2,2,4,7,5]', color: '#D85A30' } },
            { line: 7, desc: 'Insert 1 at index 0 → [1,2,4,7,5]', action: { type: 'update', name: 'arr', val: '[1,2,4,7,5]', color: '#D85A30' } },
            { line: 2, desc: 'i=4: key = arr[4] = 5', action: { type: 'update', name: 'key', val: '5', color: '#7C6AF6' } },
            { line: 4, desc: '7 > 5 → shift 7 → insert 5 → [1,2,4,5,7]', action: { type: 'update', name: 'arr', val: '[1,2,4,5,7]', color: '#D85A30' } },
            { line: 8, desc: 'Print sorted arr', action: { type: 'output', val: '[1, 2, 4, 5, 7]' } },
          ],
        },
        {
          id: 'sort-builtin',
          title: "Python's built-in sort",
          concept: 'sorted() returns a new sorted list. sort() sorts the list in place.',
          code: `nums = [5, 2, 8, 1, 9]
asc = sorted(nums)
desc = sorted(nums, reverse=True)
print(asc)
print(desc)
nums.sort()
print(nums)`,
          explanation: 'sorted() leaves the original unchanged and returns a new list. sort() modifies nums directly.',
          challenge: 'What would nums look like after sorted(nums) but before nums.sort()?',
          quiz: [
            { question: 'What is `asc`?', options: ['[9,8,5,2,1]', '[5,2,8,1,9]', '[1,2,5,8,9]', 'None'], answer: 2 },
            { question: 'What is `desc`?', options: ['[1,2,5,8,9]', '[9,8,5,2,1]', '[5,2,8,1,9]', '[9,5,8,1,2]'], answer: 1 },
            { question: 'What is the key difference between sorted() and sort()?', options: ['sorted is faster', 'sort returns a new list, sorted modifies in place', 'sorted returns a new list, sort modifies in place', 'No difference'], answer: 2 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'asc', label: 'asc' },
            { id: 'desc', label: 'desc' },
          ],
          edges: [{ from: 'nums', to: 'asc' }, { from: 'nums', to: 'desc' }],
          steps: [
            { line: 0, desc: 'nums = [5,2,8,1,9]', action: { type: 'create', name: 'nums', val: '[5,2,8,1,9]', color: '#D85A30' } },
            { line: 1, desc: 'sorted(nums) → new sorted list', action: { type: 'create', name: 'asc', val: '[1,2,5,8,9]', color: '#1D9E75', from: ['nums'] } },
            { line: 2, desc: 'sorted(nums, reverse=True) → descending', action: { type: 'create', name: 'desc', val: '[9,8,5,2,1]', color: '#7C6AF6', from: ['nums'] } },
            { line: 3, desc: 'Print asc', action: { type: 'output', val: '[1, 2, 5, 8, 9]' } },
            { line: 4, desc: 'Print desc', action: { type: 'output', val: '[9, 8, 5, 2, 1]' } },
            { line: 5, desc: 'nums.sort() → modifies nums in place', action: { type: 'update', name: 'nums', val: '[1,2,5,8,9]', color: '#D85A30' } },
            { line: 6, desc: 'Print nums (now sorted)', action: { type: 'output', val: '[1, 2, 5, 8, 9]' } },
          ],
        },
        {
          id: 'sort-key',
          title: 'Sorting with a key',
          concept: 'Pass a key function to sort by a custom property — like string length.',
          code: `words = ["banana", "fig", "cherry", "kiwi"]
by_length = sorted(words, key=len)
print(by_length)
by_last = sorted(words, key=lambda w: w[-1])
print(by_last)`,
          explanation: 'key=len sorts by how long each word is. key=lambda w: w[-1] sorts by last character.',
          challenge: 'How would you sort words alphabetically by their second character?',
          quiz: [
            { question: 'What is `by_length`?', options: ['["banana","cherry","kiwi","fig"]', '["fig","kiwi","banana","cherry"]', '["fig","kiwi","cherry","banana"]', '["cherry","banana","kiwi","fig"]'], answer: 1 },
            { question: 'What does `key=len` mean?', options: ['Sort by value', 'Use the len() of each item as the sort key', 'Sort by index', 'Sort descending'], answer: 1 },
            { question: 'What does `lambda w: w[-1]` return for "banana"?', options: ['"b"', '"a"', '"n"', '"banana"'], answer: 1 },
          ],
          nodes: [
            { id: 'words', label: 'words' },
            { id: 'by_length', label: 'by_length' },
            { id: 'by_last', label: 'by_last' },
          ],
          edges: [{ from: 'words', to: 'by_length' }, { from: 'words', to: 'by_last' }],
          steps: [
            { line: 0, desc: 'words = ["banana","fig","cherry","kiwi"]', action: { type: 'create', name: 'words', val: '["banana","fig",...]', color: '#7C6AF6' } },
            { line: 1, desc: 'Sort by len: fig(3) kiwi(4) banana(6) cherry(6)', action: { type: 'create', name: 'by_length', val: '["fig","kiwi","banana","cherry"]', color: '#1D9E75', from: ['words'] } },
            { line: 2, desc: 'Print by_length', action: { type: 'output', val: '["fig", "kiwi", "banana", "cherry"]' } },
            { line: 3, desc: 'Sort by last char: a→banana,a→kiwi,e→apple,y→cherry', action: { type: 'create', name: 'by_last', val: '["banana","kiwi","fig","cherry"]', color: '#D85A30', from: ['words'] } },
            { line: 4, desc: 'Print by_last', action: { type: 'output', val: '["banana", "kiwi", "fig", "cherry"]' } },
          ],
        },
      ],
    },

    // ── MEDIUM ── Recursion ───────────────────────────────────────────────
    medium: {
      id: 'medium',
      label: 'Medium',
      description: 'Understand recursion — functions that call themselves to solve smaller versions of the same problem.',
      examples: [
        {
          id: 'recursion-intro',
          title: 'What is recursion?',
          concept: 'A recursive function calls itself with a smaller input until it hits the base case.',
          code: `def countdown(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`,
          explanation: 'countdown(3) prints 3, then calls countdown(2), which prints 2, then 1, then 0 triggers "Go!".',
          challenge: 'What would happen if you forgot the base case (n == 0)?',
          quiz: [
            { question: 'What is the base case in countdown?', options: ['n > 0', 'n == 0', 'n < 0', 'n == 1'], answer: 1 },
            { question: 'What gets printed first?', options: ['"Go!"', '1', '3', '0'], answer: 2 },
            { question: 'Without a base case, what happens?', options: ['Nothing prints', 'It prints once', 'Infinite recursion (crash)', 'It returns 0'], answer: 2 },
          ],
          nodes: [
            { id: 'countdown', label: 'countdown' },
            { id: 'n', label: 'n' },
          ],
          edges: [{ from: 'countdown', to: 'n' }],
          steps: [
            { line: 0, desc: 'Define countdown function', action: { type: 'fn_def', name: 'countdown', color: '#D85A30' } },
            { line: 7, desc: 'Call countdown(3)', action: { type: 'fn_call', name: 'countdown', arg: '3' } },
            { line: 1, desc: 'n=3, 3==0? No', action: { type: 'create', name: 'n', val: '3', color: '#7C6AF6' } },
            { line: 4, desc: 'Print 3', action: { type: 'output', val: '3' } },
            { line: 5, desc: 'Call countdown(2)', action: { type: 'fn_call', name: 'countdown', arg: '2' } },
            { line: 1, desc: 'n=2, 2==0? No', action: { type: 'update', name: 'n', val: '2', color: '#7C6AF6' } },
            { line: 4, desc: 'Print 2', action: { type: 'output', val: '2' } },
            { line: 5, desc: 'Call countdown(1)', action: { type: 'fn_call', name: 'countdown', arg: '1' } },
            { line: 1, desc: 'n=1, 1==0? No', action: { type: 'update', name: 'n', val: '1', color: '#7C6AF6' } },
            { line: 4, desc: 'Print 1', action: { type: 'output', val: '1' } },
            { line: 5, desc: 'Call countdown(0)', action: { type: 'fn_call', name: 'countdown', arg: '0' } },
            { line: 1, desc: 'n=0, base case hit!', action: { type: 'update', name: 'n', val: '0', color: '#1D9E75' } },
            { line: 2, desc: 'Print "Go!"', action: { type: 'output', val: 'Go!' } },
          ],
        },
        {
          id: 'factorial',
          title: 'Factorial with recursion',
          concept: 'n! = n × (n-1)! — multiply n by the factorial of the smaller number below it.',
          code: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

result = factorial(4)
print(result)`,
          explanation: 'factorial(4) = 4 × factorial(3) = 4 × 3 × 2 × 1 × 1 = 24.',
          challenge: 'What is factorial(0)? Why is the base case set to return 1?',
          quiz: [
            { question: 'What is `result`?', options: ['12', '16', '24', '10'], answer: 2 },
            { question: 'What does factorial(1) return?', options: ['0', '2', '1', '-1'], answer: 2 },
            { question: 'What is the base case?', options: ['n == 1', 'n == -1', 'n > 0', 'n == 0'], answer: 3 },
          ],
          nodes: [
            { id: 'factorial', label: 'factorial' },
            { id: 'result', label: 'result' },
            { id: 'n', label: 'n' },
          ],
          edges: [{ from: 'factorial', to: 'result' }],
          steps: [
            { line: 0, desc: 'Define factorial function', action: { type: 'fn_def', name: 'factorial', color: '#D85A30' } },
            { line: 5, desc: 'Call factorial(4)', action: { type: 'fn_call', name: 'factorial', arg: '4' } },
            { line: 1, desc: 'n=4, 4==0? No', action: { type: 'create', name: 'n', val: '4', color: '#7C6AF6' } },
            { line: 3, desc: 'Return 4 × factorial(3) — call factorial(3)', action: { type: 'fn_call', name: 'factorial', arg: '3' } },
            { line: 1, desc: 'n=3, 3==0? No', action: { type: 'update', name: 'n', val: '3', color: '#7C6AF6' } },
            { line: 3, desc: 'Return 3 × factorial(2) — call factorial(2)', action: { type: 'fn_call', name: 'factorial', arg: '2' } },
            { line: 1, desc: 'n=2, 2==0? No', action: { type: 'update', name: 'n', val: '2', color: '#7C6AF6' } },
            { line: 3, desc: 'Return 2 × factorial(1) — call factorial(1)', action: { type: 'fn_call', name: 'factorial', arg: '1' } },
            { line: 1, desc: 'n=1, 1==0? No', action: { type: 'update', name: 'n', val: '1', color: '#7C6AF6' } },
            { line: 3, desc: 'Return 1 × factorial(0) — call factorial(0)', action: { type: 'fn_call', name: 'factorial', arg: '0' } },
            { line: 1, desc: 'n=0, base case! Return 1', action: { type: 'update', name: 'n', val: '0', color: '#1D9E75' } },
            { line: 3, desc: 'Unwind: 1×1=1, 2×1=2, 3×2=6, 4×6=24', action: { type: 'fn_return', ret: 'result', val: '24' } },
            { line: 5, desc: 'result = 24', action: { type: 'create', name: 'result', val: '24', color: '#1D9E75' } },
            { line: 6, desc: 'Print 24', action: { type: 'output', val: '24' } },
          ],
        },
        {
          id: 'fibonacci',
          title: 'Fibonacci with recursion',
          concept: 'Each Fibonacci number is the sum of the two before it: fib(n) = fib(n-1) + fib(n-2).',
          code: `def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(5))`,
          explanation: 'fib(5) = fib(4)+fib(3) = (fib(3)+fib(2))+(fib(2)+fib(1)) and so on. Answer is 5.',
          challenge: 'Can you spot the inefficiency — which values get computed multiple times?',
          quiz: [
            { question: 'What does `fib(5)` return?', options: ['3', '8', '5', '13'], answer: 2 },
            { question: 'What is the base case?', options: ['n == 0', 'n == 2', 'n <= 1', 'n > 1'], answer: 2 },
            { question: 'What is `fib(0)` + `fib(1)`?', options: ['0', '2', '1', '3'], answer: 2 },
          ],
          nodes: [
            { id: 'fib', label: 'fib' },
            { id: 'n', label: 'n' },
          ],
          edges: [{ from: 'fib', to: 'n' }],
          steps: [
            { line: 0, desc: 'Define fib function', action: { type: 'fn_def', name: 'fib', color: '#D85A30' } },
            { line: 5, desc: 'Call fib(5)', action: { type: 'fn_call', name: 'fib', arg: '5' } },
            { line: 1, desc: 'n=5, 5<=1? No → return fib(4)+fib(3)', action: { type: 'create', name: 'n', val: '5', color: '#7C6AF6' } },
            { line: 5, desc: 'Call fib(4)', action: { type: 'fn_call', name: 'fib', arg: '4' } },
            { line: 1, desc: 'n=4, 4<=1? No → fib(3)+fib(2)', action: { type: 'update', name: 'n', val: '4', color: '#7C6AF6' } },
            { line: 5, desc: 'Keep splitting... fib(3)=2, fib(2)=1', action: { type: 'fn_call', name: 'fib', arg: '3' } },
            { line: 1, desc: 'Base cases hit: fib(1)=1, fib(0)=0', action: { type: 'update', name: 'n', val: '1', color: '#1D9E75' } },
            { line: 2, desc: 'Unwind: fib(2)=1, fib(3)=2, fib(4)=3', action: { type: 'fn_return', ret: 'fib', val: '3' } },
            { line: 2, desc: 'fib(5) = fib(4)+fib(3) = 3+2 = 5', action: { type: 'fn_return', ret: 'fib', val: '5' } },
            { line: 5, desc: 'Print fib(5) = 5', action: { type: 'output', val: '5' } },
          ],
        },
        {
          id: 'sum-recursive',
          title: 'Recursive sum',
          concept: 'Sum a list recursively: total = first_item + sum(rest_of_list).',
          code: `def rec_sum(lst):
    if len(lst) == 0:
        return 0
    return lst[0] + rec_sum(lst[1:])

print(rec_sum([1, 2, 3, 4]))`,
          explanation: 'rec_sum([1,2,3,4]) = 1 + rec_sum([2,3,4]) = 1+2+rec_sum([3,4]) ... until the list is empty.',
          challenge: 'What would rec_sum([]) return? Why is that a good base case?',
          quiz: [
            { question: 'What does `rec_sum([1,2,3,4])` print?', options: ['6', '8', '10', '12'], answer: 2 },
            { question: 'What is the base case?', options: ['lst[0] == 0', 'len(lst) == 1', 'len(lst) == 0', 'lst == None'], answer: 2 },
            { question: 'What does `lst[1:]` mean?', options: ['The first element', 'Everything except the first element', 'The last element', 'A reversed list'], answer: 1 },
          ],
          nodes: [
            { id: 'rec_sum', label: 'rec_sum' },
            { id: 'lst', label: 'lst' },
          ],
          edges: [{ from: 'rec_sum', to: 'lst' }],
          steps: [
            { line: 0, desc: 'Define rec_sum function', action: { type: 'fn_def', name: 'rec_sum', color: '#D85A30' } },
            { line: 5, desc: 'Call rec_sum([1,2,3,4])', action: { type: 'fn_call', name: 'rec_sum', arg: '[1,2,3,4]' } },
            { line: 1, desc: 'lst=[1,2,3,4], len=4, not empty', action: { type: 'create', name: 'lst', val: '[1,2,3,4]', color: '#7C6AF6' } },
            { line: 3, desc: '1 + rec_sum([2,3,4]) → recurse', action: { type: 'fn_call', name: 'rec_sum', arg: '[2,3,4]' } },
            { line: 1, desc: 'lst=[2,3,4]', action: { type: 'update', name: 'lst', val: '[2,3,4]', color: '#7C6AF6' } },
            { line: 3, desc: '2 + rec_sum([3,4]) → recurse', action: { type: 'fn_call', name: 'rec_sum', arg: '[3,4]' } },
            { line: 1, desc: 'lst=[3,4]', action: { type: 'update', name: 'lst', val: '[3,4]', color: '#7C6AF6' } },
            { line: 3, desc: '3 + rec_sum([4]) → recurse', action: { type: 'fn_call', name: 'rec_sum', arg: '[4]' } },
            { line: 3, desc: '4 + rec_sum([]) → recurse', action: { type: 'fn_call', name: 'rec_sum', arg: '[]' } },
            { line: 1, desc: 'Base case: lst=[], return 0', action: { type: 'update', name: 'lst', val: '[]', color: '#1D9E75' } },
            { line: 3, desc: 'Unwind: 4+0=4, 3+4=7, 2+7=9, 1+9=10', action: { type: 'fn_return', ret: 'rec_sum', val: '10' } },
            { line: 5, desc: 'Print 10', action: { type: 'output', val: '10' } },
          ],
        },
        {
          id: 'power-recursive',
          title: 'Power with recursion',
          concept: 'x^n = x × x^(n-1). Multiply x by itself n times using recursion.',
          code: `def power(x, n):
    if n == 0:
        return 1
    return x * power(x, n - 1)

print(power(2, 4))`,
          explanation: 'power(2,4) = 2×power(2,3) = 2×2×power(2,2) = ... = 2×2×2×2×1 = 16.',
          challenge: 'What is power(3, 3)? Trace through the calls.',
          quiz: [
            { question: 'What does `power(2, 4)` print?', options: ['8', '16', '32', '4'], answer: 1 },
            { question: 'What is the base case?', options: ['x == 0', 'n == 1', 'n == 0', 'x == 1'], answer: 2 },
            { question: 'What does power(x, 0) always return?', options: ['0', 'x', '-1', '1'], answer: 3 },
          ],
          nodes: [
            { id: 'power', label: 'power' },
            { id: 'x', label: 'x' },
            { id: 'n', label: 'n' },
          ],
          edges: [{ from: 'power', to: 'x' }, { from: 'power', to: 'n' }],
          steps: [
            { line: 0, desc: 'Define power function', action: { type: 'fn_def', name: 'power', color: '#D85A30' } },
            { line: 5, desc: 'Call power(2, 4)', action: { type: 'fn_call', name: 'power', arg: '2, 4' } },
            { line: 1, desc: 'x=2, n=4 → not base case', action: { type: 'create', name: 'n', val: '4', color: '#7C6AF6' } },
            { line: 3, desc: '2 × power(2, 3) → recurse', action: { type: 'fn_call', name: 'power', arg: '2, 3' } },
            { line: 1, desc: 'n=3 → 2 × power(2, 2)', action: { type: 'update', name: 'n', val: '3', color: '#7C6AF6' } },
            { line: 3, desc: '2 × power(2, 2) → recurse', action: { type: 'fn_call', name: 'power', arg: '2, 2' } },
            { line: 1, desc: 'n=2 → 2 × power(2, 1)', action: { type: 'update', name: 'n', val: '2', color: '#7C6AF6' } },
            { line: 3, desc: '2 × power(2, 1) → recurse', action: { type: 'fn_call', name: 'power', arg: '2, 1' } },
            { line: 1, desc: 'n=1 → 2 × power(2, 0)', action: { type: 'update', name: 'n', val: '1', color: '#7C6AF6' } },
            { line: 3, desc: 'n=0 → base case, return 1', action: { type: 'update', name: 'n', val: '0', color: '#1D9E75' } },
            { line: 3, desc: 'Unwind: 2×1=2, 2×2=4, 2×4=8, 2×8=16', action: { type: 'fn_return', ret: 'power', val: '16' } },
            { line: 5, desc: 'Print 16', action: { type: 'output', val: '16' } },
          ],
        },
      ],
    },

    // ── HARD ── Two Pointers ──────────────────────────────────────────────
    hard: {
      id: 'hard',
      label: 'Hard',
      description: 'Master the two-pointer pattern — use two indices to solve problems efficiently.',
      examples: [
        {
          id: 'two-pointers-intro',
          title: 'Two pointers — intro',
          concept: 'Start one pointer at each end of the list and move them toward each other.',
          code: `nums = [1, 2, 3, 4, 5]
left = 0
right = len(nums) - 1
while left < right:
    print(nums[left], nums[right])
    left = left + 1
    right = right - 1`,
          explanation: 'left starts at index 0, right at index 4. They meet in the middle, printing each pair.',
          challenge: 'How many iterations happen if the list has 6 elements?',
          quiz: [
            { question: 'What is printed in the first iteration?', options: ['2 4', '1 5', '3 3', '1 2'], answer: 1 },
            { question: 'When does the loop stop?', options: ['When left > right', 'When left < right', 'When left == right', 'When left >= right'], answer: 3 },
            { question: 'How many pairs does a 5-element list produce?', options: ['5', '4', '3', '2'], answer: 3 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'left', label: 'left' },
            { id: 'right', label: 'right' },
          ],
          edges: [{ from: 'nums', to: 'left' }, { from: 'nums', to: 'right' }],
          steps: [
            { line: 0, desc: 'nums = [1,2,3,4,5]', action: { type: 'create', name: 'nums', val: '[1,2,3,4,5]', color: '#1D9E75' } },
            { line: 1, desc: 'left = 0 (start)', action: { type: 'create', name: 'left', val: '0', color: '#7C6AF6' } },
            { line: 2, desc: 'right = 4 (end)', action: { type: 'create', name: 'right', val: '4', color: '#D85A30' } },
            { line: 3, desc: '0 < 4 → enter loop', action: { type: 'update', name: 'left', val: '0', color: '#7C6AF6' } },
            { line: 4, desc: 'Print nums[0]=1, nums[4]=5', action: { type: 'output', val: '1 5' } },
            { line: 5, desc: 'left = 0+1 = 1', action: { type: 'update', name: 'left', val: '1', color: '#7C6AF6' } },
            { line: 6, desc: 'right = 4-1 = 3', action: { type: 'update', name: 'right', val: '3', color: '#D85A30' } },
            { line: 3, desc: '1 < 3 → continue', action: { type: 'update', name: 'left', val: '1', color: '#7C6AF6' } },
            { line: 4, desc: 'Print nums[1]=2, nums[3]=4', action: { type: 'output', val: '2 4' } },
            { line: 5, desc: 'left = 2', action: { type: 'update', name: 'left', val: '2', color: '#7C6AF6' } },
            { line: 6, desc: 'right = 2', action: { type: 'update', name: 'right', val: '2', color: '#D85A30' } },
            { line: 3, desc: '2 < 2? No → loop ends', action: { type: 'update', name: 'left', val: '2', color: '#1D9E75' } },
          ],
        },
        {
          id: 'palindrome-check',
          title: 'Palindrome check',
          concept: 'Use two pointers to compare characters from both ends toward the center.',
          code: `word = "racecar"
left = 0
right = len(word) - 1
is_palindrome = True
while left < right:
    if word[left] != word[right]:
        is_palindrome = False
        break
    left = left + 1
    right = right - 1
print(is_palindrome)`,
          explanation: 'Compare word[0] with word[-1], word[1] with word[-2], etc. If all match, it\'s a palindrome.',
          challenge: 'Would "hello" pass the palindrome check? At which step does it fail?',
          quiz: [
            { question: 'What is `is_palindrome` for "racecar"?', options: ['False', 'None', 'True', '0'], answer: 2 },
            { question: 'When does the loop stop early (break)?', options: ['When pointers meet', 'When a mismatch is found', 'After 5 iterations', 'Never'], answer: 1 },
            { question: 'What would is_palindrome be for "hello"?', options: ['True', 'None', 'Error', 'False'], answer: 3 },
          ],
          nodes: [
            { id: 'word', label: 'word' },
            { id: 'left', label: 'left' },
            { id: 'right', label: 'right' },
            { id: 'is_palindrome', label: 'is_palindrome' },
          ],
          edges: [
            { from: 'word', to: 'left' },
            { from: 'word', to: 'right' },
            { from: 'left', to: 'is_palindrome' },
            { from: 'right', to: 'is_palindrome' },
          ],
          steps: [
            { line: 0, desc: 'word = "racecar"', action: { type: 'create', name: 'word', val: '"racecar"', color: '#7C6AF6' } },
            { line: 1, desc: 'left = 0', action: { type: 'create', name: 'left', val: '0', color: '#1D9E75' } },
            { line: 2, desc: 'right = 6', action: { type: 'create', name: 'right', val: '6', color: '#D85A30' } },
            { line: 3, desc: 'is_palindrome = True', action: { type: 'create', name: 'is_palindrome', val: 'True', color: '#1D9E75' } },
            { line: 5, desc: 'word[0]="r" == word[6]="r" ✓', action: { type: 'update', name: 'left', val: '1', color: '#1D9E75' } },
            { line: 8, desc: 'left=1, right=5', action: { type: 'update', name: 'right', val: '5', color: '#D85A30' } },
            { line: 5, desc: 'word[1]="a" == word[5]="a" ✓', action: { type: 'update', name: 'left', val: '2', color: '#1D9E75' } },
            { line: 8, desc: 'left=2, right=4', action: { type: 'update', name: 'right', val: '4', color: '#D85A30' } },
            { line: 5, desc: 'word[2]="c" == word[4]="c" ✓', action: { type: 'update', name: 'left', val: '3', color: '#1D9E75' } },
            { line: 8, desc: 'left=3, right=3 → 3 < 3? No, loop ends', action: { type: 'update', name: 'right', val: '3', color: '#D85A30' } },
            { line: 10, desc: 'Print is_palindrome = True', action: { type: 'output', val: 'True' } },
          ],
        },
        {
          id: 'two-sum-sorted',
          title: 'Two sum in sorted list',
          concept: 'Find two numbers that add up to the target — use two pointers from each end.',
          code: `nums = [1, 3, 5, 7, 9]
target = 10
left = 0
right = len(nums) - 1
while left < right:
    s = nums[left] + nums[right]
    if s == target:
        print(nums[left], nums[right])
        break
    elif s < target:
        left = left + 1
    else:
        right = right - 1`,
          explanation: 'If sum is too small, move left pointer right to increase it. If too large, move right pointer left.',
          challenge: 'What would the output be if target was 6?',
          quiz: [
            { question: 'What pair is printed?', options: ['1 9', '3 7', '1 7', '3 9'], answer: 1 },
            { question: 'What happens when the sum is too small?', options: ['right moves left', 'left moves right', 'Both move', 'loop breaks'], answer: 1 },
            { question: 'Why must the list be sorted for this pattern to work?', options: ['Python requires it', 'We need predictable direction to move pointers', 'It reduces time complexity to O(1)', 'Unsorted lists crash'], answer: 1 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'left', label: 'left' },
            { id: 'right', label: 'right' },
            { id: 's', label: 's' },
          ],
          edges: [
            { from: 'nums', to: 'left' },
            { from: 'nums', to: 'right' },
            { from: 'left', to: 's' },
            { from: 'right', to: 's' },
          ],
          steps: [
            { line: 0, desc: 'nums = [1,3,5,7,9]', action: { type: 'create', name: 'nums', val: '[1,3,5,7,9]', color: '#1D9E75' } },
            { line: 1, desc: 'target = 10', action: { type: 'create', name: 'target', val: '10', color: '#7C6AF6' } },
            { line: 2, desc: 'left = 0', action: { type: 'create', name: 'left', val: '0', color: '#1D9E75' } },
            { line: 3, desc: 'right = 4', action: { type: 'create', name: 'right', val: '4', color: '#D85A30' } },
            { line: 5, desc: 's = nums[0]+nums[4] = 1+9 = 10', action: { type: 'create', name: 's', val: '10', color: '#BA7517', from: ['left', 'right'] } },
            { line: 6, desc: '10 == 10 → found!', action: { type: 'update', name: 's', val: '10', color: '#1D9E75' } },
            { line: 7, desc: 'Print 1 9', action: { type: 'output', val: '1 9' } },
          ],
        },
        {
          id: 'remove-duplicates',
          title: 'Remove duplicates in place',
          concept: 'Use a slow and fast pointer to overwrite duplicates without extra memory.',
          code: `arr = [1, 1, 2, 3, 3, 4]
slow = 0
for fast in range(1, len(arr)):
    if arr[fast] != arr[slow]:
        slow = slow + 1
        arr[slow] = arr[fast]
print(arr[:slow+1])`,
          explanation: 'slow tracks where to write the next unique value. fast scans ahead and copies unique values.',
          challenge: 'What would arr[:slow+1] contain if all elements were the same?',
          quiz: [
            { question: 'What does `arr[:slow+1]` print?', options: ['[1,2,3,4]', '[1,1,2,3]', '[2,3,4]', '[1,2,3]'], answer: 0 },
            { question: 'What does the `slow` pointer track?', options: ['The last duplicate', 'The position to write the next unique value', 'The current scan position', 'The array length'], answer: 1 },
            { question: 'What is `slow` at the end for [1,1,2,3,3,4]?', options: ['6', '5', '4', '3'], answer: 3 },
          ],
          nodes: [
            { id: 'arr', label: 'arr' },
            { id: 'slow', label: 'slow' },
            { id: 'fast', label: 'fast' },
          ],
          edges: [{ from: 'arr', to: 'fast' }, { from: 'fast', to: 'slow' }],
          steps: [
            { line: 0, desc: 'arr = [1,1,2,3,3,4]', action: { type: 'create', name: 'arr', val: '[1,1,2,3,3,4]', color: '#1D9E75' } },
            { line: 1, desc: 'slow = 0', action: { type: 'create', name: 'slow', val: '0', color: '#7C6AF6' } },
            { line: 2, desc: 'fast=1: arr[1]=1 == arr[0]=1, skip', action: { type: 'loop', name: 'fast', val: '1', target: 'arr', color: '#E24B4A' } },
            { line: 2, desc: 'fast=2: arr[2]=2 != arr[0]=1 → unique!', action: { type: 'loop', name: 'fast', val: '2', target: 'arr', color: '#E24B4A' } },
            { line: 4, desc: 'slow = 0+1 = 1', action: { type: 'update', name: 'slow', val: '1', color: '#7C6AF6' } },
            { line: 5, desc: 'arr[1] = arr[2] = 2 → arr=[1,2,2,3,3,4]', action: { type: 'update', name: 'arr', val: '[1,2,2,3,3,4]', color: '#1D9E75' } },
            { line: 2, desc: 'fast=3: arr[3]=3 != arr[1]=2 → unique!', action: { type: 'loop', name: 'fast', val: '3', target: 'arr', color: '#E24B4A' } },
            { line: 4, desc: 'slow = 2', action: { type: 'update', name: 'slow', val: '2', color: '#7C6AF6' } },
            { line: 5, desc: 'arr[2] = 3 → arr=[1,2,3,3,3,4]', action: { type: 'update', name: 'arr', val: '[1,2,3,3,3,4]', color: '#1D9E75' } },
            { line: 2, desc: 'fast=4: arr[4]=3 == arr[2]=3, skip', action: { type: 'loop', name: 'fast', val: '4', target: 'arr', color: '#E24B4A' } },
            { line: 2, desc: 'fast=5: arr[5]=4 != arr[2]=3 → unique!', action: { type: 'loop', name: 'fast', val: '5', target: 'arr', color: '#E24B4A' } },
            { line: 4, desc: 'slow = 3', action: { type: 'update', name: 'slow', val: '3', color: '#7C6AF6' } },
            { line: 5, desc: 'arr[3] = 4', action: { type: 'update', name: 'arr', val: '[1,2,3,4,3,4]', color: '#1D9E75' } },
            { line: 6, desc: 'Print arr[:4] = [1,2,3,4]', action: { type: 'output', val: '[1, 2, 3, 4]' } },
          ],
        },
        {
          id: 'max-subarray',
          title: "Kadane's — max subarray sum",
          concept: "Keep a running sum. Reset to 0 when it goes negative. Track the max seen so far.",
          code: `nums = [-2, 1, -3, 4, -1, 2, 1]
max_sum = nums[0]
current = 0
for n in nums:
    current = current + n
    if current < 0:
        current = 0
    if current > max_sum:
        max_sum = current
print(max_sum)`,
          explanation: 'The subarray [4,-1,2,1] sums to 6. Whenever current dips below 0 we restart from 0.',
          challenge: 'What would max_sum be if all numbers were negative?',
          quiz: [
            { question: 'What is `max_sum` at the end?', options: ['4', '5', '6', '7'], answer: 2 },
            { question: 'Why do we reset `current = 0` when it goes negative?', options: ['To avoid errors', 'A negative prefix can only make the sum worse', 'To sort the array', 'To save memory'], answer: 1 },
            { question: 'What subarray gives the maximum sum?', options: ['[-2,1,-3,4]', '[4,-1,2,1]', '[1,-3,4,-1,2,1]', '[-2,1]'], answer: 1 },
          ],
          nodes: [
            { id: 'nums', label: 'nums' },
            { id: 'current', label: 'current' },
            { id: 'max_sum', label: 'max_sum' },
            { id: 'n', label: 'n' },
          ],
          edges: [{ from: 'nums', to: 'n' }, { from: 'n', to: 'current' }, { from: 'current', to: 'max_sum' }],
          steps: [
            { line: 0, desc: 'nums = [-2,1,-3,4,-1,2,1]', action: { type: 'create', name: 'nums', val: '[-2,1,-3,4,-1,2,1]', color: '#1D9E75' } },
            { line: 1, desc: 'max_sum = nums[0] = -2', action: { type: 'create', name: 'max_sum', val: '-2', color: '#7C6AF6' } },
            { line: 2, desc: 'current = 0', action: { type: 'create', name: 'current', val: '0', color: '#D85A30' } },
            { line: 3, desc: 'n = -2 → current = 0+(-2) = -2', action: { type: 'loop', name: 'n', val: '-2', target: 'nums', color: '#E24B4A' } },
            { line: 5, desc: 'current < 0 → reset to 0', action: { type: 'update', name: 'current', val: '0', color: '#D85A30' } },
            { line: 3, desc: 'n = 1 → current = 0+1 = 1', action: { type: 'loop', name: 'n', val: '1', target: 'nums', color: '#E24B4A' } },
            { line: 7, desc: '1 > -2 → max_sum = 1', action: { type: 'update', name: 'max_sum', val: '1', color: '#7C6AF6' } },
            { line: 3, desc: 'n = -3 → current = 1+(-3) = -2', action: { type: 'loop', name: 'n', val: '-3', target: 'nums', color: '#E24B4A' } },
            { line: 5, desc: 'current < 0 → reset to 0', action: { type: 'update', name: 'current', val: '0', color: '#D85A30' } },
            { line: 3, desc: 'n = 4 → current = 4', action: { type: 'loop', name: 'n', val: '4', target: 'nums', color: '#E24B4A' } },
            { line: 7, desc: '4 > 1 → max_sum = 4', action: { type: 'update', name: 'max_sum', val: '4', color: '#7C6AF6' } },
            { line: 3, desc: 'n = -1 → current = 3', action: { type: 'loop', name: 'n', val: '-1', target: 'nums', color: '#E24B4A' } },
            { line: 3, desc: 'n = 2 → current = 5', action: { type: 'loop', name: 'n', val: '2', target: 'nums', color: '#E24B4A' } },
            { line: 7, desc: '5 > 4 → max_sum = 5', action: { type: 'update', name: 'max_sum', val: '5', color: '#7C6AF6' } },
            { line: 3, desc: 'n = 1 → current = 6', action: { type: 'loop', name: 'n', val: '1', target: 'nums', color: '#E24B4A' } },
            { line: 7, desc: '6 > 5 → max_sum = 6', action: { type: 'update', name: 'max_sum', val: '6', color: '#7C6AF6' } },
            { line: 9, desc: 'Print max_sum = 6', action: { type: 'output', val: '6' } },
          ],
        },
      ],
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson Type 4 — System Design Basics
// 4 difficulties × 5 examples = 20 examples
// Beginner: Caching | Easy: Load & Traffic | Medium: API Patterns | Hard: Advanced Patterns
// Each example uses simple Python to demonstrate the core concept visually.
// ─────────────────────────────────────────────────────────────────────────────
export const lessonTypeFourModule = {
  id: 'system-design-type-4',
  title: 'System Design Basics',
  lessonType: {
    id: 'type-4',
    label: 'Type 4',
    name: 'System design visualizer',
    totalTypes: 4,
  },
  summary:
    'Learn how real-world systems are built — caching, load balancing, rate limiting, APIs, and more — through simple Python simulations that make every pattern crystal clear.',
  difficultyOrder: ['beginner', 'easy', 'medium', 'hard'],
  difficulties: {

    // ── BEGINNER ── Caching ───────────────────────────────────────────────
    beginner: {
      id: 'beginner',
      label: 'Beginner',
      description: 'Understand caching — storing results so you never compute the same thing twice.',
      examples: [
        {
          id: 'cache-intro',
          title: 'What is a cache?',
          concept: 'A cache stores results of expensive lookups so future requests are instant.',
          code: `cache = {}
cache["user_1"] = "Alice"
cache["user_2"] = "Bob"
print(cache["user_1"])
print("user_3" in cache)
print(len(cache))`,
          explanation: 'A dictionary is a perfect cache. Storing a result once lets every future lookup skip the expensive work.',
          challenge: 'What happens to cache performance as more items are added?',
          quiz: [
            { question: 'What data structure is used to simulate a cache here?', options: ['list', 'set', 'tuple', 'dict'], answer: 3 },
            { question: 'What does `"user_3" in cache` return?', options: ['True', 'None', '"user_3"', 'False'], answer: 3 },
            { question: 'What is the main benefit of a cache?', options: ['Uses less memory', 'Avoids repeating expensive lookups', 'Sorts data automatically', 'Encrypts data'], answer: 1 },
          ],
          nodes: [{ id: 'cache', label: 'cache' }],
          edges: [],
          steps: [
            { line: 0, desc: 'cache = {} (empty cache)', action: { type: 'create', name: 'cache', val: '{}', color: '#7C6AF6' } },
            { line: 1, desc: 'Store user_1 → "Alice"', action: { type: 'update', name: 'cache', val: '{"user_1":"Alice"}', color: '#7C6AF6' } },
            { line: 2, desc: 'Store user_2 → "Bob"', action: { type: 'update', name: 'cache', val: '{"user_1":"Alice","user_2":"Bob"}', color: '#7C6AF6' } },
            { line: 3, desc: 'Cache HIT: get user_1 instantly', action: { type: 'output', val: 'Alice' } },
            { line: 4, desc: '"user_3" in cache → False (cache MISS)', action: { type: 'output', val: 'False' } },
            { line: 5, desc: 'Cache has 2 entries', action: { type: 'output', val: '2' } },
          ],
        },
        {
          id: 'cache-hit-miss',
          title: 'Cache hit vs cache miss',
          concept: 'A cache HIT returns instantly. A cache MISS fetches data and stores it for next time.',
          code: `cache = {}

def get_user(user_id):
    if user_id in cache:
        return "HIT: " + cache[user_id]
    data = "fetched_" + user_id
    cache[user_id] = data
    return "MISS: " + data

print(get_user("u1"))
print(get_user("u1"))
print(get_user("u2"))`,
          explanation: 'First call to get_user("u1") is a MISS — data is fetched and cached. Second call is a HIT — returns instantly.',
          challenge: 'What is the cache hit rate after the three calls above?',
          quiz: [
            { question: 'What does the first call to get_user("u1") return?', options: ['HIT: fetched_u1', 'MISS: fetched_u1', 'None', 'HIT: u1'], answer: 1 },
            { question: 'What does the second call to get_user("u1") return?', options: ['MISS: fetched_u1', 'None', 'HIT: fetched_u1', 'Error'], answer: 2 },
            { question: 'How many items are in cache after all three calls?', options: ['3', '1', '0', '2'], answer: 3 },
          ],
          nodes: [
            { id: 'cache', label: 'cache' },
            { id: 'get_user', label: 'get_user' },
          ],
          edges: [{ from: 'get_user', to: 'cache' }],
          steps: [
            { line: 0, desc: 'cache = {}', action: { type: 'create', name: 'cache', val: '{}', color: '#7C6AF6' } },
            { line: 2, desc: 'Define get_user function', action: { type: 'fn_def', name: 'get_user', color: '#D85A30' } },
            { line: 9, desc: 'Call get_user("u1")', action: { type: 'fn_call', name: 'get_user', arg: '"u1"' } },
            { line: 3, desc: '"u1" in cache? No → cache MISS', action: { type: 'create', name: 'data', val: '"fetched_u1"', color: '#ef4444' } },
            { line: 6, desc: 'Store u1 in cache', action: { type: 'update', name: 'cache', val: '{"u1":"fetched_u1"}', color: '#7C6AF6' } },
            { line: 9, desc: 'Print MISS: fetched_u1', action: { type: 'output', val: 'MISS: fetched_u1' } },
            { line: 10, desc: 'Call get_user("u1") again', action: { type: 'fn_call', name: 'get_user', arg: '"u1"' } },
            { line: 3, desc: '"u1" in cache? Yes → cache HIT!', action: { type: 'update', name: 'cache', val: '{"u1":"fetched_u1"}', color: '#1D9E75' } },
            { line: 10, desc: 'Print HIT: fetched_u1', action: { type: 'output', val: 'HIT: fetched_u1' } },
            { line: 11, desc: 'Call get_user("u2") — cache MISS', action: { type: 'fn_call', name: 'get_user', arg: '"u2"' } },
            { line: 6, desc: 'Fetch and store u2', action: { type: 'update', name: 'cache', val: '{"u1":"fetched_u1","u2":"fetched_u2"}', color: '#7C6AF6' } },
            { line: 11, desc: 'Print MISS: fetched_u2', action: { type: 'output', val: 'MISS: fetched_u2' } },
          ],
        },
        {
          id: 'cache-eviction',
          title: 'Cache eviction (size limit)',
          concept: 'Caches have limited size. When full, old entries must be removed to make room.',
          code: `cache = {}
MAX_SIZE = 3

def add_to_cache(key, value):
    if len(cache) >= MAX_SIZE:
        oldest = list(cache.keys())[0]
        del cache[oldest]
        print("Evicted:", oldest)
    cache[key] = value

add_to_cache("a", 1)
add_to_cache("b", 2)
add_to_cache("c", 3)
add_to_cache("d", 4)
print(cache)`,
          explanation: 'When the 4th item is added, "a" (the oldest) is evicted first. This is a simple FIFO eviction policy.',
          challenge: 'What eviction strategy do most real caches use instead of FIFO?',
          quiz: [
            { question: 'What is evicted when "d" is added?', options: ['"b"', '"c"', '"d"', '"a"'], answer: 3 },
            { question: 'What is `cache` after adding "d"?', options: ['{"a":1,"b":2,"c":3}', '{"b":2,"c":3,"d":4}', '{"a":1,"c":3,"d":4}', '{"d":4}'], answer: 1 },
            { question: 'What does FIFO stand for in eviction?', options: ['First In First Out', 'Fast Item Flush Out', 'Fixed Index First Out', 'Full Index Freed Out'], answer: 0 },
          ],
          nodes: [
            { id: 'cache', label: 'cache' },
            { id: 'MAX_SIZE', label: 'MAX_SIZE' },
          ],
          edges: [{ from: 'MAX_SIZE', to: 'cache' }],
          steps: [
            { line: 0, desc: 'cache = {}', action: { type: 'create', name: 'cache', val: '{}', color: '#7C6AF6' } },
            { line: 1, desc: 'MAX_SIZE = 3', action: { type: 'create', name: 'MAX_SIZE', val: '3', color: '#BA7517' } },
            { line: 3, desc: 'Define add_to_cache', action: { type: 'fn_def', name: 'add_to_cache', color: '#D85A30' } },
            { line: 10, desc: 'add_to_cache("a", 1)', action: { type: 'fn_call', name: 'add_to_cache', arg: '"a", 1' } },
            { line: 8, desc: 'cache = {"a":1}', action: { type: 'update', name: 'cache', val: '{"a":1}', color: '#7C6AF6' } },
            { line: 11, desc: 'add_to_cache("b", 2)', action: { type: 'fn_call', name: 'add_to_cache', arg: '"b", 2' } },
            { line: 8, desc: 'cache = {"a":1,"b":2}', action: { type: 'update', name: 'cache', val: '{"a":1,"b":2}', color: '#7C6AF6' } },
            { line: 12, desc: 'add_to_cache("c", 3)', action: { type: 'fn_call', name: 'add_to_cache', arg: '"c", 3' } },
            { line: 8, desc: 'cache = {"a":1,"b":2,"c":3} — full!', action: { type: 'update', name: 'cache', val: '{"a":1,"b":2,"c":3}', color: '#7C6AF6' } },
            { line: 13, desc: 'add_to_cache("d", 4) — cache is full!', action: { type: 'fn_call', name: 'add_to_cache', arg: '"d", 4' } },
            { line: 5, desc: 'Evict oldest key "a"', action: { type: 'update', name: 'cache', val: '{"b":2,"c":3}', color: '#ef4444' } },
            { line: 6, desc: 'Print Evicted: a', action: { type: 'output', val: 'Evicted: a' } },
            { line: 8, desc: 'Add "d" → cache = {"b":2,"c":3,"d":4}', action: { type: 'update', name: 'cache', val: '{"b":2,"c":3,"d":4}', color: '#7C6AF6' } },
            { line: 14, desc: 'Print final cache', action: { type: 'output', val: '{"b": 2, "c": 3, "d": 4}' } },
          ],
        },
        {
          id: 'key-value-store',
          title: 'Key-value store',
          concept: 'A key-value store maps unique keys to values — the foundation of databases like Redis.',
          code: `store = {}

def set_val(key, value):
    store[key] = value

def get_val(key):
    return store.get(key, "NOT FOUND")

set_val("name", "Alice")
set_val("age", "25")
print(get_val("name"))
print(get_val("city"))`,
          explanation: 'set_val writes a key. get_val reads it back. Missing keys return "NOT FOUND" instead of crashing.',
          challenge: 'How would you implement a delete operation for this key-value store?',
          quiz: [
            { question: 'What does `get_val("city")` return?', options: ['"Alice"', 'None', '"NOT FOUND"', 'Error'], answer: 2 },
            { question: 'What does `store.get(key, "NOT FOUND")` do when key is missing?', options: ['Raises KeyError', 'Returns None', 'Returns "NOT FOUND"', 'Adds the key'], answer: 2 },
            { question: 'What real-world system uses the key-value pattern?', options: ['SQL databases', 'Redis / Memcached', 'File systems', 'Load balancers'], answer: 1 },
          ],
          nodes: [
            { id: 'store', label: 'store' },
            { id: 'set_val', label: 'set_val' },
            { id: 'get_val', label: 'get_val' },
          ],
          edges: [{ from: 'set_val', to: 'store' }, { from: 'store', to: 'get_val' }],
          steps: [
            { line: 0, desc: 'store = {} (empty key-value store)', action: { type: 'create', name: 'store', val: '{}', color: '#7C6AF6' } },
            { line: 2, desc: 'Define set_val (write)', action: { type: 'fn_def', name: 'set_val', color: '#D85A30' } },
            { line: 5, desc: 'Define get_val (read)', action: { type: 'fn_def', name: 'get_val', color: '#1D9E75' } },
            { line: 8, desc: 'set_val("name", "Alice")', action: { type: 'fn_call', name: 'set_val', arg: '"name","Alice"' } },
            { line: 3, desc: 'store["name"] = "Alice"', action: { type: 'update', name: 'store', val: '{"name":"Alice"}', color: '#7C6AF6' } },
            { line: 9, desc: 'set_val("age", "25")', action: { type: 'fn_call', name: 'set_val', arg: '"age","25"' } },
            { line: 3, desc: 'store["age"] = "25"', action: { type: 'update', name: 'store', val: '{"name":"Alice","age":"25"}', color: '#7C6AF6' } },
            { line: 10, desc: 'get_val("name") → found!', action: { type: 'fn_call', name: 'get_val', arg: '"name"' } },
            { line: 10, desc: 'Print "Alice"', action: { type: 'output', val: 'Alice' } },
            { line: 11, desc: 'get_val("city") → not in store', action: { type: 'fn_call', name: 'get_val', arg: '"city"' } },
            { line: 11, desc: 'Print "NOT FOUND"', action: { type: 'output', val: 'NOT FOUND' } },
          ],
        },
        {
          id: 'write-through-cache',
          title: 'Write-through caching',
          concept: 'Write-through: every write updates both the cache AND the database at the same time.',
          code: `db = {}
cache = {}

def write(key, value):
    db[key] = value
    cache[key] = value
    print("Written to db and cache")

def read(key):
    if key in cache:
        return "CACHE: " + str(cache[key])
    return "DB: " + str(db.get(key, "missing"))

write("score", 99)
print(read("score"))`,
          explanation: 'write() updates both db and cache together. read() checks cache first — always gets fresh data.',
          challenge: 'What is the downside of write-through compared to write-back caching?',
          quiz: [
            { question: 'In write-through, where is data written?', options: ['Cache only', 'DB only', 'Both cache and DB', 'Neither'], answer: 2 },
            { question: 'What does `read("score")` return after write?', options: ['"DB: 99"', '"CACHE: 99"', '"missing"', 'None'], answer: 1 },
            { question: 'What is the main benefit of write-through?', options: ['Faster writes', 'Cache always stays consistent with DB', 'Less memory used', 'No need for a database'], answer: 1 },
          ],
          nodes: [
            { id: 'db', label: 'db' },
            { id: 'cache', label: 'cache' },
          ],
          edges: [{ from: 'db', to: 'cache' }],
          steps: [
            { line: 0, desc: 'db = {} (database)', action: { type: 'create', name: 'db', val: '{}', color: '#1D9E75' } },
            { line: 1, desc: 'cache = {}', action: { type: 'create', name: 'cache', val: '{}', color: '#7C6AF6' } },
            { line: 3, desc: 'Define write (write-through)', action: { type: 'fn_def', name: 'write', color: '#D85A30' } },
            { line: 9, desc: 'Define read (cache-first)', action: { type: 'fn_def', name: 'read', color: '#1D9E75' } },
            { line: 13, desc: 'write("score", 99)', action: { type: 'fn_call', name: 'write', arg: '"score", 99' } },
            { line: 4, desc: 'db["score"] = 99', action: { type: 'update', name: 'db', val: '{"score":99}', color: '#1D9E75' } },
            { line: 5, desc: 'cache["score"] = 99 (simultaneously)', action: { type: 'update', name: 'cache', val: '{"score":99}', color: '#7C6AF6' } },
            { line: 6, desc: 'Print Written to db and cache', action: { type: 'output', val: 'Written to db and cache' } },
            { line: 14, desc: 'read("score") — check cache first', action: { type: 'fn_call', name: 'read', arg: '"score"' } },
            { line: 9, desc: '"score" in cache → True → CACHE HIT', action: { type: 'output', val: 'CACHE: 99' } },
          ],
        },
      ],
    },

    // ── EASY ── Load & Traffic ────────────────────────────────────────────
    easy: {
      id: 'easy',
      label: 'Easy',
      description: 'Learn how systems handle high traffic — rate limiting, load balancing, and queues.',
      examples: [
        {
          id: 'rate-limiting',
          title: 'Rate limiting',
          concept: 'Rate limiting caps how many requests a user can make in a time window.',
          code: `request_counts = {}
LIMIT = 3

def handle_request(user):
    count = request_counts.get(user, 0)
    if count >= LIMIT:
        return "BLOCKED: " + user
    request_counts[user] = count + 1
    return "OK: " + user

print(handle_request("alice"))
print(handle_request("alice"))
print(handle_request("alice"))
print(handle_request("alice"))`,
          explanation: 'Each request increments the counter. Once a user hits the LIMIT their next request is blocked.',
          challenge: 'How would you reset the counter after 1 minute to allow new requests?',
          quiz: [
            { question: 'What does the 4th call to handle_request("alice") return?', options: ['"OK: alice"', '"BLOCKED: alice"', 'None', 'Error'], answer: 1 },
            { question: 'What is `request_counts["alice"]` after 3 allowed requests?', options: ['0', '2', '3', '4'], answer: 2 },
            { question: 'What is the purpose of rate limiting?', options: ['Speed up requests', 'Prevent abuse and server overload', 'Cache responses', 'Encrypt traffic'], answer: 1 },
          ],
          nodes: [
            { id: 'request_counts', label: 'request_counts' },
            { id: 'LIMIT', label: 'LIMIT' },
          ],
          edges: [{ from: 'LIMIT', to: 'request_counts' }],
          steps: [
            { line: 0, desc: 'request_counts = {}', action: { type: 'create', name: 'request_counts', val: '{}', color: '#7C6AF6' } },
            { line: 1, desc: 'LIMIT = 3', action: { type: 'create', name: 'LIMIT', val: '3', color: '#BA7517' } },
            { line: 3, desc: 'Define handle_request', action: { type: 'fn_def', name: 'handle_request', color: '#D85A30' } },
            { line: 10, desc: 'Request 1 — count=0 < 3, allow', action: { type: 'fn_call', name: 'handle_request', arg: '"alice"' } },
            { line: 7, desc: 'request_counts["alice"] = 1', action: { type: 'update', name: 'request_counts', val: '{"alice":1}', color: '#1D9E75' } },
            { line: 10, desc: 'Print OK: alice', action: { type: 'output', val: 'OK: alice' } },
            { line: 11, desc: 'Request 2 — count=1 < 3, allow', action: { type: 'fn_call', name: 'handle_request', arg: '"alice"' } },
            { line: 7, desc: 'request_counts["alice"] = 2', action: { type: 'update', name: 'request_counts', val: '{"alice":2}', color: '#1D9E75' } },
            { line: 11, desc: 'Print OK: alice', action: { type: 'output', val: 'OK: alice' } },
            { line: 12, desc: 'Request 3 — count=2 < 3, allow', action: { type: 'fn_call', name: 'handle_request', arg: '"alice"' } },
            { line: 7, desc: 'request_counts["alice"] = 3', action: { type: 'update', name: 'request_counts', val: '{"alice":3}', color: '#1D9E75' } },
            { line: 12, desc: 'Print OK: alice', action: { type: 'output', val: 'OK: alice' } },
            { line: 13, desc: 'Request 4 — count=3 >= LIMIT → BLOCK!', action: { type: 'fn_call', name: 'handle_request', arg: '"alice"' } },
            { line: 5, desc: 'Print BLOCKED: alice', action: { type: 'output', val: 'BLOCKED: alice' } },
          ],
        },
        {
          id: 'round-robin',
          title: 'Round-robin load balancing',
          concept: 'Distribute requests evenly across servers by rotating through them in order.',
          code: `servers = ["server1", "server2", "server3"]
index = 0

def get_server():
    global index
    server = servers[index % len(servers)]
    index = index + 1
    return server

for i in range(6):
    print(get_server())`,
          explanation: 'Each call picks the next server in the list using modulo. After the last server it wraps back to the first.',
          challenge: 'What would happen if one server goes down? How would you handle it?',
          quiz: [
            { question: 'What server handles request 4 (i=3)?', options: ['server1', 'server3', 'server2', 'server4'], answer: 0 },
            { question: 'What does `index % len(servers)` do?', options: ['Divides index by 3', 'Wraps index to stay within 0-2', 'Finds the fastest server', 'Counts requests'], answer: 1 },
            { question: 'What is the goal of load balancing?', options: ['Cache responses', 'Encrypt traffic', 'Spread traffic evenly across servers', 'Block slow requests'], answer: 2 },
          ],
          nodes: [
            { id: 'servers', label: 'servers' },
            { id: 'index', label: 'index' },
          ],
          edges: [{ from: 'index', to: 'servers' }],
          steps: [
            { line: 0, desc: 'servers = ["server1","server2","server3"]', action: { type: 'create', name: 'servers', val: '["server1","server2","server3"]', color: '#1D9E75' } },
            { line: 1, desc: 'index = 0', action: { type: 'create', name: 'index', val: '0', color: '#7C6AF6' } },
            { line: 3, desc: 'Define get_server', action: { type: 'fn_def', name: 'get_server', color: '#D85A30' } },
            { line: 9, desc: 'i=0: get_server() → index=0, 0%3=0 → server1', action: { type: 'fn_call', name: 'get_server', arg: '' } },
            { line: 9, desc: 'index = 1 | Print server1', action: { type: 'update', name: 'index', val: '1', color: '#7C6AF6' } },
            { line: 9, desc: 'Print server1', action: { type: 'output', val: 'server1' } },
            { line: 9, desc: 'i=1: index=1, 1%3=1 → server2', action: { type: 'fn_call', name: 'get_server', arg: '' } },
            { line: 9, desc: 'index = 2', action: { type: 'update', name: 'index', val: '2', color: '#7C6AF6' } },
            { line: 9, desc: 'Print server2', action: { type: 'output', val: 'server2' } },
            { line: 9, desc: 'i=2: index=2, 2%3=2 → server3', action: { type: 'fn_call', name: 'get_server', arg: '' } },
            { line: 9, desc: 'index = 3', action: { type: 'update', name: 'index', val: '3', color: '#7C6AF6' } },
            { line: 9, desc: 'Print server3', action: { type: 'output', val: 'server3' } },
            { line: 9, desc: 'i=3: index=3, 3%3=0 → wraps to server1!', action: { type: 'update', name: 'index', val: '4', color: '#D85A30' } },
            { line: 9, desc: 'Print server1 (wrapped)', action: { type: 'output', val: 'server1' } },
          ],
        },
        {
          id: 'retry-logic',
          title: 'Retry with backoff',
          concept: 'If a request fails, wait briefly and try again — but limit the total attempts.',
          code: `import random
MAX_RETRIES = 3

def call_api(attempt):
    if attempt < 2:
        return None
    return "success"

result = None
for attempt in range(MAX_RETRIES):
    result = call_api(attempt)
    if result:
        print("Done on attempt", attempt + 1)
        break
    print("Retry", attempt + 1)
print(result)`,
          explanation: 'The first 2 attempts fail (return None). The 3rd succeeds. The loop breaks early when a result is found.',
          challenge: 'How would you add exponential backoff — waiting 1s, 2s, 4s between retries?',
          quiz: [
            { question: 'On which attempt does call_api succeed?', options: ['1st', '3rd', '2nd', '4th'], answer: 1 },
            { question: 'What is `result` after the loop?', options: ['None', '"retry"', '"success"', '0'], answer: 2 },
            { question: 'Why is MAX_RETRIES important?', options: ['Speeds up requests', 'Prevents infinite retrying on permanent failures', 'Caches the response', 'Encrypts the call'], answer: 1 },
          ],
          nodes: [
            { id: 'MAX_RETRIES', label: 'MAX_RETRIES' },
            { id: 'result', label: 'result' },
            { id: 'attempt', label: 'attempt' },
          ],
          edges: [{ from: 'MAX_RETRIES', to: 'attempt' }, { from: 'attempt', to: 'result' }],
          steps: [
            { line: 1, desc: 'MAX_RETRIES = 3', action: { type: 'create', name: 'MAX_RETRIES', val: '3', color: '#BA7517' } },
            { line: 3, desc: 'Define call_api', action: { type: 'fn_def', name: 'call_api', color: '#D85A30' } },
            { line: 8, desc: 'result = None', action: { type: 'create', name: 'result', val: 'None', color: '#ef4444' } },
            { line: 9, desc: 'attempt = 0 → call_api(0)', action: { type: 'loop', name: 'attempt', val: '0', target: 'MAX_RETRIES', color: '#E24B4A' } },
            { line: 4, desc: '0 < 2 → return None (fail)', action: { type: 'update', name: 'result', val: 'None', color: '#ef4444' } },
            { line: 13, desc: 'Print Retry 1', action: { type: 'output', val: 'Retry 1' } },
            { line: 9, desc: 'attempt = 1 → call_api(1)', action: { type: 'loop', name: 'attempt', val: '1', target: 'MAX_RETRIES', color: '#E24B4A' } },
            { line: 4, desc: '1 < 2 → return None (fail again)', action: { type: 'update', name: 'result', val: 'None', color: '#ef4444' } },
            { line: 13, desc: 'Print Retry 2', action: { type: 'output', val: 'Retry 2' } },
            { line: 9, desc: 'attempt = 2 → call_api(2)', action: { type: 'loop', name: 'attempt', val: '2', target: 'MAX_RETRIES', color: '#E24B4A' } },
            { line: 5, desc: '2 >= 2 → return "success"!', action: { type: 'update', name: 'result', val: '"success"', color: '#1D9E75' } },
            { line: 11, desc: 'Print Done on attempt 3', action: { type: 'output', val: 'Done on attempt 3' } },
            { line: 14, desc: 'Print result = "success"', action: { type: 'output', val: 'success' } },
          ],
        },
        {
          id: 'message-queue',
          title: 'Message queue (producer/consumer)',
          concept: 'A queue decouples producers (who create work) from consumers (who process it).',
          code: `queue = []

def produce(task):
    queue.append(task)
    print("Produced:", task)

def consume():
    if queue:
        task = queue.pop(0)
        print("Consumed:", task)
        return task
    print("Queue empty")

produce("email_1")
produce("email_2")
consume()
consume()
consume()`,
          explanation: 'produce() adds tasks to the back. consume() takes from the front. The consumer works independently of the producer.',
          challenge: 'What would happen if you had 3 producers and 1 consumer running simultaneously?',
          quiz: [
            { question: 'What is in the queue after two produces?', options: ['["email_2"]', '["email_1","email_2"]', '["email_2","email_1"]', 'empty'], answer: 1 },
            { question: 'What does the third consume() call print?', options: ['"Consumed: email_2"', '"Consumed: email_1"', '"Queue empty"', 'Error'], answer: 2 },
            { question: 'What is the main benefit of a message queue?', options: ['Faster DB writes', 'Decouples producers from consumers — they work at different speeds', 'Caches API responses', 'Encrypts messages'], answer: 1 },
          ],
          nodes: [
            { id: 'queue', label: 'queue' },
            { id: 'produce', label: 'produce' },
            { id: 'consume', label: 'consume' },
          ],
          edges: [{ from: 'produce', to: 'queue' }, { from: 'queue', to: 'consume' }],
          steps: [
            { line: 0, desc: 'queue = [] (empty message queue)', action: { type: 'create', name: 'queue', val: '[]', color: '#7C6AF6' } },
            { line: 2, desc: 'Define produce (writer)', action: { type: 'fn_def', name: 'produce', color: '#1D9E75' } },
            { line: 7, desc: 'Define consume (reader)', action: { type: 'fn_def', name: 'consume', color: '#D85A30' } },
            { line: 13, desc: 'produce("email_1")', action: { type: 'fn_call', name: 'produce', arg: '"email_1"' } },
            { line: 3, desc: 'queue = ["email_1"]', action: { type: 'update', name: 'queue', val: '["email_1"]', color: '#7C6AF6' } },
            { line: 13, desc: 'Print Produced: email_1', action: { type: 'output', val: 'Produced: email_1' } },
            { line: 14, desc: 'produce("email_2")', action: { type: 'fn_call', name: 'produce', arg: '"email_2"' } },
            { line: 3, desc: 'queue = ["email_1","email_2"]', action: { type: 'update', name: 'queue', val: '["email_1","email_2"]', color: '#7C6AF6' } },
            { line: 14, desc: 'Print Produced: email_2', action: { type: 'output', val: 'Produced: email_2' } },
            { line: 15, desc: 'consume() → pop front', action: { type: 'fn_call', name: 'consume', arg: '' } },
            { line: 8, desc: 'queue = ["email_2"]', action: { type: 'update', name: 'queue', val: '["email_2"]', color: '#7C6AF6' } },
            { line: 15, desc: 'Print Consumed: email_1', action: { type: 'output', val: 'Consumed: email_1' } },
            { line: 16, desc: 'consume() again', action: { type: 'fn_call', name: 'consume', arg: '' } },
            { line: 8, desc: 'queue = []', action: { type: 'update', name: 'queue', val: '[]', color: '#7C6AF6' } },
            { line: 16, desc: 'Print Consumed: email_2', action: { type: 'output', val: 'Consumed: email_2' } },
            { line: 17, desc: 'consume() — queue empty', action: { type: 'fn_call', name: 'consume', arg: '' } },
            { line: 17, desc: 'Print Queue empty', action: { type: 'output', val: 'Queue empty' } },
          ],
        },
        {
          id: 'pagination',
          title: 'Pagination',
          concept: 'Instead of returning all data at once, return it in pages to save bandwidth.',
          code: `data = list(range(1, 21))
PAGE_SIZE = 5

def get_page(page):
    start = page * PAGE_SIZE
    end = start + PAGE_SIZE
    return data[start:end]

print(get_page(0))
print(get_page(1))
print(get_page(3))`,
          explanation: 'Page 0 = items 0-4, Page 1 = items 5-9. Slicing the list gives just the right chunk.',
          challenge: 'How many total pages are there? How would you calculate that?',
          quiz: [
            { question: 'What does `get_page(0)` return?', options: ['[1,2,3,4,5]', '[0,1,2,3,4]', '[6,7,8,9,10]', '[5,6,7,8,9]'], answer: 0 },
            { question: 'What does `get_page(1)` return?', options: ['[1,2,3,4,5]', '[11,12,13,14,15]', '[6,7,8,9,10]', '[5,6,7,8,9]'], answer: 2 },
            { question: 'Why is pagination important in APIs?', options: ['Makes responses faster to encrypt', 'Avoids sending millions of rows at once', 'Caches responses automatically', 'Enables rate limiting'], answer: 1 },
          ],
          nodes: [
            { id: 'data', label: 'data' },
            { id: 'PAGE_SIZE', label: 'PAGE_SIZE' },
            { id: 'get_page', label: 'get_page' },
          ],
          edges: [{ from: 'data', to: 'get_page' }, { from: 'PAGE_SIZE', to: 'get_page' }],
          steps: [
            { line: 0, desc: 'data = [1..20] (20 items total)', action: { type: 'create', name: 'data', val: '[1,2,...,20]', color: '#1D9E75' } },
            { line: 1, desc: 'PAGE_SIZE = 5', action: { type: 'create', name: 'PAGE_SIZE', val: '5', color: '#BA7517' } },
            { line: 3, desc: 'Define get_page', action: { type: 'fn_def', name: 'get_page', color: '#D85A30' } },
            { line: 8, desc: 'get_page(0): start=0, end=5', action: { type: 'fn_call', name: 'get_page', arg: '0' } },
            { line: 8, desc: 'Return data[0:5] = [1,2,3,4,5]', action: { type: 'output', val: '[1, 2, 3, 4, 5]' } },
            { line: 9, desc: 'get_page(1): start=5, end=10', action: { type: 'fn_call', name: 'get_page', arg: '1' } },
            { line: 9, desc: 'Return data[5:10] = [6,7,8,9,10]', action: { type: 'output', val: '[6, 7, 8, 9, 10]' } },
            { line: 10, desc: 'get_page(3): start=15, end=20', action: { type: 'fn_call', name: 'get_page', arg: '3' } },
            { line: 10, desc: 'Return data[15:20] = [16,17,18,19,20]', action: { type: 'output', val: '[16, 17, 18, 19, 20]' } },
          ],
        },
      ],
    },

    // ── MEDIUM ── API Patterns ────────────────────────────────────────────
    medium: {
      id: 'medium',
      label: 'Medium',
      description: 'Learn how APIs are structured — request/response, error handling, and versioning.',
      examples: [
        {
          id: 'request-response',
          title: 'Request / response pattern',
          concept: 'Every API call is a request that gets back a structured response with status and data.',
          code: `def make_response(status, data=None, error=None):
    return {"status": status, "data": data, "error": error}

def get_user(user_id):
    users = {"u1": "Alice", "u2": "Bob"}
    if user_id in users:
        return make_response(200, data=users[user_id])
    return make_response(404, error="User not found")

r1 = get_user("u1")
r2 = get_user("u99")
print(r1["status"], r1["data"])
print(r2["status"], r2["error"])`,
          explanation: 'A 200 means success with data. A 404 means not found with an error message. Every API uses this pattern.',
          challenge: 'What status code would you return for a bad request (wrong format)?',
          quiz: [
            { question: 'What is `r1["status"]`?', options: ['404', '500', '200', '201'], answer: 2 },
            { question: 'What is `r2["error"]`?', options: ['"Alice"', 'None', '"User not found"', '404'], answer: 2 },
            { question: 'What HTTP status code means "not found"?', options: ['200', '500', '201', '404'], answer: 3 },
          ],
          nodes: [
            { id: 'make_response', label: 'make_response' },
            { id: 'get_user', label: 'get_user' },
            { id: 'r1', label: 'r1' },
            { id: 'r2', label: 'r2' },
          ],
          edges: [{ from: 'make_response', to: 'get_user' }, { from: 'get_user', to: 'r1' }, { from: 'get_user', to: 'r2' }],
          steps: [
            { line: 0, desc: 'Define make_response helper', action: { type: 'fn_def', name: 'make_response', color: '#7C6AF6' } },
            { line: 3, desc: 'Define get_user endpoint', action: { type: 'fn_def', name: 'get_user', color: '#D85A30' } },
            { line: 9, desc: 'get_user("u1")', action: { type: 'fn_call', name: 'get_user', arg: '"u1"' } },
            { line: 4, desc: '"u1" found in users dict', action: { type: 'create', name: 'users', val: '{"u1":"Alice","u2":"Bob"}', color: '#1D9E75' } },
            { line: 6, desc: 'Return 200 with data "Alice"', action: { type: 'create', name: 'r1', val: '{status:200,data:"Alice"}', color: '#1D9E75' } },
            { line: 10, desc: 'get_user("u99")', action: { type: 'fn_call', name: 'get_user', arg: '"u99"' } },
            { line: 7, desc: '"u99" not found → return 404', action: { type: 'create', name: 'r2', val: '{status:404,error:"User not found"}', color: '#ef4444' } },
            { line: 11, desc: 'Print r1: 200 Alice', action: { type: 'output', val: '200 Alice' } },
            { line: 12, desc: 'Print r2: 404 User not found', action: { type: 'output', val: '404 User not found' } },
          ],
        },
        {
          id: 'input-validation',
          title: 'Input validation',
          concept: 'Always validate inputs before processing — reject bad data early with clear errors.',
          code: `def create_user(name, age):
    errors = []
    if not name or len(name) < 2:
        errors.append("name too short")
    if not isinstance(age, int) or age < 0:
        errors.append("age must be positive int")
    if errors:
        return {"ok": False, "errors": errors}
    return {"ok": True, "user": {"name": name, "age": age}}

print(create_user("Al", 25))
print(create_user("", -1))`,
          explanation: 'Collect all validation errors first. Return them together so the caller can fix everything at once.',
          challenge: 'What would you add to validate that age is not over 150?',
          quiz: [
            { question: 'What does `create_user("Al", 25)` return?', options: ['{"ok":False}', '{"ok":True,"user":{...}}', 'None', 'Error'], answer: 1 },
            { question: 'What does `create_user("", -1)` return?', options: ['{"ok":True}', 'None', '{"ok":False,"errors":[...]}', '404'], answer: 2 },
            { question: 'Why collect all errors before returning?', options: ['Faster to process', 'Caller can fix all issues at once, not one by one', 'Required by Python', 'Encrypts the data'], answer: 1 },
          ],
          nodes: [
            { id: 'create_user', label: 'create_user' },
            { id: 'errors', label: 'errors' },
          ],
          edges: [{ from: 'create_user', to: 'errors' }],
          steps: [
            { line: 0, desc: 'Define create_user', action: { type: 'fn_def', name: 'create_user', color: '#D85A30' } },
            { line: 10, desc: 'create_user("Al", 25)', action: { type: 'fn_call', name: 'create_user', arg: '"Al", 25' } },
            { line: 1, desc: 'errors = []', action: { type: 'create', name: 'errors', val: '[]', color: '#ef4444' } },
            { line: 2, desc: '"Al" length=2 >= 2 → name OK', action: { type: 'update', name: 'errors', val: '[]', color: '#1D9E75' } },
            { line: 4, desc: '25 is int and >= 0 → age OK', action: { type: 'update', name: 'errors', val: '[]', color: '#1D9E75' } },
            { line: 6, desc: 'No errors → return ok user', action: { type: 'output', val: '{"ok": True, "user": {"name": "Al", "age": 25}}' } },
            { line: 11, desc: 'create_user("", -1)', action: { type: 'fn_call', name: 'create_user', arg: '"", -1' } },
            { line: 1, desc: 'errors = []', action: { type: 'update', name: 'errors', val: '[]', color: '#ef4444' } },
            { line: 2, desc: '"" length=0 < 2 → add error', action: { type: 'update', name: 'errors', val: '["name too short"]', color: '#ef4444' } },
            { line: 4, desc: '-1 < 0 → add error', action: { type: 'update', name: 'errors', val: '["name too short","age must be positive int"]', color: '#ef4444' } },
            { line: 6, desc: 'errors not empty → return failures', action: { type: 'output', val: '{"ok": False, "errors": ["name too short", "age must be positive int"]}' } },
          ],
        },
        {
          id: 'api-versioning',
          title: 'API versioning',
          concept: 'Version your API so old clients keep working when you make breaking changes.',
          code: `def get_user_v1(user_id):
    return {"name": "Alice", "age": 25}

def get_user_v2(user_id):
    return {"name": "Alice", "age": 25, "email": "alice@example.com"}

def route(version, user_id):
    if version == "v1":
        return get_user_v1(user_id)
    if version == "v2":
        return get_user_v2(user_id)
    return {"error": "unknown version"}

print(route("v1", "u1"))
print(route("v2", "u1"))`,
          explanation: 'v1 returns name and age. v2 adds email. Both work side by side — old clients use v1, new ones use v2.',
          challenge: 'What should you do when you want to retire v1 completely?',
          quiz: [
            { question: 'What extra field does v2 add?', options: ['"phone"', '"id"', '"email"', '"role"'], answer: 2 },
            { question: 'What does `route("v3","u1")` return?', options: ['None', 'v1 response', '{"error":"unknown version"}', 'v2 response'], answer: 2 },
            { question: 'Why is API versioning important?', options: ['Faster response times', 'Old clients break when APIs change without versioning', 'Reduces server load', 'Encrypts API calls'], answer: 1 },
          ],
          nodes: [
            { id: 'get_user_v1', label: 'v1' },
            { id: 'get_user_v2', label: 'v2' },
            { id: 'route', label: 'route' },
          ],
          edges: [{ from: 'route', to: 'get_user_v1' }, { from: 'route', to: 'get_user_v2' }],
          steps: [
            { line: 0, desc: 'Define get_user_v1 (original API)', action: { type: 'fn_def', name: 'get_user_v1', color: '#7C6AF6' } },
            { line: 3, desc: 'Define get_user_v2 (new API with email)', action: { type: 'fn_def', name: 'get_user_v2', color: '#1D9E75' } },
            { line: 6, desc: 'Define route (dispatcher)', action: { type: 'fn_def', name: 'route', color: '#D85A30' } },
            { line: 13, desc: 'route("v1", "u1")', action: { type: 'fn_call', name: 'route', arg: '"v1","u1"' } },
            { line: 7, desc: 'version == "v1" → call get_user_v1', action: { type: 'fn_call', name: 'get_user_v1', arg: '"u1"' } },
            { line: 13, desc: 'Print v1 response (no email)', action: { type: 'output', val: '{"name": "Alice", "age": 25}' } },
            { line: 14, desc: 'route("v2", "u1")', action: { type: 'fn_call', name: 'route', arg: '"v2","u1"' } },
            { line: 9, desc: 'version == "v2" → call get_user_v2', action: { type: 'fn_call', name: 'get_user_v2', arg: '"u1"' } },
            { line: 14, desc: 'Print v2 response (with email)', action: { type: 'output', val: '{"name": "Alice", "age": 25, "email": "alice@example.com"}' } },
          ],
        },
        {
          id: 'batch-processing',
          title: 'Batch processing',
          concept: 'Process multiple items together in one operation instead of one at a time.',
          code: `def process_one(item):
    return item * 2

def process_batch(items):
    results = []
    for item in items:
        results.append(process_one(item))
    return results

single = process_one(5)
batch = process_batch([1, 2, 3, 4, 5])
print("Single:", single)
print("Batch:", batch)`,
          explanation: 'process_batch handles the whole list in one call. This is far more efficient than calling process_one 5 separate times.',
          challenge: 'What would be the benefit of batching 1000 database writes instead of 1000 individual writes?',
          quiz: [
            { question: 'What does `process_batch([1,2,3,4,5])` return?', options: ['[1,2,3,4,5]', '[2,4,6,8,10]', '[1,4,9,16,25]', '[0,2,4,6,8]'], answer: 1 },
            { question: 'What is `single`?', options: ['5', '25', '10', '2'], answer: 2 },
            { question: 'Why is batch processing more efficient?', options: ['Uses less CPU', 'Reduces repeated overhead — connect once, process many', 'Avoids using loops', 'Caches all results'], answer: 1 },
          ],
          nodes: [
            { id: 'process_one', label: 'process_one' },
            { id: 'process_batch', label: 'process_batch' },
            { id: 'results', label: 'results' },
          ],
          edges: [{ from: 'process_one', to: 'process_batch' }, { from: 'process_batch', to: 'results' }],
          steps: [
            { line: 0, desc: 'Define process_one (item × 2)', action: { type: 'fn_def', name: 'process_one', color: '#7C6AF6' } },
            { line: 3, desc: 'Define process_batch', action: { type: 'fn_def', name: 'process_batch', color: '#D85A30' } },
            { line: 9, desc: 'single = process_one(5) = 10', action: { type: 'create', name: 'single', val: '10', color: '#7C6AF6' } },
            { line: 10, desc: 'process_batch([1,2,3,4,5])', action: { type: 'fn_call', name: 'process_batch', arg: '[1,2,3,4,5]' } },
            { line: 4, desc: 'results = []', action: { type: 'create', name: 'results', val: '[]', color: '#1D9E75' } },
            { line: 5, desc: 'item=1 → process_one(1) = 2', action: { type: 'loop', name: 'item', val: '1', target: 'process_batch', color: '#E24B4A' } },
            { line: 6, desc: 'results = [2]', action: { type: 'update', name: 'results', val: '[2]', color: '#1D9E75' } },
            { line: 5, desc: 'item=2 → process_one(2) = 4', action: { type: 'loop', name: 'item', val: '2', target: 'process_batch', color: '#E24B4A' } },
            { line: 6, desc: 'results = [2,4]', action: { type: 'update', name: 'results', val: '[2,4]', color: '#1D9E75' } },
            { line: 5, desc: 'item=5 → process_one(5) = 10', action: { type: 'loop', name: 'item', val: '5', target: 'process_batch', color: '#E24B4A' } },
            { line: 6, desc: 'results = [2,4,6,8,10]', action: { type: 'update', name: 'results', val: '[2,4,6,8,10]', color: '#1D9E75' } },
            { line: 11, desc: 'Print Single: 10', action: { type: 'output', val: 'Single: 10' } },
            { line: 12, desc: 'Print Batch: [2,4,6,8,10]', action: { type: 'output', val: 'Batch: [2, 4, 6, 8, 10]' } },
          ],
        },
        {
          id: 'idempotency',
          title: 'Idempotency',
          concept: 'An idempotent operation gives the same result no matter how many times you call it.',
          code: `processed = set()

def process_payment(payment_id, amount):
    if payment_id in processed:
        return "Already processed: " + payment_id
    processed.add(payment_id)
    return "Paid: " + str(amount)

print(process_payment("pay_1", 100))
print(process_payment("pay_1", 100))
print(process_payment("pay_2", 50))`,
          explanation: 'The same payment_id processed twice only charges once. This prevents duplicate charges if a request is retried.',
          challenge: 'Why is idempotency especially important for payment and order APIs?',
          quiz: [
            { question: 'What does the second call to process_payment("pay_1", 100) return?', options: ['"Paid: 100"', '"Error"', '"Already processed: pay_1"', 'None'], answer: 2 },
            { question: 'What data structure tracks processed IDs?', options: ['list', 'dict', 'tuple', 'set'], answer: 3 },
            { question: 'Why is idempotency important in distributed systems?', options: ['Speeds up processing', 'Network retries can cause duplicate operations without it', 'Reduces memory usage', 'Enables caching'], answer: 1 },
          ],
          nodes: [
            { id: 'processed', label: 'processed' },
            { id: 'process_payment', label: 'process_payment' },
          ],
          edges: [{ from: 'process_payment', to: 'processed' }],
          steps: [
            { line: 0, desc: 'processed = set() (seen IDs)', action: { type: 'create', name: 'processed', val: 'set()', color: '#7C6AF6' } },
            { line: 2, desc: 'Define process_payment', action: { type: 'fn_def', name: 'process_payment', color: '#D85A30' } },
            { line: 8, desc: 'process_payment("pay_1", 100) — first time', action: { type: 'fn_call', name: 'process_payment', arg: '"pay_1", 100' } },
            { line: 3, desc: '"pay_1" not in processed → proceed', action: { type: 'update', name: 'processed', val: 'set()', color: '#1D9E75' } },
            { line: 5, desc: 'Add "pay_1" to processed', action: { type: 'update', name: 'processed', val: '{"pay_1"}', color: '#7C6AF6' } },
            { line: 8, desc: 'Print Paid: 100', action: { type: 'output', val: 'Paid: 100' } },
            { line: 9, desc: 'process_payment("pay_1", 100) — duplicate!', action: { type: 'fn_call', name: 'process_payment', arg: '"pay_1", 100' } },
            { line: 3, desc: '"pay_1" already in processed → block', action: { type: 'update', name: 'processed', val: '{"pay_1"}', color: '#ef4444' } },
            { line: 9, desc: 'Print Already processed: pay_1', action: { type: 'output', val: 'Already processed: pay_1' } },
            { line: 10, desc: 'process_payment("pay_2", 50) — new ID', action: { type: 'fn_call', name: 'process_payment', arg: '"pay_2", 50' } },
            { line: 5, desc: 'Add "pay_2" → processed = {"pay_1","pay_2"}', action: { type: 'update', name: 'processed', val: '{"pay_1","pay_2"}', color: '#7C6AF6' } },
            { line: 10, desc: 'Print Paid: 50', action: { type: 'output', val: 'Paid: 50' } },
          ],
        },
      ],
    },

    // ── HARD ── Advanced Patterns ─────────────────────────────────────────
    hard: {
      id: 'hard',
      label: 'Hard',
      description: 'Master advanced system patterns — pub/sub, circuit breakers, event logs, and hashing.',
      examples: [
        {
          id: 'pubsub',
          title: 'Pub/Sub pattern',
          concept: 'Publishers send events without knowing who listens. Subscribers react to events they care about.',
          code: `subscribers = {}

def subscribe(event, handler):
    if event not in subscribers:
        subscribers[event] = []
    subscribers[event].append(handler)

def publish(event, data):
    for handler in subscribers.get(event, []):
        handler(data)

subscribe("login", lambda d: print("Log:", d))
subscribe("login", lambda d: print("Email:", d))
publish("login", "user_alice")
publish("logout", "user_alice")`,
          explanation: 'Two handlers subscribe to "login". When publish fires, both run. "logout" has no subscribers so nothing happens.',
          challenge: 'How would you implement an "unsubscribe" function?',
          quiz: [
            { question: 'How many handlers are called when "login" is published?', options: ['0', '1', '3', '2'], answer: 3 },
            { question: 'What happens when "logout" is published?', options: ['Error', 'One handler runs', 'Nothing — no subscribers', 'All handlers run'], answer: 2 },
            { question: 'What real-world system uses pub/sub?', options: ['SQL databases', 'File systems', 'Kafka / Redis Pub-Sub', 'HTTP load balancers'], answer: 2 },
          ],
          nodes: [
            { id: 'subscribers', label: 'subscribers' },
            { id: 'subscribe', label: 'subscribe' },
            { id: 'publish', label: 'publish' },
          ],
          edges: [{ from: 'subscribe', to: 'subscribers' }, { from: 'publish', to: 'subscribers' }],
          steps: [
            { line: 0, desc: 'subscribers = {} (event registry)', action: { type: 'create', name: 'subscribers', val: '{}', color: '#7C6AF6' } },
            { line: 2, desc: 'Define subscribe', action: { type: 'fn_def', name: 'subscribe', color: '#1D9E75' } },
            { line: 7, desc: 'Define publish', action: { type: 'fn_def', name: 'publish', color: '#D85A30' } },
            { line: 11, desc: 'subscribe("login", log handler)', action: { type: 'fn_call', name: 'subscribe', arg: '"login", handler1' } },
            { line: 3, desc: 'subscribers = {"login":[handler1]}', action: { type: 'update', name: 'subscribers', val: '{"login":[handler1]}', color: '#7C6AF6' } },
            { line: 12, desc: 'subscribe("login", email handler)', action: { type: 'fn_call', name: 'subscribe', arg: '"login", handler2' } },
            { line: 5, desc: 'subscribers = {"login":[h1,h2]}', action: { type: 'update', name: 'subscribers', val: '{"login":[h1,h2]}', color: '#7C6AF6' } },
            { line: 13, desc: 'publish("login", "user_alice")', action: { type: 'fn_call', name: 'publish', arg: '"login","user_alice"' } },
            { line: 9, desc: 'Call handler1 → Log: user_alice', action: { type: 'output', val: 'Log: user_alice' } },
            { line: 9, desc: 'Call handler2 → Email: user_alice', action: { type: 'output', val: 'Email: user_alice' } },
            { line: 14, desc: 'publish("logout") — no subscribers', action: { type: 'fn_call', name: 'publish', arg: '"logout","user_alice"' } },
            { line: 8, desc: 'subscribers.get("logout",[]) = [] → nothing runs', action: { type: 'update', name: 'subscribers', val: '{"login":[h1,h2]}', color: '#7C6AF6' } },
          ],
        },
        {
          id: 'circuit-breaker',
          title: 'Circuit breaker',
          concept: 'Stop calling a failing service automatically. Reset after a cooldown period.',
          code: `state = "CLOSED"
failures = 0
THRESHOLD = 3

def call_service():
    global state, failures
    if state == "OPEN":
        return "CIRCUIT OPEN — fast fail"
    result = None
    failures = failures + 1
    if failures >= THRESHOLD:
        state = "OPEN"
        return "FAILED — circuit opened!"
    return "FAILED"

print(call_service())
print(call_service())
print(call_service())
print(call_service())`,
          explanation: 'After 3 failures the circuit trips to OPEN. The 4th call fast-fails immediately without hitting the service.',
          challenge: 'How would you add a "half-open" state to test if the service has recovered?',
          quiz: [
            { question: 'What does the 4th call return?', options: ['"FAILED"', '"SUCCESS"', '"CIRCUIT OPEN — fast fail"', 'None'], answer: 2 },
            { question: 'What is `state` after the 3rd call?', options: ['"CLOSED"', '"HALF-OPEN"', '"FAILED"', '"OPEN"'], answer: 3 },
            { question: 'What is the main benefit of a circuit breaker?', options: ['Caches responses', 'Prevents cascading failures by stopping calls to broken services', 'Retries failed requests', 'Balances load'], answer: 1 },
          ],
          nodes: [
            { id: 'state', label: 'state' },
            { id: 'failures', label: 'failures' },
            { id: 'THRESHOLD', label: 'THRESHOLD' },
          ],
          edges: [{ from: 'failures', to: 'state' }, { from: 'THRESHOLD', to: 'state' }],
          steps: [
            { line: 0, desc: 'state = "CLOSED" (circuit normal)', action: { type: 'create', name: 'state', val: '"CLOSED"', color: '#1D9E75' } },
            { line: 1, desc: 'failures = 0', action: { type: 'create', name: 'failures', val: '0', color: '#7C6AF6' } },
            { line: 2, desc: 'THRESHOLD = 3', action: { type: 'create', name: 'THRESHOLD', val: '3', color: '#BA7517' } },
            { line: 4, desc: 'Define call_service', action: { type: 'fn_def', name: 'call_service', color: '#D85A30' } },
            { line: 14, desc: 'Call 1: state=CLOSED, failures=0→1', action: { type: 'fn_call', name: 'call_service', arg: '' } },
            { line: 9, desc: 'failures = 1', action: { type: 'update', name: 'failures', val: '1', color: '#ef4444' } },
            { line: 14, desc: 'Print FAILED', action: { type: 'output', val: 'FAILED' } },
            { line: 15, desc: 'Call 2: failures=1→2', action: { type: 'fn_call', name: 'call_service', arg: '' } },
            { line: 9, desc: 'failures = 2', action: { type: 'update', name: 'failures', val: '2', color: '#ef4444' } },
            { line: 15, desc: 'Print FAILED', action: { type: 'output', val: 'FAILED' } },
            { line: 16, desc: 'Call 3: failures=2→3 >= THRESHOLD!', action: { type: 'fn_call', name: 'call_service', arg: '' } },
            { line: 9, desc: 'failures = 3', action: { type: 'update', name: 'failures', val: '3', color: '#ef4444' } },
            { line: 10, desc: 'state = "OPEN" (circuit tripped!)', action: { type: 'update', name: 'state', val: '"OPEN"', color: '#ef4444' } },
            { line: 16, desc: 'Print FAILED — circuit opened!', action: { type: 'output', val: 'FAILED — circuit opened!' } },
            { line: 17, desc: 'Call 4: state=OPEN → fast fail!', action: { type: 'fn_call', name: 'call_service', arg: '' } },
            { line: 6, desc: 'state is OPEN → return immediately', action: { type: 'output', val: 'CIRCUIT OPEN — fast fail' } },
          ],
        },
        {
          id: 'event-log',
          title: 'Event log (event sourcing)',
          concept: 'Store every action as an immutable event. Reconstruct current state by replaying events.',
          code: `events = []

def apply_event(event):
    events.append(event)

def get_balance():
    balance = 0
    for e in events:
        if e["type"] == "deposit":
            balance = balance + e["amount"]
        elif e["type"] == "withdraw":
            balance = balance - e["amount"]
    return balance

apply_event({"type": "deposit",  "amount": 100})
apply_event({"type": "deposit",  "amount": 50})
apply_event({"type": "withdraw", "amount": 30})
print(get_balance())
print(len(events), "events stored")`,
          explanation: 'Instead of storing "balance=120", we store every transaction. get_balance() replays all events to compute the current state.',
          challenge: 'What is the benefit of event sourcing over just storing the current balance?',
          quiz: [
            { question: 'What does `get_balance()` return?', options: ['100', '150', '120', '80'], answer: 2 },
            { question: 'How many events are stored?', options: ['1', '2', '4', '3'], answer: 3 },
            { question: 'What is the main advantage of event sourcing?', options: ['Faster reads', 'Full audit trail — you can replay all history', 'Less storage used', 'No need for a database'], answer: 1 },
          ],
          nodes: [
            { id: 'events', label: 'events' },
            { id: 'balance', label: 'balance' },
          ],
          edges: [{ from: 'events', to: 'balance' }],
          steps: [
            { line: 0, desc: 'events = [] (empty event log)', action: { type: 'create', name: 'events', val: '[]', color: '#7C6AF6' } },
            { line: 2, desc: 'Define apply_event', action: { type: 'fn_def', name: 'apply_event', color: '#D85A30' } },
            { line: 5, desc: 'Define get_balance (replay)', action: { type: 'fn_def', name: 'get_balance', color: '#1D9E75' } },
            { line: 14, desc: 'apply_event deposit 100', action: { type: 'fn_call', name: 'apply_event', arg: 'deposit 100' } },
            { line: 3, desc: 'events = [{deposit:100}]', action: { type: 'update', name: 'events', val: '[{deposit:100}]', color: '#7C6AF6' } },
            { line: 15, desc: 'apply_event deposit 50', action: { type: 'fn_call', name: 'apply_event', arg: 'deposit 50' } },
            { line: 3, desc: 'events = [{deposit:100},{deposit:50}]', action: { type: 'update', name: 'events', val: '[{dep:100},{dep:50}]', color: '#7C6AF6' } },
            { line: 16, desc: 'apply_event withdraw 30', action: { type: 'fn_call', name: 'apply_event', arg: 'withdraw 30' } },
            { line: 3, desc: 'events = [dep100,dep50,wdw30]', action: { type: 'update', name: 'events', val: '[dep100,dep50,wdw30]', color: '#7C6AF6' } },
            { line: 17, desc: 'get_balance() — replay all events', action: { type: 'fn_call', name: 'get_balance', arg: '' } },
            { line: 6, desc: 'balance = 0', action: { type: 'create', name: 'balance', val: '0', color: '#1D9E75' } },
            { line: 8, desc: 'deposit 100 → balance = 100', action: { type: 'update', name: 'balance', val: '100', color: '#1D9E75' } },
            { line: 8, desc: 'deposit 50 → balance = 150', action: { type: 'update', name: 'balance', val: '150', color: '#1D9E75' } },
            { line: 10, desc: 'withdraw 30 → balance = 120', action: { type: 'update', name: 'balance', val: '120', color: '#1D9E75' } },
            { line: 17, desc: 'Print 120', action: { type: 'output', val: '120' } },
            { line: 18, desc: 'Print 3 events stored', action: { type: 'output', val: '3 events stored' } },
          ],
        },
        {
          id: 'consistent-hashing',
          title: 'Consistent hashing (routing)',
          concept: 'Use a hash of the key to decide which server handles the request — same key always goes to the same server.',
          code: `servers = ["s1", "s2", "s3"]

def get_server(key):
    index = hash(key) % len(servers)
    return servers[index]

keys = ["user_1", "user_2", "user_3", "user_4"]
for k in keys:
    print(k, "→", get_server(k))`,
          explanation: 'hash(key) % len(servers) gives a consistent index. The same key always routes to the same server — no lookups needed.',
          challenge: 'What happens to routing when you add a 4th server?',
          quiz: [
            { question: 'What ensures the same key always goes to the same server?', options: ['Random selection', 'Round robin', 'hash(key) % len(servers)', 'The server list order'], answer: 2 },
            { question: 'What is `hash("user_1") % 3` deterministic for?', options: ['It changes every run', 'It always gives the same server for the same key', 'It randomly picks a server', 'It balances by load'], answer: 1 },
            { question: 'What real system uses consistent hashing?', options: ['SQL joins', 'Distributed caches like Redis Cluster', 'HTTP headers', 'File compression'], answer: 1 },
          ],
          nodes: [
            { id: 'servers', label: 'servers' },
            { id: 'get_server', label: 'get_server' },
            { id: 'k', label: 'k' },
          ],
          edges: [{ from: 'k', to: 'get_server' }, { from: 'get_server', to: 'servers' }],
          steps: [
            { line: 0, desc: 'servers = ["s1","s2","s3"]', action: { type: 'create', name: 'servers', val: '["s1","s2","s3"]', color: '#1D9E75' } },
            { line: 2, desc: 'Define get_server (hash router)', action: { type: 'fn_def', name: 'get_server', color: '#D85A30' } },
            { line: 6, desc: 'keys = ["user_1","user_2","user_3","user_4"]', action: { type: 'create', name: 'keys', val: '["user_1",...]', color: '#7C6AF6' } },
            { line: 7, desc: 'k = "user_1" → hash % 3 → some server', action: { type: 'loop', name: 'k', val: '"user_1"', target: 'keys', color: '#E24B4A' } },
            { line: 7, desc: 'Print user_1 → s2 (example)', action: { type: 'output', val: 'user_1 → s2' } },
            { line: 7, desc: 'k = "user_2" → different hash → different server', action: { type: 'loop', name: 'k', val: '"user_2"', target: 'keys', color: '#E24B4A' } },
            { line: 7, desc: 'Print user_2 → s1 (example)', action: { type: 'output', val: 'user_2 → s1' } },
            { line: 7, desc: 'k = "user_3"', action: { type: 'loop', name: 'k', val: '"user_3"', target: 'keys', color: '#E24B4A' } },
            { line: 7, desc: 'Print user_3 → s3 (example)', action: { type: 'output', val: 'user_3 → s3' } },
            { line: 7, desc: 'k = "user_4"', action: { type: 'loop', name: 'k', val: '"user_4"', target: 'keys', color: '#E24B4A' } },
            { line: 7, desc: 'Print user_4 → s1 (example)', action: { type: 'output', val: 'user_4 → s1' } },
          ],
        },
        {
          id: 'connection-pool',
          title: 'Connection pooling',
          concept: 'Reuse a fixed set of connections instead of opening a new one for every request.',
          code: `pool = ["conn_1", "conn_2", "conn_3"]
in_use = []

def get_connection():
    if pool:
        conn = pool.pop(0)
        in_use.append(conn)
        print("Got:", conn)
        return conn
    print("Pool empty — wait!")
    return None

def release(conn):
    in_use.remove(conn)
    pool.append(conn)
    print("Released:", conn)

c1 = get_connection()
c2 = get_connection()
release(c1)
c3 = get_connection()
print("In use:", in_use)`,
          explanation: 'Only 3 connections exist. get_connection() borrows one. release() returns it. c3 reuses the released connection.',
          challenge: 'What should happen when all 3 connections are in use and a 4th request comes in?',
          quiz: [
            { question: 'What does `get_connection()` return when pool is empty?', options: ['"conn_4"', '"conn_1"', 'None', 'Error'], answer: 2 },
            { question: 'What does `release(c1)` do?', options: ['Deletes conn_1', 'Moves conn_1 back to pool', 'Closes conn_1', 'Creates a new connection'], answer: 1 },
            { question: 'Why is connection pooling important?', options: ['Encrypts connections', 'Opening DB connections is expensive — pooling reuses them', 'Doubles throughput', 'Caches query results'], answer: 1 },
          ],
          nodes: [
            { id: 'pool', label: 'pool' },
            { id: 'in_use', label: 'in_use' },
          ],
          edges: [{ from: 'pool', to: 'in_use' }],
          steps: [
            { line: 0, desc: 'pool = ["conn_1","conn_2","conn_3"]', action: { type: 'create', name: 'pool', val: '["conn_1","conn_2","conn_3"]', color: '#1D9E75' } },
            { line: 1, desc: 'in_use = []', action: { type: 'create', name: 'in_use', val: '[]', color: '#7C6AF6' } },
            { line: 3, desc: 'Define get_connection', action: { type: 'fn_def', name: 'get_connection', color: '#D85A30' } },
            { line: 11, desc: 'Define release', action: { type: 'fn_def', name: 'release', color: '#1D9E75' } },
            { line: 16, desc: 'c1 = get_connection()', action: { type: 'fn_call', name: 'get_connection', arg: '' } },
            { line: 5, desc: 'pool → ["conn_2","conn_3"]', action: { type: 'update', name: 'pool', val: '["conn_2","conn_3"]', color: '#1D9E75' } },
            { line: 6, desc: 'in_use → ["conn_1"]', action: { type: 'update', name: 'in_use', val: '["conn_1"]', color: '#7C6AF6' } },
            { line: 16, desc: 'Print Got: conn_1', action: { type: 'output', val: 'Got: conn_1' } },
            { line: 17, desc: 'c2 = get_connection()', action: { type: 'fn_call', name: 'get_connection', arg: '' } },
            { line: 5, desc: 'pool → ["conn_3"] | in_use → ["conn_1","conn_2"]', action: { type: 'update', name: 'pool', val: '["conn_3"]', color: '#1D9E75' } },
            { line: 17, desc: 'Print Got: conn_2', action: { type: 'output', val: 'Got: conn_2' } },
            { line: 18, desc: 'release(c1) — return conn_1 to pool', action: { type: 'fn_call', name: 'release', arg: 'c1' } },
            { line: 12, desc: 'in_use → ["conn_2"] | pool → ["conn_3","conn_1"]', action: { type: 'update', name: 'pool', val: '["conn_3","conn_1"]', color: '#1D9E75' } },
            { line: 18, desc: 'Print Released: conn_1', action: { type: 'output', val: 'Released: conn_1' } },
            { line: 19, desc: 'c3 = get_connection() — reuses conn_3', action: { type: 'fn_call', name: 'get_connection', arg: '' } },
            { line: 6, desc: 'in_use → ["conn_2","conn_3"]', action: { type: 'update', name: 'in_use', val: '["conn_2","conn_3"]', color: '#7C6AF6' } },
            { line: 19, desc: 'Print Got: conn_3', action: { type: 'output', val: 'Got: conn_3' } },
            { line: 20, desc: 'Print In use: ["conn_2","conn_3"]', action: { type: 'output', val: 'In use: ["conn_2", "conn_3"]' } },
          ],
        },
      ],
    },
  },
};
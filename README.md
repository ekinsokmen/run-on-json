# run-on-json
This is a node.js based command line utility to process JSON files using JavaScript. The script can be provided directly as a command line parameter or as a script file. Given JSON file will be provided as a JSON object named `input` to the custom script. 

## Installation
```
npm install
```
or
```
npm install -g
```

## Usage
Content of sample input JSON file __sample.json__:

```
{
  "items": [
    {
      "id": 1,
      "name": "Lorem"
    },
    {
      "id": 2,
      "name": "Ipsum"
    },
    {
      "id": 3,
      "name": "Dummy"
    },
    {
      "id": 4,
      "name": "Foo"
    },
    {
      "id": 5,
      "name": "Bar"
    }
  ]
}
```

#### Basic usage:
Command to execute:

```
> run-on-json.js -i sample.json -s 'input.items.forEach(function (i){console.log(i.name);})'
```
Sample output:

```
Lorem
Ipsum
Dummy
Foo
Bar
```

#### Usage with script file:
Content of sample JavaScript file __sample_script.js__:

```
var filterById = function(i)
{
    return i.id >= 3;
};

var printOutItem = function(i)
{
    console.log(i.name);
}

input.items.filter(filterById).forEach(printOutItem);
```

Command to execute:

```
> run-on-json.js -i sample.json -f sample_script.js
```

Sample output:

```
Dummy
Foo
Bar
```

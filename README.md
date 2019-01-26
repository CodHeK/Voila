# Voila.js
![voila](https://img.shields.io/badge/npm-v1.2.0-blue.svg) ![build](https://img.shields.io/badge/build-passing-green.svg)
VoilaJS is a  SAML ( Syntactically awesome markup language ) which boosts your static front-end development process by allowing you to write your HTML in the form of modules, very similar to React but, with a much less steeper learning curve! ( All you need to know is to write `JSON` and that's easy! :stuck_out_tongue:)

The best part is HTML just became programmable :stuck_out_tongue: !! But how ?

What we thought was, CSS has it's programmable counter-part ( SASS ) why not HTML ? Guess what, now it has one, we call it SAML ( full form above ).

Just like other front-end frameworks, we too have out our own CLI to bootstrap your starter code.


## Installation :
#
```
$ npm i -g voila-cmd
```

Next, we need to initialize a project, it's simple!

```
$ voila init
```

This generates a `voila.json` file in your project directory and also a `config.js` file where you write all your HTML logic, sound's weird saying that doesn't it! :stuck_out_tongue:

```
{
  title: 'forms',
  description: 'forms',
  css: 'Bootstrap',
  entry: 'index.html',
  author: '',
  License: 'ISC',
  git: false,
  config: 'config.js'
}
```
You can also add `git repository` to your project, voila automatically initializes a empty git repository with the needed files in `.gitignore`.

```
$ cd directory
```

```
exports.root = [
  {
    div: [
      {
        id: 'root'
        //ADD YOUR ELEMENTS HERE
        div: [
          {
            class: 'col-md-3'
          }
        ],
        h1: [
          {
            class: 'title1',
            value: 'first h1'
          },
          {
            class: 'title2',
            value: 'second h1'
          }
        ]
      }
    ]
  }
]
```

Above, is an example of a simple configuration, ( configurations need to be written in the `JSON` format ).

This `JSON` gets compiled to the `HTML` below:

```
<root >
  <div id="root" >
    <div class="col-md-3" >  </div>

    <h1 class="title1" > first h1 </h1>

    <h1 class="title2" > second h1 </h1>
  </div>
</root>
```


Once, you've written your own `configuration`, voila needs to parse and compile it into `HTML`, to do that run...


```
$ voila load
```

We have built our own `parser` that parses the `JSON` configurations and converts them into it's equivalent `HTML` syntax.

This `HTML` is can be viewed by starting the `server`, just run ...

```
$ voila start
```

## Examples :
#
```
$ git clone this repository / download zip
```

```
$ cd example
```

```
$ voila start
```

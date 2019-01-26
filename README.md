# Voila.js
VoilaJS is a  SAML ( Syntactically awesome markup language ) which boosts your static front-end development process.

The best part is HTML just became programmable :stuck_out_tongue: !! But how ?

What we thought was, CSS has it's programmable counter-part ( SASS ) why not HTML ? Guess what, now it has one, we call it SAML ( full form above ).

Just like other front-end frameworks, we too have out our own CLI to bootstrap your starter code.

Installation :

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
exports.root = {
  div: {
    id: 'root',
    nav: {
      class: 'navbar'
    },
    div: {
      h1: {
        class: 'title',
        value: 'This is a H1 tag',
        style: {
            padding: '1em',
            margin: '0.5em'
            fontSize: '10px'
        }
      }
    }
  }
}
```

Above, is an example of a simple configuration, ( configurations need to be written in the `JSON` format ).

Once, you've written your own `configuration`, voila needs to parse and compile it into `HTML`, to do that run...

```
$ voila load
```

We have built our own `parser` that parses the `JSON` configurations and converts them into it's equivalent `HTML` syntax.

This `HTML` is can be viewed by starting the `server`, just run ...

```
$ voila start
```

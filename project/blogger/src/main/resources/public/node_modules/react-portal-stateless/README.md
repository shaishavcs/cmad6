React-portal-stateless
============
[![npm version](https://img.shields.io/npm/v/react-portal-stateless.svg?style=flat-square)](https://www.npmjs.com/package/react-portal-stateless)
[![npm downloads](https://img.shields.io/npm/dm/react-portal-stateless.svg?style=flat-square)](https://www.npmjs.com/package/react-portal-stateless)

This Project is a fork of [React Portal](https://github.com/tajo/react-portal) that implement Stateless version of it.

> Struggling with modals, lightboxes or loading bars in React? React-portal creates a new top-level React tree and injects its child into it. That's necessary for proper styling (especially positioning).

***
**react-portal is being rewritten, you are reading v3.x.x documentation**
***

## Features

- transports its child into a new React component and appends it to the **document.body** (creates a new independent React tree)
- can be opened by the prop **isOpen**
- doesn't leave any mess in DOM after closing
- provides its child with **this.props.closePortal** callback
- provides **close on ESC** and **close on outside mouse click** out of the box
- supports absolute positioned components (great for tooltips)
- **no dependencies**

## Demo

Try [https://miksu.cz/react-portal](https://miksu.cz/react-portal) **or**

```shell
git clone https://github.com/tajo/react-portal
cd react-portal
npm install
npm run build:examples
open examples/index.html
```

## Installation

```shell
npm install react react-dom react-portal --save
```

## Usage
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Portal from 'react-portal';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPortalOpen: true
    };
  }

  onClose() {
    this.setState({
      isPortalOpen: false
    });
  }

  onOpen() {
    this.setState({
      isPortalOpen: true
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.onOpen}>Open Portal</button>
        <Portal isOpen={this.state.isPortalOpen} closeOnEsc closeOnOutsideClick onClose={() => this.onClose}>
          <PseudoModal>
            <h2>Pseudo Modal</h2>
            <p>This react component is appended to the document body.</p>
          </PseudoModal>
        </Portal>
      </div>
    );
  }

}

export class PseudoModal extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
        <p><button onClick={this.props.closePortal}>Close this</button></p>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('react-body'));
```
## Documentation - props

### Always required

#### children : ReactElement
The portal expects one child (`<Portal><Child ... /></Portal>`) that will be ported.

### Optional

#### isOpen : bool
If true, the portal is open. If false, the portal is closed. It's up to you to take care of the closing (aka taking care of the state). Don't use this prop if you want to make your life easier. Use openByClickOn instead!

#### closeOnEsc: bool
If true, the portal can be closed by the key ESC.

#### closeOnOutsideClick: bool
If true, the portal can be closed by the outside mouse click.

#### onClose: func
This callback is called when the portal closes and after beforeClose.

#### onUpdate: func
This callback is called when the portal is (re)rendered.


## Tips & Tricks
- Does your modal have a fullscreen overlay and the `closeOnOutsideClick` doesn't work? [There is a simple solution](https://github.com/tajo/react-portal/issues/2#issuecomment-92058826).
- Does your inner inner component `<LevelTwo />`

```jsx
<Portal>
  <LevelOne>
    <LevelTwo />
  </LevelOne>
</Portal>
```

also need an access to `this.props.closePortal()`? You can't just use `{this.props.children}` in render method of `<LevelOne>` component. You have to clone it instead:

```jsx
{React.cloneElement(
  this.props.children,
  {closePortal: this.props.closePortal}
)}
```

#### Open modal programmatically

Sometimes you need to open your portal (e.g. modal) automatically. There is no button to click on. No problem, because the portal has the `isOpen` prop, so you can just set it to `true` or `false`.

## Contribution

Please, create issues and pull requests.

```shell
git clone https://github.com/tajo/react-portal
cd react-portal
npm install
npm start
open http://localhost:3000
```

**Don't forget to run this before every commit:**

```
npm test
```

## Credits (Forked from)

Inspired by the talk [React.js Conf 2015 - Hype!, Ryan Florence](https://www.youtube.com/watch?v=z5e7kWSHWTg)

Vojtech Miksu 2015, [miksu.cz](https://miksu.cz), [@vmiksu](https://twitter.com/vmiksu)

### Credits
Victor Arêas 2017

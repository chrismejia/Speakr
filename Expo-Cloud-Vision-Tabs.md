# App

## Post Fourth Tab commit

- Place `config.json` containing Google Cloud API key in `./assets/`
- Examined local `app.json` - found `splash` property
  - [ ] **Change to logo!**

### Camera Screen

- set up local `state` - contains loading status; def to FALSE // **NO constructor**
- `import config` and set up console.logs
- import `Camera`
- place `Camera` inside `View` block
- add `this.state.loading` into the `Camera` block
- removed `stylesContainer` and `bigText` block
- import `Spinner`
- Bring in ternary to place in `Camera`
  - **TRUE:** `capture` style
    - `takePicture` function bound here
  - **FALSE:** `spinner` style for FALSE
    - display white spinner
- Add `takePicture` function
  - add a constructor and super()
  - change `state` to `this.state`
  - bind `this.takePicture` in constructor
  - de-bind `onPress` takePicture action

| Friday night train edits stop here |
| :--------------------------------: |


- NPM installed

### Schema Thoughts

| git commit and push here |
| :----------------------: |


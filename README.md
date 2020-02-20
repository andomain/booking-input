# Booking Location Input

This is an autocompleting location search input based on [rentalcars.com](https://www.rentalcars.com/). It is bootstrapped using `create-react-app` and uses `Typescript` to ensure strong typing. All components are React functional components using hooks.

## Setup/Project Requirements

This project uses `yarn`. To install dependencies:

`yarn install`

To run in development mode

`yarn start`

To build a production version

`yarn build`

To run tests

`yarn test`

### Caveats
This project was written on quite a tight timescale so several planned additional user stories have been removed. 
Asynchronous data fetch testing is also failing as there was no time to address changes to this functionality.

Future nice to haves would include:
* Refactor to use `styled-components`
* Add a `<Loader />`
* Refactor `<SearchInput />` state to use a `useReducer` hook.

## The Challenge
The challenge idea is to collect a sequence of events and generate series of time based line charts.

The app will have an interface for manual input by the end user.

## The Architecture
We're going to use [Redux](https://redux.js.org/) to organize the application on the client and for holding the state.

## The Application
Designing a Redux app begins by creating the application data structure. The application state is all stored in one single tree structure. Everything that is stored about your application stays in one data structure formed out of objects and arrays.

One of the main consequences is that it lets you think about the application state in isolation from the application's behavior. The state is pure data.

With that in mind, the most reasonable way of designing our state tree was to store the valid sequence of events. Once we have the start event object, we store the span event and cycle through the data events, saving an array after validating them. The sequence finishes once we find a stop event. At that point a new start event would start a new sequence. This is all stored on the events object.

The other part of our store hold the chart data, which is generated after we set a valid sequence of events.
import { createContext } from 'react';

const EventContext = createContext({
	event: null,
	setEvent: () => { },
});

export default EventContext;

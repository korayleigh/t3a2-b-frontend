export default function globalReducer (state, action) {
  switch(action.type) {
  // case 'setJokes':{
  // 	return {
  // 		...state,
  // 		jokes: action.data
  // 	}
  // }
  // case 'addJoke': {
  // 	return {
  // 		...state,
  // 		jokes: [action.data, ...state.jokes]
  // 	}
  // }
  // case 'deleteJoke': {
  // 	const updatedJokes = state.jokes.filter((joke) => {
  // 		return joke.id !== parseInt(action.data)
  // 	})
  // 	return {
  // 		...state,
  // 		jokes: updatedJokes
  // 	}
  // }
  // case 'updateJoke': {
  // 	const joke = state.jokes.find((joke) => {
  // 		return joke.id === parseInt(action.data.id)
  // 	})
  // 	const theRest = state.jokes.filter((joke) => joke.id !== parseInt(action.data.id))
  // 	// const updatedJoke = Object.assign(joke, action.data)
  // 	const updatedJoke = { 
  // 		...joke,
  // 		...action.data.joke
  // 	}
  // 	console.log("updatedJoke",updatedJoke)
  // 	return {
  // 		...state,
  // 		jokes: [updatedJoke, ...theRest]
  // 	}

  // }
  case 'setUser': {
    return {
      ...state,
      loggedInUser: action.data
    }
  }
  case 'setToken': {
    return {
      ...state,
      auth: {
        ...state.auth,
        jwt: action.data
      }
    }
  }
  // case 'setCategories': {
  // 	console.log("dispatch:setCategories", action.data)
  // 	return {
  // 		...state,
  // 		categories: action.data
  // 	}
  // }

  default: return state
  }
}
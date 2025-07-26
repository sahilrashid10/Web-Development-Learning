# 🧠 Why Cloning State is Necessary in React

React updates the UI **only when the state reference changes**, not just when the internal values of that state change. This is because React uses **shallow comparison** to detect state changes.

## ⚠️ Problem with Direct Mutation

```js
const newTodos = todos; // ❌ Same reference
newTodos[0].isCompleted = true;
setTodos(newTodos);     // React sees no change → UI doesn't update

# Do this instead
const newTodos = [...todos];              // ✅ New array reference
newTodos[0].isCompleted = true;
setTodos(newTodos);                       // React re-renders the component

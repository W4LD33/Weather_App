import React from 'react';
import { useState } from 'react';

function Form() {
  
  // The useState hook is used to create state variables and their setter functions.
  // In this case, the 'setForm' function is created with an initial state object 
  // that contains two properties, 'set' and 'reps', both set to 0.
  const [form, setForm] = useState(
    {
      set: "", 
      reps: "", 
      comment: "",
      isDone: false,
      difficulty: "",
      category: ""
    })

  console.log(form.category)

  // Log the current state of the 'form' object to the console.
  // console.log(form) --> {set: '1', reps: '2'}

  
  // This function is called whenever the value of one of the input fields changes.
  function handleChange(event){
    // Destructure the 'name' and 'value' properties from the event target (the input field).
    // console.log(name, value) --> set 1; reps 2;
    const { name, value, type, checked } = event.target;

    // Use the setForm function to update the 'form' state object with the new value.
    // The 'prevState' argument represents the current state of the 'form' object.
    // The spread operator (...) is used to copy all of the properties from the 'prevState'
    // object into a new object, and then the property corresponding to the 'name' variable
    // (either 'set' or 'reps') is updated with the new 'value'.
    setForm(prevState => {
      return {
        ...prevState,
        [name] : type === "checkbox" ? checked : value
      }
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    console.log(form)
  }
  // Render a form with two input fields, each with a 'name' property that corresponds
  // to the property name in the 'form' state object that should be updated when the
  // input value changes. The 'onChange' property is set to the 'handleChange' function,
  // which will be called whenever the input value changes.
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='number'
        placeholder='Set:'
        name='set'
        onChange={handleChange}
        value={form.set}
      />
      <br />
      <input
        type='number'
        placeholder='Reps:'
        name='reps'
        onChange={handleChange}
        value={form.reps}
      />
      <br />
      <textarea
        placeholder='Comments:'
        name='comment'
        onChange={handleChange}
        value={form.comment}
      />
      <br />
      <input
        type="checkbox"
        name='isDone'
        id='isDone'
        onChange={handleChange}
        checked={form.isDone}
      />
      <label htmlFor="isDone">Is it done?</label>

      <fieldset>
        <legend>Difficulty level</legend>      
          <input 
              type="radio"
              id="radio-easy"
              value="radio-easy"
              name="difficulty"
              onChange={handleChange}
              checked={form.difficulty === "radio-easy"}
          />
          <label htmlFor="radio-easy">Easy</label>
          <br />
          
          <input 
              type="radio"
              id="radio-moderate"
              value="radio-moderate"
              name="difficulty"
              onChange={handleChange}
              checked={form.difficulty === "radio-moderate"}
          />
          <label htmlFor="radio-moderate">Moderate</label>
          <br />

          <input 
              type="radio"
              id="radio-hard"
              value="radio-hard"
              name="difficulty"
              onChange={handleChange}
              checked={form.difficulty === "radio-hard"}
          />
          <label htmlFor="radio-hard">Hard</label>
          <br />
      </fieldset>

      <label htmlFor="category">Choose category:</label>
      <br />
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="">--Choose--</option>
        <option value="Abs">Abs</option>
        <option value="Chest">Chest</option>
        <option value="Quads">Quads</option>
      </select>
      <br/>
    <button>Save</button>
    </form>
  );
}

// Export the App component so that it can be imported and used in other files.
export default Form;


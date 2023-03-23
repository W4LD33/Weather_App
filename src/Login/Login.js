import React from "react"
import { useState } from "react"

export default function Login(){
    
    const [form, setForm] = useState(
        {
            email: "",
            password: "",
            password_repeat: "",
            isChecked: false
        }
    )

    function handleChange(e){
        const { name, value, type, checked } = e.target

        setForm(prev => {
            return {
                ...prev,
                [name] : type === "checkbox" ? checked : value
                }
            })
        }

    function handleSubmit(e){
        e.preventDefault()
        if (form.password === form.password_repeat){
            if(form.isChecked){
                console.log("Thanks for signing up for our newsletter!")
            } else {
                console.log("Succesfully signed up!")
            }
        }
        else {
            console.log("Passwords do not match")
        }
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder="Enter email:"
                name="email"
                value={form.email}
                onChange={handleChange}
            />
            <br/>
            <input 
                type='text'
                placeholder="Enter password:"
                name="password"
                value={form.password}
                onChange={handleChange}
            />
            <br/>
            <input 
                type='text'
                placeholder="Repeat password:"
                name="password_repeat"
                value={form.password_repeat}
                onChange={handleChange}
            />
            <br/>
            <input 
                type='checkbox'
                id="isChecked"
                name="isChecked"
                value={form.isChecked}
                onChange={handleChange}
            />
            <label htmlFor="isChecked">Apply for a newsletter?</label>
            <br/>
            <button>Sign Up</button>
        </form>
    )
}
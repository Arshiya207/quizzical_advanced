import StartP from "./components/StartP"
import DarkModeBtn from "./components/DarkModeBtn"
import React, { useEffect } from "react"
export default function App(){
    const [darkMode,setDarkMode]=React.useState(false)
    // event functions
    function toggleDarkMode(){
        setDarkMode(preValue=>!preValue)
    }
    // end event function

    useEffect(()=>{
        const darkModeIconEle=document.querySelector(".dark-mode__icon")
        const html=document.querySelector("[data-theme]")
        const sunClass="bi-sun-fill"
        const moonClass="bi-moon-stars-fill"

        if(darkMode){
            darkModeIconEle.classList.remove("light-transition")

            darkModeIconEle.classList.add("dark-transition")
            darkModeIconEle.classList.remove(moonClass)
            darkModeIconEle.classList.add(sunClass)
            html.dataset.theme="dark"
        }else{
            darkModeIconEle.classList.remove("dark-transition")

            darkModeIconEle.classList.add("light-transition")
            darkModeIconEle.classList.remove(sunClass)
                darkModeIconEle.classList.add(moonClass)
            html.dataset.theme="light"
        }



    },[darkMode])

    return (
        <div className="container"> 
        <DarkModeBtn toggleDarkMode={toggleDarkMode} />
        <div className="yellow-particle"></div>
           <StartP/>
        <div className="violet-particle"></div>
        </div>
    )
}
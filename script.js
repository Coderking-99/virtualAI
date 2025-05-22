let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");


function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1; 
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}


function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log(hours);

    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good Evening sir");
    }
}

window.addEventListener("load", () => {
    wishMe();
});


let speechReg = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechReg) {
    alert("Speech Recognition is not supported in this browser.");
}

let recognition = new speechReg();


recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};


recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    speak("Sorry, I didn't catch that.");
    btn.style.display = "flex";
    voice.style.display = "none";
};


btn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});


function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")|| message.includes("hu r u")) {
        speak("I am a virtual assistant sweetie, created by Nitin.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open calculator")) {
        window
        speak("Sorry, I can't open the calculator from the browser.");
    } else if (message.includes("open time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("open date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else if(message.includes("thank you")|| message.includes("thank u")){
        speak("welcome sir . It is my pleasure sir")

    } else {
        let query = message.replace("sweetie", "").trim();
        let finalText = "This is what I found on the internet regarding " + query;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
}

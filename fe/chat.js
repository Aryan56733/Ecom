////////// CHAT FUNCTIONALITY //////////

function choice(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

function getTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    let time = "am";
    if (hours > 12) {
        hours = hours - 12;
        time = "pm";
    }
    return `${hours}:${minutes} ${time}`;
}

const messages = [
    {
        type: "L",
        name: "Jerry",
        timestamp: getTime(),
        message: "Hey there! 👋",
    },
    {
        type: "L",
        name: "DEV",
        timestamp: getTime(),
        message: "Did you know you can change the background image by using the left and right arrow keys? Give it a try!",
    }
]
const randomMessages = [
    {
        name: "Jerry",
        message: "What's your name?",
    },
    {
        name: "Jerry",
        message: "What's your favorite color?",
    },
    {
        name: "George",
        message: "Nice day, isn't it?",
    },
    {
        name: "Sally",
        message: "Why did the web developer storm out of the restaurant? She was offended by the table layout.",
    },
    {
        name: "Ted",
        message: "Hey",
    },
    {
        name: "Sam",
        message: "Po-ta-toes. Boil 'em, mash 'em, stck 'em in a stew.'",
    },
    {
        name: "George",
        message: "I like spaghetti, don't you?",
    },
    {
        name: "George",
        message: "Have you ever considered becoming a web developer?",
    },
    {
        name: "Sally",
        message: "Why did the chicken cross the road? To get to the other side.",
    },
    {
        name: "Sam",
        message: "I wasn't dropping no eaves, sir.",
    },
    {
        name: "Sally",
        message: "How do you fix a broken pumpkin? With a pumpkin patch!",
    },
    {
        name: "Bilbo",
        message: "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve."
    },
    {
        name: "Ted",
        message: "I don't like anchovies."
    },
    {
        name: "George",
        message: "Would you rather take over the world or have the world take over you?"
    },
    {
        name: "Ted",
        message: "Why's there no spaghett here??",
    },
    {
        name: "George",
        message: "Would you rather sleep on a bed of broken glass or walk three steps over hot coals?",
    },
    {
        name: "Lucy",
        message: "👋",
    },
]

const messageL = document.querySelector(".MESSAGE-L");
const messageR = document.querySelector(".MESSAGE-R");
const dots = document.querySelector(".DOTS");

const messageBox = document.getElementById("messageBox");
const sendForm = document.getElementById("sendForm");

// Clear message box & add messages based on messages array
function fillMessageBox() {
    messageBox.innerHTML = "";
    messages.forEach(message => {
        let newMessage;
        if (message.type === "L") {
            newMessage = messageL.cloneNode(true);
            newMessage.querySelector(".NAME").innerHTML = message.name;
        } else if (message.type === "R") {
            newMessage = messageR.cloneNode(true);
        } else {
            throw new Error("Message type unspecified or invalid.");
        }

        newMessage.querySelector(".TIMESTAMP").innerHTML = message.timestamp;
        newMessage.querySelector(".MESSAGE").innerHTML = message.message;

        messageBox.appendChild(newMessage);
    });
}
fillMessageBox();

// Add new message function
function addMessage(type, name, message) {
    messages.push({
        type: type,
        name: name,
        timestamp: getTime(),
        message: message,
    });
    fillMessageBox();
    messageBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// Add random message from other users function
function addRandomMessage() {
    messageBox.appendChild(dots);
    setTimeout(() => {
        const nextMessage = choice(randomMessages);
        addMessage("L", nextMessage.name, nextMessage.message);
    }, 1000);
}

// Send form functionality
sendForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent default behavior

    // Add new message
    const input = e.target.querySelector("input");
    if (!input.value) { return } // Cancel if no input
    addMessage("R", "YOU", input.value);

    // Reset input
    input.value = "";

    // Add random message from other fake users
    setTimeout(addRandomMessage, 1000);
});

// Send random messages every 15 seconds
setInterval(addRandomMessage, 15000);

////////// BG FUNCTIONALITY //////////
const bgImgs = [
    "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1741986947217-d1a0ecc39149?q=80&w=2666&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1612981453053-184fd648b66b?q=80&w=2613&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1508556497405-ed7dcd94acfc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1629362505696-23630c44bec1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1720612590620-87dafe11518c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1635159352174-c1a8361a7066?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const bgImg = document.getElementById("bgImg");

let currentImgIndex = [0];
bgImg.src = bgImgs[currentImgIndex];

function changeIndex(direction) {
    if (direction === "left") {
        currentImgIndex--;
    } else if (direction === "right") {
        currentImgIndex++;
    }

    if (currentImgIndex <= 0) {
        currentImgIndex = bgImgs.length - 1;
    } else if (currentImgIndex >= bgImgs.length) {
        currentImgIndex = 0;
    }

    bgImg.src = bgImgs[currentImgIndex];
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        changeIndex("left");
    } else if (e.key === "ArrowRight") {
        changeIndex("right");
    }
});

setInterval(() => {
    changeIndex("right");
}, 60000);


const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const conversation = document.getElementById("conversation");
const welcome = document.getElementById("welcome");
const quickPrompts = document.getElementById("quickPrompts");

const newChatBtn = document.getElementById("newChatBtn");
const topNewChat = document.getElementById("topNewChat");


function generateAIResponse(message) {

    const text = message.toLowerCase();

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return `
            Hello! 👋<br><br>
            I'm ThinkBot. How can I help you today?
            You can ask me about programming, websites,
            learning, projects, or creative ideas.
        `;
    }


    if (
        text.includes("html") ||
        text.includes("css") ||
        text.includes("website")
    ) {
        return `
            Great choice! 🌐<br><br>

            For a modern website, you can structure your
            project like this:

            <ul>
                <li>HTML — page structure</li>
                <li>CSS — design and animations</li>
                <li>JavaScript — interaction and functionality</li>
            </ul>

            Start with a clean responsive layout and
            gradually add interactive features.
        `;
    }


    if (
        text.includes("javascript") ||
        text.includes("js") ||
        text.includes("code")
    ) {
        return `
            JavaScript is excellent for making your website
            interactive. 💻<br><br>

            You can use it for:

            <ul>
                <li>Form validation</li>
                <li>API requests</li>
                <li>Dynamic content</li>
                <li>Animations and interactions</li>
                <li>Chatbot functionality</li>
            </ul>
        `;
    }


    if (
        text.includes("project") ||
        text.includes("idea")
    ) {
        return `
            Here are some project ideas for you 🚀:

            <ul>
                <li>AI chatbot</li>
                <li>Developer portfolio</li>
                <li>Inventory management system</li>
                <li>Task management application</li>
                <li>Expense tracker</li>
                <li>Online learning platform</li>
            </ul>

            You can start with a frontend version and
            later connect a backend.
        `;
    }


    if (
        text.includes("ai") ||
        text.includes("artificial intelligence")
    ) {
        return `
            Artificial Intelligence, or AI, refers to
            computer systems designed to perform tasks
            that normally require human-like intelligence. 🤖<br><br>

            Examples include:

            <ul>
                <li>Natural language processing</li>
                <li>Image recognition</li>
                <li>Recommendation systems</li>
                <li>Machine learning</li>
                <li>AI assistants</li>
            </ul>
        `;
    }


    if (
        text.includes("portfolio") ||
        text.includes("career")
    ) {
        return `
            A strong developer portfolio should include:

            <ul>
                <li>About section</li>
                <li>Technical skills</li>
                <li>Featured projects</li>
                <li>GitHub links</li>
                <li>Contact information</li>
            </ul>

            Add animations carefully so the website
            remains professional and fast.
        `;
    }


    return `
        That's an interesting question! ✦<br><br>

        I'm currently running in <strong>demo mode</strong>,
        so my responses are simulated rather than generated
        by a real AI model.

        <br><br>

        Try asking me about:

        <ul>
            <li>HTML and CSS</li>
            <li>JavaScript</li>
            <li>Website projects</li>
            <li>Artificial Intelligence</li>
            <li>Developer portfolios</li>
        </ul>
    `;
}


/* =========================================
   ADD USER MESSAGE
   ========================================= */

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className =
        "message user-message";

    messageElement.innerHTML = `

        <div class="avatar user-avatar">
            BM
        </div>

        <div class="message-content">

            <div class="message-header">
                <strong>You</strong>
                <span>Now</span>
            </div>

            <div class="message-bubble">
                ${escapeHTML(message)}
            </div>

        </div>
    `;

    conversation.appendChild(messageElement);

    scrollToBottom();
}


/* =========================================
   ADD AI MESSAGE
   ========================================= */

function addAIMessage(response) {

    const messageElement = document.createElement("div");

    messageElement.className =
        "message ai-message";

    messageElement.innerHTML = `

        <div class="avatar ai-avatar">
            ✦
        </div>

        <div class="message-content">

            <div class="message-header">
                <strong>ThinkBot</strong>
                <span>Now</span>
            </div>

            <div class="message-bubble">
                ${response}
            </div>

        </div>
    `;

    conversation.appendChild(messageElement);

    scrollToBottom();
}


/* =========================================
   TYPING INDICATOR
   ========================================= */

function showTyping() {

    const typingElement =
        document.createElement("div");

    typingElement.className =
        "message ai-message";

    typingElement.id = "typingMessage";

    typingElement.innerHTML = `

        <div class="avatar ai-avatar">
            ✦
        </div>

        <div class="message-content">

            <div class="message-header">
                <strong>ThinkBot</strong>
                <span>Typing...</span>
            </div>

            <div class="message-bubble">

                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        </div>
    `;

    conversation.appendChild(typingElement);

    scrollToBottom();
}


/* =========================================
   REMOVE TYPING
   ========================================= */

function removeTyping() {

    const typingMessage =
        document.getElementById("typingMessage");

    if (typingMessage) {
        typingMessage.remove();
    }
}


/* =========================================
   SEND MESSAGE
   ========================================= */

function sendMessage() {

    const message =
        messageInput.value.trim();

    if (!message) {
        return;
    }


    /* Hide welcome */

    welcome.style.display = "none";
    quickPrompts.style.display = "none";


    /* Add user message */

    addUserMessage(message);


    /* Clear input */

    messageInput.value = "";

    messageInput.style.height = "auto";


    /* Show typing */

    showTyping();


    /* Simulate AI */

    setTimeout(() => {

        removeTyping();

        const response =
            generateAIResponse(message);

        addAIMessage(response);

    }, 1200);
}


/* =========================================
   ENTER KEY
   ========================================= */

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }
    }
);


/* =========================================
   SEND BUTTON
   ========================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================================
   QUICK PROMPTS
   ========================================= */

const promptButtons =
    document.querySelectorAll(".prompt-card");

promptButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            const prompt =
                this.dataset.prompt;

            messageInput.value = prompt;

            sendMessage();
        }
    );

});


/* =========================================
   NEW CHAT
   ========================================= */

function startNewChat() {

    conversation.innerHTML = `

        <div class="message ai-message">

            <div class="avatar ai-avatar">
                ✦
            </div>

            <div class="message-content">

                <div class="message-header">
                    <strong> ThinkBot </strong>
                    <span>Now</span>
                </div>

                <div class="message-bubble">
                    New conversation started. 👋<br><br>
                    What would you like to talk about?
                </div>

            </div>

        </div>
    `;


    welcome.style.display = "block";

    quickPrompts.style.display = "grid";

    messageInput.value = "";

    messageInput.focus();

    scrollToBottom();
}


newChatBtn.addEventListener(
    "click",
    startNewChat
);

topNewChat.addEventListener(
    "click",
    startNewChat
);


/* =========================================
   AUTO RESIZE TEXTAREA
   ========================================= */

messageInput.addEventListener(
    "input",
    function() {

        this.style.height = "auto";

        this.style.height =
            Math.min(this.scrollHeight, 120) + "px";
    }
);


/* =========================================
   SCROLL
   ========================================= */

function scrollToBottom() {

    const chatContent =
        document.getElementById("chatContent");

    setTimeout(() => {

        chatContent.scrollTo({
            top: chatContent.scrollHeight,
            behavior: "smooth"
        });

    }, 50);
}


/* =========================================
   SECURITY
   Prevent HTML injection from user input
   ========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
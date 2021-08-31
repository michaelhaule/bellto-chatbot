// Get HTML head element
// var link = document.createElement('link');
// link.rel = 'stylesheet';
// link.type = 'text/css';
// link.href = 'static/css/style.css';
// document.getElementsByTagName('head')[0].appendChild(link);
const rasa_server_url= "http://159.138.169.207:80/fundi_webhook"
const action_name = "action_hello_world";
const sender_id = uuidv4();

let belltroWidget = `
<div class="container">

<!--chatbot widget -->
<div class="widget">
    <div class="chat_header">
        <!--Add the name of the bot here -->
        <span class="chat_header_title">Powered By &nbsp;<a href="https://belltro.com/" target="_blank"> <img
  src="http://chatbotafrica.btest.link/static/img/Belltro_White-Logo.svg" alt="" height="15px"
  width="auto" /></a></span><span class="dropdown-trigger" href="#" data-target="dropdown1"> <i
class="material-icons" id="close"> close </i> </span>

        <!-- Dropdown menu-->
        <ul id="dropdown1" class="dropdown-content">
            <li><a href="#" id="clear">Clear</a></li>
            <li><a href="#" id="restart">Restart</a></li>
            <li><a href="#" id="close">Close</a></li>
        </ul>
    </div>

    <!--Chatbot contents goes here -->
    <div class="chats" id="chats">
        <div class="clearfix"></div>
    </div>

    <!--keypad for user to type the message -->
    <div class="keypad">
        <textarea id="userInput" placeholder="Type a message..." class="usrInput"></textarea>
        <div id="sendButton">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
    </div>
</div>

<!--bot profile-->
<div class="profile_div" id="profile_div">
    <img class="imgProfile" src="static/img/chatbot.svg" />
</div>

</div>
`;
document.querySelector("#belltro-chat-widget").innerHTML = belltroWidget;

var alreadyClicked = false;
/* module for importing other js files */
function include(file) {
    const script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);
}

// Bot pop-up intro
// document.addEventListener("DOMContentLoaded", () => {
//   const elemsTap = document.querySelector(".tap-target");
// eslint-disable-next-line no-undef
//   const instancesTap = M.TapTarget.init(elemsTap, {});
//   instancesTap.open();
//   setTimeout(() => {
//     instancesTap.close();
//   }, 4000);
// });

/* import components */
include('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');
include('./static/js/lib/showdown.min.js');
include('./static/js/lib/materialize.min.js');
include('./static/js/lib/uuid.min.js');
include('./static/js/components/index.js');

window.addEventListener('load', () => {
    // initialization
    $(document).ready(() => {
        // Bot pop-up intro
        // $("div").removeClass("tap-target-origin");

        // drop down menu for close, restart conversation & clear the chats.
        $(".dropdown-trigger").dropdown();

        // initiate the modal for displaying the charts,
        // if you dont have charts, then you comment the below line
        $(".modal").modal();

        // enable this if u have configured the bot to start the conversation.
        showBotTyping();
        $("#userInput").prop('disabled', true);

        // if you want the bot to start the conversation
        // customActionTrigger();
    });
    // Toggle the chatbot screen
    $("#profile_div").click(() => {
        $(".profile_div").toggle();
        $(".widget").toggle();

        if (!alreadyClicked) {
            setTimeout(function() {
                hideBotTyping();
                var fallbackMsg = "Hi there! I'm Kaya 🖐️🤖, a bot working for Fundi. I can help you with any information regards Fundi Loans.";
                var BotResponse = '<img class="botAvatar" src="./static/img/maya_avatar.png"/><p class="botMsg">' + fallbackMsg + '</p><div class="clearfix"></div>';
                $(BotResponse).appendTo(".chats").show().fadeIn(1000);
                showBotTyping();

                setTimeout(function() {
                    hideBotTyping();
                    fallbackMsg = "How can I help you today?";
                    BotResponse = '<img class="botAvatar" src="./static/img/maya_avatar.png"/><p class="botMsg">' + fallbackMsg + '</p><div class="clearfix"></div>';
                    $(BotResponse).appendTo(".chats").show().fadeIn(1000);
                    showBotTyping();

                    setTimeout(function() {
                        hideBotTyping();
                        fallbackMsg = "Not sure where to start just enter help.";
                        BotResponse = '<img class="botAvatar" src="./static/img/maya_avatar.png"/><p class="botMsg">' + fallbackMsg + '</p><div class="clearfix"></div>';
                        $(BotResponse).appendTo(".chats").show().fadeIn(1000);
                        //showBotTyping();
                        //scrollToBottomOfResults();
                    }, 1000);

                }, 1000);
                scrollToBottomOfResults();
                $("#userInput").prop('disabled', false);
            }, 4000);
        }

        alreadyClicked = true;
    });

    // clear function to clear the chat contents of the widget.
    $("#clear").click(() => {
        $(".chats").fadeOut("normal", () => {
            $(".chats").html("");
            $(".chats").fadeIn();
        });
    });

    // close function to close the widget.
    $("#close").click(() => {
        $(".profile_div").toggle();
        $(".widget").toggle();
        scrollToBottomOfResults();
    });
});
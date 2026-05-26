
const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));
const TYPE_SPEED = 28;

function scrollApp() {
  app.scrollTop = app.scrollHeight;
}

async function typeInto(el, text) {
  for (const char of text) {
    el.textContent += char;
    await delay(TYPE_SPEED);
    scrollApp();
  }
}

async function typePlainText(text, className) {
  const p = document.createElement("p");
  if (className) p.setAttribute("class", className);
  app.appendChild(p);
  await typeInto(p, text);
}

async function typeCodeLine(code, description) {
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  app.appendChild(p);

  for (const char of code) {
    p.appendChild(document.createTextNode(char));
    await delay(TYPE_SPEED);
    scrollApp();
  }

  p.appendChild(document.createElement("br"));
  const descSpan = document.createElement("span");
  descSpan.setAttribute("class", "text");
  p.appendChild(descSpan);
  await typeInto(descSpan, ` ${description}`);
}

async function typePathLine() {
  const p = document.createElement("p");
  p.setAttribute("class", "path");
  app.appendChild(p);

  const span1 = document.createElement("span");
  const span2 = document.createElement("span");

  await typeInto(p, "# user");
  p.appendChild(span1);
  await typeInto(span1, " in");
  p.appendChild(span2);
  await typeInto(span2, " ~/probablykalvin");
}

app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
   getInputValue();
   
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  if (input) input.focus();
})


async function open_terminal(){
  await typePlainText("Welcome");
  await delay(300);
  await typePlainText("You can run several commands:");
  await delay(200);

  await typeCodeLine("about me", "Who am i and what do i do.");
  await typeCodeLine("stuff", "Projects, leadership, and things I've built.");
  await typeCodeLine("help", "See all commands.");
  await typeCodeLine("social -a", "All my social networks.");

  await delay(300);
  await typePathLine();
  showInputLine();
}


function showInputLine(){
  const div = document.createElement("div");
  div.setAttribute("class", "type")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
  scrollApp();
}

function new_line(){
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  p.textContent = "# user";
  span1.textContent = " in";
  span2.textContent = " ~/probablykalvin";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  showInputLine();
}

function removeInput(){
  const div = document.querySelector(".type");
  if (div) app.removeChild(div);
}

async function getInputValue(){
  
  const value = document.querySelector("input").value;
  if(value === "help"){
    trueValue(value);
    
    createCode("projects", "My github page with my projects. Follow me there ;)");
    createCode("about me", "Who am i and what do i do.");
    createCode("stuff", "Projects, leadership, and things I've built.");
    createCode("skills", "Skills and strengths.");
    createCode("ping", "Ping the server.");
    createCode("social -a", "All my social networks.");
    createCode("clear", "Clean the terminal.");
    
  }
  else if(value === "projects"){
    trueValue(value);
    createText("<a href='https://github.com/probablykalvin' target='_blank'><i class='fab fa-github white'></i> github.com/probablykalvin</a>")
  }
  else if(value === "about me"){
    trueValue(value);
    createText("Hi, my name is Lay Rethnireach")
    createText("I'm a <span class='blue'>senior in high school</span> and a <span class='blue'>tech enthusiast</span>. I enjoy building things with code, exploring new tools, and learning how software works under the hood.")
  }
  else if(value === "stuff"){
    trueValue(value);
    createBullet("Led cross-disciplinary projects in Chemistry and ICT.");
    createBullet("Designed and built a custom personal portfolio website.");
    createBullet("Managed 5+ of the top Minecraft servers in Cambodia, handling technical infrastructure.");
    createBullet("Scaled server operations to support a peak of 50+ concurrent players.");
    createBullet("Grew an online Discord community to over 140+ members.");
    createBullet("Developed 5+ multi-functional Discord bots featuring moderation, music, and games.");
    createBullet("Volunteered for the Rodwell Washing4Fund charity event.");
  }
  else if(value === "ping"){
    trueValue(value);
    createPreText("PING me.probablykalvin.xyz (1.1.1.1): 56 data bytes\n64 bytes from cloudflare-edge: icmp_seq=0 ttl=64 time=14.2 ms\n64 bytes from cloudflare-edge: icmp_seq=1 ttl=64 time=12.8 ms\n--- Connection: Stable. Systems nominal. ---");
  }
  else if(value === "skills"){
    trueValue(value);
    createStarBullet("Leadership");
    createStarBullet("Development");
    createStarBullet("Administration");
    createStarBullet("Management");
    createStarBullet("Automation");
    createStarBullet("Volunteering");
    createStarBullet("Growth");
  }
  else if(value === "social -a"){
    trueValue(value);
    createText("<a href='https://github.com/probablykalvin' target='_blank'><i class='fab fa-github white'></i> github.com/probablykalvin</a>")
    createText("<a href='https://t.me/rwexh' target='_blank'><i class='fab fa-telegram white'></i> t.me/rwexh</a>")
    createText("<a href='https://facebook.com/probablykalvin' target='_blank'><i class='fab fa-facebook white'></i> facebook.com/probablykalvin</a>")
    createText("<a href='https://instagram.com/probablykalvin' target='_blank'><i class='fab fa-instagram white'></i> instagram.com/probablykalvin</a>")
  }
  else if(value === "social"){
    trueValue(value);
    createText("Didn't you mean: social -a?")
  }
  
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("pre").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else{
    falseValue(value);
    createErrorText(`command not found: ${value}`)
  }
}

function trueValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  
  p.innerHTML =
  text
  ;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =
 `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

function createErrorText(text) {
  const p = document.createElement("p");
  p.innerText = text;
  app.appendChild(p);
}

function createBullet(text) {
  const p = document.createElement("p");
  p.setAttribute("class", "bullet");
  p.textContent = `- ${text}`;
  app.appendChild(p);
}

function createStarBullet(text) {
  const p = document.createElement("p");
  p.setAttribute("class", "bullet");
  p.textContent = `* ${text}`;
  app.appendChild(p);
}

function createPreText(text) {
  const pre = document.createElement("pre");
  pre.setAttribute("class", "terminal-output");
  pre.textContent = text;
  app.appendChild(pre);
}

async function init(){
  const loader = document.getElementById("loader");
  const container = document.querySelector(".container");

  await delay(2000);

  loader.classList.add("fade-out");
  await delay(400);
  loader.remove();

  container.classList.remove("container--hidden");
  await delay(50);
  await open_terminal();
}

init();

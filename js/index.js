document.addEventListener("click", ()=>{

const subBtn = document.getElementById("submit");
const search = document.getElementById("search");
const userList = document.getElementById("user-list");
let repoList = document.getElementById("repos-list");

subBtn.addEventListener("click", (e) => {
e.preventDefault();

fetch(`https://api.github.com/search/users?q=${search.value}`)
.then(res => res.json())
.then(data => {
    let newData = data.items[0];

    let username = document.createElement("ul"); username.innerHTML = newData.login;
    userList.appendChild(username); 

    let userInfoBtn = document.createElement("button"); 
    userInfoBtn.innerHTML = "User Info"; username.appendChild(userInfoBtn);  

   userInfoBtn.addEventListener("click", ()=> {
       let userURL = document.createElement("a");
       userURL.setAttribute("href",newData.html_url);
       userURL.innerHTML = "Git Profile";
       username.appendChild(userURL);

        let userRepoBtn = document.createElement("button");
        userRepoBtn.setAttribute("href", newData.repos_url)
        userRepoBtn.innerHTML = "Git Repos";
        username.appendChild(userRepoBtn);

        userRepoBtn.addEventListener("click",()=>{
            fetch(`https://api.github.com/users/${newData.login}/repos`)
            .then(res => res.json())
            .then(data => {console.log(data); data.forEach(element => {
                let repoName = document.createElement("ul");
                repoName.innerHTML = element.name;
                repoList.appendChild(repoName);

                let repoLink = document.createElement("a"); repoLink.innerHTML = "Repo Links";
                repoLink.setAttribute("href", element.html_url);
                repoName.appendChild(repoLink);
                
                let removeRepo = document.createElement("button");
                removeRepo.innerHTML = "Remove Repo"; repoLink.appendChild(removeRepo);
                removeRepo.addEventListener("click",(e)=>{
                    e.preventDefault();
                    repoName.remove();
                    repoLink.remove();
                })
                
            })
        })
        })
   })

    let avatar = document.createElement("img"); 
    avatar.setAttribute("src", newData.avatar_url); username.appendChild(avatar);
    avatar.setAttribute("class", "avatar");

    let removeBtn = document.createElement("button"); removeBtn.innerHTML="Delete Info";
    username.appendChild(removeBtn); removeBtn.addEventListener("click", ()=>{
        search.value = " ";
        username.remove();
        avatar.remove();
    })

});

})

//do not delete
})
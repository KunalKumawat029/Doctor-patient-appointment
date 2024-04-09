export function getUser(){
    let user = JSON.parse(localStorage.getItem("user"))
    return user;
}
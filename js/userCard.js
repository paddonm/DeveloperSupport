const buildUserCard = (user) => {
  var elUserCard = document.getElementById('userCard');
  
  elUserCard.innerHTML = '';

  if (user) {
    elUserCard.className = 'userSettings';
  
    var elUserImage = document.createElement('IMG');
    let domain = user.email.split('@')[1]
    elUserImage.src = `//logo.clearbit.com/${domain}`
    
    var elUserName = document.createElement('H3');
    elUserName.innerText = user.name;
    
    var elUserEmail = document.createElement('H5');
    elUserEmail.innerText = user.email;
    
    var elUserInfo = document.createElement('DIV');
    elUserInfo.className = 'userInfo';
    
    var elSignOut = document.createElement('I');
    elSignOut.className = 'fad fa-sign-out fa-2x'
    elSignOut.onclick = () => {
      window.localStorage.removeItem('onschedBookingEmail');
      window.location.assign('#/');
      buildUserCard();
    }
    
    elUserInfo.appendChild(elUserName);
    elUserInfo.appendChild(elUserEmail);
    
    elUserCard.appendChild(elUserImage);
    elUserCard.appendChild(elUserInfo);
    elUserCard.appendChild(elSignOut);
  
    return elUserCard;
  }
}
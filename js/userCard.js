const buildUserCard = (user) => {
  var elUserCard = document.getElementById('userCard');
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
  
  elUserInfo.appendChild(elUserName);
  elUserInfo.appendChild(elUserEmail);
  
  elUserCard.appendChild(elUserImage);
  elUserCard.appendChild(elUserInfo);

  return elUserCard;
}
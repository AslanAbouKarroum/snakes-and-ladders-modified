const urlParams = new URLSearchParams(window.location.search);
let userName = urlParams.get('name');
if(!userName) userName = 'Player lala';
document.getElementById('turn').textContent = `${userName}`;
// module.exports = {
//     userName
// }
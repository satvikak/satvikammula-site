function actuallyChangeTheme() {
  var viewModeButton = document.getElementById('changeTheme');

  if (document.body.classList.contains('darkMode')) {
    document.body.classList.remove('darkMode');

    viewModeButton.textContent = '☀️';
  } else {
    document.body.classList.add('darkMode');

    viewModeButton.textContent = '🌙';
  }
}
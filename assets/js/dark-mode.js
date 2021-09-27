(function () {

  var darkThemeSelected = checkDarkTheme();

  if (darkThemeSelected) document.getElementsByTagName("html")[0].setAttribute('data-theme', 'dark');

  function checkDarkTheme() {
    var darkThemestorage = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark'),
      darkThemeMatchMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return (darkThemestorage || darkThemeMatchMedia);
  };
}());
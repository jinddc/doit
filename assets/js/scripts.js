hljs.highlightAll();

// Sidenav toggle
(function () {
	function initSidenav(element) {
		element.addEventListener("click", function (event) {
			event.preventDefault();
			let subList = event.target.closest(".sidenav__list");
			if (!subList) return;
			let bool = element.classList.contains("sidenav__link--expanded");
			element.setAttribute("aria-expanded", !bool);
			element.classList.toggle("sidenav__link--expanded");
		});

		activeNav(element)
	}

	function activeNav(element) {
		let subList = element.nextSibling.nextSibling,
			navLink = subList.getElementsByClassName('sidenav__link');
		if (navLink.length > 0) {
			for (let i = 0; i < navLink.length; i++) {
				(function (i) {
					let item = navLink[i],
						parentItem = item.parentElement.parentElement;
					if (item.getAttribute('href') == window.location.pathname) {
						item.classList.add('sidenav__link--current')
						parentItem.previousSibling.previousSibling.classList.add('sidenav__link--expanded')
					}
				})(i);
			}
		}
	}

	let sideNavs = document.getElementsByClassName("js-sidenav");
	if (sideNavs.length > 0) {
		for (let i = 0; i < sideNavs.length; i++) {
			(function (i) {
				initSidenav(sideNavs[i]);
			})(i);
		}
	}
})();


//Darkmode toggle
(function () {
	let darkSwitch = document.getElementById('switch-dark'),
		lightSwitch = document.getElementById('switch-light'),
		HtmlElement = document.getElementsByTagName('html')[0];

	if (darkSwitch && lightSwitch) {
		initTheme();

		darkSwitch.addEventListener('change', function (event) {
			toggleTheme(event.target)
		})

		lightSwitch.addEventListener('change', function (event) {
			toggleTheme(event.target)
		})

		function initTheme() {
			if (HtmlElement.getAttribute('data-theme', 'dark')) darkSwitch.checked = true
		}

		function toggleTheme(target) {
			if (target.checked && target.id == "switch-dark") {
				HtmlElement.setAttribute('data-theme', 'dark');
				localStorage.setItem('themeSwitch', 'dark')
			} else {
				HtmlElement.removeAttribute('data-theme')
				localStorage.removeItem('themeSwitch')
			}
		}
	}

}());

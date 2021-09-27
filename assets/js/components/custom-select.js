(function () {
	let customSelect = function (element) {
		this.element = element;
		this.selectInput = this.element.getElementsByClassName('select__input')[0];
		this.dropdown = this.element.getElementsByClassName('option__list')[0];
		this.option = this.dropdown.getElementsByClassName('select__item');
		initSelectEvents(this)
	}

	function initSelectEvents(select) {
		initSelect(select)

		// Toggle select
		select.selectInput.addEventListener('click', function () {
			toggleSelect(select.selectInput, false)
			select.dropdown.setAttribute("tabindex", 0);
			select.dropdown.focus()
		})

		select.dropdown.addEventListener('keydown', function (event) {
			if (event.keyCode && event.keyCode == 38 || event.key && event.key.toLowerCase() == 'arrowup') {
				keyboardSelect(select, 'prev', event)
			} else if (event.keyCode && event.keyCode == 40 || event.key && event.key.toLowerCase() == 'arrowdown') {
				keyboardSelect(select, 'next', event)
			}
		})
	}

	function initSelect(select) {
		select.dropdown.addEventListener('click', function (event) {
			let option = event.target.closest('.select__item')
			if (!option) return;
			selectOption(select, option);
		})
		getSelectedOption(select);
		resetSelect(select);
		getCurrentIndex(select);
	}

	function selectOption(select, option) {
		if (option.hasAttribute('selected')) {
			select.selectInput.setAttribute('aria-expanded', 'false')
		} else {
			let selectedOption = select.dropdown.querySelector('[selected]')
			if (selectedOption) selectedOption.removeAttribute('selected')
			option.setAttribute('selected', '')
			select.selectInput.value = option.getAttribute('value')
			select.selectInput.firstChild.textContent = option.getElementsByClassName('option__item--label')[0].textContent
			select.selectInput.setAttribute('aria-expanded', 'false')

		}
	}

	function resetSelect(select) {
		let option = select.dropdown.querySelector('[selected]');
		if (option) return option;
		else {
			let firstOption = select.dropdown.getElementsByClassName('select__item')[0]
			firstOption.setAttribute('selected', '')
			select.selectInput.value = firstOption.getAttribute('value')
			select.selectInput.firstChild.textContent = firstOption.getElementsByClassName('option__item--label')[0].textContent
		}
	}

	function toggleSelect(select) {
		bool = select.getAttribute('aria-expanded') == 'true'
		if (!bool) {
			select.setAttribute('aria-expanded', 'true')
		} else {
			select.setAttribute('aria-expanded', 'false')
		}
	}

	function getSelectedOption(select) {
		let selectedVal = select.selectInput.value;
		if (selectedVal != null && selectedVal != "") {
			select.selectInput.firstChild.textContent = select.dropdown.querySelector('[value="' + selectedVal + '"]').textContent
			select.dropdown.querySelector('[value="' + selectedVal + '"]').setAttribute('selected', '')
		}
	}

	function getCurrentIndex(select) {
		let nodes = Array.prototype.slice.call(select.dropdown.children),
			liRef = select.dropdown.querySelector('[selected]');
		index = nodes.indexOf(liRef);
	}

	function keyboardSelect(select, direction, event) {
		event.preventDefault();
		index = (direction == 'next') ? index + 1 : index - 1;
		if (index < 0) index = select.dropdown.children.length - 1;
		if (index >= select.dropdown.children.length) index = 0;
		select.dropdown.children[index].setAttribute("tabindex", 1);
		select.dropdown.children[index].focus();
		select.dropdown.children[index].addEventListener('keydown', function (event) {
			if (event.keyCode && event.keyCode == 13 || event.key && event.key.toLowerCase() == 'enter') {
				let option = event.target.closest('.select__item')
				if (!option) return;
				selectOption(select, option);
			}
		})
	}

	function checkSelectClick(select, target) { // close select when clicking outside it
		if (!select.element.contains(target)) select.selectInput.setAttribute('aria-expanded', 'false')
	};

	let selectItems = document.getElementsByClassName("js-select");
	if (selectItems.length > 0) {
		let selectArray = [];
		for (let i = 0; i < selectItems.length; i++) {
			(function (i) {
				selectArray.push(new customSelect(selectItems[i]));
			})(i);
		}

		window.addEventListener('click', function (event) {
			selectArray.forEach(function (element) {
				checkSelectClick(element, event.target);
			});
		});
	}
}());

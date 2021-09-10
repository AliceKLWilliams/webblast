class Navigation{
	constructor(){
		this.open = document.querySelector(".nav__open");
		this.close = document.querySelector(".nav__close");
		this.nav = document.querySelector(".nav");
		this.overlay = document.querySelector(".dark-overlay");
		this.events();
	}

	events(){
		this.open.addEventListener("click", this.openNavigation.bind(this));
		this.close.addEventListener("click", this.closeNavigation.bind(this));
		
		let dropdownBtns = document.querySelectorAll(".dropdown__btn");
		dropdownBtns.forEach(btn => btn.addEventListener("click", this.toggleDropdown.bind(this)));

		window.addEventListener("scroll", this.scrollHandler.bind(this));
	}

	scrollHandler(e){
		if(window.scrollY > 0){
			// Add Bubble to the open button
			this.open.classList.add("nav__open--bubble");
		} else{
			this.open.classList.remove("nav__open--bubble");
		}
	}

	openNavigation(){
		this.nav.classList.add("nav--open");
		this.overlay.classList.add("dark-overlay--show");
	}

	closeNavigation(){
		this.nav.classList.remove("nav--open");
		this.overlay.classList.remove("dark-overlay--show");
	}

	toggleDropdown(e){
		let dropdown = e.currentTarget.closest(".dropdown");

		dropdown.classList.toggle("dropdown--open");
	}
}

let nav = new Navigation();
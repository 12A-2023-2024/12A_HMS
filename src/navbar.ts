// Routing cikk: https://dev.to/rohanbagchi/how-to-write-a-vanillajs-router-hk3

export class NavBar {

    hamburgerButton: HTMLElement | null = null;
    mobileMenu: HTMLElement | null = null;
    navbar: HTMLElement;
    routes: {[key: string]: {page: any}} = {}

    constructor(routes: {[key: string]: {page: any}}) {
        this.hamburgerButton = document.querySelector('nav button#menu-btn');
        this.mobileMenu = document.querySelector('nav div#mobile-menu');
        const navbar = document.querySelector('nav');
        this.routes = routes;

        if (navbar) {
            this.navbar = navbar;
        } else {
            throw new Error('No navbar found');
        }

        if (this.hamburgerButton && this.mobileMenu) {
            this.hamburgerButton.addEventListener('click', () => this.hamburgerButtonClicked());
        }
        this.createNavEventListener();

        window.onpopstate = (e) => {
            const searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('page')) {
                this.renderContent(`${searchParams.get('page')}`);
            }
        };      
    }

    hamburgerButtonClicked() {
        if (this.hamburgerButton && this.mobileMenu) {
            this.hamburgerButton.classList.toggle('open');
            this.mobileMenu.classList.toggle('flex');
            this.mobileMenu.classList.toggle('hidden');
        }
    }

    createNavEventListener() {
        const navLinks = document.querySelectorAll('nav a[data-route]');
        navLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                //event.preventDefault();
                const route = link.getAttribute('data-route');
                this.renderContent(route);
            });
        });
    }
    renderContent(route: string | null) {
        if ( route != null && this.routes[route] && this.routes[route].page) {
            const page = new this.routes[route].page();
            if (route){
                window.history.pushState({}, '', `?page=${route}`);
            } else {
                window.history.pushState({}, '', '');
            }
            this.setActiveLink(route);
        }
    }

    setActiveLink(route: string) {
        const navLinks = document.querySelectorAll('nav a[data-route]');
        navLinks.forEach((link) => {
            if (link.getAttribute('data-route') === route) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }   
}
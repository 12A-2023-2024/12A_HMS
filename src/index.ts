import { NavBar } from "./navbar.js";
import { routes } from "./routes.js";

const contentDiv = document.getElementById('content');
if (contentDiv) {
  const navbar = new NavBar(routes);
  const searchParams = new URLSearchParams(window.location.search);
  navbar.renderContent('');
  if (searchParams.has('page')) {
    navbar.renderContent(`${searchParams.get('page')}`);
  }
} else {
  const body = document.querySelector('body');
  if (body) {
    body.innerHTML = '<h1>Content not found</h1>';
  }
}
 
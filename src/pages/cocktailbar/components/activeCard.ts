import { routes } from "../../../routes.js";
import { CocktailCard } from "./cocktailCard/cocktailCard.js";
import { cocktailModal } from "./cocktailModal/cocktailModal.js";

export let ActiveCard:CocktailCard | null = null

export function ChangeActive(card:CocktailCard) {
    ActiveCard = card
}

export function DropActive() {
    ActiveCard = null
    const modalWrapper = document.querySelector('div#modalWrapper') as HTMLElement
    modalWrapper.innerHTML = ""
}
export function convertShapes(word) {
    return word.replaceAll("[PENT]", "&#11039").replaceAll("[CIRCLE]", "&#11044").replaceAll("[TRI]", "&#9650").replaceAll("[SQUARE]", "&#9724");
}
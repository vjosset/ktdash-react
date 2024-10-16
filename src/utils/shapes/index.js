export function convertShapes(word) {
    return word.replace("[PENT]", "&#11039").replace("[CIRCLE]", "&#11044").replace("[TRI]", "&#9650");
}
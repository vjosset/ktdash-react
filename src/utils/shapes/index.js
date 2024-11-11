export function convertShapes(word) {
    if (!word) {
        return;
    }
    return word
        .replaceAll("[PENT]", "&#11039")
        .replaceAll("[pent]", "&#11039")
        .replaceAll("[CIRCLE]", "&#11044")
        .replaceAll("[circle]", "&#11044")
        .replaceAll("[TRI]", "&#9650")
        .replaceAll("[tri]", "&#9650")
        .replaceAll("[SQUARE]", "&#9724")
        .replaceAll("[square]", "&#9724");
}
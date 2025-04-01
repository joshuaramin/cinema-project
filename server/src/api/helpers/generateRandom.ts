
export default function generateRandom(length: number) {
    var digits = "01234567890";
    let random = "";
    for (let i = 0; i < length; i++) {
        random += digits[Math.floor(Math.random() * 10)];
    }
    return random;
}

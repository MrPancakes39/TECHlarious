function concatClone(str, ...args) {
    let tmp = "" + str;
    args.forEach((s) => (tmp += s.toString()));
    return tmp;
}

function replaceAllClone(str, org_string, new_string) {
    let tmp = str.split(org_string);
    if (org_string === "") {
        tmp.unshift("");
        tmp.push("");
    }
    return tmp.join(new_string);
}

function testConcat() {
    const str1 = "Hello";
    const str2 = "World";

    const out1 = concatClone(str1, " ", str2);
    const out2 = concatClone(str2, ", ", str1);
    console.assert(out1 === "Hello World", out1);
    console.assert(out2 === "World, Hello", out2);
}

function testRepAll() {
    const p =
        "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?";
    const regex = /Dog/gi;

    const out1 = replaceAllClone(p, "dog", "monkey");
    const out2 = replaceAllClone(p, regex, "ferret");
    const out3 = replaceAllClone("xxx", "", "_");

    console.assert(
        out1 ===
            "The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?",
        out1
    );
    console.assert(
        out2 ===
            "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?",
        out2
    );
    console.assert(out3 === "_x_x_x_", out3);
}

testConcat();
testRepAll();

let inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener("change", function (e) {
        let fileName = "";
        if (this.files && this.files.length > 1) {
            fileName = (
                this.getAttribute("data-multiple-caption") || ""
            ).replace("{count}", this.files.length);
        } else {
            fileName = e.target.value.split("").pop();
        }

        if (fileName) label.querySelector("span").innerHTML = fileName;
        else label.innerHTML = labelVal;
    });
});

//    this.images = rows;
//    if (
//        location.pathname.slice(1) !== "" &&
//        location.pathname.slice(1) == Number
//    ) {
//        this.openModal(location.pathname.slice(1));
//    } else {
//        window.addEventListener("popstate", () => {
//            location.pathname.slice(1);
//            console.log("the user just used <- or -> button");
//            console.log("new url ");
//        });
//    }

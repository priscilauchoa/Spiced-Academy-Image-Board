import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            images: [],
            username: "",
            title: "",
            description: "",
            file: null,
        };
    },
    mounted() {
        fetch("/images")
            .then((resp) => resp.json())
            .then(({ rows }) => {
                // console.log("data --->", data);
                this.images = rows;
            });

        console.log(this.cities);
    },

    methods: {
        clickHandler: function () {
            let fd = new FormData();
            fd.append("username", this.username);
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("file", this.file);

            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((response) => {
                    this.images.push(response[0]);
                    console.log("response", response);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
        fileSelectHandler: function (e) {
            this.file = e.target.files[0];
            // console.log("file selected", this.file);
        },
    },
}).mount("#main");

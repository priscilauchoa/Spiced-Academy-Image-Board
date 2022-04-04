import * as Vue from "./vue.js";
import modal from "./modal.js";

Vue.createApp({
    data() {
        return {
            images: [],
            username: "",
            title: "",
            description: "",
            file: null,
            openedModal: null,
            moreButton: true,
            id: 0,
        };
    },
    components: {
        modal: modal,
    },

    mounted() {
        this.openModal(location.pathname.slice(1));

        window.addEventListener("popstate", () => {
            location.pathname.slice(1);
            console.log("the user just used <- or -> button");
            console.log("new url ");
        });

        fetch("/images")
            .then((resp) => resp.json())
            .then(({ rows }) => {
                this.images = rows;
            });
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
                    this.images.unshift(response[0]);
                    console.log("response", response);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        },
        getMoreImages: function () {
            let lowestId = 0;
            console.log(this.images);

            for (let i = 0; i < this.images.length; i++) {
                this.images[i] < lowestId;
                lowestId = this.images[i].id;
            }

            fetch(`/images/${lowestId}`)
                .then((resp) => resp.json())
                .then(({ rows }) => {
                    // console.log("rows-->", { rows });
                    let image = 0;
                    for (image of rows) {
                        console.log("image", image);
                        this.images.push(image);
                    }
                    if (rows.length < 3) {
                        this.moreButton = false;
                    }
                });
        },

        openModal(imageId) {
            this.openedModal = true;
            console.log("id --->", imageId);
            this.id = imageId;
            history.pushState({}, "", "imageId");
        },

        fileSelectHandler: function (e) {
            this.file = e.target.files[0];
            // console.log("file selected", this.file);
        },

        hideComponent() {
            this.openedModal = null;
            history.pushState({}, "", "/");
            console.log("url updated to-->:", location.pathname.slice(1));
        },
    },
}).mount("#main");

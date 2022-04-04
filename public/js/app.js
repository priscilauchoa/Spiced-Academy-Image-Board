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
        // this.isImage();
        window.addEventListener("popstate", () => {
            if (location.pathname.slice(1) == 0) {
                this.openedModal = null;
            } else {
                this.openedModal = location.pathname.slice(1);
            }
        });
        this.openedModal = location.pathname.slice(1);

        fetch("/images")
            .then((resp) => resp.json())
            .then((obj) => {
                this.images = obj.initialImgs;

                console.log(obj.initialImgs);

                // for (let i = 0; i < obj.allImgs.rows.length; i++) {
                //     if (obj.allImgs.rows[i].id == location.pathname.slice(1)) {
                //         // console.log("id images", obj.allImgs.rows[i].id);
                //         // console.log("location id", location.pathname.slice(1));
                //         this.openModal(obj.allImgs.rows[i].id);
                //     } else {
                //         history.replaceState({}, "", "/");
                //     }
                // }

                // fetch("/images/check")
                //     .then((resp) => resp.json())
                //     .then(({ rows }) => {
                //         console.log("ID-->", rows);

                //     });
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

        // isImage() {
        //     fetch("/images/isimage")
        //         .then((resp) => resp.json())
        //         .then(({ rows }) => {
        //             console.log("ID-->", rows);
        //             for (let i = 0; i < rows.length; i++) {
        //                 if (rows[i].id == location.pathname.slice(1)) {
        //                     this.openModal(location.pathname.slice(1));
        //                 } else {
        //                     history.replaceState({}, "", "/");
        //                 }
        //             }
        //         });
        // },

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
            this.id = imageId;
            // history.pushState({}, "", imageId);
        },

        fileSelectHandler: function (e) {
            this.file = e.target.files[0];
            // console.log("file selected", this.file);
        },

        hideComponent() {
            this.openedModal = null;
            //reset url
            history.replaceState({}, "", "/");
        },
    },
}).mount("#main");

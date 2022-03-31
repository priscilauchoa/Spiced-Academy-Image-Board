import * as Vue from "./vue.js";
import firstComponent from "./firstComponent.js";
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
            id: 0,
        };
    },
    components: {
        firstComponent: firstComponent,
        modal: modal,
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

        openModal(imageId) {
            // this.$emit("open");
            this.openedModal = true;
            console.log("id --->", imageId);
            this.id = imageId;
        },

        fileSelectHandler: function (e) {
            this.file = e.target.files[0];
            // console.log("file selected", this.file);
        },

        hideComponent() {
            console.log("the first component wants me to  do sth");
            this.openedModal = null;
        },
    },
}).mount("#main");

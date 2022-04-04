import comment from "./comment.js";

const modal = {
    data() {
        return {
            url: "",
            username: "",
            title: "Image",
            description: "",
            created_at: "",
        };
    },
    components: {
        comment: comment,
    },

    props: ["imageId"],

    mounted() {
        console.log("image id ", this.imageId);
        fetch(`/modal/${this.imageId}`)
            .then((resp) => resp.json())
            .then((response) => {
                this.url = response.url;
                this.title = response.title;
                this.description = response.description;
                this.username = response.username;
                this.created_at = response.created_at;
                console.log("dawsbdsh", response.rows[0]);

                if (this.imageId) {
                    history.pushState({}, "", this.imageId);
                }
                console.log("url updated to:", location.pathname.slice(1));
            });
    },

    methods: {
        close() {
            this.$emit("close");
        },
    },
    template: `<div>
                    <p class="close-button" @click="close"> X </p>
                    <img class="modal-img" :src=url :alt=description>
                    <h2> Title: {{title}} </h2>
                    <p>By : {{username}}</p>
                    <p>{{description}}</p>
                    <p> {{created_at}} </p>
                    <div><comment :image-id=imageId></comment></div>
                </div>
                `,
};

export default modal;

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
            .then(({ rows }) => {
                this.url = rows[0].url;
                this.title = rows[0].title;
                this.description = rows[0].description;
                this.username = rows[0].username;
                this.created_at = rows[0].created_at;
                // console.log("this title--->", rows);
            });
        console.log(this.imageId);
    },

    methods: {
        close() {
            this.$emit("close");
        },
    },
    template: `<div>
                    <h2 class="close-button" @click="close"> X </h2>
                    <img class="modal-img" :src=url :alt=description>
                    <h1> Title: {{title}} </h1>
                    <p>{{username}}</p>
                    <p>{{description}}</p>
                    <p> Created at: {{created_at}} </p>
                    <div><comment :image-id=imageId></comment></div>
                </div>
                `,
};

export default modal;

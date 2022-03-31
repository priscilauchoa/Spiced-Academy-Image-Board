const modal = {
    data() {
        return {
            url: "",
            username: "",
            title: "Image",
            description: "",
            file: null,
        };
    },

    props: ["imageId"],

    mounted() {
        console.log("image id", this.imageId);
        fetch(`/modal/${this.imageId}`)
            .then((resp) => resp.json())
            .then(({ rows }) => {
                this.url = rows[0].url;
                this.title = rows[0].title;
                this.description = rows[0].description;
                this.username = rows[0].username;
                console.log("this title--->", this.title);
            });
    },

    methods: {
        close() {
            this.$emit("close");
        },
    },
    template: `<div>
                    <h2 @click="close"> X </h2>
                    <h1> {{title}} </h1>
                    <img class="card-img" :src=url :alt=description>
                    <p>{{username}}</p>
                    <p>{{description}}</p>
                </div>
                `,
};

export default modal;

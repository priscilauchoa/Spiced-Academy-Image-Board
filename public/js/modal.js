import comment from "./comment.js";

const modal = {
    data() {
        return {
            url: "",
            username: "",
            title: "Image",
            description: "",
            created_at: "",
            currentImageId: 0,
        };
    },
    components: {
        comment: comment,
    },

    props: ["imageId"],

    mounted() {
        console.log("image id ", this.imageId);
        this.currentImageId = parseInt(this.imageId);
        this.getModalImage();
        // fetch(`/modal/${this.imageId}`)
        //     .then((resp) => resp.json())
        //     .then((response) => {
        //         console.log("### response", response);
        //         this.url = response.url;
        //         this.title = response.title;
        //         this.description = response.description;
        //         this.username = response.username;
        //         this.created_at = response.created_at;
        //         this.id = response.id;
        //         console.log("dawsbdsh", response.rows[0]);

        //         if (this.imageId) {
        //             history.pushState({}, "", this.imageId);
        //         }
        //         console.log("url updated to:", location.pathname.slice(1));
        //     });
    },

    methods: {
        close() {
            this.$emit("close");
        },

        getModalImage() {
            let id = this.currentImageId;
            fetch(`/modal/${id}`)
                .then((resp) => resp.json())
                .then((response) => {
                    console.log("### response", response);
                    this.url = response.url;
                    this.title = response.title;
                    this.description = response.description;
                    this.username = response.username;
                    this.created_at = response.created_at;
                    this.id = response.id;
                    // console.log("dawsbdsh", response.rows[0]);

                    if (id) {
                        history.pushState({}, "", id);
                    }
                    console.log("url updated to:", location.pathname.slice(1));
                });
        },
        imageBefore() {
            if (this.currentImageId <= 1) return;
            this.currentImageId -= 1;
            this.getModalImage();
        },
        imageAfter() {
            this.currentImageId += 1;
            this.getModalImage();
        },
    },
    template: `<div>

                    <p class="close-button" @click="close"> X </p>
                   <div style="margin: 15px 0; display:flex; justify-content: space-between"> <button @click.prevent="imageBefore()"> before </button>
                    <button @click.prevent="imageAfter()"> After </button></div>
                    
                    <img class="modal-img" :src=url :alt=description>
                    <h2> Title: {{title}} </h2>
                    <p>By : {{username}}</p>
                    <p>{{description}}</p>
                    <p> {{created_at}} </p>
                    <div><comment :image-id=currentImageId></comment></div>
                </div>
                `,
};

export default modal;

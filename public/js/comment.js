const comment = {
    data() {
        return {
            username: "username",
            comments: [],
            comment: "test",
        };
    },

    props: ["imageId"],

    mounted() {
        console.log("image id in comment", this.imageId);

        fetch(`/comments/${this.imageId}`)
            .then((resp) => resp.json())
            .then(({ rows }) => {
                console.log("rows", rows[0]);
                // this.username = rows[0].username;
                // let comment = 0;
                // for (comment of rows) {
                // console.log("comment", comment);
                this.comments = rows;
                // }
                // this.comments = rows;

                console.log("this title--->", rows);
            });
    },

    methods: {
        insertComment() {
            // console.log(
            //     "this comment this username",
            //     this.comment,
            //     this.username
            // );
            fetch(`/comments/${this.imageId}`, {
                method: "POST",
                body: JSON.stringify({
                    username: this.username,
                    comment: this.comment,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then(({ rows }) => {
                    // this.comment.unshift(rows[0]);

                    this.username.push(rows[0].username);
                    this.comments.push(rows[0].comment);
                    // this.comment.push(rows[0].comment);
                    console.log("this title--->", rows);
                });
        },
        // close() {
        //     this.$emit("close");
        // },
    },
    template: `<form>
                    <label>Let your comment here<label>
                    <br/>
                    <input v-model="comment" type="text" name="comment"></input>
                    <br/>
                    <label>User Name<label>
                    <br/>
                    <input v-model="username" type="text" name="username"></input>
                    <br/>
                    <br/>
                    
                    <label>{{username}}</label>
                    <div v-for="comment in comments"><p>{{comment.username}} - {{comment.comment}}</p></div>
                    <button @click.prevent="insertComment" class="comment-button">Submit</button>

                </form>
                `,
};

export default comment;

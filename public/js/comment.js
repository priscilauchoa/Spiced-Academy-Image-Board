const comment = {
    data() {
        return {
            username: "",
            comments: [],
            comment: "",
        };
    },

    props: ["imageId"],

    watch: {
        imageId(newValue, oldValue) {
            console.log("### watcher", newValue, oldValue);
            this.getComments();
        },
    },
    mounted() {
        console.log("image id in comment", this.imageId);
        this.getComments();
    },

    methods: {
        getComments() {
            console.log("### comments imageId", this.imageId);
            fetch(`/comments/${this.imageId}`)
                .then((resp) => resp.json())
                .then((rows) => {
                    console.log("### comments response", rows);
                    this.comments = rows;
                });
        },
        insertComment() {
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
                    this.getComments();
                    this.username.unshift(rows[0].username);
                    this.comments.unshift(rows[0].comment);
                });
        },
    },
    template: `<form style="display: flex">
                    <div id="input-comment">
                        <h3 class="header-comment">Add a comment</h3>
                        <label>Name</label>
                        <input v-model="username" type="text" name="username"></input>
                        <label style="margin-top:3px">Comment</label>
                        <input v-model="comment" type="text" name="comment"></input>

                        <button @click.prevent="insertComment" class="comment-button">Submit</button>
                    </div>
                    <div>
                        <div id="comments">
                            <div id="comments-content">    
                                <label>{{comment.username}}</label>
                                <div v-for="comment in comments">
                                  <h4>  {{comment.username}}</h4> </br><p style="font-size: 12px;"> {{comment.comment}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                `,
};

export default comment;

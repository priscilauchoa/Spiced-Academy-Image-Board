import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "truffle",
            seen: true,
            images: "{}",
        };
    },
    mounted() {
        fetch("/images")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data --->", data);
                this.images = data;
            });

        console.log(this.cities);
    },

    methods: {
        sayHello: function (arg, arg2) {
            console.log(`Hello ${arg} ${arg2}`);
        },
    },
}).mount("#main");

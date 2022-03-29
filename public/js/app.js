import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            name: "truffle",
            seen: true,
            cities: "{}",
        };
    },
    mounted() {
        fetch("/cities")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data --->", data);
                this.cities = data;
            });

        console.log(this.cities);
    },

    methods: {
        sayHello: function (arg, arg2) {
            console.log(`Hello ${arg} ${arg2}`);
        },
    },
}).mount("#main");

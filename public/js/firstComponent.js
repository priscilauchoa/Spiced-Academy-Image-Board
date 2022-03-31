const firstComponent = {
    data() {
        return {
            heading: "firstComponent",
            greetee: "",
            count: 1,
        };
    },
    props: ["passingSomeProp", "foodId"],
    mounted() {
        console.log("first componnet just mounted");
        console.log("Which food selected? Food Id: ", this.foodId);

        setTimeout(() => {
            this.greetee = "Truffle";
        }, 3000);
    },
    methods: {
        countUp() {
            console.log("the user want to increase count");
            this.count++;
        },
        parentDoSth() {
            this.$emit("close");
        },
    },
    template: `<div>
                    <h1>I am {{heading}} Hi 🖖</h1>
                    <h1>Hello {{greetee}} Hi 🖖</h1>
                    <h2>Count currently is: {{count}}</h2>
                    <h2 @click="parentDoSth"> x </h2>
                    <button @click=countUp>count up</button>
                    <button @click=count-->count down</button>
                </div>`,
};

export default firstComponent;

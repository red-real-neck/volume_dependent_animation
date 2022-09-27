import {test} from "./test.ts"

export default class componentsController {
    constructor() {

    }

    register() {
        AFRAME.registerComponent("test", test)
        document.querySelector('#sphere').setAttribute("test", "")
    }
}
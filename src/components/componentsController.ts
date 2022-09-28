// import * as AFRAME from "aframe"
import {test} from "./test"

export default class componentsController {
    constructor() {

    }

    register() {
        AFRAME.registerComponent("test", test)
        document.querySelector('#sphere').setAttribute("test", "")
    }
}